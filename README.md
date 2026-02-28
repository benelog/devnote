# devnote

정상혁의 개발수첩

Obsidian vault로 관리하는 개발 노트 모음. `obsidian-site-action`를 이용해 정적 웹사이트로 빌드할 수 있다.

## 정적 사이트 빌드

### 요구사항

- Node.js 18+
- npm

### 빌드

```bash
cd obsidian-site-action && npm install
npm run build -- --source /path/to/vault
```

### 로컬 미리보기

```bash
python3 -m http.server 8000 -d public
```

브라우저에서 http://localhost:8000 접속.

### CLI 옵션

```bash
npm run build -- --source /path/to/vault   # vault 경로 지정
npm run build -- --output dist             # 출력 디렉토리 변경
```

### 설정

`site.yaml`로 사이트 메타데이터를 설정한다.

```yaml
title: devnote
subtitle: 정상혁의 개발수첩
lang: ko
output-directory: public
```

## 구조

```
content/*.md                        # Obsidian 노트 (플랫 구조)
site.yaml                           # 사이트 설정
obsidian-site-action/                # 빌드 도구
  build.ts                          # 빌드 스크립트 (진입점)
  render.ts                         # HTML 렌더링
  graph.ts                          # 그래프/백링크 생성
  layouts/                          # HTML 템플릿
    page.html                       # 개별 페이지
    index.html                      # 메인 페이지 (D3 그래프)
  styles/
    style.css                       # 스타일시트
  package.json                      # Node.js 의존성
public/                             # 빌드 결과물 (gitignored)
```

## 노트 작성 규칙

- 파일명이 페이지 제목이 된다 (`spring-boot.md` → "spring boot")
- `[[wikilink]]`로 노트 간 연결 (`## Related` 섹션에 작성)
- `#` 헤딩은 섹션 구분용으로 사용 (빌드 시 한 단계씩 낮춰짐)
