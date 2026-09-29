스프링배치 연재 5편: ItemReader와 ItemWriter

## 읽기와 쓰기 API를 먼저 꺼내든 이유

어느 프레임웍이든 처음 적용할 때의 학습비용은 있고, 그것 때문에 생기는 진입장벽과 반발은 존재한다. 지금은 많이 쓰고 있는 웹의 MVC구조 프레임웍도 처음에는 너무 복잡하고, 왜 이런 구조를 써야 하는지 이해가 안 간다는 반응이 개발자들 사이에서는 많았었다. 물론 모든 상황에서 MVC구조의 프레임웍이 쓰여야 하는 것은 아니지만, 이제는 요즘에는 그런 프레임웍이 없이 개발한다는 것이 더 어색한 일이 되어 버렸다.
스프링배치의 경우도 마찬가지이다. 작년에 일본에서 있었던 스프링배치의 세미나에 참가한 어느 분의 후기를 읽은 적이 있었다. 그 글에서는 ‘hello world’를 찍는 간단한 프로그램에도 너무 많은 설정이 필요했고, 그 것이 왜 필요한지 발표하는 사람조차도 이해하지 못한다고 고백했다는 내용이 있었다.

스프링배치의 각 구성요소들의 역할과 필요성에 대해서 개발팀 내에서 충분히 공감이 되지 않는다면, 이것을 활용하고자 하는 자발적인 의지들을 이끌어 내기가 힘들다. 더군다나 웹 쪽의 프레임웍보다 배치 프레임웍이 그런 점에서 더 불리한 점은, 많은 개발자들이 배치프로그래밍은 간단하고 쉬운 일이라서 그냥 맨바닥에서 하는 코딩만으로 충분하다고 생각한다는 것이다. 실제로 간단한 배치 프로그램 몇 개가 도는 환경에서는 그게 맞을 수도 있다. 하지만, 배치 프로그램이 중요한 역할을 하는 시스템에서는 좀 더 고민을 해보아야 한다. 테스트와 디버깅, 모니터링을 하기 어려운 배치프로그래밍의 특성과 그 비용에 대해서는 과소평가하는 경향이 있다.

스프링배치를 통해서 배치 어플리케이션을 실행시킬 때는 Job 설정 부분을 빼놓고 이야기할 수 는 없다. 거기서 제공되는 실행, 재시도, 이벤트, 메타데이터 기록 등이 스프링배치의 핵심이라고도 할 수 있다. 하지만 그에 앞서 이번 시간에 읽기와 쓰기 API를 먼저 소개하는 이유는 자칫 그런 기능들이 스프링배치가 간단한 프로그램 하나를 만드는데도 너무 복잡하다는 선입견을 주지 않을까 하는 우려 때문이다.

이번 회에 소개하는 API들은 꼭 스프링배치의 전체 구조를 다 도입하지 않더라도 라이브러리 수준에서도 활용 가능한 것들이다. API의 구조가 눈에 잘 들어오도록 주로 Java코드를 통해서 API를 보여주도록 했다. 스프링에 대해서 조금이라도 아는 사람은 set메소드로 지정되는 속성들이 setter injection을 활용하면 언제라도 설정파일로도 코드를 대신할 수 있다는 것을 쉽게 이해할 것이다. 스프링 배치를 전체적으로 활용하기 위해서는 스프링배치가 정의하는 전체 job내부에서 이런 구성요소들을 넣어서 써야 한다. 하지만, 스프링배치 안에 이런 유용한 API가 있는 것을 개발팀에서 알리고, 라이브러리 활용부터 도입을 시작하는 것도 좋은 전략이 될 수 있겠다.

## ItemReader와 ItemWriter

지난 회에 설명한 대로 스프링배치에서는 처리할 데이터의 가장 작은 구성 요소를 ‘Item’이라고 부르고 있다. 이는 객체 하나, DB의 한 Row, Xml의 특정 element, Flat파일에서의 한 줄 등이 될 수 있다.

이 모든 Item들을 읽고 쓰는 API들은 ItemReader와 ItemWriter라는 인터페이스로 추상화 되어 있다. 그리고 자원을 열고 닫거나, 유지해야 할 정보가 있는 요소는 ItemStream이라는 인터페이스를 통해서 관리할 수 있다.

```java
public interface ItemReader{
    public Object read()  throws Exception;
    public void mark() throws MarkFailedException;
    public void reset() throws ResetFailedException;
}
```

리스트 1 : ItemReader 인터페이스

ItemReader의 read 메소드는 더 이상 읽을 Item이 없을 때는 null을 return하게 되어있다. 그리고 mark는 새로운 Item들의 묶음이 읽어지기 전에 호출되고, reset은 mark에 가장 최근에 호출된 위치로 읽는 위치를 되돌린다. 이 구조는 java.io.Reader와 유사하다. 이러한 특성은 배치 프로그램의 trasaction처리 때문에 중요하다. Mark는 보통 Chunk( 트랜잭션의 단위의 Item 묶음)의 읽기가 시작되기 전에 rollback에 대비해서 호출된다.

