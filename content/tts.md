텍스트를 음성으로 바꾸는(Text-to-Speech) 모델과 도구 모음

## Kokoro

- [hexgrad/Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) : 8,200만 파라미터의 작은 오픈 가중치 TTS 모델. Apache-2.0
    - CPU만으로 돈다. 8코어·GPU 없는 노트북에서 90초 분량의 음성을 60초 정도에 만들었다
    - 목소리 이름의 첫 글자가 억양이다. `a`는 미국 영어(`af_heart`, `am_michael` …), `b`는 영국 영어(`bf_emma`, `bm_george` …). 그 밖에 힌디·스페인어·프랑스어·이탈리아어·포르투갈어·일본어·중국어
    - 어린이 목소리는 없다. 그래서 어린 왕자 녹음에는 쓰지 못했고, 성인 화자 책에는 `am_michael`이 쓸 만했다
    - 24kHz 16비트 모노 WAV를 낸다. MP3가 필요하면 ffmpeg로 바꾼다
- 파이썬 패키지 `kokoro`의 [`KPipeline`](https://github.com/hexgrad/kokoro) 으로 코드에서 쓴다. `pipeline(text, voice='af_heart', speed=1.0)`이 문장 단위로 오디오를 돌려준다
- 설치 없이 돌리는 방법 (uv)

```sh
uv run --python 3.12 --with 'kokoro>=0.9.4' --with soundfile python -m kokoro \
  -i input.txt -o out.wav --voice am_michael --speed 1.0
ffmpeg -i out.wav -b:a 64k out.mp3
```

### 텍스트 파일 → 음성 파일 CLI

- `python -m kokoro` : `kokoro` 패키지에 들어 있는 CLI ([`kokoro/__main__.py`](https://raw.githubusercontent.com/hexgrad/kokoro/main/kokoro/__main__.py))
    - `-i/--input-file`, `-t/--text`, 둘 다 없으면 stdin
    - `-o` 출력 파일, `-m/--voice`(기본 `af_heart`), `-l/--language`(기본은 목소리 첫 글자), `-s/--speed`, `--debug`
    - 줄바꿈 단위로 쪼개 합성하고 WAV만 쓴다. 추가 설치가 없어 한 번 쓰기에 가장 간단하다
- [nazdridoy/kokoro-tts](https://gitea.com/nazdridoy/kokoro-tts) ([PyPI](https://libraries.io/pypi/kokoro-tts), [소개글](https://dev.to/nazdridoy/revolutionize-your-audio-experience-natural-text-to-speech-with-kokoro-tts-3enh))
    - `uv tool install kokoro-tts`. TXT·EPUB·PDF 입력, WAV·MP3 출력, 장별 파일 분할(`--split-output`)까지 되는 가장 완성형 도구
    - ONNX 런타임(kokoro-onnx)을 쓰므로 `kokoro-v1.0.onnx`와 `voices-v1.0.bin`을 작업 폴더에 내려받아야 한다
    - Python 3.9~3.12만 지원
    - `kokoro-tts book.epub --split-output ./chapters/ --format mp3 --voice bf_emma`
- [fcjr/ltts](https://github.com/fcjr/ltts) ([PyPI](https://pypi.org/project/ltts/)) : `cat a.txt | ltts -o a.mp3`. 기본 백엔드는 Qwen3-TTS이고 Kokoro는 명시적으로 고른다
- [cheuerde/kokoro-tts-cli](https://github.com/cheuerde/kokoro-tts-cli) : stdin 스트리밍 재생과 목소리 혼합 위주. espeak-ng가 필요하고 저장은 WAV
- [santinic/audiblez](https://github.com/santinic/audiblez) : EPUB을 Kokoro로 읽어 챕터 마크가 있는 m4b 오디오북으로 만든다

## OpenAI TTS

- `gpt-4o-mini-tts` : 목소리(`ash`, `coral`, `cedar` …)에 더해 `instructions`로 말투를 글로 지시할 수 있다
    - 어린 왕자 영화·오디오북 전체(1,435줄, 약 95분)가 1~2달러였다. 분당 약 0.015달러
    - 아이 목소리가 없어 `coral`을 ffmpeg rubberband 필터로 3반음 올려 어린 왕자 목소리로 썼다
    - 조직 단위로 하루 요청 수 한도가 있어, 한도가 찼을 때는 분당 요청 수를 제한해 천천히 돌려야 한다

## Qwen3-TTS

- [QwenLM/Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS) ([논문 arXiv:2601.15621](https://arxiv.org/html/2601.15621)) : Alibaba Qwen 팀이 2026년 1월 22일에 공개한 TTS 모델 가족. Apache-2.0
    - 0.6B와 1.7B 두 크기. 변종은 Base(참조 음성 3초로 목소리 복제), CustomVoice(9가지 기본 목소리 + 감정·말투를 글로 지시), VoiceDesign(목소리를 글로 묘사해 만들기)
    - 10개 언어(중국어·영어·일본어·**한국어**·독일어·프랑스어·러시아어·포르투갈어·스페인어·이탈리아어)
    - 스트리밍 지원. 첫 음성 패킷까지 97ms라고 밝힘
    - 공식 예제는 모두 CUDA GPU 대상이고 CPU 추론은 문서에 없다. 파이썬 패키지 `qwen-tts`(transformers 기반), vLLM-Omni, Alibaba Cloud DashScope API로 쓴다
    - 자체 벤치마크에서 Seed-TTS 테스트셋 WER이 1.7B Base 기준 중국어 0.77, 영어 1.24로 CosyVoice 3·MiniMax·ElevenLabs와 비슷하거나 낫다고 주장. 목소리 복제 품질은 1.7B가 좋고 0.6B는 잡음이 섞인다는 사용 후기가 있다
- CPU에서 돌리는 커뮤니티 런타임 : [gabriele-mastrapasqua/qwen3-tts](https://github.com/gabriele-mastrapasqua/qwen3-tts)(int8/int4, MIT), [predict-woo/qwen3-tts.cpp](https://github.com/predict-woo/qwen3-tts.cpp), koboldcpp, GGUF 변환본

### Kokoro와 비교

| | Kokoro-82M | Qwen3-TTS 0.6B / 1.7B |
|---|---|---|
| 크기 | 82M | 0.6B(int8 파일 2.35GB) / 1.7B |
| 언어 | 영어 중심 8개. 한국어 없음 | 10개. 한국어 포함 |
| 목소리 | 54개 고정 프리셋 | 복제·글로 지시·글로 설계 |
| CPU 속도 | 32코어에서 실시간의 약 5배. 8코어 노트북에서도 실시간보다 빠름 | 0.6B int8이 4 vCPU에서 RTF 2.5~3.3(실시간의 1/3 속도). Ryzen 5 3600 4스레드 RTF 1.94 |
| 메모리 | 수백 MB | CPU에서 약 3.2GB |
| 품질 | 소형 모델 중에서는 좋다는 평이 많지만 "빠르지만 품질은 나쁘다"는 평도 있음 | 비공식 청취 비교에서 int8·int4 모두 "뛰어남". 공식 WER은 상용 서비스 수준 |

- 출처 : [Quantized Qwen3-TTS CPU Benchmarks](https://ocdevel.com/blog/20260711-quantized-cpu-tts) (ocdevel, 2026.7), [Kokoro vs Chatterbox vs VibeVoice vs Qwen3-TTS](https://www.tryspeakeasy.io/blog/open-source-text-to-speech-2026) (SpeakEasy), [Best Open Source Self-Hosted TTS 2026](https://pinggy.io/blog/best_open_source_self_hosted_text_to_speech_models/) (Pinggy)
    - 수치는 대부분 블로그의 비공식 측정이고 하드웨어가 서로 달라 깨끗한 비교는 아니다. 품질은 직접 들어 보고 판단해야 한다
- 정리
    - GPU가 없고 영어 긴 글(책 한 권)을 빨리 읽히려면 Kokoro. 실시간보다 빨라 수 시간짜리 오디오북도 CPU로 만들 수 있다
    - 한국어, 목소리 복제, 감정·말투 지시, 아이 목소리처럼 프리셋에 없는 목소리가 필요하면 Qwen3-TTS. 다만 CPU에서는 실시간의 1/3 속도여서 95분짜리 책에 5시간쯤 걸리는 셈이고, GPU나 Apple Silicon이 있어야 편하다
    - OpenAI `gpt-4o-mini-tts`가 하던 "말투를 글로 지시" 역할을 로컬에서 대체할 후보가 Qwen3-TTS CustomVoice다

## 한국어를 지원하는 오픈소스 TTS

Kokoro에는 한국어가 없다. 2026년 10월 기준으로 한국어가 되는 오픈 가중치 모델은 다음과 같다. 한국어 품질을 독립적으로 비교한 자료는 아직 없어서, 같은 문장을 만들어 직접 들어 보고 골라야 한다.

| 모델 | 크기 | 라이선스 | 한국어 | 특징 |
|---|---|---|---|---|
| [Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS) (Alibaba) | 0.6B / 1.7B | Apache-2.0 | 10개 언어 중 하나 | 복제·말투 지시·목소리 설계. 공식 지원은 CUDA. CPU는 커뮤니티 런타임 |
| [Supertonic 3](https://github.com/supertone-inc/supertonic) (Supertone, 한국) | 99M | 코드 MIT, 모델 OpenRAIL-M | 31개 언어. 자체 벤치마크에서 한국어 CER 3.26(VoxCPM2 4.70) | ONNX Runtime으로 CPU·브라우저·모바일에서 돎. e-reader에서도 RTF 0.3. 프리셋 목소리와 `<laugh>` 같은 표현 태그. 복제 없음. **저장소가 archived 상태**(업데이트·지원 중단) |
| [VoxCPM2](https://github.com/OpenBMB/VoxCPM) (OpenBMB) | 2B | Apache-2.0 | 30개 언어 | 48kHz. 목소리 설계·복제·전사 기반 복제. VRAM 8GB. CPU는 llama.cpp-omni·ONNX로 가능 |
| [Fun-CosyVoice 3](https://github.com/FunAudioLLM/CosyVoice) (Alibaba) | 0.5B | Apache-2.0 | 9개 언어 | 교차 언어 복제, 감정·속도 지시, 양방향 스트리밍 150ms. NVIDIA GPU 전제 |
| [Chatterbox Multilingual](https://github.com/resemble-ai/chatterbox) (Resemble AI) | 500M | MIT | 23개 언어 | `language_id="ko"`. 참조 음성으로 복제. 참조 음성 언어가 다르면 억양이 묻어 나옴. Turbo·Nano 변종은 영어 전용 |
| [MeloTTS](https://github.com/myshell-ai/MeloTTS) (MyShell·MIT) | 소형 | MIT | 언어당 목소리 하나 | CPU 실시간. 복제·지시 없음. 가볍게 쓰는 기준선 |
| [Fish Speech](https://github.com/fishaudio/fish-speech) | - | 1.5·1.6은 CC BY-NC-SA, S2 Pro는 상용 라이선스 | 13개 언어 | 비상업 조건이라 공개 서비스에는 쓰기 어려움 |

- 고르는 기준
    - **CPU만 있고 빠르게** : Supertonic 3. 한국 회사가 만든 모델이어서 한국어 수치가 좋지만, 저장소가 보존(archive)으로 넘어가 앞날이 불확실하다. 가중치는 Hugging Face `supertone-oss-archive/supertonic-3`에 남아 있다
    - **목소리 복제·말투 지시가 필요** : Qwen3-TTS(가볍고 문서가 좋음), VoxCPM2(품질 우선, 무거움), CosyVoice 3(스트리밍 대화형)
    - **라이선스가 가장 느슨해야** : Chatterbox Multilingual, MeloTTS(MIT)
- 참고 : [Best Open Source Self-Hosted TTS 2026](https://pinggy.io/blog/best_open_source_self_hosted_text_to_speech_models/) (Pinggy), [TTS Model Quality Ranking 2026](https://offlinetts.com/blog/tts-model-ranking-2026/) (OfflineTTS), [오픈소스 TTS 4종으로 목소리 0원 복제하기](https://brunch.co.kr/@ainote/63) (brunch)

### ltts로 Qwen3-TTS 한국어 돌려 보기

- [fcjr/ltts](https://github.com/fcjr/ltts)는 Qwen3-TTS(기본)와 Kokoro를 한 CLI로 감싼다. `uv tool install ltts`
    - 한국어 프리셋 목소리는 `Sohee`. `ltts "안녕하세요" -l ko -v Sohee -o hello.mp3`
    - 기본은 1.7B(약 3GB 다운로드, `~/.cache/huggingface/`). `--model-size 0.6B`가 빠르다. `-d cpu`가 기본
    - `--say`(바로 재생) 때문에 `sounddevice`를 import하므로 PortAudio(`libportaudio2`)가 없으면 시작조차 못 한다. 파일만 만들 때는 `PYTHONPATH`에 빈 `sounddevice.py` 스텁을 두면 우회된다
- 실행 결과 (2026.10.24, 8코어 CPU, GPU 없음, RAM 30GB)
    - `ltts "안녕하세요 정상혁입니다" -l ko -v Sohee -o hello.mp3` : 1.7B 모델로 2.1초짜리 음성을 만드는 데 전체 5분 49초. 모델 다운로드를 빼면 CPU 연산만 약 1분 52초
    - 2초 문장에 2분이 걸리는 속도라 긴 글을 이 사양에서 Qwen3-TTS로 읽히기는 어렵다. 한국어 긴 글은 Supertonic 3 같은 ONNX 경량 모델이 현실적이고, Qwen3-TTS는 GPU가 있을 때 쓴다
    - PyTorch가 `Could not initialize NNPACK! Reason: Unsupported hardware.` 경고를 내지만 결과에는 영향이 없다
    - `Sohee` 목소리의 한국어 발음과 억양은 자연스러웠다

## 적용 사례

- [Book Play](https://github.com/benelog/book-play) : 책의 본문을 화자별로 나눠 줄마다 MP3를 만들고(`tools/book-voices.py`), 영화와 오디오북이 같은 녹음을 재생한다. 엔진은 OpenAI(유료)와 Kokoro(무료) 중 고른다
    - Kokoro는 `uv run`으로 띄운 작업자 프로세스 하나에 모델을 한 번만 올리고 줄 목록을 흘려 넣는다. 줄마다 프로세스를 새로 띄우면 모델 로딩 시간이 더 길다
    - 녹음 파일 이름을 (화자, 문장, 목소리 설정)의 해시로 두면 본문을 고쳤을 때 바뀐 줄만 다시 녹음할 수 있다

## Related
- [[ai]]
