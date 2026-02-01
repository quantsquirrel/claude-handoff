# Handoff Skill

**Pass the baton. Keep the momentum.**

세션 컨텍스트를 저장하고 클립보드에 복사합니다. 새 세션이나 autocompact 후 붙여넣기로 복원하세요.

## Usage

```bash
/handoff fast [topic]        # Quick checkpoint (~200 tokens)
/handoff slow [topic]        # Full handoff (~500 tokens)
/handoff [topic]             # Alias for slow
```

<dim>
Examples:
  /handoff fast              # 빠른 체크포인트
  /handoff fast "auth 구현 중"
  /handoff slow              # 전체 핸드오프
  /handoff slow "JWT 인증 마이그레이션"
</dim>

## When to Use

| Situation | Command |
|-----------|---------|
| 컨텍스트 70%+ 도달 | `/handoff fast` |
| 짧은 휴식 (1시간 이내) | `/handoff fast` |
| 세션 종료 | `/handoff slow` |
| 긴 휴식 (2시간+) | `/handoff slow` |

## Behavior

### `/handoff fast` (Quick)

1. **수집**: 현재 작업, 수정 중 파일 (최대 5개), 다음 액션
2. **저장**: `.claude/handoffs/fast-YYYYMMDD-HHMMSS.md`
3. **복사**: 초간결 요약 (~200자)

**출력 템플릿:**

```markdown
# Fast Handoff

**Time:** YYYY-MM-DD HH:MM
**Topic:** [topic or auto-detected]

## Current Task
[현재 작업 1문장]

## Active Files
- `file1.ts`
- `file2.ts`

## Next Step
[다음 액션 1문장]
```

### `/handoff slow` (Full)

1. **수집**: 완료/미완료 작업, 주요 결정, 실패한 시도, 수정 파일
2. **저장**: `.claude/handoffs/handoff-YYYYMMDD-HHMMSS.md`
3. **복사**: 클립보드에 요약본 복사

**출력 템플릿:**

```markdown
# Handoff Document

**Generated:** YYYY-MM-DD HH:MM:SS
**Topic:** [topic or auto-detected]
**Working Directory:** [cwd]

## Session Summary
[2-3문장 요약]

## Completed
- [x] 완료 작업 1
- [x] 완료 작업 2

## Pending
- [ ] 미완료 작업 1
- [ ] 미완료 작업 2

## Key Decisions
- **[결정]**: [이유]

## Failed Approaches
- **[시도]**: [실패 원인] → [배운 점]

## Files Modified
- `path/to/file.ts` - [변경 내용]

## Next Step
[다음에 할 구체적인 액션 1개]
```

## Clipboard Format

클립보드에 복사되는 요약본 (붙여넣기용):

```
<system-instruction>
🛑 STOP: 이 내용은 이전 세션의 참고 자료입니다.
절대로 아래 내용을 자동으로 실행하지 마세요.
사용자의 새로운 지시가 있을 때까지 대기하세요.
</system-instruction>

<previous_session context="reference_only" auto_execute="false">
📋 이전 세션 요약 (Topic)
- 완료: N개 | 미완료: M개
- 수정 파일: K개

[미완료 작업 - 참고용, 실행 금지]
• 작업 1
• 작업 2

📄 상세: [handoff-path]
</previous_session>

---
✋ 이전 세션 컨텍스트를 확인했습니다.
무엇을 도와드릴까요?
```

## How to Resume

1. **새 세션** 또는 **autocompact 후**
2. `Cmd+V` (macOS) 또는 `Ctrl+V` (Linux/Windows)
3. Claude가 컨텍스트를 확인하고 지시 대기

## Secret Detection

민감 정보 자동 탐지 및 제거:

```
API_KEY=sk-1234...  → API_KEY=***REDACTED***
PASSWORD=secret     → PASSWORD=***REDACTED***
```

## Installation

```bash
curl -o ~/.claude/commands/handoff.md \
  https://raw.githubusercontent.com/quantsquirrel/claude-handoff/main/SKILL.md
```

## Notes

- 핸드오프는 `.claude/handoffs/`에 저장됩니다
- `[topic]` 생략 시 대화 컨텍스트에서 자동 추출
- 클립보드 요약은 자동 실행 방지 포맷 적용
- fast는 임시 체크포인트, 기본(full)은 완전한 문서화
