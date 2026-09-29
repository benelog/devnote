## OS

- [\[Collectd\] 사용법 - 설치하기](http://www.tuning-java.com/277)

## Linux

```sh
echo $SHELL
setenv JRE_HOME /home1/benelog/java/jre1.6.0_07
```

- [각 쉘들이 시작할때 읽어드리는 파일](http://blog.naver.com/jammu193/150032656767)
- [Ceph: 페타바이트 규모의 Linux 분산 파일 시스템](https://www.ibm.com/developerworks/kr/library/l-ceph/)
- [Linux 학습, 기초 과정: 하드 디스크 레이아웃](http://www.ibm.com/developerworks/kr/library/l-lpic1-v3-102-1/index.html)
- <http://www.webmin.com/>

### 용량구하기

디렉토리 용량

```sh
du -abch | grep -v "./"
```

메가 단위 용량 파일만 오름 차순으로

```sh
du -h | grep -e ^[0-9]*M | sort -n
```

현재 위치의 directory 내에 있는 파일들중 메가 단위 이상 되는 파일만 오름 차순으로 보기 (숨김파일 제외)

```sh
du -sh * | grep -e ^[0-9]*M | sort -n
```

현재 위치의 directory 내에 있는 파일들중 메가 단위 이상 되는 숨김 파일만 오름 차순으로 보기

```sh
du -sh .[^.]* | grep -e ^[0-9]*M | sort -n
```

현재 위치의 directory 내에 있는 모든 파일들중 메가 단위 이상 되는 파일만 오름 차순으로 보기 (숨김 파일 포함)

```sh
du -sh .[^.]* * | grep -e ^[0-9]*M | sort -n
```

### 서버정보

```sh
uname -a
```

### 포트

```sh
netstat -anp | grep :80
nmap localhost
```

#### 행바꿈 바꾸기

```sh
perl -i -pe's/\r$//;' <file name here>
```

### wget

rcp

```sh
rcp id@server:/home1/benelog/score.month score.month
```

### rm

...rm에 대한 alias를 "rm -i"로

rm 을 mv

- <http://code.google.com/p/trash-cli/>

### Kernel

I/O multiplexing : <http://www.mimul.com/pebble/default/2012/03/21/1332303327316.html>

## Children
- [[docker]]
- [[hard-disk]]
- [[linux-desktop]]
- [[linux-dist]]
- [[linux-kernel]]
- [[linux-memory]]
- [[linux-network]]
- [[linux-process]]
- [[linux-shell]]
- [[linux-tips]]
- [[os-history]]
- [[ssh]]
- [[terminal-tools]]
- [[vi]]
- [[virtualization]]
- [[web-shell]]
- [[wget]]
