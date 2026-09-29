## 주요 사이트

- 홈페이지 : <http://kettle.pentaho.org/>
- 포럼 (질문과 답변) : <http://forums.pentaho.org/forumdisplay.php?f=69>
- 제품소개 : <http://www.pentaho.com/products/data_integration/>
- 다운로드 : <ftp://download.pentaho.org/client/data-integration/>

## 정보페이지

- <http://www.pentaho.com/docs/pentaho_subscriptions_feature_comparison.pdf>

## 다른 java코드 연동

- <http://www.anyang-window.com.cn/kettle-java-api-learning/>

## Log table

```sql
CREATE TABLE kettle_job_log
(
  ID_JOB INTEGER
, JOBNAME VARCHAR2(255)
, STATUS VARCHAR2(15)
, LINES_READ INTEGER
, LINES_WRITTEN INTEGER
, LINES_UPDATED INTEGER
, LINES_INPUT INTEGER
, LINES_OUTPUT INTEGER
, ERRORS INTEGER
, STARTDATE DATE
, ENDDATE DATE
, LOGDATE DATE
, DEPDATE DATE
, REPLAYDATE DATE
, LOG_FIELD CLOB
)
```

## PDI JNDI

- <http://forums.pentaho.org/showthread.php?t=27648>
- <http://forums.pentaho.org/showthread.php?t=56167>

```sh
-Djava.naming.factory.initial="org.osjava.sj.SimpleContextFactory" -Dorg.osjava.sj.root="D:/pentaho/pentaho1.53/kettle250/simple-jndi" -Dorg.osjava.sj.delimiter="/"
```

1. java.naming.factory.initial. For example, "org.osjava.sj.SimpleContextFactory".
2. org.osjava.sj.root. For example, "D:/pentaho/pentaho1.53/kettle250/simple-jndi".
3. org.osjava.sj.delimiter. For example, "/".

### JNDI

simple-jndi/jdbc.properties

```java
private void initJNDI() {
    String path = ""; //$NON-NLS-1$
    try {
        File file = new File("simple-jndi"); //$NON-NLS-1$
        path = file.getCanonicalPath();
    } catch (Exception e) {
        log.logError(toString(), "Error initializing JNDI", e);
    }
    System.setProperty("java.naming.factory.initial", "org.osjava.sj.SimpleContextFactory"); //$NON-NLS-1$ //$NON-NLS-2$
    System.setProperty("org.osjava.sj.root", path); //$NON-NLS-1$ //$NON-NLS-2$
    System.setProperty("org.osjava.sj.delimiter", "/"); //$NON-NLS-1$ //$NON-NLS-2$
}
```

### Sample

```properties
SampleData/type=javax.sql.DataSource
SampleData/driver=org.hsqldb.jdbcDriver
SampleData/url=jdbc:hsqldb:hsql://localhost/sampledata
SampleData/user=pentaho_user
SampleData/password=password
```

## PDI schedule 설정

### 스케쥴 관련 정보 DB저장 모습

```sql
INSERT INTO R_REPOSITORY_LOG VALUES(387,'3.0','2008-10-16 11:17:47.906000000','admin','save job ''sanghyuk Job''')
INSERT INTO R_JOB VALUES(2,0,'sanghyuk Job',NULL,NULL,NULL,0,-1,NULL,'admin','2008-06-03 21:16:09.000000000','admin','2008-10-16 11:17:47.890000000','Y','N','Y',NULL)
INSERT INTO R_JOBENTRY VALUES(3,2,10,'START','Special entries')
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(21,2,3,0,'start',0.0,'Y')
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(22,2,3,0,'dummy',0.0,'N')
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(23,2,3,0,'repeat',0.0,'Y')
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(24,2,3,0,'schedulerType',1.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(25,2,3,0,'intervalSeconds',5.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(26,2,3,0,'intervalMinutes',0.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(27,2,3,0,'hour',12.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(28,2,3,0,'minutes',0.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(29,2,3,0,'weekDay',1.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(30,2,3,0,'dayOfMonth',1.0,NULL)
INSERT INTO R_JOBENTRY_COPY VALUES(3,3,2,10,0,98,124,'Y','N')
INSERT INTO R_JOBENTRY VALUES(4,2,10,'DUMMY 1','Special entries')
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(31,2,4,0,'start',0.0,'N')
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(32,2,4,0,'dummy',0.0,'Y')
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(33,2,4,0,'repeat',0.0,'N')
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(34,2,4,0,'schedulerType',0.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(35,2,4,0,'intervalSeconds',0.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(36,2,4,0,'intervalMinutes',60.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(37,2,4,0,'hour',12.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(38,2,4,0,'minutes',0.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(39,2,4,0,'weekDay',1.0,NULL)
INSERT INTO R_JOBENTRY_ATTRIBUTE VALUES(40,2,4,0,'dayOfMonth',1.0,NULL)
INSERT INTO R_JOBENTRY_COPY VALUES(4,4,2,10,0,200,124,'Y','N')
INSERT INTO R_JOB_HOP VALUES(2,2,3,4,'Y','Y','Y')
```

## PDI 정규식

### HTML 제외하기

```javascript
var contentHtml = content.getString();
var strReg = "<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>";
var contentText = contentHtml.replaceAll(strReg, "").trim();
content.setValue(contentText);
```

### 그림파일명만 추출

```javascript
var contentHtml = content.getString();
var strReg = new RegExp("http://kitchenimg.naver.com/*[^>]*\\.(jpg|gif)","gim");
var xArr =  contentHtml.match(strReg);
var result = "";

if ( xArr != null ) {
    for(i=0;i<xArr.length;i++) {
        if(i>0) result+=",";
        result+=xArr[i];
    }
}
content.setValue(result);
```

