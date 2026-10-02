- Struts Tip 모음 : <http://cafe.naver.com/javalove.cafe?iframe_url=/ArticleRead.nhn%3Farticleid=730>
- [Struts 1.3.5에서의 DispatchAction과 그의 형제들](http://blog.naver.com/phrack/80034462067)
- [\[XSS 취약점 보완\] Cross Site Scripting 방지 기법 - Struts ResponseUtils](http://blog.naver.com/phrack/80053722954)
- [\[Struts Taglib\] Weblogic 8.1에서 Error in using tag library uri='/tags/struts-html' prefix='html'](http://blog.naver.com/phrack/80054393082)

## RequestProcessor

한글처리 방법은 많겠지만.. kkang 이 권장하는 방식은 필터 기능을 이용하는것..

Struts 에서 제공해주는 RequestProcessor 라는 클래스가 실제 Controller 역활도 하지만 모델이 실행되기전의 Filter 기능도 한다고 볼수 있다.

RequestProcessor 클래스의 여러 메서드중 processPreprocess 메서드가 이런 필터 기능을 구현하기 가장 적당하다.

다른 processXXX 류의 메서드 호출 전에 호출이 된다..

결국.. RequestProcessor 클래스를 확장해서 processPreprocess 메서드를 구현하면 된다..

```java
package controler;

import org.apache.struts.action.RequestProcessor;
import javax.servlet.http.*;

public class MyRequestProcessor extends RequestProcessor {

    protected boolean processPreprocess(HttpServletRequest request,HttpServletResponse response){
        try {
        request.setCharacterEncoding("euc-kr");
        }catch(Exception e){
        }
        return true;
    }
}
```

struts-config.xml 에도 등록해야 하는데.. 아래처럼..

```xml
....
  </action-mappings>

  <controller processorClass="controler.MyRequestProcessor"/>

  <message-resources parameter="resources.MessageResources" />
```

## Tiles

### 비교

- <http://tiles.apache.org/framework/tutorial/pattern.html>

```xml
<definition name="MPSearchItemList" extends="main">
  <put name="body" value="/jsp/adm/mpm/search/AMADMPSearchItemList.jsp"/>
</definition>

<definition name="MPOrgSearchDeptListTile" path="/jsp/adm/mpm/search/AMADMPSearchDeptList.jsp">
  <put name="title" value="실시간모니터링 조회"/>
  <put name="actionURL" value="/MPOrgSearchDeptAction.do"/>
  <put name="formYear" value="/jsp/adm/mpm/ADMPOrgFormYearForList.jsp"/>
</definition>
```

```jsp
<bean:write name='item_count' />

<tiles:insert attribute="formYear"/>
```

- <http://java-ua.blogspot.com/2009/01/spring-mvc-freemarker-tiles-2.html>
- <http://tiles.apache.org/framework/tutorial/integration/freemarker.html>
- <http://tiles.apache.org/framework/tutorial/integration/velocity.html>

## Related
- [[struts2]]
- [[java-web-framework]]
- [[mvc]]
- [[jsp]]
- [[servlet]]
- [[file-upload]]
