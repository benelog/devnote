# 허깅페이스 오픈 모델의 호환성을 가능하게 하는 표준들

크게 **모델 가중치 포맷**, **모델 아키텍처 규약**, **메타데이터/설정 표준** 세 층위가 있다.

## 1. 모델 가중치 저장 포맷

| 포맷 | 특징 |
|------|------|
| **Safetensors** | 현재 사실상 표준. 메모리 매핑 가능, 보안 취약점 없음 (pickle 미사용) |
| **GGUF** | llama.cpp 생태계 표준. 양자화 정보를 파일 자체에 포함. CPU/엣지 추론에 최적화 |
| **PyTorch (.bin/.pt)** | pickle 기반의 레거시 포맷. 여전히 많이 쓰이지만 보안 우려 |

**Safetensors**가 핵심이다. 텐서의 이름(key)과 shape, dtype, 바이너리 데이터를 단순한 헤더+바이너리 구조로 저장하므로, 어떤 프레임워크든 쉽게 읽을 수 있다.

## 2. 모델 아키텍처 규약 — Transformers 라이브러리의 역할

허깅페이스 `transformers` 라이브러리가 사실상의 표준 역할을 한다.

- **`config.json`** — 모델 구조 정의 (`model_type`, `hidden_size`, `num_attention_heads` 등)
- **`tokenizer.json` / `tokenizer_config.json`** — 토크나이저 정의
- **`generation_config.json`** — 생성 파라미터

```json
// config.json 예시
{
  "model_type": "llama",
  "hidden_size": 4096,
  "num_attention_heads": 32,
  "num_hidden_layers": 32,
  "vocab_size": 32000
}
```

`model_type`이 `"llama"`이면, 라이브러리가 `LlamaForCausalLM` 클래스를 자동으로 선택하고 가중치를 로드한다. 그래서 Llama 아키텍처 기반 모델은 누가 학습했든 동일한 코드로 실행된다.

## 3. 추론 엔진 간 호환성

```
HF 모델 (safetensors + config.json)
    │
    ├─→ transformers (Python)
    ├─→ vLLM (고성능 서빙)
    ├─→ TGI (HF 자체 서빙)
    ├─→ Ollama / llama.cpp (GGUF 변환 후)
    └─→ ONNX Runtime (ONNX 변환 후)
```

이것이 가능한 이유는 **아키텍처가 표준화**되어 있기 때문이다. 대부분의 오픈 모델이 소수의 아키텍처(Llama, Mistral, Qwen, Gemma 등)를 따르고, 각 추론 엔진이 이 아키텍처들을 구현해 둔다.

## 핵심 정리

공식적인 "표준 기구"가 정한 스펙이라기보다는:

1. **Safetensors** — 텐서를 저장하는 단순하고 안전한 바이너리 포맷
2. **HF transformers의 config 규약** — `config.json`의 `model_type`으로 아키텍처를 식별
3. **소수 아키텍처로의 수렴** — 대부분의 모델이 Llama/Mistral 계열 아키텍처를 채택

이 세 가지가 맞물려서 "누가 학습했든 다운받으면 바로 돌릴 수 있는" 생태계가 만들어진 것이다. 사실상의 표준(de facto standard)이지, ISO 같은 공식 표준은 아니다.
