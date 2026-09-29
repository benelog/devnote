## 링크

- <http://www.poweredbypulse.com/index.php>
- [eclipse Problems뷰 필터 사용하기](http://okjsp.tistory.com/1165643140)
- [eclipse TCP/IP 모니터 사용하기](http://okjsp.tistory.com/1165643156)
- [Configuring and adding menu items in Eclipse V3.3](http://www.ibm.com/developerworks/opensource/library/os-eclipse-3.3menu/)
- [eclipse 연습장처럼 사용하기 - scrapbook](http://okjsp.tistory.com/1165643063)
- [Debug Java applications remotely with Eclipse](http://www.ibm.com/developerworks/java/library/os-eclipse-javadebug/index.html?ca=dgr-jw22os-eclipse-javadebug/index.html&S_TACT=105AGX59&S_CMP=GRsitejw22)

Eclipse Test and Performance Tools Platform Series One : Profiling \[번역\] \[사족\] (IBM)<br>
Eclipse Test nad Performance Tools Platforms Series : Monitoring \[번역\] \[사족\](IBM)<br>
Eclipse Test nad Performance Tools Platforms Series : Test Applications \[번역\] (IBM)<br>
Eclipse at eBay, Part 1: Tailoring Eclipse to the eBay architecture ([번역](http://www.ibm.com/developerworks/kr/library/os-eclipse-ebay1/), 사족) (IBM)

## 가니메데

- [이클립스 V3.4 완전 정복, Part 1: 이클립스 IDE 워크벤치](http://www.ibm.com/developerworks/kr/library/os-eclipse-master1/)
- [한 눈에 보는 이클립스 가니메데](http://www.ibm.com/developerworks/kr/library/os-eclipse-ganymede/)

## Eclipse WTP

- [eclipse WTP 서버 기동시간 체크 옵션](http://okjsp.tistory.com/1165643334)
- [\[WTP\] include된 jsp, jspf가 validation error를 낼 때](http://blog.naver.com/phrack/80052754593)
- [Getting Maven and Eclipse to work together to filter resources](http://cmaki.blogspot.com/2007/10/getting-maven-and-eclipse-to-work.html)
- [Maven2와 Eclipse/WTP 함께쓰기](http://iolothebard.tistory.com/269)

최근버전 m2eclipse 에서는 "maven Integration for WTP" 플러그인을 함께 설치하고 pom.xml 에서

```xml
<packaging>war</packaging>
```

로 해주면 dynamic web project 연동이 잘 됩니다. m2wtp 와 달리 sonartype에서 제공하는 플러그인

다만, project facet이 servlet 2.5 로 고정되어, tomcat 6.0 하고만 연동되어 수작업을 약간 해주는 문제가 있었습니다.

`.settings/org.eclipse.wst.common.project.facet.core.xml` 에서

```xml
<installed facet="jst.web" version="2.5"/>
```

의 버전을 2.4 로 수정해야 tomcat 5.5 에서도 연동이 되지요.

아무튼, pom 의 packaging 을 jar 로 할 때 생기는 문제인 "debuging 시 엄한 library로 연결된다거나 sources.jar 연결을 수작업으로 해야한다"거나 "library copy 과정에서 동일라이브러리의 버전 중복" 같은건 packaging을 war 로 바꾸면 거의 해결됩니다

Java compiler level does not match the version of the installed Java project facet.

```
org.maven.ide.eclipse.MAVEN2_CLASSPATH_CONTAINER
```

## Children
- [[eclipse-plugins]]
- [[eclipse-shortcuts]]
- [[eclipse-template]]

## Related
- [[maven]]
- [[java-profiling]]
