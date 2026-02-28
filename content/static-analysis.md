<div id="header">

</div>

<div id="content">

<div class="paragraph">

<a href="https://checkerframework.org/"
class="bare">https://checkerframework.org/</a>

</div>

<div class="paragraph">

<a href="http://errorprone.info/"
class="bare">http://errorprone.info/</a>

</div>

<div class="paragraph">

<a href="https://github.com/uber/NullAway"
class="bare">https://github.com/uber/NullAway</a>

</div>

<div class="paragraph">

<a
href="https://code.facebook.com/posts/293371094514305/open-sourcing-racerd-fast-static-race-detection-at-scale/"
class="bare">https://code.facebook.com/posts/293371094514305/open-sourcing-racerd-fast-static-race-detection-at-scale/</a>

</div>

<div class="paragraph">

[FindBugs + Eclipse + Maven2 +
Hudson](http://benelog.egloos.com/2079841)

</div>

<div class="paragraph">

[PMD + Eclipse + Maven2 + Hudson](http://benelog.egloos.com/2176171)

</div>

<div class="paragraph">

[JavaNCSS + Maven2 + Hudson](http://benelog.egloos.com/2204823)

</div>

<div class="paragraph">

[JDepend + Eclipse + Maven2](http://benelog.egloos.com/2208368)

</div>

<div class="paragraph">

[EMMA + Eclipse + Maven2 + Hudson](http://benelog.egloos.com/2212119)

</div>

<div class="paragraph">

[Hudson plugin 수동으로 빌드&업로드](http://benelog.egloos.com/2208375)

</div>

<div class="paragraph">

이번에 PMD를 프로젝트에 적용하면서 생긴 저의 의견을 정리하면 다음과
같습니다.

</div>

<div class="olist arabic">

1.  PMD에는 광범위한 Rule이 정의되어 있어서, 적용할 Rule의 선별작업이
    개발초기에 이루어 져야 할 것을 보입니다.

2.  QA쪽에서는 각 프로젝트마다 쓰인 룰셋 파일을 수집하고, 어느 정도
    정리가 되면 신규 프로젝트에 디폴트로 제공해서, 개발자와의 협의를
    거쳐 프로젝트마다의 특성에 맞게 수정 반영할 수 있으면 효율적인
    적용이 가능할 것입니다.

3.  룰셋파일은 당연히 SVN에 올려져서 프로젝트 팀원들이 공유하고, 같은
    Rulset으로 Eclipse plugin으로는 실시간 체크, maven+hudson으로는
    통합체크를 해서 빠른 피드백이 이루어졌으면 합니다.

4.  이미 개발을 진행하고 있는 프로젝트 중반에 적용하는 것은 어려움이
    많을 것으로 보이며, 테스트코드 작성을 하나도 안 하고 있는
    프로젝트에서는 더욱 그러할 것으로 보입니다. ( Rule중에는 단순
    명칭변경만이 아닌 로직의 리팩토링을 요구하는 Rule도 많은데, 무작성
    시키는대로 고치다보면 에러를 만드는 수도 있습니다. 참고 삼아 제
    경험을 소개드리면, String.startsWith 메서드 다음에 한글자의 문자열이
    오면 이를 chatAt(0)을 쓰고 ==로 비교하라고 경고를 주는 Rule도
    있는데, 시키는대로 하면 빈 스트링(“”)값이 들어가면 startWith로는
    문제없는 것이 chatAt으로는 실행시 outOfIndexException을 내게 됩니다.
    다행히 intostatic프로젝트에는 해당 케이스를 검사해주는 테스트코드가
    있어서 서버에 빌드하기 전에 알 수 있었지만, 그렇지 않은 경우에는
    수정이 더욱 신중해야할 것 같습니다.)

5.  코드 검사와 테스트코드, Hudson과 같은 Continuous Integration
    tool과는 아주 밀접한 관계가 있으므로 관련 프로세스와 표준을 정리해서
    개발팀에 안내하는 것도 좋을 것 같습니다. (예를 들어 다소 엄격한
    절차를 만든다면, 코드 검사 빌드는 Hudson에서 1시간마다 1번씩 돌리고
    에러나 warning개수가 50개가 넘으면 자동으로 QA에게 메일이 가도록
    설정하게 한다던지..하는 예입니다.)

</div>

<div class="paragraph">

결국 프로젝트에 공식 적용하기 위해서는 개발시작 때 개발표준 확인+RuleSet
선정의 작업을 하고 들어가야 될 것 같습니다. 다음에 프로젝트를 시작할
때는 이를 염두에 두고 진행을 하겠습니다. 참고로 더 필요하신 자료 등이
있으면 연락주시기 바랍니다~

</div>

<div class="paragraph">

<http://www.laatuk.com/tools/review_tools.html>

</div>

<div class="paragraph">

[http://www.cs.cmu.edu/aldrich/courses/654/tools/index.html](http://www.cs.cmu.edu/%3Csub%3Ealdrich/courses/654/tools/index.html)

</div>

<div class="paragraph">

<http://findbugs.sourceforge.net/>

</div>

<div class="paragraph">

[Glean- 다양한 코드 검사 도구의 결과를 통합하는
도구](http://kingori.egloos.com/3795134)

</div>

<div class="paragraph">

[웹 프로젝트에서 jslint로 자바스크립트 검증하기: maven 또는
ant](http://iolothebard.tistory.com/378)

</div>

<div class="paragraph">

<http://stackoverflow.com/questions/207652/how-do-commercial-java-static-analysis-tools-compare-with-the-free-ones>

</div>

<div class="paragraph">

So it depends on whether your priority is quality checking (Findbugs,
Coverity) or security vulnerability analysis (Klocwork, or Fortify).

</div>

<div class="literalblock">

<div class="content">

    Jones Capers, Assessment and Control of Software Risks

</div>

</div>

<div class="paragraph">

'이미 1978년에 LOC는 .. 생산성과 품질 데이터를 수집하는데 있어 신뢰할 수
없다는 것이 입증됐다.' , 'LOC 페트릭을 사용하는 것은 가장 심각한 문제로
분류된다'

</div>

<div class="sect1">

## JavanCSS

<div class="sectionbody">

</div>

</div>

<div class="sect1">

## Simian

<div class="sectionbody">

<div class="literalblock">

<div class="content">

    Optimization SimplifyStartsWith

</div>

</div>

<div class="paragraph">

[자바 패스파인더를 이용한 소프트웨어 모델
검사](https://www.ibm.com/developerworks/kr/library/dwclm/20080826/)

</div>

</div>

</div>

<div class="sect1">

## PMD

<div class="sectionbody">

<div class="paragraph">

PMD Design Ruls : <http://pmd.sourceforge.net/rules/design.html>

</div>

<div class="paragraph">

[PMD - CPD Inspection using Maven2
Pluin](http://blog.naver.com/youmasan?Redirect=Log&logNo=130037037455)

</div>

<div class="paragraph">

[Hudson : 리포트/차트 보기](http://ecogeo.tistory.com/70)

</div>

<div class="sect3">

#### Macker

<div class="paragraph">

Architectural Rule check

</div>

<div class="paragraph">

<http://innig.net/macker/>

</div>

</div>

</div>

</div>

<div class="sect1">

## XRadar

<div class="sectionbody">

<div class="paragraph">

<http://xradar.sourceforge.net/>

</div>

</div>

</div>

<div class="sect1">

## Relief

<div class="sectionbody">

<div class="paragraph">

프로젝트 의존관계, 패키지 크기 등을 시각화

</div>

<div class="paragraph">

<http://www.workingfrog.org/>

</div>

</div>

</div>

<div class="sect1">

## FindBugs

<div class="sectionbody">

<div class="paragraph">

<http://findbugs.sourceforge.net/bugDescriptions.html>

</div>

<div class="literalblock">

<div class="content">

    <plugin>
           <groupId>org.codehaus.mojo</groupId>
           <artifactId>findbugs-maven-plugin</artifactId>
           <version>1.2</version>
           <configuration>
              <findbugsXmlOutput>true</findbugsXmlOutput>
              <findbugsXmlWithMessages>true</findbugsXmlWithMessages>
          <xmlOutput>true</xmlOutput>
          <excludeFilterFile>${basedir}/findBugsExclude.xml</excludeFilterFile>
           </configuration>
    </plugin>

</div>

</div>

<div class="paragraph">

\<FindBugsFilter\> \<Match\> \<Bug code="Se,SnVI,Dm" /\> \</Match\>
\</FindBugsFilter\>

</div>

<div class="paragraph">

<http://findbugs.sourceforge.net/manual/filter.html>

</div>

<div class="paragraph">

<http://mojo.codehaus.org/findbugs-maven-plugin/findbugs-mojo.html>

</div>

<div class="sect2">

### 강연

<div class="paragraph">

[Sun Techdays 2008 Lightning Talk 발표자료;
findbugs](http://okjsp.tistory.com/1165643579)

</div>

<div class="paragraph">

<http://developers.sun.com/learning/javaoneonline/2007/pdf/TS-2007.pdf>

</div>

<div class="paragraph">

10분36초. Joshua Bloch

</div>

<div class="paragraph">

<http://www.buggymind.com/177>

</div>

<div class="paragraph">

If Josh makes a dumb mistake, you are allowed to make a dumb mistake,
all right?

</div>

<div class="paragraph">

String sig = type.getSignature();

</div>

<div class="paragraph">

if(sig!=null \|\| sig.length() ==1 ) {

</div>

<div class="literalblock">

<div class="content">

    return sig;

</div>

</div>

<div class="paragraph">

}

</div>

<div class="paragraph">

Eclipse 3.0.0M8

</div>

<div class="paragraph">

String name = workingCopy.getName()

</div>

<div class="paragraph">

name.replace('/','.);

</div>

</div>

</div>

</div>

</div>

<div id="footer">

<div id="footer-text">

Last updated 2026-02-28 04:33:58 +0900

</div>

</div>

## Related
- [[code-formatting]]
- [[code-review]]