```java
public interface ItemWriter{
    public void write(Object obj) throws Exception;
    public void flush() throws FlushFailedException;
    public void clear() throws ClearFailedException;
}
```

리스트 2 : ItemWriter 인터페이스

ItemWriter의 writer메소드에서는 파라미터로 넘겨진 객체를 기록한다. Flush는 단어 그대로 가지고 있는 버퍼에 담긴 것을 flush하며, 보통 트랜잭션을 commit하기 직전에 호출된다. Clear는 버퍼에 남아 있는 내용을 삭제해 버리는데, 보통 트랜잭션의 rollback 전에 호출된다.

```java
public interface ItemStream {
  void open(ExecutionContext executionContext) throws StreamException;
  void update(ExecutionContext executionContext);
  void close(ExecutionContext executionContext) throws StreamException;
}
```

리스트 3 : ItemStream 인터페이스

ItemReader나 ItemWrite를 구현하는 클래스를 만들 때 파일을 열고 닫거나 , 네트워크 Connection을 얻고, 반환하는 등의 읽기, 쓰기를 위한 전후 작업이 필요한 경우가 있다. 그런 처리를 위해 ItemStream 인터페이스에서 open, close 메소드가 정의되어 있다. 전체 흐름 속에서 필요한 상태 정보는 ExecutionContext객체를 통해 저장된다. 나중에 자세히 설명될 내용이지만, Job의 재시도 시에 이전 실행정보를 참조하는 기능도 ExecutionContext를 이용하면 가능하다.

위의 규약만 맞춘다면 최종 개발자들이 필요한 ItemReader와 ItemWriter들을 얼마든지 정의할 수 있다. 표1,2에는 스프링배치에서 기본적으로 제공하는 ItemReader와 ItemWriter들을 구현한 클래스들이 정리되어 있다.

| **Item Reader** | **설명** |
|----|----|
| ListItemReader | Java.util.List 객체를 통해서 ItemReader를 구현. 테스트용으로 적합함. |
| ValidatingItemReader | DelegatingItemReade를 확장한 클래스로, 값을 반환하기 전에 validation을 수행할 수 있음. |
| AggregateItemReader | DelegatingItemReade를 확장한 클래스. Read 메소드의 결과로 java.util.Collection객체를 반환함. |
| DelegatingItemReader | 내부에 다른 ItemReader를가지고 있는 ItemReader |
| FlatFileItemReader | 플랫 파일을 읽어와서 read메소드에서 String을 반환함. Flat file에서 item을 읽어드리며, ItemStream을 구현하고 있음 |
| StaxEventItemReader | StAX를 통해서 XML파일에서 Item을 읽음 |
| JdbcCursorItemReader | JDBC를 이용해서 DB에서 Item을 읽어옴. |
| DrivingQueryItemReader | Driving query에 기반해 DB에서 조회를 함. |
| HibernateCursorItemReader | 하이버네이트의HQL을 사용해서 커서 기반으로 Item조회를 함. |
| IbatisDrivingQueryItemReader | iBatis를 통해 Driving query 기반으로 Item을 읽어 들임. |
| JmsItemReader | read메서드에서 javax.jms.Message객체를 반환. 스프링의 JmsOperations 객체의 receive메소드를 통해서 Item을 조회함 |

표1 : ItemReader를 구현한 클래스

| **Item Writer** | **설명** |
|----|----|
| CompositeItemWriter | Item을 List로 담겨진 여러 개의 ItemWriter에게 전달하여 처리한다. |
| DelegatingItemWriter | 내부에 다른 ItemWriter를 감싸고 있을 수 있는 ItemWriter. |
| PropertyExtractingDelegatingItemWriter | ItemWriter 인터페이스를 구현하지 않은 기존의 클래스를 ItemWriter로 쓰고자 할 때, 이 ItemWriter의 구현체를 써서 기존 클래스에 파라미터로 넘겨질 속성값들을 지정하고 실행할 수 있다. |
| ItemTransformerItemWriter | DelegatingItemWriter를 확장해서 Item을 write하기 전에 내부의 ItemTransformer의 doProcess를 수행해서 Item 객체의 변환 등을 처리할 수 있음. |
| FlatFileItemWriter | Item을 String으로 변환해서 Flat file에 쓸 수 있게 하는 ItemWriter |
| HibernateAwareItemWriter | 하이버네이트의 세션을 인식할 수 있는 ItemWriter |
| StaxEventWriterItemWriter | StAX를 이용해서 Item을 XML파일에 쓰는 ItemWriter |

표 2 : ItemWriter를 구현한 클래스들

정상혁

## Related

- [[spring-batch-series]]
