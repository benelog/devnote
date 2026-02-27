# Pattern

<http://www.google.com/events/io/2010/sessions/developing-RESTful-android-apps.html>\<ul\>\<li
style="list-style: disc outside url("bullet.gif");"\>Activity안에서
RestClient를 구현하지 마라.\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>Long runinng operations는 Service에서
시작하라.\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>Persist early, Persist often\</li\>\<li
style="list-style: disc outside url("bullet.gif");"\>Service,
ContentProvider, SyncAdaptor 등을 활용하는 3가지 패턴 권장\</li\>\</ul\>

# 기본 클래스

## [AndroidHttpClient](https://developer.android.com/reference/android/net/http/AndroidHttpClient.html)

implementation of the Apache DefaultHttpClient that is configured with
reasonable default settings

## [HttpUrlConnection](http://developer.android.com/reference/java/net/HttpURLConnection.html)

By default, this implementation of HttpURLConnection requests that
servers use gzip compression.

기본적으로 gzip

Bugs

[Issue 2939: The chunked HTTT input stream must hurry the underlying
stream](http://code.google.com/p/android/issues/detail?id=2939)

### [AndroidHttpClient.java](https://github.com/android/platform_frameworks_base/blob/master/core/java/android/net/http/AndroidHttpClient.java)

    main 쓰레드에서 못 돌도록

default \<ul\>\<li style="list-style: disc outside
url("bullet.gif");"\>connection timeout : 60초\</li\>\<li
style="list-style: disc outside url("bullet.gif");"\>sockettimeout:
60초\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>socket buffer size : 8192\</li\>\<li
style="list-style: disc outside url("bullet.gif");"\>redirect :
false\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>ThreadSafeClientConnManager 사용 \</li\>\</ul\>

### [HttpResponseCache](https://developer.android.com/reference/android/net/http/HttpResponseCache.html)

Http 표준 스펙에 의해 Cache

<http://android-developers.blogspot.kr/2011/09/androids-http-clients.html>

# Frameworks

## [Spring Android](http://www.springsource.org/spring-android)

\<ul\>\<li style="list-style: disc outside url("bullet.gif");"\>
<http://www.infoq.com/presentations/Native-Android-Development-Practices>
\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\><https://github.com/SpringSource/spring-android-samples/tree/master/spring-android-showcase>\</li\>\<li
style="list-style: disc outside url("bullet.gif");"\>
<http://blog.springsource.com/2010/12/17/spring-android-and-maven-part-1/>
\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>RestClient와 Auth지원\</li\>\<li style="list-style:
disc outside url("bullet.gif");"\>Server쪽의 RestTemplate을 Android에
맞게 수정\<ul\>\<li style="list-style: disc outside
url("bullet.gif");"\>Logging을 Android 로깅으로\</li\>\<li
style="list-style: disc outside url("bullet.gif");"\>디폴트 동작 변경
(디폴트 생성자로는 Converter가 등록되지 않음.)\</li\>\<li
style="list-style: disc outside url("bullet.gif");"\>Gson등 Android에
적합한 라이브러리 지원\</li\>\</ul\>\</li\>\</ul\>

질문 PoolingClientConnectionManager은 Spring의 언제부터 들어갔는가?

## [google-http-java-client](https://code.google.com/p/google-http-java-client/)

## [Retrofit](https://github.com/square/retrofit)

\<ul\>\<li style="list-style: disc outside
url("bullet.gif");"\>Squre에서 쓰이고 있는걸 공개\</li\>\<li
style="list-style: disc outside url("bullet.gif");"\>Spring android +
Android annotations와 비슷한 형태 (interface에 Annotation으로 REST 호출
정도 기술)\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>Async에 대한 처리가 다소 편한듯.\</li\>\</ul\>

## [Android Asunchronous Http Client](http://loopj.com/android-async-http/)

## [Http request](https://github.com/kevinsawicki/http-request)

\<ul\>\<li style="list-style: disc outside url("bullet.gif");"\>The
single goal of this library is to improve the usability of the
HttpURLConnection class.\</li\>\</ul\>

## [DataDroid](https://github.com/foxykeep/DataDroid)

## [HttpResponseCache](https://github.com/candrews/HttpResponseCache)

\<ul\>\<li style="list-style: disc outside
url("bullet.gif");"\>ICS이후의
[HttpResponseCache](https://developer.android.com/reference/android/net/http/HttpResponseCache.html)를
배껴서 씀.\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>버전별 분기는 앱개발자가 알아서. 홈페이지에
나와있는 try-catch이용한 예제는 구림. 버전을 명시적으로 확인하는 방식이
좋을듯.\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>한정적인 용도에서만 이득이 있을듯.\<ul\>\<li
style="list-style: disc outside url("bullet.gif");"\>이미지를 따로
Cache하다면 주로 API 호출만 하는 앱에서는 효용성이 별로 없지
않을까?\</li\>\<li style="list-style: disc outside
url("bullet.gif");"\>Javascript 파일 같은 자원의 Cache가 이득이 있으려면
Webview를 쓸때도 적용이 될 수 있어야할 듯. 확인
필요\</li\>\</ul\>\</li\>\</ul\>

## OKHttp

<http://square.github.io/okhttp/>

||
||
