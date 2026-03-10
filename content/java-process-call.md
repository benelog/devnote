# 방법

<http://blog.art-of-coding.eu/executing-operating-system-commands-from-java/>

import java.io.IOException;

import java.io.InputStream;

import org.apache.commons.io.IOUtils;

import org.junit.Test;

public class ShellTest {

    String[] command = new String[]{"ls","-al"};

    @Test

    public void withProcessBuilder() throws IOException, InterruptedException {

    ProcessBuilder builder = new ProcessBuilder(command);

    Process process = builder.start();

    printStream(process);

    }

    @Test

    public void withRunetime() throws IOException, InterruptedException {

    Runtime runtime = Runtime.getRuntime();

    Process process = runtime.exec(command);

    printStream(process);

    }

    private void printStream(Process process) throws IOException, InterruptedException {

    process.waitFor();

    InputStream stream = process.getInputStream();

    IOUtils.copy(stream, System.out);

    IOUtils.closeQuietly(stream);

    }

}

    무한 대기 문제

    public static void main(String[] args) throws IOException, InterruptedException{
           Process pc = Runtime.getRuntime().exec("java");
           InputStream input = pc.getInputStream();
           IOUtils.copy(input, System.out);
           int exitCode = pc.waitFor();
           System.out.println(exitCode);
    }

waitFor는 무한대기 될 수도 있다…​

    그런데 위의 코드를 Runtime.exec("javac")를 실행시키는 코드로 바꾸어보면, 이 호출은 영원히 끝나지 않게 됩니다.

: : javaworld에 올라온 고전이자 최고의 글

- You cannot obtain an exit status from an external process until it has exited
- You must immediately handle the input, output, and error streams from your spawned external process
- You must use Runtime.exec() to execute programs
- You cannot use Runtime.exec() like a command line Alvin Alexander의 글
- [Running system commands in Java applications](http://devdaily.com/java/edu/pj/pj010016/) : 스트림 처리 제대로 암함
- <http://alvinalexander.com/java/java-exec-processbuilder-process-1> : 개선판
- <http://alvinalexander.com/java/java-exec-processbuilder-process-2>
- <http://alvinalexander.com/java/java-exec-processbuilder-process-3>

## 참고할만한 구현체

- 분산처리 프레임워크 [JPPF](http://sourceforge.net/projects/jppf-project/)의 [ProcessWrapper](http://jppf-project.cvs.sourceforge.net/viewvc/jppf-project/node/src/java/org/jppf/process/ProcessWrapper.java?revision=1.2&view=markup)
- Alvin Alexander가 [Java exec - execute system processes with Java ProcessBuilder and Process](http://alvinalexander.com/java/java-exec-processbuilder-process-1) 글에 공유한 소스
- [SystemCommandExecutor](http://alvinalexander.com/java/edu/java-exec/SystemCommandExecutor.java) : shell 실행 전담 클래스
- [ThreadedStreamHandler](http://alvinalexander.com/java/edu/java-exec/ThreadedStreamHandler.java) : 스트림처리 클래스
- [ProcessBuilderExample](http://alvinalexander.com/java/edu/java-exec/ProcessBuilderExample.java) : SystemCommandExecutor를 사용하는 예제
- [Ant Exec Task](http://ant.apache.org/manual/Tasks/exec.html)의 [PumpStreamHandler](https://github.com/apache/ant/blob/ANT_12_FIXES/src/main/org/apache/tools/ant/taskdefs/PumpStreamHandler.java)
- [Apache-commons-exec](http://commons.apache.org/proper/commons-exec/)의 [PumpStreamHandler](https://code.google.com/p/j2exec/source/browse/src/main/java/org/apache/commons/exec/PumpStreamHandler.java?r=577e4c2d6227bd4336cd0bb8b7bba2c68be392a8) (Ant의 것과 패키지는 다르나 같은 코드)
- [Exec-maven-plugin](http://mojo.codehaus.org/exec-maven-plugin/)의 [ExecMojo](http://svn.codehaus.org/mojo/tags/exec-maven-plugin-1.2.1/src/main/java/org/codehaus/mojo/exec/ExecMojo.java) ([Apache-commons-exec](http://commons.apache.org/proper/commons-exec/)를 활용) public class StreamConverter implements Runnable {

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

# 부모 프로세스의 메모리 복제

[외부 프로그램을 실행할 때 JVM에서는 무슨
일이?](http://blog.naver.com/naverdev?Redirect=Log&logNo=120113620117)

# Apache Exec

<http://commons.apache.org/exec>

\<dependency\> \<groupId\>org.apache.commons\</groupId\>
\<artifactId\>commons-exec\</artifactId\> \<version\>1.1\</version\>
\</dependency\>

## Related
