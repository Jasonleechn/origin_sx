<%@ include file="/includes/contentType_client.jsp"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/includes/resources_client.jsp"%>
<script type="text/javascript" src="<%=contextPath%>/ebdpui/common/js/icbc_specialcard_conformity_tools.js"></script>
<%
	request.setCharacterEncoding("UTF-8");
	String passtag=request.getParameter("passtag");
	String tranErrCode=request.getParameter("z2f_tranErrCode");
	String tranErrDispMsg=request.getParameter("z2f_tranErrDispMsg");
	//if(tranErrDispMsg!=null){
	//	tranErrDispMsg=new String(tranErrDispMsg.getBytes("ISO-8859-1"),"GBK");
	//}
	String mainAreaCode=(String)MySessionContext.getSession(c_sessionId).getAttribute("mainAreaCode");
	String custName = (String)MySessionContext.getSession(c_sessionId).getAttribute("CNcustName");
	String custAuthenType=(String)MySessionContext.getSession(c_sessionId).getAttribute("custAuthenType");
%>
<script type="text/javascript">
//jQuery(document).ready(function(){
jQuery(window).load(function(){
 	var passOK = "<%=passtag%>";
 	if(passOK == "0"){
 		//jQuery('#success').show();
		//jQuery('#failure').hide();
		//jQuery('#returnButton1').attr("disabled",true);
		jQuery('#returnButton1').hide();
		execute();	
 	}else{
 		jQuery('#success').hide();
		jQuery('#failure').show();
		jQuery('#errorCode').html('<%=tranErrCode %>');
		jQuery('#errorMsg').html('<%=tranErrDispMsg %>');
		
		var custType = "<%=custAuthenType%>"; 
		if(custType == "4"){
			var chargeAmt1 = "<%=request.getParameter("stk_chargeAmt")%>"; //充值金额
			var debitCardno1 = "<%=request.getParameter("stk_debitCardno")%>";
			var token = "{$1|6|"+chargeAmt1+"|"+debitCardno1+"$}";
			jQuery("#token").val(token);
		}	
		jQuery('#returnButton1').show();
		//jQuery('#returnButton1').attr("disabled",false);
 	}
});

var name = "<%=request.getParameter("stk_name")%>";
var cardNo = "<%=request.getParameter("stk_cardNo")%>";
var balance = "<%=request.getParameter("stk_balance")%>";
var chargeAmt = "<%=request.getParameter("stk_chargeAmt")%>"; 
var chargeAmtHex = "<%=request.getParameter("stk_chargeAmtHex")%>";
var debitCardno = "<%=request.getParameter("stk_debitCardno")%>";
var stk_mode = "<%=request.getParameter("stk_mode")%>"; //20150522
var random = "";      //随机数
var serNo = "";       //卡内交易序号
var mac= "";          //卡片MAC
var mac_key = "";     //中间业务平台返回圈存MAC结果
var RemassAMTHEX = "";//卡片余额十六进制
var byInfo = "";	  //卡片余额
var amountACInt = ""; //充值后金额整数
var transtime = "";   //交易时间
var custName = "<%=custName%>";     //手机银行客户姓名
var custArea = "<%=mainAreaCode%>"; //手机银行客户地区号
var errMsg = "";      //错误信息
var errCmd ="";       //出错时执行的指令
var serialNo = "";    //交易流水号

function execute(){
	if(checkData())
		start();
	else{
		jQuery('#failure').show();
		jQuery('#errorCode').html("-1");
		jQuery('#errorMsg').html("数据检查失败！");
	}
		
}

function checkData(){

	if(name == null || name == ""){
		alert("获取苏通卡姓名失败！");
		return false;
	}
	if(cardNo == null || cardNo == ""){
		alert("获取苏通卡卡号失败！");
		return false;
	}
	if(balance == null || balance == ""){
		alert("获取苏通卡余额失败！");
		return false;
	}
	
	if(chargeAmt == null || chargeAmt == ""){
		alert("获取充值金额失败！");
		return false;
	}
	if(chargeAmtHex == null || chargeAmtHex == ""){
		alert("获取充值金额十六进制表示失败！");
		return false;
	}
	if(debitCardno == null || debitCardno == ""){
		alert("获取借方卡号失败！");
		return false;
	}

	if(custArea == null || custArea =="null" || custArea == ""){
		custArea = "4301";
	}
	if(stk_mode == null || stk_mode == ""){
		stk_mode = "dovila";
	}
	if(stk_mode != "dovila" && stk_mode != "nfc"){
		stk_mode = "dovila";
	}
	return true;
}

