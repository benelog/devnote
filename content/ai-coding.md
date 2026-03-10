# 개관

- <https://naver-connect-foundation.gitbook.io/boostcamp/expert-insight/ai>
  - AI 코딩 도구의 패러다임 전환: vibe coding과 agentic engineering의
    등장으로 개발 방식이 '정도의 차이’가 아닌 '종류의 차이’로
    변화했으며, 개발자는 코드를 직접 짜는 대신 에이전트를 조율·감독하는
    역할로 이동하고 있다.
  - 개인 생산성은 향상됐지만 조직 문제는 미해결: DORA 2025 보고서에
    따르면 AI 도입으로 개인 효과성과 배포 처리량은 개선됐지만, 배포
    불안정성·번아웃·업무 마찰은 오히려 해소되지 않아 AI의 혜택이 조직
    전체에 고르게 닿지 못하고 있다.
  - 경험과 훈련은 상호보완적: AI 결과물을 올바르게 평가하려면 도메인
    경험이 필수적이지만, 경험만으로는 부족하며 프롬프트 작성법·컨텍스트
    설계 등 새로운 AI 활용 스킬을 의도적으로 훈련해야 한다.
  - 조직 시스템 자체의 변화가 핵심: AI의 진정한 가치는 개인의 생산성
    향상을 넘어 개발 파이프라인·프로세스·문화를 조직 차원에서 함께 바꿀
    때 발휘되며, 주니어 개발자가 경험을 쌓을 환경을 보존하는 것도 조직의
    중요한 과제다.
  - 판단력의 층위가 올라갈 뿐, 사람의 역할은 사라지지 않는다: 코드
    작성이 자동화되더라도 무엇을 만들지, 어떤 시나리오를 검증할지
    설계하는 깊은 판단은 여전히 사람의 몫이며, 그 판단을 팀 전체가
    공유하는 것이 AI 시대 개발자의 진정한 경쟁력이다.
