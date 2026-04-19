* [Claude Code 완벽 가이드 by Toby](https://codex.epril.com/wiki/claude-code-complete-guide)
- [앤트로픽의 하네스 유출은 코딩의 패러다임을 바꾸고 있다](https://aimatters.co.kr/ai-matters-column/40037/)
- [Claude Code 창시자 Boris Cherny가 Claude Code를 사용하는 방법](https://news.hada.io/topic?id=25570)
* [Claude Code 오픈소스 창시자의 Claude 사용법](https://www.notion.so/grumatic/Claude-Code-Claude-2dd0586bce7480eb8f0cc5a07d5dd7ae)
- <https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/>
- <https://www.anthropic.com/engineering/claude-code-best-practices>
- <https://github.com/OthmanAdi/planning-with-files>
- [Claude Cowork - 엔터프라이즈 AI 에이전트의 새로운 장](https://drive.google.com/file/d/1qfZtTLXQHBeLR_qD3glgmD8LIIe4Akzl/view)
- [modu-ai/cowork-plugins](https://github.com/modu-ai/cowork-plugins) : Claude Cowork 도메인 전문가 AI 마켓플레이스
    - 비즈니스, 마케팅, 법률, 재무, HR, 운영 등 도메인별로 16개 플러그인과 64개 스킬을 묶어둔 오픈소스 모음
    - 개발 외 업무 영역까지 Claude로 확장하는 레퍼런스로, `.claude/skills`에 바로 설치해 활용 가능
    - 도메인 전문가 AI를 조립해 사내 업무에 접목하려는 팀의 출발점으로 쓰기 좋음
- [클로드코드 잘 사용하기 - Youngdong Kim (LinkedIn)](https://www.linkedin.com/posts/youngdongkim_%ED%81%B4%EB%A1%9C%EB%93%9C%EC%BD%94%EB%93%9C-%EC%9E%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-activity-7447188897098522624-jtPO)
    - 전사 세미나에서 진행한 "Claude Code 잘 사용하기" 1시간 분량 발표 공유
    - 35개 댓글에 현업 개발자들의 추가 노하우와 피드백이 이어짐
- [Claude Code 어썸한 GitHub 저장소들 (X)](https://x.com/i/status/2043719031849681379)
    - Claude Code, Codex, Gemini CLI, Antigravity 등 에이전트 환경에 쓸 수 있는 저장소들을 정제해 정리
    - 예: `Claude Mem`은 세션 간 지속적인 메모리를 제공해 코드베이스를 매번 다시 가르치지 않아도 됨
    - 에이전트 코딩 환경을 꾸밀 때 참고할 만한 도구/레포 큐레이션

## Plugins
- <https://github.com/affaan-m/everything-claude-code>
  - [Everything Claude Code - 해커톤 우승자의 AI 개발 팀 레시피](https://roboco.io/posts/everything-claude-code-distilled/)
- <https://github.com/seeyoung/claude-multi-ai-collab> : Gemini + Codex를 동시에 활용하는 CLI 스킬
- [Claude Code에서 GLM 4.7 사용하기 - MoAI-ADK로 쉽게 설정](https://goos.kim/ko/blog/claude-code-glm-47-moai-adk-setup-guide)

## 비용 최적화
- [Claude ‘구독형’ 요금제가 API보다 최대 36배 저렴한 이유와 ‘Max 5x’가 진짜 최적 구간인 이유](https://news.hada.io/topic?id=26256)
- [클로드 코드 3일간 소스코드 뜯어본 개발자가 찾은 토큰 틀어막기 TOP 7](https://www.youtube.com/watch?v=ZRyVSrFqvzI)
    - auto-compact 전에 clear
    - 한번에 다 시키기
    - 끊지말고 몰아서 시키기
    - 생각과 실행을 나누기 : 한 세션에서는 하나의 목표
    - 안 쓰는 도구 끄기
    - 정확한 지시 : 이 코드 개선해줘 -> @src/auth.ts 의 무엇무엇을 고쳐줘.
- [Claude Code 토큰 사용량 90% 절감하는 3가지 실전 기법 (qmd, 3-에이전트)](https://www.youtube.com/watch?v=t55_Ys4q7Uo)
    - .claudeignore 파일 추가
    - CLAUDE.md 간결하게 유지. 200줄 이내. 상세 파일은 별로 파일로 분해
    - 인덱싱
        - 디폴트로는 Glob + Grep(키워드 검색)이라서 반복 탐색에는 토큰 낭비
        - [qmd](https://news.hada.io/topic?id=26213) 활용
    - 3 agent team : Architect, Builder, Reviwer
    - 명확한 역할/범위/규칙
- [Claude Code 비용 80% 절감하는 settings.json 3줄과 14만명이 쓰는 everything-claude-code 설정법](https://www.youtube.com/watch?v=4rN-UWKSmp0)
    - 디폴트 SONNET 추천
    - everything-claude-code의 skill 승격 기능
- [Claude Code Pricing: Optimize Your Token Usage & Costs](https://claudefa.st/blog/guide/development/usage-optimization)
- [바이브 코딩의 토큰 관리 전략](https://roboco.io/posts/vibe-coding-token-management-strategy/)
- [클로드 코드 토큰 녹는 분들, 이 6가지만 바꿔보세요](https://www.youtube.com/watch?v=gLZ1wJUADqk)
    - 기본 모델 설정 변경: 설정 파일에서 디폴트 모델을 sonnet으로 고정하여 나도 모르게 Opus가 실행되는 것을 방지합니다.
    - Opus Plan 활용: 계획 단계에서는 Opus를 쓰고, 실행 단계에서는 자동으로 Sonnet으로 전환해주는 기능을 사용합니다.
    - 세션 초기화(Clear): 하나의 작업이 끝나면 /clear 명령어로 컨텍스트를 비워줍니다. (이전 대화가 필요하면 /rename 후 /resume 활용).
    - 확장된 사고(Thinking) 조절: 깊게 생각하는 기능은 출력 토큰으로 과금되므로, 간단한 수정 시에는 이 기능을 끄거나 예산을 낮춥니다.
    - 구체적인 프롬프트 작성: "코드 개선해줘" 대신 "특정 파일의 특정 함수를 수정해줘"라고 명확히 지시하여 불필요한 파일 탐색을 줄입니다.
    - 메모리 관리: claude.md 파일은 500줄 이하로 유지하고, 상세한 지식은 필요할 때만 로드되는 **'스킬(Skill)'**로 분리합니다.
- [Claude 4.7 토크나이저 비용 측정 결과 | GeekNews](https://news.hada.io/topic?id=28641)
    - Claude 4.7은 이전 버전보다 평균 1.3~1.45배 더 많은 토큰을 생성, 세션당 20~30% 비용 증가 발생
    - 영어·코드 콘텐츠에서 토큰 증가가 두드러지고, CJK(한·중·일) 콘텐츠는 거의 변화 없음
    - 더 세분화된 토큰화 덕에 명령어 준수도(Instruction Following)는 약 5%p 향상
- [Opus 4.6과 Opus 4.7의 토큰 비용 계산기 | GeekNews](https://news.hada.io/topic?id=28672)
    - 새 토크나이저 때문에 같은 프롬프트가 콘텐츠 유형별로 1.0~1.35배 더 많은 토큰으로 집계
    - 실측에서 Opus 4.7은 Opus 4.6 대비 평균 요청 토큰·비용이 +37.4% 증가
    - 요청을 바꾸지 않아도 비용이 늘어나므로, 사전에 비용 영향을 추정하는 데 활용 가능