function start(){
	try{
		//jQuery('#stepDetail').empty();
		//启动服务
		ICBCSpecialCardTools.startConformityTransmit({
			'deviceType':stk_mode,
			'callBack':function(){
			//开始异步执行指令
			executeTransmit({'msgFlag':'2','msgBuf':'RESET','step':1});
			}
		});
		
	}catch(e){
		console.log("Error: " + e);
	}
}

function getNetNo(){
	//strNetno = BraceString.leftFillZero(allGlobalVar.G_ZONENO, 6) + BraceString.leftFillZero(allGlobalVar.G_BRNO, 6);
	var areaNo = custArea;
	var len = areaNo.length;
	if(len <= 6){
		var tmp = 6 - len;
		for(var j=0; j< tmp; j++){
			areaNo = "0" + areaNo;
		}
	}else{
		areaNo = "004301";
		custArea = "4301";
	}
	var strNetno = areaNo + "005588";
	return strNetno;
}

function getDateTime(){
	var d = new Date();
	var res ="";
	res = d.getFullYear() +"";

	var month = d.getMonth()+ 1;
	var month1 = month + "";
	if(month1.length == 1)
		month1 = "0" + month1;
	res = res + month1 +"";

	var day = d.getDate()+"";
	if(day.length == 1)
		day = "0" + day;
	res = res + day + "";
	
	var hour = d.getHours()+"";
	if(hour.length == 1)
		hour = "0" + hour;
	res = res + hour + "";
	
	var minute = d.getMinutes()+"";
	if(minute.length == 1)
		minute = "0" + minute;
	res = res + minute + "";
	
	var second = d.getSeconds()+"";
	if(second.length == 1)
		second = "0" + second;
	res = res + second;
	return res;
}

function executeTransmit(param){
	ICBCSpecialCardTools.executeConformityTransmit({
		'msgFlag':param.msgFlag,
		'msgBuf':param.msgBuf,
		'step':param.step,
		'callBack':stepCallBack
	});
}

function sendErrMsg(str1, str2){
	var msg = "苏通卡充值异常--"+getDateTime()+"--"+str1+"--"+str2;
	msg = encodeURI(msg);
	var tag = custArea+"地区,"+custName+"用户";
	tag = encodeURI(tag);
	$.ajaxSetup({
		async:false});
	$.post("<%=urlHead%>/STCard/DataHandler",
			{"type":"sendErrMsg","param":msg,"tag":tag},
			function(data, textStatus){
				if(data.retCode == "0") {			
					//alert("异常信息日志上传成功！");
				} else {
					//alert("异常信息日志上传失败！");
				}
			},"json");
}

