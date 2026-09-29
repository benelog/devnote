## Advisor = Advice + PointCut

### Advice
- MethodInterceptor
- MethodBeforeAdvice
- AfterReturningAdvice
- IntroductionAdvice(AroundAdvice)
- ThrowsAdvice

### PointCut
- JdkRegexpMethodPointcut
  - 예: `.*writer.*`
- Perl5RegexpMethodPointCut
- NameMatchMethodPointcut
- ComposablePointCut
- ControlFlowPointCut
- StaticMethodMAtcherPointCut
- DynamicMethodMatcherPointCut
- AspectJExpressionPointCut

### Advisor
- DefaultPointcutAdvisor : advice, pointcut 지정
- RegexpMethodPointCutAdvisor (pointcut 설정 통합)
- ProxyFactory
  - setTarget, addAdvisor

### ProxyFactoryBean
- setTartget : 지정될 대상
- setInterceptorNames : advisor나 advice 지정. advice면 모든 joinpoint에 적용됨.

### AutoProxyCreator
- BeanNameAutoProxyCreator
  - .setBeanNames, .setInterceptorNames
- DefaultAdvisorAutoProxyCreator

## AOP with POJO
- `public Object logging(ProceedingJoinPoint jp)`
- ProceedingJoinPoint
  - .proceed()
  - .getSignature()

