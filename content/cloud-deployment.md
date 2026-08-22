클라우드에 애플리케이션과 데이터베이스를 올릴 곳을 정리한 노트.

무료 티어 조건은 자주 바뀐다. 2026년만 해도 Koyeb이 신규 가입자에게 무료 티어를 닫았고,
Fly.io가 무료 할당을 폐지했으며, Netlify가 크레딧 기반 플랜으로 개편했다.
**가입 직전에 각 사 pricing 페이지를 다시 확인할 것.** 특히 "카드 불필요" 여부는
3자 정리 글이 틀린 경우가 많아 실제로 리소스를 만들어 봐야 안다.

## Application

컨테이너나 앱 프로세스를 띄우는 곳.

### 무료 티어 비교

| 서비스 | 무료 시작 시 카드 | 무료 쿼터 / 한도 | 비고 |
| --- | --- | --- | --- |
| [Back4app Containers](https://www.back4app.com/pricing/container-as-a-service) | 불필요 | 컨테이너 1개, 256MB RAM / 0.25 CPU | GitHub 연동 Dockerfile 빌드(Kaniko). 커스텀 도메인은 유료. **무료 임시 URL이 만료되면 삭제됨**. 상시 운영 불가 |
| [Render](https://render.com/docs/free) | 대체로 불필요 | Free web service: 512MB RAM, 0.1 CPU, workspace당 월 750시간, 15분 idle 후 spin down | 복귀에 30초~1분. Free Postgres는 30일 제한 |
| [Hugging Face Spaces](https://huggingface.co/pricing) | 불필요 | CPU Basic(2 vCPU, 16GB RAM), 공개 Space 한정 | SDK를 docker로 지정하면 임의 Dockerfile 구동. 유휴 시 sleep, 영구 스토리지는 유료 |
| [Cloudflare Workers / Pages](https://developers.cloudflare.com/workers/platform/pricing/) | 불필요 | 요청 10만/일, 호출당 CPU 10ms, 정적 자산 요청은 무제한 무료 | 컨테이너가 아니라 V8 아이솔레이트. 콜드스타트·유휴 정지가 없다. 대신 번들 3MB(gzip), 메모리 128MB, 커넥션 풀 불가 |
| [Google Cloud Run](https://cloud.google.com/run/pricing) | **필요** | 월 2M requests, 360,000 GiB-초, 180,000 vCPU-초 | 무료 한도만 써도 **열려 있는 결제 계정 연결이 필수**. 서울 리전(asia-northeast3) 있음 |
| [Northflank](https://northflank.com/pricing) | **필요(검증용)** | 프로젝트 1개, 서비스 2개 + 잡 2개 + addon 1개 | 리소스 생성 시 카드 등록 요구. 무료 리전은 us-central·europe-west 뿐 |
| [Azure Container Apps](https://azure.microsoft.com/pricing/details/container-apps/) | 필요 | 월 180,000 vCPU-초, 400,000 GiB-초, 2M requests | scale-to-zero 지원. Cloud Run과 성격 유사 |
| [AWS Lambda](https://aws.amazon.com/lambda/pricing/) | 필요 | 월 1M requests, 400,000 GB-초 | 컨테이너 이미지 배포 가능하나 Lambda Runtime Interface 구현 필요 |
| [Oracle Cloud Always Free](https://www.oracle.com/cloud/free/) | 필요(검증용) | ARM Ampere A1 4 OCPU / 24GB RAM, Block Storage 200GB | PaaS는 아니지만 Coolify/Dokploy를 올리면 사실상 무료 PaaS. 리전별 재고 이슈 |
| [Vercel](https://vercel.com/pricing) | Hobby는 대체로 불필요 | Edge Requests 1M/월, Fast Data Transfer 100GB/월, Functions 1M invocations/월 | Hobby는 개인/비상업 용도 제약. 프론트엔드 특화 |
| [Netlify](https://www.netlify.com/pricing/) | 불필요 | Free(Legacy): 빌드 300분, 대역폭 100GB, Edge Function 1M invocations | 정적 호스팅·DNS·프록시 rewrite 용도로는 최상. **Go 함수는 2027-07-01 종료 예정** |
| [DigitalOcean App Platform](https://www.digitalocean.com/pricing/app-platform) | 대체로 필요 | Static site 앱 3개, 앱당 1GiB 전송량 | 무료는 정적 사이트 중심. 웹 서비스·워커·잡은 유료 |
| [Modal](https://modal.com/pricing) | 확인 못함 | Starter: 월 $30 무료 크레딧 | 크레딧 소진 후 사용량 과금. AI 워크로드 특화 |
| [ngrok](https://ngrok.com/pricing) | HTTP는 불필요 | $5 one-time credit, 최대 3 endpoints, 1GB transfer, 20k requests | 배포가 아니라 터널. TCP endpoint는 카드 검증 필요 |
| [Coolify](https://coolify.io/pricing) | 불필요 | Self-hosted는 무료 forever | 도구 자체는 무료, 실행할 서버 비용은 별도. Coolify Cloud는 유료 |
| [Cloudflare Containers](https://developers.cloudflare.com/containers/pricing/) | 필요 | **무료 티어 없음** | Workers Paid($5/월) 필수. 그 안에 메모리 25 GiB-시 / CPU 375 vCPU-분 / 디스크 200 GB-시 포함. Worker 자체 무료 플랜과 혼동 주의 |
| [Railway](https://railway.com/pricing) | 필요 | $5 one-time trial credit | 상시 무료 아님 |
| [Fly.io](https://fly.io/docs/about/free-trial/) | 필요 | Free trial: VM 2시간 또는 7일 | 신규 조직 대상 무료 할당 폐지 |
| [Koyeb](https://www.koyeb.com/docs/faqs/pricing) | 필요 | 기존 사용자만 유지 | 신규 가입자에게 무료 티어 미제공 |
| [Heroku](https://www.heroku.com/pricing) | 필요 | 없음 | 2022년 11월 무료 dyno 종료 |

### 선택 가이드

- **카드 등록 없이 상시 가동되는 웹앱** → **컨테이너를 그대로 올리는 방식으로는 없다.**
  Back4app Containers가 유일한 후보였지만 무료 플랜은 임시 URL이 만료되면서 배포가 통째로
  파괴된다(아래 절). 카드 없이 컨테이너를 고집하면 유휴 시 잠드는 Render / Hugging Face Spaces
  를 감수하는 수밖에 없다
- **런타임 제약을 받아들일 수 있다면** → Cloudflare Workers. 이 표에서 카드 없이 콜드스타트도
  유휴 정지도 없는 유일한 항목이다. 대신 임의의 Docker 이미지가 아니라 V8 아이솔레이트 위에서
  돌아야 하고, 호출당 CPU 10ms 안에 끝나야 한다
- **카드 없이 잠깐 띄워 보여주는 데모** → Back4app Containers. 256MB/0.25 CPU 컨테이너 1개.
  커스텀 도메인이 유료지만 [Netlify 프록시 rewrite](#netlify-프록시-rewrite로-커스텀-도메인-붙이기)로 우회 가능
- **결제 계정이 있고 지연이 중요** → Google Cloud Run. 서울 리전을 쓸 수 있어 국내에서 가장 빠르다
- **카드 없이 시작하되 유휴 시 잠들어도 무방** → Render. 15분 후 spin down, 복귀에 30초~1분
- **콜드스타트 없이 넉넉한 스펙** → Oracle Cloud Always Free VM + Coolify/Dokploy
- **공개해도 무방한 데모** → Hugging Face Spaces (docker SDK)
- **Go로 짠 서버** → Netlify Functions는 피할 것. 아래 Netlify 항목 참고

### Google Cloud Run

- OCI 이미지를 그대로 올려 scale-to-zero로 돌리는 서버리스 컨테이너. `gcloud run deploy --source .` 하나로 Cloud Build를 거쳐 Dockerfile 빌드부터 배포까지 끝남
- 월 2M requests / 360,000 GiB-초 / 180,000 vCPU-초가 상시 무료. 개인 프로젝트 규모면 대개 무료 한도 안에서 끝난다
- `asia-northeast3`(서울) 리전이 있어 국내 사용자 기준 지연이 가장 짧다
- **무료 한도만 쓰더라도 열려 있는 결제 계정 연결이 필수.** 결제 계정이 닫힌 상태면
  `billingEnabled: False` 로 API 활성화조차 되지 않는다 (2026-08 직접 확인)
- **`gcloud run deploy --source .` 첫 배포가 `PERMISSION_DENIED` 로 죽는다.** Google이 기본
  컴퓨트 서비스 계정의 빌드 권한을 걷어낸 뒤 새 프로젝트에서 나는 증상이다. 해결:

  ```
  gcloud projects add-iam-policy-binding <project> \
    --member=serviceAccount:<projectNumber>-compute@developer.gserviceaccount.com \
    --role=roles/cloudbuild.builds.builder
  ```

- **Google Frontend 가 정확히 `/healthz` 경로를 가로챈다.** 컨테이너까지 도달하지 않고
  Google 브랜드 404 페이지가 돌아온다. `/healthz/`(슬래시 포함), `/health`, `/readyz` 는
  그대로 통과하므로, 헬스 경로를 `/healthz` 로만 열어두면 모니터링이 조용히 실패한다

### Back4app Containers

- GitHub 저장소를 연결하면 **Kaniko**로 Dockerfile을 빌드해 배포한다. 멀티스테이지 빌드도 그대로 동작
- 무료 티어는 컨테이너 1개, **256MB RAM / 0.25 CPU**, 공식 가격 페이지에 "no credit card required" 명시
- 커스텀 도메인은 **유료 전용**(`Custom domains are only available on paid plans`). 무료로는 `<app>-<hash>.b4a.run` 서브도메인만
- 대시보드에 "Temporary URL Active — URL is temporary and will be live for 60 minutes" 안내가 뜨는데
  공식 문서에 설명이 없다. 안내대로 **만료되고, 만료되면 URL만 죽는 게 아니라 배포가 통째로 파괴된다.**
  2026-08-22 배포 로그로 확인:

  ```
  2026-08-21T23:59:20Z  SYSTEM  DEPLOYMENT READY
  2026-08-22T00:27:12Z  SYSTEM  The Back4app custom domain has expired for free plan
  2026-08-22T00:27:12Z  SYSTEM  COOLING DOWN...
  2026-08-22T00:28:12Z  SYSTEM  FINISHING CONTAINER...
  2026-08-22T00:28:12Z  SYSTEM  DEPLOYMENT DESTROYED
  ```

- **만료 시점은 재현되지 않았다.** 위 사례는 READY 후 약 28분이고, 다른 때는 65분 이상 살아 있었다.
  안내문의 60분은 보장이 아니라 상한에 가깝고 그보다 일찍 회수될 수 있다고 보는 편이 안전하다
- **밖에서는 진단이 안 된다.** 만료된 `<app>-<hash>.b4a.run` 은 존재한 적 없는 서브도메인과
  **헤더까지 똑같은** 응답을 준다 — CloudFront가 `404 not found`. 컨테이너 크래시(502/503)와 구별되지
  않아서 앱이 죽은 건지 주소가 회수된 건지 알 수 없다. 대시보드 배포 로그를 봐야 한다
- **재배포하면 접미사가 바뀐다.** `til-nsh62xv6` → `til-xu9uffq7`. Redeploy App 을 누르면 다시 살아나고
  60분 안내가 새로 붙지만, 프록시나 북마크에 적어둔 주소는 매번 갱신해야 한다
- 실측(한국 → Back4app): `GET /` 210~480ms, 유휴 후에도 콜드스타트가 관측되지 않음 (URL이 살아 있는 동안)
- 컨테이너 stdout이 대시보드 Logs에 그대로 보여서 기동 실패 진단이 쉽다
- BaaS(Parse) 상품과는 **별개 상품**이다. 아래 Cloud DB 절의 Back4app 항목과 혼동하지 말 것

### Render

- Vercel처럼 직관적인 웹 UI로 백엔드 애플리케이션과 관리형 DB를 배포하는 PaaS
- 인프라 관리를 완전히 추상화해서 별도 데브옵스 세팅 없이 운영·모니터링이 가능
- 무료 web service는 월 750시간 한도와 **15분 idle 후 spin down** 제약이 있고, 복귀에 약 1분 걸린다.
  하루에 몇 번 들어가는 개인 앱이면 거의 매번 그 1분을 기다리게 된다
- 유료 인스턴스는 월 고정 요금제(최저 $7/월부터)

### Northflank

- 서비스, 잡(Job), 빌드 파이프라인, 관리형 DB(addon)를 한 화면에서 다루는 PaaS. Dockerfile 빌드와 외부 레지스트리 이미지 pull을 모두 지원
- BYOC(자체 클라우드 계정에 배포)도 가능해서, 무료로 시작했다가 규모가 커져도 같은 워크플로를 유지할 수 있음
- 컨테이너가 잠들지 않아 콜드스타트가 없다는 점은 무료 PaaS 중 드문 장점
- **주의: 무료 프로젝트를 만들려 해도 결제수단 등록을 먼저 요구함.**
  "You will not be charged for any usage while on the Developer Sandbox" 라고 안내하지만
  카드 없이는 리소스를 하나도 만들 수 없다. 여러 무료 티어 정리 글이 "카드 불필요"로
  적어두고 있어 오해하기 쉽다 (2026-08 직접 확인)
- 무료 프로젝트는 **1개**만, 그 안에 서비스 2개까지. 무료 컴퓨트 플랜은 `nf-compute-10`(0.1 vCPU shared, 256MB)
- 무료 리전은 **us-central(Council Bluffs)** 과 **europe-west(London)** 뿐.
  asia-southeast(싱가포르) 등은 유료 전환 필요 — 아시아에서 쓰기엔 지연이 크다

### Hugging Face Spaces

- Space의 SDK를 `docker`로 지정하면 임의의 Dockerfile을 그대로 구동할 수 있어, AI 데모가 아니어도 일반 웹 앱 호스팅에 쓸 수 있음
- CPU Basic(2 vCPU, 16GB RAM) 하드웨어가 상시 무료. 단 무료는 공개(public) Space 한정이고, 컨테이너는 7860 포트로 리슨하는 관례를 따름
- 장기간 요청이 없으면 sleep 상태로 내려가며, 영구 스토리지는 별도 유료 옵션

### Netlify

정적 사이트 호스팅과 DNS·TLS·프록시 용도로는 무료 플랜이 여전히 훌륭하다. 다만 서버 런타임으로 쓸 때 제약이 크다.

- Netlify Functions가 지원하는 언어는 TypeScript / JavaScript / **Go** 세 가지지만, Go만 유일하게 **Lambda 호환 모드**(`aws-lambda-go` 핸들러)로만 작성할 수 있음
- 그런데 이 Lambda 호환 모드가 deprecated 상태이며, 공식 문서에 **2027년 7월 1일부로 해당 모드의 함수를 포함한 배포는 거부된다**고 명시돼 있음
- 권장 이주 경로로 안내되는 `@netlify/aws-lambda-compat`은 npm 패키지(JS 전용)라서 **Go에는 이주 경로가 없음**. 즉 Netlify Functions + Go는 종료 시한이 박힌 스택
- Netlify Blobs(내장 KV/blob 저장소)도 JS SDK 전용이라 Go 함수에서는 사용 불가
- 결론: Netlify는 **정적 사이트 + 도메인/DNS + 프록시 rewrite** 용도로 두고, 서버 프로세스는 다른 곳에 두는 조합이 안전함

### Vercel

- Next.js, React 등 프론트엔드 프레임워크와 정적 웹사이트 배포에 최적화된 호스팅 서비스
- 코드 푸시와 동시에 글로벌 CDN 배포, 가벼운 서버리스 API 자동 생성, 프리뷰 링크 제공 등 프론트엔드 개발자 경험(DX)이 강점
- 개인 프로젝트용 Hobby 무료 티어는 Edge Requests 1M/월, Fast Data Transfer 100GB/월 등 넉넉하지만, 상업용이나 팀 단위는 1인당 월 $20의 Pro 플랜

### Modal

- 복잡한 Docker 컨테이너나 CI/CD 설정 없이, Python 코드에 데코레이터만 달면 즉시 클라우드 자원을 할당받아 실행되는 AI 특화 서버리스 플랫폼
- 무거운 데이터 처리(배치)나 AI 모델 추론 워크로드를 데브옵스 병목 없이 스케일아웃
- Starter 플랜은 월 $30 무료 compute credit. 이후에는 실제 실행 시간과 사용 리소스 기준 초 단위 과금

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
- 이 VM에 [Coolify](https://github.com/coollabsio/coolify)나 [Dokploy](https://github.com/Dokploy/dokploy)를 올리면
  Heroku 유사 경험(깃 푸시 배포, 도메인/TLS 자동화)을 비용 없이 구성 가능
- 리전에 따라 무료 ARM 인스턴스 재고 확보가 어려울 수 있고, 유휴 자원 회수 정책에도 주의해야 함

### Cloudflare Workers / Pages

이 표의 다른 항목들과 층위가 다르다. VM도 컨테이너도 아니고 **V8 아이솔레이트**에 코드를 얹는 방식이라
뜨고 지는 개념이 없다. 콜드스타트도 유휴 정지도 없는 대신 런타임이 좁다.

- 무료: **요청 10만 건/일**, 호출당 **CPU 시간 10ms**. 카드 불필요.
  실행 시간이 아니라 CPU 시간이라 외부 API 응답을 기다리는 시간은 세지 않는다 — 이 차이가 크다
- **정적 자산 요청은 과금되지 않는다.** 문서 표현 그대로 "Requests to static assets are free and unlimited".
  CSS·JS·이미지가 요청 수에서 빠지므로 10만/일은 실제로 훨씬 여유 있다
- 유료 Workers Paid $5/월: 요청 1,000만/월 + CPU 3,000만 ms/월, 호출당 CPU 상한 30초(최대 5분)

한도 (2026-08 기준):

| | Free | Paid |
| --- | --- | --- |
| 번들 크기 (gzip 후) | 3MB | 10MB |
| 아이솔레이트 메모리 | 128MB | 128MB |
| 기동 시간 (전역 스코프 실행) | 1초 | 1초 |
| 호출당 subrequest | 50 | 10,000 |

**HTML을 직접 응답할 수 있다 — 즉 서버 사이드 렌더링이 된다.** `fetch` 핸들러가 `Response`를
돌려주는 게 전부라, body에 HTML 문자열을 넣고 `content-type: text/html` 만 붙이면 브라우저가
페이지로 렌더링한다. JSON을 주느냐 HTML을 주느냐는 헤더 차이일 뿐이다. DB에서 읽어 HTML을
조립해 반환하는 구성이 그대로 성립한다(아래 chain.benelog.net 사례).
문자열 조합이 가장 가볍고, React `renderToReadableStream` 같은 스트리밍 SSR도 Web Streams가 있어 돌아간다.

**지원 언어가 JS만은 아니다.** V8이 WebAssembly도 실행하기 때문이다.

- **JavaScript / TypeScript** — TS는 wrangler가 esbuild로 JS로 바꿔 올리는 것뿐이다. 런타임은 JS만 안다
- **Rust** — `workers-rs` 크레이트로 1급 지원. WASM으로 컴파일되며 KV·D1 등 바인딩까지 Rust 타입으로 감싸져 있다
- **Python** — **오픈 베타.** `python_workers` 호환성 플래그가 필요하고 FastAPI·Pydantic·Langchain 등
  일부 패키지가 제공된다. 베타 상태라 도입 전 현재 문서를 다시 볼 것
- **C / C++ / Go / Kotlin 등** — WASM으로 컴파일해서 얇은 JS 진입점이 호출하는 형태. 공식 문서가 인정하는 경로다
- **Go 주의**: 표준 툴체인의 `GOOS=js GOARCH=wasm` 은 GC 런타임이 통째로 들어가 무료 한도인
  gzip 3MB에 금방 부딪힌다. TinyGo가 현실적인 선택

**제약 — 채택 여부를 가르는 것들.**

- Node.js API가 기본으로 없다(`nodejs_compat` 플래그로 일부만). `fs`로 템플릿 파일을 읽는 식은
  불가능하고 모든 자산이 번들에 문자열로 들어가야 한다
- **요청 간 커넥션 풀을 유지할 수 없다.** 아래 Cloud DB 절의 제약과 정확히 같다 — 요청 단위 HTTP로
  붙는 DB(Turso, DoltHub REST)와 궁합이 좋고, TCP 드라이버 기반 Postgres/MySQL은 Hyperdrive 같은
  중계를 거치는 게 현실적이다
- 문자열 SSR이면 **이스케이프를 직접 챙겨야 한다.** DB 값을 템플릿에 그대로 끼우면 XSS가 열린다
- **커스텀 도메인에 Cloudflare 존이 필요하다.** Workers 커스텀 도메인은 그 도메인이 Cloudflare DNS에
  올라와 있어야 붙는다. DNS를 다른 곳(Netlify 등)에 두고 있으면 **Cloudflare Pages** 를 쓰면 된다 —
  Pages는 외부 서브도메인에 CNAME 하나로 붙는다

### Cloudflare Containers

- Workers/Durable Objects와 같은 런타임에서 컨테이너를 띄우는 방식으로, Worker가 컨테이너 인스턴스의 라이프사이클을 제어함
- **무료 티어가 없다.** Workers Paid($5/월) 이상이 필요하고, Worker 자체는 무료 플랜으로도 충분하다는 점과 반드시 구분해야 한다
- $5 플랜에 매달 포함되는 양 (2026-08 기준): 메모리 **25 GiB-시**, CPU **375 vCPU-분**, 디스크 **200 GB-시**.
  초과분은 메모리 $0.0000025/GiB-초, CPU $0.000020/vCPU-초, 디스크 $0.00000007/GB-초
- **실제로 돌아가는 10ms 단위로 과금된다.** 유휴 시 잠들므로 성격이 상시 가동이 아니다
- 인스턴스 타입: `lite`(1/16 vCPU, 256MiB) / `basic`(1/4 vCPU, 1GiB) / `standard-1`~`standard-4`(최대 4 vCPU, 12GiB)
- **포함량은 생각보다 작다.** 가장 작은 `lite` 기준으로 메모리(25 GiB-시 ÷ 0.25 GiB)와
  CPU(375 vCPU-분 ÷ 1/16 vCPU)가 **똑같이 월 100시간**에서 소진된다. 하루 3시간 남짓이다.
  상시 웹 서버용이 아니라 Worker가 필요할 때만 부르는 무거운 작업(브라우저 자동화, 빌드, 미디어 변환)에 맞는 물건
- 이그레스는 리전별로 다르고 **한국은 $0.05/GB 로 북미·유럽($0.025/GB)의 두 배**다.
  무료 포함량은 북미·유럽 1TB, 그 외 500GB
- 임의의 언어·이미지를 돌리려면 이게 Cloudflare 스택에서 유일한 탈출구다. 다만 Worker가 아니라
  **Worker가 앞단에서 호출하는 별개 실행 환경**이라 지연·과금 특성이 완전히 다르다

### DigitalOcean App Platform

- GitHub 연동으로 앱을 배포하는 PaaS. 무료는 정적 사이트 앱 3개(앱당 1GiB 전송량) 중심
- 웹 서비스, 워커, 잡은 유료 컨테이너 요금이 바로 시작됨

### ngrok — 배포가 아니라 터널

- 어디서 실행 중이든 서비스로 들어오는 트래픽을 안전하게 라우팅·변환·관찰하는 cloud networking platform
- 로컬호스트부터 프로덕션까지 Endpoints, Traffic Policy, Secure Tunnels 조합으로 URL 기반 라우팅과 인증·정책 처리를 구성할 수 있음
- 경량 agent로 서비스를 연결해 방화벽 변경 없이 터널링하고, inbound port를 닫은 상태에서 mTLS 암호화 채널로 접근 표면을 줄이는 것을 강조
- 호스팅이 아니라 이미 돌아가는 프로세스를 노출하는 도구라 위 항목들과 층위가 다름

### Koyeb

- Docker 컨테이너 기반으로 글로벌 엣지 네트워크에 서버를 빠르게 자동 배포할 수 있는 서버리스 플랫폼
- GitHub 연동만으로 CI/CD가 쉽게 구성되며, 복잡한 인프라 설정 없이 상시 구동되는 백엔드 앱을 띄우기에 좋음
- 무료 티어는 512MB RAM, 0.1 vCPU, 2GB SSD의 web service 1개와 active time 5시간 / 1GB storage 제한의 PostgreSQL DB 1개
- (2026 기준) Mistral AI 인수 이후 **신규 가입자에게는 Starter(무료) 티어가 닫힘.** 기존 사용자만 무료 티어를 유지하며,
  플랫폼 로드맵도 AI 추론/GPU 워크로드 쪽으로 이동함

### Fly.io

- 전 세계 엣지 로케이션에 마이크로 VM을 띄워 사용자에게 가장 가까운 곳에서 애플리케이션을 구동하는 데 특화됨
- 터미널(CLI) 중심의 제어와 Docker 환경을 지원하여, 개발자가 세밀하게 네트워크와 인프라 리소스를 다룰 수 있음
- 신규 사용자는 짧은 무료 trial(VM 2시간 또는 7일 중 먼저 도달)이 있으나,
  지속 사용에는 결제수단 등록이 필요하며 사용량 기반으로 과금됨

### 무료 티어가 사라진 곳 (자주 오해하는 것들)

- **Heroku**: 2022년 11월 무료 dyno 종료. 현재는 전면 유료
- **Railway**: $5 일회성 trial 크레딧 이후 사용량 기반 과금. 상시 무료 아님
- **Fly.io**: 신규 조직 대상 무료 할당(free allowance) 폐지. 결제수단 등록 + 사용량 과금.
  엣지 로케이션 마이크로 VM과 CLI 중심 제어라는 강점 자체는 그대로
- **Koyeb**: Mistral AI 인수 이후 신규 가입자에게 Starter(무료) 티어가 닫힘. 기존 사용자만 유지하며
  로드맵도 AI 추론/GPU 워크로드 쪽으로 이동
- **Northflank**: 무료 티어는 남아 있지만 카드 등록이 필수라 "카드 없이 시작" 조건에는 해당하지 않음
- **Cloudflare Containers**: 처음부터 무료 티어가 없음

## Cloud DB

컨테이너가 0으로 줄었다가 요청마다 다시 뜨는 환경(Cloud Run, Lambda, 무료 PaaS)에서는
DB 선택 기준이 달라진다. **커넥션 풀을 유지할 수 없다**는 게 핵심 제약이라,
요청 단위 HTTP로 붙는 DB가 유리하다.

### 무료 티어 비교

| | [Turso](https://turso.tech/pricing) | [Neon](https://neon.com/docs/introduction/plans) | [Supabase](https://supabase.com/pricing) | [InstantDB](https://www.instantdb.com/pricing) | [DoltHub](https://www.dolthub.com/pricing) | [Back4app BaaS](https://www.back4app.com/pricing/backend-as-a-service) |
| --- | --- | --- | --- | --- | --- | --- |
| 정체 | 관리형 SQLite(libSQL) | 서버리스 Postgres | Postgres + PostgREST + Auth | 실시간 동기화 DB | Git처럼 버전 관리되는 MySQL 호환 DB | Parse + MongoDB |
| 접속 | **HTTPS 요청 단위** | TCP (pooler 경유) | TCP + REST | 클라이언트 SDK + Admin HTTP API | HTTP REST API | REST / GraphQL만 |
| 무료 한도 | DB 100개 / 5GB / 월 5억 row read, 1천만 write | 0.5GB / 월 100 CU-h / 프로젝트 100개 | 500MB / egress 5GB / MAU 5만 / 활성 프로젝트 2개 | 1GB / API 요청 무제한 | 공개 저장소 무료, 비공개는 100MB까지 | 월 25,000 요청 / 250MB / 파일 1GB |
| 유휴 시 | 영향 없음 | 5분 후 scale-to-zero, 재개 시 지연 | **7일 유휴 시 프로젝트 정지** | 정지 없음 | 영향 없음 | - |
| 카드 | 불필요 | 불필요 | 불필요 | 불필요 | 불필요 | 불필요 |
| Go 궁합 | `libsql-client-go` — **순수 Go, CGO 불필요** | pgx | pgx | 공식 SDK 없음 (JS/Python만) | HTTP 직접 호출 | **Go SDK 없음** |

### 선택 가이드

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

### Turso (libSQL)

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

### Neon

- Postgres를 서버리스로 제공. 브랜치 기능이 있어 배포 프리뷰마다 격리된 DB를 붙일 수 있다
- 무료 플랜은 프로젝트당 0.5GB 스토리지 + 월 100 CU-h 컴퓨트, 프로젝트 100개. 2025년 Databricks 인수 이후 무료 컴퓨트가 50 → 100 CU-h로 늘었다
- **5분 유휴 후 scale-to-zero.** 재개에 수백 ms가 붙으므로, 콜드스타트가 잦은 앱에서는 앱 콜드스타트와 겹쳐 체감이 나빠진다
- Go에서는 pgx로 붙는다. 서버리스라면 pooler 엔드포인트를 쓸 것
- Netlify DB가 이 Neon을 기반으로 한다 (아래)

### Supabase

- Postgres에 PostgREST(REST API), Auth, Storage, Realtime을 얹은 BaaS. Firebase의 오픈소스 대안 포지션
- 무료: DB 500MB, egress 5GB, MAU 5만, **활성 프로젝트 2개**
- **7일간 DB 요청이 없으면 프로젝트가 자동 정지된다.** 가끔 들어가는 개인 앱에는 치명적이라,
  깨어 있게 하려면 크론으로 주기적 쿼리를 날려야 한다
- 앱 서버 없이 프론트엔드에서 직접 DB를 치는 구조를 전제로 설계돼 있어, Row Level Security 설정이 사실상 필수다
- Go에서는 pgx로 직접 붙거나 PostgREST를 HTTP로 호출한다

### InstantDB

- 클라이언트에서 바로 읽고 쓰는 **실시간 동기화 DB**. 낙관적 업데이트와 오프라인 지원이 기본이고, 관계형 쿼리를 지원한다. Firebase 대안 중 관계형 쪽에 가깝다
- 무료: **1GB 데이터베이스, API 요청 무제한, 카드 불필요, 무료 프로젝트가 정지되지 않으며 상업적 사용도 허용**.
  Supabase의 7일 정지 같은 제약이 없다는 점이 개인 프로젝트에 큰 장점
- 서버 측 공식 SDK는 **JavaScript(`@instantdb/admin`)와 Python 뿐**이다.
  Admin HTTP API가 있어 Go에서도 직접 호출할 수는 있지만 공식 지원은 아니다
- 프론트엔드가 주도하는 실시간 협업 앱에 맞는 도구다. Go로 서버 렌더링하는 구조에는 결이 맞지 않는다

### Dolt / DoltHub

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

### PaaS 내장 DB

앱을 올린 곳에서 DB까지 같이 주는 경우. 앱과 같은 리전에 있어 지연이 짧다는 게 공통 장점이다.

- **Netlify DB**: Neon 기반 서버리스 Postgres, 2026년 4월 GA.
  **크레딧 기반 플랜 전용**이라 구형 `Free (Legacy)` 플랜 팀은 쓸 수 없다.
  이걸 쓰려고 신규 크레딧 기반 Free(월 300 크레딧 하드 캡)로 전환하면
  같은 팀의 기존 정적 사이트들도 전부 같은 캡 아래로 들어가므로 주의
- **Northflank addon**: 상시 가동이라 콜드스타트 개념이 없다. 무료 슬롯 1개.
  무료 addon의 vCPU/RAM/스토리지 스펙은 가격 페이지에 공개돼 있지 않아 계정에서 직접 확인해야 한다
- **Render Postgres**: 무료는 **30일 제한**이라 상시 운영에는 못 쓴다
- **Koyeb Postgres**: active 5시간 / 1GB storage 제한 (기존 사용자 한정)

### Back4app BaaS (Parse)

- 컨테이너 호스팅(Back4app Containers)과 **별개 상품**이다. 혼동 주의
- Parse Server + MongoDB. 무료는 월 25,000 요청 / DB 250MB / 파일 1GB
- 월 25,000 요청 = 하루 830건이라 개인용으로도 아슬아슬하다
- **Go SDK가 없어서** Parse 객체 모델에 맞춰 REST를 직접 짜야 한다. 테이블 하나짜리 앱에는 과한 종속

## 조합 패턴

### Netlify 프록시 rewrite로 커스텀 도메인 붙이기

무료 PaaS 상당수가 커스텀 도메인을 유료 기능으로 잠가둔다(Back4app Containers 등).
정적 호스팅을 Netlify에 두고 있으면 서브도메인 하나를 다른 곳에 띄운 컨테이너로 넘겨서 이를 우회할 수 있다.

```
# _redirects
/*  https://<backend-host>/:splat  200
```

- 상태 코드 `200`이 리다이렉트가 아니라 **rewrite(프록시)** 를 뜻한다. 브라우저 주소창은 원래 도메인 그대로 유지된다
- DNS와 TLS 인증서는 Netlify가 관리하고, 백엔드는 Cloud Run / Back4app / Render 등 아무 데나 둘 수 있다
- Cloud Run에 커스텀 도메인을 직접 매핑하려면 도메인 매핑이나 로드밸런서 설정이 필요한데, 이 방식은 그 과정을 통째로 건너뛴다
- 백엔드 주소가 바뀌면 이 한 줄만 고쳐서 다시 배포하면 된다. 다만 Back4app 무료는 **재배포마다**
  접미사가 바뀌므로 되살릴 때마다 이 줄을 고쳐야 한다
- 비용은 Netlify 무료 플랜의 대역폭(월 100GB)만 소비한다
- **대신 지연을 낸다. 이게 이 방식의 진짜 비용이다.** til.benelog.net 을 Cloud Run 서울
  리전에 붙이고 한국에서 교차 측정한 값:

  | 경로 | `GET /` | TCP 핸드셰이크 |
  | --- | --- | --- |
  | Cloud Run 직결 | 92~109ms | 5.5ms |
  | Netlify rewrite 경유 | 328~384ms | 71ms |

  Netlify의 가장 가까운 PoP가 71ms 거리라, 요청이 한국 → Netlify PoP → 서울로 두 번
  건너간다. **서울 리전을 골라 얻은 이득을 프록시가 도로 까먹는다.** 커스텀 도메인이
  유료라 어쩔 수 없는 경우에는 쓸 만하지만, 배포처가 도메인 매핑을 무료로 지원하면
  그쪽을 쓰는 편이 낫다
- Netlify에서 Domain management → 커스텀 도메인 추가 후 **Force HTTPS** 를 켜면 HTTP→HTTPS 301과 HSTS가 붙는다

### 실제 구성 예: til.benelog.net

Go + HTMX로 만든 TIL 기록 앱([benelog/til](https://github.com/benelog/til))을 무료로만 올린 구성.

```
til.benelog.net  →  Netlify rewrite(200)  →  Cloud Run (서울)  →  Turso (도쿄)
   도메인·TLS·HSTS          프록시           asia-northeast3    aws-ap-northeast-1
```

- 결제 계정 연결은 필요하지만 **사용량은 Cloud Run 무료 한도 안이라 실질 $0** 이다
- 이미지는 distroless + CGO 없는 정적 Go 바이너리로 28MB
- 실측(한국): Cloud Run 직결 `GET /` 92~109ms(서버 처리 39~48ms), til.benelog.net 경유 328~384ms.
  차이는 전부 Netlify 프록시 홉이다
- **먼저 Back4app Containers 무료 티어로 갔다가 접었다.** 카드는 필요 없었지만 임시 URL이
  만료되면서 배포가 통째로 파괴됐다. 그 전에 접은 것들 — Northflank(카드 필수),
  Netlify Functions(Go 런타임 2027-07-01 종료)
- 배포처를 Cloud Run → Northflank → Back4app → Cloud Run 으로 세 번 옮기는 동안
  **DB 코드도 Dockerfile 도 한 줄도 안 바꿨다.** Turso + distroless Go 조합의 실질 이득

### 실제 구성 예: chain.benelog.net

TypeScript + HTMX로 만든 습관 기록 앱([benelog/habit-chain](https://github.com/benelog/habit-chain)).
til.benelog.net 과 달리 **앱 서버 프로세스가 없다.** 컨테이너 대신 Worker 하나가 전부다.

```
chain.benelog.net  →  Cloudflare Pages (_worker.js)  →  DoltHub HTTP API
  Netlify DNS의 CNAME       SSR + 정적 자산              요청 단위 HTTP, 커넥션 없음
```

- Worker가 DoltHub SQL API로 읽어 HTML 문자열을 만들어 반환한다. HTMX라 전체 페이지뿐 아니라
  카드 하나짜리 **HTML 조각**도 응답으로 돌려주고 브라우저가 그 자리에 갈아끼운다
- **Workers가 아니라 Pages를 쓴 이유는 DNS다.** `benelog.net` 이 Cloudflare 존이 아니라 Workers
  커스텀 도메인을 붙일 수 없다. Pages는 외부 서브도메인에 CNAME 하나로 붙는다
- Pages advanced mode: 빌드된 `_worker.js` 가 모든 요청을 먼저 받고, 모르는 경로만 `env.ASSETS` 로 넘긴다.
  Worker + Static Assets 조합에서 필요한 `run_worker_first` 목록을 유지하지 않아도 된다
- DB 주소와 토큰을 서버에 두지 않고 **사용자 설정에서 헤더로 받는다.** 배포물에 시크릿이 없다
- 콜드스타트도 유휴 정지도 없고 카드도 필요 없다. 제약은 호출당 CPU 10ms인데,
  DoltHub 응답을 기다리는 시간은 CPU 시간에 안 들어가서 이 구성에서는 걸리지 않는다
- til.benelog.net 구성과의 대비: 그쪽은 **카드는 없지만 상시 운영이 안 되고**(임시 URL 만료),
  이쪽은 **카드도 없고 상시 운영도 된다.** 대신 임의의 Go 바이너리를 못 올리고 런타임이 Worker로 고정된다

## Related
- [[aws]]
- [[db]]
- [[continous-deployments]]
- [[docker]]
- [[golang]]
- [[k8s]]
- [[paas]]
- [[server-automation]]