function connMaps(transCode){
	var ret = -1;
	var tag = custArea+"地区,"+custName+"用户";
	tag = encodeURI(tag);
	ICBCSpecialCardTools.nativeShowIndicator();
	//var str = "";
	$.ajaxSetup({
		async:false});
	if(transCode == "84358"){
		transtime = getDateTime();
		//name = decodeURI(name);
		var str = debitCardno+"|"+cardNo+"|"+chargeAmt+"|"+chargeAmtHex+"|"+balance+"|"+serNo+"|"+getNetNo()+"|"+random+"|"+name+"|"+mac+"|";
		$.post("<%=urlHead%>/STCard/ConnectMaps",
				{"transCode":transCode,"param":str,"transTime":transtime,"tag":tag},
				function(data, textStatus){
					ICBCSpecialCardTools.nativeHideIndicator();
					if(data.retCode == "0") {
						ret = 0;
						mac_key = data.mackey;
						serialNo = data.serno;				
					} else {
						ret = -1;
						errMsg = data.retMsg;			
					}
				},"json");
	}
	if(transCode == "82148"){
		transtime = getDateTime();
		var str1 = cardNo+"|"+serialNo+"|"+mac+"|";
		$.post("<%=urlHead%>/STCard/ConnectMaps",
				{"transCode":transCode,"param":str1,"transTime":transtime,"areaNo":custArea,"tag":tag},
				function(data, textStatus){
					ICBCSpecialCardTools.nativeHideIndicator();
					if(data.retCode == "0") {
						ret = 0;
					} else {
						ret = -1;
						errMsg = data.retMsg;
						//alert(data.retMsg);						
					}
				},"json");
	}
	if(transCode == "84420"){
		transtime = getDateTime();
		var str2 = debitCardno+"|"+cardNo+"|"+chargeAmt+"|"+serialNo+"|";
		$.post("<%=urlHead%>/STCard/ConnectMaps",
				{"transCode":transCode,"param":str2,"transTime":transtime,"areaNo":custArea,"tag":tag},
				function(data, textStatus){
					ICBCSpecialCardTools.nativeHideIndicator();
					if(data.retCode == "0") {
						ret = 0;
						//alert("自动冲正成功！");
					} else {
						ret = -1;
						errMsg = data.retMsg;
						//alert(data.retMsg);						
					}
				},"json");
	}
	return ret;
}

