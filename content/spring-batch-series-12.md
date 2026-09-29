스프링배치 연재 12편: 이벤트 처리, 유효성 검사, 변환, 기존 클래스 활용

## 이벤트 처리

스프링배치에서는  Step 실행, 읽기, 쓰기, 트랜잭션의 시작과 끝이나 에러, 건너뛰기 등 다양한 시점에 실행될 수 있는 EventListner들이 제공되고 있다. 이를 이용하면 핵심처리 로직과 분리되어 유연한 흐름제어를 할 수 있게 된다.

Step내에서는 StepListener라는 인터페이스가 있고, 이를 상속한 StepExecutionListener 등의 인터페이스가 존재한다. StepListener자체는 아무런 메소드도 없이 marker interface 의 역할만 한다고 볼 수 있다. 리스트 5부터 9까지가 이를 인터페이스들의 모양을 보여준다. 메소드명만으로도 어느 시점이 각 메소드들이 호출되는지 알 수 있을 것이다.

```java
public interface StepExecutionListener extends StepListener {
  void beforeStep(StepExecution stepExecution);
  ExitStatus onErrorInStep(StepExecution stepExecution, Throwable e);
  ExitStatus afterStep(StepExecution stepExecution);
}
```

리스트 7 : StepExcutionListener인터페이스

```java
public interface ChunkListener extends StepListener {
  void beforeChunk();
  void afterChunk();
}
```

리스트 8 : ChunkListner 인터페이스

```java
public interface ItemReadListener extends StepListener {
  void beforeRead();
  void afterRead(Object item);
  void onReadError(Exception ex);
}
```

리스트 9 : ItemReadListener 인터페이스

```java
public interface ItemWriteListener extends StepListener {
  void beforeWrite(Object item);
  void afterWrite(Object item);
  void onWriteError(Exception ex, Object item);
}
```

리스트 10 : ItemWriteListener 인터페이스

```java
public interface SkipListener extends StepListener {
  void onSkipInRead(Throwable t);
  void onSkipInWrite(Object item, Throwable t);
}
```

리스트 11 : SkipListener 인터페이스

Listener의 등록은 Step선언 시에 SimpleStepFactoryBean의 listeners속성을 통해서 할 수 있다. 속성명만 보아도 알 수 있듯이 Listeners는 StepListener 클래스의 배열로 이루어져 있으므로, 역시나 여러 개를 설정할 수 있다. 그리고 ItemReader나 ItemWriter로 설정되는 클래스가 동시에 StepExecutionListener를 구현하고 있다면 SimpleStepFactoryBean에서 알아서 Listener로 등록해주므로 따로 listeners에 명시해 줄 필요는 없다.

StepExecutionListener에서는 Step실행의 선후 조건을 조사해서 Job을 실행을 멈추는 것도 가능하다. stepExecution을 참조할 수 있는 범위 내에서 아래 같이 terminatedOnly속성을 true로 해주면 Job을 멈출 수 있다.

```java
public class CustomItemWriter extends ItemListenerSupport implements StepListener {
    private StepExecution stepExecution;

    public void beforeStep(StepExecution stepExecution) {
        this.stepExecution = stepExecution;
    }

    public void afterRead(Object item) {
        if (isPoisonPill(item)) {
            stepExecution.setTerminateOnly(true);
       }
    }
}
```

리스트 12 : Job 멈추기 (스프링배치 레퍼런스 문서 중에서)

이와 같은 선언이 되었을 때 기본적인 정의된 동작은 JobInterruptedException을 발행시키는 것이다. 이를 바꾸고 싶다면 StepInterruptionPolicy 인터페이스를 구현한 클래스를 만들고 ItemOrientedStep에 setInterruptionPolicy 메소드로 그것을 넣어주면 된다.

