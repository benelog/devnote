# CLAUDE.md

## 프로젝트 개요

Obsidian vault 기반 개발 노트 모음. `obsidian-site-action/`의 빌드 도구로 정적 웹사이트를 생성한다.

## 핵심 구조

- `content/*.md` — 270개 마크다운 노트 (플랫 구조)
- `site.yaml` — 사이트 설정 (title, subtitle, lang, output-directory)
- `obsidian-site-action/` — 빌드 도구 (추후 별도 repo로 분리 예정)
  - `build.ts` — 진입점. `import.meta.url` 기준으로 layouts/styles를 찾고, vault 경로는 `--source`로 받음
  - `layouts/page.html`, `layouts/index.html` — HTML 템플릿. `{title}`, `{body}` 등 플레이스홀더 사용
  - `styles/style.css` — 공유 스타일시트
- `public/` — 빌드 결과물 (gitignored)

## 빌드 & 테스트

```bash
# 빌드
cd obsidian-site-action && npm run build -- --source ..

# 로컬 미리보기
python3 -m http.server 8000 -d public

# 다른 vault에 대해 실행
npm run build -- --source /path/to/vault --output dist
```

## 노트 컨벤션

- 파일명이 페이지 제목 (`spring-boot` → "spring boot"). H1은 섹션 헤딩으로만 사용
- `[[wikilink]]`는 `## Related` 섹션에만 위치. 현재 약 2,025개
- 빌드 시 `#` → `##`, `##` → `###`으로 한 단계씩 하향 (템플릿이 페이지 제목을 H1으로 렌더링)
- Related 섹션은 본문에서 분리되어 사이드바에 렌더링됨
- Backlinks는 자동 생성 (해당 페이지를 참조하는 다른 페이지 목록)

## 빌드 도구 분리 전략

`obsidian-site-action/` 디렉토리를 그대로 별도 repo로 옮기면 됨. build.ts가 vault 경로를 CLI 인자로 받으므로 물리적 위치와 무관하게 동작.

## 주의사항

- `public/`은 gitignored. 커밋하지 않는다
- `obsidian-site-action/` 수정 시, 이 디렉토리가 별도 repo로 분리될 수 있음을 고려. vault에 종속적인 로직은 피한다
