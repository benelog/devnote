## Network cache
Tomcat 설정 변경 방법

1. Tomcat 구동 시 적용 방법
   1. 설정 변경 파일 : `$JAVA_HOME/jre/lib/security/java.security`
   2. 설정 추가 라인(TTL 5분) : `networkaddress.cache.ttl=300`
   3. 톰캣 Restart
2. 자바코드에서 설정 변경 시

```java
java.security.Security.setProperty("networkaddress.cache.ttl" , "300");
```

## Java 파일에서 단어 읽기
```java
import java.io.FileReader;
import java.io.StreamTokenizer;

public class WordUtil {

    public static void main(String[] args) {

        try{
            FileReader fr = new FileReader("c:/test.txt");
            StreamTokenizer str = new StreamTokenizer(fr);
            str.resetSyntax();
            str.wordChars('0','9');
            str.wordChars('A','Z');
            str.wordChars('a','z');
            str.whitespaceChars(0, '0'-1);
            str.whitespaceChars('9'+1, 'A'-1);
            str.whitespaceChars('z'+1, '\uffff');

            int token;
            while( (token=str.nextToken())!= StreamTokenizer.TT_EOF ){
                System.out.println(str.sval);
            }
            System.out.println("well done");
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
```

## Java로 URL 읽어오기
### Text
```java
import java.net.URL;
import java.net.URLConnection;
import java.net.MalformedURLException;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.IOException;

public class URLConn{
    public static void main(String args[]){
        URL url;//URL 주소 객체
        URLConnection connection;//URL접속을 가지는 객체
        InputStream is;//URL접속에서 내용을 읽기위한 Stream
        InputStreamReader isr;
        BufferedReader br;

        try{
            //URL객체를 생성하고 해당 URL로 접속한다..
            url = new URL(args[0]);
            connection = url.openConnection();

            //내용을 읽어오기위한 InputStream객체를 생성한다..
            is = connection.getInputStream();
            isr = new InputStreamReader(is);
            br = new BufferedReader(isr);

            //내용을 읽어서 화면에 출력한다..
            String buf = null;
            while(true){
                buf = br.readLine();
                if(buf == null) break;
                System.out.println(buf);
            }
        }catch(MalformedURLException mue){
            System.err.println("잘못되 URL입니다. 사용법 : java URLConn http://hostname/path]");
            System.exit(1);
        }catch(IOException ioe){
            System.err.println("IOException " + ioe);
            ioe.printStackTrace();
            System.exit(1);
        }
    }
};
```

### Binary
```java
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.net.URL;
import java.net.URLConnection;

public class TestURL {

    public static void main(String[] args) throws Exception {

        String strUrl = "";
        String strOut = "";

        //FTP
        strUrl = "ftp://jupiter:tjsdud00@www.zlbl.com/public_html/wp/wp-content/uploads/2006/10/boss_20061002_01.jpg";
        strOut = "c:/boss_20061002_01.jpg";

        //HTTP
        //strUrl = "http://www.seonyoung.pe.kr/wp/wp-content/uploads/2006/10/boss_20061002_01.jpg";
        //strOut = "c:/boss_20061002_01.jpg";

        URL url = new URL(strUrl);
        URLConnection con = url.openConnection();
        BufferedInputStream in = new BufferedInputStream(con.getInputStream());
        FileOutputStream out = new FileOutputStream(strOut);

        int i = 0;
        byte[] bytesIn = new byte[1024];
        while ((i = in.read(bytesIn)) >= 0) {
            out.write(bytesIn, 0, i);
        }

        out.close();
        in.close();
        System.out.println("Completed!");
    }
}
```

## Java로 파일목록읽기
```java
/*
활용 예제 - 5
- API(java.io.File) 활용 예제
- 명령행 매개변수로 지정된 디렉토리에 포함된 파일 목록을 하위 디렉토리까지 포함하여 출력합니다.
- 명령행 매개변수의 값을 생략하면 현재 디렉토리에 포함된 파일 목록을 보여줍니다.
- 기준이 되는 디렉토리 하위의 모든 디렉토리와 파일의 정보가 출력되도록 합니다.
- 파일 목록을 출력할 때 앞에 공백이 출력하도록 하여 하위 디렉토리에 대한 구분을 합니다.
*/
// 이 소스에서 사용하게될 File 이라는 클래스가 존재하는 패키지를 import 합니다.
import java.io.*;

class FileList {
   public static void main(String args[]) {
      // File 유형의 참조형 변수를 선언합니다. 지역 변수이므로 null 로 초기화합니다.
      File f = null;
      if (args.length == 0) {
        // 전달된 명령행 매개변수가 없으면 현재 디렉토리를 가지고 File 객체를 생성합니다.
         f = new File(".");
      } else {
        // 전달된 명령행 매개변수를 가지고 File 객체를 생성합니다.
         f = new File(args[0]);
      }
      // FileList 객체를 생성합니다.
      // recusrse() 메서드는 static 메서드가 아니므로 FileList의 객체를 생성한 후에 호출합니다.
      FileList fd = new FileList();
      fd.recurse(f, 0);
   }
   void recurse(File dirFile, int depth){
      // 지정된 디렉토리에 존재하는 파일과 하위 디렉토리에 대한 명칭들을 String 형 배열 객체로 리턴합니다.
      String contents[] = dirFile.list();
      for(int i = 0; i < contents.length; i++){
        // 하위 디렉토리의 Depth 만큼 들여쓰기가 되도록 합니다.
         for(int spaces = 0; spaces < depth; spaces++)
            System.out.print("  ");
         System.out.println(contents[i]);
         // 현재 디렉토리와 파일 정보를 가지고 File 객체를 생성합니다.
         File child = new File(dirFile, contents[i]);
         // 현재 디렉토리의 파일이 하위 디렉토리인 경우에만 resurse() 메서드를 재귀 호출합니다.
         if(child.isDirectory())
            recurse(child, depth+1);
      }
   }
}
```

## nio
### nio패키지
- [nio 패키지 소개](http://blog.naver.com/kvivaldi/60003388010)

### 파일복사
```java
public static void fileCopyMapped(String from, String to) throws Exception{

    FileInputStream fis = null;
    FileOutputStream fos = null;

    FileChannel in = null;
    FileChannel out = null;

    try{
        fis = new FileInputStream(from);
        fos = new FileOutputStream(to);
        in = fis.getChannel();
        out = fos.getChannel();
        MappedByteBuffer m = in.map(FileChannel.MapMode.READ_ONLY,0, in.size());
        out.write(m);

        // 두줄을 in.transferTo(0,in.size(),out);
    } catch (Exception e){
        e.printStackTrace();
        throw e;
    } finally{
        if (out!=null) out.close();
        if(in!=null) in.close();
        if(fos!=null) fos.close();
        if(fis!=null) fis.close();
    }
}
```

## 채팅 프로그램
- [ChatClient.java](https://github.com/benelog/devnote/blob/master/attachments/158548_ChatClient.java)
- [ChatHandler.java](https://github.com/benelog/devnote/blob/master/attachments/158550_ChatHandler.java)
- [ChatServer.java](https://github.com/benelog/devnote/blob/master/attachments/158551_ChatServer.java)

## Related
- [[java]]
- [[excel]]
- [[java-excel]]
- [[network]]
- [[tcp-ip]]
- [[async-server]]
