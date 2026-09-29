## Tag 분류

- [Block level elements](https://developer.mozilla.org/ko/docs/HTML/Block-level_elements) vs [Inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)
- 성격에 따른 분류
  - Basic HTML : \<!DOCTYPE\>, \<html\>, \<body\>, \<h1\>~ \<h6\> , \<p\>, \<br\> , \<hr\>, \<!-- comment -→
  - Formatting : \<abbr\>, \<address\>, \<b\>, \<cite\>, \<del\>, \<em\>, \<code\>, \<mark\>, \<pre\>, \<ruby\>, \<rp\>, \<rt\>, \<time\>, \<u\>, \<small\>, \<sup\>
  - Forms and input : \<form\>, \<input\>

## 참고 자료

- [웹 사이트 물려받기: 웹 사이트를 유지보수 가능한 상태로 만들기](http://www.ibm.com/developerworks/kr/library/wa-inherit1/)
- [Application/xhtml+xml](http://www.schillmania.com/content/entries/2004/10/24/application-xhtml+xml/)

## Doc type

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
```

공백문제

## 태그 관련 팁

이미지 반투명처리하기

```html
<img src="그림주소" style="filter:alpha(opacity=100,style=2,finishopacity=0)">
```

재로딩시 페이지 안 깜빡이게

```html
<META http-equiv="Page-Enter" content="blendTrans(Duration=0.0)">
<META http-equiv="Page-Exit" content="blendTrans(Duration=0.0)">
```

## HTML 샘플

- <http://creativefan.com/top-20-sites-to-download-free-website-templates/>

```html
<meta http-equiv="refresh" content="0;url= />
```

## HTML Editor

- <http://www.freerichtexteditor.com/>

## 참고도서

- 한국소프트웨어진흥원의 실전웹표준가이드
- 실용예제로 배우는 웹표준 -에이콘- : 본격적인 활용기
- CSS 마스터 전략 -에이콘-
- CSS designing without tables -sitepoint-(원서) : 무릅을 탁 치게 되는 책
- CSS the css anthology -sitepoint-(원서)
- 당신은 웹 2.0 개발자입니까?
- 웹디자인2.0 고급 CSS

## HTML5

- <http://manuel.kiessling.net/2012/04/02/tutorial-developing-html5-canvas-games-for-facebook-with-javascript-part-1/>
- HTML 5.0 <http://www.creation.net/work/html5/html4-differences/>
- [HTML V5 and XHTML V2](http://www.ibm.com/developerworks/xml/library/x-html5xhtml2.html?ca=drs-tp4707)
- [HTML5에서 미디어 포맷 논쟁 중…](http://channy.creation.net/blog/?p=463)
- [\[블로터포럼\] HTML5가 개발자에게 '기회의 땅'인 이유](http://news.naver.com/main/read.nhn?mode=LSD&aid=0000004118&oid=293&mid=sec&sid1=105)
- [HTML5를 사용하여 모바일 장치 웹 애플리케이션 작성하기](https://www.ibm.com/developerworks/kr/library/wa-offlineweb/)
- <http://channy.creation.net/blog/803>
- [HTML5 동영상 쉽게 공유하기](http://blog.creation.net/461)
- <http://www.webdesignish.com/8-best-websites-to-get-everything-about-html5.html>
- <http://www.dzone.com/links/r/15_great_html5_website_templates_for_your_next_pr.html>
- 기능지원현황 : <http://caniuse.com/>

### WebSocket

### LocalStorage

- <http://nundefined.tistory.com/24>

## CSS

- <http://www.bennadel.com/blog/1354-The-Power-Of-ZOOM-Fixing-CSS-Issues-In-Internet-Explorer.htm>

### 참고자료

- [CSS float 속성 이해](http://www-128.ibm.com/developerworks/kr/library/wa-css/)

### CSS 포함 하기

html 내에

```html
<style type="text:css"> </style>
```

별도의 파일로

```html
<link href="/css/text.css" type="text/css" rel="stylesheet">
```

@import - 구버전의 웹브라우져에서는 인식 안 됨

### CSS 유효성 검사기

- <http://jigsaw.w3.org/css-validator>

### 선택자

여러개의 element 선택

```css
h1, h2 { }
```

class 선택자

```css
p.greentea { } /* class가 greentea인 <p/> 선택 */
.greentea{ } /* class가 greentea인 모든 태그 */
```

id 선택자

```css
#footer { } /* id가 footer인 모든 태그 */
p#footer{}
```

자식(Child) element 선택

```css
div h2{ color:red} /* <div/> 하위에 있는<h2/> 선택  */
.detail p {}   /* class가 "detail"로 지정되어 있는 하위의 <p/> 선택 */
```

상태에 따른 선택자

```css
a:visited{}
a:link {}
```

상태는 active, hover, link, visited, first-child 등

의사(Psdudo) element 선택자

```css
p:first-letter {}
p:first-line {}
```

속성(Attribute) 선택자

```css
img[width] {border:black thin solid;} /* width 속성을 가진 모든 이미지 선택 */
img[height="300"] {border:red thin solid; } /* 값이 300인 height 속성을 가진 모든 이미지 선택 */
image[alt~="flowers"]  {border:red thin solid; }  /* "flowers"라는 단어를 포함하는 alt 속성을 가진 모든 이미지 */
```

형제(Sibling) element 선택자

```css
h1+p {}  /* <h1> 다음에 오는 <p> 선택 */
```

선택자 결합

```css
div#greentea > blockquote {}  /* <blockquote/>의 부모가 되어야하는 "greentea" id를 가진 <div/> 자손 선택자 */
div#greentea > blockquote p {} /* <blockquote/>의 자손이자 "greentea" id를 가진 <div/>의 자손인 <p/> 선택 */
div#greentea > blockquote p:first-line /* 그 <p/>의 첫 줄 */
```
