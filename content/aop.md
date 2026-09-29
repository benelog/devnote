## AOP 용어
- [AOP](http://en.wikipedia.org/wiki/Aspect-oriented_programming) : 보안, 예외등과 같이 프로그램에 처리해야 하는 다양한 관점을 분리([Separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns))시키고 각각의 관점별로 구현을 한 후 이를 조합하여 완성된 프로그램을 만들고자 하는 개념. (참고자료1)
- 횡단관점([crosscutting concerns](http://en.wikipedia.org/wiki/Cross-cutting_concern)) : 분리된 모듈로 작성하기 힘든 시스템 전반적으로 산재된 기능(예로 보안, 로그, 인증)
- 핵심관점(main concern) : 해당시스템의 핵심가치와 목적이 드러난 관심영역 (primary concern, core concern)
- 조인포인트([join point](http://en.wikipedia.org/wiki/Join_point)) : 횡단 관심모듈의 기능이 삽입되어 호출될 수 있는 실행가능한 특정위치
- 포인트컷([point cut](http://en.wikipedia.org/wiki/Pointcut)) : 조인포인트의 집합. 어떤 클래스의 어느 조인포인트를 사용할 것인지 결정하는 선택 기능. Code와 advice를 연결해주는 설정정보.
- 어드바이스([advice](http://en.wikipedia.org/wiki/Advice_in_aspect-oriented_programming)) : 각 조인포인트에서 행하는 행위, 삽입될 수 있는 코드. cross-cutting concern을 구현한 코드.
- 조합(weaving) : 핵심관점코드와 어드바이스를 조합해 애플리케이션으로 완성하는 과정
- 기술적 용어로서의 asepct : Advice와 point-cut을 함께 지칭하는 단어

## AOP 설명자료
- [The Aspects Blog: The Ted Neward Challenge (AOP without the buzzwords)](http://www.aspectprogrammer.org/blogs/adrian/2004/05/the_ted_neward.html)

## 참고자료
1. 마이크로소프트웨어 2005/11 테크니컬 컬럼 - 객체지향을 넘어 관점지향으로 AOP (이일민)
2. 마이크로소프트웨어 2006/09 S/W로 여는 세상 - 관점지향의 개념잡기 -상황중심의 프로그래밍 (임백준)
3. 3번 자료에 대한 반론 - <http://toby.epril.com/?p=229> (이일민님의 블로그)
4. 마이크로소프트웨어 2007/03 Cover Story- OOP한계 극복패러다임 AOP (이일민,김백기,박재성, 류대원)
5. 위키페디아

## Java의 Dynamic Proxy를 이용한 AOP

### 모듈화만으로는 중복을 제거하기 힘든 코드들

```java
//시작시간기록
//로깅
//트랜잭선언
try{
    //트랜잭션 시작
    //핵심업무로직
    //커밋
} catch (Exception e){
    //트랜잭션 롤백
    //로깅 logger.error("...");
    //시스템 정의 Exception으로 다시 throw
}
//로깅
//종료시간기록, 수행시간 계산 로깅
```

위의 코드에서 핵심업무로직을 제외하고는 같은 코드일 경우에도 중복된 코드가 메서드마다 들어가야 하는가

### 공통적인 실행흐름을 가진 코드의 중복을 제거
- 클로저 (script 언어) (참고자료6)
- Command pattern (참고자료8)
- AOP 활용

### 대표적인 AOP framework
- AspectJ
  - java 언어를 확장. Aspectj 커맨드라인 컴파일러(ajc)필요
  - annotation or XML 으로 aspect 선언
  - 가장 오랜 역사, 풍부한 기능
  - 개발을 도와주는 도구로 이클립스 플러그인 ADJT가 있음
- Aspectwerkz
  - java언어를 확장하지 않은 일반 java클래스 사용
  - XML로 aspect 선언
  - AspectJ 1.5버전에 통합
- Spring AOP
  - 기존 java 클래스의 바이트코드를 수정하지 않고 java의 Dynamic proxy이용
  - annotation or XML 으로 aspect 선언
  - Spring 2.0에서는 AspectJ의 발달한 포인트 컷 언어를 차용
- JBoss AOP
  - java의 Dynamic proxy이용. 필요에 따라서 javaAssist를 통해 바이트 코드 조작.
  - annotation or XML 으로 aspect 선언
  - ejb 프로젝트에서 주로 사용

### IoC(Inversion Of Control)
- 프레임웍 vs 라이브러리 (참고자료7)
  - 프레임웍 : 프레임웍의 코드가 유저코드를 호출. 실행흐름을 프레임웍이 제어
  - 라이브러리 : 유저코드가 라이브러리를 호출. 실행흐름을 사용자가 제어

### Dynamic proxy를 이용한 간단한 AOP의 구현
참고자료1에서 구한 소스. 첨부파일( [proxy.zip](https://github.com/benelog/devnote/blob/master/attachments/135153_proxy.zip) )

#### 소스

```java
package proxy.sample1;

import java.lang.reflect.Proxy;

import proxy.sample1.ExceptionHandler;
import proxy.sample1.LoggingHandler;
import proxy.sample1.emp.EmpManager;
import proxy.sample1.emp.EmpManagerImpl;

public class ProxyTest
{
    /**
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception
    {
        EmpManager managerProxy = getServerObject(); //서버 객체를 얻어온다.
        managerProxy.printGreetingMessage("This is test");
    }

    /**
     * @return
     */
    private static EmpManager getServerObject() {
        ExceptionHandler exceptionHandler = new ExceptionHandler(new EmpManagerImpl());

        LoggingHandler logHandler = new LoggingHandler(Proxy.newProxyInstance(EmpManager.class.getClassLoader(),
                new Class[] { EmpManager.class }, exceptionHandler));

        EmpManager managerProxy = (EmpManager) Proxy.newProxyInstance(EmpManager.class.getClassLoader(),
                new Class[] { EmpManager.class }, logHandler);
        return managerProxy;
    }
}
```

```java
package proxy.sample1.emp;

public interface EmpManager
{
    public void printGreetingMessage(String message) throws Exception;
}
```

```java
package proxy.sample1.emp;

public class EmpManagerImpl implements EmpManager
{
    public void printGreetingMessage(String message) throws Exception
    {
        System.out.println( "Hi: " + message);
        throw new Exception("일부러 던진 에러 ");
    }
}
```

```java
package proxy.sample1;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class ExceptionHandler implements InvocationHandler
{
    Object targetObject;

    public ExceptionHandler(Object targetObject)
    {
        this.targetObject = targetObject;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable
    {
        try
        {
            return method.invoke(targetObject, args);
        }
        catch (Throwable e)
        {
            System.out.println("----------------------------------");
            System.out.println("메소드 호출  예외발생:[" + method + "], 에러 메세지[" + e.getMessage() + "]");
            System.out.println("----------------------------------");
            return null;
        }
    }
}
```

```java
package proxy.sample1;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class LoggingHandler implements InvocationHandler
{
    Object targetObject;

    public LoggingHandler(Object targetObject)
    {
        this.targetObject = targetObject;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable
    {
        try
        {
            System.out.println("----------------------------------");
            System.out.println("메소드 호출 Start:[" + method + "][" + System.currentTimeMillis() + "]");
            return method.invoke(targetObject, args);
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            System.out.println("메소드 호출 End:[" + method + "][" + System.currentTimeMillis() + "]");
            System.out.println("----------------------------------");
        }
    }
}
```

#### 실행결과
출력내용

```
----------------------------------
메소드 호출 Start:[public abstract void proxy.sample1.emp.EmpManager.printGreetingMessage(java.lang.String) throws java.lang.Exception][1182822105579]
Hi: This is test
----------------------------------
메소드 호출  예외발생:[public abstract void proxy.sample1.emp.EmpManager.printGreetingMessage(java.lang.String) throws java.lang.Exception], 에러 메세지[null]
----------------------------------
메소드 호출 End:[public abstract void proxy.sample1.emp.EmpManager.printGreetingMessage(java.lang.String) throws java.lang.Exception][1182822105579]
----------------------------------
```

EmpManagerImpl 에는 Hi: This is test를 출력하는 코드밖에 없었음에도 앞뒤의 로그와 Exception 처리를 하는 코드가 실행되었음.

### CGLib
- Code Generator Library
- 런타임시에 동적으로 클래스의 Proxy를 생성

### 참고자료
1. J2EE(POJO)컴포넌트 만들기 - 부록:AOP를 이용한 트랜잭션 처리 (김형준) (소스 <http://blog.naver.com/cookie_00/80023046477> )
2. 마이크로소프트웨어 2005/11 테크니컬 컬럼 - 객체지향을 넘어 관점지향으로 AOP (이일민)
3. 마이크로소프트웨어 2006/09 S/W로 여는 세상 - 관점지향의 개념잡기 -상황중심의 프로그래밍 (임백준)
4. 3번 자료에 대한 반론 - <http://toby.epril.com/?p=229> (이일민님의 블로그)
5. 마이크로소프트웨어 2007/03 Cover Story- OOP한계 극복패러다임 AOP (이일민,김백기,박재성, 류대원)
6. 마이크로소프트웨어 2007/03 프로그래밍 실전노트 - 클로저(코드 블록)의 개념과 유용성 (서광열)
7. 마이크로소프트웨어 2006/11 Coverd story1 -효율적인 프레임워크를 위한 프레임워크의 재발견 (이일민)
8. Head First DesignPatterns - 6장 Command Pattern (에릭 프리먼, 일리자베스 프리먼, 케이시 시에라, 버트베이츠)

- 첨부: ![횡단관점핵심관점](https://raw.githubusercontent.com/benelog/devnote/master/attachments/8083_%ED%9A%A1%EB%8B%A8%EA%B4%80%EC%A0%90%ED%95%B5%EC%8B%AC%EA%B4%80%EC%A0%90.gif)

## Related
- [[spring-aop]]
- [[design-pattern]]
- [[dependency-injection]]
- [[java-bytecode]]
- [[object-oriented]]