- ["AI가 짠 코드, 저도 다 모릅니다" 넷플릭스 개발자의
  고백](https://eopla.net/magazines/38577)
  - 쉬운 길을 택할 때마다, 지금 당장의 속도와 함께 나중에 올 복잡성을
    쌓는 거예요.
  - "컨텍스트 압축"이라고 불러요. "컨텍스트 엔지니어링"이나 "스펙 기반
    개발"이라고 불러도 되지만 이름은 중요하지 않아요.
  - 코드가 "돌아간다"는 것만으로는 부족해요. 테스트를 통과하는 코드랑
    프로덕션에서 버티는 코드는 달라요. 오늘 작동하는 시스템이랑 나중에
    다른 사람이 유지보수할 수 있는 시스템도 다르고요.
  - 그 감각은 경험에서 와요. 제가 위험한 구조를 알아보는 건, 새벽 3시에
    그거 때문에 장애 대응 해본 적이 있어서예요.
  - 이제 우리는 무한한 코드 생성으로 위기에 직면하고 있어요.
  - 성공하는 개발자들은 코드를 가장 많이 생성하는 사람이 아닐
    거예요.자신이 뭘 만들고 있는지 이해하고, 경계를 볼 수 있고, 잘못된
    문제를 풀고 있다는 걸 알아채는 사람일 거예요.
- <https://martinfowler.com/articles/2025-nature-abstraction.html>
- [웹 개발이 다시 재미있어졌다](https://news.hada.io/topic?id=25574)
- <https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes>
- [AI-Driven Development Lifecycle (AI-DLC) Method
  Definition](https://prod.d13rzhkk8cj2z0.amplifyapp.com/)
- [AI로 개발을 어떻게
  가속화하는가](https://drive.google.com/file/d/1SJ7-1YXo4r4pkHDuMdKLR9NtgbUsSRoZ/view)
  (하용호 님)
- [바이브 코딩에는 컨텍스트 엔지니어링이
  필요하다](https://blogbyash.com/translation/vibe-coding-needs-context-engineering/)


## Code Review
* https://www.latent.space/p/reviews-dead

# 적용 사례

- [Beyond Vibe Coding to Agentic Coding: 카카오의 AI 협업 개발  실험](https://tech.kakao.com/posts/711)
- <https://toss.tech/article/toss-frontend-ai-docs>
- <https://vercel.com/blog/becoming-an-ai-engineering-company>
  - <https://v0.dev/>

## 대규모 코드 마이그레이션 작업

- (Uber) [This Year in Uber’s AI-Driven Developer Productivity
  Revolution](https://dpe.org/sessions/ty-smith-adam-huda/this-year-in-ubers-ai-driven-developer-productivity-revolution/)
  - AI 도구 활용하여 Kotlin으로 적극 전환
- (Airbnb) [Accelerating Large-Scale Test Migration with
  LLMs](https://medium.com/airbnb-engineering/accelerating-large-scale-test-migration-with-llms-9565c208023b)
  - FE 테스팅 라이브리(Enzyme to RTL(React Testing Library)) 전환 작업을
    수동으로는 1.5년 예상, AI 도구 도움으로 6주만에 완료
  - 75% of Target Files Migrated in just 4 Hrs
  - Retry Loops & Dynamic Prompting이 효과적
- (Google) [Accelerating code migrations with
  AI](https://research.google/blog/accelerating-code-migrations-with-ai/)(
  - 파일 그룹별로 코드 수정, 빌드, 테스트 싸이클을 거친 후 선별,
    취합하여 코드 Changeset을 생성
  - 구글의 [DIDACT
    방법론](https://research.google/blog/large-sequence-models-for-software-development-activities/)에
    의해 트레이닝
  - Google 광고 시스템에서 32bit의 ID를 64bit로 변경하는 작업에서 50%
    속도 개선 효과
- (Amazon) [Evaluating Human-AI Partnership for LLM-based Code
  Migration](https://assets.amazon.science/bc/ec/8213526e4857b6fa09af53b10c66/evaluating-human-ai-partnership-for-llm-based-code-migration.pdf)
  - Amazon의 코드 마이그리에션 도구인 Amazon Q Code Transformation 사용
    경험 인터뷰
  - 개발자는 본인의 전문성을 바탕으로 AI가 하는 일을 제어,안내,꼼꼼한
    검증을 하는 역할을 하기를 바람
  - AI-인간 파트로십의 불완전성을 감추기보다는 한계를 드러내야함
- <https://analyticsindiamag.com/global-tech/airbnb-uses-llms-to-pull-off-an-18-month-enzyme-to-rtl-migration-in-just-6-weeks/>
  - 위의 3개 사례를 개한 종합 내용
  - AI도구를 써도 인간의 통찰, 리뷰, 검증이 필요하다는 문장으로 마무리

# 도구

- <https://github.com/block/goose>
- youtube.com/watch?si=fp9Uqlc_n8bCv1Nq&v=K2rVBIb-KWE&feature=youtu.be\[25년
  현재 어떤 CLI툴을 써야하는지 말씀드리겠습니다\] (박진형 님)
- <https://opencode.ai/>
- (Vive) Git Worktree를 즐겁게 만드는 CLI 도구를  만들었습니다
- [Vibe Kanban: OpenCode + Claude Code 동시에? AI 코딩 에이전트
  오케스트레이션](https://fornewchallenge.tistory.com/entry/%F0%9F%9A%80-Vibe-Kanban-OpenCode-Claude-Code-%EB%8F%99%EC%8B%9C%EC%97%90-AI-%EC%BD%94%EB%94%A9-%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8-%EC%98%A4%EC%BC%80%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98)

## GitHub Copilot

- [코파일럿 ‘열일’하게 만들기](https://techblog.woowahan.com/21240/)

## Cursor

- [Cursor Max mode로 대형 코드 베이스
  다루기](https://devway.tistory.com/70)

## Claude Code


## MCP
* [MCP is DEAD](https://www.youtube.com/watch?v=JZW2W5rwsD4) (Youtube)
* [MCP is dead. Long live the CLI](https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html)

## Open 스펙

- <https://agentskills.io/>
  - [agentskills.io/
    소개](https://www.linkedin.com/feed/update/urn:li:activity:7408299241556606976/?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7408299241556606976%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29)
- <https://agents.md/>
- <https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation>

## Children
* [[ai-coding-productivity]]
* [[claude-code]]
## Related
- [[ai-framework]]
- [[gpt]]
- [[spring-ai]]
