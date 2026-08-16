
## 적용 사례

- [Beyond Vibe Coding to Agentic Coding: 카카오의 AI 협업 개발  실험](https://tech.kakao.com/posts/711)
- <https://toss.tech/article/toss-frontend-ai-docs>
- <https://vercel.com/blog/becoming-an-ai-engineering-company>
- <https://v0.dev/>
- [자율 에이전트를 활용한 AI 네이티브 자바 개발 (SpringCamp 2026, 최용호)](https://github.com/springcamp/presentations/blob/main/SpringCamp-2026-Presentations/%5B%EC%B5%9C%EC%9A%A9%ED%98%B8%EB%8B%98%5D%20%EC%9E%90%EC%9C%A8%20%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%EB%A5%BC%20%ED%99%9C%EC%9A%A9%ED%95%9C%20AI%20%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C%20%EC%9E%90%EB%B0%94%20%EA%B0%9C%EB%B0%9C.pdf)

## 도구

- [OpenClaw — Personal AI Assistant](https://openclaw.ai/)
* [Hermes Agent — The Agent That Grows With You](https://hermes-agent.nousresearch.com/) 
* [TencentDB Agent Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory)
    - AI 에이전트가 대화·문서·코드에서 Chat Memory, Skill, LLM-Wiki, Code-Graph 같은 재사용 가능한 팀 메모리 자산을 만들고 공유하도록 돕는 메모리 허브
    - 단기 컨텍스트는 원본 로그 → 단계 요약 → Mermaid 캔버스로 계층화하고, 장기 개인화는 Conversation → Atom → Scenario → Persona 피라미드로 구성한다고 설명
    - flat vector store나 단순 요약 대신 하위 계층의 근거를 보존하고 상위 계층의 구조화된 Markdown을 제공해 추적성과 디버깅 가능성을 강조
    - OpenClaw 연동 기준 토큰 사용량을 최대 61.38% 줄이고 WideSearch 성공률을 33%에서 50%로 높였다고 제시하며, Hermes·Claude Code·Codex 등 여러 에이전트와의 연동을 제공
* [Prime Agent](https://github.com/PrimeIntellect-ai/prime-agent)
    - 코딩 워크플로와 장기 자율 작업을 위한 오픈소스 코딩·리서치 에이전트로, Recursive Language Model(RLM)과 Continual Harness를 핵심 추상화로 제시
    - persistent IPython을 기본 도구로 삼아 파일·셸·도구 호출·서브에이전트·컨텍스트 관리를 모두 코드로 다루는 programmatic agent 구조를 강조
    - `rlm(...)`으로 실제 child agent를 병렬·백그라운드 실행하고, `/refine`으로 현재 작업 궤적을 검토해 보조 프롬프트·메모리·스킬 같은 harness state를 근거 기반으로 개선
    - daemon 기반 세션 재접속, 자동 compaction, persistent goals, heartbeat, schedules, autonomous mode로 긴 작업이 터미널 세션을 넘어 계속 진행되도록 설계
* [Semantica](https://github.com/semantica-agi/semantica)
    - LLM·벡터스토어·에이전트 프레임워크 아래에서 동작하는 graph-native context/decision infrastructure로, 임베딩만 남기는 방식 대신 의미·결정·근거를 감사 가능하게 보존하는 것을 목표로 함
    - 기업 데이터에서 Context Graph와 Knowledge Graph를 만들고 graph analytics, causal reasoning, ontology management, provenance tracking을 제공한다고 설명
    - 그래프 구성·추론·provenance에 LLM이 필수는 아니며, RDF와 labeled property graph를 모두 지원하는 self-hostable·auditable 인프라를 지향
    - 규제 산업처럼 “왜 그런 결정을 했는가”를 나중에 설명해야 하는 agentic system에서 decision intelligence와 end-to-end traceability를 제공하는 용도로 소개
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

### 모델 라우팅

- [커서, AI 비용 60% 절감하는 '커서 라우터' 공개… "작업별 최적 모델 자동 배정"](https://www.aitimes.com/news/articleView.html?idxno=213097) (AI타임스, 2026.7.23)
    - Cursor Router는 60만 건 이상의 실제 사용자 요청 데이터를 학습한 AI 분류기로 작업 난이도·맥락·도메인을 분석해 적합한 모델을 자동 선택한다고 소개
    - 단순 작업은 비용 효율 모델로, UI 수정은 디자인 강점 모델로, 장기 추론 작업은 고성능 추론 모델로 보내는 방식
    - 프롬프트 캐시 미스 비용까지 평가에 반영하고, 온라인 A/B 테스트에서 사용자 만족도와 코드 유지율을 핵심 지표로 사용했다고 설명
    - Auto Intelligence 모드는 최고 수준 모델과 비슷한 만족도를 유지하면서 비용을 약 60% 낮췄고, 기업 초기 운영에서는 30~50% 비용 절감 효과를 확인했다고 정리
- [메타, AI 비용 절감 위한 내부 라우팅 모델 '스위치보드' 개발](https://www.finance-scope.com/article/view/scp202607220022) (파이낸스스코프, 2026.7.23)
    - 메타 AAI 랩스가 작업 난이도를 점수화해 간단한 요청을 더 작고 저렴한 모델로 배정하는 내부 모델 라우팅 도구 `스위치보드`를 개발 중이라고 보도
    - 모든 요청에 최고급 모델 비용을 지불하는 비효율과 AI 인프라 지출 증가가 개발 배경이며, 최근 내부적으로 토큰 사용량 제한과 지출 추적 플랫폼 구축도 공지했다고 설명
    - 스위치보드는 아직 초기 단계라 최종 구현은 불확실하지만, 내부 배포뿐 아니라 외부 조직 대상 공개도 검토 중이라고 정리
    - 메타가 대규모 AI 인프라 투자를 비용 절감과 AI 도구 시장의 새 수익원으로 연결하려는 움직임으로 해석
- [GPT 5.6 luna 80% 비용 인하 성능 테스트(vs opus5, Gpt 5,6 sol)](https://www.linkedin.com/pulse/gpt-56-luna-80-%EB%B9%84%EC%9A%A9-%EC%9D%B8%ED%95%98-%EC%84%B1%EB%8A%A5-%ED%85%8C%EC%8A%A4%ED%8A%B8vs-opus5-sol-%EC%84%B1%EC%88%98-%EA%B9%80-cchgc)
    - 같은 프롬프트로 3인칭 드래곤 보스전을 만들게 한 비교에서 Luna 186원·9분 8초, Sol 3,931원·9분 27초, Claude Opus 5 120,854원·1시간 37분으로 비용 차이가 크게 났다고 정리
    - 공격 패턴, 선딜 신호, 구르기 무적, 2페이즈 전환, UI 같은 체크리스트는 세 모델 모두 통과했지만, 실제 플레이 품질은 Opus 5가 훨씬 몰입감 있었다고 평가
    - 핵심 차이로 Opus 5는 브라우저를 열어 스크린샷과 조작으로 직접 검증한 반면 Luna/Sol은 기본 지시만으로는 코드 작성 후 완료 선언에 머물렀다고 분석
    - 저렴한 모델을 쓸 때도 “직접 실행·검증하고 부족한 부분을 고쳐달라”는 명시적 지시를 붙이면 결과가 달라질 수 있으며, 모델 자체 성능뿐 아니라 Codex/Claude Code 같은 하네스 차이도 영향을 줄 수 있다고 본다

### MCP
* [MCP is DEAD](https://www.youtube.com/watch?v=JZW2W5rwsD4) (Youtube)
* [MCP is dead. Long live the CLI](https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html)


## Terminal 도구

* [Cloudflare Computer](https://github.com/cloudflare/computer)
    - Durable Object 안의 SQLite를 권위 있는 상태로 삼는 virtual filesystem과, `workspace.runtime.exec(source, { backend })` 단일 실행 표면을 제공하는 에이전트용 컴퓨터 환경
    - Container backend는 SQLite 상태를 FUSE mount로 sandbox container에 투영해 Linux userland·실제 바이너리·네트워크를 제공하고, 변경 사항을 RPC로 다시 동기화
    - Worker 기반 isolate shell과 isolate JavaScript backend도 제공해 컨테이너 없이 just-bash나 ECMAScript module을 Dynamic Worker에서 실행할 수 있음
    - MCP 예제, Think agent 예제, runtime 비교 UI, Artifact·Assets 예제를 포함하지만 preview 단계라 API 안정성과 프로덕션 사용에는 주의가 필요
* [BBARIT Terminal](https://bbarit.com/)
    - AI agent, terminal, IDE, design, Office, embedded browser를 한 화면에 묶은 네이티브 AI workspace
    - repo를 읽고 안전하게 수정·검사·수정 반복을 수행하는 BBARIT Agent와, developer/reviewer 터미널을 격리된 worktree에서 돌리는 Broker Agent를 제공
* [Herdr](https://herdr.dev/)
    - 여러 coding agent를 하나의 터미널에서 실행·상태 확인·재접속할 수 있는 agent multiplexer
    - 각 agent를 실제 터미널에서 서버 프로세스로 유지하며 SSH나 휴대폰에서도 blocked/working/done 상태를 보고 이어서 지시할 수 있음
* [Orca](https://github.com/stablyai/orca)
    - Codex, Claude Code, OpenCode, Pi 같은 coding agent를 각자 isolated git worktree에서 나란히 실행·추적하는 ADE
    - parallel worktrees, terminal splits, mobile companion, SSH worktrees로 여러 agent의 결과를 비교하고 선택해 병합하는 흐름을 지원
* [Crabbox — Run Any Repository Command in the Right Box](https://crabbox.sh/) (김옥현 님 공유)
    - 로컬 편집 상태를 local container, cloud VM, SSH host, Windows/WSL2/macOS, managed sandbox 등 적절한 실행 환경으로 동기화해 명령을 실행하고 결과를 다시 스트리밍하는 CLI
    - fast test loop, coding agent sandbox, cross-platform 실행, browser/desktop QA, parallel experiments, GPU workload 같은 작업별 provider 추천과 `crabbox doctor` 검증 흐름을 제공
    - 작업 후 임대한 컨테이너나 sandbox를 정리하는 disposable execution 경로를 강조해, agent 하네스 선택과 실행 환경 격리·정리 보장을 분리해서 비교할 수 있게 한다
 
## Open 스펙
- <https://agents.md/>
- <https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation>

### Skill
* <https://agentskills.io/>
  * [agentskills.io/ 소개](https://www.linkedin.com/feed/update/urn:li:activity:7408299241556606976/?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7408299241556606976%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29)
* [Agent Skills](https://github.com/addyosmani/agent-skills)
    - AI 코딩 에이전트가 개발 전 과정에서 일관되게 따를 수 있도록, 시니어 엔지니어의 워크플로·품질 게이트·베스트 프랙티스를 skill로 패키징한 저장소
    - `/spec`, `/plan`, `/build`, `/test`, `/review`, `/webperf`, `/code-simplify`, `/ship` 8개 slash command가 개발 생명주기 단계별 skill을 자동 활성화
    - `npx skills add addyosmani/agent-skills`로 24개 skill 전체를 설치하거나, `code-review-and-quality`, `interview-me`, `test-driven-development` 같은 개별 skill만 골라 설치 가능
    - Claude Code, Cursor, Codex, Copilot, Cline 등 70개 이상 에이전트/IDE 환경을 대상으로 한 설치 경로와 네이티브 통합 문서를 제공
* [Google Agent Skills](https://github.com/google/skills)
    - Google 제품과 Google Cloud 기술을 위한 Agent Skills 모음으로, `npx skills add google/skills`로 저장소의 개별 skill을 선택 설치할 수 있음
    - Google Cloud 시작·인증·온보딩, solution architecture, agentic analytics, data science workflow, bidirectional streaming, RAG, serverless app 같은 multi-product solution skill을 제공
    - Agent Platform, BigQuery AI/ML, Gemini API, Live API, Model Garden, prompt management, RAG Engine, eval flywheel 등 AI/ML 관련 운영 skill을 포함
    - GKE inference, cluster creation, networking, storage, reliability, productionize, troubleshooting 등 인프라 skill까지 포함해 클라우드 작업 절차를 에이전트 skill로 패키징하려는 방향을 보여줌
* https://www.productcompass.pm/p/pm-skills-marketplace-claude
* [Claude Skills는 굉장하다, MCP보다 더 큰 혁신일지도](https://news.hada.io/topic?id=23734)

## Children
* [[ai-productivity]]
* [[claude-code]]
* [[ai-agent-harness]]
