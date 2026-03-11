# 개관
- <https://martinfowler.com/articles/2025-nature-abstraction.html>
- [바이브 코딩에는 컨텍스트 엔지니어링이 필요하다](https://blogbyash.com/translation/vibe-coding-needs-context-engineering/)
- <https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes>
- [AI-Driven Development Lifecycle (AI-DLC) Method Definition](https://prod.d13rzhkk8cj2z0.amplifyapp.com/)
- [AI로 개발을 어떻게 가속화하는가](https://drive.google.com/file/d/1SJ7-1YXo4r4pkHDuMdKLR9NtgbUsSRoZ/view) (하용호 님)
- [웹 개발이 다시 재미있어졌다](https://news.hada.io/topic?id=25574)


## Code Review
* https://www.latent.space/p/reviews-dead

# 적용 사례

- [Beyond Vibe Coding to Agentic Coding: 카카오의 AI 협업 개발  실험](https://tech.kakao.com/posts/711)
- <https://toss.tech/article/toss-frontend-ai-docs>
- <https://vercel.com/blog/becoming-an-ai-engineering-company>
  - <https://v0.dev/>

## 대규모 코드 마이그레이션 작업

- (Uber) [This Year in Uber’s AI-Driven Developer Productivity Revolution](https://dpe.org/sessions/ty-smith-adam-huda/this-year-in-ubers-ai-driven-developer-productivity-revolution/)
  - AI 도구 활용하여 Kotlin으로 적극 전환
- (Airbnb) [Accelerating Large-Scale Test Migration with LLMs](https://medium.com/airbnb-engineering/accelerating-large-scale-test-migration-with-llms-9565c208023b)
  - FE 테스팅 라이브리(Enzyme to RTL(React Testing Library)) 전환 작업을 수동으로는 1.5년 예상, AI 도구 도움으로 6주만에 완료
  - 75% of Target Files Migrated in just 4 Hrs
  - Retry Loops & Dynamic Prompting이 효과적
- (Google) [Accelerating code migrations with AI](https://research.google/blog/accelerating-code-migrations-with-ai/)(
  - 파일 그룹별로 코드 수정, 빌드, 테스트 싸이클을 거친 후 선별, 취합하여 코드 Changeset을 생성
  - 구글의 [DIDACT 방법론](https://research.google/blog/large-sequence-models-for-software-development-activities/)에 의해 트레이닝
  - Google 광고 시스템에서 32bit의 ID를 64bit로 변경하는 작업에서 50% 속도 개선 효과
- (Amazon) [Evaluating Human-AI Partnership for LLM-based Code Migration](https://assets.amazon.science/bc/ec/8213526e4857b6fa09af53b10c66/evaluating-human-ai-partnership-for-llm-based-code-migration.pdf)
  - Amazon의 코드 마이그리에션 도구인 Amazon Q Code Transformation 사용 경험 인터뷰
  - 개발자는 본인의 전문성을 바탕으로 AI가 하는 일을 제어,안내,꼼꼼한 검증을 하는 역할을 하기를 바람
  - AI-인간 파트로십의 불완전성을 감추기보다는 한계를 드러내야함
- <https://analyticsindiamag.com/global-tech/airbnb-uses-llms-to-pull-off-an-18-month-enzyme-to-rtl-migration-in-just-6-weeks/>
  - 위의 3개 사례를 개한 종합 내용
  - AI도구를 써도 인간의 통찰, 리뷰, 검증이 필요하다는 문장으로 마무리

# 도구

- <https://github.com/block/goose>
- [25년 현재 어떤 CLI툴을 써야하는지 말씀드리겠습니다](https://youtube.com/watch?si=fp9Uqlc_n8bCv1Nq&v=K2rVBIb-KWE) (박진형 님)
- <https://opencode.ai/>
- [Vibe Kanban: OpenCode + Claude Code 동시에? AI 코딩 에이전트 오케스트레이션](https://fornewchallenge.tistory.com/entry/%F0%9F%9A%80-Vibe-Kanban-OpenCode-Claude-Code-%EB%8F%99%EC%8B%9C%EC%97%90-AI-%EC%BD%94%EB%94%A9-%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8-%EC%98%A4%EC%BC%80%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98)

## GitHub Copilot

- [코파일럿 ‘열일’하게 만들기](https://techblog.woowahan.com/21240/)

## Cursor

- [Cursor Max mode로 대형 코드 베이스 다루기](https://devway.tistory.com/70)


## MCP
* [MCP is DEAD](https://www.youtube.com/watch?v=JZW2W5rwsD4) (Youtube)
* [MCP is dead. Long live the CLI](https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html)

## Open 스펙

- <https://agentskills.io/>
  - [agentskills.io/ 소개](https://www.linkedin.com/feed/update/urn:li:activity:7408299241556606976/?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7408299241556606976%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29)
- <https://agents.md/>
- <https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation>

## Children
* [[ai-coding-productivity]]
* [[ai-gent-role]]
* [[claude-code]]
* [[agent-skills]]
