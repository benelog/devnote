- [XStream vs Castor for XML serialization](http://www.artima.com/forums/flat.jsp?forum=121&thread=106900)
- [Comparing Java Data Binding Tools](http://www.xml.com/pub/a/2003/09/03/binding.html)
- <http://www.ibm.com/developerworks/xml/library/x-databdopt2/>
- <http://bdoughan.blogspot.com/2010/10/how-does-jaxb-compare-to-xstream.html>
- [다중 티어에서 XML 프로그래밍하기: 중간 티어에서 XML을 사용하여 성능과 충실도를 개선하고 개발을 용이하게 한다.](http://www.ibm.com/developerworks/kr/library/x-xmlfeat1/index.html)
- [다중 티어에서 XML 프로그래밍 하기, Part 2: XML 데이터베이스 서버를 활용하는 효과적인 Java EE 애플리케이션 작성](http://www.ibm.com/developerworks/kr/library/x-xmlfeat2/)

## Castor
- <http://castor.org/xml-framework.html>

```java
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import junit.framework.TestCase;

import org.exolab.castor.xml.MarshalException;
import org.exolab.castor.xml.Marshaller;
import org.exolab.castor.xml.ValidationException;

import com.nhncorp.moca.rcv.sample.job.GetMaxMovieInfoForDate;

public class CasterTest extends TestCase {

    public void testCaster() throws IOException, MarshalException, ValidationException{
        // Create a File to marshal to
        GetMaxMovieInfoForDate period = new GetMaxMovieInfoForDate();
        period.setSdate("20080428");
        period.setEdate("20080428");
        FileWriter writer = new FileWriter("test.xml");
        Marshaller.marshal(period, writer);
    }

    public void testCaster2() throws IOException, MarshalException, ValidationException{
        // Create a File to marshal to
        GetMaxMovieInfoForDate period = new GetMaxMovieInfoForDate();
        period.setSdate("20080428");
        period.setEdate("20080428");
        List<GetMaxMovieInfoForDate> list = new ArrayList<GetMaxMovieInfoForDate>();
        list.add(period);
        list.add(period);
        FileWriter writer = new FileWriter("testList.xml");

        // Marshal the person object
        Marshaller.marshal(list, writer);
    }

    public void testCaster3() throws IOException, MarshalException, ValidationException{
        // Create a File to marshal to
        Map<String,String> period = new HashMap<String,String>();
        period.put("sdate","20080428");
        period.put("edate","20080428");
        FileWriter writer = new FileWriter("testMap.xml");
        // Marshal the person object
        Marshaller.marshal(period, writer);
    }
}
```

## XmlBeans
- <http://xmlbeans.apache.org/>

## JiBX
- <http://jibx.sourceforge.net/>

## XStream
- [XStream으로 자바 객체를 XML로 직렬화하기](http://www.ibm.com/developerworks/kr/library/x-xstream/)

XStream is an XML serialization library, not a data binding library. Therefore, it has limited namespace support. As such, it is rather unsuitable for usage within Web services.

```java
import java.util.HashMap;
import java.util.Map;

import junit.framework.TestCase;

import com.nhncorp.moca.rcv.sample.job.GetMaxMovieInfoForDate;
import com.thoughtworks.xstream.XStream;

public class XStreamTest extends TestCase {

    public void testXStream(){
        XStream xstream = new XStream();
        GetMaxMovieInfoForDate period = new GetMaxMovieInfoForDate();
        period.setSdate("20080428");
        period.setEdate("20080428");
        xstream.alias("period", GetMaxMovieInfoForDate.class);
        String result = xstream.toXML(period);
        System.out.println(result);
    }

    public void testXStreamMap(){
        XStream xstream = new XStream();
        Map<String,String> period = new HashMap<String,String>();
        period.put("sdate","20080428");
        period.put("edate","20080428");
        String result = xstream.toXML(period);
        System.out.println(result);
    }
}
```

## StAX
Streaming API for XML (StAX) . JSR-173에 기초 JAXP 1.4의 일부분

SAX는 이벤트 핸들러가 parser로 부터 event를 받는 것이라서 사용자는 call back 메소드를 통해서만 이를 처리할 수 있다.

어플리케이션 코드가 그것을 당겨서 받아올수 있다는 것. (pull-based approach) parsing process의 control을 직접 유지할 수 있다.

- [StAX'ing up XML, Part 1: An introduction to Streaming API for XML (StAX)](http://www.ibm.com/developerworks/xml/library/x-stax1.html)

## JDOM
JDOM : JAXP의 DOM 트리가 프로그래밍 언어에 독립적으로 정의되었기 되어서 Java언어에서 다루기가 자연스럽지 못하다는 단점이 있음. JDOM은 좀더 자바 언어에 최적화된 DOM 트리를 구성.

### Sample1
```java
public static Document getDocument(String xmlPath) throws Exception {

    InputStream in = null;

    if (xmlPath.indexOf("<?") < 0) { // 경로가 입력된 경우
        in = new FileInputStream(xmlPath);
    } else { // XML String이 입력된 경우
        in = new ByteArrayInputStream(xmlPath.getBytes());
    }

    SAXBuilder builder = new SAXBuilder(false);
    Document configDoc = builder.build(in);
    in.close();
    return configDoc;
}
```

## JAXP
abstraction layer

javax.xml.parsers는 SAXParserFactory와 DocumentBuilderFactory 제공

- [All about JAXP, Part 1](http://www.ibm.com/developerworks/xml/library/x-jaxp/index.html)

### Sample - SAX
- <http://java.sun.com/j2se/1.5.0/docs/api/javax/xml/parsers/SAXParserFactory.html>
- <http://java.sun.com/j2se/1.5.0/docs/api/javax/xml/parsers/SAXParser.html>

```java
SAXParserFactory factory = SAXParserFactory.newInstance();
SAXParser parser = factory.newSAXParser();
parser.parse(filename, new DefaultHandler());
```

### Sample - DOM
- <http://java.sun.com/j2se/1.5.0/docs/api/javax/xml/parsers/DocumentBuilderFactory.html>
- <http://java.sun.com/j2se/1.5.0/docs/api/javax/xml/parsers/DocumentBuilder.html>

```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();
Document document = builder.parse(filename);
```

### Sample - XSLT 프로세서 생성 예제
```java
TransformerFactory factory = TransformerFactory.newInstance();
Transformer transformer = factory.newTransformer( new SAXSource(new InputSource(stylesheetFile)));
transformer.transform( new SAXSource(new InputSource(XMLFilename)), new StreamResult(resultFilename));
```

## JAXB
- [JAXB sample 실행](http://blog.naver.com/waitzero?Redirect=Log&logNo=70026162897)
- [\[JAXB\] JAXB Annotation 설명~ Part. 2](http://vicki.tistory.com/21)
- <http://vicki.tistory.com/18>
- <http://vicki.tistory.com/17>

```xml
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.1</version>
</dependency>
<dependency>
    <groupId>com.sun.xml.bind</groupId>
    <artifactId>jaxb-impl</artifactId>
    <version>2.1.9</version>
</dependency>
```

## Digester
- [Using the digester component](http://www.theserverside.com/tt/articles/article.tss?l=Digester)
- [Digester 사용법](http://blog.naver.com/icarus7703/80001218003)

event 기반인 SAX를 내부적으로 사용

Digester 클래스는 org.xml.sax.ContentHandler를 구현하고 있으며, parse stack를 관리하고

### Rule 샘플
```java
package prototype.common;

import java.util.Map;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.digester.BeanPropertySetterRule;

public class BeanAndMapPropertySetterRule extends BeanPropertySetterRule {

    public BeanAndMapPropertySetterRule(String propertyName){
        super(propertyName);
    }
    public void end(String namespace, String name)    throws Exception{
        Object top = digester.peek();
        if(top instanceof Map)  {
            PropertyUtils.setProperty(top, propertyName, bodyText);
        } else {
            super.end(namespace,name);
        }
    }
}
```

## java XML 발표준비
Java의 표준 XML 처리 API

- JAXP : Java API for XML processing (javax.xml.parsers)
  - JCP에서 정의하는 표준의 정의부
  - SAX : Simple API for XML (org.xml.sax)
  - DOM : Document Object Model (org.w3c.dom)
  - XSLT : Xml StyleSheet Lanauage for Transformation (javax.xml.transform)
- SAX : 순차적, event식
- DOM : 모든 XML을 읽어서 트리를 만들어 처리.
- JAXB (Java Architecture for XML Binding) : Caster나 XML Beans와 같이 XML과 자바 객체를 직접 매핑시켜 주는 프레임워크들이 등장하자 뒤늦게 JCP에서 XML-Object 매핑 표준 프레임워크의 표준을 정의한 것.

구현체는 Crimson, Xercers2

- Crimson. JAXP 1.1의 참조구현체. 현재는 Xercers2로 통합. J2SE SDK1.4x에 표준 라이브러리 포함
- Xercers2: IBM에서 아파치 재단에 기증한 XML4J를 기반으로 하여 아파치 XML 프로젝트로 개발. JAXP 1.2의 참조구현체로 사용. J2SDK 1.5.x에 표준 라이브러리로 포함.

오픈소스API

- DOM4J : DOM과 SAX외에 XPath 구현체를 내장. (하이버네이트에서 DOM4J 사용)
- Caster : 매핑을 별도의 디스크립터에 정의.
- XmlBeans: BEA에서 아파치 재단에 기능한 XML 바인딩 프레임워크를 기초로 개발되고 있음.
- Digester : Struts내에서 struts-config.xml 설정 파일을 처리하기 위해서 개발.

Map vs VO

31MB 파일처리시 속도는 3배이상

### 참고자료
- 파워유저가 알려주는 Struts 프로그래밍 (송만균, 신혜원 공저, 가메출판사) Chapter 32. XML과 커먼즈 다이제스터
- 자바 성능을 결정짓는 코딩습관과 튜닝 이야기 (이상민, 한빛미디어) Story 14 : XML도 잘 쓰자.
- 톰캣최종분석 제15장 다이제스터
- 전문가가 들려주는 Java이야기 2장 엔터프라이즈 애플리케이션 구조만들기 - 아파치 자카르타 Digester를 이용한 설정파일관리 (144쪽)

## Spring OXM
- <http://www.ibm.com/developerworks/xml/library/x-springXOM/>
- <http://vicki.tistory.com/697>

## Spring WS
### 소스 보기
- <http://fisheye3.cenqua.com/browse/springframework/spring-ws/tags/spring-ws-1.5.0>
- <https://springframework.svn.sourceforge.net/svnroot/springframework/spring-ws/>

## XML web service
- <http://blog.naver.com/puresprout77/60036313351>
- <http://jibx.sourceforge.net/jibxsoap/api/org/jibx/soap/client/SOAPClient.html>
- [알아두면 유용한 XML 스키마 열 가지](http://www.ibm.com/developerworks/kr/library/x-schematips/)
- [WebLogic Workshop을 이용한 웹서비스 프로그래밍](http://bcho.tistory.com/296)

## Related
- [[java]]
- [[xml-injection]]
- [[spring]]
- [[struts]]
- [[soa]]
- [[apache-commons]]
