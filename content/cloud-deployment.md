- [Coolify](https://github.com/coollabsio/coolify)
- [Dokploy](https://github.com/Dokploy/dokploy)
- DigitalOcean App Platform
- Google Cloud run
- [ngrok](https://ngrok.com/)
    - 어디서 실행 중이든 서비스로 들어오는 트래픽을 안전하게 라우팅·변환·관찰하는 cloud networking platform
    - 로컬호스트부터 프로덕션까지 Endpoints, Traffic Policy, Secure Tunnels 조합으로 URL 기반 라우팅과 인증·정책 처리를 구성할 수 있음
    - 경량 agent로 서비스를 연결해 방화벽 변경 없이 터널링하고, inbound port를 닫은 상태에서 mTLS 암호화 채널로 접근 표면을 줄이는 것을 강조

### Koyeb

- Docker 컨테이너 기반으로 글로벌 엣지 네트워크에 서버를 빠르게 자동 배포할 수 있는 서버리스 플랫폼
- GitHub 연동만으로 CI/CD가 쉽게 구성되며, 복잡한 인프라 설정 없이 상시 구동되는 백엔드 앱을 띄우기에 좋음.
- 무료 티어는 512MB RAM, 0.1 vCPU, 2GB SSD의 web service 1개와 active time 5시간/1GB storage 제한의 PostgreSQL DB 1개를 제공함.
- (2026 기준) Mistral AI 인수 이후 신규 가입자에게는 Starter(무료) 티어가 닫힌 것으로 알려짐. 기존 사용자만 무료 티어를 유지하며, 플랫폼 로드맵도 AI 추론/GPU 워크로드 쪽으로 이동함.
- 지금 새로 무료 Docker 호스팅을 찾는다면 Render, Northflank, Google Cloud Run 쪽을 먼저 보는 게 맞음.

### Fly.io

- 전 세계 엣지 로케이션에 마이크로 VM을 띄워 사용자에게 가장 가까운 곳에서 애플리케이션을 구동하는 데 특화되어 있음.
- 터미널(CLI) 중심의 제어와 Docker 환경을 지원하여, 개발자가 세밀하게 네트워크와 인프라 리소스를 다룰 수 있음
- 신규 사용자는 짧은 무료 trial이 있으나, 지속 사용에는 결제수단 등록이 필요하며 사용량 기반으로 과금됨.

### Render

- Vercel처럼 직관적인 웹 UI를 통해 복잡한 과정 없이 백엔드 애플리케이션과 관리형 데이터베이스를 쉽게 배포할 수 있는 PaaS
- 인프라 관리의 복잡성을 완전히 추상화하여, 별도의 데브옵스 세팅 없이도 안정적인 서비스 운영과 모니터링이 가능
- 무료 web service는 월 750 Free instance hours 한도와 15분 idle 후 spin down 제약이 있으며, 유료 인스턴스는 월 고정 요금제(최저 $7/월부터)를 사용함.

### Vercel

- Next.js, React 등 프론트엔드 프레임워크와 정적 웹사이트 배포에 최적화된 세계 최고 수준의 호스팅 서비스
- 코드 푸시와 동시에 글로벌 CDN 배포, 가벼운 서버리스 API 자동 생성, 프리뷰 링크 제공 등 압도적인 프론트엔드 개발자 경험(DX)을 제공
- 개인 프로젝트용 Hobby 무료 티어는 Edge Requests 1M/month, Fast Data Transfer 100GB/month 등 넉넉한 한도를 제공하며, 상업용이나 팀 단위로 넘어가면 1인당 월 $20의 Pro 플랜을 구독

### Netlify (Go 런타임 종료 예정 주의)

- Netlify Functions가 지원하는 언어는 TypeScript / JavaScript / **Go** 세 가지지만, Go만 유일하게 **Lambda 호환 모드**(`aws-lambda-go` 핸들러)로만 작성할 수 있음
- 그런데 이 Lambda 호환 모드가 deprecated 상태이며, 공식 문서에 **2027년 7월 1일부로 해당 모드의 함수를 포함한 배포는 거부된다**고 명시돼 있음
- 권장 이주 경로로 안내되는 `@netlify/aws-lambda-compat`은 npm 패키지(JS 전용)라서 **Go에는 이주 경로가 없음**. 즉 Netlify Functions + Go는 종료 시한이 박힌 스택
- Netlify Blobs(내장 KV/blob 저장소)도 JS SDK 전용이라 Go 함수에서는 사용 불가
- Netlify DB(Neon 기반 서버리스 Postgres, 2026년 4월 GA)는 **크레딧 기반 플랜 전용**. 구형 `Free (Legacy)` 플랜 팀은 쓸 수 없음. 이걸 쓰려고 신규 크레딧 기반 Free(월 300 크레딧 하드 캡)로 전환하면 같은 팀의 기존 정적 사이트들도 전부 같은 캡 아래로 들어가므로 주의
- 결론: Netlify는 정적 사이트 + 도메인/DNS + 프록시 rewrite 용도로 두고, 서버 프로세스는 Cloud Run 같은 곳에 두는 조합이 안전함

### Netlify 프록시 rewrite로 커스텀 도메인 붙이기

정적 호스팅을 Netlify에 두고 있으면, 서브도메인 하나를 다른 곳에 띄운 컨테이너로 넘길 수 있음.

```
# _redirects
/*  https://<app>-xxxxxxxx.asia-northeast3.run.app/:splat  200
```

- 상태 코드 `200`이 리다이렉트가 아니라 **rewrite(프록시)** 를 뜻함. 브라우저 주소창은 원래 도메인 그대로 유지됨
- DNS와 TLS 인증서는 기존처럼 Netlify가 관리하고, 백엔드는 Cloud Run / Northflank / Render 등 아무 데나 둘 수 있음
- Cloud Run에 커스텀 도메인을 직접 매핑하려면 도메인 매핑이나 로드밸런서 설정이 필요한데, 이 방식은 그 과정을 통째로 건너뜀
- 비용은 Netlify 무료 플랜의 대역폭(월 100GB)만 소비함

### Modal

- 복잡한 Docker 컨테이너나 CI/CD 설정 없이, Python 코드에 데코레이터만 달면 즉시 클라우드 자원을 할당받아 실행되는 AI 특화 서버리스 플랫폼
- 무거운 데이터 처리(배치) 작업이나 AI 모델 추론(Inference) 워크로드를 데브옵스 병목 없이 순식간에 스케일아웃
- Starter 플랜은 월 $30 무료 compute credit을 제공하며, 무료 크레딧 이후에는 코드가 실제 실행된 시간과 사용한 CPU/GPU/메모리 리소스 기준으로 초 단위 과금됨.

### Northflank

- 서비스, 잡(Job), 빌드 파이프라인, 관리형 DB(addon)를 한 화면에서 다루는 PaaS. Dockerfile 빌드와 외부 레지스트리 이미지 pull을 모두 지원
- BYOC(자체 클라우드 계정에 배포)도 가능해서, 무료로 시작했다가 규모가 커져도 같은 워크플로를 유지할 수 있음
- 무료 티어로 서비스 2개 + 잡 2개 + addon 1개를 제공. 상시 무료 PaaS 중에서는 한도가 후한 편

### Hugging Face Spaces

- Space의 SDK를 `docker`로 지정하면 임의의 Dockerfile을 그대로 구동할 수 있어, AI 데모가 아니어도 일반 웹 앱 호스팅에 쓸 수 있음
- CPU Basic(2 vCPU, 16GB RAM) 하드웨어가 상시 무료. 단 무료는 공개(public) Space 한정이고, 컨테이너는 7860 포트로 리슨하는 관례를 따름
- 장기간 요청이 없으면 sleep 상태로 내려가며, 영구 스토리지는 별도 유료 옵션

### Back4app Containers

- GitHub 저장소를 연결하면 Dockerfile을 빌드해 배포해주는 컨테이너 호스팅
- 무료 티어는 컨테이너 1개(256MB RAM 수준)로, 토이 프로젝트나 데모 용도에 적합

### Azure Container Apps

- Kubernetes/KEDA 기반의 관리형 컨테이너 서비스. scale-to-zero와 HTTP 스케일링을 지원해 Cloud Run과 성격이 비슷함
- 월 180,000 vCPU-초 + 400,000 GiB-초 + 2M requests의 무료 grant가 매달 부여됨
- Dapr, 리비전 기반 트래픽 분할 등 마이크로서비스 지향 기능이 강점

### AWS Lambda (컨테이너 이미지)

- 최대 10GB 크기의 OCI 이미지를 Lambda 함수로 배포할 수 있음
- 월 1M requests + 400,000 GB-초의 상시 무료 한도가 있어 소규모 트래픽이면 사실상 무료
- 다만 이미지가 Lambda Runtime Interface를 구현해야 하므로, 일반 웹 서버 이미지를 그대로 올릴 수는 없음(RIC/RIE 필요)

### Oracle Cloud Always Free + 셀프호스팅 PaaS

- ARM Ampere A1 기준 4 OCPU / 24GB RAM을 상시 무료로 제공. 무료 등급 중 스펙이 압도적임
- 이 VM에 Coolify나 Dokploy를 올리면 Heroku 유사 경험(깃 푸시 배포, 도메인/TLS 자동화)을 비용 없이 구성 가능
- 리전에 따라 무료 ARM 인스턴스 재고 확보가 어려울 수 있고, 유휴 자원 회수 정책에도 주의해야 함

### Cloudflare Containers

- Workers/Durable Objects와 같은 런타임에서 컨테이너를 띄우는 방식으로, Worker가 컨테이너 인스턴스의 라이프사이클을 제어함
- 무료 플랜에서는 사용할 수 없고 Workers Paid($5/month) 이상이 필요. Worker 자체는 무료 플랜으로도 충분하다는 점과 구분해야 함

### 무료 티어가 사라진 곳 (자주 오해하는 것들)

- **Heroku**: 2022년 11월 무료 dyno 종료. 현재는 전면 유료
- **Railway**: $5 일회성 trial 크레딧 이후 사용량 기반 과금. 상시 무료 아님
- **Fly.io**: 신규 조직 대상 무료 할당(free allowance) 폐지. 결제수단 등록 + 사용량 과금
- **Koyeb**: 신규 가입자에게 무료 티어 미제공(위 Koyeb 항목 참고)

## 무료 티어 비교

| 서비스 | 무료 시작 시 신용카드/결제수단 | 무료 쿼터 / 무료 한도 | 비고 |
| --- | --- | --- | --- |
| [Coolify](https://coolify.io/pricing) | 불필요 | Self-hosted는 무료 forever | Coolify 자체는 오픈소스/셀프호스팅 도구라 무료지만, 실행할 서버 비용은 별도. Coolify Cloud는 유료 플랜 중심. |
| [DigitalOcean App Platform](https://www.digitalocean.com/pricing/app-platform) | 대체로 필요 | Static site 앱 3개 무료, 앱당 1GiB 전송량 | 무료는 정적 사이트 중심. 웹 서비스, 워커, 잡은 유료 컨테이너 요금이 시작됨. |
| [Google Cloud Run](https://cloud.google.com/run/pricing) | 필요 | 월 2M requests, 360,000 GiB-seconds memory, 180,000 vCPU-seconds, 북미 outbound 1GiB | Google Cloud 무료 체험/Free Tier 사용에 유효한 결제수단이 필요. 신규 계정은 별도 무료 체험 크레딧도 제공. |
| [ngrok](https://ngrok.com/pricing) | HTTP는 불필요, TCP 등 일부 기능은 카드 검증 필요 | Free: $5 one-time usage credit, 최대 3 online endpoints, 1GB data transfer, 20k HTTP/S requests | Free plan에서도 TCP endpoints는 카드 검증이 언급됨. |
| [Koyeb](https://www.koyeb.com/docs/faqs/pricing) | 필요 | 조직당 무료 web service 1개(512MB RAM, 0.1 vCPU, 2GB SSD), 무료 PostgreSQL 1개(active 5h, 1GB storage), outbound bandwidth 100GB/month 제공 중 | 공식 FAQ에 카드 요구와 $29 pre-authorization hold가 명시됨. |
| [Fly.io](https://fly.io/docs/about/free-trial/) | 초기 trial은 불필요, 정상 사용 지속은 필요 | Free trial: 2 total VM hours 또는 7일 중 먼저 도달하는 것 | pricing 문서에는 모든 조직에 credit card on file이 필요하다고 되어 있음. |
| [Render](https://render.com/docs/free) | 무료 플랜은 대체로 불필요 | Free web service: 512MB RAM, 0.1 CPU, workspace당 월 750 Free instance hours, 15분 idle 후 spin down. Free Postgres는 30일 제한 | 무료 web service, static site, 일부 datastore 가능. production 용도는 비추천. |
| [Vercel](https://vercel.com/pricing) | Hobby 무료는 대체로 불필요 | Hobby: Edge Requests 1M/month, Fast Data Transfer 100GB/month, Functions 1M invocations/month, Active CPU 4 CPU-hours, Provisioned Memory 360 GB-hours | Hobby는 개인/비상업 용도 제약에 주의. Pro는 사용자당 월 $20 및 사용량 기반 과금. |
| [Modal](https://modal.com/pricing) | 공식 가격 페이지상 카드 필수 문구는 확인 못함 | Starter: $30/month free credits, 3 workspace seats, 100 containers + 10 GPU concurrency, 제한된 Scheduled/Web Functions | 무료 크레딧 이후 사용량 기반 과금. |
| [Northflank](https://northflank.com/pricing) | 불필요 | Free: 서비스 2개 + 잡 2개 + addon 1개 | Dockerfile 빌드와 이미지 pull 모두 지원. 상시 무료 중 한도가 넉넉한 편. |
| [Hugging Face Spaces](https://huggingface.co/pricing) | 불필요 | CPU Basic(2 vCPU, 16GB RAM) 무료, 공개 Space 한정 | SDK를 docker로 지정하면 임의 Dockerfile 구동. 유휴 시 sleep, 영구 스토리지는 유료. |
| [Back4app Containers](https://www.back4app.com/pricing) | 불필요 | 무료 컨테이너 1개(256MB 수준) | GitHub 연동 Docker 빌드/배포. 데모·토이 프로젝트용. |
| [Azure Container Apps](https://azure.microsoft.com/pricing/details/container-apps/) | 필요 | 월 180,000 vCPU-seconds, 400,000 GiB-seconds, 2M requests 무료 grant | scale-to-zero 지원. Cloud Run과 성격이 유사. |
| [AWS Lambda](https://aws.amazon.com/lambda/pricing/) | 필요 | 월 1M requests, 400,000 GB-seconds 상시 무료 | 컨테이너 이미지 배포 가능하나 Lambda Runtime Interface 구현 필요. |
| [Oracle Cloud Always Free](https://www.oracle.com/cloud/free/) | 필요(검증용) | ARM Ampere A1 4 OCPU / 24GB RAM, Block Storage 200GB 상시 무료 | PaaS는 아니지만 Coolify/Dokploy를 올리면 사실상 무료 PaaS. 리전별 재고 이슈 있음. |
| [Cloudflare Containers](https://developers.cloudflare.com/containers/pricing/) | 필요 | 무료 티어 없음 | Workers Paid($5/month) 이상 필요. Worker 자체 무료 플랜과 혼동 주의. |
| [Railway](https://railway.com/pricing) | 필요 | $5 one-time trial credit | 상시 무료 아님. 소진 후 사용량 과금. |
| [Heroku](https://www.heroku.com/pricing) | 필요 | 없음 | 2022년 11월 무료 dyno 종료. |

## Docker 이미지 무료 배포 선택 가이드

- **트래픽이 적은 API/웹앱** → Google Cloud Run. OCI 이미지를 그대로 올릴 수 있고 scale-to-zero + 빠른 콜드스타트. 개인 프로젝트 규모면 무료 쿼터 안에서 끝나는 경우가 많음
- **카드 등록 없이 바로 시작** → Render 또는 Northflank. Render는 15분 유휴 후 spin down(콜드스타트 30초~1분)이 있고, Northflank는 서비스 2개까지 무료
- **콜드스타트 없이 상시 대기 + 넉넉한 스펙** → Oracle Cloud Always Free VM + Coolify/Dokploy
- **AI 데모/사이드 프로젝트로 공개해도 무방** → Hugging Face Spaces (docker SDK)
- 무료 티어 조건은 자주 바뀌므로(2026년만 해도 Koyeb·Fly.io가 변경됨) 가입 직전에 각 사 pricing 페이지를 재확인할 것


## 서버리스/스케일-투-제로 앱용 무료 DB

컨테이너가 0으로 줄었다가 요청마다 다시 뜨는 환경(Cloud Run, Lambda 등)에서는 DB 선택 기준이 달라짐.
**커넥션 풀을 유지할 수 없다**는 게 핵심 제약이라, 요청 단위 HTTP로 붙는 DB가 유리함.

| | Turso (libSQL) | Neon | Northflank addon | Back4app (BaaS) | Supabase |
| --- | --- | --- | --- | --- | --- |
| 정체 | 관리형 SQLite | 서버리스 Postgres | DB 컨테이너 (Postgres/MySQL/Mongo/Redis) | Parse + MongoDB | Postgres + PostgREST |
| 접속 | **HTTPS 요청 단위** | TCP (pooler 경유) | TCP | REST / GraphQL만 | TCP + REST |
| 무료 한도 | DB 100개 / 5GB / 월 5억 row read / 1천만 write | 0.5GB / 월 100 CU-h / 프로젝트 100개 | 무료 addon 1개 | 월 25,000 요청 / 250MB / 파일 1GB | 500MB |
| 유휴 시 | 영향 없음 | 5분 후 scale-to-zero, 재개 시 지연 | 상시 가동 | - | **1주일 유휴 시 프로젝트 정지** |
| 콜드스타트 궁합 | 최상 (맺을 커넥션이 없음) | 보통 (TCP+TLS 핸드셰이크 + 컴퓨트 재개) | 무관 (상시 가동) | 보통 | 나쁨 (정지 이슈) |
| Go 궁합 | `libsql-client-go` — **순수 Go, CGO 불필요** | pgx | 표준 드라이버 | **Go SDK 없음**, HTTP 직접 호출 | pgx |

- **Turso**: SQLite 파일 한 개 수준의 데이터를 다루는 개인 프로젝트에는 사실상 최적. 로컬 개발은 SQLite 파일(`modernc.org/sqlite`), 배포는 Turso로 같은 `database/sql` 코드가 그대로 돌아감. 벤더 종속도 낮음 — 결국 SQLite라서 어디로 옮겨도 따라옴
  - `libsql://` 스킴은 웹소켓으로 붙으므로, 서버리스에서는 `https://` 로 바꿔 요청 단위 HTTP로 쓰는 편이 나음
  - Turso가 권하는 `go-libsql`은 CGO가 필요해서 정적 바이너리 / distroless 이미지와 궁합이 나쁨. 순수 Go인 `libsql-client-go` 쪽을 쓸 것
- **Northflank addon**: DB가 상시 가동이라 콜드스타트 개념 자체가 없음. 다만 무료 슬롯이 1개뿐이고, 무료 addon의 vCPU/RAM/스토리지 스펙은 가격 페이지에 공개돼 있지 않아 계정에서 직접 확인해야 함. 서비스 2개도 같이 무료라 **앱과 DB를 한 벤더에서 끝낼 수 있다**는 게 진짜 장점 (Cloud Run + 외부 DB 조합 자체의 대안)
- **Back4app**: 컨테이너 호스팅과 BaaS는 별개 상품임에 주의. BaaS 무료는 월 25,000 요청 = 하루 830건이라 개인용으로는 아슬아슬하고, Go SDK가 없어서 Parse 객체 모델에 맞춰 REST를 직접 짜야 함. 테이블 하나짜리 앱에는 과한 종속
- **Supabase**: 무료 플랜이 1주일 유휴 시 프로젝트를 정지시키므로, 가끔 들어가는 개인 앱에는 부적합

## Related
- [[aws]]
- [[db]]
- [[continous-deployments]]
- [[docker]]
- [[golang]]
- [[k8s]]
- [[paas]]
- [[server-automation]]
