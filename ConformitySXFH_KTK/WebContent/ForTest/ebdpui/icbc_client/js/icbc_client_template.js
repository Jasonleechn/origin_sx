//定义模版的jQuery插件
(function($){
	var compiled={};
	$.fn.handlebars=function(template,data){
		if(template instanceof jQuery){
			template=$(template).html();
		}
		compiled[template]=Handlebars.compile(template);
		this.html(compiled[template](data));
	};
})(jQuery);
//定义handlebar自定义方法
Handlebars.registerHelper('setIndex',function(value){
	this.index=Number(value);
});
Handlebars.registerHelper('toMoney',function(value){
	return ICBCAmountTools.toMoney(value);
});
Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {
    var operators, result;
    if (arguments.length < 3) {
        throw new Error("比较方法最少需要三个参数。");
    }
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    if (!operators[operator]) {
        throw new Error("比较符号不正确" + operator);
    }
    result = operators[operator](lvalue, rvalue);
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
//定义常用的模板
window['common_template']={};
//alert框
window['common_template'].alert_dialog_template=
'<article id="alert_dialog" class="alert_dialog">'+
'<div class="modal fade modal_wrapper" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
  '<div class="modal-dialog">'+
    '<div class="modal-content">'+
      '<div class="modal-header">'+
        '<h4 class="modal-title" id="myModalLabel">{{title}}</h4>'+
      '</div>'+
      '<div class="modal-body" id="myModalMsg" style="word-break:break-all">{{{msg}}}</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="modal-btn" data-dismiss="modal" id="myModalBtn">{{btn}}</button>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>‍'+
'</article>';

//大学生alert框
window['common_template'].college_alert_dialog_template=
	'<div id="college_alert_dialog">'+
	'<div class="layout">'+
		'<div id="tipsItem" class="tipsItem">'+
			'<p id="tipsTitle" class="title">{{title}}</p>'+
			'<p id="tipsMsg" class="txt2" style="text-align:center;font-size:14px;line-height:1.5;">{{{msg}}}</p>'+
			'<p id="tipsBtn" class="btn" style="font-size:14px;">'+
				'<a href="#" class="blue">{{btn}}</a>'+
			'</p>'+
		'</div>'+
	'</div>'+
	'<div class="bgLayer"></div>'+
	'</div>';

//confirm框
window['common_template'].confirm_dialog_template=
'<article id="confirm_dialog" class="confirm_dialog">'+
'<div class="modal fade modal_wrapper" id="myConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
  '<div class="modal-dialog">'+
    '<div class="modal-content">'+
      '<div class="modal-header">'+
        '<h4 class="modal-title" id="myModalLabel">{{title}}</h4>'+
      '</div>'+
      '<div class="modal-body" id="myModalMsg" style="word-break:break-all">{{{msg}}}</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="modal-cancel-btn" data-dismiss="modal" id="myModalCancelBtn">{{cancelbtn}}</button>'+
        '<button type="button" class="modal-ok-btn" data-dismiss="modal" id="myModalOkBtn">{{okbtn}}</button>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>‍'+
'</article>';

//弹出按钮面板
window['common_template'].popbtnpanel_template=
'<article id="popbtnpanel_dialog" class="popbtnpanel_dialog">'+
'<div class="modal" id="myPopBtnPanelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
'<div class="container-fluid" style="position: absolute;left:0;bottom:0;width: 100%;margin-bottom: 10px">'+
	'<div id="list-group" class="list-group" style="margin-bottom: 15px">'+
	'</div>'+
	'<div class="popbtnpanel_close_container">'+
		'<button class="popbtnpanel_close_btn" data-dismiss="modal" id="myPopBtnPanelModalCloseBtn">关闭</button>'+
	'</div>'+
'</div>'+
'</div>'+
'</article>';

//弹出日期选择
window['common_template'].datepicker_template=
'<article id="datepicker_dialog" class="datepicker_dialog">'+
'<div class="modal fade" id="myDatePickerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
	'<div class="datepicker_dialog">'+
		'<div class="datepicker_dialog_wrapper">'+
			'<div id="datepicker_core"></div>'+
		'</div>'+
	'</div>'+
'</div>'+
'</article>';

//选择卡号界面
window['common_template'].popselectpanel_selectcard_template=
'<article id="popselectpanel_container" class="popselectpanel_container">'+
'<header>'+
	'<nav>'+
		'<button class="nav_left_btn" onclick="window.scrollTo(0, window.selectPanelScroll);jQuery(\'#popselectpanel_container\').remove();jQuery(\'header,footer,#content\').show();">返回</button>'+
		'<h1 class="nav_title" id="nav_title">请选择卡/账号</h1>'+
	'</nav>'+
'</header>'+
'<div id="content" class="content">'+
	'<div id="scroller" class="scroller">'+
		'{{#each regCardList}}'+
		'{{setIndex @index}}'+
		'<section class="section_padding">'+
				'<ul class="cell_container">'+
					'{{#if cannotSelectFlag}}'+
						'<li class="cell_li">'+
							'<div class="cell_li_left">'+
								'<div class="cell_li_top">{{areaCodeDesc}}&nbsp;{{acctTypeDesc}}&nbsp;{{cardAlias}}</div>'+
								'<div class="cell_li_bottom">{{ftType}}{{cardNumSplit}}</div>'+
							'</div>'+
						'</li>'+
					'{{else}}'+
						'<li class="cell_li_btn" onclick="ICBCUITools.setSelectCardValue(\'{{../../name}}\',\'{{../../source}}\',1,{{@index}},0)">'+
							'<div class="cell_li_left">'+
								'<div class="cell_li_top">{{areaCodeDesc}}&nbsp;{{acctTypeDesc}}&nbsp;{{cardAlias}}</div>'+
								'<div class="cell_li_bottom">{{ftType}}{{cardNumSplit}}</div>'+
							'</div>'+
						'</li>'+
					'{{/if}}'+	
					'{{#each this.regAccountList}}'+
					'<li class="cell_li_left_arrow_btn" onclick="ICBCUITools.setSelectCardValue(\'{{../../name}}\',\'{{../../source}}\',2,{{../index}},{{@index}})">'+
						'<div class=cell_li_left>'+
							'<div class="cell_li_top">{{acctTypeDesc}}&nbsp;{{acctAlias}}</div>'+
							'<div class="cell_li_bottom">{{../ftType}}{{acctNumSplit}}</div>'+
						'</div>'+
					'</li>'+
					'{{/each}}'+
				'</ul>'+
		'</section>'+
		'{{/each}}'+
	'</div>'+
'</div>'+
'<footer>'+
'</footer>'+
'</article>';

//选择人行卡号界面
window['common_template'].popselectpanel_selectrencard_template=
'<article id="popselectpanel_container" class="popselectpanel_container">'+
'<header>'+
	'<nav>'+
		'<button class="nav_left_btn" onclick="window.scrollTo(0, window.selectPanelScroll);jQuery(\'#popselectpanel_container\').remove();jQuery(\'header,footer,#content\').show();">返回</button>'+
		'<h1 class="nav_title" id="nav_title">请选择卡/账号</h1>'+
	'</nav>'+
'</header>'+
'<div id="content" class="content">'+
	'<div id="scroller" class="scroller">'+
		'{{#each renRegCardList}}'+
		'{{setIndex @index}}'+
		'<section class="section_padding">'+
				'<ul class="cell_container">'+
					'<li class="cell_li_btn" onclick="ICBCUITools.setSelectRenCardValue(\'{{../name}}\',\'{{../source}}\',{{@index}})">'+
						'<div class="cell_li_left">'+
							'<div class="cell_li_top">{{bankName}}&nbsp;{{alias}}</div>'+
							'<div class="cell_li_bottom">{{acctNum}}</div>'+
						'</div>'+
					'</li>'+
				'</ul>'+
		'</section>'+
		'{{/each}}'+
	'</div>'+
'</div>'+
'<footer>'+
'</footer>'+
'</article>';

//弹出选择分组界面
window['common_template'].popselectpanel_selectgroup_template=
'<article id="popselectpanel_container" class="popselectpanel_container">'+
'<header>'+
	'<nav>'+
		'<button class="nav_left_btn" onclick="window.scrollTo(0, window.selectPanelScroll);jQuery(\'#popselectpanel_container\').remove();jQuery(\'header,footer,#content\').show();">返回</button>'+
		'<h1 class="nav_title" id="nav_title">请选择</h1>'+
	'</nav>'+
'</header>'+
'<div id="content" class="content">'+
	'<div id="scroller" class="scroller">'+
		'<section class="section_datatable">'+
			'{{#each groupList}}'+
			'{{setIndex @index}}'+
			'<table class="datatable">'+
				'<thead><tr class="main_title"><th align="left">{{groupName}}</th></tr>'+
				'<tbody>'+
				'{{#each data}}'+
					'<tr class="datatable_tr_btn" onclick="ICBCUITools.setSelectGroupValue(\'{{../../name}}\',\'{{../../source}}\',{{../index}},{{@index}})"><td>{{name}}</td></tr>'+
				'{{/each}}'+
				'</tbody>'+
			'</table>'+
			'{{/each}}'+
		'</section>'+
	'</div>'+
'</div>'+
'<footer>'+
'</footer>'+
'</article>';

//弹出选择界面
window['common_template'].popselectpanel_template=
'<article id="popselectpanel_container" class="popselectpanel_container">'+
'<header>'+
	'<nav>'+
		'<button class="nav_left_btn" onclick="window.scrollTo(0, window.selectPanelScroll);jQuery(\'#popselectpanel_container\').remove();jQuery(\'header,footer,#content\').show();">返回</button>'+
		'<h1 class="nav_title" id="nav_title">请选择</h1>'+
	'</nav>'+
'</header>'+
'<div id="content" class="content">'+
	'<div id="scroller" class="scroller">'+
		'<section class="section_padding">'+
				'<ul class="cell_container">'+
					'{{#each source}}'+
					'<li class="cell_li_btn" onclick="ICBCUITools.setSelectValue(\'{{../name}}\',{{@index}})">'+
						'<div class="cell_li_left">{{name}}</div>'+
					'</li>'+
					'{{/each}}'+
				'</ul>'+
		'</section>'+
	'</div>'+
'</div>'+
'<footer>'+
'</footer>'+
'</article>';

//弹出选择联系人界面
window['common_template'].popselectpanel_selectcontact_template=
'<article id="popselectpanel_container" class="popselectpanel_container">'+
'<header>'+
	'<nav>'+
		'<button class="nav_left_btn" onclick="window.scrollTo(0, window.selectPanelScroll);jQuery(\'#popselectpanel_container\').remove();jQuery(\'header,footer,#content\').show();">返回</button>'+
		'<h1 class="nav_title" id="nav_title">请选择</h1>'+
	'</nav>'+
'</header>'+
'<div id="content" class="content">'+
	'<div id="scroller" class="scroller">'+
		'<section class="section_datatable">'+
			'<table class="datatable">'+
				'<thead><tr class="main_title"><th align="left">联系人</th><th align="right">手机号</th></tr>'+
				'{{#if source.contactList}}'+
					'<tbody>'+
					'{{#each source.contactList}}'+
						'<tr class="datatable_tr_btn" onclick="ICBCUITools.setSelectContactValue(\'{{../name}}\',{{@index}})"><td align="left">{{contact}}</td><td align="right">{{PhoneNumber}}</td></tr>'+
					'{{/each}}'+
					'</tbody>'+					
				'{{else}}'+
					'<tfoot>'+
					'<tr id="noResult"><td colspan="2">暂无联系人信息</td></tr>'+
					'</tfoot>'+				
				'{{/if}}'+
			'</table>'+
		'</section>'+
	'</div>'+
'</div>'+
'<footer>'+
'</footer>'+
'</article>';
//弹出选择联系人界面
window['common_template'].popselectpanel_selectcontactemail_template=
'<article id="popselectpanel_container" class="popselectpanel_container">'+
'<header>'+
	'<nav>'+
		'<button id="selectcontactemailbackbtn" class="nav_left_btn" onclick="window.scrollTo(0, window.selectPanelScroll);jQuery(\'#popselectpanel_container\').remove();jQuery(\'header,footer,#content\').show();">返回</button>'+
		'<h1 class="nav_title" id="nav_title">请选择</h1>'+
	'</nav>'+
'</header>'+
'<div id="content" class="content">'+
	'<div id="scroller" class="scroller">'+
		'<section class="section_datatable">'+
			'<table class="datatable">'+
				'<thead><tr class="main_title"><th align="left">联系人</th><th align="right">电子邮箱</th></tr>'+
				'{{#if source.contactList}}'+
					'<tbody>'+
					'{{#each source.contactList}}'+
						'<tr class="datatable_tr_btn" onclick="ICBCUITools.setSelectContactEmailValue(\'{{../name}}\',{{@index}})"><td align="left">{{contact}}</td><td align="right">{{Email}}</td></tr>'+
					'{{/each}}'+
					'</tbody>'+					
				'{{else}}'+
					'<tfoot>'+
					'<tr id="noResult"><td colspan="2">暂无联系人信息</td></tr>'+
					'</tfoot>'+				
				'{{/if}}'+
			'</table>'+
		'</section>'+
	'</div>'+
'</div>'+
'<footer>'+
'</footer>'+
'</article>';
//弹出选择联系人界面（多选）
window['common_template'].popselectpanel_selectmulticontact_template=
'<article id="popselectpanel_container" class="popselectpanel_container">'+
'<header>'+
	'<nav>'+
		'<button class="nav_left_btn" onclick="window.scrollTo(0, window.selectPanelScroll);jQuery(\'#popselectpanel_container\').remove();jQuery(\'header,footer,#content\').show();">返回</button>'+
		'<h1 class="nav_title" id="nav_title">请选择</h1>'+
		'<button class="nav_right_btn" onclick="ICBCUITools.setSelectMultiContactValue(\'{{name}}\')">完成</button>'+
	'</nav>'+
'</header>'+
'<div id="content" class="content">'+
	'<div id="scroller" class="scroller">'+
		'<section class="section_datatable">'+
			'<table class="datatable">'+
				'<thead><tr class="main_title"><th align="left">联系人</th><th align="right">手机号</th><th align="right">选择</th></tr>'+
				'{{#if source.contactList}}'+
					'<tbody>'+
					'{{#each source.contactList}}'+
						'<tr class="datatable_tr"><td align="left">{{contact}}</td><td align="right">{{PhoneNumber}}</td><td align="right"><input type="checkbox" name="selectMultiContactCheckBox" value="{{@index}}"/></td></tr>'+
					'{{/each}}'+
					'</tbody>'+					
				'{{else}}'+
					'<tfoot>'+
					'<tr id="noResult"><td colspan="3">暂无联系人信息</td></tr>'+
					'</tfoot>'+				
				'{{/if}}'+
			'</table>'+
		'</section>'+
	'</div>'+
'</div>'+
'<footer>'+
'</footer>'+
'</article>';


//弹出回单输入email页面
window['common_template'].pop_ebill_transmit_email_panel_template=
'<article id="popselectpanel_container" class="popselectpanel_container">'+
'<header>'+
'<nav>'+
	'<button id="returnButton" class="nav_left_btn" onclick="window.scrollTo(0, window.selectPanelScroll);jQuery(\'#popselectpanel_container\').remove();jQuery(\'header,footer,#content\').show();">返回</button>'+
	'<h1 class="nav_title" id="nav_title">回单转发</h1>'+
	'<button class="nav_right_btn" onclick="sendEbillEmail()">确定</button>'+
'</nav>'+
'</header>'+
'<div id="content" class="content">'+
'<div id="scroller" class="scroller">'+
	'<section class="section_padding">'+
		'<ul class="cell_container">'+
			'<li>'+
				'<div class="cell_li_left">'+
					'<div class="il vl_mid">电子邮箱地址</div>'+
				'</div>'+
				'<div class="cell_li_right">'+
					'<input type="text" id="ebillEmail" name="ebillEmailTmp" value="" placeholder="请输入" maxlength="40" size="20" />'+
					'<button id="readEmailBtn" style="margin-left:8px" class="contact_btn" onclick="readEmail()"></button>'+
				'</div>'+
			'</li>'+
		'</ul>'+
	'</section>'+
'</div>'+
'</div>'+
'<footer></footer>'+
'</article>';

//弹出验签页面
window['common_template'].tranauthen_dialog=
'<article id="tranAuthenDialog">'+
'<style>'+
'.border_input{'+
'	margin-top:5px;'+
'	position:relative;'+
'}'+
'.border_input_layout{'+
'	width:180px;height:30px;border:1px #e5e5e5 solid;margin:0 auto;'+
'}'+
'.border_input_layout_inner{'+
'	position:absolute;bottom:0;top:0;right:0;left:0;margin:0 auto;'+
'	width:180px;'+
'}'+
'.border_input_layout div{'+
'	height:29px;border-right:1px #e5e5e5 solid;float:left;width:16.6%;font-size:1.5rem;line-height:1.95rem;text-align:center;'+
'}'+
'.border_input_layout div:last-child{'+
'	border-right:0px;'+
'}'+
'.border_input_core{'+
'	width:100%;height:31px;font-size:0.1px !important;color:transparent !important;'+
'}'+
'.authen_tip{'+
'	margin:0 auto;text-indent:2rem;line-height:16px;font-size:0.85rem;'+
'}'+
'.authen_tip img{'+
'	margin:5px auto;max-width:100%;display:inherit;'+
'}'+
'.modal{'+
'	position: absolute;'+
'}'+
'#errorTips{'+
'	color:#FF7B7B;text-align:center;margin:8px 0;'+
'}'+
'</style>'+
'<div class="modal fade modal_wrapper" id="myTranAuthenDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
'<div class="modal-dialog" style="vertical-align:top;padding-top:20px">'+
'<div class="modal-content">'+
'  <div class="modal-header" style="border-bottom:1px solid #e5e5e5;padding:5px;">'+
'    <h4 class="modal-title" id="myModalLabel" style="font-size:1rem">'+
'		{{#compare tranAuthenInfoData.authenFlag "==" 1}}'+
'			{{#compare tranAuthenInfoData.epayFlag "==" 0}}'+
'				{{#compare tranAuthenInfoData.custAuthenType "==" 0}}请输入支付密码{{/compare}}'+
'				{{#compare tranAuthenInfoData.custAuthenType "==" 2}}请输入口令卡密码	{{/compare}}'+
'				{{#compare tranAuthenInfoData.custAuthenType "==" 3}}请进行U盾验证{{/compare}}'+
'				{{#compare tranAuthenInfoData.custAuthenType "==" 4}}请输入电子密码器密码{{/compare}}'+
'			{{else}}'+
'				请输入短信验证码'+
'			{{/compare}}'+
'		{{else}}'+
'			请确认以下信息'+
'		{{/compare}}'+
'	</h4>'+
'  </div>'+
'  <div class="modal-body" id="myModalMsg" style="padding:0px">'+
'  	<div id="modal-tips" class="modal-body-top break_txt" style="max-height:320px;overflow-x:hidden;overflow-y:scroll">'+
'		{{#each tipsArray}}'+
'   		<div class="row">'+
'  				<div class="touchscroll col-xs-4 gray_txt">{{key}}</div>'+
'  				<div class="touchscroll col-xs-8 {{#compare strong "==" true}}pink_txt large_txt{{/compare}}">{{value}}</div>'+
'  			</div>'+
'		{{/each}}'+
'  	</div>'+
'	{{#compare tranAuthenInfoData.authenFlag "==" 1}}'+
'  	<div class="modal-body-bottom">'+
'		{{#compare tranAuthenInfoData.epayFlag "==" 0}}'+
'			{{#compare tranAuthenInfoData.custAuthenType "==" 0}}'+
'	  		<!-- 支付密码 -->'+
'			<div>'+
'	  			<input placeholder="请输入支付密码" name="{{tranAuthenInfoData.inputName}}" type="password" maxlength="30" style="border: 1px solid #e5e5e5;width: 100%;direction: ltr;text-align: left;padding: 5px;"/>'+
'				<div id="errorTips"></div>'+
'			</div>'+
'	  		{{/compare}}'+
'			{{#compare tranAuthenInfoData.custAuthenType "==" 2}}'+
'	  		<!-- 口令卡 -->'+
'	  		<div style="text-align:center;">'+
'				<div style="display: inline-block;">'+
'	      			<div style="float:left">'+
'	      				<img style="margin-top:11px" src="{{tranAuthenInfoData.dynaImgUrl}}"/>'+
'	      			</div>'+
'	      			<div style="float:left;margin-left:10px;">'+
'	      				<div class="border_input">'+
'	      					<div class="border_input_layout" id="border_input_layout">'+
'		      					<div></div><div></div><div></div><div></div><div></div><div></div>'+
'	      					</div>'+
'		      				<span class="border_input_layout_inner">'+
'		      					<input pattern="[0-9]*" class="border_input_core" placeholder=" " name="{{tranAuthenInfoData.inputName}}" type="password" maxlength="6"/>'+
'		      				</span>'+
'	      				</div>'+
'	      			</div>'+
'	      		</div>'+
'				{{#compare tranAuthenInfoData.displayMsgFlag "==" 1}}'+
'					<div>提示:{{tranAuthenInfoData.displayMsg}}</div>'+
'				{{/compare}}'+
'				<div id="errorTips"></div>'+
'	  		</div>'+
'	  		{{/compare}}'+
'			{{#compare tranAuthenInfoData.custAuthenType "==" 3}}'+
'	  		<!-- U盾验签提示 -->'+
'	  		<div class="text-center break-all">请插好您的音频U盾，点击确定键进行验证</div>'+
'			<div id="errorTips"></div>'+
'	  		{{/compare}}'+
'			{{#compare tranAuthenInfoData.custAuthenType "==" 4}}'+
'	  		<!-- 密码器-->'+
'			<div>'+
'				<div class="authen_tip">'+
'					{{#compare tranAuthenInfoData.challengeType "==" 1}}'+
'						<div>{{tranAuthenInfoData.challengeText}}</div>'+
'					{{else}}'+
'						<div>{{tranAuthenInfoData.tradeChallengeText1}}</div>'+
'						<div style="text-align:center;"><img src="{{tranAuthenInfoData.tokenImgUrl}}"/></div>'+
'						<div>{{tranAuthenInfoData.tradeChallengeText2}}</div>'+
'					{{/compare}}'+
'				</div>'+
'				<div class="border_input">'+
'					<div class="border_input_layout" id="border_input_layout">'+
'	  					<div></div><div></div><div></div><div></div><div></div><div></div>'+
'					</div>'+
'	  				<span class="border_input_layout_inner">'+
'	  					<input pattern="[0-9]*" class="border_input_core" name="{{tranAuthenInfoData.inputName}}" type="password" placeholder=" " maxlength="6"/>'+
'	  				</span>	      					'+
'				</div>'+
'				<div id="errorTips"></div>'+
'	  		</div>'+
'	  		{{/compare}}'+
'		{{else}}'+
'	  		<!-- e支付 -->'+
'			<div>'+
'				<div class="authen_tip" id="epay_authen_tip">'+
'					已向您 {{tranAuthenInfoData.ePayMobileString}}手机发送短信验证码（编号{{tranAuthenInfoData.ePayPassNoString}}），如果<span class="red_txt bold_txt" id="countDown"></span>秒内未收到我行发送的验证码，请点击<button id="resendButton" class="gray_small_btn" disabled="disabled">重新发送</button>'+
'				</div>'+
'				<div class="border_input">'+
'					<div class="border_input_layout" id="border_input_layout">'+
'	  					<div></div><div></div><div></div><div></div><div></div><div></div>'+
'					</div>'+
'	  				<span class="border_input_layout_inner">'+
'	  					<input pattern="[0-9]*" class="border_input_core" placeholder=" " name="{{tranAuthenInfoData.inputName}}" type="text" maxlength="6" data-smscode="{{tranAuthenInfoData.ePayPassNoString}}"/>'+
'	  				</span>	      					'+
'				</div>'+
'				<div id="errorTips"></div>'+
'	  		</div>'+
'		{{/compare}}'+
'  	</div>'+
'	{{/compare}}'+
'	{{#compare tranAuthenInfoData.authenFlag "==" 0}}'+
'		{{#compare tranAuthenInfoData.noAuthenFlag "==" 1}}'+
'			<!-- 免签提示 -->'+
'			<div class="modal-body-bottom"><div class="text-center break-all" style="margin-bottom:3px">{{tranAuthenInfoData.noAuthenMsg}}</div></div>'+
'		{{/compare}}'+
'	{{/compare}}'+
'  </div>'+
'  <div class="modal-footer">'+
'    <button type="button" class="modal-cancel-btn" id="myModalCancelBtn">取消</button>'+
'    <button type="button" class="modal-ok-btn" id="myModalOkBtn">确定</button>'+
'  </div>'+
'</div>'+
'</div>'+
'</div>‍'+
'</article>';