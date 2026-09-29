스프링배치 연재 7편: XML 파일 읽기와 쓰기

## XML 파일 읽기

스프링 배치에서는 StAX(Streaming API for XML) 기반의 대용량 XML파일 처리를 지원한다. StAX 는 JAXP 1.4의 일부분으로 JSR-173에 기초하고 있다. SAX와 마찬가지로 event방식이지만 call back method가 아닌 pull-based approach이기 때문에 이를 사용하는 개발자가 parsing process의 제어권을 가지고 있다는 장점이 있고, 일정한 메모리양만을 사용해서 무한정 용량을 처리할 수 있다. 참조구현체에 대한 정보는 에서 얻을 수 있다.

스프링포트폴리오 중에는 XML웹서비스의 구현을 돕는 Spring-WS라는 프로젝트가 있다. 여기에서 XML과 객체를 매핑하는 Spring OXM(Object-XML Mapping)라는 프레임웍을 제공한다. Spring OXM은 특정 parsing API에 종속적이지 않게 추상화되어 있고, 여러 오픈소스 XML 처리 API들과 연결할 수 있는 클래스들을 제공한다. Jaxb2, XStream, [XmlBeans](http://xmlbeans.apache.org/), [Caster](http://www.castor.org/) , [Jibx](http://jibx.sourceforge.net/) 등 다양한 오픈 소스 API들을 활용할 수 있다. 예를 들면 org.springframework.oxm.Unmarshaller 인터페이스를 통해 Xml을 객체로 unmarshalling을 하는 동작을 추상화 시키고 있고, 이를 구현하는 Jaxb1Marshaller, CastorMarshaller, XmlBeansMarshaller, JibxMarshaller, XStreamMarshaller 등을 제공하는 것이다. 스프링배치에서는 Spring-OXM를 통해서 XML 처리를 위임할 수 있기 때문에 위의 클래스들을 모두 활용 가능하다.

XML파일 읽기를 처리하는 StaxEventItemReader 클래스는 아래의 속성들을 가지고 있다.

- resource (org.springframework.core.io.Resource): 읽어드릴 데이터의 위치를 지정(파일이나 URL 등)
- fragmentRootElementName (String): 하나의 Item을 나타내는 루트 엘리먼트의 태그이름
- fragmentDeserializer (org.springframework.batch.item.xml.EventReaderDeserializer) :Xml 조각을 객체로 매핑해주는 동작이 정의된 인터페이스

StaxEventItemReader를 설정하는 예는 다음과 같다.

```xml
<bean class="org.springframework.batch.io.xml.StaxEventItemReader">
  <property name="fragmentRootElementName"  value="person" />
  <property name="resource" value="d:/person.xml" />
  <property name="fragmentDeserializer">
    <bean class="org.springframework.batch.io.xml.oxm.UnmarshallingEventReaderDeserializer">
      <constructor-arg>
        <bean class="org.springframework.oxm.xstream.XStreamMarshaller">
          <property name="aliases" ref="aliases" />
        </bean>
      </constructor-arg>
    </bean>
  </property>
</bean>

<util:map id="aliases">
  <entry key="person" value="sample.Person" />
  <entry key="id" value="java.lang.String" />
  <entry key="name" value="java.lang.String" />
  <entry key="age" value="java.lang.Integer" />
</util:map>
```

리스트 17 : StaxEventItemReader 설정 예제

```xml
<person>
  <id>benelog</id><name>정상혁</name><age>30</age>
</person>
```

리스트 18 : 읽을 XML 파일

위의 예제는 XStream API를 이용하여 읽기를 수행한다. XStreamMarshaller를 통해서 XStream API와 연결을 하고, 객체와 XML의 매핑정보는 Map에 담아서 전달된다. Person객체는 id, name, age 속성을 가지고 있는 Domain Object이다. 위의 설정을 코딩으로 한다면 그 일부는 아래와 같을 것이다.

```java
staxEventItemReader.setResource(resource);
Map aliases = new HashMap();
aliases.put("person","sample.Person");
aliases.put("id","java.lang.String");
aliases.put("name","java.lang.String");
aliases.put("age","java.lang.Integer");
XStreamMarshaller marshaller = new XStreamMarshaller();
marshaller.setAliases(aliases);
staxEventItemReader.setFragmentDeserializer(new UnmarshallingEventReaderDeserializer(marshaller));
staxEventItemReader.setFragmentRootElementName("trade");
```

리스트 19 : StaxEventReader 호출해 보기

aliases 맵에 들어가는 value값은 String형식으로 클래스명을 지정할 수도 있고 java.lang.Class 형식을 그대로 넘겨도 된다. StaxEventItemReader의 속성 중 XML조각의 파싱을 담당하는 멤버인 fragmentDeserializer에다가 UnmarshallingEventReaderDeserializer을 지정한다. 이 클래스는 Spring OXM의 하위패키지에 있는 Unmarshaller라는 인터페이스를 구현한 클래스를 파라미터로 받는 생성자를 가진다.

```java
public UnmarshallingEventReaderDeserializer(Unmarshaller unmarshaller)  {
    Assert.notNull(unmarshaller);
    this.unmarshaller = unmarshaller;
}
```

리스트 20 : UnmarshallingEventReaderDeserializer의 생성자

실제 Xml 조각의 파싱은 Spring OXM의 Unmarshaller에 위임되는 것이다. 그 Unmarshaller를 구현하는 클래스들이 위에서 언급한 Caster, Jaxb1, Jaxb2, XmlBeans 등을 활용한 구현클래스들이 제공된다. 예제에서는 이 중에 XStream을 사용하는 XStreamMarshaller 클래스를 사용했고, XML의 태그명과 객체 정보를 맵에다 넣어서 allias라는 속성에 지정해 준다.

XStream에 대한 자세한 정보는 를 참조하기 바란다.

## XML 파일 쓰기

플랫파일과 마찬가지로 XML파일 쓰기는 읽기와 반대되는 구성요소로 대응된다. fragmentDeserializer 대신에 org.springframework.batch.item.xml.EventWriterSerializer 를 구현하는 serializer가 속성으로 사용된다.

```xml
<bean class="org.springframework.batch.item.xml.StaxEventItemWriter" id="writer">
  <property name="resource" value="file:D:/testPerson.xml " />
  <property name="serializer" ref=" serializer " />
  <property name="rootTagName" value="trades" />
  <property name="overwriteOutput" value="true" />
</bean>
<bean class="org.springframework.batch.item.xml.oxm.MarshallingEventWriterSerializer" id="serializer">
  <constructor-arg>
    <bean class="org.springframework.oxm.xstream.XStreamMarshaller">
      <property name="aliases" ref="aliases" />
    </bean>
  </constructor-arg>
</bean>
```

리스트 21 : StaxEventItemWriter 설정 예제

정상혁

## Related

- [[spring-batch-series]]
