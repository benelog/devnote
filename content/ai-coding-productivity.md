## 사례/연구
- https://getdx.com/research/measuring-ai-code-assistants-and-agents/
    - 번역 : https://gemini.google.com/share/000116ad7bcd
    * **측정의 3차원:** AI 도구의 효과는 조직의 도입 주기에 맞춰 **활용도, 영향력, 비용(및 거버넌스)**의 세 가지 기준으로 평가해야 합니다.
    * **속도와 품질의 균형:** AI로 인한 단기적인 코딩 속도 향상이 장기적인 코드 유지보수성과 품질을 해치지 않도록 지속적으로 모니터링해야 합니다.
    * **팀의 확장으로서의 AI:** AI 에이전트는 독립된 작업자가 아닌, 이를 지휘하고 관리하는 **개발자와 팀의 역량을 확장하는 도구**로 간주하여 성과를 측정해야 합니다.
    * **현실적 목표와 역할 재정의:** 과장된 마케팅 수치에 휘둘리지 말고 현실적인 목표를 세우며, AI로 코드를 짜는 비기술 직군까지 포함해 '개발자'의 정의를 넓혀야 합니다.
    * **인사 평가 활용 금지:** 지표 조작(Gaming)이나 팀의 신뢰 하락을 막기 위해 AI 관련 측정 지표를 **개인 성과 평가에 절대 활용해서는 안 됩니다.**
    * **종합적인 접근:** AI 지표에만 매몰되지 말고, **전반적인 개발자 생산성 지표와 결합**하여 소통 부재 등 조직의 진짜 병목 현상을 종합적으로 파악해야 합니다.
