<div id="header">

</div>

<div id="content">

<div class="paragraph">

<http://cemerick.com/2010/08/24/hosting-maven-repos-on-github/>

</div>

<div class="sect3">

#### 비교, 전환

<div class="paragraph">

<http://jazoon.com/download/presentations/4840.pdf>

</div>

<div class="paragraph">

<http://www.sonatype.com/people/2009/04/how-to-convert-from-ant-to-maven-in-5-minutes/>

</div>

</div>

<div class="sect3">

#### MAVEN : The Definitive Guide

<div class="paragraph">

<http://sonatype.com/book/>

</div>

<div class="paragraph">

<http://www.sonatype.com/MavenTheDefinitiveGuide.zip>

</div>

</div>

<div class="sect3">

#### 시작하기

<div class="ulist">

- <http://maven.apache.org/guides/introduction/introduction-to-the-pom.html>
- [\[강좌](http://innerman.pe.kr/study/8960) maven 따라하기 - 프로젝트
  생성, 빌드, 레포팅, 배포\]
- [아파치 메이븐 2 시작하기
  (한글)](http://www.ibm.com/developerworks/kr/library/tutorial/j-mavenv2/section8.html)
- [Maven Getting Started Guide(1)](http://seoeun25.tistory.com/355)
- [Maven Getting Started Guide(2)](http://seoeun25.tistory.com/358)
- [Maven Getting Started Guide(3)](http://seoeun25.tistory.com/359)
- <http://maven.apache.org/ref/2.0.8/maven-model/maven.html>
- [Maven 설치하기](http://blog.naver.com/phrack/80051134315)
- [An introduction to Maven
  2](http://www.javaworld.com/javaworld/jw-12-2005/jw-1205-maven.html)

</div>

<div class="paragraph">

생성 mvn archetype:create -DgroupId=com.mycompany.app -DartifactId=myapp

</div>

<div class="paragraph">

[\[Maven](http://moai.tistory.com/474)으로 프로젝트 빌드하기 (maven1)\]

</div>

<div class="paragraph">

[Maven 용어 2 (POM)](http://whiteship.tistory.com/1268)

</div>

<div class="listingblock">

<div class="content">

``` highlight
<dependency>
  <groupId>.....</groupId>
  <artifactId>.....</artifactId>
  <version>1.0.1</version>
  <scope>system</scope>
  <systemPath>${basedir}/lib/xss.jar</systemPath>
</dependency>
```

</div>

</div>

<div class="paragraph">

Effective pom : mvn help:effective-pom

</div>

<div class="paragraph">

Super pom

</div>

<div class="paragraph">

<http://maven.apache.org/pom.html>

</div>

<div class="paragraph">

<http://maven.apache.org/guides/introduction/introduction-to-the-pom.html>

</div>

<div class="paragraph">

[Apache Maven에 대해 모르고 있던 5가지
사항](http://www.ibm.com/developerworks/kr/library/j-5things13/index.html)

</div>

</div>

<div class="sect3">

#### Options

<div class="ulist">

- -e : 발생한 error에 대해서 보여준다.
- -X : Debug를 보여준다. 보통 이 옵션에 \> log.log 처럼 파일로 내보내서
  무슨 문제가 생겼는지 확인하면 좋다.
- -U : 업데이트가 제대로 안되었을 경우 강제로 repository에서 업데이트
  하도록한다.
- -fn : 에러가 나던 말던 일단 빌드부터 하고 본다.
- -P : 프로파일을 설정해서 하나의 프로젝트를 다른 설정으로 빌드할 수
  있다.

</div>

</div>

<div class="sect3">

#### 기초개념

<div class="ulist">

- [Profile](http://whiteship.tistory.com/1295)
- [Plugin](http://whiteship.tistory.com/1290)

</div>

</div>

<div class="sect3">

#### Life Cycle

<div class="ulist">

- [Maven 용어 1 (Plugin, Goal,
  Phase)](http://whiteship.tistory.com/1265)
- [**Maven** 강좌 7 - **Maven**을 이용하여 Appfuse 프로젝트
  생성하기](http://javajigi.tistory.com/95)
- [\[Maven](http://blog.naver.com/phrack/80051232261)Option\]
- [메이븐 상식: 기본 페이스(phase)](http://whiteship.me/2235)
- [Commit comment template](http://whiteship.tistory.com/1588)
- <a href="http://whiteship.tistory.com/1595"
  class="bare">http://whiteship.tistory.com/1595</a>
- <a
  href="http://msinterdev.org/blog/entry/Eclipse-Maven2-toolsjar-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0?TSSESSIONmsinterdevorgblog=46ef6ae21901697c556d92d05477786d"
  class="bare">http://msinterdev.org/blog/entry/Eclipse-Maven2-toolsjar-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0?TSSESSIONmsinterdevorgblog=46ef6ae21901697c556d92d05477786d</a>

</div>

</div>

<div class="sect3">

#### Dependency

<div class="ulist">

- [Maven Dependency의 scope의 의미](http://homo-ware.tistory.com/43)
- [maven2 transitive
  dependency](http://blog.naver.com/iamteri/150030254660)
- [Managed Depedency 네 녀석의 정체를 드디어
  알았다.](http://whiteship.tistory.com/1597)
- [\[Maven](http://whiteship.tistory.com/1512)을 쓴다고 해서 종속성을
  안중에서 Out 시킬 수 있느냐?\]
- [exclusion을 하까마까](http://whiteship.tistory.com/1763) "가장
  가까운" 의존성을 사용하게 됩니다
- [기본적인 managed dependency
  사용법](http://whiteship.tistory.com/1600)
- [Managed Depedency 네 녀석의 정체를 드디어
  알았다.](http://whiteship.tistory.com/1597)
- [Maven의 version range를 사용할 때 주의할
  점](http://toby.epril.com/?p=610)
- mvn versions:display-dependency-updates : 상위 버전 보여주기
- <a href="http://toby.epril.com/?p=610"
  class="bare">http://toby.epril.com/?p=610</a>

</div>

</div>

<div class="sect3">

#### Site

<div class="ulist">

- [mvn site](http://whiteship.tistory.com/1273)
- [Site Generation](http://whiteship.tistory.com/1300)

</div>

</div>

<div class="sect3">

#### 디렉토리구조

<div class="ulist">

- [Maven의 default directory layout
  변경하기](http://toby.epril.com/?p=414)
- [Maven의 webapp directory 변경하기](http://arawn.tistory.com/37)
- <http://maven.apache.org/plugins/maven-war-plugin/war-mojo.html#warSourceDirectory>

</div>

</div>

<div class="sect3">

#### Plug-in

<div class="ulist">

- <http://maven.apache.org/plugins/>
- <http://maven.apache.org/plugins/maven-jar-plugin/>
- <http://maven.apache.org/plugins/maven-assembly-plugin/> :
  [Assemblies](http://whiteship.tistory.com/1304)
- <http://mojo.codehaus.org/exec-maven-plugin/java-mojo.html>
- <http://mojo.codehaus.org/exec-maven-plugin/usage.html>
- [maven-dependency-plugin](http://maven.apache.org/plugins/maven-dependency-plugin/index.html)
  : [Maven 프로젝트 의존성 파일들 패키징하기](http://whiteship.me/1984)
- <a href="http://dgkim84.tistory.com/101"
  class="bare">http://dgkim84.tistory.com/101</a>
- <a
  href="http://mojo.codehaus.org/javancss-maven-plugin/http://maven-plugins.sourceforge.net/maven-javancss-plugin/http://emma.sourceforge.net/maven-emma-plugin/http://maven.apache.org/guides/development/guide-testing-development-plugins.html"
  class="bare">http://mojo.codehaus.org/javancss-maven-plugin/http://maven-plugins.sourceforge.net/maven-javancss-plugin/http://emma.sourceforge.net/maven-emma-plugin/http://maven.apache.org/guides/development/guide-testing-development-plugins.html</a>
- <a href="http://dgkim84.tistory.com/101"
  class="bare">http://dgkim84.tistory.com/101</a>
- <http://mojo.codehaus.org/javancss-maven-plugin/>
- <http://maven-plugins.sourceforge.net/maven-javancss-plugin/>
- <http://emma.sourceforge.net/maven-emma-plugin/>
- <http://maven.apache.org/guides/development/guide-testing-development-plugins.html>
- <http://maven.apache.org/plugin-developers/cookbook/attach-source-javadoc-artifacts.html>

</div>

<div class="listingblock">

<div class="content">

``` highlight
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-jar-plugin</artifactId>
  <configuration>
  <archive>
    <manifest>
    <addClasspath>true</addClasspath>
    <mainClass>ca.sqlpower.architect.swingui.ArchitectFrame</mainClass>
    <classpathPrefix>lib/</classpathPrefix>
    </manifest>
    <manifestEntries>
      <Class-Path>jdbc/</Class-Path>
     </manifestEntries>
     </archive>
    </configuration>
</plugin>
```

</div>

</div>

<div class="paragraph">

exec plugin

</div>

<div class="listingblock">

<div class="content">

``` highlight
          <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>exec-maven-plugin</artifactId>
            <executions>
              <execution>
                <phase>deploy</phase>
                <goals>
                  <goal>exec</goal>
                </goals>
              </execution>
            </executions>
            <configuration>
              <executable>/home1/irteam/bin/tomcat.sh</executable>
              <workingDirectory>/home1/irteam/bin</workingDirectory>
              <arguments>
                <argument>start</argument>
                <argument>buzz</argument>
              </arguments>
            </configuration>
          </plugin>
```

</div>

</div>

<div class="paragraph">

Resource Filter encoding 설정

</div>

<div class="listingblock">

<div class="content">

``` highlight
             <plugin>
               <groupId>org.apache.maven.plugins</groupId>
               <artifactId>maven-resources-plugin</artifactId>
               <configuration>
                       <encoding>UTF-8</encoding>
                   </configuration>
               </plugin>
```

</div>

</div>

</div>

<div class="sect3">

#### archetype

<div class="paragraph">

[maven archetype 만들기](http://arawn.tistory.com/38)

</div>

<div class="paragraph">

<http://www.sonatype.com/books/mvnref-book/reference/archetype-sect-third-party.html>

</div>

<div class="paragraph">

<http://www.sonatype.com/books/mvnref-book/reference/archtype-sect-generate.html>

</div>

<div class="paragraph">

mvn install:install-file -Dfile=C:\aa.jar -DgroupId=aa -DartifactId=aa
-Dversion=1.0 -Dpackaging=jar

</div>

<div class="paragraph">

mvn archetype:update-local-catalog

</div>

<div class="paragraph">

mvn archetype:generate

</div>

</div>

<div class="sect3">

#### Maven - Eclipse

<div class="paragraph">

[Maven 강좌 5 - Maven 기반의 Eclipse 프로젝트 생성 및
활용](http://javajigi.tistory.com/91)

</div>

<div class="paragraph">

[Eclipse-Maven2-tools.jar 문제
해결](http://msinterdev.org/blog/entry/Eclipse-Maven2-toolsjar-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0?TSSESSIONmsinterdevorgblog=46ef6ae21901697c556d92d05477786d)

</div>

<div class="paragraph">

[Maven으로 이클립스 프로젝트 만들기 - Screen
Cast](http://whiteship.tistory.com/1595)

</div>

<div class="paragraph">

[MAVEN을 사용하세요. 코딩이
편해집니다.](http://whiteship.tistory.com/1646)

</div>

<div class="literalblock">

<div class="content">

    <classpathentry kind="con" path="org.maven.ide.eclipse.MAVEN2_CLASSPATH_CONTAINER">
        <attributes>
            <attribute name="org.eclipse.jst.component.dependency" value="/WEB-INF/lib"/>
        </attributes>
    </classpathentry>

</div>

</div>

<div class="literalblock">

<div class="content">

    <nature>org.eclipse.jdt.core.javanature</nature>
    <nature>org.maven.ide.eclipse.maven2Nature</nature>
    <nature>org.eclipse.wst.common.project.facet.core.nature</nature>
    <nature>org.eclipse.wst.common.modulecore.ModuleCoreNature</nature>
    <nature>org.eclipse.jem.workbench.JavaEMFNature</nature>

</div>

</div>

<div class="paragraph">

[Getting Maven and Eclipse to work together to filter
resources](http://cmaki.blogspot.com/2007/10/getting-maven-and-eclipse-to-work.html)

</div>

<div class="paragraph">

<http://jira.codehaus.org/browse/MJNCSS-16>

</div>

<div class="paragraph">

<http://jira.codehaus.org/browse/MJNCSS-15>

</div>

<div class="paragraph">

[Maven 프로젝트 이클립스 import
하기](http://javacan.tistory.com/entry/HowToImportMavenProjectIntoEclipse)

</div>

<div class="sect4">

##### Maven-Eclipse plugin

<div class="paragraph">

<http://maven.apache.org/plugins/maven-eclipse-plugin/>

</div>

<div class="paragraph">

<http://mevenide.codehaus.org/>

</div>

<div class="paragraph">

<http://www.nabble.com/JavaNCSS-Maven-Plugin-td15224237.html>

</div>

<div class="paragraph">

[Maven resource filtering with Maven Integration for
Eclipse](http://swik.net/Eclipse/Euxx/Maven+resource+filtering+with+Maven+Integration+for+Eclipse/b2w9e)

</div>

<div class="exampleblock">

<div class="content">

<div class="paragraph">

==== 테스트

</div>

<div class="paragraph">

`Skip : -Dmaven.test.skip=true`

</div>

<div class="literalblock">

<div class="content">

    <properties>
        <maven.test.skip>true</maven.test.skip>
    </properties>

</div>

</div>

<div class="paragraph">

하나만 : `-Dtest=MyTest`

</div>

<div class="paragraph">

[통합 테스트 분리와 메이븐 관련 참조 할 글](http://whiteship.me/2227)

</div>

<div class="paragraph">

[메이븐 프로젝트에서 단위/통합 테스트 어설프게
구분하기](http://whiteship.me/2233)

</div>

<div class="paragraph">

[http://igooo.org/tc/entry/Maven-Test-수행하기](http://igooo.org/tc/entry/Maven-Test-%EC%88%98%ED%96%89%ED%95%98%EA%B8%B0)

</div>

<div class="paragraph">

메모리 문제시

</div>

<div class="paragraph">

export MAVEN_OPTS=-XX:MaxPermSize=256m

</div>

<div class="paragraph">

-XX:MaxPermSize=256m

</div>

<div class="literalblock">

<div class="content">

     <plugin>
     <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.4.3</version>
            <configuration>
              <argLine>-Xmx256m</argLine>  << 요 부분에 좀 자세히 적어주시면 될 겁니다.
              <forkMode>once</forkMode>
              <reportFormat>xml</reportFormat>
            </configuration>
    </plugin>

</div>

</div>

<div class="paragraph">

<http://docs.codehaus.org/display/MAVENUSER/Maven+and+Integration+Testing>

</div>

<div class="paragraph">

<http://www.edwardkim.pe.kr/?tag=test>

</div>

<div class="paragraph">

==== 주의할 점

</div>

<div class="paragraph">

<http://www.filsa.net/2008/02/11/maven-and-the-method-does-not-override-a-method-from-its-superclass-error/>

</div>

<div class="paragraph">

Version 인식문제

</div>

<div class="paragraph">

==== Profile

</div>

<div class="paragraph">

<http://java.dzone.com/articles/maven-profile-best-practices>

</div>

<div class="paragraph">

=== Library 검색

</div>

<div class="paragraph">

<http://maven.ozacc.com/>

</div>

<div class="paragraph">

<http://www.mvnbrowser.com/index.html>

</div>

<div class="paragraph">

<http://repository.sonatype.org/>

</div>

<div class="paragraph">

=== Repository

</div>

<div class="paragraph">

[Nexus Maven Repository 1.0 출시](http://toby.epril.com/?p=420)

</div>

<div class="paragraph">

[Maven 용어 3 (Repository)](http://whiteship.tistory.com/1269)

</div>

<div class="paragraph">

[Maven 강좌 4 - Maven을 이용하여 Dependency 라이브러리 관리
방법](http://javajigi.tistory.com/87)

</div>

<div class="paragraph">

[Maven 강좌 6 - Artifactory를 이용하여 Maven Repository
세팅하기](http://javajigi.tistory.com/92)

</div>

<div class="paragraph">

[Eclipse-Maven2-tools.jar 문제
해결](http://msinterdev.org/blog/entry/Eclipse-Maven2-toolsjar-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0?TSSESSIONmsinterdevorgblog=46ef6ae21901697c556d92d05477786d)

</div>

<div class="paragraph">

[Setting Up Maven
Repository](http://www.theserverside.com/tt/articles/article.tss?l=SettingUpMavenRepository)

</div>

<div class="paragraph">

[\[메이븐 저장소](http://whiteship.me/?p=12858) war 버전 Nexus 설치 및
설정\]

</div>

<div class="paragraph">

[Using Maven2 projects at
googlecode.com](http://blog.fastconnect.fr/?p=275)

</div>

<div class="paragraph">

<https://docs.sonatype.org/display/Repository/Central+Sync+Requirements>

</div>

<div class="paragraph">

<http://maven.apache.org/guides/mini/guide-central-repository-upload.html>

</div>

<div class="paragraph">

<http://stuartsierra.com/2009/09/08/run-your-own-maven-repository>

</div>

<div class="paragraph">

<http://cemerick.com/2010/08/24/hosting-maven-repos-on-github/>

</div>

<div class="paragraph">

=== Maven WAS

</div>

<div class="paragraph">

===== Jetty

</div>

<div class="paragraph">

\<build\>

</div>

<div class="paragraph">

\<plugin\>

</div>

<div class="paragraph">

\<groupId\>org.mortbay.jetty\</groupId\>

</div>

<div class="paragraph">

\<artifactId\>maven-jetty-plugin\</artifactId\>

</div>

<div class="paragraph">

\<configuration\>

</div>

<div class="paragraph">

\<scanIntervalSeconds\>3\</scanIntervalSeconds\>

</div>

<div class="paragraph">

\<contextPath\>/\</contextPath\>

</div>

<div class="paragraph">

\<connectors\>

</div>

<div class="paragraph">

\<connector
implementation="org.mortbay.jetty.nio.SelectChannelConnector"\>

</div>

<div class="paragraph">

\<port\>8080\</port\>

</div>

<div class="paragraph">

\</connector\>

</div>

<div class="paragraph">

\</connectors\>

</div>

<div class="paragraph">

\</configuration\>

</div>

<div class="paragraph">

\</plugin\>\<plugin\>

</div>

<div class="paragraph">

[Maven을 이용한 웹 어플리케이션 개발 및 Jetty
연동법](http://javacan.tistory.com/entry/WebAppDevelopmentUsingMaven)

</div>

<div class="paragraph">

===== Tomcat

</div>

<div class="paragraph">

\<groupId\>org.codehaus.mojo\</groupId\>

</div>

<div class="paragraph">

\<artifactId\>tomcat-maven-plugin\</artifactId\>

</div>

<div class="paragraph">

\<version\>1.0\</version\>

</div>

<div class="paragraph">

\<configuration\>

</div>

<div class="literalblock">

<div class="content">

    <path>/admin</path>

</div>

</div>

<div class="literalblock">

<div class="content">

    </configuration>

</div>

</div>

<div class="paragraph">

\</plugin\>

</div>

<div class="paragraph">

\</plugins\>

</div>

<div class="paragraph">

\</build\>

</div>

<div class="paragraph">

Tomcat maven plugin 소스 :
<a href="https://github.com/apache/tomcat-maven-plugin"
class="bare">https://github.com/apache/tomcat-maven-plugin</a>

</div>

<div class="paragraph">

=== Eclipse Integration

</div>

<div class="paragraph">

<http://wiki.eclipse.org/M2E_plugin_execution_not_covered>

</div>

<div class="paragraph">

===== m2 Eclipse

</div>

<div class="paragraph">

update site : <http://m2eclipse.sonatype.org/update/>, \<font
color="#0000ff"\><a href="http://download.eclipse.org/technology/m2e/releases%3C/font%3E"
class="bare">http://download.eclipse.org/technology/m2e/releases&lt;/font&gt;</a>;

</div>

<div class="paragraph">

[Maven Integration for Eclipse](http://m2eclipse.codehaus.org/) (M2
Eclipse):

</div>

<div class="paragraph">

[pom.xml에 종속성 추가하기](http://whiteship.tistory.com/1602)

</div>

<div class="paragraph">

[Introduction to
m2eclipse](http://www.theserverside.com/tt/articles/article.tss?l=Introductiontom2eclipse)

</div>

<div class="paragraph">

[Effective POM과 M2Eclipse Plugin](http://toby.epril.com/?p=568)

</div>

<div class="paragraph">

[Getting Maven and Eclipse to work together to filter
resources](http://cmaki.blogspot.com/2007/10/getting-maven-and-eclipse-to-work.html)

</div>

<div class="paragraph">

===== Q4e

</div>

<div class="paragraph">

[q4e](http://q4e.googlecode.com/svn/trunk/updatesite)

</div>

<div class="paragraph">

[Q4E 플러그인 사용기 1](http://whiteship.tistory.com/1604)

</div>

<div class="paragraph">

[이클립스용 Maven 플러그인 Q4EMaven 플러그인
Q4E](http://whiteship.tistory.com/1601)

</div>

<div class="paragraph">

Local에 파일설치 : mvn install:install-file -Dfile=ojdbc14.jar
-DgroupId=com.oracle-DartifactId=ojdbc14 -Dversion=10.2.0.2.0
-Dpackaging=jar

</div>

<div class="paragraph">

Release

</div>

<div class="paragraph">

mvn release:prepare -Darguments="-DskipTests" -Dusername=benelog
-Dpassword=234234

</div>

<div class="paragraph">

War 파일에 버전 새기기

</div>

<div class="listingblock">

<div class="content">

``` highlight
 <properties>
 <maven.build.timestamp.format>yyyy-MM-dd HH:mm:ss</maven.build.timestamp.format>

  </properties>

  <plugin>

 <artifactId>maven-war-plugin</artifactId>

 <configuration>

 <webappDirectory>${deploy.dir}</webappDirectory>

 <archive>

 <manifestEntries>

 <Build-Date>${maven.build.timestamp}</Build-Date>

 <Revision-Number>${revision}</Revision-Number>

 </manifestEntries>

 </archive>

 </configuration>

 </plugin>
```

</div>

</div>

<div class="paragraph">

<a
href="http://stackoverflow.com/questions/1272648/reading-my-own-jars-manifest"
class="bare">http://stackoverflow.com/questions/1272648/reading-my-own-jars-manifest</a>

</div>

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
- [[ant]]
- [[build-etc]]
- [[gradle]]
