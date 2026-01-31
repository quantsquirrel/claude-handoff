# Handoff Skill

## Purpose

세션 간 작업 컨텍스트를 보존하고 전달하기 위한 핸드오프 문서를 생성합니다. 긴 작업이 여러 세션에 걸쳐 진행될 때, 다음 세션이 중단 없이 계속할 수 있도록 핵심 정보를 체계적으로 정리합니다.

## Usage

```bash
/handoff [output-path]
```

**Arguments:**
- `output-path` (optional): 핸드오프 문서를 저장할 경로
  - 미지정 시: `.claude/handoffs/handoff-YYYYMMDD-HHMMSS.md`
  - 지정 시: 해당 경로에 저장

**Examples:**
```bash
/handoff
/handoff .claude/handoffs/session-1.md
/handoff docs/handoff-auth-feature.md
```

## Behavior

핸드오프 스킬은 다음 5단계로 작동합니다:

### Step 1: Context Gathering (컨텍스트 수집)

현재 세션의 모든 관련 정보를 수집합니다:

- **대화 기록 분석**: 사용자 요청, 에이전트 응답, 의사결정 과정
- **파일 변경 추적**: Git status로 modified/created/deleted 파일 확인
- **TODO 상태**: 완료된 작업과 미완료 작업 목록
- **에러/경고**: 발생한 문제와 해결 시도
- **아키텍처 결정**: 중요한 기술 선택과 그 이유

### Step 2: Secret Detection (비밀 정보 탐지)

핸드오프 문서에 민감한 정보가 포함되지 않도록 검사합니다:

**검사 패턴:**
- API keys: `API_KEY`, `APIKEY`, `api-key`
- Secrets: `SECRET`, `secret_key`
- Passwords: `PASSWORD`, `passwd`, `pwd`
- Tokens: `TOKEN`, `auth_token`, `access_token`
- Private keys: `private_key`, `PRIVATE_KEY`, `-----BEGIN`
- Database credentials: `DB_PASSWORD`, `db_user`

**처리 방식:**
```
❌ FOUND: API_KEY=sk-1234567890abcdef
✅ REDACTED: API_KEY=***REDACTED***

⚠️  WARNING: Secrets detected and redacted in handoff document.
Please verify no sensitive data is exposed.
```

탐지 시 경고를 표시하고, 자동으로 `***REDACTED***`로 치환합니다.

### Step 3: Template Population (템플릿 채우기)

수집된 정보로 핸드오프 템플릿을 작성합니다:

