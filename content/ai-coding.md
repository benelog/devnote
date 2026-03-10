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

## 연구 리포트
- [Faros.ai의 조사](https://www.faros.ai/blog/ai-software-engineering) (10,000명 이상 개발자, 1,255개 팀 대상)에 따르면 AI 도입률이 높은 팀에서 뚜렷한 패턴
    - 완료 태스크 수 21% 증가
    - 머지되는 PR 수 98% 증가
    - PR 리뷰 소요 시간 91% 증가
- [Anthropic 2026 Agentic Coding Trends
  Report](https://claude.com/blog/eight-trends-defining-how-software-gets-built-in-2026)
  : 개발자가 AI에 "완전히 위임" 가능하다고 느끼는 작업은 전체의 0~20%에
  불과하며, 감독 없는 완전 자동화는 아직 현실적이지 않다.
- [Google DORA 2024 Report](https://dora.dev/dora-report-2024) : AI 도입
  초기(2024년)에는 배포 처리량이 오히려 악화되었고, AI 활용 증가가 배포
  불안정성을 높이는 부작용이 나타났다.
- [Google DORA 2025 Report](https://dora.dev/research/2025/dora-report/)
  : 1년 만에 배포 처리량·제품 성과가 반전되어 긍정적으로 바뀌었지만,
  배포 불안정성·번아웃·업무 마찰은 여전히 해소되지 않은 채로 남아 있다.
- [Daniotti et al., Science (16만 명, 3,000만 커밋
  분석)](https://www.science.org/doi/10.1126/science.adz9311) : 미국 내
  AI 생성 Python 코드 비율이 2022년 5%에서 2024년 29%로 급증했지만 실제
  생산성 향상은 평균 3.6%에 그쳤고, 효과는 숙련 개발자에게만 집중되었다.
- [Faros AI Report](https://www.faros.ai/blog/ai-software-engineering) :
  AI 도입 팀에서 PR 머지가 98% 증가했지만 코드 리뷰 시간도 91% 늘어나,
  개인 산출량 증가가 조직 차원의 검증 부담 증가로 이어졌다.
- [METR 2025 RCT
  연구](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
  : AI 도구를 사용한 숙련 개발자가 실험 결과로는 19% 느려졌음에도
  본인들은 20% 빨라졌다고 느껴, 체감 생산성과 실제 생산성 사이에 큰
  괴리가 존재함을 보여준다.
- [Stack Overflow 2025 Developer Survey (AI
  편)](https://survey.stackoverflow.co/2025/ai) : AI 도구가 생산성에
  긍정적 영향을 줬다고 답한 개발자는 52%에 불과하고, AI 도구에 대한
  호감도도 전년 대비 70%대에서 60%로 하락했다.
- <https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report>
  - [요약 영상](https://www.youtube.com/watch?v=3xo8HslAQRY)
  - AI가 만든 코드는 1.7배 더 많은 문제를 발생시킴
  - 가드레일 없는 가속은 위험하다
  - 안전하게 사용하기 위해서는 프로젝트의 문맥(Context)을 이해하는
    프롬프트 활용, 엄격한 코드 리뷰 프로세스, 보안 스캐닝 강화가 필수적
- <https://www.actuia.com/en/news/a-metr-study-reveals-that-ai-slows-down-experienced-developers/>
- <https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report?hl=en>
  - 2025년 9월 Google DORA 조직의 조사 결과
- <https://www.gitclear.com/research/ai_tool_impact_on_developer_productive_output_from_2022_to_2025>
  - In 2025, the average developer checked in 75% more code than they
    did in 2022
- [Measuring AI Ability to Complete Long
  Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)
  - AI의 시간 지평(Time Horizon)이 7개월마다 두 배로 증가한다.
  - 비판 의견 :
    <https://medium.com/@AIchats/are-ai-time-horizon-doubling-every-seven-months-e337162eec83>
- <https://www.darkreading.com/application-security/ai-generated-code-leading-expanded-technical-security-debt>
- <https://jellyfish.co/blog/with-copilot-engineers-get-15-more-capacity-without-additional-headcount/>
  - Ticket 해결 속도가 15% 향상
- [AI가 개발자 생산성에 미치는 영향 - 스탠포드
  연구](https://news.hada.io/topic?id=22248)
  - [같은 자료에 대한
    요약](https://www.linkedin.com/posts/kurt-lee-70010391_does-ai-actually-boost-developer-productivity-activity-7354024167538659329-Ndov/)
  - AI를 쓰면 전체 코드 생산성은 30~40% 늘어남. 하지만 "Rework" 가
    15~25% 증가, 결과적으로 실제 생산성 증가는 15~20% 수준.
- [AI가 오픈소스 개발자를 느리게 만든다. Peter Naur가 그 이유를 알려줄
  수 있다](https://news.hada.io/topic?id=21996)
  - [AI착시와 평균의 함정을 피한 슈퍼 개인의 통찰: AI 도구로 생산성 38%
    향상시킨 개발자의
    비밀](https://www.facebook.com/seunghwan.lee.9003888/posts/pfbid06AdDqN1kbTSCUbwvBfSzyfs1Hy54msEWzeKBj7LmygKY4zQxASuMLHLdNGjXZRegl)

# 적용 사례

- [Beyond Vibe Coding to Agentic Coding: 카카오의 AI 협업 개발
  실험](https://tech.kakao.com/posts/711)
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
- (Vive) Git Worktree를 즐겁게 만드는 CLI 도구를
  만들었습니다
- [Vibe Kanban: OpenCode + Claude Code 동시에? AI 코딩 에이전트
  오케스트레이션](https://fornewchallenge.tistory.com/entry/%F0%9F%9A%80-Vibe-Kanban-OpenCode-Claude-Code-%EB%8F%99%EC%8B%9C%EC%97%90-AI-%EC%BD%94%EB%94%A9-%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8-%EC%98%A4%EC%BC%80%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98)

## GitHub Copilot

- [코파일럿 ‘열일’하게 만들기](https://techblog.woowahan.com/21240/)

## Cursor

- [Cursor Max mode로 대형 코드 베이스
  다루기](https://devway.tistory.com/70)

## Claude Code

- [Claude ‘구독형’ 요금제가 API보다 최대 36배 저렴한 이유와 ‘Max 5x’가
  진짜 최적 구간인 이유](https://news.hada.io/topic?id=26256&)
- [Claude Code 창시자 Boris Cherny가 Claude Code를 사용하는
  방법](https://news.hada.io/topic?id=25570)
  - [Claude Code 오픈소스 창시자의 Claude
    사용법](https://www.notion.so/grumatic/Claude-Code-Claude-2dd0586bce7480eb8f0cc5a07d5dd7ae)
- <https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/>
- <https://www.anthropic.com/engineering/claude-code-best-practices>
- <https://github.com/seeyoung/claude-multi-ai-collab> : Gemini +
  Codex를 동시에 활용하는 CLI 스킬
- <https://github.com/affaan-m/everything-claude-code>
  - [Everything Claude Code - 해커톤 우승자의 AI 개발 팀
    레시피](https://roboco.io/posts/everything-claude-code-distilled/)
- <https://github.com/OthmanAdi/planning-with-files>
- [Claude Code에서 GLM 4.7 사용하기 - MoAI-ADK로 쉽게
  설정](https://goos.kim/ko/blog/claude-code-glm-47-moai-adk-setup-guide)
- [Claude Cowork - 엔터프라이즈 AI 에이전트의 새로운
  장](https://drive.google.com/file/d/1qfZtTLXQHBeLR_qD3glgmD8LIIe4Akzl/view)

## MCP
* [MCP is DEAD](https://www.youtube.com/watch?v=JZW2W5rwsD4) (Youtube)
* [MCP is dead. Long live the CLI](https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html)

## Open 스펙

- <https://agentskills.io/>
  - [agentskills.io/
    소개](https://www.linkedin.com/feed/update/urn:li:activity:7408299241556606976/?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7408299241556606976%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29)
- <https://agents.md/>
- <https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation>

## Related
- [[ai-framework]]
- [[gpt]]
- [[spring-ai]]
