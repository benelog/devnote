/*
 * 이 소스코드는 prominence 사에서 제공하는 클라이언트/서버관련 책에 나오는
 * 소스코드를 이용하여 just little bit 수정하여 올립니다.
 *
 * 1998년 안창선
 * 이 소스는 클라이언트/서버를 자바로 구현하며, 서버는 Thread 서버입니다.
 * 따라서 자바로 네트웍 프로그래밍을 하는 초.중급자에게 유용한 정보가 될 것입니다.
 * P.S. 이 소스는 허가 받지 않고 배포하는 것입니다. 들키면 저 구속되나요?
 *
 * 클라이언트 프로그램을 실행하시려면 java ChatClient host_name port_number 순으로 입력하십시오.
 */

import java.net.*; 
import java.io.*; 
import java.awt.*;

public class ChatClient extends Frame implements Runnable { 
  protected DataInputStream i; 
  protected DataOutputStream o;

  protected TextArea output; 
  protected TextField input;

  protected Thread listener;

  // 화면을 구성합니다.
  // 채팅창의 타이틀과 Input 스트림, Output스트림을 인수로 받는다.
  public ChatClient (String title, InputStream i, OutputStream o) { 
    super (title); 

    // 객체 i(input)와 o(output)을 정의한다.
    // 이 두 객체는 Buffered된 입출력 스트림이다.
    this.i = new DataInputStream (new BufferedInputStream (i)); 
    this.o = new DataOutputStream (new BufferedOutputStream (o)); 
    setLayout (new BorderLayout ()); 

    // 채팅창의 내용이 보여지는 TextArea를 가운데 표시
    add ("Center", output = new TextArea ()); 
    // 내용이 보이는 창은 편집이 불가능하게 한다.
    output.setEditable (false); 

    // 채팅창의 하단에 한줄의 TextField를 넣는다.
    add ("South", input = new TextField ()); 
    pack (); 
    show (); 
    input.requestFocus (); 
    listener = new Thread (this); 
    listener.start (); 
  }

  // 실제 채팅을 시작합니다.
  public void run () { 
    try { 
      // 무한루프(예외 상황 발생 전까지)
      while (true) { 
        // modified UTF-8 형식으로 읽어서 UNICODE 문자열을 보내준다.
        String line = i.readUTF (); 
        // 읽어진 문자열을 채팅창에 쓴다.
        output.append (line + "\n"); 
      } 
    } catch (IOException ex) { 
      ex.printStackTrace (); 
    } finally { 
      listener = null; 
      input.setVisible(false);
      validate ();
      try { 
        o.close (); 
      } catch (IOException ex) { 
        ex.printStackTrace (); 
      } 
    } 
  }

  // 이벤트 핸들링 부분
  public boolean handleEvent (Event e) { 

    // 클라이언트의 TextField에서 문자열을 입력 했을 때의 Event 처리
    if ((e.target == input) && (e.id == Event.ACTION_EVENT)) { 
      try { 
        // UTF형식으로 문자열 출력(소켓으로 전송)
        o.writeUTF ((String) e.arg); 
        o.flush (); 
      } catch (IOException ex) { 
        ex.printStackTrace(); 
        listener.stop (); 
      } 
      // 문자열을 소켓으로 전송후 TextField를 Clear
      input.setText (""); 
      return true; 
   
    // 윈도우를 닫으면 처리하는 부분
    } else if ((e.target == this) && (e.id == Event.WINDOW_DESTROY)) { 
      if (listener != null) 

        // listener thread를 닫는다.
        listener.stop (); 
      setVisible (false); 
      return true; 
    } return super.handleEvent (e); 
  }

  // main 부분 인수로 host이름과 port번호를 입력하여야 합니다.
  public static void main (String args[]) throws IOException { 
    if (args.length != 2) 
      throw new RuntimeException ("Syntax: ChatClient  ");

    // 소켓을 연다.
    Socket s = new Socket (args[0], Integer.parseInt (args[1])); 
    new ChatClient ("Chat " + args[0] + ":" + args[1], s.getInputStream (), 
      s.getOutputStream ()); 
  }

}
