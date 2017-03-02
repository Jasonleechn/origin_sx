<%@page import="com.icbc.conformity.context.MySessionContext"%><% 
String bankType ="7";

String icbc_user_agent = ((HttpServletRequest)pageContext.getRequest()).getHeader("User-Agent");
String icbc_uaflag="";
if (bankType.equals("7")){
	icbc_uaflag="Android";
}else if(bankType.equals("8")||icbc_user_agent.indexOf("MSIE")>-1){
	icbc_uaflag="WindowsPhone";
}else if (bankType.equals("6")){
	icbc_uaflag="iPhone";
}
String sStylePath="";
String resourcePath="";
String sImagePath="";
	
	resourcePath = "../ForTest/ebdpui/";
	if("Android".equalsIgnoreCase(icbc_uaflag)){
		sStylePath = "../ForTest/ebdpui/icbc_android/";
	}else if("WindowsPhone".equalsIgnoreCase(icbc_uaflag)){
		sStylePath = "../ForTest/ebdpui/icbc_windowsphone/";
	}else if("iPhone".equalsIgnoreCase(icbc_uaflag)){
		sStylePath = "../ForTest/ebdpui/icbc_iphone/";
	}

sImagePath = sStylePath+"images/";

%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="max-age=0"/>
<meta http-equiv="Cache-Control" content="no-cache"/>
<meta charset="UTF-8" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" name="viewport">

<link rel="stylesheet" type="text/css" href="<%=resourcePath%>bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="<%=resourcePath%>bootstrap/css/bootstrap-datepicker3.min.css" />
<%if(("windowsphone").equalsIgnoreCase(icbc_uaflag)){ %>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" type="text/css" href="<%=resourcePath%>icbc_client/css/icbc_client_core_windowsphone.css" />
<%}else{%>
<link rel="stylesheet" type="text/css" href="<%=resourcePath%>icbc_client/css/icbc_client_core.css" />
<%} %>
<script type="text/javascript" src="<%=resourcePath%>jquery/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="<%=resourcePath%>bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=resourcePath%>bootstrap/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="<%=resourcePath%>thirdpart/js/aes.min.js"></script>
<script type="text/javascript" src="<%=resourcePath%>thirdpart/js/validate.min.js"></script>
<script type="text/javascript" src="<%=resourcePath%>thirdpart/js/handlebars.min.js"></script>
<script type="text/javascript" src="<%=resourcePath%>icbc_client/js/icbc_client_template.js"></script>
<script type="text/javascript" src="<%=resourcePath%>icbc_client/js/icbc_client_core.js"></script>
<script>window['user-agent']="<%=java.net.URLEncoder.encode(icbc_user_agent, "UTF-8")%>";</script>
<%@ taglib uri="/WEB-INF/icbc-client-tag.tld" prefix="webUI"%>