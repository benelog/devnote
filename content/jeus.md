- Jeus에서 다른 context의 클래스 파일을 참조하고자 할때 <http://openframework.or.kr/blog/?p=214>
- [JeusJDBC.pdf](https://github.com/benelog/devnote/blob/master/attachments/158484_JeusJDBC.pdf)
- [JeusJNDI관련.pdf](https://github.com/benelog/devnote/blob/master/attachments/158486_JeusJNDI%EA%B4%80%EB%A0%A8.pdf)
- [web class 변경 시 jeus 재구동 안하는 방법](http://blog.naver.com/phrack/80048636283)
- [노드명을 한글로 사용한 경우](http://blog.naver.com/phrack/80050788056)
- [\[JEUS, WebtoB\] 기본환경구성](http://blog.naver.com/loveji0702/140055315148)

## Jeus 한글설정

```sh
scfg1
scfg1 is an alias for 'cd $JEUS_HOME/config/${HOST_NAME}/${HOST_NAME}_servlet_engine1'
```

WEBMain.xml 에서 encoding 부분 추가 또는 수정

```xml
<web-container>
    <redirect-stdout>true</redirect-stdout>
    <redirect-stderr>true</redirect-stderr>
    <context-group>
        <group-name>EduGroup</group-name>
        <group-docbase>webapps</group-docbase>
        <print-error-to-browser>true</print-error-to-browser>
        <encoding>
                <request-encoding>
                    <forced>EUC-KR</forced>
                </request-encoding>
                <response-encoding>
                    <forced>EUC-KR</forced>
                </response-encoding>
                <postdata-encoding>
                    <forced>EUC-KR</forced>
                </postdata-encoding>
        </encoding>
        <session-config>
            <timeout>20</timeout>
            <shared>true</shared>
            <persistent>true</persistent>
        </session-config>
        <jsp-engine>
            <keep-generated>true</keep-generated>
            <java-compiler>javac</java-compiler>
            <jsp-work-dir>/edudocs/jspwork</jsp-work-dir>
            <compile-encoding>EUC-KR</compile-encoding>
        </jsp-engine>
        <logging>
            <error-log>
                <target>file</target>
                <level>error</level>
                <buffer-size>0</buffer-size>
                <valid-day>1</valid-day>
            </error-log>
            <user-log>
                <target>file</target>
                <buffer-size>0</buffer-size>
                <valid-day>1</valid-day>
            </user-log>
            <access-log>
                <target>file</target>
                <buffer-size>0</buffer-size>
                <valid-day>1</valid-day>
                <log-format>
                    <time-format>default</time-format>
                </log-format>
            </access-log>
        </logging>
        <context>
            <context-name>default</context-name>
            <context-path>/</context-path>
        </context>
        <context>
            <context-name>examples</context-name>
            <context-path>/examples</context-path>
        </context>
        <webserver-connection>
            <webtob-listener>
                <listener-id>WebtobListener</listener-id>
                <port>9900</port>
                <output-buffer-size>8192</output-buffer-size>
                <webtob-address>localhost</webtob-address>
                <registration-id>EduGroup</registration-id>
                <hth-count>1</hth-count>
                <thread-pool>
                    <min>30</min>
                    <max>30</max>
                    <step>1</step>
                    <max-idle-time>1000</max-idle-time>
                </thread-pool>
            </webtob-listener>
<!--
            <http-listener>
                <listener-id>http1</listener-id>
                <port>8088</port>
                <output-buffer-size>8192</output-buffer-size>
                <thread-pool>
                    <min>25</min>
                    <max>30</max>
                    <step>2</step>
                    <max-idle-time>1000</max-idle-time>
                </thread-pool>
            </http-listener>
-->
        </webserver-connection>
    </context-group>
</web-container>
```

## Children
- [[webtob]]
- [[jeus-tuning]]
- [[jeus-admin-manual]]

## Related
- [[servlet]]
- [[tomcat]]
- [[ejb]]
- [[jndi]]
- [[jdbc]]
- [[java-encoding]]
