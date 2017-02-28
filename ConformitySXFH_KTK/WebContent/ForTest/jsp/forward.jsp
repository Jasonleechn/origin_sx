<%
	String url=request.getParameter("url");
	getServletContext().getRequestDispatcher(url).forward(request,response);
 %>