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

## Children

- [[windows-shortcuts]]

## Related
- [[windows-shortcuts]]
- [[diff]]
- [[linux-shell]]
