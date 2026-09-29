[Java Object Serialization에 대해 모르고 있던 5가지
사항](http://www.ibm.com/developerworks/kr/library/j-5things1/index.html)

- writeObject, readObject를 통해 특정 필드를 감출 수 있다.
- readResolve, writeReplace로 Proxy를 사용할 수 있다.

## Library

<http://vanillajava.blogspot.co.uk/2012/02/high-performance-libraries-in-java.html>http://sourceforge.net/projects/javacurses/
: Console로 UI

## Java7

ttp://www.oracle.com/technetwork/java/javase/jdk7-relnotes-418459.html

File watch

ttp://www.codeproject.com/Tips/560894/File-Change-Notification-in-Java-7

ttp://docs.oracle.com/javase/tutorial/essential/io/notification.html

## Hot deployment
- [JAVA에서의 Hot Deployment 문제](http://blog.naver.com/parnx/140038291903)
- <http://www.theserverside.com/news/thread.tss?thread_id=26044>

### java Rebel
- <http://www.theserverside.com/news/thread.tss?thread_id=47771>
- <http://www.zeroturnaround.com/javarebel-demonstration-screencast/>

## Java constant interface
- [Constant Interface antipattern](http://www.google.co.kr/search?source=)

## Java shutdown hook
어느 셧다운 훅을 먼저 실행하게 될지에 대해서 JVM은 보장해 주지 않는다. 셧다운 훅이 복잡하게 걸려 있을 경우 프로그램 종료 자체가 정리될 수 있다. 유닉스 환경에서 kill -9로 강제종료 할시는 셧다운 훅이 실행되지 않는다.

```java
public class HelloGoodBye{
    public static void main(String[] args){
        System.out.println("hello world");
        Runtime.getRunTime().addShutdownHook(
            new Thread(){
                public void run(){
                    System.out.println("Good bye world");
                }
            };
        System.exit(0);
    }
}
```

자료출저 : 유쾌한 Java puzzler, 사이텍 미디어

## Java web start
- <http://blog.naver.com/akabar/120003580811>
- <http://blog.naver.com/barlack/60012502238>
- [Java Web Start를 사용하여 SWT 애플리케이션 전개하기 (한글)](http://www.ibm.com/developerworks/kr/library/os-jws/)

JNLP 파일의 JAR 자원이 동일한 인증서로 서명되지 않았습니다.

```sh
keytool -selfcert -alias kettle -keystore keystore
keytool -list -keystore keystore
```

## Related
