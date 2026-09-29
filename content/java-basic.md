- [\[Java](http://blog.hazard.kr/archives/778) 제네릭의 비애\]

## Java 기본
- [Java Anti-Patterns](http://www.odi.ch/prog/design/newbies.php#1)

### Java.util
- [Iterating HashMap Tip](http://blog.naver.com/dbjava/100006583102)

### Enumeration
- [Enumeration](http://blog.naver.com/phrack/80036066888)

```java
public enum OilProduct {
    GASOLINE("휘발유", 1), HIGH_GRADE_GASOLINE("고급휘발유", 2), DIESEL("경유", 3);

    private String name;
    private int productId;
    private static Map<Integer, OilProduct> enumMap = new HashMap<Integer, OilProduct>();

    static {
        for (OilProduct each : OilProduct.values()) {
            enumMap.put(each.getProductId(), each);
        }
    }

    private OilProduct(String name, int productId) {
        this.name = name;
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public int getProductId() {
        return productId;
    }

    public static OilProduct fromProductId(int id) {
        OilProduct matched = enumMap.get(id);
        if (matched == null) {
            throw new IllegalArgumentException("cannot find OilProduct for productId:" + id);
        }
        return matched;
    }
}
```

### Reflection
- Using Java Reflection (번역 : [Java Reflection 의 사용](http://blog.naver.com/jukjuk7/40022417670) )
- [Java programming dynamics, Part 2: Introducing reflection](http://blog.naver.com/sofangel/60003423724)

introspection : 객체 내부의 상태나 그 상태정보를 수집하고 변경하는 행위 모두

reflection :

우리가 프로그래밍하는 언어는 컴퓨터의 자원을 이름과 식별자로 추상화한 개념을 사용한다. 실제로 이름과 식별자가 커퓨터의 자원으로 구체화되는 과정을 바인딩이라 부른다. 구체화되는 과정에서 바인딩하는 시점은 언어 정의시간, 언어 구현시간 ,번역시간 ,실행시간 네 가지로 구분된다. 여기서 언어 정의시간, 언어 구현시간과 번역 시간에 구체화 되면 이른 바인딩(early binding)이라고 부르고, 실행시간에 구체화되면 늦은 바인딩(late binding)이라고 부른다. 또 번역 시간을 정적 바인딩(static binding), 실행시간을 동적바인딩(dynamic binding)이라고 부르는데 자바에서는 늦은 바인딩을리플렉션이라고 부른다.

### 기본적인 클래스 로딩 예외
(Exception)

### Static
Logging/StaticLog (원문 )

### 기타
Classname.class causes class initialization

- <http://www.javakb.com/Uwe/Forum.aspx/java-tools/451/Eclipse-mthclass-problem>
- <http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4419673>

Overriding vs Hiding

Defenseive copying <http://www.javapractices.com/Topic15.cjp>

Cloning

- <http://www.adtmag.com/java/articleold.aspx?id=223>
- <http://www.adtmag.com/java/articleold.aspx?id=364>
- [Double Brace Initialization](http://www.c2.com/cgi/wiki?DoubleBraceInitialization)

## Java Bean
Spec: <http://java.sun.com/javase/technologies/desktop/javabeans/index.jsp>

## Generics
- Effective Java 2nd Edition
- Agile Java
- <http://www.ibm.com/developerworks/java/library/j-jtp07018.html>
- [Super Type Tokens](http://gafter.blogspot.com/2006/12/super-type-tokens.html)
- [Generics gotchas](http://www.ibm.com/developerworks/java/library/j-jtp01255.html)

일반적으로 자바 컴파일러는 입력변수로 주어진 제네릭 자료형에 대해서는 와일드카드의 하한경계를 지정함으로써(super 키워드 사용) 자료형의 제약을 풀수 있고, 반환유형으로 주어진 제네릭 자료형에 대해서는 와일드카드의 상한경계(extends 키워드 사용)를 지정함으로써 자료형의 제약을 풀 수 있다.

새 인스턴스 생성

```java
public static <T> T createObject(Class<T> clazz) throws Exception{
    return clazz.newInstance();
}
```

### Effective Java 2nd Edition
**Item 23: Don't use raw types in new code**

Raw type을 사용한다면 genercis를 사용할 때의 장점인 안전성과 표현력을 다 잃어버린다.

List\<String\>은 List\<Object\>의 하위 클래스가 아니다.

**Item 24: Eliminate unchecked Warnings**

할 수 있는 모든 warning을 제거하고, 그렇게 할 수 없는 것은 @SupressWarnings("unchecked") annotation을 가능한한 가장 좁은 범위로 선언하고, 그렇게 해도 안전한 이유를 주석으로 달아라.

**Item 25 : Prefer lists to arrays**

```java
public static <T extends Comparable<? super T>> T max(List<T> list){
    Iterator<? extends T> i = list.iterator();
    T result = i.next();
    while(i.hasNext()){
        T t = i.next();
        if (t.compareTo(result)>0) result = t;
    }
    return result;
}
```

## Java Serialization
- [Serializable 인터페이스의 구현 의미](http://blog.naver.com/knbawe/110011193602)
- <http://java.sun.com/j2se/1.5.0/docs/guide/serialization/spec/serialTOC.html>
- <http://java.sun.com/j2se/1.5.0/docs/guide/serialization/spec/version.html#9419>

### 대체
- <http://wiki.github.com/eishay/jvm-serializers/>

## Java assertion
### JAVA Assertion & 1.4 버전 이하에서의 구현
debug를 쉽게하는 습관으로 assertion을 쓰는 것이 많이 권장되고 있습니다.

김익환 저 '대한민국에는 소프트웨어가 없다'라는 책을 보면 후반부에 프로그래밍 팁들을 소개하는 글에서

'여기에 적혀 있는 예제들 중에 지금 하나라도 사용하고 있으면, 당신은 꽤 수준 높은 프로그래머 이거나 혹은 당신이 근무하는 회사가 꽤 괜찮은 회사라 할 수 있겠다.'

라고 말하는데, 그 예가 되는 소제목 중의 하나로 'assert를 아는가?'를 뽑고 있습니다. 이런말 들으니까 한번 공부해 보고 싶지 않나요? ^^;

이 책에 나와 있는 assert의 구현은 1.4 버전 이하를 기준으로 한 것 같습니다. 책에 나와 있는 예를 보면

```java
class Debug{
    public static void assert(boolean status){
        if (status == true) {
            return;
        } else {
            Exception ex= new Exception("Assert 오류");
            ex.printStackTrace();  // Assert한 위치를 알려준다.
            System.exit(-1);        // 프로그램을 종료한다.
        }
    }
}
```

으로 정의하고 다른 클래스의 중간에서

```java
Debug.assert (numofUsers<0);
```

의 식으로 사용하고 있습니다.. 비슷한 방식으로 각자 취향에 맞게 간단히 만들어서 쓰면 되겠죠.

하지만 JDK1.4에서는 편하게 이런 기능이 기본으로 제공되고, JVM에서 assetion을 on, off 할 수 있는 기능등 디버깅을 위한 여러가지 편리한 옵션들이 추가되어 있군요.

첨부파일로 되어 있는 자료를 참고하시길 바랍니다.

어디에서 다운 받은건지 출처는 불분명하군요.. 저작권 문제도 잘 모르겠습니다..; 아 파일에 나와 있는 내용으로는 명시된 것이 없기에 그냥 올립니다.

## Java compile과 실행
```text
[java 컴파일 및 실행]

1.Compile
  javac -d classdirectory source_name.java
  : source_name 클래스파일은 -d option에 지정된 classdirectory에 생성됩니다.
  javac source_name.java
  : source_name 클래스파일은 javac가 실행되는 디렉토리에 생성됩니다.

2.run
  java source_name(class file)
  : java는 classpath에 있는 class들중 sourcename.class가 있는지를
    찾아 실행합니다. 이 때, classpath에 sourcename.class가 없다면
    ClassNotFoundException이 발생합니다.
  java -classpath classdirectory source_name(class file)
  : java는 실행환경의 classpath 및 옵션에 있는 classdirectory를 찾아
    source_name.class파일을 찾아 실행합니다.

3.exmaples
  1>compile
      c:\src\javac Hello.java
   -> c:\src\Hello.class
  2>run
      c:\src\java Hello
   -> Exception in thread "main" java.lang.NoClassDefFoundError: Hello
      라는 Exception 발생.
      이유는 Hello.class파일이 있는  c:\src가 classpath에 설정되어 있지
      않기 때문입니다.
   -> 실행방법
      c:\src\java -classpath . Hello
      java의 실행옵션중 classpath를 현재 디렉토리로 설정하면 classpath로
      현재 디렉토리가 설정되므로 Hello.class파일을 찾아 실행 할 수 있습니다.
      or
      c:\src\set classpath=.;%classpath%
      c:\src\java Hello
      system의 환경변수로 classpath를 설정한 후 실행을 하면
      Hello.class파일을 system의 classpath에서 찾아 실행 할 수 있습니다.
```

### Package 사용법
**1) package 묶기**

1-1)컴파일

-d 옵션을 이용해서 패키지 이름으로 지정된 디렉토리를 생성하도록 한다.

```sh
javac -d . 파일명.java
```

1-2) jar 파일 만들기

jar cvf 묶을 파일명.jar 디렉토리의 형식으로 패키지를 jar파일로 묶을 수 있다.

```sh
c:\temp\>jar cvf tv.jar com
```

(com디렉토리 밑의 파일들을 tv.jar라는 파일로 묶음)

참고: manifest.txt . default package 위치에 저장

```text
Main-Class: 메인클래스명 (예> Main-Class: net.nodelib.SimpleWindow)
```

- <http://blog.naver.com/echris7/140012453284>

**2) package 다운 받아서 사용하기**

2-1) javac의 -classpath 옵션이용

컴파일시 javac -classpath 패스명 소스명.java 로 컴파일한다.

```sh
c:\temp\>javac -classpath tv.jar MyApp.java
```

(MyApp에서 import할 패키지가 tv.jar에 묶어있다.)

2-2) jre의 지정디렉토리에 복사

jdk가 설치된 디렉토리 밑의 jre\lib\ext 디렉토리에 jar파일을 복사하면, javac와 java에서 옵션없이 컴파일하고 실행할 수 있다.

예) jdk가 C:\j2sdk1.4.1_02\>에 설치되어 있을 때 C:\j2sdk1.4.1_02\jre\lib\ext\>에 복사하면 된다.

2-3)환경변수 이용

바탕화면-내컴퓨터-등록정보-고급-환경변수에서 System 변수에 classspath를 추가한다.

여기서 현재 디렉토리를 의미하는 '.;'을 앞에 추가하고 반드시 jar파일명까지 확장자를 포함하여 작성한다.

```text
;c:\j2sdk1.4.1_04\bin;.;
```

';'문자는 다른 디렉토리와의 구분을 위한 것이다.

Command line 환경에서는 다음의 명령어로 대체할 수 있다.

```bat
path= c:\j2sdk1.4.1_04\bin; .;
```

이를 타이핑하거나 autoexec.bat와 같은 배치파일을 활용해서 설정할 수 있다.

만약 다른 path가 설정되어 있는 경우는 다음과 같은 명령으로 패스를 추가할 수 있다.

```bat
path= %path%; c:\j2sdk1.4.1_04\bin; .;
```

%path%는 현재의 path변수값을 나타내는 변수이다.

## Java 배열 복사
```java
public class Test
{
    public static void main(String[] args)
    {
        int[] source = {1,2,3,4,5};
        int[] target = (int[])source.clone();

        for(int i = 0 ; i < target.length; i++)
            System.out.println(target[i]);
    }
}
```

## Javadoc
- APIViz

## Children
- [[java-basic-summary]]

## Related
- [[logging]]
