<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../includes/resources_client.jsp"%>
</head>
<%
	request.setCharacterEncoding("UTF-8");
	String passtag=request.getParameter("passtag");
	String tranErrCode=request.getParameter("z2f_tranErrCode");
	String tranErrDispMsg=request.getParameter("z2f_tranErrDispMsg");
	if(tranErrDispMsg!=null){
		tranErrDispMsg=new String(tranErrDispMsg.getBytes("ISO-8859-1"),"GBK");
	}
%>
<body>
	<header>
		<nav>
			<h1 class="nav_title" id="nav_title">分行特色验签测试</h1>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<%if("0".equals(passtag)) {%>
				<section class="section_padding">
					<div class="info_container">
						<h3 class="info_success"></h3>
						<ul>
							<li>验签成功！</li>
						</ul>
					</div>
				</section>			
			<%}else{%>
				<section class="section_padding">
					<div class="info_container">
						<h3 class="info_error"></h3>
						<ul>
							<li>
								<table class="detail_table">
									<tr>
										<td class="detail_td_left">信息代码</td>
										<td class="detail_td_right"><%=tranErrCode %></td>
									</tr>
									<tr>
										<td class="detail_td_left">提示信息</td>
										<td class="detail_td_right"><%=tranErrDispMsg %></td>
									</tr>
								</table>
							</li>
						</ul>
					</div>
				</section>			
			<%} %>		
		</div>
	</div>
	<footer>
		<section class="section_padding">
			<div class="button_container" data-rowsize="1">
				<button class="normal_btn" onclick="ICBCPageTools.submitForm({'formName':'prev'});">返回主页</button>
				<form name="prev" method="post" action="<%=mainUrl%>"></form>
			</div>
		</section>		
	</footer>
</body>
</html>