<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../includes/resources_client.jsp"%>
</head>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitForm({'formName':'prev'});">返回</button>
			<form name="prev" method="post" action="<%=mainUrl%>"></form>
			<h1 class="nav_title" id="nav_title">分行特色测试主页</h1>
			<button id="nextButton" class="nav_right_btn" onclick="ICBCPageTools.submitForm({'formName':'next'});">确定</button>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<form name="next" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" name="url" value="/ClientDemo/passwordok.jsp" />
				<section class="section_padding">
					<h2 class="section_title">密码器密码验签</h2>
					<ul class="cell_container">
						<li>
							<div class="cell_li_txt small_txt">请按工银电子密码器的确认键获取动态密码。为确保动态密码有效，请尽快完成交易。</div>
						</li>					
						<li>
							<div class="cell_li_left">动态密码</div>
							<div class="cell_li_right"><input name="enc_cert_pass1" type="password" size="6" placeholder="请输入" maxlength="6" /></div>
						</li>
					</ul>
				</section>				
			</form>
		</div>
	</div>
	<footer></footer>
</body>
</html>