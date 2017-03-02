<%@page import="java.io.ByteArrayInputStream"%>
<%@page import="org.dom4j.*"%>
<%@page import="org.dom4j.io.*"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../includes/resources_client.jsp"%>
<script type="text/javascript" src="<%=contextPath%>/ebdpui/common/js/icbc_specialcard_conformity_tools.js"></script>
<script>
<%--
　　	以查询卡片信息为例：
	msgBuf = "RESET"; //待发送操作命令，卡片复位
	msgFlag = "2";

	msgBuf = "00a4040008a000000333010102";//待发送指令，选择应用
	msgFlag = "1";

	msgBuf = "00c0000057";
	msgFlag = "1";

	msgBuf = "80ca9f7909";//获取pboc数据  电子现金余额
	msgFlag = "1";

	msgBuf = "80ca9f7709";
	msgFlag = "1";

	msgBuf = "80ca9f7809";
	msgFlag = "1";

	msgBuf = "80ca9f6d09";
	msgFlag = "1";

	msgBuf = "80ca9f1305";
	msgFlag = "1";

	msgBuf = "80a800000b8309000000000000000156"; //应用初始化
	msgFlag = "1";

	msgBuf = "00b2010c4d"; //读应用记录
	msgFlag = "1";

	msgBuf = "00b2011496";
	msgFlag = "1";

	msgBuf = "00b2021433";
	msgFlag = "1";

	msgBuf = "RELEASE";//释放连接
	msgFlag = "2";
　
　　	注：RESET为冷启动，卡片上电时复位卡片 	WARMRESET为热启动，卡片已经上电，强制卡片复位

--%>
var deviceType='';
jQuery(document).ready(function() {
	deviceSelectChange();
});
function deviceSelectChange(){
	deviceType=jQuery('select[name=deviceSelect]').val();
	if(deviceType=='dovila'){
		jQuery('#bluetoothControl').show();
	}else{
		jQuery('#bluetoothControl').hide();
	}
}
function execute(){
	try{
		jQuery('#stepDetail').empty();
		//启动服务，设备类型传入dovila即可支持音频和蓝牙读卡设备
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
function stepCallBack(callBackResult){
	try{
		if(callBackResult!=undefined){
			if (callBackResult.cardErrorCode != undefined) {
				//结束服务
				ICBCSpecialCardTools.endConformityTransmit();
			}else{
				var resultString=callBackResult.result;
				if(callBackResult.step==1){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'00a4040008a000000333010102','step':2});
				}else if(callBackResult.step==2){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'00c0000057','step':3});
				}else if(callBackResult.step==3){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'80ca9f7909','step':4});
				}else if(callBackResult.step==4){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'80ca9f7709','step':5});
				}else if(callBackResult.step==5){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'80ca9f7809','step':6});
				}else if(callBackResult.step==6){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'80ca9f6d09','step':7});
				}else if(callBackResult.step==7){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'80ca9f1305','step':8});
				}else if(callBackResult.step==8){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'80a800000b8309000000000000000156','step':9});
				}else if(callBackResult.step==9){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'00b2010c4d','step':10});
				}else if(callBackResult.step==10){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'00b2011496','step':11});
				}else if(callBackResult.step==11){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'1','msgBuf':'00b2021433','step':12});
				}else if(callBackResult.step==12){
					jQuery('#stepDetail').append("<div><p style='color:red'>step"+callBackResult.step+":<p>"+resultString+"</div>");
					executeTransmit({'msgFlag':'2','msgBuf':'RELEASE','step':13});
				}else if(callBackResult.step==13){
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
function blueToothSelect(){
	var value=jQuery('input[name=blueTooth]:checked').val();
	if(value=='1'){
		ICBCSpecialCardTools.startBlueToothDiscoveryForConformity();
	}else if(value=='0'){
		ICBCSpecialCardTools.cancelBlueToothDiscoveryForConformity();
	}
}
</script>
</head>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitForm({'formName':'prev'});">返回</button>
			<form name="prev" method="post" action="<%=mainUrl%>"></form>
			<h1 class="nav_title" id="nav_title">外接读卡设备测试</h1>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section class="section_padding">
				<ul class="cell_container">
					<li>
						<div class="cell_li_left">请选择设备类型</div>
						<div class="cell_li_right">
							<select name="deviceSelect" onchange="deviceSelectChange()">
								<option value="dovila" selected="selected">蓝牙、音频</option>
								<option value="nfc">NFC</option>
							</select>
						</div>
					</li>		
				</ul>
			</section>
			<section class="section_padding" id="bluetoothControl">
				<h2 class="section_title">蓝牙设置</h2>
				<ul class="cell_container">
					<li>
						<div class="cell_flex">
							<input type="radio" name="blueTooth" id="useBlueTooth" onclick="blueToothSelect()" value="1"/><label for="useBlueTooth">使用蓝牙</label>
						</div>
						<div class="cell_flex">
							<input type="radio" name="blueTooth" id="notUseBlueTooth" onclick="blueToothSelect()" value="0"/><label for="notUseBlueTooth">不使用蓝牙</label>
						</div>
					</li>	
				</ul>
			</section>
			<section class="section_padding">
				<ul class="cell_container">
					<li class="cell_li_btn" onclick="execute()">
						<div class="cell_li_left">请插入或连接外接读卡设备，并将卡片贴近读卡设备后，点击执行指令</div>
					</li>	
				</ul>
			</section>
			<section class="section_padding">
				<h2 class="section_title">指令执行结果</h2>
				<ul class="cell_container">
					<li id="stepDetail">
					
					</li>	
				</ul>
			</section>		
		</div>
	</div>
	<footer></footer>
</body>
</html>