function stepCallBack(callBackResult){
	try{
		if(callBackResult!=undefined){
			if (callBackResult.cardErrorCode != undefined) {
				//结束服务
				ICBCSpecialCardTools.endConformityTransmit();
			}else{
				var resultString=callBackResult.result;		
				
				if(callBackResult.step==1){
					//选择应用
					executeTransmit({'msgFlag':'1','msgBuf':'00a40000021001','step':2});
				}else if(callBackResult.step==2){					
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000"){
						//alert("选择苏通卡应用失败，请确认卡片是否为苏通卡！");					
						jQuery('#failure').show();
						jQuery('#errorCode').html("-101");
						jQuery('#errorMsg').html("选择苏通卡应用失败，请确认卡片是否为苏通卡！");
						sendErrMsg("选择应用失败，指令：00a40000021001", resultString);
						ICBCSpecialCardTools.endConformityTransmit();
                	}else{
                		//校验Pin
                		executeTransmit({'msgFlag':'1','msgBuf':'0020000003888888','step':3});
                	}
				}else if(callBackResult.step==3){
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		         	{	            
		             	jQuery('#failure').show();
		             	jQuery('#errorCode').html("-102");
						jQuery('#errorMsg').html("PIN校验失败，苏通卡充值失败！");
						sendErrMsg("PIN校验失败，指令：0020000003888888", resultString);
		             	ICBCSpecialCardTools.endConformityTransmit();
		        	}else {
			         	//执行圈存预处理 		 
			         	var strCmd = "805000020B01" + chargeAmtHex + getNetNo();
			         	 errCmd = strCmd;
			         	//jQuery('#stepDetail').append("<div><p style='color:red'>圈存预处理指令:"+strCmd+"</div>");
					 	executeTransmit({'msgFlag':'1','msgBuf':strCmd,'step':4});
		         	}
				}else if(callBackResult.step==4){
					if(resultString==null || resultString==""|| resultString.substr(resultString.length-4) != "9000")
		         	{		             	
		             	//alert("执行圈存预处理异常，苏通卡充值失败！");	            	
		             	jQuery('#failure').show();
		             	jQuery('#errorCode').html("-103");
						jQuery('#errorMsg').html("执行圈存预处理异常，苏通卡充值失败！");
						sendErrMsg("执行圈存预处理失败，指令："+errCmd, resultString);
		             	ICBCSpecialCardTools.endConformityTransmit();
		        	}else {
		        		if(resultString.substring(0, 2) == "61"){
		        			var strCmd1 = "00C00000" + resultString.substring(2, 4);
		        			//读取圈存预处理后续数据指令
		        			errCmd = strCmd1;
		        			executeTransmit({'msgFlag':'1','msgBuf':strCmd1,'step':5});
		        		} else {
		        			random = resultString.substring(16, 24).toUpperCase();
			        		serNo = resultString.substring(8, 12).toUpperCase();
			        		mac = resultString.substring(24, 32).toUpperCase();
			      
			        		var ret = connMaps("84358");
			        		if(ret != 0){
				        		//alert(errMsg);
			        			jQuery('#failure').show();
			        			jQuery('#errorCode').html("-104");
								jQuery('#errorMsg').html(errMsg+",苏通卡充值失败！");
								//sendErrMsg("中间业务平台交易异常，交易代码84358", errMsg);
				             	ICBCSpecialCardTools.endConformityTransmit();
			        		}else{
				        		if(mac_key == null || mac_key == "" || mac_key == "null"){
				        			//alert("取充值密钥失败,将自动冲正！");		          
					             	jQuery('#failure').show();
					             	jQuery('#errorCode').html("-110");
					             	var ret4 = connMaps("84420");
					             	if(ret4 == 0){
										jQuery('#errorMsg').html("取充值密钥失败,自动冲正成功！");
										//sendErrMsg("取充值密钥失败，自动冲正成功", mac_key);
					             	}
					             	else{
					             		jQuery('#errorMsg').html("取充值密钥失败，自动冲正失败！");
					             		//sendErrMsg("取充值密钥失败，自动冲正失败", errMsg);
					             	}
					             	ICBCSpecialCardTools.endConformityTransmit();
				        		}else{
				        			//圈存写卡指令  
					         		var strCmd2 = "805200000B" + transtime + mac_key;
					         		//var strCmd2 = "805200000B" + getDateTime() + mac_key;
					         		errCmd = strCmd2;
					         		//jQuery('#stepDetail').append("<div><p style='color:red'>圈存写卡指令:"+strCmd2+"</div>");				  
							 		executeTransmit({'msgFlag':'1','msgBuf':strCmd2,'step':6});
				        		}			         		
			        		}
		        		}		        		
		         	}
				}else if(callBackResult.step==5){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		         	{
		             	//alert("执行圈存预处理异常，苏通卡充值失败！");
		             	jQuery('#failure').show();
		             	jQuery('#errorCode').html("-105");
						jQuery('#errorMsg').html("执行圈存预处理异常，苏通卡充值失败！");
						sendErrMsg("读取圈存预处理后续数据失败，指令："+errCmd, resultString);
		             	ICBCSpecialCardTools.endConformityTransmit();
		        	}else {
		        		random = resultString.substring(16, 24).toUpperCase();
		        		serNo = resultString.substring(8, 12).toUpperCase();
		        		mac = resultString.substring(24, 32).toUpperCase();
		        		var ret1 = connMaps("84358");
		        		if(ret1 != 0){
		        			//alert(errMsg);
		        			jQuery('#failure').show();
		        			jQuery('#errorCode').html("-104");
							jQuery('#errorMsg').html(errMsg+",苏通卡充值失败！");
							//sendErrMsg("中间业务平台交易异常，交易代码84358", errMsg);
			             	ICBCSpecialCardTools.endConformityTransmit();
		        		}else{
		        			if(mac_key == null || mac_key == "" || mac_key == "null"){
			        			//alert("取充值密钥失败,将自动冲正！");		          
				             	jQuery('#failure').show();
				             	jQuery('#errorCode').html("-110");
				             	var ret5 = connMaps("84420");
				             	if(ret5 == 0){
									jQuery('#errorMsg').html("取充值密钥失败,自动冲正成功！");
									//sendErrMsg("取充值密钥失败，自动冲正成功", mac_key);
				             	}
				             	else{
				             		jQuery('#errorMsg').html("取充值密钥失败，自动冲正失败！");
				             		//sendErrMsg("取充值密钥失败，自动冲正失败", errMsg);
				             	}
				             	ICBCSpecialCardTools.endConformityTransmit();
			        		}else{
			        			//圈存写卡指令  
				         		var strCmd3 = "805200000B" + transtime + mac_key;
				         		//var strCmd3 = "805200000B" + getDateTime() + mac_key;
				         		errCmd = strCmd3;
				         		//jQuery('#stepDetail').append("<div><p style='color:red'>圈存写卡指令:"+strCmd3+"</div>");				  
						 		executeTransmit({'msgFlag':'1','msgBuf':strCmd3,'step':6});
			        		}		
		        		}
		         	}
				}else if(callBackResult.step==6){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");        		
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		         	{
		             	//alert("苏通卡充值写卡失败,将自动冲正！");		          
		             	jQuery('#failure').show();
		             	jQuery('#errorCode').html("-106");
		             	var ret2 = connMaps("84420");
		             	if(ret2 == 0){
							jQuery('#errorMsg').html("苏通卡充值写卡失败,自动冲正成功！");
							//sendErrMsg("苏通卡充值写卡失败，自动冲正成功，指令："+errCmd, resultString);
		             	}
		             	else{
		             		jQuery('#errorMsg').html("苏通卡充值写卡失败，自动冲正失败！");
		             		//sendErrMsg("苏通卡充值写卡失败，自动冲正失败，指令："+errCmd, resultString);
		             	}
						
		             	ICBCSpecialCardTools.endConformityTransmit();
		        	}else {
		        		if(resultString.substring(0, 2) == "61"){
		        			var strCmd4 = "00C00000" + resultString.substring(2, 4);
		        			errCmd = strCmd4;
		        			//读取写卡返回后续数据
		        			executeTransmit({'msgFlag':'1','msgBuf':strCmd4,'step':7});
		        		} else {
			        		//写卡后重新查询余额
		        			executeTransmit({'msgFlag':'1','msgBuf':'805C000204','step':8});      			 
		        		}		        		
		         	}
				}else if(callBackResult.step==7){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		         	{	             	
		             	//alert("苏通卡充值写卡失败,将自动冲正！");		          
		             	jQuery('#failure').show();		  
		             	jQuery('#errorCode').html("-106");
		             	var ret3 = connMaps("84420");
		             	if(ret3 == 0){
							jQuery('#errorMsg').html("苏通卡充值写卡失败,自动冲正成功！");
							//sendErrMsg("苏通卡充值写卡失败，自动冲正成功，指令："+errCmd, resultString);
		             	}
		             	else{
		             		jQuery('#errorMsg').html("苏通卡充值写卡失败，自动冲正失败！");
		             		//sendErrMsg("苏通卡充值写卡失败，自动冲正失败，指令："+errCmd, resultString);
		             	}
						
		             	ICBCSpecialCardTools.endConformityTransmit();
		        	}else {
		        		//写卡后重新查询余额
		        		executeTransmit({'msgFlag':'1','msgBuf':'805C000204','step':8});
		         	}
				}else if(callBackResult.step==8){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		         	{
						//alert("充值后重新读取余额文件异常！");		            	
		             	jQuery('#failure').show();
						jQuery('#errorCode').html("-107");
						jQuery('#errorMsg').html("您已充值写卡成功，但充值后重新读取余额文件异常，请重新查询余额确认充值结果是否正确！");
						//jQuery("#prev_url").val("/STCard/readCardInfo.jsp");	//20131203 增加返回上页功能
						sendErrMsg("充值后重新读取余额文件失败，指令：805C000204", resultString);
		             	ICBCSpecialCardTools.endConformityTransmit();
		        	}else {	        
		        		RemassAMTHEX = resultString.substring(2, 8);
			            byInfo = parseInt(RemassAMTHEX, 16)+"";
			           
			            if(resultString.substring(0, 2) == "61"){
				            var strCmd5 = "00C00000" + byInfo.substring(2, 4);
				            errCmd = strCmd5;
				            //读取后续数据
			            	executeTransmit({'msgFlag':'1','msgBuf':strCmd5,'step':9});
			            }else{
			            	amountACInt = parseInt(balance) + parseInt(chargeAmt);
				            if(parseInt(byInfo) == amountACInt){
			            		executeTransmit({'msgFlag':'2','msgBuf':'RELEASE','step':10});
				            }else{
				            	//alert("充值后余额不一致！");
				             	jQuery('#failure').show();
				             	jQuery('#errorCode').html("-109");
								jQuery('#errorMsg').html("充值后余额不一致，请重新查询余额确认充值结果是否正确！");
								//jQuery("#prev_url").val("/STCard/readCardInfo.jsp");	//20131203 增加返回上页功能
								sendErrMsg("充值前后查询余额不一致", "充值前余额:"+parseInt(balance)+",充值金额："+parseInt(chargeAmt)+",充值后余额："+parseInt(byInfo));
				             	ICBCSpecialCardTools.endConformityTransmit();
				            }				            
			            }	
		         	}
				}else if(callBackResult.step==9){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		            {
						//alert("充值后读取余额文件后续数据异常！");           	
		            	jQuery('#failure').show();
		            	jQuery('#errorCode').html("-108");
						jQuery('#errorMsg').html("您已充值写卡成功，但充值后读取余额文件后续数据异常，请重新查询余额确认充值结果是否正确！");
						//jQuery("#prev_url").val("/STCard/readCardInfo.jsp");	//20131203 增加返回上页功能
						sendErrMsg("充值后读取余额文件后续数据失败，指令："+errCmd, resultString);
		            	ICBCSpecialCardTools.endConformityTransmit();	
		            }else{
		            	RemassAMTHEX = resultString.substring(2, 8);
		                byInfo = parseInt(RemassAMTHEX, 16)+"";
		                amountACInt = parseInt(balance) + parseInt(chargeAmt);
			            if(parseInt(byInfo) == amountACInt){
		            		executeTransmit({'msgFlag':'2','msgBuf':'RELEASE','step':10});
			            }else{
			            	//alert("充值后余额不一致！");
			             	jQuery('#failure').show();
			             	jQuery('#errorCode').html("-109");
							jQuery('#errorMsg').html("充值后余额不一致，请重新查询余额确认充值结果是否正确！");
							//jQuery("#prev_url").val("/STCard/readCardInfo.jsp");	//20131203 增加返回上页功能
							sendErrMsg("充值前后查询余额不一致", "充值前余额:"+parseInt(balance)+",充值金额："+parseInt(chargeAmt)+",充值后余额："+parseInt(byInfo));
			             	ICBCSpecialCardTools.endConformityTransmit();
			            }
		            }
				}else if(callBackResult.step==10){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>充值写卡成功！</div>");
					connMaps("82148");   //写卡成功后更新平台状态
					jQuery('#success').show();
					jQuery('#failure').hide();
					//alert("苏通卡充值成功！");
					//jQuery("#prev_url").val("/STCard/stcmain.jsp");	//20131203 增加返回上页功能				
					jQuery('#chargeAmtLabel').html(chargeAmt/100+"元");
					jQuery('#amountACLabel').html(amountACInt/100+"元");
					//结束服务
					ICBCSpecialCardTools.endConformityTransmit();
				}
			}
		}else{
			//结束服务
			ICBCSpecialCardTools.endConformityTransmit();
		}
	}catch(e){
		//结束服务
		ICBCSpecialCardTools.endConformityTransmit();
		console.log("Error: " + e);
	}
}
</script>
</head>

