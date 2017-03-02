<%@ include file="/includes/contentType_client.jsp"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/includes/resources_client.jsp"%>
<script type="text/javascript" src="<%=contextPath%>/ebdpui/common/js/icbc_specialcard_conformity_tools.js"></script>
<%
	String mainAreaCode=(String)MySessionContext.getSession(c_sessionId).getAttribute("mainAreaCode");
	String custName = (String)MySessionContext.getSession(c_sessionId).getAttribute("CNcustName");
	String custAuthenType=(String)MySessionContext.getSession(c_sessionId).getAttribute("custAuthenType");
%>
<script type="text/javascript">
var card_fullid = ""; //苏通卡卡号
var cardname = "";    //苏通卡姓名
var RemassAMTHEX = "";//卡余额HEX
var byInfo = "";      //卡余额
var custName = "<%=custName%>";      //手机银行客户姓名
var custArea = "<%=mainAreaCode%>";  //手机银行客户地区号
var authType = "<%=custAuthenType%>";
var errMsg = "";      //错误信息
var errCmd = "";       //出错时执行的指令
var cardType = "";     //20140115增加卡片类型判断
var deviceType="dovila"; //20150522增加支持NFC功能

jQuery(document).ready(function(){
 	//页面加载后就设置充值按钮不可用
 	jQuery('#chargeButton').attr("disabled",true);
	checkAreaNo();
});

function checkAreaNo(){
	if(custArea == null || custArea =="null" || custArea == ""){
		custArea = "4301";
	}
}

function execute(){
	//jQuery('#stkNum').html("6222222");
	start();
}

function start(){
	try{
		jQuery('#stepDetail').empty();
		var jndx_mode = $('input:radio:checked').val();
		
		if(jndx_mode == "1" ){
			deviceType="nfc";
		}else{
			deviceType="dovila";
		}
		jQuery("#stk_mode").val(deviceType);
		//alert(deviceType);
		//启动服务
		ICBCSpecialCardTools.startConformityTransmit({
			'deviceType':deviceType,
			'callBack':function(){
			//开始异步执行指令
			executeTransmit({'msgFlag':'2','msgBuf':'RESET','step':1});
			}
		});
	}catch(e){
		console.log("Error: " + e);
	}
}

