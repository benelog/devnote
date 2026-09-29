스프링배치 연재 15편: 하이버네이트 활용과 여러파일 읽기

## 하이버네이트의 활용

HibernateCursorItemReader 를 사용하면 하이버네이트를 사용하면서도, 지난 연재에서 소개했던 JdbcCurItemReader와 유사한 커서방식의 조회가 가능하다. 설정의 예는 리스트 8에 나와있다.

```xml
<bean id="hibernateItemReader"   class="org.springframework.batch.item.database.HibernateCursorItemReader">
    <property name="useStatelessSession" value="true" />
    <property name="queryString" value="from player" />
    <property name="sessionFactory" ref="sessionFactory" />
</bean>
```

리스트 8 : 하이버네이트를 이용한 조회

sessionFactory 속성은 스프링에서 기본적으로 제공하는 LocalSessionFactoryBean 를 이용해서 설정한다. useStatelessSession 속성에 따라서 상태를 가지거나 안 가지는 Session이 생성된다. useStatelessSession과 queryString이 하이버네이트의 코드와 어떻게 연결되는지는 리스트9에 있는 Query를 생성하는 부분을 보면 알 수 있다. StatelessSession이라면 하이버네이트에서 제공하는 Cache 와 Dirty체크 기능을 쓰지 않게 된다.

```java
private Query createQuery() {
  if (useStatelessSession) {
    statelessSession = sessionFactory.openStatelessSession();
    return statelessSession.createQuery(queryString);
  } else {
    statefulSession = sessionFactory.openSession();
    return statefulSession.createQuery(queryString);
  }
}
```

리스트 9 : 하이버테이트와 연결되는 부분

하이버네이트를 이용해서 DB에 자료를 저장하고 싶을 때도 HibernateAwareItemWriter라는 클래스도 도움을 줄 수 있다. 리스트9에 나와있듯이, 이 클래스에도 마찬가지로 sessionFactory를 속성으로 지정하고, 다른 하이버네이트를 쓰는 ItemWriter를 delegate에 연결시킨다.

```xml
<bean id="hibernateItemWriter"
  class="org.springframework.batch.item.database.HibernateAwareItemWriter">
  <property name="sessionFactory" ref="sessionFactory" />
  <property name="delegate" ref="playerWriter" />
</bean>
```

리스트 10 : 하이버네이트를 인식하는 ItemWriter

HibernateAwareItemWriter는 트랜잭션의 한 묶음이 한꺼번에 commit 되었을 때 실패가 일어난다면, 어떤 item이 실패인지 알아보기 위해 실패한 묶음을 다시 한건 한건 쓰기 시도를 해준다. Jdbc의 batchUpdate를 이용하는 ItemWriter인 BatchSqlUpdateItemWriter의 경우에도 마찬가지의 흐름을 가진다.

## 여러 파일 읽기

앞 선 연재에서 소개한 FlatFileItemReader 같은 파일읽기 클래스들은 읽을 파일을 resource속성을 통해서 지정한다. 실무에서는 읽어서 처리할 파일이 하나가 아니고 특정 디렉토리에 있는 파일 전체나 아니면 특정 확장자, 이름패턴을 가지고 있는 경우가 대부분일 것이다. MultiResourceItemReader클래스는 와일드 카드등을 이용해서 여러 파일들을 한꺼번에 지정할 수 있다. 리스트 11과 같이 resources 속성으로 파일들을 읽을 패턴을 지정하고, delegate속성에 그 resource를 읽을 itemReader를 연결시켜 준다.

```xml
<bean id="multiResourceReader" class="org.springframework.batch.item.file.MultiResourceItemReader">
  <property name="resources" value="classpath:data/multiResourceJob/input/file-*.txt" />
  <property name="delegate" ref="flatFileItemReader" />
</bean>
```

리스트 11 : 여러파일 읽기

정상혁

## Related

- [[spring-batch-series]]
