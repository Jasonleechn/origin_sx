<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../includes/resources_client.jsp"%>
</head>
<body>
	<form name="testForm" action="" method="post">
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">返回</button>
			<a id="returnLink" class="hide" href="<%=mainUrl%>"></a>
			<h1 class="nav_title" id="nav_title">演示页面</h1>
			<button class="nav_right_btn" onclick="ICBCPageTools.submitALink({'linkId':'nextLink'})">下一页</button>
			<a id="nextLink" class="hide" href="<%=urlHead%>/ClientDemo/page2.jsp&c_sessionId=<%=c_sessionId%>"></a>
		</nav>
		<section class="header_tabbar">
			<button class="header_tabbar_btn_active" onclick="">标签1</button>
			<button class="header_tabbar_btn" onclick="">标签2</button>
			<button class="header_tabbar_btn" onclick="">标签3</button>
		</section>
		<section class="search_bar">
			<input type="text" class="search_bar_input" placeholder="请输入关键字"/>
			<button class="gray_small_btn" onclick="">查询</button>
		</section>
		<section class="guide_bar">
			<div class="guide_info">
				<div class="guide_icon">1</div>
				<div class="guide_tip"></div>
			</div>
			<div class="guide_info">
				<div class="guide_icon_current">2</div>
				<div class="guide_tip">当前步骤</div>
			</div>
			<div class="guide_info">
				<div class="guide_icon">3</div>
				<div class="guide_tip"></div>
			</div>
			<div class="guide_info">
				<div class="guide_icon">4</div>
				<div class="guide_tip"></div>
			</div>
			<div class="guide_info">
				<div class="guide_icon">5</div>
				<div class="guide_tip"></div>
			</div>
			<div class="guide_info">
				<div class="guide_icon">6</div>
				<div class="guide_tip"></div>
			</div>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section class="section_padding">
				<h2 class="section_title"></h2>
				<ul class="cell_container">
					<li>
						<div class="cell_li_left">文本输入域</div>
						<div class="cell_li_right">
							<!-- placeholder是占位符，如果是必输项，请填写“请输入”，如果是选输，请填写“可选择输入”。value是输入域的默认值-->
							<input type="text" name="input1" value="" placeholder="请输入" maxlength="25" size="10"/>
						</div>
					</li>
					<li>
						<div class="cell_li_left">选择输入域</div>
						<div class="cell_li_right">
							<select name="select1">
								<option value="1">选项(123)&#x202a;</option>
								<option value="2">选项2&#x202a;</option>
								<option value="3">选项3&#x202a;</option>
								<option value="4">选项4&#x202a;</option>
								<option value="5">有括号的要加个特殊字符(含)&#x202a;</option>
							</select>
						</div>
					</li>
					<li>
						<div class="cell_li_left">弹出选择输入域</div>
						<div class="cell_li_right">
							<script>
								function selectChange(){
									alert('选择了'+document.testForm.select2.value);
								}
							</script>
							<!-- 
								弹出选择输入域点击后会弹出一个页面进行选择，而不是使用原生的select样式，比如WP版本原生的select太长无法显示，可以使用此输入域
								要定义以下几个属性
								data-style="popselectpanel" 固定写死
								onchange="XXX" 选完后的回调函数，可选
								注意，select必须有option
							-->			
 							<select name="select2" onchange="selectChange()" data-style="popselectpanel" data-defaultValue="2">
 								<option value="1">选项1</option>
 								<option value="2">选项2</option>
 								<option value="3">选项3</option>
							</select>
						</div>
					</li>
					<li>
						<div class="cell_li_left">复选框输入域</div>
						<div class="cell_li_right">
							<!-- 复选框前或后可以跟label标签 展现复选框名字（可选），注意对应的for要和id一致  -->
							<input type="checkbox" id="checkbox1" name="checkbox1" value=""/>
							<label for="checkbox1" class="vl_mid il">选我</label>
						</div>
					</li>
					<li>
						<div class="cell_flex">
							<!-- 单选按钮后可以跟label标签 展现单选按钮名字（可选），注意对应的for要和id一致  -->
							<input id="radio1" name="radioButton" type="radio" value="1" checked="checked"/><label for="radio1" class="vl_mid il">单选按钮1</label>
						</div>
						<div class="cell_flex">
							<input id="radio2" name="radioButton" type="radio" value="2"/><label for="radio2" class="vl_mid il">单选按钮2</label>
						</div>
					</li>					
					<li>
						<div class="cell_li_left">开关输入域</div>
						<div class="cell_li_right">
							<!-- 开关，如果页面有多个开关，注意id不能重复，label对应的for要和id一致 -->
							<div class="switch_button">
								<input type="checkbox" name="switch" class="switch_button_checkbox" id="switch_button1" checked="checked" value="1">
								<label class="switch_button_label" for="switch_button1">
									<!-- 开关文字可以选择switch_text1、switch_text2、switch_text3 -->
									<div class="switch_button_inner switch_text3"></div>
									<div class="switch_button_switch"></div>
								</label>
							</div>
						</div>
					</li>
					<li>
						<div class="cell_li_left">日期选择输入域</div>
						<div class="cell_li_right">
							<!-- 如果有默认值，赋值initDate属性，格式YYYYMMDD，如果是年月样式，type="1" -->
							<webUI:datepicker id="datepicker1"/>
						</div>
					</li>
					<li class="cell_li_btn" onclick="alert('测试一下')">
						<div class="cell_li_left">cell可以点击</div>
					</li>
					<li>
						<div class="cell_li_left">按钮样式1</div>
						<div class="cell_li_right">
							<button class="blue_arrow_btn"></button>
						</div>
					</li>
					<li>
						<div class="cell_li_left">按钮样式2</div>
						<div class="cell_li_right">
							<button class="green_add_btn"></button>
						</div>
					</li>
					<li>
						<div class="cell_li_left">按钮样式3</div>
						<div class="cell_li_right">
							<button class="red_reduce_btn"></button>
						</div>
					</li>
					<li>
						<div class="cell_li_left">
							<div class="il vl_mid">按钮样式4</div>
							<button class="info_btn"></button>
						</div>
					</li>
					<li>
						<div class="cell_li_left">
							<div class="il vl_mid">按钮样式5</div>
							<button class="try_btn"></button>
						</div>
					</li>
					<li>
						<div class="cell_li_left">
							<div class="il vl_mid">按钮样式6</div>
							<button class="payee_btn"></button>
						</div>
					</li>
					<li>
						<div class="cell_li_left">
							<div class="il vl_mid">打电话（仅支持iphone、android）</div>
							<button class="phone_btn" onclick="ICBCPageTools.nativeCallPhone('13810000000');"></button>
						</div>
					</li>
					<li>
						<div class="cell_li_left">
							<div class="il vl_mid">发短信（仅支持iphone、android）</div>
							<button class="phone_btn" onclick="ICBCPageTools.nativeSendSMS({'mobile':'13888888888','content':'内容'});"></button>
						</div>
					</li>
					<li>
						<div class="cell_li_left">弹出按钮面板</div>
						<div class="cell_li_right">
							<button class="green_add_btn" onclick="displayPopBtnPanel()"></button>
						</div>						
					</li>
				</ul>
			</section>
			<section class="section_padding">
				<h2 class="section_title">表单验证示例</h2>
				<ul class="cell_container">
					<li>
						<div class="cell_li_left">表单验证输入域1</div>
						<div class="cell_li_right">
							<input type="text" name="inputTest1" value="" placeholder="请输入" maxlength="25" size="25"/>
						</div>
					</li>
					<li>
						<div class="cell_li_left">表单验证输入域2</div>
						<div class="cell_li_right">
							<input type="text" name="inputTest2" value="" placeholder="请输入" maxlength="25" size="25"/>
						</div>
					</li>
					<li>
						<div class="cell_li_left">表单验证输入域3</div>
						<div class="cell_li_right">
							<input type="text" name="inputTest3" value="" placeholder="请输入" maxlength="25" size="25"/>
						</div>
					</li>
					<li>
						<div class="cell_li_left">表单验证输入域4</div>
						<div class="cell_li_right">
							<input type="text" name="inputTest4" value="" placeholder="请输入" maxlength="25" size="25"/>
						</div>
					</li>
					<li>
						<div class="cell_li_left">表单验证输入域5</div>
						<div class="cell_li_right">
							<input type="text" name="inputTest5" value="" placeholder="请输入" maxlength="25" size="25"/>
						</div>
					</li>
					<li>
						<div class="cell_li_left">表单验证复选框输入域</div>
						<div class="cell_li_right">
							<input type="checkbox" id="checkboxTest1" name="checkboxTest1" value=""/>
						</div>
					</li>								
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({formName:'testForm',validator:testFormValidator})">
						<div class="cell_li_left">点我进行普通表单验证</div>
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
			<div class="button_container" data-rowsize="2">
				<button class="normal_btn">常用按钮</button>
				<button class="red_btn" >红色按钮</button>
				<button class="orange_btn" >橙色按钮</button>
				<button class="gray_btn" >灰色按钮</button>
			</div>
		</section>
	</footer>
	</form>