## 설명자료
- [Spring AOP의 로깅과 성능 측정용 Interceptor](http://blog.naver.com/haruma95/80048640079)
- [InsideSpring (2) AutoProxyCreator는 Pointcut의 ClassFilter만 사용하지 않는다](http://toby.epril.com/?p=857)

## CGLib
런타임 바이트코드 생성을 통해서 동적으로 생성된 하위클래스가 메서드를 오버라이드..

- [Spring aop without java interface](http://blog.naver.com/aircook?Redirect=Log&logNo=90022123126)
- <http://tong.nate.com/multiple/37485351>
- proxyTargetClass 속성이 true이면 cglib를 씀
- <http://static.springframework.org/spring/docs/1.2.x/api/org/springframework/aop/framework/ProxyFactoryBean.html#setProxyInterfaces(java.lang.String[])>
- <http://static.springframework.org/spring/docs/2.0.x/reference/aop-api.html#aop-pfb>
- <http://static.springframework.org/spring/docs/2.0.x/reference/aop-api.html#aop-pfb-proxy-types>

## 성능측정
- org.springframework.aop.interceptor.JamonPerformanceMonitorInterceptor

## Compile time weaving
- AnnotationTransactionAspect

## Spring AOP namespace 예제
- [Spring 2.0의 AOP](http://javacan.tistory.com/entry/128)

### Pointcut 식 예제

```xml
<aop:config>
    <aop:advisor
        pointcut="execution(public * com.benelog.server..*.*BO.*(..))"
        advice-ref="txAdvice"/>
</aop:config>
<aop:config>
    <aop: id="logginAspect" ref="logAdvice">
        <aop:before method="doBasicLogging"
            pointcut="execution(public * com.benelog.server..*.*BO.*(..))"/>
    </aop:aspect>
</aop:config>
```

```xml
<aop:config>
  <aop:pointcut id="servicePointcut" expression="execution(* *..*Service.*(..))"/>
  <aop:aspect id="loggingAspect" ref="logging">
    <aop around pointcut-ref="servicePointcut" method="logging"/>
  </aop:aspect>
</aop:config>
```

- aop:before
- aop:after-returning
- aop:after-throwing
- aop:after
- aop:around

```xml
<bean id="logAdvice" class="com.nhncorp.intostatic.common.ProcessorLogAdvice" />
```

- `execution(public void set*(..))` : 리턴 타입이 void이고 메소드 이름이 set으로 시작되고 파라미터가 0개 이상인 메소드
- `execution(* com.benelog.ftpserver.*.*()` : com.benelog.ftpserver패키지의 파라미터가 없는 모든 메소드
- `execution(String com.benelog.ftpserver..*.*(..)` : 리턴타입이 String이면서 com.benelog.ftpserver패키지 및 하위 패키지에 있는 파라미터가 0개 이상인 메소드
- `execution(String com.benelog.ftpserver.Server.insert(..)` : 리턴타입이 String인 com.benelog.intostatic.ftpserver.Server의 파라미터가 0개 이상인 메소드
- `execution(* get*(*))` : get으로 이름이 시작하고 1개의 파라미터를 갖는 메소드
- `execution(* get*(*,*))` : get으로 이름이 시작하고 2개의 파라미터를 갖는 메소드
- `exceution(* read*(Interger,...))` : read로 이름이 시작하고, 첫번째 파라미터 타입이 Integer이며, 1개 이상의 파라미터를 갖는 메소드

### LogAdvice

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.JoinPoint;

public class ProcessorLogAdvice {

    private final static Log LOG = LogFactory.getLog(ProcessorLogAdvice.class);

    public void doBasicLogging(JoinPoint pjp) throws Throwable {
        Object[] args = pjp.getArgs();
        StringBuffer output = new StringBuffer();
        output.append(pjp.getTarget().getClass().getName());
        output.append(": ");
        output.append(pjp.toShortString());
        output.append(": ");
        for (int i = 0; i < args.length; i++) {
            output.append(args[i]);
            output.append(' ');
        }
        LOG.info("Basic: " + output.toString());
    }

    /**
     * @param item - item
     */
    public void doStronglyTypedLogging(Object item) {
        LOG.info("Processed: " + item);
    }
}
```

## Spring AOP의 Aspect에서 order 값에 따른 적용순서 확인해보기
Spring AOP에서 동일한 target클래스에 결합되는 Aspect의 우선순위는 Ordered 인터페이스를 구현하거나 @Order 애노테이션으로 지정합니다.

아래와 같은 방식입니다.

```java
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;

@Aspect
@Order(1)
public class OrderOneAspect {
    @Before("execution(void *.run())")
    public void printOrder(JoinPoint jp){
        System.out.println("order 1");
    }
}
```

```java
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.Ordered;

@Aspect
public class OrderTwoAspect implements Ordered{
    @Before("execution(void *.run())")
    public void printOrder(JoinPoint jp){
        System.out.println("order 2");
    }
    public int getOrder() {
        return 2;
    }
}
```

OrderOneAspect 은 애노테이션으로, OrderTwoAspect은 인터페이스로 order 값을 선언했습니다.

Ordered 인터페이스의 javadoc에 보면 order의 숫자 값이 작을수록 우선 순위가 높다고 적혀 있습니다.

> The actual order can be interpreted as prioritization, with the first object (with the lowest order value) having the highest priority.

그렇다면 AOP에서는 여러개의 Aspect를 엮을 때 order값을 낮게 선언한 Aspect가 먼저 실행될까요?

한번 테스트코드를 짜봤습니다. 위의 OrderOneAspect , OrderTwoAspect와 함께, 각각 0과 -1의 order를 가지는 Aspect를 더 추가했습니다.

```java
....

@Aspect
@Order(0)
public class OrderZeroAspect {
    @Before("execution(void *.run())")
    public void printOrder(JoinPoint jp){
        System.out.println("order 0");
    }
}
```

```java
....

@Aspect
@Order(-1)
public class OrderMinusOneAspect {
    @Before("execution(void *.run())")
    public void printOrder(JoinPoint jp){
        System.out.println("order -1");
    }
}
```

그리고 Target클래스와 Proxy를 만들어줄 설정을 javaConfig를 이용해서 추가합니다.

```java
public class MainBeans {
    @Bean
    public ProxyConfig proxyCreator(){
        return new AspectJAwareAdvisorAutoProxyCreator();
    }
    @Bean
    public Runnable main(){
        return new Runnable(){
            public void run() {
                System.out.println("target executed");
            }
        };
    }
}
```

Aspect는 모두 "before" Advice로 그 Aspect의 order 값을 찍도록했고, 적용대상인 클래스는 단순히 "target executed"를 출력합니다. 출력창에 찍힌 내용을 보면 어떤 순서로 Aspect가 적용되는지 보입니다.

모두 ApplicationContext에 등록해서 Target클래스를 출력하는 테스트 코드를 만들었습니다.

```java
public class AspectOrderTest {
    @Test
    public void checkOrder() throws Exception {
        GenericApplicationContext context =
            new AnnotationConfigApplicationContext(
                OrderZeroAspect.class,
                OrderMinusOneAspect.class,
                OrderTwoAspect.class,
                OrderOneAspect.class,
                MainBeans.class);
        Runnable printer = context.getBean(Runnable.class);
        printer.run();
    }
}
```

출력 결과는 아래와 같습니다.

```
order 2
order 1
order 0
order -1
target executed
```

Order의 숫자가 큰 값이 먼저 나옵니다. 큰 Order 값인, 낮은 우선 순위인 Aspect가 먼저 실행되었다는 결과입니다. 제가 처음에 매뉴얼만 보고 이해한 의미와는 반대의 결과였습니다. 제가 설정을 잘못한 부분이 있는지도 모르겠지만, 이 결과만을 해석을 해보겠습니다.

Aspect에서 우선순위가 높다는 의미는 '안쪽의 proxy가 된다.'는 의미입니다. 즉, Proxy를 만들 때 Order값이 작은, 우선 순위가 높은 Aspect부터 먼저 Proxy를 만들고, 그 뒤에 다음 우선순위의 proxy들을 차례로 입혀갑니다. 그러니 'before' 나 'Around'Advice라면 가장 바깥 쪽에 Proxy로 입혀진 , order값이 큰, 우선순위가 낮은 Aspect의 코드가 먼저 실행됩니다.

정리하면, Order값 숫자가 작을수록 우선 순위가 높아지고, 우선 적용되어서 더 안 쪽에서 감싸지는 proxy가 되어서 타겟 Object의 코드와 붙어있는 Apspect가 된다는 의미입니다. 즉, Aspect 설정에서 order값의 숫자가 클 수록 target객체에서 더 멀어지는 바깥 쪽의 Proxy로 결합됩니다.

## Related
- [[aop]]
- [[spring]]
- [[spring-container]]
- [[spring-test]]
- [[java-bytecode]]
