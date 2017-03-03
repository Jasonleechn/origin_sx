<%@page import="com.icbc.conformity.context.MySessionContext"%>
<%
String sImagePath="";
String sStylePath="";
if(MySessionContext.Mode==MySessionContext.ModeType.Normal){
	sStylePath = request.getParameter("z2f_style_path");
}else{
	sStylePath = "/ConformitySXFH_KTK/ForTest/3gstyle/grey/";
}
if(sStylePath!=null&&sStylePath.length()>0){
	//save in session
	HttpSession mySession=MySessionContext.getSession((String)request.getAttribute("c_sessionId"));
	mySession.setAttribute("sStylePath",sStylePath);
}else{
	sStylePath=(String)MySessionContext.getSession((String)request.getAttribute("c_sessionId")).getAttribute("sStylePath");
}
sImagePath = sStylePath+"images/";
out.print("<link rel=\"stylesheet\" type=\"text/css\" href=\""+sStylePath+"css/css.css\" />");
%>