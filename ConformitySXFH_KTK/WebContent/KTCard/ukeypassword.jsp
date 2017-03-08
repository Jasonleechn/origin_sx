<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/includes/resources_client.jsp"%>
</head>
<%
	//赋值U盾验签标志位
	response.addHeader("UKeySignFlag", "true");
	//屏显信息
	response.addHeader("UKeyDisplayOnScreenSignDataInfo", URLEncoder.encode("<?xml  version=\"1.0\" encoding=\"GBK\" ?><TradeData><field name=\"扣款卡号\" value=\""+request.getParameter("stk_debitCardno")+"\" DisplayOnScreen=\"TRUE\"/><field name=\"充值金额\" value=\""+Double.parseDouble(request.getParameter("stk_chargeAmt"))/100+"元\" DisplayOnScreen=\"TRUE\"/></TradeData>","UTF-8"));
	//key显信息
	response.addHeader("UKeyDisplayOnKeySignDataInfo", URLEncoder.encode("请确认扣款卡号："+request.getParameter("stk_debitCardno")+" 充值金额："+Double.parseDouble(request.getParameter("stk_chargeAmt"))/100+"元（工商银行）","UTF-8"));
	//客户端签名后放入U盾验签要素的表单名
	response.addHeader("UKeySignFormName", "confirm");
%>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">取消</button>
			<a id="returnLink" class="hide" href="<%=urlHead%>/KTCard/ktcmain.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">U盾验签</h1>
			<!-- 此处必须提交此方法 -->
			<button id="nextButton" class="nav_right_btn" onclick="UKeyVerifyConfirm()">确定</button>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<form name="confirm" method="post" action="<%=postUrl%>">
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
					<h2 class="section_title">请确认如下信息</h2>
					<ul class="cell_container">
						<li>
							<table class="detail_table">
								<tr>
									<td class="detail_td_left">扣款卡号:</td>
									<td class="detail_td_right"><%=request.getParameter("stk_debitCardno")%></td>
								</tr>
								<tr>
									<td class="detail_td_left">充值金额（元）:</td>
									<td class="detail_td_right"><%=Double.parseDouble(request.getParameter("stk_chargeAmt"))/100%></td>
								</tr>
							</table>					
						</li>
					</ul>
				</section>			
			</form>
		</div>
	</div>
	<footer></footer>
</body>
</html>