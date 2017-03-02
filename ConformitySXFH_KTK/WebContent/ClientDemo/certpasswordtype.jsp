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
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'backALink'})">返回</button>
			<a id="backALink" href="<%=mainUrl %>"></a>
			<h1 class="nav_title" id="nav_title">分行特色验签测试</h1>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section class="section_padding">
				<h2 class="section_title">请选择挑战类型</h2>
				<ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'certpasswordtest1'});">
						<div class="cell_li_left">密码器时间挑战</div>
					</li>
					<form name="certpasswordtest1" method="post" action="<%=postUrl%>">
						<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
						<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
						<input type="hidden" name="url" value="/ClientDemo/certpasswordtest1.jsp" />
					</form>					
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'certpasswordtest2'});">
						<div class="cell_li_left">密码器交易要素挑战：6位纯随机数</div>
					</li>
					<form name="certpasswordtest2" method="post" action="<%=postUrl%>">
						<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
						<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
						<input type="hidden" name="z2f_GenerateTokenMessage" value="{$0|6$}" />
						<input type="hidden" name="url" value="/ClientDemo/certpasswordtest2.jsp" />
					</form>				
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'certpasswordtest3'});">
						<div class="cell_li_left">密码器交易要素挑战：随机数+金额</div>
					</li>
					<form name="certpasswordtest3" method="post" action="<%=postUrl%>">
						<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
						<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
						<input type="hidden" name="z2f_GenerateTokenMessage" value="{$0|6|12345$}" />
						<input type="hidden" name="url" value="/ClientDemo/certpasswordtest3.jsp" />
					</form>				
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'certpasswordtest4'});">
						<div class="cell_li_left">密码器交易要素挑战：卡号+金额</div>
					</li>
					<form name="certpasswordtest4" method="post" action="<%=postUrl%>">
						<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
						<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
						<input type="hidden" name="z2f_GenerateTokenMessage" value="{$1|6|12345|6222020200000000000$}" />
						<input type="hidden" name="url" value="/ClientDemo/certpasswordtest4.jsp" />
					</form>			
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'certpasswordtest5'});">
						<div class="cell_li_left">密码器交易要素挑战：手机号+金额</div>
					</li>
					<form name="certpasswordtest5" method="post" action="<%=postUrl%>">
						<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
						<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
						<input type="hidden" name="z2f_GenerateTokenMessage" value="{$2|6|12345|13810650606$}" />
						<input type="hidden" name="url" value="/ClientDemo/certpasswordtest5.jsp" />
					</form>		
				</ul>
			</section>		
		</div>
	</div>
	<footer></footer>
</body>
</html>