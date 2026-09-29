- <http://code.google.com/p/v8/>

## 주요 참조 사이트

- <http://developer.mozilla.org/ko/docs/>
- <http://youngrok.com/moin.cgi/JavaScript>
- Private Members in JavaScript : <http://www.crockford.com/javascript/private.html>
- The World's Most Misunderstood Programming Language : <http://www.crockford.com/javascript/javascript.html>
- <http://home.postech.ac.kr/%7Eskyul/javascript.html>
- [Read and Display Server-Side XML with JavaScript](http://blog.naver.com/nukiboy/40017288553%20)

## 기초 강좌

- [JavaScript 기본](http://blog.naver.com/jerryhm/40022218885)
- javascript bootcamp

## Writing Object-Oriented JavaScript

- part1: <http://www.codeproject.com/aspnet/JsOOP1.asp>
- part2: <http://www.codeproject.com/aspnet/JsOOP2.asp>
- part3: <http://www.codeproject.com/aspnet/JsOOP3.asp>
- [간단한 객체 지향 자바스크립트;파라미터 편 simple object oriented javascript](http://okjsp.tistory.com/1165643362)

## Closure

- <http://jibbering.com/faq/faq_notes/closures.html>
- <http://skyul.tistory.com/155>

## 주요 객체 사용법 등

- document.all("Object명") vs document.getElementsByName("Object명")
- HTML DOM Examples
- [날짜관련 자바스크립트](http://blog.naver.com/hyanghee77/80010577227)

현재소스를 클립보드에 복사

```javascript
javascript:a=document.body.innerHTML;window.clipboardData.setData("Text",a);void(0);
```

시작페이지로

```html
<a  href onClick="this.style.behavior='url(#default#homepage)'; this.setHomePage('http://kissofgod.net');">시작페이지로</a>
```

## 내장 객체

- document.referrer
- document.lastModified
- document.URL

## 화면 크기

- <http://blog.naver.com/zimny327?Redirect=Log&logNo=90035993737>

## Cookie

- [Javascript 로 cookie굽기](http://blog.naver.com/bluesnoow/120005287149)

```javascript
// 쿠키 생성
function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
     ((expires) ? "; expires=" + expires.toGMTString() : "") +
     ((path) ? "; path=" + path : "") +
     ((domain) ? "; domain=" + domain : "") +
     ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

// 쿠키값 가져오기
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
   begin = dc.indexOf(prefix);
   if (begin != 0) return null;
  } else
   begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
   end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

// 쿠키 삭제
function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
   document.cookie = name + "=" +
   ((path) ? "; path=" + path : "") +
   ((domain) ? "; domain=" + domain : "") +
   "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
```

## 동적 HTML

- [innerHTML, outerHTML](http://blog.naver.com/goodvirus/40003600513)

### insertAdjacentHTML

- <http://blog.naver.com/imgsoul/140013173317>
- <http://blog.naver.com/chsoft/40009932556>

## 속도 향상

- [DHTML 속도 향상을 위한 몇 가지 팁](http://blog.naver.com/rosekingdom/60001306384)
- [Javascript에서 StringBuffer, StringBuilder로 성능향상!!!](http://blog.naver.com/an5asis/60022181698)
- [javascript 동적로딩](http://javacan.tistory.com/entry/JavaScriptDynamicLoading)

## Encoding

- [encodeURI, encodeURIComponent, escape 함수 차이점](http://mwultong.blogspot.com/2006/10/encodeuri-encodeuricomponent-escape.html)
- [escape(), encodeURI() 등 차이](http://realmind.tistory.com/191)
- <http://realmind.tistory.com/entry/Javascript-Escape-Encoder-v01>

```html
<html>
<head>
<script>
  function encode(){
    var original = document.forms[0].original.value;
    var encoded = encodeURI(original);
    document.forms[0].encoded.value = encoded;
  }
</script>
</head>
<body>
<form name="form">
<input type="text" name="original" width="100%"/><br/>
<input type="text" name="encoded" width="100%"/><br/>
<a href="javascript:encode()">encode</a>
</form>
</body>
</html>
```

## 이벤트

- 우클릭 안되게 : `oncontextmenu="return false"`
- [JavaScript Event Handler 모음](http://blog.naver.com/lhm38317?Redirect=Log&logNo=10042523469)

## 정규식

- [정규표현식](http://cafe.naver.com/makepage.cafe?iframe_url=/ArticleRead.nhn%3Farticleid=6)

### 예제

trim

```javascript
function trim (strSource) {
    var re = /^\s+|\s+$/g;
    return strSource.replace(re, '');
}
```

이미지 주소만 추출

```javascript
var strToMatch = "<img src=\"http://a.jpg\"/> 이것은 이미지 <img src='http://b.jpg'/> 으하  <img src='http://a.gif'/>";
var strReg = new RegExp("http://*[^>]*\\.(jpg|gif)","gim");
var xArr =  strToMatch.match(strReg);
```

기타

- [CGI없이 HTML로 변수 전달 받기](http://blog.naver.com/goodvirus/40006867149%20)

## 화면 효과

- [간단한 IE용 웹에디터](http://blog.naver.com/ahchoos/30001050274)
- [익스플로러에서도 글자 깜빡이게 하기( BLINK )](http://cafe.naver.com/hpd.cafe?iframe_url=/ArticleRead.nhn%3Farticleid=196)
- [iframe 크기조절 - be more dynamic](http://blog.naver.com/pak36/60003478556)

### 행 추가/삭제

```html
<html>
<script>
    var rowIndex = 1;
    function addFile(form,k){
        if(rowIndex > (5-k)) return false;
        var oCurrentRow,oCurrentCell;
        var sAddingHtml;
        oCurrentRow = insertTable.insertRow();
        rowIndex = oCurrentRow.rowIndex;
        oCurrentCell = oCurrentRow.insertCell();
        rowIndex++;
        oCurrentCell.innerHTML = "<tr><td colspan=4><INPUT class=input TYPE=FILE NAME='filename" +rowIndex + "' size=25></td></tr>";
        form.rowCount.value = rowIndex;
    }

    //첨부파일 삭제
    function deleteFile(form){
        if(rowIndex<2){
            return false;
        }else{
            form.rowCount.value = form.rowCount.value - 1;
            rowIndex--;
            insertTable.deleteRow(rowIndex);
        }
    }

</script>

<body>

<form name="write">
     <table name='insertTable' id='insertTable' border=0 cellpadding=0 cellspacing=0>
        <tr><td valign=bottom><INPUT type='file' maxLength='100' name='filename1' size='25'></td>
        <td width=100>
        <input type="button" value="추가" onClick="addFile(write,1)" border=0 style='cursor:hand' hspace=4>
        <input type="button" value="삭제" onClick='deleteFile(write)' border=0 style='cursor:hand'>
        </td>
        </tr>
    </table>
    <input type="hidden" name="rowCount" value="1">
    <input type="submit">
    </form>
</body>
</html>
```

### 커서 위치에 layer 나타나게 하기

```javascript
function showPhoto(imageFileName){
    document.getElementById("photoImage").src = imageFileName;
    var photoLayer =  document.getElementById("photoLayer");
    photoLayer.style.display = "block";
    photoLayer.style.pixelLeft = document.documentElement.scrollLeft + event.x;
    photoLayer.style.pixelTop = document.documentElement.scrollTop + event.y;
}

function hidePhoto(){
    document.getElementById("photoLayer").style.display = "none";
    document.getElementById("photoImage").src = "/image/photo.gif";
}
```

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

으로 DOCTYPE이 지정되었을 때는 document.body 대신 document.documentElement 사용해야 할 때가 있음

- 참고: <http://www.quirksmode.org/js/doctypes.html>

## 보안

- [img 태그를 이용한 테러](http://blog.naver.com/rosekingdom/60001306697)

## AJAX

- [HTML 폼에 Ajax 사용하기](http://www-128.ibm.com/developerworks/kr/library/x-ajaxxml9/)
- [Ajax와 jQuery로 기존 사이트 개선하기 (한글)](http://www.ibm.com/developerworks/kr/library/wa-aj-overhaul1/index.html?ca=drs-kr#resources)
- [Ajaxian](http://seal.tistory.com/123)

### 강좌

- [Ajax 마스터하기, Part 2: JavaScript와 Ajax를 이용한 비동기식 요청 (한글)](http://www.ibm.com/developerworks/kr/library/wa-ajaxintro2/)
- [Ajax 마스터하기, Part 3: Ajax의 고급 요청 및 응답 (한글)](http://www.ibm.com/developerworks/kr/library/wa-ajaxintro3/)
- [Ajax 마스터하기, Part 4: 웹 응답에 DOM 활용하기 (한글)](http://www.ibm.com/developerworks/kr/library/wa-ajaxintro4/)
- [Ajax 마스터하기, Part 5 : DOM 다루기 (한글)](http://www.ibm.com/developerworks/kr/library/wa-ajaxintro5/)
- [Ajax 마스터하기, Part 6: DOM 기반 웹 애플리케이션 구현 (한글)](http://www.ibm.com/developerworks/kr/library/wa-ajaxintro6/)
- [Ajax 마스터하기, Part 7: 요청과 응답에 XML 사용하기 (한글)](http://www.ibm.com/developerworks/kr/library/wa-ajaxintro7/wa-ajaxintro7.html)

## 개발 도구

- <http://code.google.com/p/jslibs/>
- [HTML, 자바스크립트, AJAX 개발과 디버깅에 유용한 필수 도구](https://www.ibm.com/developerworks/kr/library/wa-jstools/)

### JSDT

- [자바스크립트 개발 툴킷(JSDT) 살펴보기](http://www.ibm.com/developerworks/kr/library/os-eclipse-jsdt/)

### FireBug (firefox)

- [debug에 관하여](http://okjsp.tistory.com/1165642953)
- [파이어버그를 이용한 신속한 웹 애플리케이션 디버깅과 튜닝](http://www-128.ibm.com/developerworks/kr/library/wa-aj-firebug/)

### First javascript editor

- 설치 : <http://yaldex.com/JSFactory_Pro.htm>
- 설명 : <http://blog.naver.com/i1j1jsy/70011900056>

### Microsoft Script Debugger (Internet Explorer)

- 설명: <http://blog.naver.com/i1j1jsy/70011900056>

### Internet Explorer Developer Toolbar (Internet Explorer)

- 설명 : <http://blog.naver.com/i1j1jsy/70011900056>

설치 후 보기-탐색창- IE DOM Explorer에 체크하면 DOM Explorer로 페이지를 볼 수있습니다. (저는 설치하고 한참동안 '뭐가 달라진거야?'하고 모르고 있었습니다 ^^; )

### 기타 도구

- Web developer (firefox)
- View Source Chat (firefox)
- js-test-driver

## 테스트

### jsunit

javascript를 위한 unit test

참고자료

- javascript tdd시범 (비포나치 수열) : <http://jania.pe.kr/JavascriptTddFibo.html>
- [Eclipse에 jsunit 플러그인 설치](http://blog.naver.com/mrtajo75/60050530400)

### Js test driver

- <http://www.youtube.com/watch?v=aDKGGZv-T4M>

## 라이브러리

마소 2008/03 자바스크립트 라이브러리 기사 참조

- prototype
- Script.aculo.us
- jQuery
  - Improve your jQuery - 25 excellent tips
  - <http://code.google.com/p/flot/>
- YUI
- Dojo toolskit
- MooTools
- Qooxdoo
- Mochikit
- RICO
- SPRY
- Xajax
- DWR
  - [\[팁\] DWR을 이용해서 객체를 JSON으로 변환하기](http://javacan.tistory.com/entry/ConvertServerObjectToDWRJsonObject)

### GWT

- <http://www.infoq.com/articles/gwt_unit_testing>
- [GWT를 사용한 SOA 환경에서의 웹 애플리케이션 개발](http://www.imaso.co.kr/?doc=bbs/gnuboard.php&bo_table=article&wr_id=36475)

1. Google Web Toolkit, Apache Derby, Eclipse를 사용하여 Ajax 애플리케이션 구현하기, Part 1: 환상적인 프론트엔드 (한글) <http://www.ibm.com/developerworks/kr/library/os-ad-gwt1/index.html>
2. Google Web Toolkit, Apache Derby, Eclipse를 사용하여 Ajax 애플리케이션 구현하기, Part 2 : 신뢰성 있는 백엔드(back end) (한글) <http://www.ibm.com/developerworks/kr/library/os-ad-gwt2/index.html>
3. Google Web Toolkit, Apache Derby, Eclipse를 사용하여 Ajax 애플리케이션 구현하기, Part 3 : 커뮤니케이션(Communication) (한글) <http://www.ibm.com/developerworks/kr/library/os-ad-gwt3/index.html>
4. Google Web Toolkit, Apache Derby, Eclipse를 사용하여 Ajax 애플리케이션 구현하기, Par4 : 전개 (한글) <http://www.ibm.com/developerworks/kr/library/os-ad-gwt4/index.html>

MVP pattern with GWT

- <http://supplychaintechnology.wordpress.com/2009/06/03/forget-mvc-use-mvp/>
- <http://code.google.com/p/gwt-mvp-sample/>

DEMO

- <http://www.youtube.com/watch?v=2u9MstlK2h0>
- <http://www.youtube.com/watch?v=lWMVzhXwh-I>

## Children
- [[gulp]]
- [[javascript-basic]]
- [[javascript-dom]]
- [[javascript-module]]
- [[node-js]]
- [[webpack]]
- [[react-js]]
- [[javascript-bootcamp]]

## Related
- [[regular-expression]]
- [[jquery]]
- [[html-basic]]
