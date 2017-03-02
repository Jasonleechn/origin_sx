<%@page import="java.util.ArrayList"%>
<%@ include file="/includes/contentType_client.jsp"%>
<%@ page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/includes/resources_client.jsp"%>
<script type="text/javascript" src="<%=contextPath%>/ebdpui/common/js/icbc_specialcard_conformity_tools.js"></script>
<%
	ArrayList regCards=(ArrayList)MySessionContext.getSession(c_sessionId).getAttribute("CRegCards");
	request.setCharacterEncoding("UTF-8");
	String mainAreaCode=(String)MySessionContext.getSession(c_sessionId).getAttribute("mainAreaCode");
	String custName = (String)MySessionContext.getSession(c_sessionId).getAttribute("CNcustName");
	String custAuthenType=(String)MySessionContext.getSession(c_sessionId).getAttribute("custAuthenType");
%>
<script type="text/javascript">
var name = "<%=request.getParameter("stk_name")%>";
var cardNo = "<%=request.getParameter("stk_cardNo")%>";
var balance = "<%=request.getParameter("stk_balance")%>";
var chargeAmt = ""; //充值金额
var chargeAmtHex = "";//充值金额十六进制
var debitCardno = "";  //借方银行卡号
var custName = "<%=custName%>";      //手机银行客户姓名
var custArea = "<%=mainAreaCode%>";  //手机银行客户地区号
var authType = "<%=custAuthenType%>";
var amtLimit = 0;

function getSingleLimit(){
	var ret = "";
	var tag = custArea+"地区,"+custName+"用户";
	tag = encodeURI(tag);
	ICBCSpecialCardTools.nativeShowIndicator();
	$.ajaxSetup({
		async:false});
	$.post("<%=urlHead%>/STCard/DataHandler",
			{"type":"getSingleLimit","tag":tag},
			function(data, textStatus){
				ICBCSpecialCardTools.nativeHideIndicator();
				if(data.retCode == "0") {
					ret = data.retInfo;
					//alert(ret);
				} else {
					errMsg = data.retMsg;
					//alert(data.retMsg);
				}
			},"json");
	return ret;
}

//检查金额和卡号
function checkInput(){
	//chargeAmt = amount.$input.val();
	chargeAmt = $('#amount').val();
	debitCardno = jQuery("#cardlist").find("option:selected").text();

	if(name == null || name == ""){
		//alert("获取苏通卡姓名失败！");
		//return false;
	}
	if(cardNo == null || cardNo == ""){
		//alert("获取苏通卡卡号失败！");
		//return false;
	}
	if(balance == null || balance == ""){
		//alert("获取苏通卡余额失败！");
		//return false;
	}
	
	if(chargeAmt == null || chargeAmt == ""){
		alert("充值金额输入为空！");
		return false;
	}
	if(debitCardno == null || debitCardno == ""){
		alert("卡号输入为空！");
		return false;
	}
	
	if(chargeAmt.indexOf(".") < 0) {
		if(parseInt(chargeAmt) == 0){
			alert("充值金额不能为0！");
			return false;
		}
		if(chargeAmt.length > 1 && chargeAmt.charAt(0) == "0"){
			alert("金额输入错误！");
			return false;
		}
		chargeAmt = chargeAmt+ "00";  //增加金额的角和分
	}else if(chargeAmt.indexOf(".") == 0){
		alert("金额输入错误，不能以 点号开头！");
		return false;
	}else{
		var amt1 = chargeAmt.substring(0, chargeAmt.indexOf("."));
		var amt2 = chargeAmt.substring(chargeAmt.indexOf(".")+1, chargeAmt.length);
		//jQuery('#stepDetail').append("<div><p style='color:red'>amt1:"+amt1+"<p>amt2:"+amt2+"</div>");
		
		if(amt1.length > 1 && amt1.charAt(0) == "0"){
			alert("金额输入错误！");
			return false;
		}
		if(amt1 == "0"){
			if(parseInt(amt2) == 0){
				alert("充值金额不能为0！");
				return false;
			}
			amt1 = "";
		}
		if(amt2.length == 1){	
			chargeAmt = amt1 + amt2 + "0";
		} else if(amt2.length == 2){
			if(amt1 == "" && amt2.charAt(0) == "0")
				amt2 = amt2.charAt(1);
			chargeAmt = amt1 + amt2;
		} else{
			alert("金额输入错误，最小单位为分！");
			return false;
		}
	}
	for(var i=0; i<chargeAmt.length; i++){
		if("0123456789".indexOf(chargeAmt.charAt(i)) < 0){
			alert("金额输入错误，不全为数字！");
			return false;
		}
	}
	
	var chargeAmtInt = parseInt(chargeAmt);
	chargeAmtHex = chargeAmtInt.toString(16);
	var amountACInt = parseInt(balance) + chargeAmtInt;
	var amountACHex = amountACInt.toString(16);

	var limitamount = getSingleLimit();
	if(limitamount != ""){
		amtLimit = parseInt(limitamount+"00");
	}else{
		amtLimit = 200000;
		limitamount = 2000;
	}
	
	if(chargeAmtInt > amtLimit || chargeAmtHex.length > 6){
		alert("输入金额超过单笔限额"+limitamount+"元！");
		return false;
	}
	
	if(amountACHex.length > 6){
		alert("输入金额过大，充值后金额将超过最大值！");
		return false;
	}
	
	var len = chargeAmtHex.length;
	if(len < 8){
		var tmp = 8 - len;
		for(var j=0; j< tmp; j++){
			chargeAmtHex = "0" + chargeAmtHex;
		}
	}
	chargeAmtHex = chargeAmtHex.toUpperCase();
	
	return true;
}

