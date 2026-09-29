/*
 * 이 소스코드는 prominence 사에서 제공하는 클라이언트/서버관련 책에 나오는
 * 소스코드를 이용하여 just little bit 수정하여 올립니다.
 *
 * 1998년 안창선
 * 이 소스는 클라이언트/서버를 자바로 구현하며, 서버는 Thread 서버입니다.
 * 따라서 자바로 네트웍 프로그래밍을 하는 초.중급자에게 유용한 정보가 될 것입니다.
 * P.S. 이 소스는 허가 받지 않고 배포하는 것입니다. 들키면 저 구속되나요?
 *
 * Server를 실행하시려면 java ChatServer port_number 순으로 실행할 수 있습니다.
 */

import java.net.*; 
import java.io.*; 
import java.util.*;

public class ChatServer { 

  // 서버(요청을 대기합니다.)
  public ChatServer (int port) throws IOException { 

    // 수신을 위한 소켓(ServerSocket)을 연다.
    ServerSocket server = new ServerSocket (port); 
    while (true) { 

      // 송신을 위한 소켓(client socket)을 요청에 따라 연다.
      Socket client = server.accept (); 
      System.out.println ("Request Accepted from " + client.getInetAddress ()); 

      // 클라이언트측에 메시지를 지속적으로 뿌려주기 위한 핸들러를 할당하고 그것을 수행한다.
      ChatHandler c = new ChatHandler (client); 
      c.start (); 
    } 
  }

  // 인수로 포트 번호를 입력하여야 합니다.
  public static void main (String args[]) throws IOException { 
    if (args.length != 1) 
      throw new RuntimeException ("Syntax: ChatServer "); 
    new ChatServer (Integer.parseInt (args[0])); 
  }

}
