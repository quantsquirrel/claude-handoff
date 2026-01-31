# Handoff

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Claude Code Compatible](https://img.shields.io/badge/Claude%20Code-compatible-success)](https://github.com/anthropics/claude-code)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](./package.json)

An independent, standalone Claude Code plugin for creating comprehensive session handoff documents. Seamlessly transfer context, decisions, and progress between Claude Code sessions with automatic clipboard integration and quality validation.

> **Master context continuity across sessions. Never lose momentum again.**
>
> **Works independently - no framework dependencies required.**

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Output Format](#output-format)
- [Comparison](#comparison-with-alternatives)
- [Configuration](#configuration)
- [Advanced Usage](#advanced-usage)
- [Contributing](#contributing)
- [License](#license)
- [한국어 (Korean)](#한국어-korean)

---

## Features

### Core Capabilities

- **🎯 Comprehensive Context Capture** - Automatically documents project state, decisions, progress, and blockers
- **📋 Clipboard Auto-Copy** - One-line compressed prompt instantly copied to clipboard (pbcopy/xclip)
- **🔗 Git Integration** - Captures commit history, current branch, staged changes, and file diffs
- **✅ Todo Integration** - Automatically includes pending and in-progress tasks from `.claude/tasks.json`
- **🇰🇷 Korean Language Support** - Unique clipboard prompt with Korean labels and context
- **🚫 Failed Approaches Tracking** - Document what didn't work to avoid repeating mistakes
- **⛓️ Handoff Chain** - Link previous and next sessions for narrative continuity
- **🔐 Secret Detection** - Identifies and warns about potential secrets (API keys, credentials)
- **⭐ Quality Score** - Validates handoff completeness with detailed scoring breakdown
- **📊 Session Metadata** - Captures timestamps, branch info, and environment details

---

## Quick Start

### Installation

**Recommended: Via Plugin Marketplace**

```bash
# Install from Claude Code plugin marketplace
/plugin marketplace add quantsquirrel/claude-code-handoff
```

**Or: Direct Install**

```bash
# Install directly from GitHub
/plugin install quantsquirrel/claude-code-handoff
```

**Or: Manual Installation**

```bash
# Clone to Claude Code skills directory
git clone https://github.com/quantsquirrel/claude-code-handoff.git ~/.claude/skills/handoff
```

### Basic Usage

```bash
# Create a handoff with topic
/handoff "authentication refactoring"

# Create a handoff with auto-detected topic
/handoff

# Interactive mode with questions
/handoff --interactive
```

### Immediate Result

After running `/handoff`, you'll see:
1. ✅ Handoff document created at `.claude/handoffs/{timestamp}-{topic}.md`
2. 📋 Compressed prompt automatically copied to clipboard
3. 📊 Quality score displayed (0-100)
4. 🔐 Security warnings (if any secrets detected)

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

This automatically:
- Downloads the plugin directly from GitHub
- Places it in `~/.claude/skills/handoff`
- Registers the `/handoff` command
- Validates installation

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

Verify installation by checking for the skill:
```bash
/plugin list | grep handoff
```

Expected output: `handoff (v1.0.0) - Session handoff and context transfer`

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

**Output:**
```
✅ Handoff created: .claude/handoffs/2026-01-31-123456-auth-migration.md
📋 Compressed prompt copied to clipboard (892 chars)
⭐ Quality Score: 87/100
  ├─ Context Coverage: 95%
  ├─ Decision Documentation: 85%
  ├─ Failed Approaches: 80%
  ├─ Secret Detection: 100%
  └─ Continuity Links: 75%
```

#### 2. Interactive Mode

```bash
/handoff --interactive
```

Prompts you with questions:
```
? What's the main topic? > user authentication
? Current blockers? > Database migration timing
? Next priorities? > API integration testing
? Previous handoff ID? > 2026-01-30-092345
```

#### 3. Auto-Detect from Git Branch

```bash
# On branch: feature/dark-mode-redesign
/handoff
```

Auto-uses topic: `dark-mode-redesign`

#### 4. With Custom Config

```bash
/handoff "database optimization" --config my-config.json
```

Loads custom settings from `my-config.json`.

---

## Output Format

### Handoff Document Structure

Every handoff creates a markdown file with comprehensive sections:

**File Location:** `.claude/handoffs/{date}-{time}-{topic}.md`

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
2026-01-29 09:55 - fix: resolve JWT token refresh timing issue
```

**Staged Changes:**
- `src/auth/auth0-provider.ts` (modified)
- `src/config/environment.ts` (modified)
- `tests/auth0.test.ts` (added)

**Uncommitted Changes:**
```diff
diff --git a/src/auth/auth0-provider.ts b/src/auth/auth0-provider.ts
index abc123..def456 100644
--- a/src/auth/auth0-provider.ts
+++ b/src/auth/auth0-provider.ts
@@ -15,7 +15,7 @@ export class Auth0Provider {
   async initialize() {
-    const config = this.loadConfig();
+    const config = await this.loadConfigAsync();
     return this.client.initialize(config);
   }
```

### Active Tasks
- `[in_progress]` Implement Auth0 user sync endpoint
- `[in_progress]` Update database schema for Auth0 user IDs
- `[pending]` Integration testing with staging Auth0 tenant
- `[pending]` Documentation updates for new auth flow

---

## Key Decisions Made

### Architecture Decisions
1. **Decision:** Use Auth0 instead of custom JWT implementation
   - **Rationale:** Reduces maintenance burden, improves security posture
   - **Trade-off:** Adds external dependency, increases monthly costs
   - **Date:** January 25, 2026

2. **Decision:** Migrate user data during off-peak hours
   - **Rationale:** Minimal impact on active users
   - **Implementation:** Scheduled migration for 2:00-4:00 AM EST
   - **Date:** January 29, 2026

3. **Decision:** Keep legacy JWT validation during transition period
   - **Rationale:** Allows gradual rollout without forced logout
   - **Duration:** 30-day grace period
   - **Date:** January 30, 2026

### API Design
- New endpoint: `POST /api/auth/sync-to-auth0`
- Response format: Standard JWT with Auth0 claims
- Rate limiting: 100 requests/minute per user

---

## Failed Approaches & Learnings

### Attempt 1: Direct Database Migration
**What:** Migrating all user records in single transaction
**Why it failed:** Locked database for 2+ hours, caused production outage
**Lesson:** Always test with production-scale data before implementation
**Better approach:** Use batched async migration with transaction checkpoints

### Attempt 2: Client-Side Token Refresh
**What:** Implementing token refresh logic in React components
**Why it failed:** Race conditions when multiple components refresh simultaneously
**Lesson:** Centralize token management in authentication context
**Better approach:** Single source of truth in custom hook with mutex pattern

### Attempt 3: Immediate User Logout on Auth0 Switch
**What:** Force all users to re-login when switching providers
**Why it failed:** Angry users, support tickets flooded
**Lesson:** Always plan for graceful transitions
**Better approach:** Dual-validation period where both JWT and Auth0 work

---

## Handoff Chain

### Previous Session
**ID:** sess_2026_01_30_145632
**Topic:** Database schema planning for Auth0 integration
**Document:** `.claude/handoffs/2026-01-30-145632-db-schema-planning.md`
**Key Outcomes:**
- Finalized user_auth_tokens schema
- Identified 3 migration strategies

### Next Session (Expected)
**Planned Topic:** Auth0 provider integration testing
**Blockers to Address:** Database sync endpoint validation
**Handoff Time:** Tomorrow morning

---

## Blockers & Dependencies

### Current Blockers
1. **Auth0 Tenant Configuration**
   - Status: Waiting for DevOps approval
   - Impact: Cannot test end-to-end flow
   - ETA: January 31 EOD
   - Workaround: Use Auth0 sandbox tenant

2. **Database Migration Script**
   - Status: In code review
   - Impact: Cannot deploy to staging
   - Owner: @database-team
   - ETA: February 1

### External Dependencies
- Auth0 API availability (99.99% SLA)
- PostgreSQL 13+ (current version: 14.2)
- Node.js 18+ (current: 18.12.0)

---

## Environment & Setup

### Environment Variables
```bash
REACT_APP_AUTH0_DOMAIN=dev-xxxx.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=abc123def456
AUTH0_CLIENT_SECRET=*** (secure store)
DATABASE_URL=postgresql://user:pass@localhost:5432/auth_dev
MIGRATION_BATCH_SIZE=1000
```

### Installed Dependencies
```
auth0@10.8.0
@auth0/auth0-react@2.0.1
jsonwebtoken@9.0.0
dotenv@16.0.3
```

### Development Server
```bash
npm run dev
# Starts on http://localhost:3000
# Hot reload: enabled
# Debug mode: enabled
```

---

## Quality Metrics

### Code Coverage
- Unit Tests: 78%
- Integration Tests: 65%
- E2E Tests: 42%

### Performance Baseline
- Auth0 Token Exchange: 240ms avg
- User Sync Endpoint: 680ms avg
- Database Query (user lookup): 15ms avg

---

## Security Considerations

### Secrets Detected: 0 instances
✅ No API keys in code
✅ No database credentials in code
✅ All secrets in environment variables

### Security Checklist
- [ ] CORS configuration reviewed
- [ ] Rate limiting implemented
- [ ] Input validation added to all endpoints
- [ ] SQL injection prevention verified
- [ ] CSRF protection enabled

---

## Resources & References

### Documentation
- [Auth0 Integration Guide](https://auth0.com/docs/get-started/applications)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
- [Database Migration Patterns](https://wiki.postgresql.org/wiki/Replication,_Clustering,_and_Connection_Pooling)

### Related Issues
- #1234: User authentication migration epic
- #1245: Database schema update PR
- #1256: Auth0 config management

### Team Contacts
- **Auth0 Setup:** @devops-team
- **Database Migration:** @database-team
- **Frontend Integration:** @frontend-team

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

### Medium-term (Next week)
1. User acceptance testing
2. Documentation updates
3. Training session for support team

---

## Session Summary

**What was accomplished:**
- Implemented Auth0 provider module with 92% test coverage
- Updated 4 API endpoints for new auth flow
- Created migration strategy for 50K+ existing users
- Fixed JWT refresh race condition

**What needs follow-up:**
- Complete database migration endpoint validation
- Staging environment testing
- DevOps Auth0 tenant approval

**Confidence level:** 8/10 - Core auth logic solid, external dependencies pending

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

---

## Handoff Metadata

```json
{
  "version": "1.0",
  "sessionId": "sess_2026_01_31_103456",
  "createdAt": "2026-01-31T10:34:56Z",
  "topic": "user-authentication-migration",
  "duration": "4h 32m",
  "branch": "feature/auth-migration",
  "commits": 12,
  "filesTour": 7,
  "decisionsMade": 3,
  "failedApproaches": 3,
  "qualityScore": 87,
  "previousSession": "sess_2026_01_30_145632",
  "nextSessionPlanned": true
}
```

---

```

### Compressed Clipboard Prompt

The skill also copies a compact version to your clipboard:

```
[HANDOFF] User Auth Migration | Branch: feature/auth-migration
STATUS: 65% • BLOCKER: Auth0 tenant config pending
PROGRESS: Auth0 provider done • TESTING: Starting today
FILES: src/auth/auth0-provider.ts | src/config/environment.ts | tests/auth0.test.ts
DECISIONS: Auth0 adoption (25th) • Batch migration (29th) • Dual validation (30th)
FAILED: DB transaction lock → Use batched migration ✓
         Client refresh races → Centralize auth context ✓
         Force logout → Dual validation period ✓
NEXT: Complete provider init → Staging test → Deploy
PREV: sess_2026_01_30_145632
```

---

## Comparison with Alternatives

| Feature | Handoff | Softaworks | Willseltzer | Claude-Mem |
|---------|---------|-----------|------------|-----------|
| **Context Capture** | ✅ Comprehensive | ✅ Basic | ✅ Moderate | ✅ Basic |
| **Clipboard Auto-Copy** | ✅ Yes (pbcopy/xclip) | ❌ No | ✅ Manual copy | ❌ No |
| **Korean Support** | ✅ Full (unique) | ❌ No | ❌ No | ❌ No |
| **Git Integration** | ✅ Full (history, diffs) | ✅ Branch only | ⚠️ Limited | ❌ No |
| **Todo Integration** | ✅ Yes (.claude format) | ❌ No | ❌ No | ✅ Basic |
| **Failed Approaches** | ✅ Dedicated section | ❌ No | ❌ No | ❌ No |
| **Handoff Chain** | ✅ Link previous/next | ❌ No | ❌ No | ❌ No |
| **Secret Detection** | ✅ Yes, with warnings | ❌ No | ❌ No | ❌ No |
| **Quality Score** | ✅ Detailed scoring | ❌ No | ⚠️ Simple | ❌ No |
| **Session Metadata** | ✅ Comprehensive | ⚠️ Minimal | ✅ Good | ⚠️ Minimal |
| **Custom Config** | ✅ Full support | ❌ Limited | ⚠️ Some options | ✅ Full |
| **Claude Code Integration** | ✅ Native | ⚠️ Plugin | ⚠️ Plugin | ✅ Native |

---

## Configuration

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

### Using Custom Configuration

```bash
# Use specific config file
/handoff "topic" --config /path/to/config.json

# Override single option
/handoff "topic" --includeGitDiff false

# Use Korean output
/handoff "topic" --language ko
```

---

## Advanced Usage

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

### Secret Detection Details

The skill detects common patterns:

```
✓ AWS keys (AKIA...)
✓ Google API keys
✓ GitHub tokens (ghp_...)
✓ Database credentials (postgresql://user:pass)
✓ API keys in URLs
✓ Private encryption keys
✓ JWT secrets
✓ OAuth tokens
```

**Security Note:** Handoff files should be kept in `.gitignore` if they contain secrets.

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

## Troubleshooting

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

**Solution:**
Create `.handoffignore` for safe patterns:

```
# .handoffignore
^\$\{.*\}$  # Ignore template variables
^test-.*$   # Ignore test API keys
```

### Large Handoff Files

**Problem:** Handoff document too large (>10MB)

**Solution:**
Reduce content scope:

```bash
/handoff "topic" --maxDiffLines 20 --maxCommitsToShow 5
```

---

## Performance Considerations

### Optimization Tips

1. **Reduce diff size** for large repositories:
   ```bash
   /handoff "topic" --maxDiffLines 30
   ```

2. **Limit commit history**:
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

## License

MIT License - see [LICENSE](LICENSE) file for details.

**Copyright © 2026 Handoff Contributors**

You are free to:
- Use commercially
- Modify the source code
- Distribute copies
- Include in proprietary software

Under the conditions of:
- Including original copyright notice
- Including license text with distributions
- Stating significant changes made

---

## 한국어 (Korean)

### 소개

**Handoff**는 Claude Code에서 세션 간 컨텍스트를 효율적으로 전달하는 독립적이고 standalone 플러그인입니다. 프로젝트의 상태, 결정사항, 진행상황을 자동으로 기록하고, 클립보드에 압축된 프롬프트를 복사합니다.

> **별도의 프레임워크 의존성 없이 독립적으로 작동합니다.**

### 주요 특징

- 🎯 **포괄적 컨텍스트 캡처** - 프로젝트 상태, 결정사항, 진행상황 자동 기록
- 📋 **클립보드 자동 복사** - 한 줄의 명령으로 압축된 프롬프트가 클립보드에 복사됨
- 🔗 **Git 통합** - 커밋 히스토리, 현재 브랜치, 스테이지된 변경사항 자동 포함
- ✅ **Todo 통합** - `.claude/tasks.json`의 pending/in-progress 작업 자동 포함
- 🇰🇷 **한국어 지원** - 한국어 라벨과 컨텍스트를 포함한 클립보드 프롬프트
- 🚫 **실패한 접근법 추적** - 무엇이 작동하지 않았는지 문서화하여 반복 방지
- ⛓️ **Handoff 체인** - 이전/다음 세션을 연결하여 연속성 유지
- 🔐 **시크릿 검출** - API 키, 자격증명 등 잠재적 보안 위험 경고
- ⭐ **품질 점수** - Handoff 완성도를 0-100 점수로 검증

### 설치

**추천: 플러그인 마켓플레이스 (가장 쉬움)**

```bash
# Claude Code 플러그인 마켓플레이스에서 설치
/plugin marketplace add quantsquirrel/claude-code-handoff
```

**또는: 직접 설치**

```bash
# GitHub에서 직접 설치
/plugin install quantsquirrel/claude-code-handoff
```

**또는: 수동 설치**

```bash
# Claude Code skills 디렉토리에 복제
git clone https://github.com/quantsquirrel/claude-code-handoff.git ~/.claude/skills/handoff
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

### 결과

`/handoff` 실행 후:

1. ✅ Handoff 문서 생성: `.claude/handoffs/{timestamp}-{topic}.md`
2. 📋 압축된 프롬프트가 클립보드에 자동 복사
3. 📊 품질 점수 표시 (0-100)
4. 🔐 보안 경고 표시 (시크릿 감지 시)

### 한국어 사용자를 위한 팁

1. **언어 설정**:
   ```bash
   /handoff "주제" --language ko
   ```

2. **한국어 클립보드 프롬프트**:
   ```
   [인수인계] 사용자 인증 마이그레이션 | 브랜치: feature/auth-migration
   상태: 65% • 차단 요소: Auth0 테넌트 구성 대기 중
   진행: Auth0 제공자 완료 • 테스트: 오늘 시작
   파일: src/auth/auth0-provider.ts | src/config/environment.ts
   결정사항: Auth0 도입 (25일) • 배치 마이그레이션 (29일) • 이중 검증 (30일)
   실패한 접근법: DB 트랜잭션 락 → 배치 마이그레이션 사용 ✓
   다음: 제공자 초기화 완료 → 스테이징 테스트 → 배포
   ```

3. **설정 파일** (`.claude/handoffs.config.json`):
   ```json
   {
     "language": "ko",
     "outputDir": ".claude/handoffs",
     "clipboardFormat": "compressed"
   }
   ```

### 한국어 설명

#### Handoff 문서의 주요 섹션

| 섹션 | 설명 |
|------|------|
| **컨텍스트 요약** | 현재 목표, 프로젝트 상태, 임계값 정보 |
| **기술 세부사항** | Git 상태, 활성 작업, 코드 변경사항 |
| **핵심 결정사항** | 아키텍처 결정, API 설계, 거래 검토 |
| **실패한 접근법** | 작동하지 않은 것, 그 이유, 교훈 |
| **Handoff 체인** | 이전 세션 링크, 다음 세션 계획 |
| **차단 요소** | 현재 차단 요소, 외부 의존성 |
| **다음 단계** | 즉시 조치사항, 단기/중기 계획 |

### 고급 사용법

**프로그래매틱 접근**:

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

**클립보드에 복사되지 않음:**

```bash
# macOS 확인
which pbcopy

# Linux 확인
which xclip

# 설치 필요 시
sudo apt-get install xclip
```

**품질 점수가 낮음:**
- Git 저장소 초기화 확인: `git init`
- 작업 설명 추가: `.claude/tasks.json`
- 실패한 접근법 문서화
- 이전 Handoff 링크: `/handoff "주제" --previous sess_id`

### 피드백 및 기여

한국어 관련 이슈나 기여는 [GitHub Issues](https://github.com/quantsquirrel/claude-code-handoff/issues)를 통해 제출해주세요.

---

## Support

### Getting Help

- **Documentation:** Check the [docs](./docs) directory
- **Examples:** See [examples](./examples) directory
- **Issues:** [GitHub Issues](https://github.com/quantsquirrel/claude-code-handoff/issues)
- **Discussions:** [GitHub Discussions](https://github.com/quantsquirrel/claude-code-handoff/discussions)

### Citation

If you use Handoff in your workflow, consider giving it a star on GitHub:

```
⭐ github.com/quantsquirrel/claude-code-handoff
```

---

## Changelog

### v1.0.0 (January 31, 2026)

**Initial Release**

- ✨ Full handoff document generation
- 📋 Clipboard auto-copy with pbcopy/xclip
- 🔗 Git integration with diffs and commit history
- ✅ Todo list integration
- 🇰🇷 Korean language support
- 🚫 Failed approaches tracking
- ⛓️ Handoff chain linking
- 🔐 Secret detection and warnings
- ⭐ Quality score validation
- 📊 Comprehensive session metadata

---

## Acknowledgments

Built for the Claude Code ecosystem with ❤️

Special thanks to the Claude Code community for feedback and feature suggestions.

---

**Ready to hand off? Run `/handoff` and watch your context transfer seamlessly! 🚀**