function executeTransmit(param){
	ICBCSpecialCardTools.executeConformityTransmit({
		'msgFlag':param.msgFlag,
		'msgBuf':param.msgBuf,
		'step':param.step,
		'callBack':stepCallBack
	});
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

function getSTKName(str){
	var ret = "";
	var tag = custArea+"地区,"+custName+"用户";
	tag = encodeURI(tag);
	ICBCSpecialCardTools.nativeShowIndicator();
	$.ajaxSetup({
		async:false});
	$.post("<%=urlHead%>/STCard/DataHandler",
			{"type":"getSTKName","param":str,"tag":tag},
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

function sendErrMsg(str1, str2){
	var msg = "苏通卡查询异常--"+getDateTime()+"--"+str1+"--"+str2;
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

function stepCallBack(callBackResult){
	try{
		if(callBackResult!=undefined){
			if (callBackResult.cardErrorCode != undefined) {
				//结束服务
				ICBCSpecialCardTools.endConformityTransmit();
			}else{
				var resultString=callBackResult.result;
				
				// jQuery在页面#stepDetail区域显示指令执行结果，测试使用
				if(callBackResult.step==1){	
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");

						executeTransmit({'msgFlag':'1','msgBuf':'00a40000023F00','step':2});
				}else if(callBackResult.step==2){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
                    if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000"){
						//alert("选择苏通卡应用失败，请确认卡片是否是苏通卡！");
						jQuery('#stepDetail').append("<div><p style='color:red'>请确认已正确连接苏通卡！</div>");
						sendErrMsg("选择应用失败，指令：00a40000023F00", resultString);
						ICBCSpecialCardTools.endConformityTransmit();
                    }else{
                        //查询基本数据
						executeTransmit({'msgFlag':'1','msgBuf':'00b0960037','step':3});
                    }
				}else if(callBackResult.step==3){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					
					if(resultString == null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		            {
		               //alert("查询基本数据错误，苏通卡查询失败！");
		               sendErrMsg("查询基本数据错误,指令：00b0960037", resultString);
		               ICBCSpecialCardTools.endConformityTransmit();		            
		            }else{
		            	//对上一步查询基本数据返回结果进行处理，取得苏通卡姓名
						cardname = getSTKName(resultString);
						if(cardname == ""){
							//alert("获取苏通卡姓名失败！");
				            sendErrMsg("获取苏通卡姓名失败！", errMsg);
							//ICBCSpecialCardTools.endConformityTransmit();
				            executeTransmit({'msgFlag':'1','msgBuf':'00a40000021001','step':4});
						}else{
							jQuery('#stkName').html(cardname);
							//选择应用
							executeTransmit({'msgFlag':'1','msgBuf':'00a40000021001','step':4});
						}
		            }
				}else if(callBackResult.step==4){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000"){
						//alert("选择苏通卡应用失败，请确认卡片是否是苏通卡！");
						sendErrMsg("选择应用失败，指令：00a40000021001", resultString);
						ICBCSpecialCardTools.endConformityTransmit();
                    }else{
                        //查询卡片发行数据
						executeTransmit({'msgFlag':'1','msgBuf':'00b095002b','step':5});
                    }
				}else if(callBackResult.step==5){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		            {
		            	//alert("查询卡片发行数据错误，苏通卡查询失败！");
		            	sendErrMsg("查询卡片发行数据错误，指令：00b095002b", resultString);
		            	ICBCSpecialCardTools.endConformityTransmit();		            
		            }else{
			           	cardType = parseInt(resultString.substring(16,18),16)+"";
			            var card_netno1 = parseInt(resultString.substring(20,22),16)+"";
			            if(card_netno1.length < 2)
				            card_netno1 = "0"+card_netno1;
			            var card_netno2 = parseInt(resultString.substring(22,24),16)+"";
			            if(card_netno2.length < 2)
				            card_netno2 = "0"+card_netno2;
			            var card_netno = card_netno1 + card_netno2;
			            var card_cpuid = resultString.substring(24,40);
			            card_fullid = card_netno + card_cpuid;     //苏通卡卡号
			            // var card_open_date = resultString.substring(40, 48); 
			            var card_end_date = resultString.substring(48, 56); //苏通卡到期时间

			            jQuery('#stkNum').html(card_fullid);
			            jQuery('#stkExpireDate').html(card_end_date);
			            if(cardType == "23"){
			            	//alert("记账卡无法查询芯片内行业应用余额！");
				            sendErrMsg("记账卡无法查询芯片内行业应用余额", resultString);
			            	ICBCSpecialCardTools.endConformityTransmit();
			            }else{
			            	//查询余额step1-校验Pin
			           		executeTransmit({'msgFlag':'1','msgBuf':'0020000003888888','step':6});
			            }
		            }
				}else if(callBackResult.step==6){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					 if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
			         {
			             //alert("卡片PIN校验错误，苏通卡查询失败！");
			             sendErrMsg("PIN校验失败，指令：0020000003888888", resultString);
			             ICBCSpecialCardTools.endConformityTransmit();
			         }else {
				         //查询余额step2-读取余额文件
						executeTransmit({'msgFlag':'1','msgBuf':'805C000204','step':7});
			         }
				}else if(callBackResult.step==7){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		            {
		            	//alert("读取余额文件异常，苏通卡查询失败！");
		            	sendErrMsg("读取余额文件失败，指令：805C000204", resultString);
		            	ICBCSpecialCardTools.endConformityTransmit();            
		            }else{
			            RemassAMTHEX = resultString.substring(2, 8);
			            byInfo = parseInt(RemassAMTHEX, 16)+"";
			            if(resultString.substring(0, 2) == "61"){
				            var strCmd = "00C00000" + byInfo.substring(2, 4);
				            errCmd = strCmd;
				            //查询余额step3-读取后续数据
			            	executeTransmit({'msgFlag':'1','msgBuf':strCmd,'step':8});
			            }else{
			            	jQuery('#stkBalance').html(byInfo/100);
			            	executeTransmit({'msgFlag':'2','msgBuf':'RELEASE','step':9});
			            }				
		            }
				}else if(callBackResult.step==8){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
		            {
		            	//alert("读取余额文件后续数据异常，苏通卡查询失败！");
		            	sendErrMsg("读取余额文件后续数据失败，指令："+errCmd, resultString);
		            	ICBCSpecialCardTools.endConformityTransmit();	
		            }else{
		            	RemassAMTHEX = resultString.substring(2, 8);
		                //byInfo = Long.toString(Long.parseLong(RemassAMTHEX, 16));
		                 byInfo = parseInt(RemassAMTHEX, 16)+"";
		                jQuery('#stkBalance').html(byInfo/100);
		            	executeTransmit({'msgFlag':'2','msgBuf':'RELEASE','step':9});
		            }
				}else if(callBackResult.step==9){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>查询成功！</div>");
					//alert("查询成功!");
					
					if(RemassAMTHEX == "FFFFFF"){
				    	//alert("卡内余额已为最大值，不能充值！");
				    	jQuery('#chargeButton').attr("disabled",true);
				    }else{
				    	jQuery('#chargeButton').attr("disabled",false);
				    }	
					if(authType == "2" || authType == "4" || authType == "3"){
						jQuery('#chargeButton').attr("disabled",false);
					}else{
						jQuery('#chargeButton').attr("disabled",true);
					}
					jQuery("#stk_name").val(encodeURI(cardname));
					jQuery("#stk_cardNo").val(card_fullid);
					jQuery("#stk_balance").val(byInfo);
					//jQuery("#stk_balanceHex").val(RemassAMTHEX);
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
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">返回</button>
			<a id="returnLink" class="hide" href="<%=urlHead%>/STCard/stcmain.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">苏通卡查询</h1>
			<button class="nav_right_btn" onclick="execute()">查询</button>
		</nav>
	</header>

	<div id="content" class="content">
		<div id="scroller" class="scroller">		
			<section class="section_padding">
				<h2 class="section_title">业务说明</h2>
				<ul class="cell_container">
					<li><!-- 若首行缩进class加入indent_txt -->
						<div class="cell_li_left">
						<div class="cell_li_txt">读卡方式支持音频或NFC两种模式。选择音频模式请正确连接外接读卡设备及苏通卡；NFC模式只支持具有NFC功能的安卓智能手机，选择该模式请打开手机NFC功能，并将苏通卡放置在手机背面。</div>
						<div id="stepDetail"></div>
						</div>
					</li>		
				</ul>
			</section>
			
			<section class="section_padding">
				<h2 class="section_title">选择读卡方式</h2>
				<ul class="cell_container">
					<li>
						<div class="cell_flex">
							<!-- 单选按钮后可以跟label标签 展现单选按钮名字（可选），注意对应的for要和id一致  -->
							<input id="radio1" name="radioButton" type="radio" value="1" checked="checked"/><label for="radio1" class="vl_mid il">NFC</label>
						</div>
						<div class="cell_flex">
							<input id="radio2" name="radioButton" type="radio" value="2"/><label for="radio2" class="vl_mid il">音频</label>
						</div>
					</li>		
				</ul>
			</section>
			
			<section class="section_padding">
				<h2 class="section_title">查询结果信息</h2>
				<ul class="cell_container">
					<li>
						<div class="cell_li_left">苏通卡卡号</div>
						<div id="stkNum" class="cell_li_right gray_txt"></div>
					</li>
					<li>
						<div class="cell_li_left">苏通卡姓名</div>
						<div id="stkName" class="cell_li_right gray_txt"></div>
					</li>
					<li>
						<div class="cell_li_left">苏通卡到期时间</div>
						<div id="stkExpireDate" class="cell_li_right gray_txt"></div>
					</li>
					<li>
						<div class="cell_li_left">苏通卡余额</div>
						<div id="stkBalance" class="cell_li_right gray_txt"></div>
					</li>
				</ul>
			</section>
		</div>
	</div>
	<footer>
		<section class="section_padding">
			<!-- 
				button_container容器内放置按钮
				可以设置data-rowsize属性，控制一行展现几个按钮，不配置该属性则都在一行展现
			-->
			<div class="button_container" data-rowsize="1">
				<button id="chargeButton" class="normal_btn" onclick="ICBCPageTools.submitForm({'formName':'charge'});">进入充值页面</button>
			</div>
			<form name="charge" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" id="stk_name" name="stk_name" value="" />
				<input type="hidden" id="stk_cardNo" name="stk_cardNo" value="" />
				<input type="hidden" id="stk_balance" name="stk_balance" value="" />
				<input type="hidden" id="stk_mode" name="stk_mode" value="" />
				<input type="hidden" name="url" value="/STCard/doCharge.jsp" />
			</form>
		</section>
	</footer>
</body>
</html>