이벤트의 활용예로 배치처리에서는 흔하게 파일에서 읽어온 내용을 DB에 입력할 때,DB의 primary key나 foreign key constraint 때문에 Exception이 떨어지는 것을 처리해야 할 경우가 있다. 그런 Exception은 전체 배치처리를 중단시키지 않고 해당 건만 따로 정해진 디렉토리에 파일만 쓰는 것으로 처리정책을 정했다고 가정해 보자. 일반적인 프로그램에서는 try 절을 이용해서 Exception을 잡고 catch 절 내에서 에러가 난 건을 파일로 써주는 모듈을 호출해야 할 것이다. 스프링배치를 사용한다면 리스트 2처럼 SkipLimitStepFactoryBean 을 이용한 Step선언을 사용하고 그 속성인 skippableExceptionClasses으로 DataIntegrityViolationException같이 그 상황에서 예상되는 Exception을 지정해 주면 된다. 그리고 리스트 9의 SkipListener를 구현해서 onSkipInWrite메소드 안에서 Skip한 건을 파일로 쓰는 모듈을 호출해주면 되는 것이다.

원하는 Listener를 구현할 때 그 중 일부 메소드만 구현하고 싶을 때는 StepListnerSupport, ItemListenerSupport와 같은 텅빈 구현체를 상속하면 약간의 편의를 얻을 수 있다.

## 유효성 검사

스프링배치에서는 ItemReader의 일종인 ValidatingItemReader를 통해 validation 기능을 제공한다. 리스트 13과 같이 선언을 할 수 있다.

```xml
<bean class="org.springframework.batch.item.validator.ValidatingItemReader">
  <property name="itemReader">
    <bean class="org.springframework.batch.sample.item.reader.OrderItemReader" />
  </property>
  <property name="validator" ref="validator" />
</bean>
```

리스트 13 : ValidatingItemReader설정

다른 ItemReader가 내부의 멤버객체로 구성되어 가지고 있으면서, 그 내부 ItemReader에서 읽어온 item을 validator객체로 검사하는 구조이다. 리스트 14에 나와 있는 내부의 read메서드를 보면 쉽게 그 과정이 눈에 들어올 것이다.

```java
public Object read() throws Exception {
  Object input = super.read();
  if(input != null){
    validator.validate(input);
  }
  return input;
}
```

리스트 14 : ValidatingItemReader의 read메서드

ValidatingItemReader가 가진 validator 속성의 인터페이스는 org.springframework.batch.item.validator.Validator이고, 다음과 같다.

```java
public interface Validator {
  void validate(Object value) throws ValidationException;
}
```

리스트 15 : 스프링배치의 Validator 인터페이스

굳이 패키지명을 길게 소개한 이유는, 스프링을 잘 아시는 분들이 오히려 이 인터페이스 이름만으로는 더 헷갈릴 수 있기 때문인데, 스프링에는 org.springframework.validation.Validator 라는 인터페이스도 있다.

```java
public interface Validator {
  public boolean supports(Class class1);
  public void validate(Object obj, Errors errors);
}
```

리스트 16 : 스프링 validation 패키지의 Validator 클래스

더욱 혼동이 올 수 있는 것은 스프링배치의 Validator 인터페이스의 구현체인 SpringValidator라는 클래스가 있고, 그 클래스에는 또 validator라는 속성이 있는데, 이 validator는 스프링 validation패키지안의 Validator라는 것이다. 즉, 스프링배치의 Validation기능은 원래 스프링 validation패키지 에서 제공하는 Validator에게 그 처리를 위임할 수 있다는 것이다. 스프링 validation패키지의 ValangValidator클래스를 이용하여 유효성 검사기준을 설정한 예는 리스트 19와 같다.

```xml
<bean id="validator"
  class="org.springframework.batch.item.validator.SpringValidator">
  <property name="validator">
    <bean
      class="org.springmodules.validation.valang.ValangValidator">
      <property name="valang">
        <value> <![CDATA[
          { playerId : length(?) < 13 : 'playerId too long' : 'playerId' : 12}
      ]]></value>
      </property>
    </bean>
  </property>
</bean>
```

리스트 17 : ValangValidator이용한 설정

Validator는 간단한 인터페이스이므로  사용자가 직접 쉽게 구현할 수도 있다.

## 아이템 변환하기

