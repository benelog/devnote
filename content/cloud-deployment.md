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

## Related
- [[aws]]
- [[continous-deployments]]
- [[docker]]
- [[k8s]]
- [[paas]]
- [[server-automation]]