### 자르기

```javascript
var strToMatch = "info@proconis.de";
var strReg = "^(\\w+)@([a-zA-Z_]+?)\\.([a-zA-Z]{2,3})$";
var xArr =  str2RegExp(strToMatch, strReg);
if ( xArr != null ) {
    for(i=0;i<xArr.length;i++) {
        Alert(xArr[i]);
    }
}
else {
    Alert("no match");
}
```

## PDI Web Start로 실행하기

PDI(Pentaho Data Integration)의 웹스타트 실행 방법에 대한 자료는 아래의 링크가 유일한 것으로 보입니다.

- <http://forums.pentaho.org/showthread.php?t=48263>

PDI의 한글화 작업에 참여하시고 계시는 김영우님의 말씀에 의하면 현재 PDI개발자들은 웹스타트에 전혀 신경을 쓰지 않고 있다고 합니다. 대부분의 사용자들이 직접 다운을 받아서 설치를 해서 쓰고 있기 때문이겠죠.

일단 PDI의 웹사이트(<http://kettle.pentaho.org/> )에 가서 최신 버전의 소스를 다운 받습니다. 2008년 11월12일 현재 가장 최근에 정식 Release된 버전은 3.1.0 GA입니다. <http://downloads.sourceforge.net/pentaho/pdi-open-src-3.1.0-826.zip> 링크를 누르시면 바로 그 버전의 소스를 다운 받으실 수 있습니다.

막 개발된 더 따끈한 버전은 <ftp://download.pentaho.org/client/data-integration>에서 받으실 수 있습니다. 버그 패치 내역을 확인하고 필요하다면 정식 Release버전보다 더 높은 것을 쓸 수도 있겠습니다.

소스파일을 다운 받아서 풀면 Eclipse프로젝트로 바로 읽어드릴 수 있습니다. 그 프로젝트에서 build.xml파일을 보면 webstart라는 target이 있고, 이 것을 실행하면 /webstart 라는 폴더 아래에 kettle.war라는 파일을 만들어 주게 되어 있습니다. 하지만 그 전에 여러 절차를 거쳐야 합니다.

우선 build.xml 파일을 아래 부분들을 수정합니다.

1. "compile-ui" target에서 copy task에 포함할 파일에 `**/*.ico`를 포함시킨다.

    ```xml
    <copy todir="${classes-ui}">
        <fileset dir="${src-ui}" includes="**/*.png **/*.ico **/*.xml **/*.xul **/*properties"/>
    </copy>
    <!-- embedd the UI definition files in the jar so that webstart will work -->
    <copy todir="${classes-ui}/ui">
        <fileset dir="${ui}" includes="**/*.png **/*.ico **/*.xml **/*.xul **/*.properties"/>
    </copy>
    ```

2. "webstart" target 안에 있는 war 테스크에서 ui/images/ 폴더도 포함시킨다. (`<include name="ui/images/*"/>` 추가)

    ```xml
    <include name="**/*.xul"/>
    <include name="ui/images/*"/>
    <include name="kettle_logo.png"/>
    ```

그리고 /web 디렉토리 밑에 있는 spoon.jnlp 파일에서 다음 부분들을 수정합니다.

1. jnlp 태그의 codebase 속성등 localhost를 참조하는 부분은 설치할 서버의 주소로 바꾸어 준다.
2. `<resources>`태그 아래에서 jar파일 선언 중 `<jar href="lib/kettle-ui-swt.jar"/>` 를 가장 위로 올린다.
3. mail.jar, activation.jar 파일은 별도로 서명이 되어 있어서 따로 jnlp파일로 뺄 것이므로 spoon.jnlp에서는 제외한다.
4. edtftpj-1.5.4.jar jsch-0.1.24.jar 파일은 현재 프로젝트에는 그 보다 높은 버전인 edtftpj-2.0.2.jar, jsch-0.1.38.jar파일이 포함되어 있으므로 jar파일 선언에서 파일명을 바꾸어 준다.
5. Spoon 실행시에 넘길 파라미터가 있으면 아래와 같이 포함시켜 준다.

    ```xml
    <application-desc main-class="org.pentaho.di.ui.spoon.Spoon">
        <argument>-user=admin</argument>
        <argument>-pass=admin</argument>
    </application-desc>
    ```

그리고 activation.jnlp, mail.jnlp, swt.jnlp 들도 localhost로 된 주소들을 설치될 환경에 맞게 수정해 줍니다.

그리고 마지막으로 respository 설정을 webstart에서도 공유하고 싶다면 repositories.xml 파일을 /src/org/pentaho/di/repositor/ 디렉토리에 넣어줍니다. Spoon이 실행될 때 repositories.xml파일을 $user.home/.kettle/ 아래에서 찾아보고 없으면 같이 배포된 jar파일 안에서 찾게 되어 있습니다. 그래서 jar파일로 묶기 전에 소스 폴더에 repositories.xml을 webstart로 실행할 때 같이 쓸 repository에 대한 정보도 넘길 수가 있는 것이죠.

모든 과정을 마쳤으면 Ant로 build.xml에 있는 webstart target을 실행하고, 만들어진 kettle.war파일을 설치할 서버의 webapps 아래 등에 복사해 주면 됩니다. 그리고 해당하는 주소에 접근하면 index.html 안에서 spoon.jnlp을 실행할 수 있는 링크를 탈 수 있게 됩니다.

## Related
- [[data-integration]]
- [[jndi]]
- [[job-scheduling]]
- [[regular-expression]]
- [[ant]]
