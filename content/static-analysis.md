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

### JavanCSS

<div class="sectionbody">

</div>

</div>

<div class="sect1">

### Simian

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

<div class="sectionbody">

<div class="sect3">

### Macker

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

### XRadar

<div class="sectionbody">

<div class="paragraph">

<http://xradar.sourceforge.net/>

</div>

</div>

</div>

<div class="sect1">

### Relief

<div class="sectionbody">

<div class="paragraph">

프로젝트 의존관계, 패키지 크기 등을 시각화

</div>

<div class="paragraph">

<http://www.workingfrog.org/>

</div>

</div>

</div>

</div>

<div id="footer">

<div id="footer-text">

Last updated 2026-02-28 04:33:58 +0900

</div>

</div>

## JDepend + Eclipse + Maven2

JDepend는 Java패키지간의 의존성에 대한 수치들을 알려 주는 도구입니다.

JDepend의 Eclipse의 Plugin은 를 Update site에 추가하면 설치할 수 있습니다. 다음의 링크들에서 보다 자세한 내용을 참조할 수 있습니다. 분석을 하고자 하는 소스폴더 위에서 우클릭을 한 후 'Run JDepend Analysis' 메뉴를 선택하면 의존성 분석 결과가 나옵니다.

![EclipseJDepend.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1106046_EclipseJDepend.JPG)

이를 Maven을 통해서 생성하는 jdepend-maven-plugin 은 pom.xml에 아래와 같이 추가할 수 있습니다.

```xml
<reporting>
    .....
    <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>jdepend-maven-plugin</artifactId>
        <version>2.0-beta-2</version>
    </plugin>
</reporting>
```

`mvn jdepend:generate` 또는 `mvn site`명령을 통해서 보고서가 생성됩니다. mvn site로 실행했다면 Hudson의 프로젝트 홈에서 Maven Generated Site 메뉴를 통해서도 확인할 수 있습니다. 샘플페이지 에 생성된 보고서의 형식이 나와있습니다.

![JDependReport.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1097860_JDependReport.JPG)

JDepend 첫페이지나 생성된 보고서 안에서도 위의 요약 테이블에 수치들에 대한 설명이 잘 나와있습니다. 간단히 요약해서 정리하면,

- TC (Total Classes) : 전체 클래스 수. CC + AC
- CC (Concrete Classes) : Inteface나 추상클래스가 아닌 구상 클래스 수
- AC (Abstract Classes) : Interface나 Abstract Class로 선언된 클래스 수
- Ca (Afferent Couplings) : 이 패키지를 의존하고 있는 다른 패키지의 수. 이 패키지의 책임감을 나타내는 지표
- Ce (Efferent Couplings) : 이 패키지가 의존하고 있는 클래스가 있는 다른 패키지의 수. 이 패키지의 독립성을 나타내는 지표.
- A (Abstractness) : 총 클래스 갯수 중 인터페이스나 추상클래스의 비율. 1이라면 해당 패키지는 추상클래스나 인터페이스 밖에 없는 것.
- I (Instability) : 총 결합도 중 이 패키지의 외부의존성의 비율 (Ce / (Ce + Ca)). 변화에 대한 내성을 나타내는 지표. I=0이라면 완전하게 안정적인 것.
- D (Distance from Main Sequence) : 이상적인 균형의 상태인 A + I = 1 의 함수에서 수직으로 떨어진 거리. (아래 그래프 참조)

가장 중요한 것은 패키지 간의 순환참조를 보여주는 Cycles 부분입니다.

![JDependCycles.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1098126_JDependCycles.JPG)

순환참조 관계의 패키지들은 부분적으로 배포될 수도 없고, 한 패키지를 변경할 때 그 영향력을 파악하기도 힘들게 만듭니다. 순환 참조에 대한 자세한 내용은 아래의 링크를 참조하시기 바랍니다.

- [Code Organization & Cyclic Dependency Problem](http://toby.epril.com/?p=263)

## Code Complexity

순환복잡도 수 (Cyclomatic Comlexity Number, CCN) : 메소드안에 있는 별개의 경로 개수를 셈으로써 복잡도를 재는 정수. 10보다 큰 CCN을 가진 메소드는 크기의 코드보다 결함이 발생할 위험이 크다는 것이 밝혀짐.

- <http://www.sei.cmu.edu/str/descriptions/cyclomatic_body.html>

## 개발지원 도구

- [사람을 위한 자동화 시리즈 모음](http://www.ibm.com/developerworks/kr/views/java/libraryview.jsp?sort_by=Date&show_abstract=true&show_all=false&search_flag=&topic_by=%EB%AA%A8%EB%93%A0+%EC%A3%BC%EC%A0%9C+%EB%B0%8F+%EA%B4%80%EB%A0%A8+%EC%A0%9C%ED%92%88&type_by=%EB%AA%A8%EB%93%A0+%EC%A2%85%EB%A5%98&search_by=%EC%82%AC%EB%9E%8C%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%9E%90%EB%8F%99%ED%99%94)
- 사람을 위한 자동화: 전혀 귀찮지 않은 로드 테스팅 ([Automation for the people: Hands-off load testing](http://www.ibm.com/developerworks/java/library/j-ap04088/))
- [Hands-off Load Testing with JMeter and Ant](http://www.infoq.com/news/2008/04/JMeter-Ant-CI)
- [Automation for the people: Manage dependencies with Ivy](http://www.ibm.com/developerworks/java/library/j-ap05068/index.html)
- <http://martinfowler.com/articles/continuousIntegration.html>
- [실전! 지속적인 통합 2편 - 버전 관리 시스템 갖추기](http://bcho.tistory.com/entry/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%9E%90%EB%8F%99%ED%99%94-%ED%99%98%EA%B2%BD%EC%97%90-%EB%8C%80%ED%95%9C-%EC%B6%94%EC%B2%9C-%EC%A1%B0%ED%95%A9)
- <http://justanothersoftwareengineer.blogspot.com/2009/06/testing-javascript-in-continuous.html>

### Raven

### 통합툴

CruiseControl

- <http://cruisecontrol.sourceforge.net/>
- <http://continuum.apache.org/>

#### BuildBot

- <http://www.ibm.com/developerworks/kr/library/l-buildbot/index.html>

#### 기타툴

- [About-CodeBeamer](http://bcho.tistory.com/entry/About-CodeBeamer)

Convention

- <http://www.triemax.com/products/jalopy/features.html>
- <http://engineering.twitter.com/2010/07/murder-fast-datacenter-code-deploys.html>

## Children
- [[findbugs]]
- [[pmd]]
- [[sw-quality]]

## Related
- [[code-formatting]]
- [[code-review]]
- [[continous-deployments]]
- [[eclipse-plugins]]
- [[maven]]
- [[code-coverage]]
