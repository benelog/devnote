- <https://openjdk.java.net/jeps/370>
- <https://dzone.com/articles/troubleshooting-problems-with-native-off-heap-memo>
- <https://www.javacodegeeks.com/2016/03/jcmd-one-jdk-command-line-tool-rule.html>

# DirectByteBuffer

- `ByteBuffer.allocateDirect()` 로 할당 받음
- 조정 옵션
  - `-Djdk.nio.maxCachedBufferSize`
  - `-XX:MaxDirectMemorySize`

# Netty

- <https://github.com/netty/netty/blob/4.1/common/src/main/java/io/netty/util/internal/PlatformDependent.java#L192>
- Dio.netty.noPreferDirect=true

# Linux command

- `cat /proc/meminfo`
- `cat /proc/{pid}/status`

## Related
- [[effective-java]]
- [[graal-vm]]
- [[java-annotation]]
- [[java-basic]]
- [[java-basic-summary]]
- [[java-bytecode]]
- [[java-concurrency]]
- [[java-date]]
- [[java-dto]]
- [[java-ee-pattern]]
- [[java-encoding]]
- [[java-external-process]]
- [[java-fast-boot]]
- [[java-fiber]]
- [[java-functional-library]]
- [[java-gc]]
- [[java-json-parser]]
- [[java-lambda]]
- [[java-memory-model]]
- [[java-multiline-string]]
- [[java-performance]]
- [[java-process-call]]
- [[java-profiling]]
- [[java-puzzler]]
- [[java-references]]
- [[java-security]]
- [[java-string]]
- [[java-thread-dump]]
- [[java-tips]]
- [[java-web-framework]]
- [[jvm]]
- [[openjdk]]
