[shell script에서 \#!를 뭐라고
부를까?](http://www.popit.kr/shell-script%EC%97%90%EC%84%9C-%EB%A5%BC-%EB%AD%90%EB%9D%BC%EA%B3%A0-%EB%B6%80%EB%A5%BC%EA%B9%8C/)

## 쉘 안에서 현재 경로

    #!/bin/sh
    BASEDIR=`dirname $0`
    echo $BASEDIR
    cd $BASEDIR

언제나 절대경로로 하려면

\$(cd `dirname $0` && pwd)

 참조

CD:
<http://www.ibm.com/developerworks/kr/aix/library/au-directorytree/index.html>

## 파일명

find . -type f -name "\*Controller.java" -printf "%f\n" \| sort \| uniq
\| awk '{print "- \[ \] " \$1}'

find / -name "sysinfo.html"

grep "sysinfo.html" \*\|awk '{print \$1}'

## 내용

    # 찾기
    find /. -name "*" | xargs grep -i "benelog"

    find /. -name "*" -print -exec grep "benelog" {} \;

    find /. -name "*" -print | wc -l

    # sub directory안의 파일 내용 중에 문자열 대체하기
    find ./ -type f -exec sed -i -e 's/assets-cdn.github.com/github.githubassets.com/g' {} \;

## 용량과 업로드일자

find ./ -mtime -30 -size +1024k -ls find /. -name "StringCleaner.java"
\| xargs du -b

## 날짜

- echo \$(date '+%y%m%d') → 060728
- echo \$(date '+%Y%m%d') → 20060728
- echo \$(date '+%Y%m%d\_%H%M%S') → 20060728_170000
- echo \$(date +"%Y%m%d%H%M%S")
- echo \$(date +%Y%m%d --date '1 day ago')

## ls

<http://www.cyberciti.biz/open-source/command-line-hacks/linux-ls-commands-examples/>

열려있는 파일 찾기

[Command-line Tools can be 235x Faster than your Hadoop
Cluster](https://adamdrake.com/command-line-tools-can-be-235x-faster-than-your-hadoop-cluster.html)

### 사이즈 순 정렬

ls -al 의 결과 중 사이즈는 5번째 컬럼입니다.

5번째 컬럼을 작은 것 부터 큰 숫자 순서로(오름차순) 정렬하시려면

```sh
ls -alR | sort -n +4
```

하시면 됩니다.

sort -n 에서 -n 옵션은 number 를 의미합니다.

+4 는 컬럼을 지정하는 것인데, 공백을 기준으로 가장 왼쪽에 있는 컬럼이 0번 컬럼, 그 다음이 1번, 그 다음이 2번 순서가 됩니다.

사이즈는 5번째에 나오기 때문에 +4 가 됩니다.

예)

```
-rw-r--r--   1 opensrc    homepy         530 May 23 12:48 walk.html
-rw-r--r--   1 opensrc    homepy        2388 May 23 12:48 main3.html
-rw-r--r--   1 opensrc    homepy       17108 May 23 12:48 jacobian.txt
 0         1     2          3            4     5   6   7      8
```

오름차순 정렬이 기본이고,

```sh
ls -al | sort -rn +4
```

하시면 거꾸로 (내림차순)으로 정렬이 됩니다.

## 파일명 일괄 변경

<div class="formalpara">

<div class="title">

\_를 -로

</div>

    for i in *_*;do mv $i ${i//"_"/"-"};done

</div>

## Unix

```sh
id        # 지금 ID확인
df        # 남은용량
df -f
bdf
du -sk
who
whoami
```

보안정책상 root는 telnet으로 접속이 안 된다.

```sh
su -
useradd -m benelog
su benelog
su -
passwd
whoami
show parameters.instance
ps -ef | grep xxx
```

```sh
finger
rusers
systat
port
rup
rstat
```

- [유닉스를 능숙하게 사용하기: 몇 번만 클릭하자](https://www.ibm.com/developerworks/kr/library/au-speakingunix_commandline/)

### 유닉스 명령어 정리 페이지

- <http://blog.naver.com/exbuilder/100001811535>
- <http://blog.naver.com/lani76/457669>

### 팁 모음

- [맨페이지를 TEXT파일로 저장하기](http://blog.naver.com/marine6309/100002231774)
- [symbolic link와 hard link의 차이](http://blog.naver.com/juya798/120003455469)

```sh
ll
colrm
```

### cron

- [cron](http://blog.naver.com/ememo96/100026769696)
- [crontab](http://pelex529.blogspot.com/2007/06/crontab.html)

```
/etc/cron.allow : 허용할 사용자 ID 목록
/etc/cron.deny : 거부할 사용자 ID 목록
/var/spool/cron/root
```

```sh
service crond restart
```

### Rsync

- [Using rsync over ssh](http://oreilly.com/pub/h/38)

### Shell script

- [실전! 셸 스크립트 교실](http://blog.naver.com/tom220/20017323364)

### 삭제

```sh
find . -name "CVS" -exec rm -rf {} \;
```

### inode

Index Node

유닉스의 파일에 대한 정보를 기록. 18 byte의 고정된 구조체

서비스

/etc/inetd.conf

## Unix shell script

### 참고자료

- [UNIX의 Shell Script](http://blog.naver.com/kgaeguri/140034864276)

### 실행

```sh
bash scriptName
sh scriptName
./scriptName
```

### 완료

```sh
echo $?
```

- exit 0 : 정상종료
- exit 1 : 비정상 정료

계산

```sh
sum='expr 100+200'
echo $sum
```

### 파라미터

- `$0` 명령어 그자체
- `$1`,`$2`
- `$#` 파라미터의 갯수
- `$@` 모든 파라미터

### 조건문

```sh
if  ["$1"="start"]; then

else

fi
```

### 반복문

```sh
for 1 in 1 2 3
do
    echo $i
done

while [$n -lt 3];
do

done
```

## AWK

awk -v : 변수를 정의할 것임을 알려줌

- <http://blog.naver.com/luckij?Redirect=Log&logNo=50037063405>
- <http://blog.naver.com/zzogling?Redirect=Log&logNo=40089735081>
- <http://blog.naver.com/hungry81?Redirect=Log&logNo=90106258583>

## Cut

- <http://newmkka.tistory.com/entry/UNIX-cut-%EB%AA%85%EB%A0%B9%EC%96%B4>

## Symbolic & hard link

symbolic link와 hard link의 차이

### hard link

사용법 : ln 원본파일 링크걸파일 (ex:ln file1 link1)

특징 :

- 같은 partition내에서의 링크만 유효하다.
- 원본파일이 사라져도 링크파일로 access가 가능하다.
- 같은 파일을 다른 용도로(다른이름으로) access하기위해 사용한다.

적용예 : / 밑에 young이란 디렉토리가 존재한다고 가정하자

pwd가 /인 상태에서 inode값까지 조회하는 "i"옵션으로 ls해보았다.

```
#ls -il
1077 drwxr-xr-x 어쩌구저쩌구 young
#cd young
#ls -ail
1077 drwxr-xr-x 어쩌구저쩌구 ./
```

young이란 dir접근에 대해 /에서는 young이란 이름으로도, ./으로도 쓰는 것이다.

inode값이 같으므로 이는 하드링크의 적용예이다.

### symbolic link

사용법 : ln -s 원본파일 링크걸파일(ex:ln -s file1 link2)

특징 :

- partition이나 FS에 상관없이 링크로 지정할 수 있따.
- 원본파일이 사라지면 링크파일은 더이상 access가 불가하다. (inode값 별도 생성되며 파일 네임에 대한 링크이다.)
- 단축아이콘 등의 역할을 수행한다.

적용예 : `# usr/dt/appconfig/SUNWns/netscape`가 netscape 원본 실행파일이다.

매번 netscape를 띄울때마다 다 처넣을 수 없으므로

```sh
# ln -s netln usr/dt/appconfig/SUNWns/netscape
```

로 링크를 걸어주면 netlin만 실행시켜도 넷스케이프 창이 뜰 것이다.

또한 dev에 논리적 디스크이름이 실제 물리적 디스크슬라이스에 대해 링크로도 활용한다.

## Unix 사용자 추가

\[과제\]

useradd 명령을 사용하여 시스템에 student03 사용자를 생성하세요.

(조건)

- uid: 3003
- gid: 100
- 홈디렉토리: /home/student03
- 사용 쉘: /usr/bin/ksh
- 설명: TEST USER
- User 생성 시 홈디렉토리도 자동으로 생성.

명령어:

```sh
useradd -u 3003 -g 100 -m -d /home/student03 -s /usr/bin/ksh -c TEST_USER student03
```

Option 설명

- -m : 신규user의 Home Directory 지정
- -s : User가 로긴해서 사용할 Shell 지정
- -c : comment 붙임
- -u : uid지정
- -g : 그룹지정
- -d : 유저의 home directory 지정

위의 사용된 option 외의 그외의 옵션은 다음과 같은 것이 있다

- -e : login expire 날짜를 지정하는 option

## tar

\[과제\]

tar 명령을 사용하여 테이프(/dev/rmt/0)에 백업 받은 내용을 현재 디렉토리에 푸세요.

(조건)

- 진행 상황이 모니터에 Display 되야 합니다.
- 사용되어지는 각 옵션에 대해 설명해야 합니다.

명령어

```sh
tar -xvf /dev/rmt/0
```

사용옵션설명

- -x : 명시된 특정파일의 압축을 품
- -v : verbose 모드로 복구된 파일명을 프린트
- -f : 그 다음의 인자가 생성할 저장 파일(또는 장치)의 이름이라는 것을 나타냄

그 외의 옵션에는 다음과 같은 것이 있다

- -c : 새로운 tar파일 생성. 테이프로 기록할때 테이프 내의 기존의 모든 기록은 지우면서 파일생성
- -t : tar파일의 테이블 목록을 보여줌

tar 명령어 정리페이지

- <http://blog.naver.com/win2107/100000825719>
- <http://blog.naver.com/snboy/80001722434>

```sh
gzip -d file_name.tar.gz
```

gz 풀기

```sh
tar xzvf
```

## Related
- [[cron]]
- [[linux]]
- [[ssh]]
- [[linux-tips]]
