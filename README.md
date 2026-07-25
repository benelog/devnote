# devnote

정상혁의 개발수첩

Obsidian vault로 관리하는 개발 노트 모음. [obsidian-site](https://github.com/benelog/obsidian-site)를 이용해 정적 웹사이트로 빌드한다.

## 정적 사이트 빌드

### 요구사항

- Node.js 18+
- npm

### 설치

```bash
npm install -g obsidian-site
```

### 빌드

```bash
obsidian-site build --source .
```

### 로컬 미리보기

```bash
obsidian-site serve --port 8000
```

브라우저에서 http://localhost:8000 접속.

### CLI 옵션

```bash
obsidian-site build --source /path/to/vault   # vault 경로 지정 (기본값: 현재 디렉토리)
obsidian-site build --output dist             # 출력 디렉토리 변경 (site.yaml 설정을 덮어씀)
obsidian-site serve --port 8000               # 미리보기 서버 포트
```

### 설정

`site.yaml`로 사이트 메타데이터를 설정한다.

```yaml
title: Devnote
subtitle: Benelog의 개발수첩
lang: ko
content-directory: content
output-directory: public
gitHub:
  repository-url: https://github.com/benelog/devnote
  content-branch: master
```

### 배포

master 브랜치에 push하면 `.github/workflows/deploy.yaml`이 `benelog/obsidian-site@v1` 액션으로 빌드해 GitHub Pages에 배포한다.

## 구조

```
content/*.md                 # Obsidian 노트 (플랫 구조)
site.yaml                    # 사이트 설정
.github/workflows/deploy.yaml # GitHub Pages 배포 워크플로
public/                      # 빌드 결과물 (gitignored)
```

레이아웃, 스타일, 렌더링 로직은 이 저장소가 아니라 [obsidian-site](https://github.com/benelog/obsidian-site)에 있다.

## 노트 작성 규칙

- 파일명이 페이지 제목이 된다 (`spring-boot.md` → "spring boot")
- `[[wikilink]]`로 노트 간 연결 (`## Related` 또는 `## Children` 섹션에 작성)
- `#` 헤딩은 섹션 구분용으로 사용 (빌드 시 한 단계씩 낮춰짐)
