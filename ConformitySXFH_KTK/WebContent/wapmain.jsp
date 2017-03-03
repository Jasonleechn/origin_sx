<%@page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/includes/save_session.jsp"%>
<%@ include file="/includes/contentType_client.jsp"%>
<!DOCTYPE html>
<%@ include file="/includes/resources_client.jsp"%>
<html>
<head>
<script type="text/javascript">

jQuery(window).load(function(){
	var branchparam = "<%=request.getParameter("branchURL")%>";
	if(branchparam != "null" && branchparam != ""){
		//alert(xyk_num);
		if(branchparam == "rmyy" )
			ICBCPageTools.submitForm({'formName':'yyt'});
	}
});
</script>
</head>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.nativeBack()">返回</button>
			<h1 class="nav_title" id="nav_title">分行特色主页</h1>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section class="section_padding">
				<h2 class="section_title">客户信息</h2>
				<%
					String custAuthenType=(String)MySessionContext.getSession(c_sessionId).getAttribute("custAuthenType");
					String mainAreaCode=(String)MySessionContext.getSession(c_sessionId).getAttribute("mainAreaCode");	
					String cis=(String)MySessionContext.getSession(c_sessionId).getAttribute("mainCIS");
					String loginid=(String)MySessionContext.getSession(c_sessionId).getAttribute("loginId");
					String name = (String)MySessionContext.getSession(c_sessionId).getAttribute("CNcustName");
					MySessionContext.addPeopleSession(c_sessionId, mainAreaCode+"-"+name+"-"+loginid+"-"+cis, cis);
				%>
				<ul class="cell_container">
					<li>
						<div class="cell_li_left">客户姓名</div>
						<div class="cell_li_right"><%=name%></div>
					</li>
					<li>
						<div class="cell_li_left">认证类型</div>
						<%if(custAuthenType.equals("0")){ %>
						<div class="cell_li_right">静态支付密码</div>
						<%}else if(custAuthenType.equals("2")){ %>
						<div class="cell_li_right">口令卡密码</div>
						<%}else if(custAuthenType.equals("3")){ %>
						<div class="cell_li_right">U盾</div>
						<%}else if(custAuthenType.equals("4")){ %>
						<div class="cell_li_right">动态密码器</div>
						<%} %>
					</li>
				</ul>
			</section>		
			<section class="section_padding">
				<h2 class="section_title">主要服务列表</h2>
				<%-- <ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'gyrx'});">
						<div class="cell_li_left" style="color:red">工银聚富</div>
					</li>
				</ul>
				  
				<form name="gyrx" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="z2f_custCertType" value="{$custCertType$}" />
					<input type="hidden" name="z2f_custCertNum" value="{$custCertNum$}" />
					<input type="hidden" name="url" value="/GYRX/gyrx_main.jsp" />
				</form> --%>
				  <!--  
				<form name="gyrx1" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="z2f_custCertType" value="0" />
					<input type="hidden" name="z2f_custCertNum" value="335013198703113597" />
					<input type="hidden" name="url" value="/GYRX/gyrx_main.jsp" />
				</form>
				-->
				<%-- <ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'yyt'});">
						<div class="cell_li_left">江苏省人民医院银医通</div>
					</li>
				</ul>
				<form name="yyt" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="url" value="/YYT/yytmain.jsp" />
				</form>
				<ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'gjj'});">
						<div class="cell_li_left">社保、公积金业务</div>
					</li>
				</ul>
				<form name="gjj" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="url" value="/gjjmain.jsp" />
				</form> --%>
				
				<ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'kuaitongcard'});">
						<div class="cell_li_left">快通卡业务</div>
					</li>
				</ul>
				<form name="kuaitongcard" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="url" value="/KTCard/ktcmain.jsp" />
				</form>
				<%-- <ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'schoolcard'});">
						<div class="cell_li_left">校园卡业务</div>
					</li>
				</ul>
				<form name="schoolcard" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="url" value="/SchoolCard/schoolmain.jsp" />
				</form>	
				<%if(cis.equals("430100035799919")||cis.equals("110300000247460")){ %>
				<ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'hdjt'});">
						<div class="cell_li_left">红豆银行通</div>
					</li>
				</ul>
				<form name="hdjt" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="url" value="/HDJT/hdjtmain.jsp" />
				</form>	
				<%} %> --%>
			</section>		
											
		</div>
	</div>
	<footer></footer>
</body>
</html>