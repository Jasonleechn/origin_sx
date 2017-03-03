<%@page import="java.io.ByteArrayInputStream"%>
<%@page import="org.dom4j.*"%>
<%@page import="org.dom4j.io.*"%>
<%@ page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="/includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/includes/resources_client.jsp"%>
</head>
<%
	String DynaPwdReqFmt="";
	if(MySessionContext.Mode==MySessionContext.ModeType.Normal){
		DynaPwdReqFmt = request.getParameter("ic2f_DynaPwdReqFmt");
		DynaPwdReqFmt=new String(DynaPwdReqFmt.getBytes("ISO-8859-1"),"GBK");
	}else{
		DynaPwdReqFmt = "<?xml  version=\"1.0\" encoding=\"GBK\" standalone=\"no\" ?><ICBCData><dynaPasswdReq>A1|A2</dynaPasswdReq><dynaPassMaxLength>6</dynaPassMaxLength><displayMsgFlag>0</displayMsgFlag><displayMsg></displayMsg></ICBCData>";
	}
	SAXReader reader = new SAXReader();
	ByteArrayInputStream stream=new ByteArrayInputStream(DynaPwdReqFmt.getBytes());
	Document document = reader.read(stream);
	Element root = document.getRootElement();
	String dynaPasswdReq = root.element("dynaPasswdReq").getText();
	String dynaPassMaxLength = root.element("dynaPassMaxLength").getText();
	String displayMsgFlag = root.element("displayMsgFlag").getText();
	String displayMsg = root.element("displayMsg").getText();
	String randomId = request.getParameter("z2f_VerifyCodeRandomId");
%>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">取消</button>
			<a id="returnLink" class="hide" href="<%=urlHead%>/KTCard/stcmain.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">口令卡验签</h1>
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
					<h2 class="section_title">口令卡密码验签</h2>
					<ul class="cell_container">
						<li>
							<div class="cell_li_left">
								<div>口令卡密码<img src="<%=dynaPwdImg%><%=dynaPasswdReq%>"/></div>
							</div>
							<div class="cell_li_right"><input size="15" placeholder="请输入坐标值密码" name="enc_dyn_pass" type="password" maxlength="<%=dynaPassMaxLength%>" /></div>
						</li>
						<%if (displayMsgFlag.equals("1")) {%>
						<li>
							<div class="cell_li_txt small_txt"><%=displayMsg%></div>
						</li>
						<%}	%>
					</ul>
				</section>			
			</form>
		</div>
	</div>
	<footer></footer>
</body>
</html>