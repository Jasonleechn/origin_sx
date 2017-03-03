<%@ include file="/includes/contentType_client.jsp"%>
<%@ page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/includes/resources_client.jsp"%>
</head>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">取消</button>
			<a id="returnLink" class="hide" href="<%=urlHead%>/KTCard/stcmain.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">动态密码器验签</h1>
			<button id="nextButton" class="nav_right_btn" onclick="ICBCPageTools.submitForm({'formName':'next'});">确定</button>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<form name="next" method="post" action="<%=postUrl%>">
			<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
			<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
			<input type="hidden" name="url" value="/KTCard/chargeResult.jsp" />
			<input type="hidden" id="stk_name" name="stk_name" value="<%=request.getParameter("stk_name")%>" />
			<input type="hidden" id="stk_cardNo" name="stk_cardNo" value="<%=request.getParameter("stk_cardNo")%>" />
			<input type="hidden" id="stk_balance" name="stk_balance" value="<%=request.getParameter("stk_balance")%>" />
			<input type="hidden" id="stk_chargeAmt" name="stk_chargeAmt" value="<%=request.getParameter("stk_chargeAmt")%>" />
			<input type="hidden" id="stk_chargeAmtHex" name="stk_chargeAmtHex" value="<%=request.getParameter("stk_chargeAmtHex")%>"/>
			<input type="hidden" id="stk_debitCardno" name="stk_debitCardno" value="<%=request.getParameter("stk_debitCardno")%>" />
			<input type="hidden" id="stk_mode" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
			<section class="section_padding">
				<h2 class="section_title">密码器密码验签</h2>
					<ul class="cell_container">
						<li>
							<div class="certpass_txt">
								<div>请在“工银电子密码器”中输入下图大号字体数字（如有小数点请一并输入）</div>
								<img src="<%=tokenImg%>"/>
								<div>上图内容包括账号中随机抽取的6位数字和金额，请仔细核对。</div>
								<div>请按工银电子密码器的“确认”键获取动态密码。</div>
							</div>
						</li>
						<li>
							<div class="cell_li_left">动态密码</div>
							<div class="cell_li_right"><input name="enc_cert_pass2" type="password" size="6" placeholder="请输入" maxlength="6" /></div>
						</li>
					</ul>
			</section>
			
			</form>
		</div>
	</div>
	<footer></footer>
</body>
</html>