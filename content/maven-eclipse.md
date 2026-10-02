<div class="sect3">

## Maven - Eclipse

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

### Maven-Eclipse plugin

<div class="paragraph">

<http://maven.apache.org/plugins/maven-eclipse-plugin/>

</div>

<div class="paragraph">

<http://mevenide.codehaus.org/>

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

=== Repository

</div>

<div class="paragraph">

[Nexus Maven Repository 1.0 출시](http://toby.epril.com/?p=420)

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

===== m2 Eclipse

</div>

<div class="paragraph">

update site : <http://m2eclipse.sonatype.org/update/>, <http://download.eclipse.org/technology/m2e/releases>

</div>

<div class="paragraph">

[Maven Integration for Eclipse](http://m2eclipse.codehaus.org/) (M2
Eclipse):

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

## Related
- [[maven]]
- [[eclipse]]
- [[eclipse-plugins]]