```markdown
# Handoff Document

**Generated:** YYYY-MM-DD HH:MM:SS
**Session Duration:** [duration]
**Working Directory:** [cwd]

## Session Summary

[3-5 문장으로 이번 세션에서 무엇을 했는지 요약]

## Handoff Chain

- **Previous:** `[이전 핸드오프 문서 경로 또는 "None"]`
- **Next:** `(to be generated)`
- **Session Count:** [N번째 세션]

## Completed

- [x] 완료된 작업 1
- [x] 완료된 작업 2
- [x] 완료된 작업 3

## Pending

- [ ] 미완료 작업 1 - 상태: [진행률/블로커]
- [ ] 미완료 작업 2 - 상태: [진행률/블로커]

## Key Decisions

### Decision 1: [제목]
- **Context:** [왜 이 결정이 필요했는가]
- **Choice:** [무엇을 선택했는가]
- **Rationale:** [왜 이것을 선택했는가]
- **Alternatives:** [고려했지만 선택하지 않은 옵션들]

### Decision 2: [제목]
...

## Failed Approaches (Don't Repeat)

### Approach 1: [시도한 방법]
- **What was tried:** [구체적으로 무엇을 시도했는가]
- **Why it failed:** [실패 원인 - 에러, 제약사항, 성능 이슈 등]
- **Evidence:** [에러 로그, 테스트 결과 등]
- **Learning:** [이 실패에서 배운 점]

### Approach 2: [시도한 방법]
...

## Known Issues

### Issue 1: [문제 제목]
- **Description:** [문제 상세]
- **Workaround:** [임시 해결책 또는 "None"]
- **Root Cause:** [근본 원인 또는 "Unknown"]
- **Impact:** [영향 범위 - High/Medium/Low]

### Issue 2: [문제 제목]
...

## Files Modified

### Created
- `path/to/new/file1.ts` - [목적]
- `path/to/new/file2.tsx` - [목적]

### Modified
- `path/to/existing/file1.ts` - [변경 내용]
- `path/to/existing/file2.tsx` - [변경 내용]

### Deleted
- `path/to/removed/file.ts` - [삭제 이유]

## Next Steps

### Immediate (다음 세션 시작 시)
1. [구체적인 첫 번째 액션] - 예상 소요: [시간]
2. [구체적인 두 번째 액션] - 예상 소요: [시간]

### Short-term (이번 작업 완료를 위해)
- [ ] [작업 항목 1]
- [ ] [작업 항목 2]
- [ ] [작업 항목 3]

### Long-term (향후 개선 사항)
- [ ] [기술 부채 해결 1]
- [ ] [최적화 기회 1]
- [ ] [확장성 개선 1]

## How to Resume

**다음 세션 재개 방법:**

1. **이 핸드오프 문서 읽기**
   ```bash
   cat [handoff-path]
   ```

2. **현재 Git 상태 확인**
   ```bash
   git status
   git log -5 --oneline
   ```

3. **첫 번째 액션 실행**
   - Next Steps > Immediate의 첫 번째 항목부터 시작
   - 필요 시 Failed Approaches를 참고하여 동일한 실수 방지

4. **컨텍스트 복원 확인**
   - 관련 파일들이 예상대로 수정되어 있는지 확인
   - Known Issues를 숙지하고 작업 진행

## Notes

[추가적인 컨텍스트, 참고 링크, 유용한 명령어 등]

---

**Quality Score:** [점수/100]

**Score Breakdown:**
- All sections filled: [20/20 또는 0/20]
- No TODO placeholders: [20/20 또는 0/20]
- No secrets detected: [20/20 또는 0/20]
- Next Steps are specific: [20/20 또는 0/20]
- Files Modified listed: [20/20 또는 0/20]

⚠️  **Warning:** Score below 70 indicates incomplete handoff. Please review and fill missing sections.
```

### Step 4: Clipboard Export (클립보드 내보내기)

핸드오프 문서를 파일로 저장하고, 요약본을 클립보드에 복사합니다.

**클립보드 요약본 생성 (최대 500자):**

```
📋 핸드오프 요약 (Session N)

✅ 완료: [완료 항목 개수]개
⏳ 대기: [미완료 항목 개수]개
📁 파일: [수정 파일 개수]개

다음 작업:
1. [첫 번째 next step]
2. [두 번째 next step]

⚠️  주의: [가장 중요한 Known Issue 1개]

전체 문서: [handoff-path]
```

**플랫폼별 클립보드 명령:**

- **macOS:** `pbcopy`
  ```bash
  echo "[summary]" | pbcopy
  ```

- **Linux:** `xclip` (설치 필요) 또는 `xsel`
  ```bash
  echo "[summary]" | xclip -selection clipboard
  # or
  echo "[summary]" | xsel --clipboard
  ```

**출력:**
```
✅ Handoff document saved to: [path]
📋 Summary copied to clipboard (500 chars)

Paste with:
- macOS: Cmd+V
- Linux: Ctrl+V
```

### Step 5: Quality Validation (품질 검증)

생성된 핸드오프 문서의 품질을 평가합니다.

**품질 점수 계산 (100점 만점):**

