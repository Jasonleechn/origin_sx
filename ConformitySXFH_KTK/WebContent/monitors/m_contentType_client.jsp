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
String contextPath="";

	response.setContentType("text/html; charset=utf-8");
	contextPath = "../ForTest"; 
	zhHead = "../ForTest/jsp/"; 	
 	sessionId="";	
 	postUrl = zhHead + "forward.jsp"; 
 	mainUrl = zhHead + "mainforward.jsp?dse_sessionId=" + sessionId;
 	htmlHead= zhHead + "sforward.jsp?dse_sessionId=" + sessionId + "&url="; 
 	urlHead = zhHead + "forward.jsp?dse_sessionId=" + sessionId + "&url=";
	c_sessionId="";
	if(request.getAttribute("c_sessionId")!=null){
		c_sessionId=(String)request.getAttribute("c_sessionId");
	}else{
		c_sessionId=(String)request.getParameter("c_sessionId");
	}

%>