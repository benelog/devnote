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
* [Pi Coding Agent](https://pi.dev/)
    - 워크플로를 제품에 맞추기보다 하네스를 워크플로에 맞게 바꾸는 것을 지향하는 미니멀 에이전트 하네스
    - extensions, skills, prompt templates, themes를 Pi packages로 묶어 npm이나 git으로 공유·설치할 수 있음
    - interactive, print/JSON, RPC, SDK 네 가지 모드를 제공해 TUI 사용부터 스크립트·외부 앱 임베딩까지 지원
    - AGENTS.md/SYSTEM.md, 커스텀 compaction, on-demand skills, dynamic context 등 컨텍스트 엔지니어링을 직접 제어할 수 있는 구조를 강조

## Agent
* https://github.com/lsdefine/GenericAgent
* [OpenCrabs — Open-Source Terminal AI Agent](https://opencrabs.com/)
    - 터미널에 상주하는 오픈소스 AI 에이전트로, TUI/CLI뿐 아니라 Telegram, Discord, Slack, WhatsApp, Trello 같은 채널에서도 세션을 이어갈 수 있다고 소개
    - Anthropic, OpenAI, Gemini, GitHub Copilot, OpenRouter, Ollama, LM Studio 등 다양한 모델·프로바이더와 연결되는 약 23MB 단일 바이너리 형태
    - 파일 작업, bash, 웹 검색, 코드 실행, 브라우저 자동화, 이미지 생성, 로컬 STT/TTS, 서브에이전트 오케스트레이션 등 50개 이상의 내장 도구를 제공
    - Mission Control, persistent memory, multi-agent/team orchestration, self-healing, RSI 기반 self-improving 기능을 내세워 개인용 터미널 하네스와 메신저 에이전트의 결합 사례로 볼 수 있음
* [OpenClaw — Personal AI Assistant](https://openclaw.ai/)
    - 메일함 정리, 이메일 발송, 캘린더 관리, 항공편 체크인처럼 실제 작업을 수행하는 개인 AI 비서로 소개
    - WhatsApp, Telegram 등 이미 쓰는 채팅 앱에서 호출할 수 있고, 사용자 컴퓨터의 컨텍스트와 skills를 활용하는 오픈소스 프로젝트라는 점을 강조
    - persistent memory, persona onboarding, comms integration, heartbeats처럼 장시간 동작하는 개인/팀 에이전트 운영 요소를 갖춘 사례
    - Claude Code·Codex 세션 실행, Sentry 오류 처리와 PR 생성, Obsidian notes 연동 등 사용자 후기에서 개발 워크플로 자동화 사례가 언급됨
* [Hermes Agent — The Agent That Grows With You](https://hermes-agent.nousresearch.com/)
    - 서버에 상주하며 시간이 지날수록 기억과 skills를 축적하는 오픈소스 MIT 라이선스 자율 에이전트
    - Telegram, Discord, Slack, WhatsApp, Signal, Email, CLI 등 여러 플랫폼에서 같은 작업 맥락을 이어갈 수 있음
    - 자연어 cron으로 보고서·백업·브리핑 같은 예약 자동화를 구성하고, 격리된 subagents와 Python RPC scripts로 병렬 작업을 위임하는 구조
    - local, Docker, SSH, Singularity, Modal 등 샌드박스 백엔드와 web search, browser automation, vision, image generation, TTS 같은 도구 통합을 제공
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