| 항목 | 배점 | 통과 조건 | 실패 조건 |
|------|------|-----------|-----------|
| All sections filled | 20점 | 모든 필수 섹션에 내용 존재 | 빈 섹션 또는 "N/A"만 있음 |
| No TODO placeholders | 20점 | `TODO`, `TBD`, `[...]` 없음 | Placeholder 존재 |
| No secrets detected | 20점 | Secret 패턴 미탐지 | Secret 탐지됨 (redact 후에도 감점) |
| Next Steps are specific | 20점 | 구체적 액션 + 예상 시간 | 모호한 표현 ("improve", "fix") |
| Files Modified listed | 20점 | Git status의 모든 변경 파일 나열 | 누락된 파일 존재 |

**점수별 피드백:**

- **90-100점:** ✅ Excellent handoff quality
- **70-89점:** ⚠️  Good, but could be improved
- **50-69점:** ⚠️  WARNING: Incomplete handoff. Review missing sections.
- **0-49점:** ❌ CRITICAL: Handoff is severely incomplete. Do not proceed.

**70점 미만 시 경고:**

```
⚠️  WARNING: Quality Score = [점수]/100

Missing or incomplete:
- [ ] [문제 항목 1]
- [ ] [문제 항목 2]

Please address these issues before ending the session.
Would you like me to improve the handoff document? (yes/no)
```

## Handoff Chain Management

핸드오프 체인은 여러 세션에 걸친 작업의 연속성을 추적합니다.

### Chain 초기화 (첫 세션)

```markdown
## Handoff Chain
- **Previous:** None
- **Next:** (to be generated)
- **Session Count:** 1
```

### Chain 연결 (후속 세션)

다음 세션 시작 시:

1. **이전 핸드오프 찾기:**
   ```bash
   ls -t .claude/handoffs/*.md | head -1
   ```

2. **이전 문서 업데이트 (Next 필드):**
   ```markdown
   - **Next:** `.claude/handoffs/handoff-20260131-143022.md`
   ```

3. **새 문서에 Previous 설정:**
   ```markdown
   ## Handoff Chain
   - **Previous:** `.claude/handoffs/handoff-20260131-120000.md`
   - **Next:** (to be generated)
   - **Session Count:** 2
   ```

### Chain 시각화

```bash
# 전체 체인 보기
grep -r "Handoff Chain" .claude/handoffs/*.md

# 출력 예시:
Session 1: None → session-2.md
Session 2: session-1.md → session-3.md
Session 3: session-2.md → (to be generated)
```

## Output

핸드오프 스킬은 다음을 생성합니다:

1. **핸드오프 파일:**
   - 경로: `[지정 경로]` 또는 `.claude/handoffs/handoff-YYYYMMDD-HHMMSS.md`
   - 내용: 전체 핸드오프 템플릿 (모든 섹션 포함)

2. **클립보드 요약:**
   - 최대 500자
   - 한국어로 작성
   - 핵심 정보만 포함

3. **콘솔 출력:**
   ```
   ✅ Handoff document saved to: .claude/handoffs/handoff-20260131-143022.md
   📋 Summary copied to clipboard (487/500 chars)
   📊 Quality Score: 85/100 (Good)

   Handoff Chain:
   - Previous: .claude/handoffs/handoff-20260131-120000.md
   - Session: 2

   Next Steps:
   1. Read handoff document
   2. Check git status
   3. Start with: [first action from Next Steps]

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📌 새 세션에서 컨텍스트 복원하기:
      1. /clear 입력 (현재 세션 정리)
      2. Cmd+V 또는 Ctrl+V (클립보드 붙여넣기)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

## Edge Cases

### 1. Git 저장소가 아닌 경우

```
⚠️  Not a git repository. File changes cannot be tracked automatically.
Please manually list modified files in the handoff document.
```

Files Modified 섹션을 수동으로 작성하도록 안내합니다.

### 2. 클립보드 도구 없음 (Linux)

```
⚠️  Clipboard tool not found. Install xclip or xsel:
    sudo apt-get install xclip
    # or
    sudo apt-get install xsel

