/**
 * Auto-Handoff Hook Constants
 *
 * Thresholds and messages for context usage monitoring.
 * Triggers handoff suggestion when context reaches 70%.
 */

/**
 * Threshold ratio to trigger handoff suggestion (70%)
 */
export const HANDOFF_THRESHOLD = 0.70;

/**
 * Warning threshold (80%) - more urgent suggestion
 */
export const WARNING_THRESHOLD = 0.80;

/**
 * Critical threshold (90%) - immediate handoff needed
 */
export const CRITICAL_THRESHOLD = 0.90;

/**
 * Cooldown period between handoff suggestions (3 minutes)
 */
export const HANDOFF_COOLDOWN_MS = 180_000;

/**
 * Maximum suggestions per session
 */
export const MAX_SUGGESTIONS = 2;

/**
 * Default context limit for Claude models
 */
export const CLAUDE_CONTEXT_LIMIT =
  process.env.ANTHROPIC_1M_CONTEXT === 'true' ||
  process.env.VERTEX_ANTHROPIC_1M_CONTEXT === 'true'
    ? 1_000_000
    : 200_000;

/**
 * Average characters per token estimate
 */
export const CHARS_PER_TOKEN = 4;

/**
 * Handoff suggestion message (70% threshold)
 */
export const HANDOFF_SUGGESTION_MESSAGE = `📋 HANDOFF SUGGESTION - Context 70%+ Reached

Your context usage is getting high. Consider creating a handoff to preserve your work:

  /handoff "current-task-topic"

This will:
✅ Save all progress and decisions
✅ Copy summary to clipboard
✅ Enable seamless session resume

Tip: Create handoffs before context gets too high to capture full context.
`;

/**
 * Warning message (80% threshold)
 */
export const HANDOFF_WARNING_MESSAGE = `⚠️ HANDOFF RECOMMENDED - Context 80%+ Reached

Context space is running low. Strongly recommended to create a handoff now:

  /handoff "current-task-topic"

Benefits:
• Preserve all decisions and failed approaches
• Quality score validates completeness
• Clipboard-ready for next session

Action: Run /handoff soon to avoid losing context.
`;

/**
 * Critical message (90% threshold)
 */
export const HANDOFF_CRITICAL_MESSAGE = `🚨 HANDOFF URGENT - Context 90%+ Reached

Context is almost full. Create a handoff immediately:

  /handoff "current-task-topic"

Without a handoff:
❌ Progress may be lost
❌ Next session starts from scratch
❌ Decisions need re-explaining

Action required: Run /handoff NOW before context overflow.
`;

/**
 * Auto-draft feature enabled
 */
export const AUTO_DRAFT_ENABLED = true;

/**
 * Draft file prefix
 */
export const DRAFT_FILE_PREFIX = '.draft-';

/**
 * Lock file name
 */
export const LOCK_FILE_NAME = '.generating.lock';
