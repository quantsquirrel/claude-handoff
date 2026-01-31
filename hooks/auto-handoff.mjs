#!/usr/bin/env node
/**
 * Auto-Handoff Hook
 *
 * Monitors context usage and suggests running /handoff when reaching 70%.
 * Works as a Claude Code PostToolUse hook.
 *
 * Usage:
 *   Add to ~/.claude/settings.json hooks section:
 *   {
 *     "hooks": {
 *       "PostToolUse": [{
 *         "matcher": "Read|Grep|Glob|Bash|WebFetch",
 *         "hooks": [{
 *           "type": "command",
 *           "command": "node ~/.claude/skills/handoff/hooks/auto-handoff.mjs"
 *         }]
 *       }]
 *     }
 *   }
 */

import * as fs from 'fs';
import * as path from 'path';
import { tmpdir, homedir } from 'os';

import {
  HANDOFF_THRESHOLD,
  WARNING_THRESHOLD,
  CRITICAL_THRESHOLD,
  HANDOFF_COOLDOWN_MS,
  MAX_SUGGESTIONS,
  CLAUDE_CONTEXT_LIMIT,
  CHARS_PER_TOKEN,
  HANDOFF_SUGGESTION_MESSAGE,
  HANDOFF_WARNING_MESSAGE,
  HANDOFF_CRITICAL_MESSAGE,
  AUTO_DRAFT_ENABLED,
  DRAFT_FILE_PREFIX,
} from './constants.mjs';

const DEBUG = process.env.AUTO_HANDOFF_DEBUG === '1';
const STATE_FILE = path.join(tmpdir(), 'auto-handoff-state.json');
const DEBUG_FILE = path.join(tmpdir(), 'auto-handoff-debug.log');

/**
 * Debug logging
 */
function debugLog(...args) {
  if (DEBUG) {
    const msg = `[${new Date().toISOString()}] [auto-handoff] ${args
      .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
      .join(' ')}\n`;
    fs.appendFileSync(DEBUG_FILE, msg);
  }
}

/**
 * Load state from file
 */
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    debugLog('Failed to load state:', e.message);
  }
  return {
    sessions: {},
  };
}

/**
 * Save state to file
 */
function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  } catch (e) {
    debugLog('Failed to save state:', e.message);
  }
}

/**
 * Get or create session state
 */
function getSessionState(state, sessionId) {
  if (!state.sessions[sessionId]) {
    state.sessions[sessionId] = {
      lastSuggestionTime: 0,
      suggestionCount: 0,
      estimatedTokens: 0,
      handoffCreated: false,
      draftSaved: false,
    };
  }
  return state.sessions[sessionId];
}

/**
 * Estimate tokens from text
 */
function estimateTokens(text) {
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

/**
 * Check if handoff was recently created
 */
function checkRecentHandoff() {
  const handoffDir = path.join(process.cwd(), '.claude', 'handoffs');
  const globalHandoffDir = path.join(homedir(), '.claude', 'handoffs');

  for (const dir of [handoffDir, globalHandoffDir]) {
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        for (const file of files) {
          if (file.endsWith('.md')) {
            const stat = fs.statSync(path.join(dir, file));
            if (now - stat.mtimeMs < fiveMinutes) {
              return true; // Handoff created within 5 minutes
            }
          }
        }
      }
    } catch (e) {
      debugLog('Error checking handoff dir:', e.message);
    }
  }
  return false;
}

/**
 * Get git information (simple)
 */