Handoff saved to: [path]
```

파일 저장은 성공하지만 클립보드 복사는 건너뜁니다.

### 3. 빈 세션 (변경사항 없음)

```
⚠️  No file changes detected. Are you sure you want to create a handoff?
This session appears to have no code modifications.

Continue anyway? (yes/no)
```

사용자 확인 후 진행합니다.

### 4. 500자 초과 요약

```
📋 Summary too long (623 chars). Truncating to 500 chars...

✂️  Truncated summary copied to clipboard.
Full details in: [handoff-path]
```

핵심 정보 우선순위로 잘라냅니다:
1. Session count
2. Completed/Pending counts
3. First 2 Next Steps
4. First Known Issue
5. File path

### 5. 중복 핸드오프 (같은 타임스탬프)

```
⚠️  Handoff file already exists: [path]
Overwrite? (yes/no)
```

기본 경로 사용 시 초 단위 타임스탬프로 중복 방지하지만, 수동 경로는 확인합니다.

## Best Practices

### 1. 정기적인 핸드오프

- **긴 작업 (2시간 이상):** 중간중간 핸드오프 생성
- **세션 종료 시:** 항상 핸드오프 생성
- **컨텍스트 스위칭 전:** 다른 작업으로 전환하기 전 핸드오프

### 2. 구체적인 Next Steps

❌ **나쁜 예:**
```markdown
## Next Steps
- Fix the bug
- Improve performance
- Add tests
```

✅ **좋은 예:**
```markdown
## Next Steps
### Immediate
1. Fix NullPointerException in `UserService.authenticate()` line 145 - 예상: 15분
2. Add unit test for edge case: empty username - 예상: 10분

### Short-term
- [ ] Refactor authentication logic to use dependency injection
- [ ] Add integration tests for login flow
```

### 3. Failed Approaches 활용

동일한 실수를 반복하지 않도록 실패 사례를 상세히 기록합니다:

```markdown
## Failed Approaches (Don't Repeat)

### Approach 1: Using bcrypt synchronously
- **What was tried:** `bcrypt.hashSync()` in API route handler
- **Why it failed:** Blocked event loop, 500ms+ latency on login
- **Evidence:** Artillery load test showed p95 > 2000ms
- **Learning:** Always use `bcrypt.hash()` (async) in Node.js

