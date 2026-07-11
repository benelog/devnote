- [Coolify](https://github.com/coollabsio/coolify)
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

### Fly.io

- 전 세계 엣지 로케이션에 마이크로 VM을 띄워 사용자에게 가장 가까운 곳에서 애플리케이션을 구동하는 데 특화되어 있음.
- 터미널(CLI) 중심의 제어와 Docker 환경을 지원하여, 개발자가 세밀하게 네트워크와 인프라 리소스를 다룰 수 있음
- 신규 사용자는 짧은 무료 trial이 있으나, 지속 사용에는 결제수단 등록이 필요하며 사용량 기반으로 과금됨.

### 3. Render

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

## Related
- [[aws]]
- [[continous-deployments]]
- [[docker]]
- [[k8s]]
- [[paas]]
- [[server-automation]]