입력항목과 쓰기 항목의 속성들이 많이 다르고, 그 사이에 다소 복잡한 매핑규칙이 있다면 중간에 클래스를 따로 만들어서 Java로 코딩을 해주는 것이 더 편한 경우도 있을 것이다. 이렇게 ItemReader에서 읽은 item을 다른 객체로 매핑을 해야하는 경우 ItemWriter 중의 하나인 ItemTransformerItemWriter를 사용할 수 있다.

이 클래스도 다른 ItemWriter를 delegate라는 속성으로 지니고 있고, 변환작업을 하는 구성요소를 itemTransformer라는 속성으로 가지고 있다. 그 인터페이스는 리스트18과 같이 간단하다.

```java
public interface ItemTransformer {
    Object transform(Object item) throws Exception;
}
```

리스트 18 : ItemTransformer  인터페이스

ItemTransformerItemWriter에서의 write메서드의 호출과정은 먼저 itemTransformer를 통해 item객체를 변환시키고 delegate속성으로 지정된 다른 itemWriter 로 그 값을 쓰게 하는 것이다.

유사하게 CompositeItemTransformer 클래스도 있는데, 이 클래스에서는 setItemTransformers라는 메소드를 호출해서 itemTransformer들을 List로 여러 개 지정해서 연쇄적으로 호출할 수 있는 구조를 지원한다. 리스트 19에서 확인할 수 있듯이 itemTransformers에 들어간 순서대로 변환을 수행하는 것이다.

```java
public Object transform(Object item) throws Exception {
  Object result = item;
   for (Iterator iterator = itemTransformers.listIterator(); iterator.hasNext();) {
    result = ((ItemTransformer)iterator.next()).transform(result);
   }
   return result;
}
```

리스트 19 : CompositeItemTransformer 의 transform메소드

주의할점은 ItemWriter를 구현한 클래스가 동시에 ItemStream이나 StepExecutionListener를 구현했다면, 따로 streams속성이나 listeners속성에 등록해줄 필요가 없지만, ItemTransformerItemWriter안으로 한번 감싸져서 들어간다면 자동등록되지 않는다는 것이다. 예를 들어 Xml파일을 쓰는StaxEventItemWriter를 바로 ItemWriter로 쓸 때는 이 클래스가 InputStream을 구현한 클래스인데도 SimpleStepFactoryBean의 streams속성에 명시해줄 필요가 없지만, ItemTransformerItemWriter안의 delegate속성으로 들어갈 때는, 이를 Step설정에서도 streams에 따로 등록을 해줘야 한다.

## 기존 클래스 활용하기

개발하고 있는 시스템에서 기존에 작성된 클래스 중 ItemReader나 ItemWriter의 역할을 할 수 있는 것이 있다면, 추가로 래핑을 해주는 클래스를 작성을 할 필요 없이 설정만으로 활용이 가능하다. 즉, ItemReader 인터페이스를 구현하고 있는 클래스가 아니더라도, 메소드 호출시 하나씩 읽어온 Object를 반환하고 더 읽을 것이 없으면 null을 반환하는 ItemReader의 동작방식만 만족한다면 , 바로 쓸 수 있다는 것이다. ItemReader의 경우 ItemReaderAdapter를 이용해서 targetObject 속성에서 실행할 클래스의 bean선언을 참조하고, tagetMethod속성에서 ItemReader.read와 같은 역할을 하는 메소드를 적어준다.

```xml
<bean id="itemReader" class="org.springframework.batch.item.adapter.ItemReaderAdapter">
  <property name="targetObject" ref="fooService" />
  <property name="targetMethod" value="generateFoo" />
</bean>

<bean id="fooService" class="org.springframework.batch.item.sample.FooService" />
```

리스트 20 : ItemReaderAdapter기존 클래스 연결

기존 클래스를  ItemWriter로 활용할 때는 bean선언의 class부분에 org.springframework.batch.item.adapter.ItemWriterAdapter 을 지정하고 마찬가지의 방식으로 targetObject와 targetMethod를 지정하면 된다.

정상혁

## Related

- [[spring-batch-series]]
