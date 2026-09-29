- [티맥스OS 리뷰: 대체 왜?](https://changwoo.xyz/hacks/2019/08/25/tmaxos-review.html)

## 부팅을 위한 배포판

- <http://knopper.net/knoppix/index-en.html>
- <http://www.damnsmalllinux.org/>

## Ubuntu

- <http://ubuntu.or.kr/>
- [Ubuntu의 apt-get 명령어 정리](http://blog.outsider.ne.kr/346?category=29)

### 한글

```sh
sudo apt-get install nabi
```

### JDK install

<http://superuser.com/questions/353983/how-do-i-install-the-sun-java-sdk-in-ubuntu-11-10-oneric>

vi .bashrc

```sh
JAVA_HOME=/usr/lib/jvm/java-6-sun/bin
export JAVA_HOME
```

### SVN

<http://stackoverflow.com/questions/7876091/incompatible-javahl-library-for-subclipse-in-64-bit-kubuntu>

### Maven

```sh
sudo apt-get install maven2
```

### apache

아파치 설치

```sh
sudo apt-get install apache2
```

아파치 실행과 확인

```sh
sudo /etc/init.d/apache2 restart
```

기본 설치하면 /var/www에 index.html 이 읽어진다.

Mod-jk 설치

<http://tomcat.apache.org/download-connectors.cgi>에서

```sh
sudo apt-get install apache2-threaded-dev
```

/etc/apache2/apache2.conf

```sh
./configure --with-apxs=/usr/bin/apxs2 --enable-EAPI
make
make install
```

### PDF

poppler-data

```sh
sudo apt-get install poppler-data
```

### 메신저

```sh
$> sudo apt-get install pidgin
$> sudo apt-get install pidgin-encryption
$> sudo apt-get install pidgin-sipe
```

- [우분투 메모리4G 활용하기](http://blog.naver.com/km0515x2?Redirect=Log&logNo=30082434452)
- [윈도우에서 우분투로 원격접속 하기](http://exifeedi.tistory.com/47)(VND)
- [FreeNX 서버 (VNC 와 비슷한 윈도우->리눅스 원격 연결)](http://barosl.com/blog/entry/remote-desktop-with-freenx)

### upgrade

```sh
sudo update-initramfs -u
sudo update-initramfs -c -k 2.6.35.22-
```

### Freemind

```sh
sudo add-apt-repository ppa:juanje/freemind
sudo apt-get install freemind
```

### 에러메시지

```
tpm_transmit: tpm_send: error 4294967234
```

단축키

<http://bitkickers.blogspot.com/2010/04/ubuntu-keyboard-shortcut-cheatsheet.html>

터미널 접속시 한글이 깨질떄

```sh
luit -encoding eucKR +osl -- ssh 접속주소
```

### Font

```sh
sudo gedit /etc/fonts/conf.d/29-language-selector-ko-kr.conf
sudo fc-cache -f -v
```

### 원격

```sh
sudo apt-get install python-software-properties && sudo add-apt-repository ppa:freenx-team
sudo apt-get update
sudo apt-get install freenx
```

위 명령어들을 통해 FreeNX를 설치하신 후에,

<http://www.nomachine.com/download.php>

#### 원격접속

VNC와 compiz의 충돌 해결

1. ALT+F2를 눌러서 프로그램 실행 창을 뛰우고, gconf-editor 를 실행합니다.
2. /desktop/gnome/remote_access에 있는 "disable_xdamage"에 체크하여 enable 시킵니다.

TightVNCViewer

### Firefox

/usr/lib/jvm/java-6-sun-1.6.0.26/jre/plugin/i386/ns7

```sh
sudo ln -s /usr/lib/jvm/java-6-sun-1.6.0.26/jre/plugin/i386/ns7/libjavaplugin_oji.so /usr/lib/firefox/plugins/libjavaplugin_oji.so
```

```sh
apt-get install openjdk-6-jre icedtea6-plugin
```

```sh
sudo ln -s $JAVA_HOME/jre/lib/i386/libnpjp2.so /usr/lib/firefox/plugins
sudo ln -s $JAVA_HOME/jre/plugin/i386/ns7/libjavaplugin_oji.so /usr/lib/firefox/plugins/libjavaplugin_oji.so
```

## Related
- [[linux-desktop]]
- [[apache-httpd]]
- [[linux]]
