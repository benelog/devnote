When Runtime.exec() won’t

Java Pitfalls: Excuting an external program using Runtime.exec() method
or ProcessBuilder class

<http://devdaily.com/java/edu/pj/pj010016/>

<http://jppf-project.cvs.sourceforge.net/viewvc/jppf-project/node/src/java/org/jppf/process/ProcessWrapper.java?revision=1.2&view=markup>

<http://www.rgagnon.com/javadetails/java-0014.html>

# 예제

``` java
public class StreamConverter implements Runnable {

 private StringBuilder message =null;
 private InputStream input = null;
 public StreamConverter(InputStream input){
  this.input = input;
  this.message = new StringBuilder();
 }

 public void run() {
    BufferedReader reader = new BufferedReader(new InputStreamReader(input));
    String line= null;
    try {
   while( (line = reader.readLine())!=null){
      message.append(line);
     }
    } catch (IOException e) {
    throw new IllegalStateException("cann not read stream",e);
    }
 }

 public StringBuilder getMessage() {
  return message;
 }
}
```

<div class="formalpara">

<div class="title">

waitFor는 무한대기 될 수도 있다…​

</div>

``` java
public static void main(String[] args) throws IOException, InterruptedException{
        Process pc = Runtime.getRuntime().exec("java");
        InputStream input = pc.getInputStream();
        IOUtils.copy(input, System.out);
        int exitCode = pc.waitFor();
        System.out.println(exitCode);
 }
```

</div>

<div class="formalpara">

<div class="title">

멈추는 코드

</div>

``` java
public static void main(String[] args) throws IOException, InterruptedException{
   Process pc = Runtime.getRuntime().exec("javac");
   InputStream input = pc.getInputStream();
   IOUtils.copy(input, System.out);
   int exitCode = pc.waitFor();
   System.out.println(exitCode);
}
```

</div>

# zt-exec

- <https://github.com/zeroturnaround/zt-exec>
- <https://github.com/zeroturnaround/zt-process-killer>

# NuProcess

- <https://github.com/brettwooldridge/NuProcess>

## Related
- [[effective-java]]
- [[java-annotation]]
- [[java-basic]]
- [[java-basic-summary]]
- [[java-bytecode]]
- [[java-concurrency]]
- [[java-date]]
- [[java-dto]]
- [[java-ee-pattern]]
- [[java-encoding]]
- [[java-fast-boot]]
- [[java-fiber]]
- [[java-functional-library]]
- [[java-gc]]
- [[java-json-parser]]
- [[java-lambda]]
- [[java-memory-model]]
- [[java-multiline-string]]
- [[java-native-memory]]
- [[java-performance]]
- [[java-process-call]]
- [[java-profiling]]
- [[java-puzzler]]
- [[java-references]]
- [[java-security]]
- [[java-string]]
- [[java-thread-dump]]
- [[java-tips]]
- [[java-web-framework]]
- [[jvm]]
- [[openjdk]]
