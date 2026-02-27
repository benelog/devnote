Bill Paugh의 강의 :
<http://www.infoq.com/presentations/Painful-Java-Puzzlers-and-Bug-Patterns>

# 문제

    int abs = Math.abs("polygenelubricants".hashCode()); System.out.println(abs);

# 문제

    Set<Short> s = new HashSet<Short>(); for (short i=0;i<100;i++) { s.add(i); s.remove(i-1); } System.out.println(s.size());

## Item 51: ColorPoint

final 인스턴스 필드에 값이 할당되기 전에도 이 필드의 값을 읽는 것이
가능하다.순환구조의 인스턴스 초기화(circular instance initialization)는
피할수 있고, 또한 피해야만한다.절대로 오버라이딩 가능한 메서드를
생성자에세 직접 혹은 간접적으로 호출하지 마라. (EJ Item 15)

## Related
- [[effective-java]]
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
- [[java-native-memory]]
- [[java-performance]]
- [[java-process-call]]
- [[java-profiling]]
- [[java-references]]
- [[java-security]]
- [[java-string]]
- [[java-thread-dump]]
- [[java-tips]]
- [[java-web-framework]]
- [[jvm]]
- [[openjdk]]
