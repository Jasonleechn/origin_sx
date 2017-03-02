<%@page import="com.icbc.conformity.context.MySessionContext"%>
<%
String zhHead="";
String dynaPwdImg="";
String verifyCodeImg="";
String sessionId="";
String tokenImg="";
String postUrl="";
String mainUrl="";
String mainMenuUrl="";
String htmlHead="";
String urlHead="";
String c_sessionId="";
if(MySessionContext.Mode==MySessionContext.ModeType.Normal){
	response.setContentType("text/html; charset=utf-8");
	zhHead = "/ICBCWAPBank/icbc/person/conformity/"; 
 	dynaPwdImg = "/ICBCWAPBank/servlet/ReCreateImgServlet?param="; 
 	verifyCodeImg = "/ICBCWAPBank/servlet/VerifyImageServlet?param="; 
 	sessionId=request.getParameter("dse_sessionId");
 	tokenImg = "/ICBCWAPBank/servlet/TokenMessageImageServlet?sessionId=" + sessionId; 
 	postUrl = zhHead + "forward.jsp"; 
 	mainUrl = zhHead + "mainforward.jsp?dse_sessionId=" + sessionId;
 	mainMenuUrl = "/ICBCWAPBank/servlet/WAPReqServlet?dse_sessionId="+sessionId+"&dse_applicationId=-1&dse_operationName=ActiveMenuOp&pageId=0";
 	htmlHead= zhHead + "sforward.jsp?dse_sessionId=" + sessionId + "&url="; 
 	urlHead = zhHead + "forward.jsp?dse_sessionId=" + sessionId + "&url=";
	c_sessionId="";
	if(request.getAttribute("c_sessionId")!=null){
		c_sessionId=(String)request.getAttribute("c_sessionId");
	}else{
		c_sessionId=(String)request.getParameter("c_sessionId");
	}
}else{
	response.setContentType("text/html; charset=utf-8");
	zhHead = "/ConformityDemo/ForTest/jsp/"; 
 	dynaPwdImg = "http://82.200.47.149:8080/ICBCWAPBank/servlet/ReCreateImgServlet?param="; 
 	verifyCodeImg = "http://82.200.47.149:8080/ICBCWAPBank/servlet/VerifyImageServlet?param="; 
 	sessionId="";
 	tokenImg = "http://82.200.47.149:8080/ICBCWAPBank/servlet/TokenMessageImageServlet?sessionId=" + sessionId; 
 	postUrl = zhHead + "forward.jsp"; 
 	mainUrl = zhHead + "mainforward.jsp?dse_sessionId=" + sessionId;
 	mainMenuUrl = "http://82.200.47.149:8080/ICBCWAPBank/servlet/WAPReqServlet?dse_sessionId="+sessionId+"&dse_applicationId=-1&dse_operationName=ActiveMenuOp&pageId=0";
 	htmlHead= zhHead + "sforward.jsp?dse_sessionId=" + sessionId + "&url="; 
 	urlHead = zhHead + "forward.jsp?dse_sessionId=" + sessionId + "&url=";
	c_sessionId="";
	if(request.getAttribute("c_sessionId")!=null){
		c_sessionId=(String)request.getAttribute("c_sessionId");
	}else{
		c_sessionId=(String)request.getParameter("c_sessionId");
	}
}
%>