<div id="header">

</div>

<div id="content">

<div class="paragraph">

<http://cemerick.com/2010/08/24/hosting-maven-repos-on-github/>

</div>

<div class="sect3">

## 비교, 전환

<div class="paragraph">

<http://www.sonatype.com/people/2009/04/how-to-convert-from-ant-to-maven-in-5-minutes/>

</div>

</div>

<div class="sect3">

## MAVEN : The Definitive Guide

<div class="paragraph">

<http://sonatype.com/book/>

</div>

</div>

<div class="sect3">

## 시작하기

<div class="ulist">

- <http://maven.apache.org/guides/introduction/introduction-to-the-pom.html>
- [\[강좌](http://innerman.pe.kr/study/8960) maven 따라하기 - 프로젝트 생성, 빌드, 레포팅, 배포\]
- [아파치 메이븐 2 시작하기 (한글)](http://www.ibm.com/developerworks/kr/library/tutorial/j-mavenv2/section8.html)

- [Maven 설치하기](http://blog.naver.com/phrack/80051134315)
- [An introduction to Maven 2](http://www.javaworld.com/javaworld/jw-12-2005/jw-1205-maven.html)

</div>

<div class="paragraph">

생성 mvn archetype:create -DgroupId=com.mycompany.app -DartifactId=myapp

</div>

<div class="paragraph">

\[Maven으로 프로젝트 빌드하기 (maven1)\]

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

## Options

<div class="ulist">

- -e : 발생한 error에 대해서 보여준다.
- -X : Debug를 보여준다. 보통 이 옵션에 \> log.log 처럼 파일로 내보내서 무슨 문제가 생겼는지 확인하면 좋다.
- -U : 업데이트가 제대로 안되었을 경우 강제로 repository에서 업데이트 하도록한다.
- -fn : 에러가 나던 말던 일단 빌드부터 하고 본다.
- -P : 프로파일을 설정해서 하나의 프로젝트를 다른 설정으로 빌드할 수 있다.

</div>

</div>

<div class="sect3">

## 기초개념

<div class="ulist">

</div>

</div>

<div class="sect3">

## Life Cycle

<div class="ulist">

- [\[Maven](http://blog.naver.com/phrack/80051232261)Option\]
- [메이븐 상식: 기본 페이스(phase)](http://whiteship.me/2235)

</div>

</div>

<div class="sect3">

## Dependency

<div class="ulist">

- [Maven Dependency의 scope의 의미](http://homo-ware.tistory.com/43)
- [maven2 transitive dependency](http://blog.naver.com/iamteri/150030254660)

- \[Maven을 쓴다고 해서 종속성을 안중에서 Out 시킬 수 있느냐?\]
- exclusion을 하까마까 "가장 가까운" 의존성을 사용하게 됩니다

- [Maven의 version range를 사용할 때 주의할 점](http://toby.epril.com/?p=610)
- mvn versions:display-dependency-updates : 상위 버전 보여주기
- <a href="http://toby.epril.com/?p=610" class="bare">http://toby.epril.com/?p=610</a>

</div>

</div>

<div class="sect3">

## Site

<div class="ulist">

</div>

</div>

<div class="sect3">

## 디렉토리구조

<div class="ulist">

- [Maven의 default directory layout 변경하기](http://toby.epril.com/?p=414)

- <http://maven.apache.org/plugins/maven-war-plugin/war-mojo.html#warSourceDirectory>

</div>

</div>

<div class="sect3">

## Plug-in

<div class="ulist">

- <http://maven.apache.org/plugins/>
- <http://maven.apache.org/plugins/maven-jar-plugin/>
- <http://maven.apache.org/plugins/maven-assembly-plugin/> : Assemblies
- <http://mojo.codehaus.org/exec-maven-plugin/java-mojo.html>
- <http://mojo.codehaus.org/exec-maven-plugin/usage.html>
- [maven-dependency-plugin](http://maven.apache.org/plugins/maven-dependency-plugin/index.html) : [Maven 프로젝트 의존성 파일들 패키징하기](http://whiteship.me/1984)

- <a href="http://mojo.codehaus.org/javancss-maven-plugin/http://maven-plugins.sourceforge.net/maven-javancss-plugin/http://emma.sourceforge.net/maven-emma-plugin/http://maven.apache.org/guides/development/guide-testing-development-plugins.html" class="bare">http://mojo.codehaus.org/javancss-maven-plugin/http://maven-plugins.sourceforge.net/maven-javancss-plugin/http://emma.sourceforge.net/maven-emma-plugin/http://maven.apache.org/guides/development/guide-testing-development-plugins.html</a>

- <http://mojo.codehaus.org/javancss-maven-plugin/>
- <http://maven-plugins.sourceforge.net/maven-javancss-plugin/>
- <http://emma.sourceforge.net/maven-emma-plugin/>
- <http://maven.apache.org/guides/development/guide-testing-development-plugins.html>

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

## archetype

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

</div>

<div id="footer">

<div id="footer-text">

Last updated 2026-02-28 04:33:58 +0900

</div>

</div>

## Children
- [[maven-eclipse]]

## Related
- [[tomcat]]
- [[gradle]]
- [[ant]]
- [[java-build]]
