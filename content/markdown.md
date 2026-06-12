<http://easybook-project.org/> : Markdown을 이용한 출판

## 문법설명

- 마크다운의 링크문법: <http://blog.dahlia.pe.kr/articles/2008/03/01/link-syntax-of-markdown>
- GFM : <https://githubengineering.com/a-formal-spec-for-github-markdown/>

## 스펙

- <http://spec.commonmark.org/>
- <https://github.github.com/gfm>

## 변환

<http://daringfireball.net/projects/markdown/dingus>

<http://freewisdom.org/projects/python-markdown/>

<http://johnmacfarlane.net/pandoc/>

<http://www.xhtml2pdf.com/>

Eclipse plulgin update site :
<http://winterstein.me.uk/projects/tt-update-site/>

- [mq](https://mqlang.org/): jq와 비슷한 문법으로 Markdown을 처리하는 Rust 기반 CLI 도구
  - Markdown 문서에서 구조화된 노드를 선택·필터링·변환해 LLM 프롬프트/출력, 문서 관리, 배치 처리에 활용할 수 있다.
  - `cat README.md | mq '.list | to_text()'`처럼 파이프라인에서 특정 섹션이나 패턴을 추출하는 식으로 사용할 수 있다.
  - REPL, VS Code Extension, LSP, 실험적 디버거(`mq-dbg`)를 제공하며 커스텀 함수와 외부 `mq-*` 서브커맨드로 확장 가능하다.
  - `mq-conv`, `mq-crawler`, `mq-tui`, `mq-check`, `mq-lsp`, `mq-task` 등 Markdown 변환·크롤링·검사·작업 실행용 서브커맨드를 제공한다.
  - GitHub: <https://github.com/harehare/mq>
- [Glow](https://github.com/charmbracelet/glow): 터미널에서 Markdown을 보기 좋게 렌더링하는 Go 기반 CLI/TUI 도구
  - 현재 디렉터리 하위나 Git 저장소 안의 Markdown 파일을 찾아 탐색하고, 문서를 CLI에서 바로 읽을 수 있다.
  - 파일·표준입력·GitHub/GitLab 저장소·HTTP Markdown URL을 입력으로 받아 ANSI 스타일로 출력한다.
  - `glow`만 실행하면 TUI로 로컬 Markdown을 탐색하고, `glow README.md`, `glow github.com/charmbracelet/glow`처럼 CLI 렌더러로도 사용할 수 있다.
- [Quarkdown](https://github.com/iamgio/quarkdown): CommonMark/GFM 기반의 Markdown 확장 문서 조판 시스템
  - Markdown에 함수, 변수, 조건문/반복문, 표준 라이브러리 등을 더해 동적인 문서를 작성할 수 있다.
  - 하나의 소스로 HTML, PDF, 슬라이드(reveal.js), 문서/위키 사이트 등을 생성하는 것을 목표로 한다.
  - VS Code 확장과 live preview를 제공하며, 논문/책/지식베이스/프레젠테이션 용도를 모두 겨냥한다.

## 에디터

- <https://github.com/nhnent/tui.editor>

## Related
- [[asciidoc]]
- [[docbook]]
- [[documentation-cases]]
- [[documentation-tools]]
