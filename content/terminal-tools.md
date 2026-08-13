터미널에서 쓰는 TUI 애플리케이션 모음

## 파일 매니저

- [yazi](https://github.com/sxyazi/yazi)
    - Rust로 만든 비동기 I/O 기반 터미널 파일 매니저
    - 이미지 미리보기, 다중 탭, Git 연동을 기본 제공
    - Lua 플러그인 시스템으로 기능 확장 가능
- [nnn](https://github.com/jarun/nnn)
    - C로 만든 경량 파일 매니저. 바이너리 크기와 메모리 사용량이 매우 작음
    - 설정 없이 바로 쓰는 것을 지향하며, 디스크 사용량 분석·일괄 이름 변경·파일 선택 등을 지원
    - 플러그인으로 미리보기, 클라우드 연동 등을 붙일 수 있음
- [vifm](https://github.com/vifm/vifm)
    - C로 만든 curses 기반 파일 매니저로, Vim의 키바인딩과 모드 체계를 그대로 따름
    - 2단 패널 구성에 `:` 커맨드, 매크로, 스크립팅을 지원해 커스터마이징 여지가 큼
    - Vim에 익숙한 사용자가 별도 학습 없이 쓸 수 있는 것이 장점

## 파일 뷰어

- [herdr-file-viewer](https://github.com/smarzban/herdr-file-viewer)
    - `herdr` pane 안에서 동작하는 git-aware 읽기 전용 TUI 파일 뷰어
    - 왼쪽에는 Git 상태가 반영된 디렉터리 트리, 오른쪽에는 변경 파일 diff·렌더링된 Markdown·문법 강조 코드 뷰를 파일에 맞춰 표시
    - `glow`, `delta`, `bat` 같은 외부 렌더러를 활용하며, split/tab 열기와 fuzzy find, baseline 전환, `path:line` 복사 등을 지원

## 에디터

- [helix](https://github.com/helix-editor/helix)
    - Rust로 만든 모달 에디터. Vim보다는 Kakoune의 `선택 → 동작` 조작 순서를 따름
    - LSP 클라이언트와 Tree-sitter 기반 문법 강조·구조 인식이 내장되어 플러그인 설정 없이 바로 동작
    - 다중 선택을 기본 편집 단위로 사용하고, 설정은 `config.toml` 한 파일로 관리
- [micro](https://github.com/micro-editor/micro)
    - Go로 만든 터미널 텍스트 에디터. 의존성 없는 단일 바이너리로 배포됨
    - vi/emacs식 모드나 단축키 대신 일반적인 데스크톱 에디터 키 조작을 따라 진입 장벽이 낮음
    - 다중 커서, 130개 이상 언어의 문법 강조, Lua 플러그인 시스템을 제공
- [edit](https://github.com/microsoft/edit)
    - Microsoft가 Rust로 다시 만든 터미널 에디터. MS-DOS Editor의 후계로 소개됨
    - 메뉴 바와 단축키 표기를 갖춘 고전적인 TUI에 VS Code식 조작 방식을 결합
    - 모드 없이 바로 입력·저장·종료할 수 있어 터미널 에디터에 익숙하지 않은 사용자를 겨냥

## Related
- [[linux]]
- [[linux-shell]]
- [[vi]]
- [[ascii-tools]]
