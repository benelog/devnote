## 중복파일 삭제

    dir /b > file.list
    for /f %i in (file.list) do del ..\%i

## 배치파일활용

- : 배치 파일에서 파일의 내용을 한줄씩 읽기
- : 배치 파일로 완성한 백업 스크립트
- : 현재 년월일시분을 포함한 파일명의 압축파일을 생성하는 배치파일

하위폴더 모두 지우기

```bat
@echo off
dir /AD /S /B CVS* > del.txt
FOR /F   %%a IN (del.txt) do rmdir /S /Q %%a
```

```bat
setLocal
start "Title' commandName
```

`dir /a-d /s /b` -> 파일명으로 된 목록만 쭉 뽑기

## Windows

### 유용한 팁

- [뻗어버린 윈도우 XP 살리기](http://jhrogue.blogspot.com/2008/01/b-xp.html)

### Network

[network 서로간 엑세스 오류시 레지스트리 변경값](http://blog.naver.com/20juntop/60013060979)

다른 컴퓨터를 Access 할 수 없을 때

> 윈도우XP의 [제어판]-->[사용자계정]-->[guest]가 사용함으로 되어 있는지 확인
>
> 시작-실행-regedit 입력<br>
> HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa<br>
> 오른쪽 화면 아래에서 4번째 -> restrictanonymous -> 클릭 하여 1로 되어있으면 0으로 변경후 창을 닫고 재부팅
>
> HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\LanmanServer\Parameters -> parameters 선택 후 오른쪽 창에 나오는 데이타 중 "IRPStackSize" 선택<br>
> 값을 3더해서 늘려준다.(예를 들어 11일 경우 14로 늘림) .<br>
> 만약 없을 경우 데이타를 Dword로 만들어서 기본값15로 설정

[노트북으로 무선AP 만들기](http://blog.naver.com/songyn73?Redirect=Log&logNo=150003374044)

### 유용한 프로그램

#### Diff

- <http://www.grigsoft.com/download-windiff.htm>
- [How to Use the Windiff.exe Utility](http://support.microsoft.com/kb/159214)
- <http://www.grigsoft.com/windiff_src.zip>

EditPlus에서 WinDiff 사용하기

#### 디스크 조각모음

- [Auslogics Disk Defrag](http://www.auslogics.com/en/software/disk-defrag/download)

#### 파일완전삭제

[SDelete](http://www.microsoft.com/technet/sysinternals/Utilities/SDelete.mspx) ([하드디스크에서 파일을 완전히 삭제하려면?](http://jhrogue.blogspot.com/2007/09/blog-post_21.html))

#### 프로그램 실행

- [키보드를 사랑한 프로그램 - Launchy](http://eslife.tistory.com/entry/%ED%82%A4%EB%B3%B4%EB%93%9C%EB%A5%BC-%EC%82%AC%EB%9E%91%ED%95%9C-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-Launchy)
- [색다른 키보드 런처 Enso Launcher](http://www.choboweb.com/254)

#### Taskbar Shuffle v2.2

작업표시줄에 표시되는 프로그램들의 순서를 바꿀수 있는 프로그램입니다.

#### isualTaskTips v2.3

<http://www.visualtasktips.com/>

작업표시줄에 최소화된 프로그램의 썸네일을 띄워주는 프로그램입니다.

#### 프로세스관리

윈도우에서 실행되는 프로세스를 맘대로 관리하자. ([Process Explorer](http://technet.microsoft.com/en-us/sysinternals/bb896653.aspx))

#### 포트검사

[http://www.nirsoft.net](http://www.nirsoft.net/) CurrPorts

### 기타

- [윈도우의 기본 Alt + Tab을 대체하는 프로그램들](http://www.choboweb.com/269)
- [윈도우에도 맥의 익스포제 효과를~ DExposE2](http://www.choboweb.com/99)
- <http://camstudio.org/>

#### CygWin

<http://www.cygwin.com/> - Windows에서 Unix 명령어를

#### Windows Script

- Home : <http://msdn.microsoft.com/en-us/library/9bbdkx3k.aspx>
- AooActivate: <http://msdn.microsoft.com/en-us/library/dyz95fhy(v=vs.80).aspx>
- SendKeys : <http://msdn.microsoft.com/en-us/library/8c6yea83.aspx>
- <http://www.ericphelps.com/scripting/samples/>

## windows vista

- <http://blog.naver.com/aramjo/120034485935>
- <http://www.microsoft.com/korea/ie/ie7/technology>

## 윈도우 설정 팁

### 모든 파일과 확장자를 볼수 있게

- 내컴퓨터→보기→폴더옵션→고급설정에서 '파일에 대한 속성을 자세히 표시' 와 '모든파일표시'에 체크

### 지운파일을 휴지통에 저장하지 않는 방법

- 휴지통등록정보→일반설정→'파일을 휴지통에 버리지 않고 삭제할 때 즉시 제거'에 체크

### 탐색기를 이용한 파일관리

- 탐색창을 여러개 띄워놓고 사용하면 편리하다.

### 하드드라이버의 도움이 않되는 파일제거

- 시작→시스템도구→디스크정리
- 파일찾기→*.BMP→바탕화면파일 모두 삭제
- 제어판→프로그램추가삭제→Windows설지→바탕화면테마
- 파일찾기→*.scr→화면보호기파일삭제

### 전원관리

제어판→전원관리등록정보

### 시작프로그램 실행하지 않기

마이크로소프트 오피스나 노턴 유틸리지 같은 프로그램을 설치하면 윈도우 시작과 동시에 이들과 관련된 프로그램이 실행된다.
이때 'C:windows시작메뉴프로그램시작프로그램' 의 파일을 삭제하면 된다.
손쉬운 방법으로 win98을 시작할때 Shift키를 누그고 있으면 시작프로그램들이 실행되지 않는다.

### 안전모드로 부팅하기

부팅하때 F5키를 누르거나 F8키를 누르면 부팅메뉴가 나타나는데 여기서 safe mode를 선택한다.

### 아이콘 한번 클릭으로 실행

폴더보기→폴더옵션→일반→사용자정의→한번클릭해 열기

### 배경그림이 현재 해상도와 맞지 않는경우

디스플레이등록정보→배경화면→늘임

### 바탕화면 아이콘 바꾸기

- 디스플레이등록정보→효과→변경을 원하는 항목선택→아이콘 변경

아이콘은 다른 곳에서 이미 만들어진 아이콘을 내 아이콘으로 변경할 수있고 그래픽프로그램(그림판, 포토삽등)으로
직접 아이콘을 만들 수 있다. 이때 그림 사이즈를 작게 해야하며 확장자를 BMP로 저장해도 괜찮다.

### 모니터화면이 떨리거나 흔들리는 경우

디스플레이등록정보→설정→고급→어댑터→최적

### 잊어버린 윈도98로그인암호 깨기

윈도로그온암호를 입력하는 곳에Ctrl+Esc키를 누름→*.PWL파일을 찾아 삭제

### 응용프로그램 단축키 만들기

등록정보→바로가는키 부분에 원하는 단축키조합을 지정

## Children
- [[windows-shortcuts]]

## Related
- [[git-tools]]
- [[linux-shell]]
