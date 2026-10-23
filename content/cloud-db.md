컨테이너가 0으로 줄었다가 요청마다 다시 뜨는 환경(Cloud Run, Lambda, 무료 PaaS)에서는
DB 선택 기준이 달라진다. **커넥션 풀을 유지할 수 없다**는 게 핵심 제약이라,
요청 단위 HTTP로 붙는 DB가 유리하다.

## 무료 티어 비교

| | [Turso](https://turso.tech/pricing) | [Neon](https://neon.com/docs/introduction/plans) | [Supabase](https://supabase.com/pricing) | [InstantDB](https://www.instantdb.com/pricing) | [DoltHub](https://www.dolthub.com/pricing) | [Back4app BaaS](https://www.back4app.com/pricing/backend-as-a-service) |
| --- | --- | --- | --- | --- | --- | --- |
| 정체 | 관리형 SQLite(libSQL) | 서버리스 Postgres | Postgres + PostgREST + Auth | 실시간 동기화 DB | Git처럼 버전 관리되는 MySQL 호환 DB | Parse + MongoDB |
| 접속 | **HTTPS 요청 단위** | TCP (pooler 경유) | TCP + REST | 클라이언트 SDK + Admin HTTP API | HTTP REST API | REST / GraphQL만 |
| 무료 한도 | DB 100개 / 5GB / 월 5억 row read, 1천만 write | 0.5GB / 월 100 CU-h / 프로젝트 100개 | 500MB / egress 5GB / MAU 5만 / 활성 프로젝트 2개 | 1GB / API 요청 무제한 | 공개 저장소 무료, 비공개는 100MB까지 | 월 25,000 요청 / 250MB / 파일 1GB |
| 유휴 시 | 영향 없음 | 5분 후 scale-to-zero, 재개 시 지연 | **7일 유휴 시 프로젝트 정지** | 정지 없음 | 영향 없음 | - |
| 카드 | 불필요 | 불필요 | 불필요 | 불필요 | 불필요 | 불필요 |
| Go 궁합 | `libsql-client-go` — **순수 Go, CGO 불필요** | pgx | pgx | 공식 SDK 없음 (JS/Python만) | HTTP 직접 호출 | **Go SDK 없음** |

## 선택 가이드

- **서버리스/무료 PaaS 위의 개인 프로젝트** → Turso. 커넥션을 맺지 않으므로 콜드스타트와 궁합이 가장 좋고, 로컬은 SQLite 파일로 같은 코드가 돌아간다
- **Postgres 기능이 필요하고 트래픽이 꾸준함** → Neon. 스키마·확장·SQL 기능은 Turso보다 넓다
- **Auth·Storage·실시간까지 한 번에** → Supabase. 단 7일 유휴 정지가 개인 앱에는 치명적이라 주기적으로 깨워줘야 한다
- **프론트엔드 주도 실시간 협업 앱** → InstantDB. 무료 프로젝트가 정지되지 않는 점이 강점
- **데이터 자체의 변경 이력이 중요** → Dolt/DoltHub. 일반 CRUD 앱에는 과하다
- **DB를 앱과 같은 리전에 두라.** 앱이 미국, DB가 도쿄면 쿼리마다 태평양을 건넌다.
  til.benelog.net 에서 DB만 오하이오 → 도쿄로 옮겨 같은 조건으로 재본 결과:

  | Turso 그룹 위치 | 한국에서 `GET /` |
  | --- | --- |
  | `aws-us-east-2` (오하이오) | 197~220ms |
  | `aws-ap-northeast-1` (도쿄) | **38~45ms** |

  코드도 앱 위치도 그대로고 DB 리전만 바꿨는데 5배다. 페이지 한 장이 쿼리 한 번인 앱이라
  DB 왕복이 응답 시간을 그대로 지배한다. **배포처 리전을 정하기 전에 DB 리전부터 맞출 것**

## Turso (libSQL)

SQLite를 서버로 올린 libSQL의 관리형 서비스. 이 노트의 [til.benelog.net](https://til.benelog.net) 구성에서 실제로 쓴 저장소다.

- SQLite 파일 한 개 수준의 데이터를 다루는 개인 프로젝트에는 사실상 최적. 무료 5GB는 텍스트 기록용으로 사실상 무제한
- **요청 단위 HTTP로 붙어서 커넥션 풀이 필요 없다.** 콜드스타트가 잦은 환경에서 TCP+TLS 핸드셰이크 비용을 아예 내지 않는다
- 로컬 개발은 SQLite 파일(`modernc.org/sqlite`), 배포는 Turso로 **같은 `database/sql` 코드가 그대로 돌아간다**
- 벤더 종속이 낮다. 결국 SQLite라서 배포처를 옮겨도 그대로 따라온다 — 배포처를 Cloud Run → Northflank → Back4app 으로 두 번 바꾸는 동안 DB 코드는 한 줄도 건드리지 않았다

실무 주의사항:

- `libsql://` 스킴은 **웹소켓**으로 붙는다. 서버리스에서는 `https://` 로 바꿔 요청 단위 HTTP로 쓰는 편이 낫다
- Turso 문서가 권하는 `go-libsql`은 **CGO가 필요**해서 정적 바이너리 / distroless 이미지와 궁합이 나쁘다.
  순수 Go인 [`libsql-client-go`](https://github.com/tursodatabase/libsql-client-go)를 쓸 것
- 리전은 `turso group create <name> --location <id>` 로 지정한다.
  `aws-ap-northeast-1`(도쿄), `aws-us-east-2`(오하이오) 등. **앱이 뜨는 리전에 맞출 것**
- **리전 이전은 그룹을 새로 만들어 옮기는 수밖에 없다.** 그룹의 primary 위치는 바꿀 수 없다.
  무료(starter) 플랜 사용량 표시가 `groups 0/1` 이라 그룹을 하나 더 못 만들 것처럼 보이는데,
  실제로는 두 번째 그룹이 만들어졌다 — 표시를 믿지 말고 시도해 볼 것. 이전 절차에서 겪은 것:

  - `turso db create <새이름> --group <새그룹> --from-db <기존DB>` 는 **그룹이 다르면
    `record not found`** 로 실패한다. 같은 그룹 안에서만 되는 듯하다
  - `--from-dump <파일>` 은 DB만 만들어지고 **덤프가 적재되지 않은 채 exit 1** 이 났다.
    빈 DB가 남으므로 성공했는지 반드시 `select count(*)` 로 확인할 것
  - 결국 `turso db shell <새DB> < dump.sql` 로 밀어 넣는 게 확실했다.
    `turso db shell <기존DB> .dump` 로 뜬 덤프가 그대로 들어가고 `sqlite_sequence` 와 인덱스도 따라온다
  - 옮긴 뒤 양쪽에서 `group_concat` 해시를 떠서 대조하면 내용 동일성을 바이트 단위로 확인할 수 있다
  - **새 DB에는 토큰을 새로 발급해야 한다.** 기존 토큰은 다른 DB 것이라 그대로는 안 쓰인다
- **`turso db destroy` 후 재생성하면 이전에 발급한 토큰이 전부 무효가 된다.**
  `401 Unauthorized: invalid JWT token: can't be decoded with any of the existing keys` 가 나오면 이 경우다
- 토큰을 환경변수에 붙여넣을 때 앞뒤에 `=` 나 공백이 섞이면
  `JWT error: Base64 error: Invalid symbol 61, offset 0` 이 난다. `symbol 61` 이 `=` 다

## Neon

- Postgres를 서버리스로 제공. 브랜치 기능이 있어 배포 프리뷰마다 격리된 DB를 붙일 수 있다
- 무료 플랜은 프로젝트당 0.5GB 스토리지 + 월 100 CU-h 컴퓨트, 프로젝트 100개. 2025년 Databricks 인수 이후 무료 컴퓨트가 50 → 100 CU-h로 늘었다
- **5분 유휴 후 scale-to-zero.** 재개에 수백 ms가 붙으므로, 콜드스타트가 잦은 앱에서는 앱 콜드스타트와 겹쳐 체감이 나빠진다
- Go에서는 pgx로 붙는다. 서버리스라면 pooler 엔드포인트를 쓸 것
- Netlify DB가 이 Neon을 기반으로 한다 (아래)

## Supabase

- Postgres에 PostgREST(REST API), Auth, Storage, Realtime을 얹은 BaaS. Firebase의 오픈소스 대안 포지션
- 무료: DB 500MB, egress 5GB, MAU 5만, **활성 프로젝트 2개**
- **7일간 DB 요청이 없으면 프로젝트가 자동 정지된다.** 가끔 들어가는 개인 앱에는 치명적이라,
  깨어 있게 하려면 크론으로 주기적 쿼리를 날려야 한다
- 앱 서버 없이 프론트엔드에서 직접 DB를 치는 구조를 전제로 설계돼 있어, Row Level Security 설정이 사실상 필수다
- Go에서는 pgx로 직접 붙거나 PostgREST를 HTTP로 호출한다

## InstantDB

- 클라이언트에서 바로 읽고 쓰는 **실시간 동기화 DB**. 낙관적 업데이트와 오프라인 지원이 기본이고, 관계형 쿼리를 지원한다. Firebase 대안 중 관계형 쪽에 가깝다
- 무료: **1GB 데이터베이스, API 요청 무제한, 카드 불필요, 무료 프로젝트가 정지되지 않으며 상업적 사용도 허용**.
  Supabase의 7일 정지 같은 제약이 없다는 점이 개인 프로젝트에 큰 장점
- 서버 측 공식 SDK는 **JavaScript(`@instantdb/admin`)와 Python 뿐**이다.
  Admin HTTP API가 있어 Go에서도 직접 호출할 수는 있지만 공식 지원은 아니다
- 프론트엔드가 주도하는 실시간 협업 앱에 맞는 도구다. Go로 서버 렌더링하는 구조에는 결이 맞지 않는다

## Dolt / DoltHub

- **Dolt**: MySQL 호환 SQL 데이터베이스인데 Git처럼 `commit` / `branch` / `merge` / `diff` 가 된다.
  데이터의 변경 이력이 1급 기능이라는 점이 다른 DB와 근본적으로 다르다
- **DoltHub**: Dolt 저장소를 올려두고 공유하는 곳. GitHub의 Dolt판.
  공개 저장소는 무료, 비공개는 100MB까지 무료이고 초과하면 DoltHub Pro $5/월(5GB까지),
  그 이상은 $1/GB/월 (2026-04 개편으로 10배 인하)
- 호스팅된 DB에 대한 **HTTP REST API(v2, OpenAPI 정의)** 를 제공해서 앱 백엔드로 붙일 수 있다.
  실제 사례: [chain.benelog.net](https://chain.benelog.net)
- 상시 켜진 MySQL 엔드포인트가 필요하면 **Hosted Dolt** 인데 이쪽은 **무료 티어가 없다**.
  체험용 인스턴스가 월 $50(t2.medium + 50GB), 표준 구성은 훨씬 비싸다
- 적합한 용도: 사전·가격표·공개 데이터셋처럼 **데이터가 언제 왜 바뀌었는지가 중요한 것**.
  일반 CRUD 앱에는 과하고, 쓰기 지연도 일반 DB보다 크다

## PaaS 내장 DB

앱을 올린 곳에서 DB까지 같이 주는 경우. 앱과 같은 리전에 있어 지연이 짧다는 게 공통 장점이다.

- **Netlify DB**: Neon 기반 서버리스 Postgres, 2026년 4월 GA.
  **크레딧 기반 플랜 전용**이라 구형 `Free (Legacy)` 플랜 팀은 쓸 수 없다.
  이걸 쓰려고 신규 크레딧 기반 Free(월 300 크레딧 하드 캡)로 전환하면
  같은 팀의 기존 정적 사이트들도 전부 같은 캡 아래로 들어가므로 주의
- **Northflank addon**: 상시 가동이라 콜드스타트 개념이 없다. 무료 슬롯 1개.
  무료 addon의 vCPU/RAM/스토리지 스펙은 가격 페이지에 공개돼 있지 않아 계정에서 직접 확인해야 한다
- **Render Postgres**: 무료는 **30일 제한**이라 상시 운영에는 못 쓴다
- **Koyeb Postgres**: active 5시간 / 1GB storage 제한 (기존 사용자 한정)

## Back4app BaaS (Parse)

- 컨테이너 호스팅(Back4app Containers)과 **별개 상품**이다. 혼동 주의
- Parse Server + MongoDB. 무료는 월 25,000 요청 / DB 250MB / 파일 1GB
- 월 25,000 요청 = 하루 830건이라 개인용으로도 아슬아슬하다
- **Go SDK가 없어서** Parse 객체 모델에 맞춰 REST를 직접 짜야 한다. 테이블 하나짜리 앱에는 과한 종속

## Related
- [[cloud-deployment]]
- [[cloud]]
- [[db]]
- [[paas]]
- [[golang]]
