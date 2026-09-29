Amy Hoy의 Javascript Bootcamp Reference, Part 1 (O'Reilly OSCON 2006) 발표 자료.

- 첨부: [javascriptbootcamp.pdf](https://github.com/benelog/devnote/blob/master/attachments/178070_javascriptbootcamp.pdf)

```javascript
// -------------------------------------------------------------
// *************************************************************
//           Javascript Bootcamp Reference, Part 1
// *************************************************************
//
//                 ⓒ Amy Hoy
//          amy@infocookie.com, www.slash7.com
//            O'Reilly OSCON 2006
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//           Check out my book from O'Reilly this fall!
//              _Web Scripting Power Tools_
//            Amy Hoy and Chris Cornutt
// .............................................................
//
//   To follow along, use FireFox. Install the FireBug
//  extension, and/or use this Javascript shell app:
//  http://www.squarefree.com/shell/shell.html
//
// *************************************************************
// -------------------------------------------------------------
```

## Syntax & Conventions

```javascript
// -------------------------------------------
//      Syntax & Conventions:
// ...........................................
//
// You have a lot of choices to make.
//  Choose wisely.
//
// -------------------------------------------

//// Semi-colons are not required
var foo = getBar() // --> [no error]
var foo = getBar() fooBar() // ! SYNTAX ERROR !

//// CamelCase is the norm
if(fooBar == bazBat) {}

//// Object attributes & methods attached with '.'
someObject.someFunction()
```

## Basic Data Types

```javascript
// -------------------------------------------
//         Basic Data Types:
// ...........................................
//
// Normal types:
// * Number (integers, floats, one type)
// * String
// * Boolean
//
// Special values:
// * null
// * undefined
//
// -------------------------------------------

//// Numbers:
var number = 5  // --> 5
var anotherNumber = 3.14  // --> 3.14

//// Strings:
var string = "Hello, I'm a string!" // --> "Hello, I'm a string!"
var aRealString = new String("I'm a REAL string!")
// --> [I,',m, ,a, ,R,E,A,L, ,s,t,r,i,n,g,!]
aRealString // --> "I'm a REAL string!"

var anotherString = "Hello, I'm \
a string with \
linebreaks!" // --> "Hello, I'm
// a string with
// linebreaks!"

//// Booleans
var booleanVar = false // --> false
var anotherBooleanVar = true // --> true

if(booleanVar) alert("Test!") // --> *nothing*
if(!booleanVar) alert("Test!") // --> [alert] Test!
var anotherBoolean = iReturnABool()

//// null (case-sensitive)
booleanVar = null // --> null

//// undefined (also case-sensitive)
booleanVar == undefined // --> true [because it was set to null]
booleanVar === undefined // --> false
// [the strict operator (===) will not treat null and undefined as
// equivalent]
```

## Doing Stuff with Basic Data Types

```javascript
// -------------------------------------------
//    Doing Stuff with Basic Data Types:
// ...........................................
//
// Everything's an object!
//  And Javascript is dynamically typed!
//
// -------------------------------------------

//// Numbers are objects:
var number = 5 // --> 5
number + 3 // --> 8
5 + 3  // --> 8

//// There is no distinction between ints and floats:
var number = 5 // --> 5
var anotherNumber = new Number(5) // --> 5
var pi = 3.14 // --> 3.14

//// You can determine an object's type using the typeof operator:
typeof number // --> "number"
typeof anotherNumber // --> "number"
typeof pi // --> "number"

//// Strings are objects:
var string = "Hello, I'm a string!" // --> "Hello, I'm a string!"
string.length  // --> 20
"Hello, I'm a string!".length // --> 20

//// Basic math works as you'd expect
3 * 5 + 9 // --> 24
3 * (5 + 9) // --> 42

//// Number operators are methods:
5 + 3 // --> 8
5.+ 3 // --> 8
5.- 3 // --> 2

//// But not on strings:
string + " And you're not!" // --> "Hello, I'm a string! And you're not!"
string.+ " And you're not!" // !! SYNTAX ERROR !!

//// Dynamic typing, or the Variable Formally Known As String:
string = 5 // --> 5
number = "Yep, now I'm a string" // --> "Yep..."

//// This is typically unnecessary:
number = new Number(5) // --> 5
string = new String("String!") // --> [S,t,r,i,n,g,!]

//// Concatenation
"string1 " + " string2" // --> "string1  string2"
"string " + 5 // --> "string 5"
5 + "5" // --> "55"
"string".length // --> 6

//// All strings act like arrays
string[0] // --> H
string[3] // --> l

for(var i = 0; i < string.length; i++) {
 alert(string[i])
} // --> [alert] H, [alert] e, [alert] l, etc.

//// Finding simple substrings (no regexes)
"string1 string2 string3".length // --> 23
var start = "string1 string2 string3".indexOf('string2') // --> 8
"string1 string2 string3".substr(start) // --> "string2 string3"

//// The shorter way:
var string = "string1 string2 string3"
string.substr(string.indexOf('string2')) // --> "string2 string3"
// Note: the string was not changed!

//// Splitting a string into an array
string.split(' ') // --> ["string1", "string2", "string3"]

//// Escaping HTML, URLs, etc.
// For HTML-type content, to prevent quotes from messing up strings, etc:
"<h3>Here's a headline!</h3>".escape() // ! TypeError !
var escaped = escape("<h3>Here's a headline!</h3>") // --> "%3Ch3%3EHere%27s%20a%20headline%21%3C/h3%3E"
var unescaped = unescape(escaped) // --> "<h3>Here's a headline!</h3>"

// For URL-style escaping:
var URL = 'http://mysite.com/?stuff="Foo bar!"&bar="stuff"'
var encodedURL = encodeURI(url) // --> http://mysite.com/?stuff=%22Foo%20bar!%22&bar=%22stuff%22
var decodedURL = decodeURI(encodedURL) // --> http://mysite.com/?stuff="Foo bar!"&bar="stuff"

//// Using a RegExp
var string = "string1 string2 string3"
string.replace(/string1/, 'String Spectacular')
// --> "String Spectacular string2 string3"

var string = "string1 string2 string3"
string.replace(new RegExp("string1"), 'String Spectacular')
// --> "String Spectacular string2 string3"

//// Other useful & expected string methods:
//// * slice() - same as substr()
//// * match(), replace(), search() (for using RegExps)
////    * toUpperCase(), toLowerCase() - self-explanatory
//// * concat() - the same as + operator
```

## RegExps

```javascript
// ------------------------------------------- //
//        RegExps            //
// ........................................... //
//              //
// They're objects, too.             //
//              //
// ------------------------------------------- //

var simpleRegExp = /\/foo/g
var anotherRegExp = new RegExp("/foo","g")

"/foobar /foof /foobaz".match(simpleRegExp)
// --> ["/foo", "/foo", "/foo"]

"/foobar /foof /foobaz".match(anotherRegExp)
// --> ["/foo", "/foo", "/foo"]

"/foobar /foof /foobaz".match(/zort/)
// --> null

simpleRegExp.test("/foobar /foof /foobaz")
// --> true
```

## Arrays

```javascript
// ------------------------------------------- //
//        Arrays            //
// ........................................... //
//              //
// Not unlike what you're used to      //
//              //
// ------------------------------------------- //

//// Arrays are simple:
var emptyArray = [] // --> []
emptyArray.length // --> 0 [the number, not false]

var anArray = ['foo','bar','baz'] // --> ['foo','bar','baz']
var anotherArray = new Array(3) // --> [undefined, undefined, undefined]
var yetAnotherArray = new Array('foo','bar','baz') // --> ['foo','bar','baz']

//// They are numerically indexed and can have any type of value:
anotherArray[0] = 'foo' // --> ['foo', undefined, undefined]
anotherArray[1] = 5 // --> ['foo', undefined, 5]

//// Combining arrays
comboArray = anArray.concat(anotherArray) // --> ['foo','bar','baz','foo',undefined,5]

//// Turning arrays into strings
string = anArray.join(':') // --> "foo:bar:baz"

//// Add an element to the array at the end
anArray.push('new') // --> ['foo','bar','baz','new']

//// Take the last element off an array and store it
var lastItem = anArray.pop() // --> "new"; anArray = ['foo','bar','baz']

//// Iteration...
for(i = 0; i < anArray.length; i++) {
 alert(anArray[i])
 // [alert] "foo", [alert] "bar", [alert] "baz"
}

//// Multidimensional arrays
var mdArray = ['foo','bar',['baz','zort']] // --> ['foo','bar',['baz','zort']]
mdArray[0][1] // --> "o" (1st o in foo)
mdArray[2][1] // --> "zort"

//// Locating given values
anArray.indexOf('foo') // --> 0
anArray.indexOf('baz') // --> 2
mdArray.indexOf('zort') // --> -1 (not found! doesn't work on nested arrays)

//// Other useful & expected array methods:
////  * sort()
////  * reverse()
////  * pop()
////  * shift()
////  * unshift()
//// * slice()
//// * splice()
//// * join()
//// * toString()
//// * valueOf()
```

## Other Built-In Objects

```javascript
// -------------------------------------------
//     Other Built-In Objects
// ...........................................
//
// * Math -- used like Math.sin(num),
//  Math.min(a,b), Math.ceil(num), etc.
// * Date -- for date math and so on, yay!
//  date = new Date()
//  day = date.getDay()
// * Function -- tricky and not really worth
//   using
//
// -------------------------------------------
```

## Hashes... Wait, Just Objects!

```javascript
// -------------------------------------------
//        Hashes... Wait, Just Objects!
// ...........................................
//
// Hashes? We don't need no stinking hashes!
//
// There actually is no hash type in
// Javascript. However, the simplest objects
// can be treated like hashes. Plus, they're
// good for other things, like being objects.
//
// -------------------------------------------

//// Create an object using the {}
var newObject = {} // --> {}

//// Create, set, and read attributes on the fly:
newObject.foo = "bar" // --> "bar"
newObject.foo // --> "bar"

//// Specifying attributes during object creation:
var anotherObject = {foo:"bar", baz:"bat"} // --> {foo:"bar", baz:"bat"}
anotherObject.foo // --> "bar"
anotherObject.baz // --> "bat"
anotherObject.baz = "zort" // --> "zort"
anotherObject.baz // --> "zort"

//// Treating objects like associative arrays:
anotherObject['foo'] // --> "bar"

//// Detect if an object has a given property:
if(anotherObject.blort) { alert("Yay!") } // [no alert, it's false]
if(anotherObject.hasOwnProperty('blort')) { alert("Yay!") } // [no alert]
if(anotherObject.hasOwnProperty('foo')) { alert("Yay!") } // [alert] Yay!
```

## Functions

```javascript
// -------------------------------------------
//         Functions
// ...........................................
//
// For the most part, just like any other
// language. Until you get to the cool stuff.
//
// -------------------------------------------

//// Declaring a function without an argument
function noArgument() {
 // do stuff
 alert("I can't argue; I have no arguments")
}
noArgument()
// --> [alert] I can't argue; I have no arguments

//// Declaring a function with arguments
function simpleFunction(arg1,arg2,arg3) {
 // do stuff here
 return arg1 + arg2 + arg3
}
simpleFunction(1,2,3)
// --> 6

//// More using argument values inside a function
function myFunction(arg1,arg2,arg3) {
 // use argument values
 alert("I have an argument! " + arg1)
 // use an object argument
 alert(arg2.bar)
 // call an argument as a function
 arg3()
}

//// Wait, what's that last line?
//// -----It's a CLOSURE!------
////  (Anonymous Inner Function)

myFunction("foo", {bar:"baz"}, function(){ alert("Victory!")})
// outputs...
//   [alert] I have an argument! foo
//   [alert] baz
//   [alert] Victory!

//// Creating a function handle
var myOtherFunction = function() {just
 alert("Victory!")
}

myFunction("foo", {bar:"baz"}, myOtherFunction)

//// Using the arguments object
function myFunction() {
 // use argument values
 alert("I have an argument! " + arguments[0])
 // use an object argument
 alert(arguments[1].bar)
 // call an argument as a function
 arguments[2]()
}
// It works the same!
```

## Statements & Flow Control

```javascript
// -------------------------------------------
//       Statements & Flow Control
// ...........................................
//
// For the most part, these work as you'd
// expect from (most) other languages. There
// are only a handful of differences.
//
// -------------------------------------------

//// The simplest if()
if(something) doStuff()

//// If, Else If, and Else
if(something == foobar) {
 alert("equals foobar!")
} else if(something == bazbat) {
 alert("equals bazbat!")
} else {
 alert("equals neither!")
}

//// Braces aren't *strictly* required (but they're
//// a really really good idea)
if(something == true)
 alert("True!")
else
 alert("Not true!")

//// Switch statements... more of what you'd expect
switch(something) {
 case "foobar":
  // if something == "foobar"
  alert("Oh no! It's a foobar!")
  break
 case "barfoo":
  // if something == "barfoo"
  alert("Barfoo!")
  break
 case "fallthru":
  // without a break, results will cascade
  // the result? [alert] Falling through...
  //             [alert] fallen through
  alert("Falling through...")
 case "fellthru":
  alert("fallen through.")
  break
 default:
  // if there is no case "*" match, execute this code
  alert("Case not found... here's a default")
}

//// while() is also consistent with most other languages
var i = 0
while(i < 3) {
 alert(i)
 i++
} // --> [alert] 0, [alert] 1, [alert] 2

//// do..while() is identical to while(), in reverse
var i = 0
do {
 alert(i)
 i++
} while(i < 3)
// --> [alert] 0, [alert] 1, [alert] 2

//// for() loops, as demonstrated thru-out this guide
for(var i = 0; i < 3; i++) {
 alert(i)
} // --> [alert] 0, [alert] 1, [alert] 2

//// for..in() is different: it iterates over an object's
//// properties, returning the property name so you can
//// then fetch the property's value
var theObject = {foo:"bar", baz:"bat", narf:"zoit"}
// --> [Object object]
for(attribute in theObject) {
 alert(attribute +" = "+ theObject[attribute])
}
// --> [alert] foo = bar, [alert] baz = bat
//     [alert] narf = zoit

//// Using with(), you can reduce code repetitiveness
//// by placing yourself in an object's scope:
var theObject = { foo:"bar", baz:"bat", narf:function(){alert("narf!")}}
// --> [Object object]

with(theObject) {
 alert(foo +" and "+baz)
 narf()
} // --> [alert] "bar and bat", [alert] narf!

//// with() works with built-in objects, too:
with(Math) {
 alert(cos(50))
} // --> [alert] 0.15425144988758405

//// The magic of labels helps manage the control of
//// nested loops (continue and break will operate without
//// labels, however they're handy and help make code more
//// readable)
var foo = 0
var bar = 11
message = ""
fooAndBar: while (foo < 4) {
      fooOnly: while (bar-- >= 4) {
   message = "bar = "+bar+""
            if ((bar % 2) == 0) {
      alert(message + " ... is even, foo++")
      // jump out of fooOnly to finish executing fooAndBar
               break fooOnly;
   } else {
      alert(message + " is NOT even, bar--")
      // continue inside this loop
      continue fooOnly;
   }
         }
   foo += 1;
   message = (foo == bar) ? "parity has been achieved!" : "foo = "+foo;
   alert(message)
   }
// While somewhat synthetic (chosen for its relative brevity),
// the above example of counting down on one variable while counting up on
// another does show labels in their natural environment.
```

## More on Objects

```javascript
// -------------------------------------------
//          More on Objects
// ...........................................
//
// They're useful for more than just faking
// hash behavior. In fact, Javascript's
// object model is one of the coolest parts
// of the language.
//
// There are no classes in Javascript; it's
// all object-based. If you want a
//  constructor, just write a function that
//  does anything you want... it will create
//  an object. You can extend and modify
//  existing objects in several ways. One way
//  just involves using = . The other main
//  way, the object.prototype property, gives
//  its name to the object model (Prototype-
//  based Object Model)
//
// -------------------------------------------

//// Creating an object using JSON:
var foo = {
    bar:"baz",
    zort:"narf",
    aNumber:5,
    anArray:['banana','plaintain','ugli fruit'],
    doStuff:function() {
        alert("I'm doing stuff!")
    }
} // --> [Object object]

foo.zort // --> "narf"
for(i = 0; i < foo.anArray.length; i++) {
    alert(foo.anArray[i])
}
// --> [alert] banana, [alert] plaintain,
//     [alert] ugli fruit
foo.doStuff() // --> [alert] I'm doing stuff!

//// Don't forget your commas when using JSON!
var foo = {
    bar:"baz",
    zort:"narf",
    aNumber:5,
    anArray:['banana','plaintain','ugli fruit']
    doStuff:function() {
        alert("I'm doing stuff!")
    }
}
// --> ! SyntaxError ! Line 6: missing } after property list

//// Passing JSON as a string and evaluating it
var data = "{banana:'yummy', plaintain:'icky'}"

function handleAjaxResult(ajaxResult) {
    eval("var resultData = "+ajaxResult)
    alert(resultData.banana)
}

handleAjaxResult(data)
// --> [alert] yummy

//// Creating objects the more old-fashioned way
//// Use any function you write to create an object
function anyFunction() {}
var object = new anyFunction() // --> [Object object]

//// Functions can act like real constructors
function Foo() {
 this.bar = "baz"
 alert("I'm a new Foo!")
}

var fooInstance = new Foo() // --> [alert] I'm a new Foo!
fooInstance.bar // --> "baz"

Foo.prototype.bar = "bat"
Foo.prototype.fuzz = "boo"
Foo.prototype.danger = function() { alert("Alert! Alert!" ) }

fooInstance.danger() // --> [alert] Alert! Alert!
fooInstance.bar //--> "baz"
fooInstance.fuzz // --> "boo"

//// Create "A extends B" relationships
// Base Functionality
function SweetLiquid() {
 this.volume = 500
 this.unit = 'ml'
 this.drink = function() { this.volume-- }
 this.sweetnessRating = .5
}

// "Children"
function Soda() {}
function Molasses() {
 // add extra attributes/functions etc
 this.viscosity = "low"
}

function KoolAid() {
 // run anything at creation time
 alert("OHH YEAH!")
 // add extra attributes/functions etc
 this.mascot = "awesome"
 // override defaults from extended object
 this.unit = 'quart'
 this.volume = '4'
}

//// Creating the "extends" relationship
Soda.prototype = new SweetLiquid
Molasses.prototype = new SweetLiquid
KoolAid.prototype = new SweetLiquid

//// Creating an object:
var cola = new Soda // --> [Object object]
cola.volume // --> 500
cola.unit // --> "ml"

var strawberryKoolAid = new KoolAid
// --> [Object object] ... [alert] "OHH YEAH!"
strawberryKoolAid.mascot // --> "awesome"
strawberryKoolAid.unit // --> "quart"
strawberryKoolAid.volume // --> 4

//// Adding a method to the KoolAid object...
//// This won't work because it's not extending the prototype:
KoolAid.drink = function(amount) {
 this.volume = this.volume - amount
 return this.volume
}

//// But this will:
KoolAid.prototype.drink = function(amount) {
 this.volume = this.volume - amount
 return this.volume
}

strawberryKoolAid.drink(1) // --> 3

//// If you wanted to extend only the particular instance of
//// KoolAid:
strawberryKoolAid.spill = function(amount) {
 this.volume = this.volume - (amount * 2)
 return this.volume
}

grapeKoolAid = new KoolAid
// --> [Object object] ... [alert] "OHH YEAH!"

strawberryKoolAid.spill(1) // --> 1
grapeKoolAid.spill(1)
// ! TypeError ! grapeKoolAid.spill is not a function
```

## Exceptions

```javascript
// -------------------------------------------
//             Exceptions
// ...........................................
//
// No real language is complete without
// exception handling. Javascript has fairly
// robust support for exceptions and handling
// them; use the built in ones or create
// your own. You can also catch any errors
// the Javascript interpreter throws, aside
// from syntax errors.
//
// -------------------------------------------

//// Catch all exceptions with a generic try..catch
//// before:

grapeKoolAid.spill(1)
// ! TypeError ! grapeKoolAid.spill is not a function

try {
 grapeKoolAid.spill(1)
} catch (e) {
 alert("Oops! An error of type "+e.name + " occurred. \
 The message was: " +e.message)
}
// --> [alert] Oops! An error of type TypeError occurred.
//     The message was: grapeKoolAid.spill is not a function

//// Catch a specific type of error for a given catch block
//// Specify as many different catch scenarios as you like;
//// just plain catch() will be executed if no other statements
//// match
try {
 grapeKoolAid.spill(1)
} catch (e if e.name == "TypeError") {
 alert("Oops! You seemed to have called the wrong \
 kind of thing")
} catch (e) {
 alert("Another kind of error has occurred")
}
// --> [alert] Oops! You seemed to have called the wrong
//     kind of thing

//// Throwing a simple custom error (string, number, anything)
//// It seems easiest to throw strings or numbers but they will not
//// be compatible with code written to handle built-in Javascript
//// exception objects (with names and messages)
grapeKoolAid.spill = function(amount) {
 if(amount) {
  throw "You can't spill grape KoolAid! \
  That's ridiculous!"
 }
}
grapeKoolAid.spill(2)
// ! CantSpillError ! You can't spill grape KoolAid!
// That's ridiculous!

//// Create and throw a reusable, Error-compatible custom error object
//// A function that acts as a constructor to set name and message will do nicely
function CantSpillError(beverage) {
 this.name = "CantSpillError"
 this.message = "You can't spill "+beverage+"! That's ridiculous!"
}
//// Throwing the custom error, you must instantiate the error object:
grapeKoolAid.spill = function(amount) {
 if(amount) {
  throw new CantSpillError("grape KoolAid")
 }
}
//// Catch it the same way you would a standard Javascript error:
try {
 grapeKoolAid.spill(1)
} catch (e) {
 alert("Oops! An error of type "+e.name + " occurred. \
 The message was: " +e.message)
}
// --> [alert] Oops! An error of type CantSpillError occurred.
//     The message was: You can't spill grape KoolAid!
//     That's ridiculous!

//// Use a finally() block for code that should always be run after
//// a try..catch block, regardless of whether or not an exception was
//// thrown or caught.
try {
 grapeKoolAid.spill(1)
} catch (e) {
 // built-in Error objects have name and message properties
 alert("Oops! An error of type "+e.name + " occurred. The message was: " +e.message)
} finally {
 // ALWAYS drink the rest of the koolaid! No matter what!
 grapeKoolAid.drink(koolaid.volume)
}
```

## The DOM

```javascript
// -------------------------------------------
//             The DOM
// ...........................................
//
// -------------------------------------------

var children = document.childNodes;
for(var i=0; i < children.length; i++) {
 alert(children[i])
}
// --> [alert] [Object DocumentType]
// --> [alert] [Object HTMLHtmlElement]

var children = document.body.childNodes;
for(var i=0; i < children.length; i++) {
 alert(children[i])
}
// --> [alert] [Object Text]
// --> [alert] [Object HTMLDivElement]
// --> [alert] [Object Text]
// etc

//// Finding DOM elements by DOM id
var node = document.getElementById("main")
// --> [object HTMLDivElement]

node.id
// --> "id"

node.tagName
// --> "DIV"

node.className
// --> "box"

var parent = document.getElementById("sidebar")
// --> [object HTMLDivElement]

var sidebarBlocks = parent.getElementsByTagName("div")
// --> [ div, div, div ]

for(i = 0; i < sidebarBlocks.length; i++) {
    var newNode = document.createElement('p')
    newNode.innerHTML = "I am #"+i
    sidebarBlocks[i].appendChild(newNode)
}

// ************************************************************
//           For more resources from my presentation
//              go to http://www.slash7.com/
// ************************************************************
```

## Related
- [[javascript]]
- [[javascript-basic]]
- [[javascript-dom]]
- [[regular-expression]]
