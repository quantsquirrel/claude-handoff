<div id="top"></div>

<div align="center">

<img src="assets/handoff.jpeg" alt="Handoff - Pass the baton between sessions" width="600">

# 🪄 Handoff

> **Pass the baton. Keep the momentum. Never explain your codebase twice.**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-compatible-success?style=flat-square)](https://github.com/anthropics/claude-code)
[![Version](https://img.shields.io/badge/version-1.2.0-blue?style=flat-square)](https://github.com/quantsquirrel/claude-code-handoff)
[![🇰🇷 Korean](https://img.shields.io/badge/🇰🇷-Korean_Supported-red?style=flat-square)](#한국어-korean)

</div>

---

## Standalone Usage (No Dependencies!)

**Handoff works without any framework or plugin system.** Just tell Claude:

```
세션을 끝내기 전에 handoff 문서를 만들어줘
```

Claude will generate a complete handoff document with:
- Session summary and progress
- Key decisions and rationale
- Failed approaches (don't repeat!)
- Next steps for the next session

**That's it.** No installation, no configuration, no dependencies.

> 💡 **Want more features?** Install as a skill for clipboard auto-copy, quality scoring, and auto-handoff hooks.

---

**Master context continuity across sessions.** Seamlessly transfer context, decisions, and progress between Claude Code sessions with automatic clipboard integration and quality validation.

---

## Table of Contents

- [Standalone Usage](#standalone-usage-no-dependencies)
- [What is Handoff?](#what-is-handoff)
- [Workflow](#workflow)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Output Format](#output-format)
- [Auto-Handoff Hook](#auto-handoff-hook)
- [Comparison](#comparison-with-alternatives)
- [Configuration](#configuration)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [한국어 (Korean)](#한국어-korean)

---

## What is Handoff?

| Without Handoff | With Handoff |
|-----------------|--------------|
| ❌ Re-explain context every session | ✅ Auto-captured context |
| ❌ Repeat failed approaches | ✅ Failed approaches tracked |
| ❌ Lost decisions & progress | ✅ Decisions documented |
| ❌ Manual note-taking | ✅ One-command generation |
| ❌ Incomplete handoffs | ✅ Quality score validation |

**One command. Complete context. Zero re-explaining.**

---

## Workflow

**Session 1** → `/handoff` → **Session 2**

1. **Working** - You're deep in a coding session
2. **Save** - Run `/handoff` to capture everything
3. **Copy** - Context is automatically copied to clipboard
4. **Score** - Quality validation ensures completeness
5. **Check** - Secret detection prevents leaks
6. **Continue** - Paste in new session and keep going

**No re-explaining required.** Everything you need transfers automatically.

---

## Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| 📋 **Context Capture** | Auto-documents project state, decisions, progress, and blockers |
| 📋 **Clipboard Auto-Copy** | One command → compressed → instant copy → ready to paste |
| 🔗 **Git Integration** | Captures commit history, branch state, and file diffs |
| 🚫 **Failed Approaches** | Track what didn't work to avoid repeating mistakes |
| ⛓️ **Handoff Chain** | Link sessions for narrative continuity and history tracking |
| 🔐 **Secret Detection** | Auto-detect and warn about API keys and credentials |
| ⭐ **Quality Score** | Validates completeness with detailed scoring (0-100) |
| 🇰🇷 **Korean Support** | Unique clipboard prompt with Korean labels and context |
| ✅ **TODO Integration** | Auto-includes pending and in-progress tasks from .claude/ |
| 🔔 **Auto-Handoff Hook** | Suggests `/handoff` when context reaches 70% (optional) |

### Quality Score Breakdown

Quality validation ensures your handoff is complete:

- **20 points** - All required sections filled
- **20 points** - No pending TODOs in document
- **20 points** - No secrets detected
- **20 points** - Next steps clearly defined
- **20 points** - Key files listed

**Target:** 80+ for production handoffs

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

## Project Structure

```sh
└── claude-code-handoff/
    ├── LICENSE
    ├── README.md
    ├── SKILL.md              # Skill definition for Claude Code
    ├── docs/
    │   └── ...               # Additional documentation
    ├── examples/
    │   └── example-handoff.md
    ├── hooks/
    │   ├── auto-handoff.mjs  # Context monitoring hook
    │   ├── constants.mjs     # Threshold constants (70%, 80%, 90%)
    │   └── install.sh        # Easy installation script
    └── scripts/
        └── validate.sh       # Validation utilities
```

---

## Quick Start

### Installation

**Recommended: Plugin Marketplace**
```bash
/plugin marketplace add quantsquirrel/claude-code-handoff
```

✅ Easiest • ✅ Auto-validated • ✅ Official source

**Alternative: Direct Install**
```bash
/plugin install quantsquirrel/claude-code-handoff
```

**Manual Install**
```bash
git clone https://github.com/quantsquirrel/claude-code-handoff.git ~/.claude/skills/handoff
cd ~/.claude/skills/handoff
npm install
```

### Basic Usage

```bash
# Create handoff with topic
/handoff "authentication refactoring"

# Auto-detect topic from git branch
/handoff

# Interactive mode
/handoff --interactive
```

### What You Get

After running `/handoff`:

✅ **Document Created** - `.claude/handoffs/{timestamp}-{topic}.md`
📋 **Clipboard Ready** - Compressed prompt copied and ready to paste
⭐ **Quality Score** - 0-100 validation with breakdown
🔐 **Security Check** - Warnings if secrets detected

### How to Resume (Important!)

After creating a handoff, follow these steps in your **new session**:

```bash
# Step 1: Clear the current session
/clear

# Step 2: Paste the handoff prompt (Cmd+V or Ctrl+V)
# The compressed context is already in your clipboard!
```

> ⚠️ **Why `/clear` first?** Without clearing, the pasted context may get cut off or mixed with existing conversation. Always start fresh!

---

## Installation

### Recommended: Plugin Marketplace (Easiest)

```bash
/plugin marketplace add quantsquirrel/claude-code-handoff
```

This automatically:
- Downloads the plugin from the official marketplace
- Places it in `~/.claude/skills/handoff`
- Registers the `/handoff` command
- Validates installation

### Alternative: Direct Install

```bash
/plugin install quantsquirrel/claude-code-handoff
```

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/quantsquirrel/claude-code-handoff.git ~/.claude/skills/handoff
```

2. Install dependencies:
```bash
cd ~/.claude/skills/handoff
npm install
```

3. Enable the skill in your Claude Code config:
```json
{
  "skills": {
    "handoff": {
      "enabled": true,
      "version": "1.0.0"
    }
  }
}
```

### Verification

```bash
/plugin list | grep handoff
```

**Expected output:**
```
✅ handoff (v1.0.0) - Session handoff and context transfer
```

---

## Usage

### Basic Syntax

```bash
/handoff [topic]
```

**Parameters:**
- `topic` (optional) - Brief description of what you're handing off. If omitted, uses git branch name or current timestamp.

### Examples

#### 1. Simple Handoff with Topic

```bash
/handoff "user authentication migration"
```

**Result:**
- Document: `.claude/handoffs/2026-01-31-123456-auth-migration.md`
- Clipboard: Compressed prompt (892 chars) ready to paste
- Quality Score: 87/100

#### 2. Interactive Mode

```bash
/handoff --interactive
```

Prompts you with questions:
- What's the main topic?
- Current blockers?
- Next priorities?
- Previous handoff ID?

#### 3. Auto-Detect from Git Branch

```bash
# On branch: feature/dark-mode-redesign
/handoff
```

Auto-detected topic: `dark-mode-redesign`

#### 4. With Custom Config

```bash
/handoff "database optimization" --config my-config.json
```

---

## Output Format

### Handoff Document Structure

Every handoff creates a markdown file at `.claude/handoffs/{date}-{time}-{topic}.md`

| Section | Content |
|---------|---------|
| **Context Summary** | Current objective, project status, critical issues |
| **Technical Details** | Git status, commits, staged changes, active tasks |
| **Key Decisions Made** | Architecture decisions, API design, trade-offs |
| **Failed Approaches** | What didn't work, why it failed, better alternatives |
| **Handoff Chain** | Previous/next session links and outcomes |
| **Blockers & Dependencies** | Current blockers, external dependencies, ETAs |
| **Environment & Setup** | Environment variables, dependencies, dev server |
| **Quality Metrics** | Code coverage, performance baselines |
| **Security** | Secret detection results, security checklist |
| **Resources** | Documentation links, related issues, team contacts |
| **Next Steps** | Immediate, short-term, and medium-term actions |
| **Session Summary** | Accomplishments, follow-ups, confidence level |
| **Compressed Prompt** | Clipboard-ready compact version |

### Example Handoff Document

```markdown
# Session Handoff: User Authentication Migration

**Date:** January 31, 2026 10:34 AM
**Session ID:** sess_2026_01_31_103456
**Branch:** feature/auth-migration
**Duration:** 4h 32m

---

## Context Summary

### Current Objective
Migrate user authentication from custom JWT to Auth0, including database schema updates and frontend integration.

### Project Status
- Overall Progress: 65% complete
- Last Working State: Login form UI complete, backend integration in progress
- Critical Issue: None
- Deployment Blocked: No

---

## Technical Details

### Git Status
**Branch:** feature/auth-migration (ahead of main by 12 commits)

**Recent Commits:**
```
2026-01-31 10:15 - docs: update authentication flow diagrams
2026-01-30 16:42 - feat: add Auth0 configuration module
2026-01-30 14:21 - test: add Auth0 provider integration tests
```

**Active Tasks:**
- `[in_progress]` Implement Auth0 user sync endpoint
- `[in_progress]` Update database schema for Auth0 user IDs
- `[pending]` Integration testing with staging Auth0 tenant

---

## Key Decisions Made

1. **Decision:** Use Auth0 instead of custom JWT implementation
   - **Rationale:** Reduces maintenance burden, improves security posture
   - **Trade-off:** Adds external dependency, increases monthly costs
   - **Date:** January 25, 2026

2. **Decision:** Migrate user data during off-peak hours
   - **Rationale:** Minimal impact on active users
   - **Implementation:** Scheduled migration for 2:00-4:00 AM EST
   - **Date:** January 29, 2026

---

## Failed Approaches & Learnings

### Attempt 1: Direct Database Migration
**What:** Migrating all user records in single transaction
**Why it failed:** Locked database for 2+ hours, caused production outage
**Lesson:** Always test with production-scale data
**Better approach:** Use batched async migration with transaction checkpoints

### Attempt 2: Client-Side Token Refresh
**What:** Implementing token refresh logic in React components
**Why it failed:** Race conditions when multiple components refresh simultaneously
**Lesson:** Centralize token management
**Better approach:** Single source of truth in custom hook with mutex pattern

---

## Next Steps

### Immediate (Next 2 hours)
1. Complete Auth0 provider initialization
2. Add unit tests for token refresh logic
3. Deploy to staging environment

### Short-term (Next 24 hours)
1. Run integration tests against Auth0 sandbox
2. Load test with 100 concurrent users
3. Security audit of authentication flow

---

## Compressed Handoff Prompt

```
HANDOFF: User Authentication Migration
SESSION: sess_2026_01_31_103456
STATUS: 65% complete on feature/auth-migration
PROGRESS: Auth0 provider module complete, testing phase starting

CONTEXT:
- Migrating from custom JWT to Auth0
- Database schema updates ready for review
- 12 commits since yesterday's session

BLOCKERS:
- Waiting on Auth0 tenant config (DevOps)
- Database migration script in code review

NEXT:
1. Auth0 provider initialization (IN PROGRESS)
2. Integration testing (TODAY)
3. Staging deployment (TOMORROW)

KEY FILES:
- src/auth/auth0-provider.ts (modified)
- src/config/environment.ts (modified)
- tests/auth0.test.ts (new)

PREVIOUS SESSION: sess_2026_01_30_145632
```
```

### Compressed Clipboard Format

The skill automatically copies a compact version to your clipboard:

> **[HANDOFF] User Auth Migration**
>
> Branch: `feature/auth-migration`

| Field | Value |
|-------|-------|
| **Status** | 65% complete |
| **Blocker** | Auth0 tenant config pending |
| **Progress** | Auth0 provider done, testing starting today |

**Files:**
- `src/auth/auth0-provider.ts`
- `src/config/environment.ts`
- `tests/auth0.test.ts`

**Decisions:**
- Auth0 adoption (25th)
- Batch migration (29th)
- Dual validation (30th)

**Failed Approaches:**
- ~~DB transaction lock~~ → Use batched migration
- ~~Client refresh races~~ → Centralize auth context
- ~~Force logout~~ → Dual validation period

**Next:** Complete provider init → Staging test → Deploy
**Previous Session:** `sess_2026_01_30_145632`

---

## Auto-Handoff Hook

**Never forget to create a handoff.** The auto-handoff hook monitors your context usage and suggests running `/handoff` before it's too late.

### How It Works

```
Context Usage    Action
─────────────────────────────────────
   0-69%         Normal operation
  70-79%         📋 Suggestion appears
  80-89%         ⚠️ Warning - recommended
  90%+           🚨 Urgent - create now
```

### Installation

```bash
# From the handoff directory
cd ~/.claude/skills/handoff
bash hooks/install.sh
```

Or manually add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Read|Grep|Glob|Bash|WebFetch",
      "hooks": [{
        "type": "command",
        "command": "node ~/.claude/skills/handoff/hooks/auto-handoff.mjs"
      }]
    }]
  }
}
```

### Features

| Feature | Description |
|---------|-------------|
| 🎯 **Smart Detection** | Only triggers on large-output tools (Read, Grep, Bash, etc.) |
| ⏱️ **Cooldown** | 3-minute cooldown between suggestions to avoid spam |
| 🔄 **Session Aware** | Tracks per-session usage, resets on new sessions |
| 📁 **Handoff Detection** | Skips suggestion if handoff created within 5 minutes |
| 🎚️ **Graduated Warnings** | Different messages at 70%, 80%, 90% thresholds |

### Messages

**At 70% (Suggestion):**
```
📋 HANDOFF SUGGESTION - Context 70%+ Reached

Your context usage is getting high. Consider creating a handoff:
  /handoff "current-task-topic"
```

**At 80% (Warning):**
```
⚠️ HANDOFF RECOMMENDED - Context 80%+ Reached

Context space is running low. Strongly recommended to create a handoff now.
```

**At 90% (Urgent):**
```
🚨 HANDOFF URGENT - Context 90%+ Reached

Context is almost full. Create a handoff immediately!
```

### Debug Mode

Enable debug logging:

```bash
AUTO_HANDOFF_DEBUG=1 claude
```

Logs saved to: `/tmp/auto-handoff-debug.log`

### Uninstallation

Remove the `PostToolUse` hook entry from `~/.claude/settings.json`.

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

## Comparison with Alternatives

### Why Handoff Stands Out

| Feature | **Handoff** | Softaworks | Willseltzer | Claude-Mem |
|:--------|:-----------:|:----------:|:-----------:|:----------:|
| Context Capture | ✅ Comprehensive | ✅ Basic | ✅ Moderate | ✅ Basic |
| Clipboard Auto-Copy | ✅ pbcopy/xclip | ❌ | ⚠️ Manual | ❌ |
| Korean Support | 🇰🇷 **Full** | ❌ | ❌ | ❌ |
| Git Integration | ✅ Full | ⚠️ Branch only | ⚠️ Limited | ❌ |
| TODO Integration | ✅ .claude format | ❌ | ❌ | ⚠️ Basic |
| Failed Approaches | ✅ **Dedicated section** | ❌ | ❌ | ❌ |
| Handoff Chain | ⛓️ **Link prev/next** | ❌ | ❌ | ❌ |
| Secret Detection | 🔐 **With warnings** | ❌ | ❌ | ❌ |
| Quality Score | ⭐ **Detailed 0-100** | ❌ | ⚠️ Simple | ❌ |
| Auto-Handoff Hook | 🔔 **Context monitor** | ❌ | ❌ | ❌ |
| Session Metadata | ✅ Comprehensive | ⚠️ Minimal | ✅ Good | ⚠️ Minimal |

### Unique to Handoff

- 🇰🇷 Full Korean language support
- 🚫 Failed approaches tracking
- ⛓️ Session chain linking
- 🔐 Secret detection & warnings
- ⭐ Quality scoring (0-100)
- 🔔 Auto-handoff hook (context monitoring)

---

## Configuration

<details>
<summary><b>Click to expand configuration options</b></summary>

### Default Configuration

Create `.claude/handoffs.config.json`:

```json
{
  "outputDir": ".claude/handoffs",
  "includeGitDiff": true,
  "includeTaskList": true,
  "secretDetection": true,
  "qualityValidation": true,
  "clipboardFormat": "compressed",
  "language": "en",
  "maxDiffLines": 50,
  "maxCommitsToShow": 10,
  "includeEnvironmentVariables": false,
  "failedApproachesRequired": false,
  "handoffChainTracking": true,
  "encryptSensitiveData": false
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outputDir` | string | `.claude/handoffs` | Where to save handoff documents |
| `includeGitDiff` | boolean | `true` | Include file diffs in output |
| `includeTaskList` | boolean | `true` | Include .claude/tasks.json in output |
| `secretDetection` | boolean | `true` | Scan for API keys and credentials |
| `qualityValidation` | boolean | `true` | Calculate and display quality score |
| `clipboardFormat` | string | `compressed` | `compressed` or `full` |
| `language` | string | `en` | `en` or `ko` (Korean) |
| `maxDiffLines` | number | `50` | Maximum lines per file diff |
| `maxCommitsToShow` | number | `10` | Recent commits to include |
| `includeEnvironmentVariables` | boolean | `false` | Include env vars (security risk) |
| `failedApproachesRequired` | boolean | `false` | Enforce failed approaches section |
| `handoffChainTracking` | boolean | `true` | Track previous/next sessions |
| `encryptSensitiveData` | boolean | `false` | Encrypt handoff file contents |

### Usage Examples

```bash
# Use config file
/handoff "topic" --config /path/to/config.json

# Override single option
/handoff "topic" --includeGitDiff false

# Korean output
/handoff "topic" --language ko

# Custom clipboard format
/handoff "topic" --clipboardFormat full
```

</details>

---

## Advanced Usage

<details>
<summary><b>Click to expand advanced usage examples</b></summary>

### Programmatic Access

```javascript
const { createHandoff } = require('@claude-code/handoff');

const handoff = await createHandoff({
  topic: 'database migration',
  config: {
    outputDir: './.handoffs',
    language: 'ko'
  }
});

console.log(`Created: ${handoff.path}`);
console.log(`Quality Score: ${handoff.qualityScore}/100`);
console.log(`Clipboard: ${handoff.clipboardPrompt}`);
```

### Extending Handoff

Add custom sections:

```javascript
const handoff = await createHandoff({
  topic: 'feature-x',
  customSections: {
    'Performance Metrics': async () => {
      return await getPerformanceStats();
    },
    'Team Updates': async () => {
      return await fetchTeamMessages();
    }
  }
});
```

### Automation

Create a pre-commit hook for automatic handoffs:

```bash
#!/bin/bash
# .git/hooks/pre-commit

if [ "$AUTO_HANDOFF" = "true" ]; then
  /handoff --auto --topic "auto-commit-$(date +%s)"
fi
```

### Secret Detection

Handoff detects these secret patterns:

- AWS keys (AKIA...)
- Google API keys
- GitHub tokens (ghp_...)
- Database credentials (postgresql://user:pass)
- API keys in URLs
- Private encryption keys
- JWT secrets
- OAuth tokens

**Security Note:** Handoff files should be kept in `.gitignore` if they contain secrets.

</details>

---

## Troubleshooting

<details>
<summary><b>Click to expand troubleshooting guide</b></summary>

### Handoff Not Copying to Clipboard

**Problem:** Compressed prompt not appearing in clipboard

**Solutions:**

1. Check if `pbcopy` (macOS) or `xclip` (Linux) is installed:
```bash
# macOS
which pbcopy

# Linux
which xclip
```

2. Grant permissions if needed:
```bash
# Linux
sudo apt-get install xclip
```

3. Use alternative output method:
```bash
/handoff "topic" --output file  # Save to file instead
```

### Quality Score Too Low

**Problem:** Quality score below 70/100

**Possible reasons:**
- Missing git repository or commits
- No pending tasks in `.claude/tasks.json`
- Incomplete failed approaches section
- No previous handoff chain

**Improvements:**
- Ensure git is initialized: `git init`
- Add task descriptions to `.claude/tasks.json`
- Document what didn't work during your session
- Link to previous session: `/handoff "topic" --previous sess_id`

### Secret Detection False Positives

**Problem:** Legitimate strings flagged as secrets

**Solution:** Create `.handoffignore` for safe patterns:

```
# .handoffignore
^\$\{.*\}$  # Ignore template variables
^test-.*$   # Ignore test API keys
```

### Large Handoff Files

**Problem:** Handoff document too large (>10MB)

**Solution:** Reduce content scope:

```bash
/handoff "topic" --maxDiffLines 20 --maxCommitsToShow 5
```

</details>

---

## Performance

### Optimization Tips

1. **Reduce diff size** for large repositories:
```bash
/handoff "topic" --maxDiffLines 30
```

2. **Limit commit history:**
```bash
/handoff "topic" --maxCommitsToShow 5
```

3. **Skip optional sections** to speed up generation:
```bash
/handoff "topic" --skipSecretDetection --skipQualityScore
```

### Generation Time

| Repository Size | Typical Time | Notes |
|-----------------|-------------|-------|
| Small (<1k files) | 2-3 seconds | Usually instant |
| Medium (1k-10k files) | 5-10 seconds | Depends on diff size |
| Large (10k+ files) | 15-30 seconds | Limit diffs accordingly |

---

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

```bash
git clone https://github.com/quantsquirrel/claude-code-handoff.git
cd handoff
npm install
npm run dev
```

### Running Tests

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Full test suite
npm run test:all
```

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes with tests
4. Ensure all tests pass: `npm test`
5. Commit with clear messages: `git commit -am 'Add feature: my-feature'`
6. Push and create a Pull Request

### Code Style

- Use TypeScript for all code
- Follow ESLint configuration (run `npm run lint`)
- Add tests for new features
- Document public APIs with JSDoc comments

### Report Issues

Found a bug? [Open an issue](https://github.com/quantsquirrel/claude-code-handoff/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, Claude Code version)

---

## License

**MIT License**

Copyright © 2026 Handoff Contributors

See [LICENSE](LICENSE) file for details.

| You are FREE to: | Under these CONDITIONS: |
|------------------|-------------------------|
| ✓ Use commercially | ✓ Include original copyright notice |
| ✓ Modify the source code | ✓ Include license text with distributions |
| ✓ Distribute copies | ✓ State significant changes made |
| ✓ Include in proprietary software | |

---

## 한국어 (Korean)

> 세션 간 컨텍스트를 보존하는 Claude Code 플러그인

### 소개

**Handoff**는 Claude Code에서 세션 간 컨텍스트를 효율적으로 전달하는 독립적이고 standalone 플러그인입니다. 프로젝트의 상태, 결정사항, 진행상황을 자동으로 기록하고, 클립보드에 압축된 프롬프트를 복사합니다.

**별도의 프레임워크 의존성 없이 독립적으로 작동합니다.**

### 주요 특징

| 기능 | 설명 |
|------|------|
| 🎯 **포괄적 컨텍스트** | 프로젝트 상태, 결정사항, 진행상황 자동 기록 |
| 📋 **클립보드 자동 복사** | 한 줄의 명령으로 압축된 프롬프트가 클립보드에 복사 |
| 🔗 **Git 통합** | 커밋 히스토리, 브랜치, 스테이지된 변경사항 포함 |
| 🚫 **실패한 접근법** | 작동하지 않은 것을 문서화하여 반복 방지 |
| ⛓️ **Handoff 체인** | 이전/다음 세션을 연결하여 연속성 유지 |
| 🔐 **시크릿 검출** | API 키, 자격증명 등 잠재적 보안 위험 경고 |
| ⭐ **품질 점수** | Handoff 완성도를 0-100 점수로 검증 |
| 🇰🇷 **한국어 지원** | 한국어 라벨과 컨텍스트를 포함한 클립보드 프롬프트 |
| ✅ **TODO 통합** | .claude/tasks.json의 작업 자동 포함 |
| 🔔 **자동 핸드오프 훅** | 컨텍스트 70% 도달 시 `/handoff` 권유 (선택) |

### 자동 핸드오프 훅

컨텍스트 사용량을 모니터링하고 70%에 도달하면 핸드오프 생성을 권유합니다.

```bash
# 설치
cd ~/.claude/skills/handoff
bash hooks/install.sh
```

| 사용량 | 동작 |
|--------|------|
| 70-79% | 📋 제안 표시 |
| 80-89% | ⚠️ 경고 - 권장 |
| 90%+ | 🚨 긴급 - 즉시 생성 |

### 설치

**추천 방법: 플러그인 마켓플레이스**
```bash
/plugin marketplace add quantsquirrel/claude-code-handoff
```

✅ 가장 쉬움 • ✅ 자동 검증 • ✅ 공식 소스

**직접 설치**
```bash
/plugin install quantsquirrel/claude-code-handoff
```

**수동 설치**
```bash
git clone https://github.com/quantsquirrel/claude-code-handoff.git ~/.claude/skills/handoff
cd ~/.claude/skills/handoff
npm install
```

### 사용법

```bash
# 주제와 함께 handoff 생성
/handoff "인증 리팩토링"

# 상호 대화 모드
/handoff --interactive

# 한국어 출력
/handoff "주제" --language ko
```

### 실행 결과

`/handoff` 실행 후:

✅ **문서 생성됨** - `.claude/handoffs/{timestamp}-{topic}.md`
📋 **클립보드에 복사됨** - 압축된 프롬프트 붙여넣기 준비 완료
📊 **품질 점수 표시** - 0-100 점수 및 상세 분석
🔐 **보안 검사** - 시크릿 감지 시 경고 표시

### 한국어 클립보드 프롬프트 예시

> **[인수인계] 사용자 인증 마이그레이션**
>
> 브랜치: `feature/auth-migration`

| 항목 | 내용 |
|------|------|
| **상태** | 65% 완료 |
| **차단 요소** | Auth0 테넌트 구성 대기 중 |
| **진행** | Auth0 제공자 완료, 테스트 오늘 시작 |

**파일:**
- `src/auth/auth0-provider.ts`
- `src/config/environment.ts`

**결정사항:**
- Auth0 도입 (25일)
- 배치 마이그레이션 (29일)
- 이중 검증 (30일)

**실패한 접근법:**
- ~~DB 트랜잭션 락~~ → 배치 마이그레이션 사용

**다음 단계:** 제공자 초기화 완료 → 스테이징 테스트 → 배포

### 설정 파일

`.claude/handoffs.config.json` 파일 생성:

```json
{
  "language": "ko",
  "outputDir": ".claude/handoffs",
  "clipboardFormat": "compressed"
}
```

### 문서 구조

| 필수 섹션 | 설명 |
|-----------|------|
| **컨텍스트 요약** | 현재 목표, 프로젝트 상태 |
| **기술 세부사항** | Git 상태, 활성 작업, 코드 변경 |
| **핵심 결정사항** | 아키텍처 결정, API 설계 |
| **다음 단계** | 즉시 조치사항, 단기/중기 계획 |

| 고급 섹션 | 설명 |
|-----------|------|
| **실패한 접근법** | 작동하지 않은 것, 교훈 |
| **Handoff 체인** | 이전/다음 세션 링크 |
| **차단 요소** | 현재 차단 요소, 외부 의존성 |
| **품질 메트릭** | 코드 커버리지, 성능 지표 |

### 프로그래매틱 접근

```javascript
const { createHandoff } = require('@claude-code/handoff');

const handoff = await createHandoff({
  topic: '데이터베이스 마이그레이션',
  language: 'ko'  // 한국어 출력
});

console.log(`생성됨: ${handoff.path}`);
console.log(`품질 점수: ${handoff.qualityScore}/100`);
```

### 문제 해결

**클립보드에 복사되지 않음**

```bash
# macOS 확인
which pbcopy

# Linux 확인
which xclip

# 설치 필요 시
sudo apt-get install xclip
```

**품질 점수가 낮음**

- ✓ Git 저장소 초기화: `git init`
- ✓ 작업 설명 추가: `.claude/tasks.json`
- ✓ 실패한 접근법 문서화
- ✓ 이전 Handoff 링크: `/handoff "주제" --previous sess_id`

### 피드백 및 기여

한국어 관련 이슈나 기여를 환영합니다!

[GitHub Issues에서 제출하기](https://github.com/quantsquirrel/claude-code-handoff/issues)

<div align="right"><a href="#top">⬆️ Back to Top</a></div>

---

## Support

**Resources**
- Documentation: Check the [docs](./docs) directory
- Examples: See [examples](./examples) directory

**Community**
- Issues: [GitHub Issues](https://github.com/quantsquirrel/claude-code-handoff/issues)
- Discussions: [GitHub Discussions](https://github.com/quantsquirrel/claude-code-handoff/discussions)

**If you use Handoff, consider giving it a star on GitHub:**

⭐ github.com/quantsquirrel/claude-code-handoff

---

## Changelog

### v1.2.0 (February 1, 2026)

**UX Improvements**

- 📝 Added clear `/clear` + paste instruction at end of handoff output
- 📖 Added "How to Resume" section in Quick Start
- 🎨 Improved README design with flat-square badges
- 📁 Added project structure tree section
- 🔄 Replaced broken unicode boxes with markdown tables
- 🧹 Removed duplicate footer text and cleaned up acknowledgments

### v1.1.0 (January 31, 2026)

**Auto-Handoff Hook**

- 🔔 New: Auto-handoff hook monitors context usage
- 📊 Graduated warnings at 70%, 80%, 90% thresholds
- ⏱️ 3-minute cooldown between suggestions
- 📁 Smart detection skips if handoff recently created
- 🔧 Easy installation via `hooks/install.sh`

### v1.0.0 (January 31, 2026)

**Initial Release**

**Core Features:**
- ✨ Full handoff document generation
- 📋 Clipboard auto-copy with pbcopy/xclip
- 🔗 Git integration with diffs and commit history
- ✅ TODO list integration
- 📊 Comprehensive session metadata

**Advanced Features:**
- 🇰🇷 Korean language support
- 🚫 Failed approaches tracking
- ⛓️ Handoff chain linking
- 🔐 Secret detection and warnings
- ⭐ Quality score validation

---

## Acknowledgments

Special thanks to the Claude Code community for feedback and feature suggestions.

🙏 Contributors • 💡 Ideas • 🐛 Bug Reports

---

**🏃 Ready to pass the baton?** Run `/handoff` and keep the momentum going!

Made by [QuantSquirrel](https://github.com/quantsquirrel) | [Report Issue](https://github.com/quantsquirrel/claude-code-handoff/issues) | [Contribute](https://github.com/quantsquirrel/claude-code-handoff/blob/main/CONTRIBUTING.md)

⭐ **Star us on GitHub:** [claude-code-handoff](https://github.com/quantsquirrel/claude-code-handoff)

<div align="right">

[![Back to Top][back-to-top]](#top)

</div>

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