function getGitInfo() {
  try {
    const { execSync } = require('child_process');
    const branch = execSync('git rev-parse --abbrev-ref HEAD 2>/dev/null', {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim();
    const status = execSync('git status --short 2>/dev/null', {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim();
    return { branch, status };
  } catch (e) {
    return { branch: null, status: null };
  }
}

/**
 * Save auto-draft at 70% threshold
 */
function saveDraft(sessionId, estimatedTokens) {
  if (!AUTO_DRAFT_ENABLED) {
    return;
  }

  try {
    const handoffDir = path.join(process.cwd(), '.claude', 'handoffs');
    if (!fs.existsSync(handoffDir)) {
      fs.mkdirSync(handoffDir, { recursive: true });
    }

    const timestamp = Date.now();
    const draftFile = path.join(handoffDir, `${DRAFT_FILE_PREFIX}${timestamp}.json`);

    const gitInfo = getGitInfo();
    const draftData = {
      sessionId,
      timestamp: new Date().toISOString(),
      estimatedTokens,
      cwd: process.cwd(),
      gitBranch: gitInfo.branch,
      gitStatus: gitInfo.status,
    };

    // Remove old draft files for this session
    try {
      const files = fs.readdirSync(handoffDir);
      for (const file of files) {
        if (file.startsWith(DRAFT_FILE_PREFIX) && file.endsWith('.json')) {
          const filePath = path.join(handoffDir, file);
          try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (data.sessionId === sessionId) {
              fs.unlinkSync(filePath);
              debugLog('Removed old draft:', file);
            }
          } catch (e) {
            // Ignore invalid draft files
          }
        }
      }
    } catch (e) {
      debugLog('Error cleaning old drafts:', e.message);
    }

    fs.writeFileSync(draftFile, JSON.stringify(draftData, null, 2));
    debugLog('Draft saved:', draftFile);
  } catch (e) {
    debugLog('Failed to save draft:', e.message);
    // Don't fail the hook if draft save fails
  }
}

/**
 * Main hook function
 */
function main() {
  // Read hook input from stdin
  let input = '';
  try {
    input = fs.readFileSync(0, 'utf8');
  } catch (e) {
    // No input available
    debugLog('No stdin input');
    return;
  }

  let hookData;
  try {
    hookData = JSON.parse(input);
  } catch (e) {
    debugLog('Failed to parse hook input:', e.message);
    return;
  }

  const { tool_name, session_id, tool_response } = hookData;

  if (!tool_response || !session_id) {
    return;
  }

  // Only process large output tools
  const toolLower = (tool_name || '').toLowerCase();
  const largeOutputTools = ['read', 'grep', 'glob', 'bash', 'webfetch'];
  if (!largeOutputTools.includes(toolLower)) {
    return;
  }

  // Load state
  const state = loadState();
  const sessionState = getSessionState(state, session_id);

  // Track cumulative tokens
  const responseTokens = estimateTokens(tool_response);
  sessionState.estimatedTokens += responseTokens;

  debugLog('Tracking output', {
    tool: toolLower,
    tokens: responseTokens,
    cumulative: sessionState.estimatedTokens,
  });

  // Calculate usage ratio
  const usageRatio = sessionState.estimatedTokens / CLAUDE_CONTEXT_LIMIT;

  // Save auto-draft at 70% threshold
  if (usageRatio >= HANDOFF_THRESHOLD && !sessionState.draftSaved) {
    saveDraft(session_id, sessionState.estimatedTokens);
    sessionState.draftSaved = true;
  }

  // Check if below threshold
  if (usageRatio < HANDOFF_THRESHOLD) {
    saveState(state);
    return;
  }

  // Check cooldown
  const now = Date.now();
  if (now - sessionState.lastSuggestionTime < HANDOFF_COOLDOWN_MS) {
    debugLog('Skipping - cooldown active');
    saveState(state);
    return;
  }

  // Check max suggestions
  if (sessionState.suggestionCount >= MAX_SUGGESTIONS) {
    debugLog('Skipping - max suggestions reached');
    saveState(state);
    return;
  }

  // Check if handoff was recently created
  if (checkRecentHandoff()) {
    debugLog('Skipping - recent handoff detected');
    sessionState.handoffCreated = true;
    saveState(state);
    return;
  }

  // Record suggestion
  sessionState.lastSuggestionTime = now;
  sessionState.suggestionCount++;
  saveState(state);

  // Determine message based on threshold
  let message;
  if (usageRatio >= CRITICAL_THRESHOLD) {
    message = HANDOFF_CRITICAL_MESSAGE;
  } else if (usageRatio >= WARNING_THRESHOLD) {
    message = HANDOFF_WARNING_MESSAGE;
  } else {
    message = HANDOFF_SUGGESTION_MESSAGE;
  }

  // Output message as hook result
  const result = {
    decision: 'approve',
    additionalContext: message,
  };

  console.log(JSON.stringify(result));
}

main();
