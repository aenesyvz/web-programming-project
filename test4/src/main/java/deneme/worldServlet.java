package deneme;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import entities.User;

/**
 * Servlet implementation class worldServlet
 */
@WebServlet("/worldServlet")
public class worldServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public worldServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		    User user = new User();
	        user.setFirstName(request.getParameter("firstName"));
	        user.setLastName(request.getParameter("lastName"));
	        user.setEmail(request.getParameter("email"));
	        user.setPassword(request.getParameter("password"));
	        user.setDateOfBirth(request.getParameter("dateOfBirth"));
	        user.setGender(request.getParameter("gender"));
	        user.setPhoneNumber(request.getParameter("phoneNumber"));
	        
	        request.setAttribute("user", user);
	        request.getRequestDispatcher("info2.jsp").forward(request, response);
	}

}