</body>
<script>
jQuery(document).ready(function(){
	//在页面加载完成后加入自定义校验规则
	jQuery.validator.addMethod("myCheck", function(value, element) {
		var length = value.length;
		var rule = /^\d$/;//正则表达式
		return this.optional(element) || rule.test(value);
	}, "请输入一位数字");
});
function backBtnClick(){
	alert('<img style="margin:0 auto;display:block" src="<%=sImagePath%>/creditcard_tip1.png">');
}
function displayPopBtnPanel(){
	//弹出按钮面板方法，最多支持5个按钮,button1-button5
	popBtnPanel=ICBCUITools.showPopBtnPanel({
		'button1':{'name':'面板按钮1','func':fun,'arg':'点击了按钮1'},
		'button2':{'name':'面板按钮2','func':fun,'arg':'点击了按钮2'},
		'button3':{'name':'面板按钮3','func':fun,'arg':'点击了按钮3'},
	});
}
//测试方法
function fun(param){
	alert(param);
}
function testFormValidator(){
	return jQuery("form[name=testForm]").validate({
		rules:{
			inputTest1:"required",
			inputTest2:{
				required:true,//必输
				number:true,//数字类型
				minlength:6,//最小长度
			},
			inputTest3:{
				required:true,
				isMobile:true,//手机号
			},
			inputTest4:{
				required:true,
				checkSpecial:true,//特殊字符校验
			},
			inputTest5:{
				required:true,
				myCheck:true,//自定义校验
			},
			checkboxTest1:"required",
		},
		messages:{
			inputTest1:{
				required:"测试输入域1不能为空",
			},
			inputTest2:{
				required:"测试输入域2不能为空",
				number:"测试输入域2应为数字",
				minlength:"测试输入域2最少输入6个字符",
			},
			inputTest3:{
				required:"测试输入域3不能为空",
				isMobile:"测试输入域3应为手机号",
			},
			inputTest4:{
				required:"测试输入域4不能为空",
			},
			inputTest5:{
				required:"测试输入域5不能为空",
			},
			checkboxTest1:{
				required:"请勾选复选框",
			}
		},
	}).form();
}
</script>
</html>