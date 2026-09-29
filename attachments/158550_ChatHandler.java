/*
 * 이 소스코드는 prominence 사에서 제공하는 클라이언트/서버관련 책에 나오는
 * 소스코드를 이용하여 just little bit 수정하여 올립니다.
 *
 * 1998년 안창선
 * 이 소스는 클라이언트/서버를 자바로 구현하며, 서버는 Thread 서버입니다.
 * 따라서 자바로 네트웍 프로그래밍을 하는 초.중급자에게 유용한 정보가 될 것입니다.
 * P.S. 이 소스는 허가 받지 않고 배포하는 것입니다. 들키면 저 구속되나요?
 *
 * 이 클래스는 Server에 의해 호출됩니다.
 */

import java.net.*; 
import java.io.*; 
import java.util.*;

public class ChatHandler extends Thread { 
  // public ChatHandler (Socket s) throws IOException ... 
  protected Socket s; // 클라이언트 송신 소켓
  protected DataInputStream i; 
  protected DataOutputStream o;

  public ChatHandler (Socket s) throws IOException { 
    this.s = s; 
    i = new DataInputStream (new BufferedInputStream (s.getInputStream ())); 
    o = new DataOutputStream (new BufferedOutputStream (s.getOutputStream ()));
  }

  // public void run () ... 
  protected static Vector handlers = new Vector ();  
	public void run () { 
    	try {       
		handlers.addElement (this);
	       while (true) { 
        String msg = i.readUTF (); 
	       broadcast (msg);       
 		 } 
      } catch (IOException ex) {
	       ex.printStackTrace ();
      } finally { 
             handlers.removeElement (this);
      try {         s.close (); 
      } catch (IOException ex) {
             ex.printStackTrace();
        }     
      }   
      }

  protected static void broadcast (String message) { 
    synchronized (handlers) { 
      Enumeration e = handlers.elements (); 
      while (e.hasMoreElements ()) { 
        ChatHandler c = (ChatHandler) e.nextElement (); 
        try { 
          synchronized (c.o) { 
            c.o.writeUTF (message); 
          } 
          c.o.flush (); 
        } catch (IOException ex) { 
          c.stop (); 
        } 
      } 
    } 
  }

}