### Approach 2: JWT in localStorage
- **What was tried:** Store JWT token in `localStorage` for persistence
- **Why it failed:** Vulnerable to XSS attacks, failed security audit
- **Evidence:** OWASP ZAP scan flagged high-risk vulnerability
- **Learning:** Use httpOnly cookies for auth tokens
```

### 4. 체인 탐색

이전 세션들을 빠르게 참고하려면:

```bash
# 최근 5개 핸드오프 보기
ls -lt .claude/handoffs/*.md | head -5

# 특정 키워드 검색
grep -r "authentication" .claude/handoffs/*.md

# 체인 역추적
# Session 3 → Session 2 → Session 1
```

### 5. 품질 자가 점검

핸드오프 생성 후 스스로 검토:

```
[ ] Session Summary가 3-5문장인가?
[ ] Key Decisions에 "왜"가 명확한가?
[ ] Failed Approaches가 구체적인가?
[ ] Next Steps가 액션 중심인가?
[ ] Known Issues의 Impact가 평가되었는가?
[ ] Files Modified가 완전한가?
[ ] 500자 요약이 핵심을 담았는가?
[ ] Quality Score 70점 이상인가?
```

## Integration with Your Workflow

### 1. 긴 작업 세션 후 핸드오프

장시간 작업 완료 시 핸드오프 문서 생성:

```bash
# 작업 완료 후
/handoff .claude/handoffs/feature-implementation-complete.md
```

### 2. Planning 세션 후 핸드오프

계획 수립 후 다음 구현 세션을 위한 핸드오프:

```bash
# Plan 완료 후
/handoff docs/planning/feature-x-handoff.md
```

핸드오프의 Next Steps에 계획된 TODO 항목을 포함합니다.

### 3. 병렬 작업 후 통합 핸드오프

여러 컴포넌트 작업 완료 후 통합 핸드오프:

```bash
# 여러 작업 완료 후
/handoff .claude/handoffs/multi-component-final.md
```

각 작업 내용을 통합하여 하나의 핸드오프로 정리합니다.

## Examples

### Example 1: Simple Feature Development

```markdown
# Handoff Document

**Generated:** 2026-01-31 14:30:22
**Session Duration:** 1h 45m
**Working Directory:** /Users/dev/myapp

## Session Summary

User authentication 기능을 구현했습니다. JWT 기반 로그인/로그아웃 API를 만들고, bcrypt로 비밀번호 해싱을 추가했습니다. 기본적인 단위 테스트는 작성했지만, 통합 테스트가 아직 미완성입니다. 다음 세션에서는 테스트를 완료하고 에러 핸들링을 개선할 예정입니다.

## Handoff Chain

- **Previous:** None
- **Next:** (to be generated)
- **Session Count:** 1

## Completed

- [x] Create User model with Sequelize
- [x] Implement password hashing with bcrypt
- [x] Add JWT authentication middleware
- [x] Create login/logout API endpoints
- [x] Write unit tests for User model

## Pending

- [ ] Integration tests for login flow - 상태: 50% (setup done, assertions pending)
- [ ] Error handling for invalid credentials - 상태: 0% (not started)
- [ ] Rate limiting for login attempts - 상태: 0% (blocker: need Redis setup)

## Key Decisions

### Decision 1: JWT over Session-based Auth
- **Context:** Need to support mobile clients and future microservices
- **Choice:** JWT with httpOnly cookies
- **Rationale:** Stateless, scalable, mobile-friendly
- **Alternatives:**
  - Session + Redis: Too complex for MVP
  - OAuth2: Overkill for internal auth

### Decision 2: bcrypt over Argon2
- **Context:** Password hashing algorithm selection
- **Choice:** bcrypt with cost factor 12
- **Rationale:** Mature, well-tested, sufficient for current scale
- **Alternatives:**
  - Argon2: Better but less ecosystem support in Node.js
  - scrypt: Good but bcrypt more familiar to team

## Failed Approaches (Don't Repeat)

### Approach 1: Synchronous bcrypt
- **What was tried:** `bcrypt.hashSync()` in route handler
- **Why it failed:** Blocked event loop, 500ms latency
- **Evidence:** Load test p95 > 2s
- **Learning:** Always use async bcrypt.hash()

## Known Issues

### Issue 1: JWT expiration not configurable
- **Description:** Token expiry hardcoded to 1h
- **Workaround:** None (needs refactoring)
- **Root Cause:** Config management not implemented yet
- **Impact:** Low (1h is reasonable for MVP)

## Files Modified

### Created
- `src/models/User.ts` - User model with password hashing
- `src/middleware/auth.ts` - JWT verification middleware
- `src/routes/auth.ts` - Login/logout endpoints
- `tests/unit/User.test.ts` - User model tests

### Modified
- `src/app.ts` - Added auth routes
- `package.json` - Added bcryptjs, jsonwebtoken

## Next Steps

### Immediate (다음 세션 시작 시)
1. 통합 테스트 완성: `tests/integration/auth.test.ts` 작성 - 예상: 30분
2. 에러 핸들링 추가: invalid credentials, missing fields - 예상: 20분

### Short-term (이번 작업 완료를 위해)
- [ ] Rate limiting (express-rate-limit)
- [ ] Refresh token mechanism
- [ ] Password reset flow

### Long-term (향후 개선 사항)
- [ ] Move to Argon2 when production-ready
- [ ] Add OAuth2 providers (Google, GitHub)
- [ ] Implement 2FA

## How to Resume

**다음 세션 재개 방법:**

1. **이 핸드오프 문서 읽기**
   ```bash
   cat .claude/handoffs/handoff-20260131-143022.md
   ```

2. **현재 Git 상태 확인**
   ```bash
   git status
   git log -5 --oneline
   ```

3. **첫 번째 액션 실행**
   - `tests/integration/auth.test.ts` 파일 생성
   - POST /api/auth/login 테스트부터 시작
   - Failed Approaches를 참고하여 async bcrypt 사용

4. **컨텍스트 복원 확인**
   - `src/routes/auth.ts`에 login/logout 라우트 존재 확인
   - JWT_SECRET 환경변수 설정 확인

## Notes

- JWT_SECRET은 .env에 설정됨 (git ignored)
- bcrypt cost factor 12는 현재 하드웨어 기준 적절
- 참고: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

---

**Quality Score:** 95/100

**Score Breakdown:**
- All sections filled: 20/20 ✅
- No TODO placeholders: 20/20 ✅
- No secrets detected: 20/20 ✅
- Next Steps are specific: 20/20 ✅
- Files Modified listed: 15/20 ⚠️  (minor: missing test file count)
```

### Example 2: Debugging Session

```markdown
# Handoff Document

**Generated:** 2026-01-31 16:15:00
**Session Duration:** 2h 30m
**Working Directory:** /Users/dev/bugfix

## Session Summary

Production에서 발생한 메모리 누수를 디버깅했습니다. Heap snapshot 분석 결과 EventEmitter의 listener가 제거되지 않는 것이 원인이었습니다. 여러 접근을 시도했지만 완전한 수정은 아직 안 했고, 임시 workaround만 적용한 상태입니다. 다음 세션에서는 근본 원인을 해결하고 모니터링을 강화할 계획입니다.

## Handoff Chain

- **Previous:** `.claude/handoffs/handoff-20260130-093000.md`
- **Next:** (to be generated)
- **Session Count:** 3

## Completed

- [x] Reproduced memory leak in staging
- [x] Captured heap snapshots (before/after)
- [x] Identified leaking EventEmitters
- [x] Applied temporary listener limit increase
- [x] Added monitoring alerts

## Pending

- [ ] Fix root cause: proper listener cleanup - 상태: 30% (identified location, not fixed)
- [ ] Add unit test for listener lifecycle - 상태: 0% (blocker: need to isolate component)
- [ ] Document EventEmitter best practices - 상태: 0% (waiting for fix)

## Key Decisions

### Decision 1: Temporary listener limit vs. Immediate fix
- **Context:** Production memory growing 500MB/hour, users affected
- **Choice:** Increase max listeners to 20, monitor closely
- **Rationale:** Buy time to fix properly without rushed changes
- **Alternatives:**
  - Hot-fix without testing: Too risky
  - Roll back feature: Too disruptive

### Decision 2: Heap snapshot over memory profiling
- **Context:** Need to identify leak source quickly
- **Choice:** Chrome DevTools heap snapshots
- **Rationale:** Visual, easy to spot retaining paths
- **Alternatives:**
  - Clinic.js: Good but unfamiliar tool
  - console.log: Insufficient for complex leaks

## Failed Approaches (Don't Repeat)

### Approach 1: Using weakMap for event handlers
- **What was tried:** Store listeners in WeakMap to allow GC
- **Why it failed:** WeakMap values can't be functions directly
- **Evidence:** TypeError: WeakMap values must be objects
- **Learning:** WeakMap not suitable for event handler storage

### Approach 2: Monkey-patching EventEmitter.on
- **What was tried:** Override .on() to auto-track and cleanup
- **Why it failed:** Broke third-party libraries expecting standard behavior
- **Evidence:** WebSocket library crashed with "on is not a function"
- **Learning:** Never modify built-in prototypes in production code

### Approach 3: Using `once()` instead of `on()`
- **What was tried:** Replace all .on() with .once() for auto-cleanup
- **Why it failed:** Broke polling logic that needs persistent listeners
- **Evidence:** Health check stopped working after first call
- **Learning:** .once() only for one-time events, not periodic

## Known Issues

### Issue 1: Listener leak in WebSocket reconnection
- **Description:** Each reconnect adds new listener without removing old
- **Workaround:** Restart service every 6 hours (cron job)
- **Root Cause:** Missing .removeAllListeners() before reconnect
- **Impact:** High (production memory leak)

### Issue 2: Heap snapshot analysis slow
- **Description:** 2GB heap takes 10+ minutes to analyze
- **Workaround:** Use --inspect-brk and smaller dataset
- **Root Cause:** Large object graph in production
- **Impact:** Medium (debugging efficiency)

## Files Modified

### Created
- `scripts/heap-snapshot.js` - Automated heap dump script
- `docs/debugging/memory-leak-analysis.md` - Debug process documentation

### Modified
- `src/services/WebSocketService.ts` - Added setMaxListeners(20)
- `src/monitoring/alerts.ts` - Added memory growth alert
- `package.json` - Added heapdump dependency

### Deleted
- None

## Next Steps

### Immediate (다음 세션 시작 시)
1. WebSocket reconnect에 .removeAllListeners() 추가 - 예상: 15분
2. 로컬에서 재현 테스트 (100 reconnections) - 예상: 20분

### Short-term (이번 작업 완료를 위해)
- [ ] Proper listener cleanup in all EventEmitter usage
- [ ] Unit tests for WebSocket lifecycle
- [ ] Reduce heap size (identify unnecessary retentions)

### Long-term (향후 개선 사항)
- [ ] Automated memory leak detection in CI
- [ ] EventEmitter wrapper with auto-cleanup
- [ ] Migration to observables (RxJS) for better lifecycle management

## How to Resume

**다음 세션 재개 방법:**

1. **이 핸드오프 문서 읽기**
   ```bash
   cat .claude/handoffs/handoff-20260131-161500.md
   ```

2. **현재 Git 상태 확인**
   ```bash
   git status
   git log -5 --oneline
   ```

3. **첫 번째 액션 실행**
   - `src/services/WebSocketService.ts` 열기
   - `connect()` 메서드에서 reconnect 로직 찾기
   - `.removeAllListeners()` 추가 위치 확인 (line 78 추정)

4. **컨텍스트 복원 확인**
   - Heap snapshots: `temp/heap-*.heapsnapshot` 존재 확인
   - Monitoring alert 작동 여부 확인 (Grafana)
   - Failed Approaches를 참고하여 WeakMap 사용 금지

## Notes

- Heap snapshots 저장 위치: `temp/heap-before.heapsnapshot`, `temp/heap-after.heapsnapshot`
- Memory leak 재현 스크립트: `node scripts/reproduce-leak.js`
- Production max listeners 현재: 20 (default: 10)
- 참고: https://nodejs.org/en/docs/guides/diagnostics/memory/

---

**Quality Score:** 80/100

**Score Breakdown:**
- All sections filled: 20/20 ✅
- No TODO placeholders: 20/20 ✅
- No secrets detected: 20/20 ✅
- Next Steps are specific: 20/20 ✅
- Files Modified listed: 0/20 ❌ (Missing: src/monitoring/alerts.ts changes not detailed)

⚠️  Warning: Files Modified section lacks details on alert.ts changes. Please specify what alerts were added.
```

## Notes

- 핸드오프 파일은 `.gitignore`에 추가할지 프로젝트별로 결정
- 민감한 정보가 있다면 `.claude/handoffs/`를 ignore 권장
- Quality Score는 참고용이며, 실제 유용성은 사용자 판단
- 클립보드 요약은 Slack/Discord에 붙여넣기 좋은 형식
- Claude Code 플러그인 시스템을 통해 설치 가능한 standalone 스킬입니다