<body>
	<header>
		<nav>
			<h1 class="nav_title" id="nav_title">苏通卡充值结果</h1>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">

			<section id="success" class="section_padding" style="display: none">
				<div class="info_container">
					<h3 class="info_success"></h3>
					<ul>
						<li>
							<table class="detail_table">
								<tr>
									<td class="detail_td_left">您已成功充值金额：</td>
									<td id="chargeAmtLabel" class="detail_td_right"></td>
								</tr>
								<tr>
									<td class="detail_td_left">充值后余额：</td>
									<td id="amountACLabel" class="detail_td_right"></td>
								</tr>
							</table>
						</li>
					</ul>
				</div>
			</section>
			
			<section id="failure" class="section_padding" style="display: none">
				<div class="info_container">
					<h3 class="info_error"></h3>
					<ul>
						<li>
							<table class="detail_table">
								<tr>
									<td class="detail_td_left">信息代码</td>
									<td id="errorCode" class="detail_td_right"></td>
								</tr>
								<tr>
									<td class="detail_td_left">提示信息</td>
									<td id="errorMsg" class="detail_td_right"></td>
								</tr>
							</table>
						</li>
					</ul>
				</div>
			</section>
		</div>
	</div>
	<footer>
		<section class="section_padding">
			<div class="button_container" data-rowsize="1">
				<button id="returnButton1" class="normal_btn" onclick="ICBCPageTools.submitForm({'formName':'prev1'});">返回重新验签</button>
				<button id="returnButton" class="normal_btn" onclick="ICBCPageTools.submitForm({'formName':'sutongcard'});">返回主页</button>
			<%if(custAuthenType.equals("2")){ %>
           	 <form name="prev1" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" name="ic2f_DynaPwdReqFmt" value="{$ic2f_DynaPwdReqFmt$}" />
				<input type="hidden" name="url" value="/STCard/dynapassword.jsp" />
				<input type="hidden" id="stk_name" name="stk_name" value="<%=request.getParameter("stk_name")%>" />
				<input type="hidden" id="stk_cardNo" name="stk_cardNo" value="<%=request.getParameter("stk_cardNo")%>" />
				<input type="hidden" id="stk_balance" name="stk_balance" value="<%=request.getParameter("stk_balance")%>" />
				<input type="hidden" id="stk_chargeAmt" name="stk_chargeAmt" value="<%=request.getParameter("stk_chargeAmt")%>" />
				<input type="hidden" id="stk_chargeAmtHex" name="stk_chargeAmtHex" value="<%=request.getParameter("stk_chargeAmtHex")%>"/>
				<input type="hidden" id="stk_debitCardno" name="stk_debitCardno" value="<%=request.getParameter("stk_debitCardno")%>" />
				<input type="hidden" id="stk_mode" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
			</form>
			<%}else if(custAuthenType.equals("4")){ %>
			 <form name="prev1" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" id="token" name="z2f_GenerateTokenMessage" value="{$1|6|12345|6222020200000000000$}" />
				<input type="hidden" name="url" value="/STCard/certpassword.jsp" />
				<input type="hidden" id="stk_name" name="stk_name" value="<%=request.getParameter("stk_name")%>" />
				<input type="hidden" id="stk_cardNo" name="stk_cardNo" value="<%=request.getParameter("stk_cardNo")%>" />
				<input type="hidden" id="stk_balance" name="stk_balance" value="<%=request.getParameter("stk_balance")%>" />
				<input type="hidden" id="stk_chargeAmt" name="stk_chargeAmt" value="<%=request.getParameter("stk_chargeAmt")%>" />
				<input type="hidden" id="stk_chargeAmtHex" name="stk_chargeAmtHex" value="<%=request.getParameter("stk_chargeAmtHex")%>"/>
				<input type="hidden" id="stk_debitCardno" name="stk_debitCardno" value="<%=request.getParameter("stk_debitCardno")%>" />
				<input type="hidden" id="stk_mode" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
			</form>
			<%}else if(custAuthenType.equals("3")){ %>
			 <form name="prev1" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" name="url" value="/STCard/ukeypassword.jsp" />
				<input type="hidden" id="stk_name" name="stk_name" value="<%=request.getParameter("stk_name")%>" />
				<input type="hidden" id="stk_cardNo" name="stk_cardNo" value="<%=request.getParameter("stk_cardNo")%>" />
				<input type="hidden" id="stk_balance" name="stk_balance" value="<%=request.getParameter("stk_balance")%>" />
				<input type="hidden" id="stk_chargeAmt" name="stk_chargeAmt" value="<%=request.getParameter("stk_chargeAmt")%>" />
				<input type="hidden" id="stk_chargeAmtHex" name="stk_chargeAmtHex" value="<%=request.getParameter("stk_chargeAmtHex")%>"/>
				<input type="hidden" id="stk_debitCardno" name="stk_debitCardno" value="<%=request.getParameter("stk_debitCardno")%>" />
				<input type="hidden" id="stk_mode" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
			</form>
			<%}%>
			<form name="prev" method="post" action="<%=mainUrl%>"></form>
			<form name="sutongcard" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" name="url" value="/STCard/stcmain.jsp" />
			</form>
			</div>	
		</section>		
	</footer>
</body>
</html>