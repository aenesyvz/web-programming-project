package deneme;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part; 

import entities.User;

@WebServlet("/helloServlet")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
    maxFileSize = 1024 * 1024 * 10,      // 10MB
    maxRequestSize = 1024 * 1024 * 50)
public class helloServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public helloServlet() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = new User();
        user.setFirstName(request.getParameter("firstName"));
        user.setLastName(request.getParameter("lastName"));
        user.setEmail(request.getParameter("email"));
        user.setPassword(request.getParameter("password"));
        user.setDateOfBirth(request.getParameter("dateOfBirth"));
        user.setGender(request.getParameter("gender"));
        user.setPhoneNumber(request.getParameter("phoneNumber"));

        String uploadPath = getServletContext().getRealPath("") + File.separator + "uploads";

        Part filePart = request.getPart("file");
        String fileName = getFileName(filePart);
        String filePath = uploadPath + File.separator + fileName;

        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        String uniqueFileName = getUniqueFileName(uploadPath, fileName);
        filePath = uploadPath + File.separator + uniqueFileName;
        try (InputStream fileContent = filePart.getInputStream()) {
            Files.copy(fileContent, new File(filePath).toPath());
        }

        String savedFilePath = "uploads" + File.separator + uniqueFileName;
        user.setImage(savedFilePath);

        request.setAttribute("user", user);
        request.getRequestDispatcher("info.jsp").forward(request, response);
    	
    }

    private String getFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] tokens = contentDisp.split(";");
        for (String token : tokens) {
            if (token.trim().startsWith("filename")) {
                return token.substring(token.indexOf("=") + 2, token.length() - 1);
            }
        }
        return "";
    }

    private String getUniqueFileName(String uploadPath, String fileName) {
        File file = new File(uploadPath + File.separator + fileName);
        if (!file.exists()) {
            return fileName;
        }

        String baseName = fileName.substring(0, fileName.lastIndexOf("."));
        String extension = fileName.substring(fileName.lastIndexOf("."));
        String uniqueFileName = baseName + "_" + System.currentTimeMillis() + extension;

        File uniqueFile = new File(uploadPath + File.separator + uniqueFileName);
        while (uniqueFile.exists()) {
            uniqueFileName = baseName + "_" + System.currentTimeMillis() + extension;
            uniqueFile = new File(uploadPath + File.separator + uniqueFileName);
        }

        return uniqueFileName;
    }
}
