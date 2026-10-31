- [Java를 위한, Java에 의한 도구들](https://www.slideshare.net/NHNFORWARD/2018-java-java)
- <http://jiprof.sourceforge.net/>http://code.google.com/p/oktech-profiler/\[<http://code.google.com/p/oktech-profiler/>\]
- <http://www.manageability.org/blog/stuff/open-source-profilers-for-java>
- <http://www.ibm.com/developerworks/java/library/j-5things7.html>

- <http://www.ibm.com/developerworks/kr/library/j-5things7.html>

<http://www.ibm.com/developerworks/kr/library/j-5things8.html>

<http://prezi.com/watosm3yizdd/presentation/>

<http://www.java2s.com/Open-Source/Java-Document/6.0-JDK-Modules-sun/tools/sun/tools/jstack/JStack.java.htm>

<http://www.java2s.com/Open-Source/Java-Document/6.0-JDK-Modules-sun/jvmstat/sun.jvmstat.monitor.htm>

<https://alibaba.github.io/arthas/en/>

## Btrace

- <http://kenai.com/projects/btrace/pages/Home>
- <http://eggboy.egloos.com/1866372>
- <http://piotrnowicki.com/2012/05/btrace-a-simple-way-to-instrument-running-java-applications/> <http://www.javacodegeeks.com/2012/06/introduction-to-btrace-for-java.html>
- <http://d2.naver.com/helloworld/9042309>
- <https://kenai.com/projects/btrace/sources/hg/content/samples/JdbcQueries.java>

## Visual VM

- [Java Visual VM JDK에 포함된 무료 프로파일링 툴](http://www.tuning-java.com/248)
- [VisualVM](http://blog.openframework.or.kr/91)
- [VisualVM 플러그인 이야기](http://blog.openframework.or.kr/92)
- JavaTool 유용한 자바툴 - jvisualvm\]
- [Troubleshooting application performance with VisualVM](http://www.skill-guru.com/blog/2010/11/11/troubleshooting-application-performance-with-visualvm/)

## Hprof (Heap And CPU Profiling Agent)

- <http://java.sun.com/developer/technicalArticles/Programming/HPROF.html>
- <http://wiki.ex-em.com/index.php/HProf>
- <http://wiki.ex-em.com/index.php/HProf>

도움말 : java -agentlib:hprof

실행 : java -agentlib:hprof=heap=sites,cpu=samples,file=\[filename\]
\[Main Class\]

덤프시그널 : kill -3 \[PID\]

java -agentlib:hprof=heap=dump,format=b,file=heapdump.hprof,doe=n
HoldMemory

## Jstat

jstat -gcutil

jstat -gcutil 1363 5s

jps는 /tmp/hsperfdata_계정명 으로 임시 파일들을 저장하는데. 이 파일들을
cent os에서 정의된 tmpwatch에서 지운다.

/etc/cron.daily/tmpwatch

## JConsole

## Heap Analyzer

- [http://www-1.ibm.com/support/docview.wss?https://heaphero.io/https://heaphero.io/https://heaphero.io/https://heaphero.io/https://heaphero.io/https://heaphero.io/https://heaphero.io/https://heaphero.io/https://heaphero.io/https://heaphero.io/uid=swg27006624&aid=1](http://www-1.ibm.com/support/docview.wss?uid=swg27006624&aid=1)
- <http://jensor.sourceforge.net/>
- <http://bcho.tistory.com/entry/Sun-JVM-HeapDump-%EC%96%BB%EA%B8%B0>
- <https://heaphero.io/>
- <https://www.jxray.com/>
- <https://hat.dev.java.net/>
- [\[Heap Dump](http://www.tuning-java.com/259) 자바 힙 덤프(java heap dump) 분석기 - Eclipse Memory Analyzer\]
- GC 상태 그래프 : <http://www.alphaworks.ibm.com/tech/pmat>
- MAT : <http://www.eclipse.org/mat/>
- MAT + IBM Heap analyzer : <http://web-dev.tistory.com/623>

## Headump option

-XX:+HeapDumpOnOutOfMemoryError

-XX:HeapDumpPath=path

-XX:OnError="gcore%p"

## Jmap

덤프파일생성

```
jmap -dump:format=b,file=dump.hprofpid

jmap -dump:live,format=b,file=<fileName> <pid>

jmap -dump:format=b,file=jvm.hprof  jvm.core  /jdk/bin/java
```

Heap histogram 뽑기. 반복해서 뽑아보고 증가가 큰 객체를 보는 방법도
유용하다


    jmap -histo:live


## Jhat

* http://blogs.atlassian.com/2013/03/so-you-want-your-jvms-heap/\</font\>](http://blogs.atlassian.com/2013/03/so-you-want-your-jvms-heap/)

    gdb --pid=[pid]

(gdb) gcore jvm.core

(gdb) detach

    (gdb) quit

jmap -histo:live \<pid\>

## JRat

<http://jrat.sourceforge.net/>

## JIP

<http://jiprof.sourceforge.net/>
<http://www.ibm.com/developerworks/java/library/j-jip/>

## oktech-profiler

<http://code.google.com/p/oktech-profiler/>

Monkey Wrench

## Your kit

<http://www.yourkit.com/>

## Java allocation instrumenter

<http://code.google.com/p/java-allocation-instrumenter/>

## Byteman

<http://www.jboss.org/byteman/>

## Gglowroot

<https://glowroot.org/>

## jvmtop

<https://github.com/patric-r/jvmtop>

## heapster

운영환경에서 힙메모리 프로파일링 <https://github.com/mariusae/heapster>

## Children
- [[java-thread-dump]]

## Related
- [[java-performance]]
- [[jvm]]
- [[observability]]
