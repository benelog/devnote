# Spring resource handling 예제프로젝트

- <https://github.com/bclozel/spring-resource-handling/blob/master/client/pom.xml>
- <https://github.com/bclozel/spring-resource-handling/blob/master/client/package.json>
- <https://github.com/bclozel/spring-resource-handling/blob/master/client/gulpfile.js>
- <https://github.com/bclozel/spring-resource-handling/blob/master/server/src/main/java/org/springframework/samples/resources/WebConfig.java> 개발모드 일때는 src 아래의 폴더를 바로 봄.

``` java
    String location = devMode ? "file:///" + getProjectRootRequired() + "/client/src/" : "classpath:static/";
```

# sagan의 빌드 파일

## sagan-client

- <https://github.com/spring-io/sagan/commit/4a7d4aedf68e1927dc246a5c6cd4c5aa6576d0bd> 에서 spring-boot의 기본 전략 사용하는것으로 수정

### 이전 방식

- <https://github.com/spring-io/sagan/blob/master/sagan-client/build.gradle>

## sagan-site

- <https://github.com/spring-io/sagan/blob/master/sagan-site/build.gradle>
- `compile project(':sagan-client')`로 의존성 선언
- Gradle에서 옵션으로 SAGAN_HOME 지정

<!-- -->

    applicationDefaultJvmArgs = [
      // Set SAGAN_HOME env variable to the root of sagan project. This allows to register an additional
      // resource handler location and serve static resources directly from the sagan-client module during dev.
      // See sagan.ClientResourcesConfig
      "-DSAGAN_HOME=${rootProject.rootDir}"
    ]

<!-- -->

    @Configuration
    @Profile(SaganProfiles.STANDALONE)
    class ClientResourcesConfig extends WebMvcConfigurerAdapter {

          @Value("${SAGAN_HOME:}")
      private String saganPath;

          @Override
      public void addResourceHandlers(ResourceHandlerRegistry registry) {
          if (!this.saganPath.isEmpty()) {
              registry.addResourceHandler("/**")
                      .addResourceLocations("file:///" + this.saganPath + "/sagan-client/src/")
                      .setCachePeriod(0);
          }
      }
    }

  - Profile이 특별히 없으면 DEFAULT 프로파일 할당

# Spring boot의 디폴트 동작

\*.jar의 static 폴더에 있는 자원을 자동으로 등록

- <https://spring.io/blog/2013/12/19/serving-static-web-content-with-spring-boot>

spring.resources.static-locations 로 수정 가능

    spring.resources.static-locations=classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/,classpath:/public/ # Locations of static resources.

# Cache 전략

[웹의 정적 리소스의 버전 명시를 통한 캐시
전략](http://kwon37xi.egloos.com/4735742)

## Related
