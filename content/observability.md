- <https://grafana.com/observability-survey/2024/>

## Concept

- <https://www.splunk.com/en_us/blog/learn/melt-metrics-events-logs-traces.html>

## Trace

- [대규모 분산 시스템 추적 플랫폼, Pinpoint](https://d2.naver.com/helloworld/1194202)
- [otel-desktop-viewer](https://github.com/CtrlSpice/otel-desktop-viewer)
  - 로컬 개발 환경에서 OpenTelemetry traces, metrics, logs를 받아 `localhost:8000` UI로 탐색하는 Go 기반 CLI 도구. OTLP gRPC `4317`, HTTP `4318` 수신기를 제공한다.

## Platform

- [OpenObserve](https://github.com/openobserve/openobserve)
  - logs, metrics, traces, RUM, session replay, SLO, LLM observability를 다루는 오픈소스 관측성 플랫폼. Datadog, Splunk, Elasticsearch 대안을 표방하며 단일 바이너리 배포와 낮은 저장 비용을 강조한다.
- [Uptrace](https://github.com/uptrace/uptrace)
  - OpenTelemetry traces, metrics, logs를 지원하는 오픈소스 APM 플랫폼. ClickHouse 기반 self-hosted 구성과 분산 추적, 성능 모니터링을 주요 용도로 한다.
- [SigNoz](https://github.com/signoz/signoz)
  - OpenTelemetry-native 오픈소스 관측성 플랫폼. logs, metrics, traces를 한 도구에서 다루며 APM, distributed tracing, log management, infra monitoring 기능을 제공한다.

## Related
- [[infra-monitoring]]
- [[logging]]
- [[sre]]
