
## 적용 사례

- [Beyond Vibe Coding to Agentic Coding: 카카오의 AI 협업 개발  실험](https://tech.kakao.com/posts/711)
- <https://toss.tech/article/toss-frontend-ai-docs>
- <https://vercel.com/blog/becoming-an-ai-engineering-company>
- <https://v0.dev/>
- [자율 에이전트를 활용한 AI 네이티브 자바 개발 (SpringCamp 2026, 최용호)](https://github.com/springcamp/presentations/blob/main/SpringCamp-2026-Presentations/%5B%EC%B5%9C%EC%9A%A9%ED%98%B8%EB%8B%98%5D%20%EC%9E%90%EC%9C%A8%20%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%EB%A5%BC%20%ED%99%9C%EC%9A%A9%ED%95%9C%20AI%20%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C%20%EC%9E%90%EB%B0%94%20%EA%B0%9C%EB%B0%9C.pdf)

## 도구

- [OpenClaw — Personal AI Assistant](https://openclaw.ai/)
* [Hermes Agent — The Agent That Grows With You](https://hermes-agent.nousresearch.com/) 
* [MiMo Code](https://mimo.xiaomi.com/mimocode/start)
    - Xiaomi의 개발자용 AI 코딩 에이전트 문서로, 코드베이스 이해·변경 계획·안전한 코드 편집·검토·디버깅을 지원한다고 소개
    - 터미널, 데스크톱 앱, IDE 확장에서 같은 경험을 제공하며 Install & Launch, 모델 연결, 세션/컨텍스트, 작업 모드, 도구 사용을 문서화
    - rules, skills, custom commands, MCP, custom tools, specialized agents, formatter, LSP 등 팀 워크플로에 맞춘 커스터마이징 항목을 제공
* [Pi Coding Agent](https://pi.dev/)
    - 워크플로를 제품에 맞추기보다 하네스를 워크플로에 맞게 바꾸는 것을 지향하는 미니멀 에이전트 하네스
    - extensions, skills, prompt templates, themes를 Pi packages로 묶어 npm이나 git으로 공유·설치할 수 있음
    - interactive, print/JSON, RPC, SDK 네 가지 모드를 제공해 TUI 사용부터 스크립트·외부 앱 임베딩까지 지원
    - AGENTS.md/SYSTEM.md, 커스텀 compaction, on-demand skills, dynamic context 등 컨텍스트 엔지니어링을 직접 제어할 수 있는 구조를 강조
* [oh-my-pi](https://github.com/can1357/oh-my-pi)
    - Pi에서 fork한 터미널용 AI 코딩 에이전트로, 해시 기반 편집과 모델별 튜닝된 하네스를 강조
    - LSP/DAP, Python·Bun 코드 실행, 브라우저, 서브에이전트, GitHub 파일시스템, ACP 등을 기본 도구로 묶어 제공
    - 40개 이상 프로바이더와 수백 개 모델 라우팅을 지원하고 `omp` CLI, SDK, RPC, ACP 진입점을 제공
* https://github.com/lsdefine/GenericAgent
* [OpenCrabs — Open-Source Terminal AI Agent](https://opencrabs.com/) 
- <https://github.com/block/goose>
- [25년 현재 어떤 CLI툴을 써야하는지 말씀드리겠습니다](https://youtube.com/watch?si=fp9Uqlc_n8bCv1Nq&v=K2rVBIb-KWE) (박진형 님)
- <https://opencode.ai/>
- [Vibe Kanban: OpenCode + Claude Code 동시에? AI 코딩 에이전트 오케스트레이션](https://fornewchallenge.tistory.com/entry/%F0%9F%9A%80-Vibe-Kanban-OpenCode-Claude-Code-%EB%8F%99%EC%8B%9C%EC%97%90-AI-%EC%BD%94%EB%94%A9-%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8-%EC%98%A4%EC%BC%80%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98)

### GitHub Copilot

- [코파일럿 ‘열일’하게 만들기](https://techblog.woowahan.com/21240/)

### Cursor

- [Cursor Max mode로 대형 코드 베이스 다루기](https://devway.tistory.com/70)

### MCP
* [MCP is DEAD](https://www.youtube.com/watch?v=JZW2W5rwsD4) (Youtube)
* [MCP is dead. Long live the CLI](https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html)


## Terminal 도구

* [BBARIT Terminal](https://bbarit.com/)
    - AI agent, terminal, IDE, design, Office, embedded browser를 한 화면에 묶은 네이티브 AI workspace
    - repo를 읽고 안전하게 수정·검사·수정 반복을 수행하는 BBARIT Agent와, developer/reviewer 터미널을 격리된 worktree에서 돌리는 Broker Agent를 제공
* [Herdr](https://herdr.dev/)
    - 여러 coding agent를 하나의 터미널에서 실행·상태 확인·재접속할 수 있는 agent multiplexer
    - 각 agent를 실제 터미널에서 서버 프로세스로 유지하며 SSH나 휴대폰에서도 blocked/working/done 상태를 보고 이어서 지시할 수 있음
* [Orca](https://github.com/stablyai/orca)
    - Codex, Claude Code, OpenCode, Pi 같은 coding agent를 각자 isolated git worktree에서 나란히 실행·추적하는 ADE
    - parallel worktrees, terminal splits, mobile companion, SSH worktrees로 여러 agent의 결과를 비교하고 선택해 병합하는 흐름을 지원
 
## Open 스펙
- <https://agents.md/>
- <https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation>

### Skill
* <https://agentskills.io/>
  * [agentskills.io/ 소개](https://www.linkedin.com/feed/update/urn:li:activity:7408299241556606976/?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7408299241556606976%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29)
* https://www.productcompass.pm/p/pm-skills-marketplace-claude
* [Claude Skills는 굉장하다, MCP보다 더 큰 혁신일지도](https://news.hada.io/topic?id=23734)

## Children
* [[ai-productivity]]
* [[claude-code]]
* [[ai-agent-harness]]