- [This CTO Says 93% of Developers Use AI, but Productivity Is Still 10%](https://shiftmag.dev/this-cto-says-93-of-developers-use-ai-but-productivity-is-still-10-8013/)
    - Looking at about 4.2 million developers between November 2025 and February 2026, AI-authored code now makes up 26.9% of all production code – up from 22% last quarter.
- [Over Half of Google's Production Code Is Now AI-Generated 2026-01-12](https://roocode.com/blog/over-half-of-googles-production-code-is-now-aigenerated)
- (2026년 2월) Atlassian의 생산성 개선 수치 ( [Building world-class engineering teams in the age of AI - The Pragmatic Summit](https://www.youtube.com/watch?v=fYh1CWadxDM))
    - 엔지니어당 PR 수 89% 증가
    - 이슈 사이클 타임 42% 감소
    - 보안 취약점의 51%를 에이전트가 수정
    - DORA 메트릭 전반의 개선
- [Anthropic 2026 Agentic Coding Trends Report](https://claude.com/blog/eight-trends-defining-how-software-gets-built-in-2026) : 개발자가 AI에 "완전히 위임" 가능하다고 느끼는 작업은 전체의 0~20%에 불과하며, 감독 없는 완전 자동화는 아직 현실적이지 않다.
- [Google DORA 2025 Report](https://dora.dev/research/2025/dora-report/) : 1년 만에 배포 처리량·제품 성과가 반전되어 긍정적으로 바뀌었지만, 배포 불안정성·번아웃·업무 마찰은 여전히 해소되지 않은 채로 남아 있다.
  - <https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report?hl=en>
- [METR 2025 RCT 연구](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) : AI 도구를 사용한 숙련 개발자가 실험 결과로는 19% 느려졌음에도 본인들은 20% 빨라졌다고 느껴, 체감 생산성과 실제 생산성 사이에 큰 괴리가 존재함을 보여준다.
  - <https://www.actuia.com/en/news/a-metr-study-reveals-that-ai-slows-down-experienced-developers/>
- [Stack Overflow 2025 Developer Survey (AI 편)](https://survey.stackoverflow.co/2025/ai) : AI 도구가 생산성에 긍정적 영향을 줬다고 답한 개발자는 52%에 불과하고, AI 도구에 대한 호감도도 전년 대비 70%대에서 60%로 하락했다.
- [Daniotti et al., Science (16만 명, 3,000만 커밋 분석)](https://www.science.org/doi/10.1126/science.adz9311) : 미국 내 AI 생성 Python 코드 비율이 2022년 5%에서 2024년 29%로 급증했지만 실제 생산성 향상은 평균 3.6%에 그쳤고, 효과는 숙련 개발자에게만 집중되었다.
- (2025년 7월)) [The AI Productivity Paradox Report 2025](https://www.faros.ai/blog/ai-software-engineering) (10,000명 이상 개발자, 1,255개 팀 대상)
    - 완료 태스크 수 21% 증가
    - 머지되는 PR 수 98% 증가
    - PR 리뷰 소요 시간 91% 증가
    - 개인 산출량 증가가 조직 차원의 검증 부담 증가로 이어졌다.
- <https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report>
  - [요약 영상](https://www.youtube.com/watch?v=3xo8HslAQRY)
  - AI가 만든 코드는 1.7배 더 많은 문제를 발생시킴
  - 가드레일 없는 가속은 위험하다
  - 안전하게 사용하기 위해서는 프로젝트의 문맥(Context)을 이해하는 프롬프트 활용, 엄격한 코드 리뷰 프로세스, 보안 스캐닝 강화가 필수적
- <https://www.gitclear.com/research/ai_tool_impact_on_developer_productive_output_from_2022_to_2025>
  - In 2025, the average developer checked in 75% more code than they did in 2022
- (2025년 7월) [AI가 개발자 생산성에 미치는 영향 - 스탠포드 연구](https://news.hada.io/topic?id=22248)
  - [같은 자료에 대한 요약](https://www.linkedin.com/posts/kurt-lee-70010391_does-ai-actually-boost-developer-productivity-activity-7354024167538659329-Ndov/)
  - 3년간, 600여 개 회사, 10만 명 이상의 소프트웨어 엔지니어, 십억 줄 이상의 코드, 수천만 건의 커밋 대상으로 측정.
  - 단순 커밋/PR 개수, 평균 작업 시간 변화 등은 실제 생산성을 왜곡할 수 있음.
     - 예: AI 사용 직후엔 버그나 재작업(rework)성 커밋이 함께 증가하여 피상적으로만 생산성이 높아진 것처럼 보임.
  - AI를 쓰면 전체 코드 생산성은 30%-40% 늘어남. 하지만 "Rework" 가 15%-25% 증가, 결과적으로 실제 생산성 증가는 15~20% 수준.
- [AI가 오픈소스 개발자를 느리게 만든다. Peter Naur가 그 이유를 알려줄 수 있다](https://news.hada.io/topic?id=21996)
  - [AI착시와 평균의 함정을 피한 슈퍼 개인의 통찰: AI 도구로 생산성 38% 향상시킨 개발자의 비밀](https://www.facebook.com/seunghwan.lee.9003888/posts/pfbid06AdDqN1kbTSCUbwvBfSzyfs1Hy54msEWzeKBj7LmygKY4zQxASuMLHLdNGjXZRegl)
- [Measuring AI Ability to Complete Long Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)
  - AI의 시간 지평(Time Horizon)이 7개월마다 두 배로 증가한다.
  - 비판 의견 : <https://medium.com/@AIchats/are-ai-time-horizon-doubling-every-seven-months-e337162eec83>
- <https://www.darkreading.com/application-security/ai-generated-code-leading-expanded-technical-security-debt>
- <https://jellyfish.co/blog/with-copilot-engineers-get-15-more-capacity-without-additional-headcount/>
  - Ticket 해결 속도가 15% 향상
- [Google DORA 2024 Report](https://dora.dev/dora-report-2024) : AI 도입 초기(2024년)에는 배포 처리량이 오히려 악화되었고, AI 활용 증가가 배포 불안정성을 높이는 부작용이 나타났다.
- [AI 코딩 시대, 성장이 멈추는 개발자의 뇌에서 일어나는 일 | GeekNews](https://news.hada.io/topic?id=28653)
    - AI를 잘 쓰는 핵심 역량은 출력물의 품질을 판단·교정하는 능력이며, AI에 의존할수록 오히려 이 능력이 약화되는 역설을 지적
    - Bjork의 "바람직한 어려움" 이론에 따르면 쉽게 처리한 정보는 장기 기억에 남지 않음
    - Roediger & Karpicke(2006) 연구에서 인출 연습 그룹의 일주일 후 기억 보존율이 반복 읽기 그룹보다 약 50% 높았음
- [조직에 Claude Code를 설치한다고 AX가 되지 않는다](https://flowkater.io/posts/2026-03-15-ax-organization-transformation/)
    - 코딩은 전체 개발 사이클의 약 43%에 불과해, 도구 설치만으로 전사 AI 전환(AX)이 일어나지 않음
    - AX를 달성하려면 프로세스·협업 구조·의사결정 방식을 함께 재설계해야 한다는 주장
    - 단순한 Claude Code 보급 캠페인이 아니라 생산성 병목을 식별하고 문화적 변화를 동반해야 함
