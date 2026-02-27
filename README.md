# devnote

정상혁의 개발수첩

Obsidian vault로 관리하는 개발 노트 모음. `obsidian-graph-site`를 이용해 정적 웹사이트로 빌드할 수 있다.

## 정적 사이트 빌드

### 요구사항

- Python 3.10+
- `markdown` 라이브러리 (없으면 내장 fallback 변환기 사용)

### 빌드

```bash
pip install -r obsidian-graph-site/requirements.txt
python3 obsidian-graph-site/build.py
```

### 로컬 미리보기

```bash
python3 -m http.server 8000 -d public
```

브라우저에서 http://localhost:8000 접속.

### CLI 옵션

```bash
python3 obsidian-graph-site/build.py --source /path/to/vault   # vault 경로 지정
python3 obsidian-graph-site/build.py --output dist              # 출력 디렉토리 변경
```

### 설정

`site.json`으로 사이트 메타데이터를 설정한다.

```json
{
  "title": "devnote",
  "subtitle": "정상혁의 개발수첩",
  "lang": "ko",
  "output": "public"
}
```

## 구조

```
content/*.md                        # Obsidian 노트 (플랫 구조)
site.json                           # 사이트 설정
obsidian-graph-site/                # 빌드 도구
  build.py                          # 빌드 스크립트
  templates/                        # HTML 템플릿
    page.html                       # 개별 페이지
    index.html                      # 메인 페이지 (D3 그래프)
  static/
    style.css                       # 스타일시트
  requirements.txt                  # Python 의존성
public/                             # 빌드 결과물 (gitignored)
```

## 노트 작성 규칙

- 파일명이 페이지 제목이 된다 (`spring-boot.md` → "spring boot")
- `[[wikilink]]`로 노트 간 연결 (`## Related` 섹션에 작성)
- `#` 헤딩은 섹션 구분용으로 사용 (빌드 시 한 단계씩 낮춰짐)
