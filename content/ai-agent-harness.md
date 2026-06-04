## Harness

* [스킬이 쏟아지는 시대, 내 하네스는 내가 만든다](https://news.hada.io/weekly/202615)
* [같은 Opus인데 왜 결과가 다를까 — 하네스 엔지니어링이라는 답](https://www.fullstackfamily.com/@urstory/posts/14381)
* [AI에게 게임을 만들게 하는 법 — 하네스 엔지니어링 실전 가이드]](https://www.fullstackfamily.com/@urstory/posts/14386)
* [하네스 엔지니어링 — 민호의 하네스로 배우는 AI 팀 설계 (WEBNORI)](https://wiki.webnori.com/pages/viewpage.action?pageId=125731373)
    - "민호의 하네스" 사례를 통해 AI 에이전트 팀 설계 패턴을 학습하는 DevBegin 커뮤니티 정리 문서
    - 하네스 구성 요소와 운영 노하우를 실무 관점에서 풀어낸 글
* ["하네스 구성해줘" 한 마디로 에이전트 팀이 만들어진다 — Harness가 보여주는 AI 에이전트 오케스트레이션의 미래](https://wikidocs.net/blog/@jaehong/10292/)
    - 자연어 한 줄로 하네스를 구성해 여러 에이전트를 자동 오케스트레이션하는 접근 소개
    - 하네스 기반 오케스트레이션이 향후 AI 개발 방식을 어떻게 바꿀지에 대한 전망
* [프롬프트에서 하네스까지 — AI 에이전틱 패턴 4년의 기록](https://bits-bytes-nn.github.io/insights/agentic-ai/2026/04/05/evolution-of-ai-agentic-patterns.html)
    - "엔지니어링의 엄밀함은 사라지지 않는다 — 이동할 뿐이다"라는 관점으로 4년간의 패턴 진화를 정리
    - 단순 프롬프트 엔지니어링에서 하네스 중심 설계로 옮겨온 변곡점과 배경을 짚음
    - 에이전틱 시스템 설계 시 어떤 레이어에 엔지니어링 역량을 투입해야 하는지 지침 제공

## Agent
* https://github.com/lsdefine/GenericAgent
* [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
    - Anthropic Applied AI 팀이 프롬프트 엔지니어링을 넘어, 추론 시점에 들어가는 전체 토큰 구성을 다루는 `context engineering` 관점을 정리
    - 컨텍스트는 유한한 attention budget으로 보고, 원하는 행동을 이끌어내는 가장 작은 고신호 토큰 집합을 유지하는 것이 핵심 원칙
    - 시스템 프롬프트, 도구, 예시, 메시지 히스토리를 모두 간결하지만 충분하게 설계하고, 런타임에는 파일 경로·쿼리·링크 같은 식별자로 필요한 정보만 just-in-time으로 가져오라고 제안
    - 장기 작업에는 compaction, structured note-taking/agentic memory, sub-agent architecture를 과제 특성에 맞게 조합하는 전략을 소개
* [The Secrets of Claude's Agent Platform From the Team Who Built It](https://www.youtube.com/watch?v=lLypHkIVLqc)
    - Every의 AI & I 인터뷰로, Anthropic Claude Platform 제품·엔지니어링 리더가 Managed Agents 방향을 설명
    - 목표와 예산만 주면 클라우드 컴퓨터 위 Claude를 실행·확장·관리하는 형태를 지향하며, 에이전트 제품의 운영 인프라 부담을 플랫폼이 맡는다는 관점
    - 하네스와 모델이 하나의 단위로 가까워지는 흐름, 팀용 에이전트 형태, 장시간 실행 에이전트의 프로덕션 안정성 이슈를 다룸
    - 법무팀의 마케팅 문구 리뷰 에이전트 사례, advisor/adversarial pair/swarm 같은 멀티 에이전트 오케스트레이션, outcome·budget 기반 성공 측정도 언급