function certpassword(){
	//var amt = amount.$input.val();
	//var cardno =  jQuery("#cardlist").find("option:selected").text();
	
	if(authType == "2"){
		jQuery("#stk_name1").val(name);
		jQuery("#stk_cardNo1").val(cardNo);
		jQuery("#stk_balance1").val(balance);
		jQuery("#stk_chargeAmt1").val(chargeAmt);
		jQuery("#stk_chargeAmtHex1").val(chargeAmtHex);
		jQuery("#stk_debitCardno1").val(debitCardno);
		ICBCPageTools.submitForm({'formName':'dynapass'});
	}else if(authType == "3"){
		jQuery("#stk_name2").val(name);
		jQuery("#stk_cardNo2").val(cardNo);
		jQuery("#stk_balance2").val(balance);
		jQuery("#stk_chargeAmt2").val(chargeAmt);
		jQuery("#stk_chargeAmtHex2").val(chargeAmtHex);
		jQuery("#stk_debitCardno2").val(debitCardno);
		ICBCPageTools.submitForm({'formName':'ukeypass'});
	}else if(authType == "4"){
		jQuery("#stk_name").val(name);
		jQuery("#stk_cardNo").val(cardNo);
		jQuery("#stk_balance").val(balance);
		jQuery("#stk_chargeAmt").val(chargeAmt);
		jQuery("#stk_chargeAmtHex").val(chargeAmtHex);
		jQuery("#stk_debitCardno").val(debitCardno);
		var token = "{$1|6|"+chargeAmt+"|"+debitCardno+"$}";
		jQuery("#token").val(token);
		ICBCPageTools.submitForm({'formName':'certpass'});
	} else {
		alert("认证类型错误！");
	}
}

function execute(){
	//connMaps("84358");
	if(checkInput()){
		certpassword();
	}
}
</script>
</head>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">取消</button>
			<a id="returnLink" class="hide" href="<%=urlHead%>/STCard/stcmain.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">苏通卡充值</h1>
			<button class="nav_right_btn" onclick="execute()">确定</button>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">		
			<section class="section_padding">
				<h2 class="section_title">充值提示信息</h2>
				<ul class="cell_container">
					<li><!-- 若首行缩进class加入indent_txt -->
						<div class="cell_li_left">
						<div class="cell_li_txt">请选择转出卡号并输入充值金额，点击右上角确定按钮进入认证介质验密页面。在充值过程中请勿移动苏通卡，并耐心等待充值结果页面，否则可能会导致充值失败！</div>
						<div id="stepDetail"></div>
						</div>
					</li>		
				</ul>
			</section>
			
			<section class="section_padding">
				<h2 class="section_title">充值基本信息</h2>
				<ul class="cell_container">
					<li>
						<div class="cell_li_left">请选择转出卡号</div>
						<div class="cell_li_right">
							<select id="cardlist" style="font-size:10pt;">
							<%for(int i=0; i<regCards.size();i++){ %>
								<option value=<%=i%>><%=regCards.get(i)%></option>
							<%}%>
							</select>
						</div>
					</li>
					<li>
						<div class="cell_li_left">请输入充值金额(单位：元)</div>
						<div class="cell_li_right">
							<!-- placeholder是占位符，如果是必输项，请填写“请输入”，如果是选输，请填写“可选择输入”。value是输入域的默认值-->
							<input type="text" id="amount" name="input1" value="" placeholder="请输入" maxlength="10" size="10"/>
						</div>
					</li>
				</ul>
			</section>
			<form name="certpass" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" id="token" name="z2f_GenerateTokenMessage" value="{$1|6|12345|6222020200000000000$}" />
				<input type="hidden" name="url" value="/STCard/certpassword.jsp" />
				<input type="hidden" id="stk_name" name="stk_name" value="" />
				<input type="hidden" id="stk_cardNo" name="stk_cardNo" value="" />
				<input type="hidden" id="stk_balance" name="stk_balance" value="" />
				<input type="hidden" id="stk_chargeAmt" name="stk_chargeAmt" value="" />
				<input type="hidden" id="stk_chargeAmtHex" name="stk_chargeAmtHex" value="" />
				<input type="hidden" id="stk_debitCardno" name="stk_debitCardno" value="" />
				<input type="hidden" id="stk_mode" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
			</form>
			<form name="ukeypass" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" name="url" value="/STCard/ukeypassword.jsp" />
				<input type="hidden" id="stk_name2" name="stk_name" value="" />
				<input type="hidden" id="stk_cardNo2" name="stk_cardNo" value="" />
				<input type="hidden" id="stk_balance2" name="stk_balance" value="" />
				<input type="hidden" id="stk_chargeAmt2" name="stk_chargeAmt" value="" />
				<input type="hidden" id="stk_chargeAmtHex2" name="stk_chargeAmtHex" value="" />
				<input type="hidden" id="stk_debitCardno2" name="stk_debitCardno" value="" />
				<input type="hidden" id="stk_mode2" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
			</form>
			<form name="dynapass" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" name="ic2f_DynaPwdReqFmt" value="{$ic2f_DynaPwdReqFmt$}" />
				<input type="hidden" name="url" value="/STCard/dynapassword.jsp" />
				<input type="hidden" id="stk_name1" name="stk_name" value="" />
				<input type="hidden" id="stk_cardNo1" name="stk_cardNo" value="" />
				<input type="hidden" id="stk_balance1" name="stk_balance" value="" />
				<input type="hidden" id="stk_chargeAmt1" name="stk_chargeAmt" value="" />
				<input type="hidden" id="stk_chargeAmtHex1" name="stk_chargeAmtHex" value="" />
				<input type="hidden" id="stk_debitCardno1" name="stk_debitCardno" value="" />
				<input type="hidden" id="stk_mode1" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
			</form>
		</div>
	</div>
	<footer>
	</footer>
</body>
</html>