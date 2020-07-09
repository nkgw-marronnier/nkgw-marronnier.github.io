package test;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/Keijiban")
public class Keijiban extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Keijiban() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("not used");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String action = request.getParameter("action");
		if(action.contentEquals("送信")) {
			send(request, response);
		}else if(action.contentEquals("初期化")) {
			terminateSession(request, response);
		}
	}
	void send(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String messagestring = request.getParameter("message");
		String timestring = (new java.text.SimpleDateFormat("yyyy/MM/dd H:mm:ss").format(new java.util.Date()));
		String namestring = request.getParameter("name");
		System.out.printf("%s\n",messagestring);

		HttpSession session = request.getSession();
		ArrayList<String> send = (ArrayList<String>)session.getAttribute("send");
		ArrayList<String> time = (ArrayList<String>)session.getAttribute("time");
		ArrayList<String> name = (ArrayList<String>)session.getAttribute("name");
 		if(send == null) {
			send = new ArrayList<String>();
			session.setAttribute("send", send);
		}
 		if(time == null) {
			time = new ArrayList<String>();
			session.setAttribute("time", time);
		}
 		if(name == null) {
			name = new ArrayList<String>();
			session.setAttribute("name", name);
		}
 		if(messagestring.equals("")) {
 			send.add("Null-Message");
 		}else {
 			send.add(messagestring);
 		}
 		if(namestring.equals("")) {
 			name.add("Null-Name");
 		}else {
 			name.add(namestring);
 		}
		time.add(timestring);
		session.setAttribute("send", send);
		session.setAttribute("time", time);
		session.setAttribute("name", name);

		RequestDispatcher dispatcher = request.getRequestDispatcher("/keijiban.jsp");
		dispatcher.forward(request, response);
	}
	void terminateSession(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		HttpSession session = request.getSession();
		session.invalidate();

		RequestDispatcher dispatcher = request.getRequestDispatcher("/keijiban.jsp");
		dispatcher.forward(request, response);
	}
}
