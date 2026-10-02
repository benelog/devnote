- <http://bcho.tistory.com/805>
- <http://www.slideshare.net/modestjude/docker-in-deview-2013>
- <https://github.com/google/lmctfy>
- <https://speakerdeck.com/jbeda/containers-at-scale>
- LXC and Android : <http://www.linuxplumbersconf.org/2013/ocw/proposals/975>
- <https://github.com/newrelic/centurion>
- <http://signup.resin.io/>
- <https://github.com/shipyard/shipyard>
- Docker 관련 간단 사용후기: <http://yisangwook.tumblr.com/post/89030483989/docker-misconceptions>
- Docker로 NodeJS 배포: <http://blog.abhinav.ca/blog/2014/06/17/develop-a-nodejs-app-with-docker/>
- <http://www.informationweek.com/cloud/platform-as-a-service/docker-container-system-works-with-all-linuxes/d/d-id/1112830>
- <https://docs.docker.com/articles/using_supervisord/>

## 도구

- <https://github.com/wagoodman/dive> : 이미지 레이어 확인
- [nspawn](https://nspawn.org/) : systemd-nspawn 머신을 Docker처럼 관리하는 도구
  - OCI 레지스트리와 Docker Hub에서 이미지를 받아 공유 레이어로 저장하고, systemd-machined/systemd D-Bus API로 머신을 시작·검사·중지한다.
  - systemd가 포함된 이미지는 머신처럼 부팅하고, Docker 이미지처럼 entrypoint만 있는 이미지는 stub init 아래 앱으로 실행한다.
  - `docker0`와 비슷한 NAT 브리지, 포트 publish, 머신 이름 해석을 자체 관리하며 `mkosi`로 OCI 이미지를 빌드·push할 수 있다.
  - GitHub: <https://github.com/nspawn/nspawn>
- [nsl](https://frostyard.github.io/nsl/) : Linux 호스트에서 WSL처럼 쓰는 systemd-nspawn 기반 개발 머신
  - Debian, Ubuntu, Fedora, Arch, openSUSE 등 서명된 배포판 이미지를 만들고, 프로젝트 디렉터리에서 `nsl` 또는 `nsl run`으로 셸·명령을 실행한다.
  - 일반 머신은 공유 VM 안의 systemd-nspawn 컨테이너로 돌며 `/mnt/host`로 호스트 파일을 사용하고, 포트 포워딩·Wayland 앱·SSH 편집기 연동을 제공한다.
  - `--isolated`로 신뢰하기 어려운 소프트웨어를 별도 VM에 격리할 수 있고, 아직 pre-release 상태라고 명시되어 있다.
  - GitHub: <https://github.com/frostyard/nsl>

## 명령어

- Add와 Copy : <https://nickjanetakis.com/blog/docker-tip-2-the-difference-between-copy-and-add-in-a-dockerile>
- <https://codefresh.io/docker-tutorial/not-ignore-dockerignore-2/>
- `docker run -it -p 80:8080 --entrypoint bash [image]`

## Plugins

### Maven plugin

- <https://github.com/etux/docker-maven-plugin>
- <https://github.com/bibryam/docker-maven-plugin>
- <http://www.javacodegeeks.com/2014/04/a-docker-maven-plugin-for-integration-testing.html>

### Gradle Plugin

- <https://github.com/Transmode/gradle-docker>
- <https://github.com/bmuschko/gradle-docker-plugin>

### Jenkins plugin

- <https://wiki.jenkins-ci.org/display/JENKINS/Docker+Plugin>

### Docker + Virgo

## Java in container

- <https://aboullaite.me/speed-up-your-java-application-images-build-with-buildkit/>
- Docker로 Spring Boot 배포
  - <https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1>
  - <https://spring.io/guides/topicals/spring-boot-docker>
  - <https://perfectacle.github.io/2019/04/16/spring-boot-docker-image-optimization/>
  - <https://medium.com/@gaemi/spring-boot-%EA%B3%BC-docker-with-jib-657d32a6b1f0>

- <https://www.youtube.com/watch?v=qKqqQcjheAg>

'Connection to the Docker daemon at '/var/run/docker.sock' failed with
error "\[13\] Permission denied"; ensure the Docker daemon is running
and accessible' 에러가 나올 때

    sudo chmod 666 /var/run/docker.sock
    systemctl restart docker.service

## Cloud deploy

- AWS Elastic Container Service
- Azure App Service
- GCP Cloud Run

## Related
- [[aws]]
- [[cloud-computing]]
- [[cloud-deployment]]
- [[cloud-news]]
- [[continous-deployments]]
- [[k8s]]
- [[paas]]
- [[server-automation]]
