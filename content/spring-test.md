- [Rod Johnson의 Testing with Spring](http://toby.epril.com/?p=218)
- <http://www.infoq.com/presentations/system-integration-testing-with-spring>
- [Spring] Junit 3.8코드를 Junit 4용 코드로 바꿔보자 (Junit 4.4 이상)
- [SimpleNamingContextBuilder를 이용해서 JNDI를 이용하는 코드 테스트 하기](http://toby.epril.com/?p=427)

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext*.xml"})
```

- @Autowired
- @ContextConfiguration

## JSP test
- [JSP UnitTest](http://toby.epril.com/?p=153)

## API Documentation
- AbstractTransactionalJUnit4SpringContextTests

## Custom Tag Test
커스텀 태그 라이브러리는 그 실행결과를 확인하는 것이 많이 번거롭습니다. 따로 테스트 코드를 짜지 않는다면, Web Application 를 띄우고 커스템 태그를 사용하는 JSP를 직접 실행한 다음에 나오는 텍스트값을 확인해서 눈으로 값이 제대로 찍히는지 검증하고, 틀리면 다시 코드를 고치는 방식을 반복하는 경우도 많습니다. 그리고 보통 커스텀태그에서는 setter로 지정된 속성에 따라서 조건분기도 많이 들어가기 때문에 더욱 디버깅이 까다롭습니다. 이 때 위와 같이 JSP를 거치지 않고 바로 출력될 값을 찎어주고, 검증로직을 추가할 수 있는 테스트 코드를 짠다면 개발할 때 많은 시간이 절약될 것입니다.

javax.servlet.jsp.tagext.TagSupport를 상속한 클래스라면, TagSupport.setPageContext 메소드를 활용해서 mock같은 테스트용 객체들을 삽입하면 됩니다. 이 메소드를 통해서 PageContext와 PageContext.getOut으로 돌려주는 javax.servlet.jsp.JspWriter객체를 모두 mock으로 지정할 수도 있습니다.

Spring에서는 이를 더욱 간편하게 할 수 있는 MockPageContext라는 객체를 제공합니다.

이를 활용한 Custom 태그 테스트 코드는 아래와 같이 만들 수 있습니다.

```java
ButtonTag tag = new ButtonTag();
tag.setFunctionName("alert");
tag.setType("basic");
PageContext pageContext = new MockPageContext();
tag.setPageContext(pageContext);
assertEquals(TagSupport.EVAL_BODY_INCLUDE, tag.doStartTag());
assertEquals(TagSupport.EVAL_PAGE, tag.doEndTag());
String output = ((MockHttpServletResponse) pageContext.getResponse()).getContentAsString();
System.out.println(output);
assertTrue(output.contains("<span class='r'>"));
//출력된 결과에 대한 추가  검증
```

## Spring 3.1을 이용한 AspectJ 표현식 테스트
AOP에서 AspectJ표현식은 다양하고 강력한 기능을 제공합니다.

예를 들면 Aspect가 결합될 JoinPoint를 아래와 같이 표현을 할 수 있습니다.

- `execution(public void set*(..))` : 리턴 타입이 void이고 메소드 이름이 set으로 시작되고 파라미터가 0개 이상인 메소드
- `execution(* com.benelog.ftpserver.*.*()` : com.benelog.ftpserver패키지의 파라미터가 없는 모든 메소드
- `execution(String com.benelog.ftpserver..*.*(..)` : 리턴타입이 String이면서 com.benelog.ftpserver패키지 및 하위 패키지에 있는 파라미터가 0개 이상인 메소드
- `execution(String com.benelog.ftpserver.Server.insert(..)` : 리턴타입이 String인 com.benelog.ftpserver.Server의 파라미터가 0개 이상인 메소드
- `execution(* get*(*))` : get으로 이름이 시작하고 1개의 파라미터를 갖는 메소드
- `execution(* get*(*,*))` : get으로 이름이 시작하고 2개의 파라미터를 갖는 메소드
- `exceution(* read*(Interger,...))` : read로 이름이 시작하고, 첫번째 파라미터 타입이 Integer이며, 1개 이상의 파라미터를 갖는 메소드

그러나 다양하고 강력한 대신에 모든 문법을 다 익숙하게 쓰기는 힘들고, 컴파일 타임에 체크도 안 되기 때문에 실수할 여지도 큽니다. 조금이라도 표현식을 바꾸었을 때 유지하고 싶은 기존의 동작이 변함없이 작동되는지도 파악하기 어렵습니다.

그래서 AOP는 강력한만큼 통제되지 못한 부작용이 생기기도 쉽습니다. 표현식 한글자를 바꾸어도 어떤 동작을 하는지 테스트를 촘촘히 해봐야하는데, 그럴 때마다 WAS를 띄워서 테스트를 해본다면 시간이 많이 들어갈 것입니다.

Spring 3.1부터는 테스트 코드 안에서 @Configuration, @Bean과 같은 JavaConfig 설정들이 지원됩니다. 그 기능을 이용하면 XML없이 보다 짧은 코드로 AOP에 대한 다양한 테스트를 편하게 해 볼 수 있습니다. 단순한 예제로 Spring 3.1의 기능으로 AOP 테스트하는 방식을 정리해보았습니다.

아래 설명한 예제들은 gist에 올라가 있습니다.

- <https://gist.github.com/1625374>

### LogAspect.java
LogAspect.java는 간단하게 로그를 저장소에 입력하는 Aspect입니다. `@Before("execution(void *.run())")` 라는 표현식으로 run 메소드가 실행되기 전에 로그메시지를 저장호도록 taget 객체와 결합됩니다.

```java
@Aspect
public class LogAspect {
    private LogRepository repository;

    public LogAspect(LogRepository repository){
        this.repository = repository;
    }

    @Before("execution(void *.run())")
    public void log(JoinPoint jp){
        String message = jp.getKind() + ":" + jp.getSignature().getName();
        repository.insertLog(message);
    }
}
```

### LogRepository.java
로그저장소 역할을 하는 클래스입니다. 실무에서라면 DB나 파일 등을 사용하겠지만, 여기서는 단순한 예제를 만들고 싶어서 그냥 String을 화면에 찍었습니다. 정교하게 만든다면 Log정보를 담는 Domain Object를 정의해서 String대신 사용해야 할 것입니다.

```java
public class LogRepository {
    public void insertLog(String message) {
        System.out.println(message);
    }
}
```

### Taget 클래스
LogAspect와 결합될 Target 클래스입니다. 역시나 단순하게 화면에 메시지를 뿌려줍니다.

```java
public class Printer implements Runnable{
    @Override
    public void run() {
        System.out.println("hello!");
    }
}
```

### 실제 코드에서의 applicationContext 설정
applicationContext를 설정하는 xml파일에서 aop: 네임스페이스를 이용해서 aspect J 표현식을 쓸 수 있게 하고, Aspect가 정의된 LogAspect를 bean으로 등록합니다.

```xml
<aop:aspectj-autoproxy/>
<bean id="printer" class="edu.tdd.aop.Printer"/>
<bean id="logAspect" class="edu.tdd.aop.LogAspect">
  <constructor-arg>
    <bean class="edu.tdd.aop.LogRepository"/>
  </constructor-arg>
</bean>
```

### LogAspectTest.java
드디어 LogAspect의 표현식을 테스트하는 코드입니다. @Bean으로 Aspect와 tagetObject를 모드 XML설정 대신 java로 한 파일 안에서 표현했습니다.

각 테스트 메소드별로 2가지를 검증했습니다.

1. proxyCreated() 메소드 : Proxy클래스가 생성되었는지 확인
2. logInserted 메소드: LogAspect에서 호출하는 LogRepository에 원하는 메시지가 저장되었는지 확인

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(loader=AnnotationConfigContextLoader.class)
public class LogAspectTest {
    @Autowired Runnable targetProxy;
    @Autowired LogRepository repository;

    @Test
    public void proxyCreated() {
        assertTrue(AopUtils.isAopProxy(targetProxy));
    }

    @Test
    public void logInserted() {
        targetProxy.run();
        verify(repository).insertLog("method-execution:run");
    }

    @Configuration
    @EnableAspectJAutoProxy
    static public class TestContext {
        @Bean LogAspect aspect() {
            return new LogAspect(repository());
        }
        @Bean LogRepository repository(){
            return mock(LogRepository.class); // 검증용 객체를 application에다 등록
        }
        @Bean Runnable target(){
            return new Printer();
        }
    }
}
```

클래스 선언부분에서 `@ContextConfiguration(loader=AnnotationConfigContextLoader.class)` 를 붙이면 외부의 XML 대신 테스트 클래스 안에 포함된 JavaConfig로된 설정을 읽어올 수 있습니다. TestContext라는 내부 클래스에다 @Configuration을 붙여서 필요한 Bean을 등록했습니다.

@EnableAspectJAutoProxy 는 `<aop:aspectj-autoproxy/>`와 같은 역할을 하는 애노테이션입니다.

아래와 같의 ApplicationContext에 LogRepository는 mock()으로 생성한 가짜 객체를 등록했습니다.

```java
@Bean LogRepository repository(){
    return mock(LogRepository.class); // 검증용 객체를 application에다 등록
}
```

이 객체를 다시 Autowired로 받아온 후에 verify()를 했습니다. XML로 이와 비슷한 일을 하려면 코드가 더 길어지고, 별도의 파일로 분리가 됩니다. Mock을 Application에 등록하는 것이 바람직할지는 고민의 여지가 있지만 Aspect와 결합된 Proxy 클래스는 ApplicationContext를 통해야만 얻을 수 있고, 그 동작을 검증하고자 한다면 이 방식이 편하다고 느껴집니다.

여기서는 Printer객체를 target클래스로 사용했는데, 이 부분도 실제로 원하는 AOP 적용을 원하는 클래스나 제외 되어야할 클래스, 또는 직접 만든 테스트 전용 객체 등을 바꿔끼워가면서 다양한 조건을 검증할 수 있습니다.

덧붙여 `verify(repository).insertLog("method-execution:run");` 부분에서 문자열을 직접 검증하는 것도 바람직하지 못한 방식일지도 모릅니다. 문자열 대신에 Log정보를 담는 도메인 객체를 따로 정의했다면, 그 객체에 메시지에 핵심키를 담고, equals를 override했을 것 같습니다. 문자열을 직접 검증하면 메시지의 형식이 바뀔 때마다 테스트가 깨어져서 유지보수가 번거로운 테스트 코드가 됩니다. 이 예제에서는 코드를 짧게 하고 테스트 코드 안에서 검증하고자 하는 동작을 단순하게 나타내려고 이 방식을 택했습니다.

## Related
- [[spring]]
- [[spring-aop]]
- [[spring-mvc]]
- [[junit]]
- [[mock]]
- [[test]]
- [[file-upload]]
