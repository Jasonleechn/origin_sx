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
%>
<script type="text/javascript">
var custName = "<%=custName%>";      //手机银行客户姓名
var custArea = "<%=mainAreaCode%>";  //手机银行客户地区号
var errMsg = "";      //错误信息
var errCmd = "";       //出错时执行的指令
var serial = new Array();
var amount = new Array();
var date = new Array();
var time = new Array();
var page = 1;
var nextPage = 1;
var prePage = 1;
var num = 1;
var num1 = 1;
var arrayIndex = 0;
var stk_mode = "<%=request.getParameter("stk_mode")%>"; //20150522

jQuery(document).ready(function(){
//jQuery(window).load(function(){
 	//页面加载后就设置充值按钮不可用
 	num = 1;
 	arrayIndex = 0;
 	var tag = "<%=request.getParameter("tag")%>";
 	if(tag == "1")
 		page = parseInt("<%=request.getParameter("prePage")%>");
 	if(tag == "2")
 		page = parseInt("<%=request.getParameter("nextPage")%>");
 	if(page != 1){
 	 	jQuery('#preButton').attr("disabled",false);
 	 	num = (parseInt(page)-1)*5 + 1;
 	 	num1 = num + 6;
 	 	prePage = page - 1;
 	 	jQuery("#prePage").val(prePage.toString());
 	} else{
 		jQuery('#preButton').attr("disabled",true);
 		num1 = num +6;
 	}
 	jQuery('#nextButton').attr("disabled",true);
 	checkAreaNo();
 	execute();
});

function checkAreaNo(){
	//alert(custArea);
	//alert(getSingleLimit());
	if(custArea == null || custArea =="null" || custArea == ""){
		custArea = "4301";
	}
	if(stk_mode == null || stk_mode == ""){
		stk_mode = "dovila";
	}
	if(stk_mode != "dovila" && stk_mode != "nfc"){
		stk_mode = "dovila";
	}
}

function execute(){
	start();
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
	                //选择应用
					executeTransmit({'msgFlag':'1','msgBuf':'00a40000021001','step':2});
				}else if(callBackResult.step==2){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000"){
						//alert("选择苏通卡应用失败，请确认卡片是否是苏通卡！");
						sendErrMsg("选择应用失败，指令：00a40000021001", resultString);
						ICBCSpecialCardTools.endConformityTransmit();
                    }else{
                    	executeTransmit({'msgFlag':'1','msgBuf':'0020000003888888','step':3});
                    }
				}else if(callBackResult.step==3){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					 if(resultString==null || resultString=="" || resultString.substr(resultString.length-4) != "9000")
			         {
			            // alert("卡片PIN校验错误！");
			             sendErrMsg("PIN校验失败，指令：0020000003888888", resultString);
			             ICBCSpecialCardTools.endConformityTransmit();
			         }else{
				         var tmp = num.toString(16);
				         if(tmp.length == 1)								
						 	tmp = "0" + tmp;
						 var cmd = "00b2" + tmp + "c417";
						 errCmd = cmd;
						 executeTransmit({'msgFlag':'1','msgBuf':cmd,'step':4});
			         }
				}else if(callBackResult.step==4){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					if(resultString==null || resultString=="" || resultString.length != 50)
		            {
		            	//alert("读取明细文件异常，请确认卡片类型！");
		            	sendErrMsg("读取明细文件失败，指令："+errCmd, resultString);
		            	ICBCSpecialCardTools.endConformityTransmit();            
		            }else{
		            	if(num == num1 || resultString.substring(0, 4)=="0000"){
		            		if(num == num1){
				            	//index = num.toString()-1;
				            	nextPage = page + 1;
				            	arrayIndex = arrayIndex - 1;			            	
			            	}		
		            		//alert(arrayIndex);
		                    executeTransmit({'msgFlag':'2','msgBuf':'RELEASE','step':5});
		            	}else{
			            	serial[arrayIndex] = resultString.substring(0, 4);
			            	amount[arrayIndex] = resultString.substring(10,18);
			            	date[arrayIndex] = resultString.substring(32,40);
			            	time[arrayIndex] = resultString.substring(40, 42) + ":" + resultString.substring(42, 44) + ":" + resultString.substring(44, 46);
			            	num++;
			            	arrayIndex++;
			            	var tmp1 = num.toString(16);
					        if(tmp1.length == 1)								
							   tmp1 = "0" + tmp1;
							var cmd1 = "00b2" + tmp1 + "c417";
							errCmd = cmd1;
							executeTransmit({'msgFlag':'1','msgBuf':cmd1,'step':4});
		            	}			            				
		            }
				}else if(callBackResult.step==5){
					//jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>查询成功！</div>");
					$("#details").html("");
					for(var i = 0; i < arrayIndex; i++){
						var tr = $("<tr></tr>");
						if(i%2 == 0){
							
						}
						var td_id = $("<td>" + parseInt(serial[i],16) + "</td>");
						var td_amount = $("<td>" + parseInt(amount[i],16)/100 + "</td>");
						var td_date = $("<td>" + date[i] + "</td>");
						var td_time = $("<td>" + time[i] + "</td>");
						tr.append(td_id);
						tr.append(td_amount);
						tr.append(td_date);
						tr.append(td_time);
						$("#details").append(tr);
					}
					//alert("查询成功!");	
					if(nextPage > page){
						//nextButton.setEnable(true);
						jQuery('#nextButton').attr("disabled",false);
						jQuery("#nextPage").val(nextPage.toString());
					}
					//jQuery("#stk_name").val(encodeURI(cardname));
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
			<h1 class="nav_title" id="nav_title">苏通储值卡明细查询</h1>
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
			
			<section class="section_datatable">
				<table class="datatable">
					<thead>
						<!-- 主标题（可选）	colspan="3" 要根据子标题的个数定 -->
						<tr class="main_title"><th align="left" colspan="4">查询明细结果</th></tr>
						<!-- 子标题（必须有且唯一）	 align属性设置对齐方式，tbody中的列会和标题的对齐方式相同 width代表这列的宽度，可以是像素或百分比，不写会自动填充宽度-->
						<tr class="sub_title">
							<th align="center" width="25%">交易序号</th>
							<th align="center" width="25%">交易金额(元)</th>
							<th align="center" width="25%">交易日期</th>
							<th align="center" width="25%">交易时间</th>
						</tr>
					</thead>
					<tbody id="details">
					</tbody>
				</table>
			</section>
		
			<section class="section_padding">
			<div class="button_container" data-rowsize="2">
				<button id="preButton" class="normal_btn" onclick="ICBCPageTools.submitForm({'formName':'preForm'});">上一页</button>
				<button id="nextButton" class="normal_btn" onclick="ICBCPageTools.submitForm({'formName':'nextForm'});">下一页</button>
			</div>
			</section>						
			<form name="preForm" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" id="tag" name="tag" value="1" />
				<input type="hidden" id="prePage" name="prePage" value="" />
				<input type="hidden" id="stk_mode" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
				<input type="hidden" name="url" value="/STCard/readDetailInfo1.jsp" />
			</form>
			<form name="nextForm" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" id="tag" name="tag" value="2" />
				<input type="hidden" id="nextPage" name="nextPage" value="" />
				<input type="hidden" id="stk_mode" name="stk_mode" value="<%=request.getParameter("stk_mode")%>" />
				<input type="hidden" name="url" value="/STCard/readDetailInfo1.jsp" />
			</form>						
		</div>
	</div>
	<footer>
	</footer>
</body>
</html>