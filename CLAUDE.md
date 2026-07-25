# CLAUDE.md

## 프로젝트 개요

Obsidian vault 기반 개발 노트 모음. 빌드 도구는 [benelog/obsidian-site](https://github.com/benelog/obsidian-site)로 분리되어 있고, 이 repo에는 노트와 사이트 설정만 있다.

## 핵심 구조

- `content/*.md` — 286개 마크다운 노트 (플랫 구조)
- `site.yaml` — 사이트 설정 (title, subtitle, lang, content-directory, output-directory, gitHub)
- `.github/workflows/deploy.yaml` — master에 push되면 `benelog/obsidian-site@v1`로 빌드해 GitHub Pages에 배포
- `public/` — 빌드 결과물 (gitignored)
- `save.sh` — 전체 변경사항을 add/commit/push 하는 스크립트

## 빌드 & 미리보기

```bash
npm install -g obsidian-site   # 최초 1회

obsidian-site build --source .
obsidian-site serve --port 8000
```

- `--source <path>` — vault 경로 (기본값: 현재 디렉토리)
- `--output <path>` — site.yaml의 `output-directory`를 덮어씀

## 노트 컨벤션

- 파일명이 페이지 제목 (`spring-boot` → "spring boot"). H1은 섹션 헤딩으로만 사용
- `[[wikilink]]`는 `## Related`(연관 노트) 또는 `## Children`(하위 노트 목록) 섹션에 위치. 현재 약 657개
- 빌드 시 `#` → `##`, `##` → `###`으로 한 단계씩 하향 (템플릿이 페이지 제목을 H1으로 렌더링)
- Related/Children 섹션은 본문에서 분리되어 사이드바에 렌더링됨
- Backlinks는 자동 생성 (해당 페이지를 참조하는 다른 페이지 목록)

## 주의사항

- `public/`은 gitignored. 커밋하지 않는다
- 레이아웃·스타일·렌더링 로직은 이 repo에 없다. benelog/obsidian-site에서 수정한다
