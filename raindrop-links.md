# Raindrop 미분류 링크 정리 작업지시서

Raindrop.io의 "미분류(Unsorted)" 컬렉션에 쌓인 링크를 `content/*.md`의 적절한 페이지로 옮기고, 원본은 Raindrop에서 삭제하는 작업.

## 1. 자격증명

API 토큰은 `~/command/scrap/raindrop.md`에 있음. `Test Token`을 Bearer로 사용.

## 2. 미분류 링크 조회

Raindrop API `/raindrops/-1`을 사용한다 (웹 UI의 `/my/-1` 뷰와 동일).

**중요**: 로컬 환경의 `rtk`가 curl 응답을 토큰 절약을 위해 스키마 요약으로 변환한다. 실제 JSON 페이로드가 필요하므로 반드시 `rtk proxy`를 앞에 붙여 우회할 것.

```bash
rtk proxy curl -s -H "Authorization: Bearer <TOKEN>" \
  "https://api.raindrop.io/rest/v1/raindrops/-1?perpage=10" \
  | python3 -c "
import json,sys
d=json.load(sys.stdin)
for i, item in enumerate(d['items'], 1):
    print(f'=== {i} ===')
    print(f'TITLE: {item[\"title\"]}')
    print(f'LINK: {item[\"link\"]}')
    print(f'EXCERPT: {item.get(\"excerpt\",\"\")}')
    print(f'DOMAIN: {item.get(\"domain\",\"\")}')
    print(f'ID: {item[\"_id\"]}')
    print()
"
```

- 사용자가 별도로 지정하지 않으면 `perpage`는 10으로 시작. 수량은 사용자 확인 후 확대.
- `_id`는 삭제 단계에서 써야 하므로 함께 기록.

## 3. 카테고리 매핑

`content/` 아래의 주제별 페이지로 분류한다. 자주 쓰이는 대상 파일:

| 주제 | 파일 |
| --- | --- |
| AI 코딩 생산성, 조직 AX, 개발자 학습 영향 | `ai-coding-productivity.md` |
| Claude Code 사용법·도구·토큰 최적화·플러그인/스킬 | `claude-code.md` |
| 하네스 엔지니어링·에이전트 팀 설계 | `ai-agent-harness.md` |
| 에이전트 역할/프롬프트/업무 분담 | `ai-agent-role.md` |
| LLM 프레임워크 일반 | `ai-framework.md` |
| 프로젝트 관리, JIRA 대체, 업무 방식 | `project-management.md` |
| 소프트웨어 엔지니어링 일반론, 커리어 | `sw-engineering.md` |

결정이 애매하면 기존 파일을 `Grep`으로 먼저 열어 비슷한 링크가 있는지 확인.

## 4. 엔트리 포맷

각 링크는 다음 형식의 top-level bullet로 추가하고, 아래에 2~3줄의 요약을 indent된 sub-bullet로 붙인다.

```markdown
- [제목](https://cleaned-url)
    - 핵심 주장 또는 측정 결과 (excerpt 기반)
    - 보조 포인트 / 근거 / 방법론
    - 이 문서를 참고할 구체적 상황 (선택)
```

- 기존 섹션(예: `claude-code.md`의 `## 토큰 최적화`)이 적합하면 해당 섹션 말미에 삽입.
- 섹션이 없고 주제가 다르면 새 섹션 헤더를 만들기보다 파일 끝에 추가. (H1은 페이지 제목이므로 `#` 쓰지 말 것. 섹션은 `##`부터.)
- excerpt가 짧거나 비어 있으면 2줄로 줄이고 **추측으로 채우지 말 것**. 필요하면 WebFetch로 본문 확인.

## 5. URL 정리

다음 트래킹 파라미터는 제거한 깨끗한 URL로 저장:

- `fbclid`, `sfnsn`, `utm_source`, `utm_medium`, `utm_campaign`, `rcm`

특수 케이스:

- **Facebook 공유 링크(`facebook.com/share/...`)**: 로그인 요구·만료 가능성이 높음. excerpt에 원문 블로그 URL이 들어있으면 그쪽으로 교체.
- **`youtube.com/...Title` 처럼 제목 텍스트가 URL 뒤에 붙은 경우** (X·게시판 공유 과정에서 흔함): 유효 파라미터 끝까지만 남기고 뒤쪽 텍스트 잘라내기.
- LinkedIn 경로의 한글 퍼센트 인코딩은 그대로 둬도 무방.

## 6. 삭제

Write/Edit 반영이 끝나면 사용자 확인 후 Raindrop에서 삭제. 개별 DELETE를 루프로 돌린다 (10개 정도는 병렬화 이득 없음).

```bash
for id in <ID1> <ID2> ...; do
  rtk proxy curl -s -X DELETE \
    -H "Authorization: Bearer <TOKEN>" \
    "https://api.raindrop.io/rest/v1/raindrop/$id"
  echo
done
```

응답에 `"result":true`와 `"collection":{"$id":-99}`가 보이면 Trash로 이동된 상태. 영구 삭제는 사용자가 Raindrop UI에서 Trash를 비워야 한다 — 지시 없이 추가 API 호출로 비우지 말 것.

## 7. 체크리스트

- [ ] 토큰 로드 및 `rtk proxy` 경유로 응답 확보
- [ ] 각 링크 URL에서 트래킹 파라미터 제거, FB 공유 → 원문 URL 교체
- [ ] 주제별 파일 선택 및 기존 섹션 재사용 우선
- [ ] 링크당 2~3줄 요약 (excerpt 범위 내에서만; 부족하면 WebFetch)
- [ ] `_id` 목록 확보 후 사용자 확인 → DELETE 루프 실행
- [ ] 응답에서 `result:true` 확인
