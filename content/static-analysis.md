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

### PMD

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

##### Macker

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

<div class="sect1">

### FindBugs

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

#### 강연

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

## FindBugs + Eclipse + Maven2 + Hudson

[FindBugs](http://findbugs.sourceforge.net/)를 이용한 코드검사를 Maven2을 통해 실행하고, Hudson을 통해 확인하는 설정을 정리해 봅니다. Hudson을 설치하는데 필요한 정보를 추가로 얻고 싶으신 분들은 Hudson 페이지에 모아진 링크를 참조하시면 어렵지 않게 진행하실 수 있으실 것입니다.

Eclipse에서 findbugs로 코드검사를 해볼 수 있는 툴은 <http://findbugs.cs.umd.edu/eclipse/> 를 update site로 지정하면 설치할 수 있습니다. 설치가 잘 되었다면 소스 폴더를 선택하고 마우스 우클릭을 하면 'Find Bugs'라는 메뉴가 생긴 것이 보일 것입니다. 그 메뉴를 통해 원하는 프로젝트를 검사하고, Bug Explorer 탭을 선택하보면 아래와 같은 화면이 나옵니다.

![EclipseFindBugs.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1117678_EclipseFindBugs.JPG)

Bug Explorer 탭에서는 버그를 유형별로 정리해서 보여주고, 소스탭에서는 해당하는 코드에 벌레 모양 아이콘을 찍어줍니다. 그리고 Problems 창에서는 Eclipse에서 잡아내는 다른 경고처럼 warning으로 해당 소스를 표시해 줍니다. Bug Details 탭을 누르면 버그에 대한 자세한 설명도 볼 수 있습니다.

프로젝트의 Properties 메뉴에서 FindBugs 설정란으로 가면 검사할 규칙 등을 선택할 수 있습니다.

![EclipseFindBugsConfig.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1117798_EclipseFindBugsConfig.JPG)

이 설정화면에서 'Run FindBugs automatically'를 선택하면, 소스가 바뀔 때마다 자동으로 검사를 수행해 줍니다. 이 기능이 선택되어 있지 않다면, 지적된 소스를 수정해도 다시 수동으로 검사를 돌려야지 경고메시지 지워지므로, 이클립스가 아주 느리다는 느낌이 안 들정도라면 선택하는 것이 좋습니다. 이 기능을 선택해서, Eclipse의 Problems 탭에서 코드 작성 즉시 에러와 경로를 확인할 수 있게 되었다면 .project 파일에 아래와 같은 부분이 추가되어 있을 것입니다.

```xml
<natures>
    ....
    <nature>edu.umd.cs.findbugs.plugin.eclipse.findbugsNature</nature>
</natures>
```

FindBugs 설정 화면 중 Detector Configuration 탭에서는 검사할 규칙들을 지정할 수 있고, Reporter configuration 탭에서는 보고해 줄 버그의 경고단계와 분류를 선택할 수 있습니다.

![EclipseFindBugsConfig2.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1117868_EclipseFindBugsConfig2.JPG)

Filter files 탭에서는 별도의 XML파일로 선언된 포함하거나 제외시킬 버그와 파일에 대한 설정을 가지고 올 수 있습니다.

![EclipseFindBugsConfig3.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1117876_EclipseFindBugsConfig3.JPG)

아래에 자세히 설명하겠지만, Maven 설정에서 참조하는 findBugsExclude.xml을 Eclipse plugin에서도 똑같이 지정해서 Maven과 Eclipse에서 같은 기준으로 검사가 수행되도록 했습니다.

Maven2의 findbugs-maven-plugin은 pom.xml에 아래와 같이 설정됩니다.

```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>findbugs-maven-plugin</artifactId>
    <version>1.2.1</version>
    <configuration>
        <findbugsXmlOutput>true</findbugsXmlOutput>
        <findbugsXmlWithMessages>true</findbugsXmlWithMessages>
        <xmlOutput>true</xmlOutput>
        <excludeFilterFile>${basedir}/findBugsExclude.xml</excludeFilterFile>
    </configuration>
</plugin>
```

위의 설정에 들어가는 속성들에 대해서는 findbugs-maven-plugin 설명 페이지에서 자세한 내용을 보실 수 있습니다.

저는 제외할 검사규칙을 지정하기 위해서 excludeFilterFile속성에 findBugsExclude.xml을 지정했습니다.

findBugsExclude.xml의 내용은 아래와 같이 설정했습니다.

```xml
<FindBugsFilter>
    <Match>
        <Bug code="Se,SnVI,Dm,UwF,EI,EI2" />
    </Match>
</FindBugsFilter>
```

제외할 것을 선언하는 파일에 이렇게 적었으니 Bug code가 "Se,SnVI,Dm"에 해당하는 버그검사는 제외한다는 의미입니다. Filter의 설정 방법에 대해서는 findbugs의 매뉴얼을 참조하시면 됩니다.

버그 코드 중 Se,SnVI는 serialVersionUID에 관한 것이고 Dm은 String.toUpperCase 등의 메소드에서 Local설정을 권유하는 검사입니다. ([버그 코드에 대한 설명 페이지](http://findbugs.sourceforge.net/bugDescriptions.html) 참조)

이렇게 설정을 하고 `mvn findbugs:findbugs`로 maven을 실행시키면 필요한 라이브러리들을 다운로드 받고 빌드가 실행됩니다. 실행이 성공했다면 목적지 폴더에 findbugs.xml과 findbugsXml.xml파일이 생성이 되었을 것입니다.

이것을 Hudson을 통해서 보기 위해서는 Hudson에서도 findbugs plugin을 설치해야 됩니다.

Hudson 첫 화면에서 Manage Hudson - Manage Plugins 메뉴를 찾아갑니다. Available 탭에서 findbugs를 선택하고 화면 우측하단의 'install'버튼을 누르면 Hudson이 알아서 라이브러리를 다운 받아줍니다. 설치한 plug-in이 실행되기 위해서는 Hudson을 재시작해야 합니다.

그런 다음에 findbugs를 적용하고자 하는 프로젝트에 가서 Configure메뉴를 선택하면 아래와 같이 Publish FindBugs Analysis Result라는 부분이 추가된 것을 보실 수 있을 것입니다.

![fingbugs_config.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/810964_fingbugs_config.JPG)

이것을 선택하고 원하는 기준값이 있을 경우 입력한 뒤에 "save'버튼을 누르고 build를 해보면 됩니다. 물론 build에는 findbugs:findbugs goal이 포함되어야 하겠죠.

빌드가 성공하는 것을 보고 프로젝트의 메뉴를 보면 FindBugs Warnings라는 메뉴가 추가된 것을 확인하실 수 있습니다.

![findbugs_menu.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/810994_findbugs_menu.JPG)

그 메뉴를 누르면 생성된 보고서가 보입니다.

![findbugs_report.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/811002_findbugs_report.JPG)

warning이 존재할 경우 건수를 클릭하면 해당하는 클래스들이 나오고, 클래스를 선택하면 소스에서 warning을 발생시키는 부분까지 보여줍니다.

만약 hudson의 findbugs plugin을 실행할 때 `Cannot find setter nor field in org.apache.maven.plugins.site.SiteMojo for 'xmlOutput'` 와 같은 에러가 난다면 Hudson plugin 수동으로 빌드&업로드를 참조해서 최신 버전으로 플러그인을 업데이트 해보시기 바랍니다.

### 관련 자료

- [Hudson의 Findbugs 플러그인 이용하기](http://okjsp.tistory.com/1165643626)
- [findbugs eclipse plugin 설치](http://okjsp.tistory.com/1165643570)
- FindBugs: 코드의 정적 분석을 통한 버그 탐색 : 동영상 강연을 보니 구글에서도 이 도구를 사용하고 있다고 합니다.

## PMD + Eclipse + Maven2 + Hudson

코드 검사도구인 [PMD](http://pmd.sourceforge.net/) 를 Eclipse plugin을 설정하고, Maven을 통해서도 같은 규칙으로 코드를 검사한 보고서를 생성하고, Hudson을 통해서 확인하는 과정을 정리해 봤습니다.

Eclipse에서는 update site를 <http://pmd.sf.net/eclipse> 로 지정해서 플러인을 설치합니다.

Eclipse 메뉴의 Window- Preferences를 가면 Rule설정 파일을 export, import할 수 있는 기능이 있습니다.

![PmdPreference.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1019796_PmdPreference.JPG)

Project의 Properties에도 PMD관련 설정이 있습니다. 외부에서 만든 Rule파일을 바로 참조해도 되고, 여기서 설정된 것을 파일로 생성할 수도 있습니다. 이미 있는 프로젝트에서 Rule를 설정할 때는 Project의 Properties에서 Rule들을 고른 후에 생기는 warning이나 error를 보고 warning이 안 뜨게 소스를 고거나 Rule을 제외한 후, 최종결정 Rule들로 Ruleset 정의 파일을 생성하는 것이 편리할 것입니다. 저는 처음에 모든 Rule을 다 선택한 다음에 warning들을 없애가면서 Rule들을 하나하나 검토해 나갔었습니다.

![PmdProject.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1019792_PmdProject.JPG)

위의 화면에서 Enable PMD를 선택하면 .project파일에 아래와 같은 부분이 추가될 것입니다.

```xml
<natures>
    ....
    <nature>net.sourceforge.pmd.eclipse.plugin.pmdNature</nature>
</natures>
```

이제 해당 프로젝트는 Eclipse의 Problems View에서 PMD에서 보고하는 error, warning까지 모두 다 뜨게 됩니다. 개발을 하면서 Rule 준수에 대한 빠른 피드백을 얻기 위해 되도록 이 기능을 사용하는 것이 좋습니다. 대신 이미 Project에 warning이 많으면 새로운 warning들이 잘 눈에 띄지 않게 되므로, Project를 warning없이 깨끗히 정리한 다음에 사용할 것을 권장해 드립니다.

모든 Rule을 다 적용하면 아마 굉장히 많은 warning과 때로는 에러까지도 나올 것입니다. 그런 것들을 다 검토해서 포함시킬지를 결정해야 합니다. <http://pmd.sourceforge.net/rule-guidelines.html>를 참조하셔서, 프로젝트 상황에 맞게 적용해야겠죠. 그중 몇가지 Rule에 대해서만 언급을 하고 넘어가겠습니다.

- [Basic Rules](http://pmd.sourceforge.net/rules/basic.html)-EmptryInitializer : PMD 5.0에서 추가된 룰로 Maven의 PMD plugin버전 2.4에서는 PMD 버전 4.2.2를 참조하기 때문에 이 Rule은 지원되지 않습니다. 따라서 PMD의 Eclipse plugin에서 이를 지원한다고 할지라도 Maven plugin과 같이 쓰기 위해서는 이 Rule을 반드시 제외해야 합니다.
- [Optimization Rules](http://pmd.sourceforge.net/rules/optimizations.html)-LocalVariableCouldBeFinal과 Controversial Rules-AvoidFinalLocalVariable : 서로 상반되는 Rule로 한쪽 Rule을 피하면 다른 쪽에 걸려드는 Rule입니다. 그래서 warning을 안보려면 둘 중에 하나는 꼭 제외해야 합니다. 그런데, final을 Local variable에 일일히 선언하는 것도 번거로운 일이고, 메소드 내의 inner class에서 참조해야 되어서 꼭 final이 되어야하는 local variable도 있으므로, 둘 다 제외하는 것도 좋습니다
- [Controversial Rules](http://pmd.sourceforge.net/rules/controversial.html)-OnlyOneReturnRule : 메서드에서 return문이 여러 개일 경우 경고를 주는데, 메서드 중간의 return문은 복잡한 조건문의 구조를 단순하게 하는데 도움이 경우가 많고, [켄트벡의 구현패턴](http://www.yes24.com/Goods/FTGoodsView.aspx?goodsNo=2824034&CategoryNumber=001001003016001006) 7장 중 '보호절'을 보면 이를 권장하고 있습니다.
- [Design Rules](http://pmd.sourceforge.net/rules/design.html)-UnnecessaryLocalBeforeReturn : return 전에 따로 local 변수로 반환할 값을 선언할 때 주는 경고인데, 기능적으로는 별 의미 없는 코드이나, return 문장에는 @SupressWarning 의 Annotation을 추가할 수 없기 때문에, Annotation 적용 범위를 최소화하기 위해 그런 선언이 필요한 때도 있습니다. (Java Language Spec 9.7, Effective Java 2nd Edition Item 24 참조)

검토해보니 가장 부담없이 적용가능한 RuleSet이 괄호에 대한 규칙을 정의하는 Braces Rules이고, Controversial Rules가 이름 그래도 가장 제외할 것이 많은 Rule Set입니다.

이런 과정을 거쳐서 선별된 Rule 정의 파일이 만들어지면 그것을 Maven의 PMD plugin에서도 참조할 수 있게 설정합니다. 저는 Rule설정 파일이름을 .ruleset으로 하고 pom.xml에 추가했습니다.

```xml
<reporting>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-pmd-plugin</artifactId>
      <version>2.4</version>
      <configuration>
        <rulesets>
          <ruleset>${basedir}/.ruleset</ruleset>
        </rulesets>
        <sourceEncoding>utf-8</sourceEncoding>
        <targetJdk>1.6</targetJdk>
        <minimumTokens>10</minimumTokens>
      </configuration>
    </plugin>
</reporting>
```

그리고는 `mvn site` 혹은 `mvn pmd:pmd pmd:cpd` 처럼 PMD plugin의 goal을 포함시킨 빌드를 한번 실행시켜 봅니다.

문제가 없이 돌아갔으면 hudson에도 PMD플러그인을 설정합니다.. PMD 플러그인의 goal이 포함된 빌드를 돌리고 나면 PMD warning라는 링크가 해당 프로젝트에 생기고, 거기서 아래와 같은 보고서를 확인할 수 있습니다.

![HudsonPmdResult.JPG](https://raw.githubusercontent.com/benelog/devnote/master/attachments/1019794_HudsonPmdResult.JPG)

### 관련자료

- [PMD Rule guideline](http://pmd.sourceforge.net/rule-guidelines.html)
- 첨부: [PMD_Rules적용의견.xlsx](https://github.com/benelog/devnote/blob/master/attachments/1019798_PMD_Rules%EC%A0%81%EC%9A%A9%EC%9D%98%EA%B2%AC.xlsx)

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

## S/W quality

소프트웨어 품질:

- 미국방성 : 요구사항을 만족시키는 소프트웨어 능력의 총량
- IEEE : 소프트웨어가 지닌 바람직한 속성의 정도

품질특성이 정의된 곳

- IEEE-Std-830-1993
- CMU의 SEI에서 발표한 ATAM (Architecture Tradeoff Analysis Model)
- Rational의 RUP

ISO/IEC 9126-1 품질모델

- 기능성 : 적합성, 정확성, 상호운용성, 보안성, 준수성
- 신뢰성 : 성숙성, 오류허용성, 복구성, 준수성
- 사용성 : 이해성, 습득성, 운용성, 친밀성, 준수성
- 효율성 : 시간반응성, 자원효율성, 준수성
- 유지보수성 : 해석성, 변경성, 안정성, 시험성, 준수성
- 이식성 : 적응성, 설치성, 공존성, 대체성, 준수성

### 기능성(Functionality)

소프트웨어가 특정 조건에서 사용될 때, 명시된 요구와 내재된 요구를 만족하는 기능을 제공하는 소프트웨어 제품의 능력. 다른 품질특성들은 주로 소프트웨어가 언제, 그리고 어떻게 하는것에 관련이 있는 반면, 이 특성은 기능적 요구를 충족하기 위해서 소프트웨어가 무엇을 하는가에 관련이 있다.

### 신뢰성(Reliability)

소프트웨어가 규정된 조건0에서 사용될 때 규정된 성능수준을 유지하거나 사용자로 하여금 오류를 방지할 수 있도록 하는 소프트웨어 제품의 능력. 소프트웨어는 해지거나 낡지 않기 때문에 요구사항의 정의, 설계 및 구현상의 내부적 결함에 기인한다. 이러한 결함으로 인한 고장은 사용 경과 시간보다는 프로그램의 구조적 놀리나 사용자의 숙련정도등에 기인하게 된다.

### 사용성(Usability)

소프트웨어가 규정된 조건에서 사용될 때, 사용자에 의해 이해되고, 학습되며 선호될 수 있게하는 소프트웨어 제품의 능력

### 효율성(Efficiency)

규정된 조건에서 사용되는 자원의 양에 따라 요구된 성능을 제공하는 소프트웨어 제품의 능력. 자원은 다른 소프트웨어 제품, 하드웨어 장비, 재료(예: 인쇄용지, 디스켓) 등을 포함한다.

### 이식성(Portability)

다양한 환경에서 운영될 수 있는 소프트웨어 제품의 능력. 환경이란 소프트웨어를 운영하기 위하여 요구되는 하드웨어, 소프트웨어 및 운영체계등의 환경을 말한다.

### 유지보수성(Mantainability)

소프트웨어의 수정용이성 정도. '수정'은 교정(correction), 개선(improvement), 환경변화에 대한 적응(adaptation)을 포함한다.

- 시스템은 5초이내에 응답해야만 한다. (기능성)
- 시스템은 99.9% 가동되어야 한다. (신뢰성)
- 내년에 다른은행을 합병하게 되면 이미 존재하는 50만명의 고객에 20만명의 고객이 추가될것이다. (이식성)
- 개발팀은 자세한 단위테스트 계획과 사용자 문서를 기대하고 있다. (사용성)
- 개인정보 보호를 위해서 HTTPS를 사용하고 주고 받는 모든 데이터를 암호화해야 한다. (신뢰성)

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

## Related
- [[code-formatting]]
- [[code-review]]
- [[continous-deployments]]
- [[eclipse-plugins]]
- [[maven]]
- [[code-coverage]]
