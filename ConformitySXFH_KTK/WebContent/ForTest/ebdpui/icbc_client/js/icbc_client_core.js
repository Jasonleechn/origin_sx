window['mode']='test';//test测试模式,normal正常模式
window.onerror = function(sMessage,sUrl,sLine) {
	if(ICBCUtilTools.isTestMode()){
		alert("line:"+sLine+" info:"+sMessage);
	}
};
jQuery(document).ready(function() {
	//页面加载时候初始化
	ICBCInitTools.init();
	jQuery(window).resize(function() {
		ICBCInitTools.restScreen(undefined,"restScreen");
	});
});
// 初始化工具类
var ICBCInitTools = {
	init : function() {
		ICBCUtilTools.decodeWindowUserAgent();
		if(ICBCUtilTools.isCollegeClient()){
			window.alert1=window.alert;
			window.alert = ICBCUITools.showCollegeAlertDialog;
			window.confirm = ICBCUITools.showConfirmDialog;
			this.initPopSelectPanel();
			this.initNativeObject();
			this.initFormSubmit();
			this.initCustomEdit();
			this.initStudentValidate();
		}else{	
			window.alert1=window.alert;
			window.alert = ICBCUITools.showAlertDialog;
			window.confirm = ICBCUITools.showConfirmDialog;
			this.initNativeObject();
			this.initCellStyle();
			this.initButtonClickStyle();
			this.initInputText();
			this.initValidate();
			this.initTabBar();
			this.initTabPanel();
			this.initHideAddressBar();
			this.initFormSubmit();
			this.initDetailTable();
			this.initButtonContainer();
			this.initDataTable();
			this.initExpandDataTable();
			this.initPopSelectPanel();
			this.initEbillImage();
			this.initCustomEdit();
			this.restScreen(undefined,true);
		}
	},
	restScreen : function($scope,initFlag){
		if($scope==undefined)
			$scope=jQuery(document);
		if(initFlag==undefined||initFlag==false)
			initFlag="false";
		if(initFlag==true)
			initFlag="true";
		if (ICBCUtilTools.isiPhone()) {
			window.clientType = "iPhone";
			// 初始化iPhone相关信息
			this.initiPhoneStyle($scope,initFlag);
		}
		if (ICBCUtilTools.isAndroid() ) {
			window.clientType = "Android";
			this.initAndroidFixedHeaderStyle($scope,initFlag);
		}
		if (ICBCUtilTools.isWindowsPhone() ) {
			window.clientType = "WindowsPhone";
			this.initWindowsPhoneStyle($scope);
		}
	},
	initiPhoneStyle : function($scope,initFlag) {
		window.fixHeader=true;
		var headerHeight = $scope.find('header').height();
		window.setHeaderFix=function() {
			$scope.find('header').addClass('iphone_header_fixed');
			$scope.find('#content').addClass('iphone_content_fixed').css('top', headerHeight + 'px');
			$scope.find('footer').addClass('iphone_footer_fixed').css('top', headerHeight + 'px');
		};		
		window.setHeaderNotFix=function() {
			$scope.find('header').removeClass('iphone_header_fixed');
			$scope.find('#content').removeClass('iphone_content_fixed').css('top', '0px');
			$scope.find('footer').removeClass('iphone_footer_fixed').css('top', '0px');
		};
		if(initFlag=="true")
			setHeaderFix.call();
		jQuery('input[type=text],input[type=password],input[type=textarea],textarea,select').bind("focus",window.setHeaderNotFix).bind("focusout",window.setHeaderFix);
	},
	initAndroidFixedHeaderStyle : function($scope,initFlag) {
		window.fixHeader=true;
		//修复头部固定漂移的bug
		setTimeout(function() {
			$scope.find('header').css("top","0px");
		}, 500);		
		window.setHeaderFix=function(){
			var headerHeight = $scope.find('header').height();
			$scope.find('header').addClass('android_header_fixed');
			$scope.find('#content').addClass('android_content_fixed').css('top', headerHeight + 'px');
			$scope.find('footer').addClass('android_footer_fixed').css('top', headerHeight + 'px');
		};
		window.setHeaderNotFix=function(){
			var headerHeight = $scope.find('header').height();
			$scope.find('header').removeClass('android_header_fixed');
			$scope.find('#content').removeClass('android_content_fixed').css('top', '0px');
			$scope.find('footer').removeClass('android_footer_fixed').css('top', '0px');
		};
		if(initFlag=="true"){
			setHeaderFix.call();
		}
		$scope.find('input[type=text],input[type=password],input[type=textarea],textarea,select').bind("focus",window.setHeaderNotFix).bind("focusout",window.setHeaderFix);
		jQuery('body').bind('maskShow', window.setHeaderNotFix).bind('maskHide', window.setHeaderFix);
	},
	initWindowsPhoneStyle : function($scope) {
		ICBCInitTools.initFooterForWindowsPhone($scope);
	},
	// 调整Footer
	initFooterForWindowsPhone : function($scope){
	},
	initNativeObject:function(){
		//非Android版本需要初始化Native对象
		if(!ICBCUtilTools.isAndroid()){
			window.Native={
				returnBack:function() {
					if(ICBCUtilTools.isiPhone()){
						ICBCPageTools.iOSExcuteNativeMethod("Native://returnBack=1");
						if(!ICBCUtilTools.isICBCOpenNewClient()){
							var returnForm=jQuery("<form name='returnMenu' method='post' action='/ICBCWAPBank/servlet/WAPReqServlet'><input type='hidden' name='returnMenu' value='1'/></form>");
							returnForm.submit();
						}
					}else if(ICBCUtilTools.isWindowsPhone()){
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"back\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				returnMenu:function() {
					if(ICBCUtilTools.isiPhone()){
						ICBCPageTools.iOSExcuteNativeMethod("Native://returnMenu=1");
						if(!ICBCUtilTools.isICBCOpenNewClient()){
							var returnForm=jQuery("<form name='returnMenu' method='post' action='/ICBCWAPBank/servlet/WAPReqServlet'><input type='hidden' name='returnMenu' value='2'/></form>");
							returnForm.submit();
						}
					}else if(ICBCUtilTools.isWindowsPhone()){
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"menu\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				returnLogin:function() {
					if(ICBCUtilTools.isiPhone()){
						ICBCPageTools.iOSExcuteNativeMethod("Native://returnLogin=1");
						if(!ICBCUtilTools.isICBCOpenNewClient()){
							var returnForm=jQuery("<form name='returnMenu' method='post' action='/ICBCWAPBank/servlet/WAPReqServlet'><input type='hidden' name='returnMenu' value='3'/></form>");
							returnForm.submit();
						}
					}else if(ICBCUtilTools.isWindowsPhone()){					
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"login\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				returnToTarget:function(targetMenuID) {
					if(ICBCUtilTools.isiPhone()){
						ICBCPageTools.iOSExcuteNativeMethod("Native://returnToTargetMenu=1&targetMenuID="+targetMenuID);						
					}else if(ICBCUtilTools.isWindowsPhone()){					
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"target\",\"menuid\":\""+targetMenuID+"\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				returnToTarget:function(targetMenuID,forceLoginFlag) {
					if(ICBCUtilTools.isiPhone()){
						ICBCPageTools.iOSExcuteNativeMethod("Native://returnToTargetMenu=1&targetMenuID="+targetMenuID+"&forceLoginFlag="+forceLoginFlag);						
					}else if(ICBCUtilTools.isWindowsPhone()){					
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"target\",\"menuid\":\""+targetMenuID+"\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				returnToTarget:function(targetMenuID,forceLoginFlag,targetParams) {
					if(ICBCUtilTools.isiPhone()){
						ICBCPageTools.iOSExcuteNativeMethod("Native://returnToTargetMenu=1&targetMenuID="+targetMenuID+"&forceLoginFlag="+forceLoginFlag+"&targetParams="+targetParams);						
					}else if(ICBCUtilTools.isWindowsPhone()){					
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"target\",\"menuid\":\""+targetMenuID+"\",\"targetParams\":\""+targetParams+"\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				setScreenOrientationSensor:function() {
					if(ICBCUtilTools.isiPhone()){
						var dummy1 = document.dummy;
						if(dummy1==undefined){
							var body1 = jQuery("body");	
							body1.append('<iframe id="dummy" name="dummy" style="display:none"></iframe>');
						}
						var authForm = 	jQuery("<form name='authForm' method='post' action='/ICBCWAPBank/servlet/WAPReqServlet' target='dummy'><input type='hidden' name='sensor' value='0'/></form>");
						authForm.submit();						
					}else if(ICBCUtilTools.isWindowsPhone()){					
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"sensor\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				setScreenOrientationLandscape:function() {
					if(ICBCUtilTools.isiPhone()){
						var dummy1 = document.dummy;
						if(dummy1==undefined){
							var body1 = jQuery("body");	
							body1.append('<iframe id="dummy" name="dummy" style="display:none"></iframe>');
						}
						var authForm = 	jQuery("<form name='authForm' method='post' action='/ICBCWAPBank/servlet/WAPReqServlet' target='dummy'><input type='hidden' name='sensor' value='2'/></form>");
						authForm.submit();	
					}else if(ICBCUtilTools.isWindowsPhone()){						
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"landscape\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				setScreenOrientationPortrait:function() {
					if(ICBCUtilTools.isiPhone()){
						var dummy1 = document.dummy;
						if(dummy1==undefined){
							var body1 = jQuery("body");	
							body1.append('<iframe id="dummy" name="dummy" style="display:none"></iframe>');
						}
						var authForm = 	jQuery("<form name='authForm' method='post' action='/ICBCWAPBank/servlet/WAPReqServlet' target='dummy'><input type='hidden' name='sensor' value='1'/></form>");
						authForm.submit();							
					}else if(ICBCUtilTools.isWindowsPhone()){					
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"portrait\"}'}";
						window.external.notify(result);
						return false;
					}
				},
				jumpToConformity:function(data) {
					if(ICBCUtilTools.isiPhone()){
						//iPhone未实现，预留
						ICBCPageTools.iOSExcuteNativeMethod("Native://goToConformity=1&data="+data);		
					}else if(ICBCUtilTools.isWindowsPhone()){					
						var result = "{'type':'nativerequest','requestObject':'{\"type\":\"conformity\",\"param\":\""+data+"\"}'}";
						window.external.notify(result);
						return false;
					}
				},
			};
		}
	},
	// 为按钮点击事件绑定效果
	initButtonClickStyle : function() {
		// 非WP版本要有点击效果
		if(!ICBCUtilTools.isWindowsPhone()){
			jQuery(document).on('touchstart mousedown','.normal_btn,.date_tab,.nav_left_btn,.nav_right_btn,.nav_right_menu_btn,.red_btn,.blue_btn,.gray_btn,.orange_btn,.gray_small_btn,.green_add_btn,.info_btn,.try_btn,.payee_btn,.contact_btn,.blue_arrow_btn,.red_reduce_btn,.popbtnpanel_btn,.popbtnpanel_close_btn,.header_select_right_btn,.header_select_left_btn,.nav_share_btn,.nav_share_btn2,.nav_filter_btn,.datatable_card_container_btn,.nav_search_bar_btn,.nav_right_more_btn', function(e) {
				if(this.className.indexOf('_click')<0){
					this.clickClassName=this.className+'_click';
					jQuery(this).addClass(this.clickClassName);
				}
			}).on('touchend touchmove mouseup','.normal_btn,.date_tab,.nav_left_btn,.nav_right_btn,.nav_right_menu_btn,.red_btn,.blue_btn,.gray_btn,.orange_btn,.gray_small_btn,.green_add_btn,.info_btn,.try_btn,.payee_btn,.contact_btn,.blue_arrow_btn,.red_reduce_btn,.popbtnpanel_btn,.popbtnpanel_close_btn,.header_select_right_btn,.header_select_left_btn,.nav_share_btn,.nav_share_btn2,.nav_filter_btn,.datatable_card_container_btn,.nav_search_bar_btn,.nav_right_more_btn', function(e) {
				jQuery(this).removeClass(this.clickClassName);
			});
			//下面比较特殊
			jQuery(document).on('touchstart mousedown','.cell_li_btn', function(e) {
				jQuery(this).addClass("cell_li_btn_click");
			}).on('touchend touchmove mouseup','.cell_li_btn', function(e) {
				jQuery(this).removeClass("cell_li_btn_click");
			});			
			jQuery(document).on('touchstart mousedown','.cell_li_left_arrow_btn', function(e) {
				jQuery(this).addClass("cell_li_left_arrow_btn_click");
			}).on('touchend touchmove mouseup','.cell_li_left_arrow_btn', function(e) {
				jQuery(this).removeClass("cell_li_left_arrow_btn_click");
			});			
			jQuery(document).on('touchstart mousedown','.product_info', function(e) {
				jQuery(this).addClass("product_info_click");
			}).on('touchend touchmove mouseup','.product_info', function(e) {
				jQuery(this).removeClass("product_info_click");
			});			
			if(jQuery('.switch_button_label').length>0){
				this.switchButton();
			}
			jQuery(document).on('click','.nav_right_more_btn',function(event){
				event.preventDefault();
				var screenHidden = jQuery('#nav_more_screenHidden');
				if (screenHidden!=undefined&&screenHidden.length > 0) {
					screenHidden.remove();
				}
				var loginStatus=jQuery(this).attr("login_status");		    	
		    	//在此进行判断是否是登录状态  0 代表未登录，1代表登陆
				var moreMenuHtml="";
				moreMenuHtml =
	    		"<div id='nav_more_screenHidden' class='nav_more_screenHidden'>"+
	    		"<div id='nav_right_more_btn_content' class='nav_right_more_btn_content'>" +
	    		"<b></b>";			
		    	if(loginStatus=='1'){
		    		moreMenuHtml+=
	                "<p id='home'><span>首页</span></p>" +
	    			"<p id='safeexit' ><span>退出</span></p>" +
	    			"<p id='qrcode'><span>扫一扫</span></p>" +
	    			"<p id='onlineservice'><span>在线客服</span></p>" ;
		    	}else if(loginStatus!='1'){
		    		moreMenuHtml+=
	    			"<p id='login'><span>登录</span></p>" +
	    			"<p id='home'><span>首页</span></p>" +
	    			"<p id='qrcode'><span>扫一扫</span></p>" +
	    			"<p id='onlineservice'><span>在线客服</span></p>";
			    }
		    	moreMenuHtml+=
	    		"</div> "+
	    		"</div>";	
		    	var $moreMenuHtml=jQuery(moreMenuHtml);
		    	$moreMenuHtml.find('#home').click(function(){
		    		ICBCPageTools.nativeMenu();
		    	});
		    	$moreMenuHtml.find('#safeexit').click(function(){
		    		ICBCPageTools.nativeSafeExit();
		    	});
		    	$moreMenuHtml.find('#qrcode').click(function(){
		    		ICBCPageTools.nativeToTargetMenu({
		    			'targetMenuID':'_native_qrcode'
		    		});
		    	});
		    	$moreMenuHtml.find('#onlineservice').click(function(){
		    		ICBCPageTools.nativeToTargetMenu({
		    			'targetMenuID':'_native_onlineservice'
		    		});
		    	});
		    	$moreMenuHtml.find('#login').click(function(){
		    		ICBCPageTools.nativeToTargetMenu({
		    			'targetMenuID':'_native_login'
		    		});
		    	});
		    	$moreMenuHtml.click(function(e) {			    		
		    		$moreMenuHtml.remove();
		    		ICBCUITools.scrollOn();
				});
				jQuery('body').append($moreMenuHtml);	
		    	jQuery(".nav_more_screenHidden").show();	
		    	ICBCUITools.scrollOff();
			});
		}
	},
	//初始化滑动开关事件
	switchButton: function (){
		  jQuery('.switch_button_label').each(function(){
			  var touches=undefined;
			  var touchMove = function(event) {
			  	event.preventDefault();
			  	if(!event.touches.length){
				  	return;
			 	}else{
			 		touches = event.touches;
			 	}
			  }; 
			  var touchEnd = function(event) {
			  	 if(touches!=undefined&&touches.length>0){
				  	event.preventDefault();
				  	jQuery("#"+jQuery(this).attr("for"))[0].click();
		 	  	 }
			  };
			  jQuery(this)[0].addEventListener("touchend", touchEnd);
			  jQuery(this)[0].addEventListener("touchmove", touchMove);
		  });
	},
	// 初始化Cell样式
	initCellStyle : function() {
		// 获取cell
		var cellContainer = jQuery('.cell_container');
		if (cellContainer.length > 0) {
			cellContainer.each(function() {
				var $cell=jQuery(this);
				var removeClass="cell_container_li_first cell_container_li_last cell_container_li_only";
				var $cellLiVisible=$cell.find('li:visible');
				if($cellLiVisible.length>1){
					$cellLiVisible.each(function(index){
						if(index==0){
							jQuery(this).removeClass(removeClass).addClass("cell_container_li_first");
						}else if(index==$cellLiVisible.length-1){
							jQuery(this).removeClass(removeClass).addClass("cell_container_li_last");
						}else{
							jQuery(this).removeClass(removeClass);
						}
					});
				}else if($cellLiVisible.length==1){
					jQuery($cellLiVisible[0]).removeClass(removeClass).addClass("cell_container_li_only");
				};
			});
		};
	},
	
	//为tabpanel按钮点击事件绑定效果
	initTabPanel :function(){
			var tabBarPanel = jQuery('.table_panel').find('ul').find('li');
		if(tabBarPanel.length >0){
			//为每个 li添加绑定事件
			var fixFlag= true;
			tabBarPanel.each(function(){
				var current = this;
		
				var text=jQuery(this).text().replace(/(^\s*)|(\s*$)/g,"");				
				if(text.length>4){
					if(fixFlag){
						tabBarPanel.each(function() {jQuery(this).css("font-size","0.9em");});
						fixFlag=false;
					}
				}
				if(current.className=='table_panel_tab_click'&&!ICBCUtilTools.isWindowsPhone())					
					current.disabled=true;
			
				jQuery(current).bind('click', function() {
					if(!ICBCUtilTools.isWindowsPhone())
						current.disabled=true;
					jQuery(current).removeClass('table_panel_tab');
					jQuery(current).addClass('table_panel_tab_click');
					tabBarPanel.each(function() {
						if(this!==current){
							if(!ICBCUtilTools.isWindowsPhone())
								this.disabled=false;
							jQuery(this).removeClass('table_panel_tab_click');
							jQuery(this).addClass('table_panel_tab');
						}
					});
				});
			});
		}
		
	},
	// 为tabbar按钮点击事件绑定效果
	initTabBar : function() {
		// 获取tabbar所有按钮
		var tabBarButton = jQuery('.header_tabbar').find('button');
		if (tabBarButton.length > 0) {
			// 为每个按钮绑定点击事件
			var fixFlag=true;
			tabBarButton.each(function() {
				var current = this;
				var text=jQuery(this).text().replace(/(^\s*)|(\s*$)/g,"");				
				if(text.length>4){
					if(fixFlag){
						tabBarButton.each(function() {jQuery(this).css("font-size","0.9em");});
						fixFlag=false;
					}
				}
				if(current.className=='header_tabbar_btn_active'&&!ICBCUtilTools.isWindowsPhone())
					current.disabled=true;
				jQuery(current).bind('click', function() {
					if(!ICBCUtilTools.isWindowsPhone())
						current.disabled=true;
					jQuery(current).removeClass('header_tabbar_btn');
					jQuery(current).addClass('header_tabbar_btn_active');
					tabBarButton.each(function() {
						if(this!==current){
							if(!ICBCUtilTools.isWindowsPhone())
								this.disabled=false;
							jQuery(this).removeClass('header_tabbar_btn_active');
							jQuery(this).addClass('header_tabbar_btn');
						}
					});
				});
			});
		}
		// 获取tabbar所有按钮
		var selectTypeButton = jQuery('.select_type_tabbar').find('button');
		if (selectTypeButton.length > 0) {
			// 为每个按钮绑定点击事件
			var fixFlag=true;
			selectTypeButton.each(function() {
				var current = this;
				var text=jQuery(this).text().replace(/(^\s*)|(\s*$)/g,"");				
				if(text.length>4){
					if(fixFlag){
						selectTypeButton.each(function() {jQuery(this).css("font-size","0.9em");});
						fixFlag=false;
					}
				}
				if(current.className=='header_tabbar_btn_active'&&!ICBCUtilTools.isWindowsPhone())
					current.disabled=true;
				jQuery(current).bind('click', function() {
					if(!ICBCUtilTools.isWindowsPhone())
						current.disabled=true;
					jQuery(current).removeClass('select_type_tabbar_btn');
					jQuery(current).addClass('select_type_tabbar_btn_active');
					selectTypeButton.each(function() {
						if(this!==current){
							if(!ICBCUtilTools.isWindowsPhone())
								this.disabled=false;
							jQuery(this).removeClass('select_type_tabbar_btn_active');
							jQuery(this).addClass('select_type_tabbar_btn');
						}
					});
				});
			});
		}		
	},
	
	
	initButtonContainer:function(){
		// 获取button_container
		var buttonContainer = jQuery('.button_container');
		if (buttonContainer.length > 0) {
			//遍历
			buttonContainer.each(function(index,container){
				$container=jQuery(container);
				var buttons=$container.find("button:visible");
				var rowsize=$container.attr("data-rowsize");
				if(rowsize==undefined)
					rowsize=4;
				if((buttons.length>0&&buttons.length>=rowsize)||(buttons.length>0&&ICBCUtilTools.isWindowsPhone())){
					buttons.remove();
					var buttonArray=[];
					jQuery(buttons).each(function(n,btn){
						buttonArray.push(btn);
					});						
					var table=jQuery('<table style="width:100%;border-spacing:3px;border-collapse:separate;"></table>');
					var buttonsize=buttons.length;
					buttonArray=buttonArray.reverse();
					for(var i=0,n=Math.ceil(buttonsize/rowsize);i<n;i++){
						var tr=jQuery('<tr></tr>');
						var size=(buttons.length>rowsize?rowsize:buttons.length);
						var tdWidth=(100/size).toFixed(0)+"%";
						for(var j=0;j<size;j++){
							var currentBtn=buttonArray.pop();
							jQuery(currentBtn).css({
								"width":"100%",
								"margin":"0px",
							});
							var td=jQuery('<td></td>').append(currentBtn);
							jQuery(td).css({
								"width":tdWidth
							});
							tr.append(td);
						}
						table.append(tr);
					}
					$container.append(table);
				}else if(buttons.length>0&&buttons.length<=rowsize){
					jQuery(buttons).each(function(n,btn){
						var width=(100/buttons.length).toFixed(0)+"%";
						jQuery(btn).css({
							"width":width
						});
					});	
				}
			});
		}
		// 获取button_more_container
		var buttonMoreContainer = jQuery('.button_more_container');
		var ROWMAXSIZE=3;
		if (buttonMoreContainer.length > 0) {
			//遍历
			buttonMoreContainer.each(function(index,container){
				$container=jQuery(container);
				var buttons=$container.find("button:visible");
				if(buttons.length>ROWMAXSIZE){
					buttons.remove();
					var buttonArray=[];
					var buttonMoreArray=[];
					if(buttons.length>7){
						ROWMAXSIZE=2;
						jQuery(buttons).each(function(index,btn){
							if(index<buttons.length-5){
								buttonArray.push(btn);
							}else{
								buttonMoreArray.push(btn);
							}
						});
					}else{
						jQuery(buttons).each(function(index,btn){
							if(index<ROWMAXSIZE-1){
								buttonArray.push(btn);
							}else{
								buttonMoreArray.push(btn);
							}
						});
					}
					var moreButtonParam={};
					for(var i=0;i<buttonMoreArray.length;i++){
						var buttonIndex="button"+(i+1);
						var temp={};
						temp.name=buttonMoreArray[i].innerText;
						temp.func=buttonMoreArray[i].onclick;
						moreButtonParam[buttonIndex]=temp;
					}
					var moreButton=jQuery('<button class="blue_btn">更多</button>');
					moreButton.click(function(){
						ICBCUITools.showPopBtnPanel(moreButtonParam);
					});
					buttonArray.push(moreButton);
					buttonArray=buttonArray.reverse();
					var buttonlength=buttonArray.length;
					var table=jQuery('<table style="width:100%;border-spacing:3px;border-collapse:separate;"></table>');
					for(var i=0,n=Math.ceil(buttonArray.length/ROWMAXSIZE);i<n;i++){
						var tr=jQuery('<tr></tr>');
						var size=(buttonlength>ROWMAXSIZE?ROWMAXSIZE:buttonlength);
						var tdWidth=(100/size).toFixed(0)+"%";
						for(var j=0;j<size;j++){
							var currentBtn=buttonArray.pop();
							jQuery(currentBtn).css({
								"width":"100%",
								"margin":"0px",
							});
							var td=jQuery('<td></td>').append(currentBtn);
							jQuery(td).css({
								"width":tdWidth
							});
							tr.append(td);
						}
						table.append(tr);
					}					
					$container.append(table);
				}else if(buttons.length<=ROWMAXSIZE){
					buttons.remove();
					var buttonArray=[];
					jQuery(buttons).each(function(index,btn){
						buttonArray.push(btn);
					});
					var table=jQuery('<table style="width:100%;border-spacing:3px;border-collapse:separate;"></table>');
					var tr=jQuery('<tr></tr>');
					var tdWidth=(100/ROWMAXSIZE).toFixed(0)+"%";
					for(var j=0;j<buttonArray.length;j++){
						var currentBtn=buttonArray[j];
						jQuery(currentBtn).css({
							"width":"100%",
							"margin":"0px",
						});
						var td=jQuery('<td></td>').append(currentBtn);
						jQuery(td).css({
							"width":tdWidth,
							"padding":"0 2px"
						});
						tr.append(td);
					}
					table.append(tr);
					$container.append(table);
				}
			});
			var buttonHeight=-1;
			$container.find('button').each(function(index,element){
				var temp=jQuery(element).height();
				if(temp>buttonHeight){
					buttonHeight=temp;
				}
			});
			$container.find('button').each(function(index,element){
				jQuery(element).height(buttonHeight);
			});
		}		
	},
	
	initDataTable:function(){
		var datatable = jQuery('.datatable,.datatable_card_style');
		if (datatable.length > 0) {		
			datatable.each(function(index,table){
				var $table=jQuery(table);
				//取所有子标题
				var $th=$table.find('.sub_title th');
				//设置对齐方式
				$th.each(function(index,element){
					var align=jQuery(element).attr('align');
					if(align==undefined){
						align='left';
					}
					jQuery(element).attr('align',align).css("text-align",align);
					$table.find('tbody tr td:nth-child('+(index+1)+')').attr('align',align).css("text-align",align);
				});
				//可点击行
				var $clickTr=$table.find('.datatable_tr_btn:visible');
				//设置点击事件
				if($clickTr.length>0){
					$clickTr.each(function(index,element){
						jQuery(element).find('td:last-child').addClass('datatable_btn');
						jQuery(element).on('touchstart mousedown',function() {
							jQuery(this).addClass('datatable_btn_click');
							jQuery(this).find('td:last-child').addClass('datatable_btn_click2');
						}).on('touchend touchmove mouseup',function() {
							jQuery(this).removeClass('datatable_btn_click');
							jQuery(this).find('td:last-child').removeClass('datatable_btn_click2');
						});
					});
				}
				//显示更多按钮
				var $moreBtn=$table.find('.datatable_more_btn:visible');
				if($moreBtn.length>0){
					$moreBtn.on('touchstart mousedown',function() {
						jQuery(this).find('td').addClass('datatable_more_btn_click');
					}).on('touchend touchmove mouseup',function() {
						jQuery(this).find('td').removeClass('datatable_more_btn_click');
					});					
				}
			});
		}
	},
	
	initExpandDataTable:function(){
		var datatable = jQuery('.expand_datatable');
		if (datatable.length > 0) {		
			datatable.each(function(index,table){
				var $table=jQuery(table);
				$table.find(".expand_datatable_tr:nth-child(even)").hide();
		        $table.find(".expand_datatable_tr:nth-child(odd)").unbind('click').click(function() {
		            $(this).next("tr").toggle();
		            $(this).find("td").toggleClass("expand_datatable_tr_arrow_up");
		        }).on('touchstart mousedown',function(){
		        	jQuery(this).addClass('expand_datatable_tr_click');
		        }).on('touchend touchmove mouseup',function() {
					jQuery(this).removeClass('expand_datatable_tr_click');
				});	
				//显示更多按钮
				var $moreBtn=$table.find('.datatable_more_btn:visible');
				if($moreBtn.length>0){
					$moreBtn.on('touchstart mousedown',function() {
						jQuery(this).find('td').addClass('datatable_more_btn_click');
					}).on('touchend touchmove mouseup',function() {
						jQuery(this).find('td').removeClass('datatable_more_btn_click');
					});					
				}
			});
		}
	},
	initInputText:function(){
		//WindowsPhone需要初始化placeholder
		if(ICBCUtilTools.isWindowsPhone()){
			//WindowsPhone BUG，最大长度不生效
			jQuery('input[type=text],input[type=number],input[type=tel],input[type=password]').each(function(index,element){
				$element=jQuery(element);
				var maxlength=$element.attr("maxlength");
				$element.bind("blur",function(){
					if(maxlength!=undefined){
						var length=element.value.length;
						if(length>maxlength){
							element.value=element.value.substr(0,maxlength);
						}
					}
				});
			});
		}
		//没有设置请输入，默认赋值上
		jQuery('input[type=text],input[type=number],input[type=tel],input[type=password]').each(function(index,element){
			$element=jQuery(element);
			if($element.attr("placeholder")==undefined||$element.attr("placeholder")==""){
				$element.attr("placeholder","请输入");
			}
		});
		if(!ICBCUtilTools.isiPhone()){
			jQuery('input[type=number]').attr('type','text');
		}
	},
	initValidate : function() {
		jQuery.validator.setDefaults({
			// 错误使用alert弹出
			showErrors : function(errorMap, errorList) {
				var msg = "";
				jQuery.each(errorList, function(i, v) {
					if (v.message != "") {
						msg += v.message + "<br/>";
						return;
					}
				});
				if (msg != "") {
					alert("<div style=\"text-indent:0em\">" + msg + "</div>");
					return;
				}
			},
			// 忽略类型
			ignore : "[type=hidden]",
			// 失去焦点不验证
			onfocusout : false,
			// 输入时不验证
			onkeyup : false,
			// 点击时不验证
			onclick:false,
			// 不自动获取焦点
			focusInvalid:false,
			// 提交不验证,不能加否则验签标签有问题
			//onsubmit:false,
		});
		jQuery.validator.addMethod("isMobile", function(value, element) {
			var length = value.length;
			var mobile = /^\d{11}$/;
			return this.optional(element) || (length == 11 && mobile.test(value));
		}, "请输入正确的手机号码");
		jQuery.validator.addMethod("checkSpecial", function(value, element) {
			var length = value.length;
			var special = /^[^<>!@#\\$%\\^&\\*\\|'\"]+$/;
			return this.optional(element) || special.test(value);
		}, "请不要输入非法字符");
	},
	
	initStudentValidate : function() {
		jQuery.validator.setDefaults({
			// 输入错误则在输入框下方提示一句话
			showErrors : function(errorMap, errorList) {
				var msg = "";
				jQuery.each(errorList, function(i, v) {
					if (v.message != "") {
						$("label[name="+v.element.name+']').remove();
						$("input[name="+v.element.name+']').after("<label name="+v.element.name+" for=​"+v.element.name+" class=\"error\">"+v.message+"</label>");
					}
				});
				return;
			},
			// 忽略类型
			ignore : "[type=hidden]",
			// 失去焦点不验证
			onfocusout : false,
			// 输入时不验证
			onkeyup : false,
			// 点击时不验证
			onclick:false,
			// 不自动获取焦点
			focusInvalid:false,
			// 提交不验证,不能加否则验签标签有问题
			//onsubmit:false,
		});
		jQuery.validator.addMethod("isMobile", function(value, element) {
			var length = value.length;
			var mobile = /^\d{11}$/;
			return this.optional(element) || (length == 11 && mobile.test(value));
		}, "请输入正确的手机号码");
		jQuery.validator.addMethod("checkSpecial", function(value, element) {
			var length = value.length;
			var special = /^[^<>!@#\\$%\\^&\\*\\|'\"]+$/;
			return this.optional(element) || special.test(value);
		}, "请不要输入非法字符");
	},
	
	//隐藏地址栏
	initHideAddressBar : function() {
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 300);
	},
	//阻止表单默认提交
	initFormSubmit : function() {
		jQuery('button').attr("type","button");
		jQuery('form').each(function() {
			jQuery(this).removeAttr("onsubmit");
			//兼容iPhone的DatePicker
			if(jQuery(this).attr("name").indexOf("ebdp_iphone_datePicker")<0){
				this.onsubmit = function() {
					return false;
				};
				this.submit=function(){
					return false;
				};
			}
		});
	},
	// 调整detailTable样式
	initDetailTable : function() {
		if(!ICBCUtilTools.isWindowsPhone()){
			jQuery(document).bind('DOMNodeInserted',function(e){
				var className=jQuery(e.target).attr('class');
				if(className!=undefined&&className.indexOf('detail_table')>-1){
					ICBCInitTools.initDetailTable();
				}
			});		
		}
		var detailTable = jQuery('.detail_table');
		if (detailTable.length > 0) {
			detailTable.each(function() {
				var currentTable = jQuery(this);
				var temp = currentTable.find('.detail_td_left');
				jQuery(temp).each(function(index,value){
					jQuery(value).text(jQuery(value).text().replace(/[:：]/g,""));
				});
				if (currentTable.find('.detail_td_center').length > 0) {
					return;
				}
				// 添加冒号
				temp.after('<td class="detail_td_center">：</td>');
			});
		};
	},
	//初始化弹出面板
	initPopSelectPanel:function(){
		var popselectpanel=jQuery('select[data-style=popselectpanel]');
		if(popselectpanel.length>0){
			popselectpanel.each(function(){
				var $select=jQuery(this).hide();
				var name=$select.attr('name');
				name=name.replace('_popselectpaneltmp','');
				jQuery('#'+name+'_selectpanel').remove();
				var $panel=jQuery('<div class="selectpanel" id="'+name+'_selectpanel"><span id="'+name+'_txt"></span><input type="hidden" name="'+name+'" id="'+name+'" value=""/></div>');
				$select.before($panel);
				var type=$select.attr('data-type');
				var source=$select.attr('data-source');
				var defaultValue=$select.attr('data-defaultValue');
				if(source==undefined){
					source=[];
					$select.find('option').each(function(){
						var $option=jQuery(this);
						source.push({"name":$option.text(),"value":$option.val()});
					});
				}
				$select.attr('name',name+'_popselectpaneltmp');
				window[name+'_selectpanel_onchange']=$select.context.onchange;
				ICBCUITools.createPopSelectPanel({
					'$select':$select,
					'$panel':$panel,
					'name':name,
					'type':type,
					'source':source,
					'defaultValue':defaultValue,
				});
			});
		}
	},
	//初始化回单图片
	initEbillImage:function(){
		var ebillImage=jQuery('.ebillImage');
		if(ebillImage.length>0){
			jQuery.each(ebillImage,function(i,e){
				var width = jQuery(window).width();
				jQuery(e).css("width",width+"px");
			});
		}
	},
	initCustomEdit:function(){
		ICBCSafeKeyBoard.initSafeEdit();
		ICBCSafeKeyBoard.initAmountEdit();
	}
};
// UI工具类
var ICBCUITools = {
	createPopSelectPanel:function(param){
		var $panel=param.$panel;
		var $select=param.$select;
		var type=param.type;
		var name=param.name;
		var defaultValue=param.defaultValue;
		var $txt=$panel.find('#'+name+'_txt');
		
		var $value=$panel.find('input[name='+name+']');		
		if(type!=undefined&&type=='selectcard'){//选择卡号模式
			var source=window[param.source];//取数据
			if(typeof(source)=='string')
				source=eval('('+ICBCUtilTools.convertUTF8(source)+')');//转为json
			source.name=name;
			source.source=param.source;
			var regCardList=source.regCardList;//取下挂卡列表
			var result={};
			if(regCardList.length>0){
				var $adclass=$panel.find('span').addClass("arrowhead");
				if(defaultValue!=undefined){
					$txt.html(defaultValue);
					$value.val(defaultValue);
					if(defaultValue!="请选择"){
						var defaultCardOrAcct=$select.attr('data-defaultCardOrAcct');
						if(defaultCardOrAcct==undefined)
							defaultCardOrAcct="0";
						$txt.removeClass('placeholder');
						jQuery.each(regCardList,function(i,n){
							var ftType = regCardList[i].ftType;
							if(n.cardNum==defaultValue&&defaultCardOrAcct!="2"){
								result.cardOrAcct=1;
								result.selectCard=jQuery.extend(true,{},regCardList[i]);
								window[name]={};
								window[name].result=result;
								if(ftType!=undefined){
									$txt.html(ftType+defaultValue);
								}
								return;
							}
							if(regCardList[i].regAccountList.length>0){
								jQuery.each(regCardList[i].regAccountList,function(x,y){
									if(y.acctNum==defaultValue&&defaultCardOrAcct!="1"){
										result.cardOrAcct=2;
										var temp=jQuery.extend(true,{},regCardList[i]);
										temp.regAccountList=jQuery.extend(true,{},regCardList[i].regAccountList[x]);
										result.selectCard=temp;
										window[name]={};
										window[name].result=result;
										if(ftType!=undefined){
											$txt.html(ftType+defaultValue);
										}
										return;
									}
								});
							}
						});
					}else{
						$txt.addClass('placeholder');
					}
				}else{
					var ftType = regCardList[0].ftType;
					if(ftType==undefined){ftType="";}
					$txt.html(ftType + regCardList[0].cardNum);
					$value.val(regCardList[0].cardNum);
					result.cardOrAcct=1;
					result.selectCard=jQuery.extend(true,{},regCardList[0]);
					window[name]={};
					window[name].result=result;
				}
				$panel.click(function(){
					setTimeout(function(){
						jQuery('#popselectpanel_container').remove();
						var template=Handlebars.compile(window['common_template'].popselectpanel_selectcard_template);
						var html=template(source);
						jQuery('header,footer,#content').hide();
						jQuery('body').append(html);
						jQuery('#popselectpanel_container').css({
							width : jQuery(window).width(),
							height : jQuery(window).height(),
						});
						ICBCInitTools.restScreen(jQuery('#popselectpanel_container'),true);
						window.selectPanelScroll=jQuery(document).scrollTop();
						window.scrollTo(0, 1);
					},300);
				});
			}else{
				$txt.html('没有符合条件的卡/账号');
				$value.val('');
			}
		}else if(type!=undefined&&type=='selectrencard'){//选择人行卡号模式
			var source=window[param.source];//取数据
			if(typeof(source)=='string')
				source=eval('('+ICBCUtilTools.convertUTF8(source)+')');//转为json
			source.name=name;
			source.source=param.source;
			var renRegCardList=source.renRegCardList;//取下挂卡列表
			var result={};
			if(renRegCardList.length>0){
				var $adclass=$panel.find('span').addClass("arrowhead");
				if(defaultValue!=undefined){
					if(defaultValue!="请选择"){
						$txt.removeClass('placeholder');
						jQuery.each(renRegCardList,function(i,n){
							if(n.acctNum==defaultValue){
								result.selectCard=jQuery.extend(true,{},renRegCardList[i]);
								window[name]={};
								window[name].result=result;
								$txt.html(n.acctNum);
								$value.val(n.acctNum);
								return;
							}
						});
					}else{
						$txt.addClass('placeholder');
						$txt.html(defaultValue);
						$value.val("");						
					}
				}else{
					$txt.html(renRegCardList[0].acctNum);
					$value.val(renRegCardList[0].acctNum);
					result.selectCard=jQuery.extend(true,{},renRegCardList[0]);
					window[name]={};
					window[name].result=result;
				}
				$panel.click(function(){
					setTimeout(function(){
						jQuery('#popselectpanel_container').remove();
						var template=Handlebars.compile(window['common_template'].popselectpanel_selectrencard_template);
						var html=template(source);
						jQuery('header,footer,#content').hide();
						jQuery('body').append(html);
						jQuery('#popselectpanel_container').css({
							width : jQuery(window).width(),
							height : jQuery(window).height(),
						});
						ICBCInitTools.restScreen(jQuery('#popselectpanel_container'),true);
						window.selectPanelScroll=jQuery(document).scrollTop();
						window.scrollTo(0, 1);
					},300);
				});
			}else{
				$txt.html('没有符合条件的卡/账号');
				$value.val('');
			}
		}else if(type!=undefined&&type=='selectgroup'){
			var source=window[param.source];
			if(typeof(source)=='string')
				source=eval('('+ICBCUtilTools.convertUTF8(source)+')');
			source.name=name;
			source.source=param.source;
			var groupList=source.groupList;
			if(groupList.length>0){
				var $adclass=$panel.find('span').addClass("arrowhead");
				if(defaultValue!=undefined){
					defaultValue=eval('('+ICBCUtilTools.convertUTF8(defaultValue)+')');
					$txt.html(defaultValue.name);
					$value.val(defaultValue.value);
				}else{
					$txt.html(groupList[0].data[0].name);
					$value.val(groupList[0].data[0].value);
				}
				$panel.click(function(){
					setTimeout(function(){
						jQuery('#popselectpanel_container').remove();
						var template=Handlebars.compile(window['common_template'].popselectpanel_selectgroup_template);
						var html=template(source);
						jQuery('header,footer,#content').hide();
						jQuery('body').append(html);
						ICBCInitTools.initDataTable();
						jQuery('#popselectpanel_container').css({
							width : jQuery(window).width(),
							height : jQuery(window).height(),
						});					
						ICBCInitTools.restScreen(jQuery('#popselectpanel_container'),true);
						window.selectPanelScroll=jQuery(document).scrollTop();
						window.scrollTo(0, 1);
					},300);
				});
			}else{
				$txt.html('');
				$value.val('');
			}			
		}else if(type!=undefined&&type=='selectContact'){
			var source='{"contactList":[]}';
			try{
				//目前仅支持Android、iPhone
				if(ICBCUtilTools.isAndroid()){
					source=Native.readContact();
				}else if(ICBCUtilTools.isiPhone()){
					var data={};
					data.source=source;
					data.name=name;
					data.selectContactCallBack=param.selectContactCallBack;
					data.selectContactType=param.selectContactType;
					window[name]={};
					window[name].data=data;
					if(data.selectContactType!=undefined&&data.selectContactType=='multi')
						ICBCPageTools.iOSExcuteNativeMethod("Native://webviewReadContact=1&name="+name+"&callBack=ICBCUITools.setSelectMultiContactValueForiPhone&selectContactType="+param.selectContactType);
					else
						ICBCPageTools.iOSExcuteNativeMethod("Native://webviewReadContact=1&name="+name+"&callBack=ICBCUITools.setSelectContactValueForiPhone&selectContactType=");
					return;
				}
			}catch(e){
			}
			if(typeof(source)=='string')
				source=eval('('+source+')');
			var data={};
			data.source=source;
			data.name=name;
			data.selectContactCallBack=param.selectContactCallBack;
			data.selectContactType=param.selectContactType;
			window[name]={};
			window[name].data=data;
			jQuery('#popselectpanel_container').remove();
			var template;
			if(data.selectContactType!=undefined&&data.selectContactType=='multi')
				template=Handlebars.compile(window['common_template'].popselectpanel_selectmulticontact_template);
			else
				template=Handlebars.compile(window['common_template'].popselectpanel_selectcontact_template);
			var html=template(data);
			jQuery('header,footer,#content').hide();
			jQuery('body').append(html);
			ICBCInitTools.initDataTable();
			jQuery('#popselectpanel_container').css({
				width : jQuery(window).width(),
				height : jQuery(window).height(),
			});					
			ICBCInitTools.restScreen(jQuery('#popselectpanel_container'),true);	
			window.selectPanelScroll=jQuery(document).scrollTop();
			window.scrollTo(0, 1);
		}else if(type!=undefined&&type=='selectContactEmail'){
			var source='{"contactList":[]}';
			try{
				var data={};
				data.name=name;
				data.selectContactEmailCallBack=param.selectContactEmailCallBack;
				data.selectContactEmailBackCallBack=param.selectContactEmailBackCallBack;
				window[name]={};
				window[name].data=data;				
				//目前仅支持Android、iPhone
				if(ICBCUtilTools.isAndroid()){
					try{
						source=Native.readContactEmail();
					}catch(e){}
					ICBCUITools.setSelectContactEmailPoppanel(name,source);
				}else if(ICBCUtilTools.isiPhone()){
					ICBCPageTools.iOSExcuteNativeMethod("Native://webviewReadContactEmail=1&name="+name+"&callBack=ICBCUITools.setSelectContactEmailPoppanel");
				}
			}catch(e){
			}
		}else{
			var source=param.source;
			if(source.length>0){
				var $adclass=$panel.find('span').addClass("arrowhead");
				if(defaultValue!=undefined){
					jQuery.each(source,function(index,element){
						if(element.value==defaultValue){
							$txt.html(element.name);
							$value.val(element.value);
							return;
						}
					});
				}else{
					$txt.html(source[0].name);
					$value.val(source[0].value);
				}
				var data={};
				data.source=source;
				data.name=name;
				window[name]={};
				window[name].data=data;
				$panel.click(function(){
					setTimeout(function(){
						jQuery('#popselectpanel_container').remove();
						var template=Handlebars.compile(window['common_template'].popselectpanel_template);
						var html=template(data);
						jQuery('header,footer,#content').hide();
						jQuery('body').append(html);
						jQuery('#popselectpanel_container').css({
							width : jQuery(window).width(),
							height : jQuery(window).height(),
						});					
						ICBCInitTools.restScreen(jQuery('#popselectpanel_container'),true);
						window.selectPanelScroll=jQuery(document).scrollTop();
						window.scrollTo(0, 1);
					},300);
				});				
			}else{
				$txt.html('');
				$value.val('');				
			}
		}
	},
	setSelectContactEmailPoppanel:function(name,source){
		try{
			if(typeof(source)=='string')
				source=eval('('+source+')');
			window[name].data.source=source;
			jQuery('#popselectpanel_container').remove();
			var template;
			template=Handlebars.compile(window['common_template'].popselectpanel_selectcontactemail_template);
			var html=template(window[name].data);
			jQuery('header,footer,#content').hide();
			jQuery('body').append(html);
			if(window[name].data.selectContactEmailBackCallBack!=undefined&&typeof(window[name].data.selectContactEmailBackCallBack)=="function"){
				jQuery('#selectcontactemailbackbtn').removeAttr('onclick');
				jQuery('#selectcontactemailbackbtn').click(window[name].data.selectContactEmailBackCallBack);
			}
			ICBCInitTools.initDataTable();
			jQuery('#popselectpanel_container').css({
				width : jQuery(window).width(),
				height : jQuery(window).height(),
			});					
			ICBCInitTools.restScreen(jQuery('#popselectpanel_container'),true);	
			window.selectPanelScroll=jQuery(document).scrollTop();
			window.scrollTo(0, 1);
		}catch(e){
			console.log(e);
		}
	},
	setSelectCardValue:function(name,data,cardOrAcct,cardIndex,acctIndex){
		var $panel=jQuery('#'+name+'_selectpanel');
		var $txt=$panel.find('#'+name+'_txt');
		var $value=$panel.find('input[name='+name+']');	
		var source=window[data];
		if(typeof(source)=='string')
			source=eval('('+ICBCUtilTools.convertUTF8(source)+')');
		var regCardList=source.regCardList;
		var result={};
		result.cardOrAcct=cardOrAcct;
		$txt.removeClass('placeholder');
		var ftType = regCardList[cardIndex].ftType;
		if(ftType==undefined){ftType="";}
		if(cardOrAcct==1){
			$txt.html(ftType + regCardList[cardIndex].cardNum);
			$value.val(regCardList[cardIndex].cardNum);
			result.selectCard=jQuery.extend(true,{},regCardList[cardIndex]);
			window[name]={};
			window[name].result=result;
		}else if(cardOrAcct==2){
			$txt.html(ftType + regCardList[cardIndex].regAccountList[acctIndex].acctNum);
			$value.val(regCardList[cardIndex].regAccountList[acctIndex].acctNum);
			var temp=jQuery.extend(true,{},regCardList[cardIndex]);
			temp.regAccountList=jQuery.extend(true,{},regCardList[cardIndex].regAccountList[acctIndex]);
			result.selectCard=temp;
			window[name]={};
			window[name].result=result;
		}
		jQuery('#popselectpanel_container').remove();
		jQuery('header,footer,#content').show();
		if(window[name+'_selectpanel_onchange']!=undefined&&typeof (window[name+'_selectpanel_onchange']) == 'function')
			window[name+'_selectpanel_onchange']();
	},
	setSelectRenCardValue:function(name,data,cardIndex){
		var $panel=jQuery('#'+name+'_selectpanel');
		var $txt=$panel.find('#'+name+'_txt');
		var $value=$panel.find('input[name='+name+']');	
		var source=window[data];
		if(typeof(source)=='string')
			source=eval('('+ICBCUtilTools.convertUTF8(source)+')');
		var renRegCardList=source.renRegCardList;
		var result={};
		$txt.removeClass('placeholder');
		$txt.html(renRegCardList[cardIndex].acctNum);
		$value.val(renRegCardList[cardIndex].acctNum);
		result.selectCard=jQuery.extend(true,{},renRegCardList[cardIndex]);
		window[name]={};
		window[name].result=result;
		jQuery('#popselectpanel_container').remove();
		jQuery('header,footer,#content').show();
		if(window[name+'_selectpanel_onchange']!=undefined&&typeof (window[name+'_selectpanel_onchange']) == 'function')
			window[name+'_selectpanel_onchange']();
	},	
	setSelectValue:function(name,index){
		var $panel=jQuery('#'+name+'_selectpanel');
		var $txt=$panel.find('#'+name+'_txt');
		var $value=$panel.find('input[name='+name+']');	
		var source=window[name].data.source;
		$txt.html(source[index].name);
		$value.val(source[index].value);
		jQuery('#popselectpanel_container').remove();
		jQuery('header,footer,#content').show();
		if(window[name+'_selectpanel_onchange']!=undefined&&typeof (window[name+'_selectpanel_onchange']) == 'function')
			window[name+'_selectpanel_onchange']();
	},
	setSelectContactValue:function(name,index){
		var data=window[name].data;
		var source=data.source;
		jQuery('input[name='+name+']').val(source.contactList[index].PhoneNumber);
		jQuery('#popselectpanel_container').remove();
		jQuery('header,footer,#content').show();
		if(data.selectContactCallBack!=undefined){
			data.selectContactCallBack(source.contactList[index]);
		}
	},
	setSelectContactEmailValue:function(name,index){
		var data=window[name].data;
		var source=data.source;
		jQuery('#popselectpanel_container').remove();
		jQuery('header,footer,#content').show();
		if(data.selectContactEmailCallBack!=undefined){
			data.selectContactEmailCallBack(source.contactList[index]);
		}
	},	
	setSelectMultiContactValue:function(name){
		var data=window[name].data;
		var source=data.source;
		if(data.selectContactCallBack!=undefined){
			var $checkTmp=jQuery('#popselectpanel_container').find('input[name=selectMultiContactCheckBox]:checked');
			if($checkTmp.size()>0){
				var resultArray=[];
				jQuery.each($checkTmp,function(index,element){
					resultArray.push(source.contactList[element.value]);
				});
				data.selectContactCallBack(resultArray);				
			}
		}
		jQuery('#popselectpanel_container').remove();
		jQuery('header,footer,#content').show();
	},
	setSelectContactValueForiPhone:function(name,value){
		if(value!=undefined&&typeof(value) =='string'){
			jQuery('input[name='+name+']').val(value);
			try{
				jQuery('input[name=_temp_'+name+']').val(value);
			}catch(e){
				console.log(e);
			}
		}else{
			var data=window[name].data;
			jQuery('input[name='+name+']').val(value.PhoneNumber);
			try{
				jQuery('input[name=_temp_'+name+']').val(value.PhoneNumber);
			}catch(e){
				console.log(e);
			}
			if(data.selectContactCallBack!=undefined){
				data.selectContactCallBack(value);
			}
		}
	},
	setSelectMultiContactValueForiPhone:function(name,value){
		var data=window[name].data;
		if(data.selectContactCallBack!=undefined){
			data.selectContactCallBack(value);				
		}
	},	
	setSelectGroupValue:function(name,data,index,innerIndex){
		var $panel=jQuery('#'+name+'_selectpanel');
		var $txt=$panel.find('#'+name+'_txt');
		var $value=$panel.find('input[name='+name+']');	
		var source=window[data];
		if(typeof(source)=='string')
			source=eval('('+ICBCUtilTools.convertUTF8(source)+')');
		var groupList=source.groupList;
		$txt.html(groupList[index].data[innerIndex].name);
		$value.val(groupList[index].data[innerIndex].value);
		jQuery('#popselectpanel_container').remove();
		jQuery('header,footer,#content').show();
		if(window[name+'_selectpanel_onchange']!=undefined&&typeof (window[name+'_selectpanel_onchange']) == 'function')
			window[name+'_selectpanel_onchange']();
	},
	showSelectContact:function(param){
		setTimeout(function(){
			ICBCUITools.createPopSelectPanel({
				'$panel':jQuery,
				'type':'selectContact',
				'name':param.inputName,
				'selectContactCallBack':param.callBack,
				'selectContactType':param.selectContactType
			});
		},200);
	},
	showSelectContactEmail:function(param){
		ICBCUITools.createPopSelectPanel({
			'$panel':jQuery,
			'type':'selectContactEmail',
			'name':'selectContactEmailPoppanel',
			'selectContactEmailCallBack':param.callBack,
			'selectContactEmailBackCallBack':param.backCallBack,
		});
	},	
	showCollegeAlertDialog : function(_message, _title, _btn,_btnclick) {
		var message = (typeof (_message) == 'string' ? _message : '');
		var title = (typeof (_title) == 'string' ? _title : '提示');
		var btn = (typeof (_btn) == 'string' ? _btn : '确定');
		var dialog_title;
		var dialog_tip;
		var dialog_btn;
		var dialog_mask;
		var dialog_content;
		// 查找页面中是否有dialog对象
		var alertDialog = jQuery('#college_alert_dialog');
		if (alertDialog.length > 0) {
			// 开始设置属性
			alertDialog.find('#tipsTitle').html(title);
			alertDialog.find('#tipsMsg').html(message);
			alertDialog.find('#tipsBtn a').html(btn);
			alertDialog.find('#tipsBtn').bind('click', function() {
				alertDialog.hide();
				jQuery('body').trigger('maskHide');
				ICBCUITools.scrollOn();
				if (typeof _btnclick == 'function') {
					_btnclick();
				}
			});
		} else {
			// 通过模板创建alert对象
			var html=Handlebars.compile(window['common_template'].college_alert_dialog_template)({'title':title,'msg':message,'btn':btn});
			alertDialog=jQuery(html);
			// 开始组装
			alertDialog.find('#tipsBtn').bind('click', function() {
				alertDialog.hide();
				jQuery('body').trigger('maskHide');
				ICBCUITools.scrollOn();
				if (typeof _btnclick == 'function') {
					_btnclick();
				}
			});
			jQuery('body').append(alertDialog);
		}
		jQuery('body').trigger('maskShow');
		alertDialog.show();
		return false;
	},
	showAlertDialog : function(_message, _title, _btn,_btnclick) {
		var message = (typeof (_message) == 'string' ? _message : '');
		var title = (typeof (_title) == 'string' ? _title : '提示');
		var btn = (typeof (_btn) == 'string' ? _btn : '确定');
		var btnclickfunc=(typeof _btnclick == 'function'?_btnclick:undefined);
		var alertObj=jQuery('#alert_dialog');
		if(alertObj.length<=0){
			var html=Handlebars.compile(window['common_template'].alert_dialog_template)({'title':title,'msg':message,'btn':btn});
			alertObj=jQuery(html);
			jQuery('body').append(alertObj);
		}else{
			alertObj.find('#myModalLabel').html(title);
			alertObj.find('#myModalMsg').html(message);
			alertObj.find('#myModalBtn').html(btn);
			alertObj.find('#myModal').off('hidden.bs.modal').off('shown.bs.modal');
		}
		alertObj.find('#myModal').modal({
			keyboard:false,
			backdrop:'static'
		}).on('hidden.bs.modal', function(){
			ICBCUITools.scrollOn();
			if(btnclickfunc!=undefined){
				btnclickfunc();
			}
		}).on('shown.bs.modal',function(){
			ICBCUITools.scrollOff();
		});
		return false;
	},
	showConfirmDialog : function(_message, _title, _okbtn, _cancelbtn, _okbtncallback, _okbtncontext, _cancelbtncallback, _cancelbtncontext) {
		var message = (typeof (_message) == 'string' ? _message : '');
		var title = (typeof (_title) == 'string' ? _title : '提示');
		var okbtn = (typeof (_okbtn) == 'string' ? _okbtn : '确定');
		var cancelbtn = (typeof (_cancelbtn) == 'string' ? _cancelbtn : '取消');
		var okbtncallback=(typeof _okbtncallback == 'function'?_okbtncallback:undefined);
		var cancelbtncallback=(typeof _cancelbtncallback == 'function'?_cancelbtncallback:undefined);
		var confirmObj=jQuery('#confirm_dialog');
		if(confirmObj.length<=0){
			var html=Handlebars.compile(window['common_template'].confirm_dialog_template)({'title':title,'msg':message,'okbtn':okbtn,'cancelbtn':cancelbtn});
			confirmObj=jQuery(html);
			jQuery('body').append(confirmObj);
		}else{
			confirmObj.find('#myModalLabel').html(title);
			confirmObj.find('#myModalMsg').html(message);
			confirmObj.find('#myModalCancelBtn').html(cancelbtn);
			confirmObj.find('#myModalOkBtn').html(okbtn);
			confirmObj.find('#myConfirmModal').off('hidden.bs.modal').off('shown.bs.modal');
		}
		confirmObj.find('#myModalCancelBtn').unbind('click').bind('click', function() {
			if (cancelbtncallback!=undefined) {
				if (_cancelbtncontext)
					_cancelbtncallback(_cancelbtncontext);
				else
					_cancelbtncallback();
			}
		});
		confirmObj.find('#myModalOkBtn').unbind('click').bind('click', function() {
			if (okbtncallback!=undefined) {
				if (_okbtncontext)
					_okbtncallback(_okbtncontext);
				else
					_okbtncallback();
			}
		});			
		confirmObj.find('#myConfirmModal').modal({
			keyboard:false,
			backdrop:'static'
		}).on('hidden.bs.modal', function(){
			ICBCUITools.scrollOn();
		}).on('shown.bs.modal',function(){
			ICBCUITools.scrollOff();
		});
		return false;
	},
	//显示PopBtnPanel
	showPopBtnPanel : function(param){
		var button=[];
		param.button1!=undefined?button.push(param.button1):"";
		param.button2!=undefined?button.push(param.button2):"";
		param.button3!=undefined?button.push(param.button3):"";
		param.button4!=undefined?button.push(param.button4):"";
		param.button5!=undefined?button.push(param.button5):"";
		var popbtnpanelObj=jQuery('#popbtnpanel_dialog');
		if(popbtnpanelObj.length<=0){
			var html=Handlebars.compile(window['common_template'].popbtnpanel_template)({});
			popbtnpanelObj=jQuery(html);
			jQuery('body').append(popbtnpanelObj);
		}
		popbtnpanelObj.find('#list-group').empty();
		popbtnpanelObj.find('#myPopBtnPanelModal').off('hidden.bs.modal');
		jQuery(button).each(function(index,value){
			var buttonContent=popbtnpanelObj.find('#list-group');
			var button=jQuery('<a class="list-group-item text-center" id="popbtnpanel_btn_'+index+'">'+value.name+'</a>');
			button.bind('click',function() {
				if (typeof value.func == 'function') {
					if (value.func)
						value.func(value.arg);
					else
						value.func();
				}
			});
			buttonContent.append(button);
		});
		popbtnpanelObj.find('#myPopBtnPanelModal').modal({
			keyboard:false,
			backdrop:'static'
		}).on('hidden.bs.modal', function(){
			ICBCUITools.scrollOn();
		});
		ICBCUITools.scrollOff();
		popbtnpanelObj.closePanel=function(){
			popbtnpanelObj.find('.popbtnpanel_close_btn').click();
		};
		return popbtnpanelObj;
	},
	//显示日期选择面板
	setDatePickerValue:function(obj){
		var id=obj.id;
		var type=(obj.type!=undefined?obj.type:0);//类型，0为年月日，1为年月
		var date=obj.date;
		if(date==undefined||date=="null"||date==""){
			jQuery("#_datepicker_"+id).html("请选择");
		}else{
			var tempDate=date.replace(/-/g, '');
			var yearStr = tempDate.substr(0, 4);
			var monthOfYearStr = tempDate.substr(4, 2);
			if(type==0){
				//年月日
				var dayOfMonthStr = tempDate.substr(6, 2);
				jQuery("#_datepicker_"+id).html(yearStr+"-"+monthOfYearStr+"-"+dayOfMonthStr).addClass("datepicker_datecolor");
				jQuery("#_datepickerhidden_"+id).val(yearStr+monthOfYearStr+dayOfMonthStr);
			}else{
				jQuery("#_datepicker_"+id).html(yearStr+"-"+monthOfYearStr).addClass("datepicker_datecolor");
				jQuery("#_datepickerhidden_"+id).val(yearStr+monthOfYearStr);				
			}
		}
	},
	showDatePickerPanel : function(obj){
		var id=obj.id;
		var type=(obj.type!=undefined?obj.type:0);//类型，0为年月日，1为年月
		var date=obj.date;
		var format=(type==0?"yyyymmdd":"yyyymm");
		//开始赋初始值
		if(date==undefined||date=="null"||date==""){
			initDate=new Date();
		}else{
			var tempDate=date.replace(/-/g, '');
			var yearStr = tempDate.substr(0, 4);
			var monthOfYearStr = tempDate.substr(4, 2);
			if(type==0){
				var dayOfMonthStr = tempDate.substr(6, 2);
				initDate=yearStr+"/"+monthOfYearStr+"/"+dayOfMonthStr;
			}else{
				initDate=yearStr+"/"+monthOfYearStr+"/01";
			}			
		}
		var datepickerObj=jQuery('#datepicker_dialog');
		if(datepickerObj.length>0){
			datepickerObj.remove();
		}
		var html=Handlebars.compile(window['common_template'].datepicker_template)({});
		datepickerObj=jQuery(html);
		jQuery('body').append(datepickerObj);
		var myDatePickerModal=datepickerObj.find('#myDatePickerModal');
		datepickerObj.find('#datepicker_core').attr('data-date',initDate).datepicker({
			language:'zh-CN',
			todayBtn:(type==0?'linked':false),
			minViewMode:type,
			startView:type,
			format:format
		}).on('changeDate',function(ev){
			myDatePickerModal.modal('hide');
			obj.date=ev.format();
			ICBCUITools.setDatePickerValue(obj);
		});
		myDatePickerModal.off('hidden.bs.modal').modal({
			show:true,
			keyboard:false,
			backdrop:true
		}).on('hidden.bs.modal', function(){
			ICBCUITools.scrollOn();
		});
		ICBCUITools.scrollOff();
		return;
	},	
	//显示回单转发的页面
	showEbillTransmitEmailPanel : function(){
		jQuery('#popselectpanel_container').remove();
		var template=Handlebars.compile(window['common_template'].pop_ebill_transmit_email_panel_template);
		var html=template();
		jQuery('header,footer,#content').hide();
		jQuery('body').append(html);
		jQuery('#popselectpanel_container').css({
			width : jQuery(window).width(),
			height : jQuery(window).height(),
		});
		ICBCInitTools.restScreen(jQuery('#popselectpanel_container'),true);
		window.selectPanelScroll=jQuery(document).scrollTop();
		window.scrollTo(0, 1);
	},
	//显示验签对话框
	showAuthenDialog:function(params){
		try{
			jQuery('#tranAuthenDialog').remove();
			var html=Handlebars.compile(window['common_template'].tranauthen_dialog)(params.authenParams);
			var authenDialogObj=jQuery(html);
			jQuery('body').append(authenDialogObj);
			//对话框
			var myTranAuthenDialog=authenDialogObj.find('#myTranAuthenDialog');
			//验签参数
			var tranAuthenInfoData=params.authenParams.tranAuthenInfoData;
			//取消按钮
			var cancelBtn=authenDialogObj.find('#myModalCancelBtn').click(function(){
				setTimeout(function(){
					myTranAuthenDialog.modal('hide');
				},200);
			});
			//确定按钮
			var okBtn=authenDialogObj.find('#myModalOkBtn');
			//数字正则
			var numberRegex=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
			ICBCPageTools.submitFunction=function(params){
				//赋值表单隐藏域
				if(params.$input!=undefined){
					var inputName=params.$input.attr('name');
					var inputValue=params.$input.val();
					var formTmp=jQuery('form[name='+params.formName+']');
					formTmp.find('input[name='+inputName+']').remove();
					formTmp.append('<input type="hidden" name="'+inputName+'" value="'+inputValue+'"/>');
				}
				params.$dialog.modal('hide');
				ICBCPageTools.submitForm({formName:params.formName});
			};
			ICBCPageTools.bindInputFunction=function(params){
				if(ICBCUtilTools.isAndroid()){
					params.$input.attr("data-type","amountKeyBoard");
					ICBCSafeKeyBoard.initAmountEdit();
					params.$input.attr('style','font-size:0.1px !important');
				}else{
					params.$input.attr('style','font-size:18px !important');
				}
				params.$input.bind('input change',function(data){
					params.$inputHolder.html('');
					for(var i=0;i<$input.val().length;i++){
						if(params.displayFlag){
							jQuery(params.$inputHolder[i]).html($input.val().charAt(i));
						}else{
							jQuery(params.$inputHolder[i]).html('●');
						}
					}
				}).bind('focus',function(){
					params.$inputHolder.html('');
					params.$input.val('');
					params.$dialog.css('height','200%');
				}).bind('blur',function(){
					if(ICBCUtilTools.isiPhone()){
						params.$dialog.css({
							'height':'100%',
						}).focus().modal('hide');
						ICBCUITools.showAuthenDialog(params.outterParams);
					}else{
						params.$dialog.css({
							'height':'100%',
						}).focus();
					}
				});
			};
			//判断是否需要验签
			if(tranAuthenInfoData.authenFlag=="1"){
				//需要验签
				var inputName=tranAuthenInfoData.inputName;
				if(tranAuthenInfoData.epayFlag=="1"||tranAuthenInfoData.directBankFlag=="1"){
					var $input=authenDialogObj.find('input[name='+inputName+']');
					var $inputHolder=authenDialogObj.find('#border_input_layout').find('div');
					var $errorTips=authenDialogObj.find('#errorTips');
					var $authenTips=authenDialogObj.find('#epay_authen_tip');
					var autoFillSMSFunctionString= decodeURIComponent(tranAuthenInfoData.autoFillSMSFunction);
					authenDialogObj.append(autoFillSMSFunctionString);
					ICBCPageTools.bindInputFunction({
						$dialog:myTranAuthenDialog,
						$input:$input,
						$inputHolder:$inputHolder,
						outterParams:params,
						displayFlag:true
					});
					var ePayTimeOut = 60;
					var currentTime = 0;
					currentTime = ePayTimeOut;
					$authenTips.find('#countDown').html(currentTime);
					var showCountDown=function() {
					    if (currentTime <= 0) {
					        currentTime = 0;
					        $authenTips.find('#countDown').html("00");
					        $authenTips.find('#resendButton').removeAttr('disabled');
					    } else {
					        if (currentTime < 10) {
					            currentTime = "0" + currentTime;
					        }
					        $authenTips.find('#countDown').html(currentTime);
					    }
					    currentTime--;
					};
				    setInterval(showCountDown, 1000);
				    $authenTips.find('#resendButton').click(function(){
				        ICBCAjaxTools.ajaxPost({
				            submitType: 'form',
				            formName: tranAuthenInfoData.epayResendFormName,
				            callBack: function(result, parameter) {
				                var isResendOK = result.isResendOK;
				                if (isResendOK == '1') {
				                	$errorTips.html("短信验证码发送成功。");
				                    currentTime = ePayTimeOut;
				                    jQuery('#resendButton').attr('disabled', 'disabled');
				                }
				                var dse_pageId = jQuery('form[name='+tranAuthenInfoData.formName+']').find('input[name=dse_pageId]');
				                if (dse_pageId.length > 0) {
				                    dse_pageId.val(parameter.dse_pageId);
				                }
				            }
				        });
				        return false;				    	
				    });
					okBtn.click(function(){
						//进行校验
						if($input.val()==""||$input.val().length!=6){
							$errorTips.html("短信验证码不能为空");
							return;
						}
						if(!(numberRegex.test($input.val()))){
							$errorTips.html("短信验证码应为数字");
							return;
						}							
						ICBCPageTools.submitFunction({
							$input:$input,
							$dialog:myTranAuthenDialog,
							formName:tranAuthenInfoData.formName
						});
					});
				}else{
					var custAuthenType=tranAuthenInfoData.custAuthenType;
					var $errorTips=authenDialogObj.find('#errorTips');
					if(custAuthenType=="0"){
						var $input=authenDialogObj.find('input[name='+inputName+']');
						okBtn.click(function(){
							//进行校验
							if($input.val()==""){
								$errorTips.html("请输入支付密码");
								return;
							}
							ICBCPageTools.submitFunction({
								$input:$input,
								$dialog:myTranAuthenDialog,
								formName:tranAuthenInfoData.formName
							});
						});
					}else if(custAuthenType=="2"){
						var $input=authenDialogObj.find('input[name='+inputName+']');
						var $inputHolder=authenDialogObj.find('#border_input_layout').find('div');
						ICBCPageTools.bindInputFunction({
							$dialog:myTranAuthenDialog,
							$input:$input,
							$inputHolder:$inputHolder,
							outterParams:params
						});
						okBtn.click(function(){
							//进行校验
							if($input.val()==""||$input.val().length!=6){
								$errorTips.html("请输入口令卡密码");
								return;
							}
							if(!(numberRegex.test($input.val()))){
								$errorTips.html("口令卡密码应为数字");
								return;
							}							
							ICBCPageTools.submitFunction({
								$input:$input,
								$dialog:myTranAuthenDialog,
								formName:tranAuthenInfoData.formName
							});
						});
					}else if(custAuthenType=="3"){
						okBtn.click(function(){
							myTranAuthenDialog.modal('hide');
							tranAuthenInfoData.UKeyVerifyConfirmFunction.call();
						});
					}else if(custAuthenType=="4"){
						var $input=authenDialogObj.find('input[name='+inputName+']');
						var $inputHolder=authenDialogObj.find('#border_input_layout').find('div');
						ICBCPageTools.bindInputFunction({
							$dialog:myTranAuthenDialog,
							$input:$input,
							$inputHolder:$inputHolder,
							outterParams:params
						});
						okBtn.click(function(){
							//进行校验
							if($input.val()==""||$input.val().length!=6){
								$errorTips.html("请输入密码器密码");
								return;
							}
							if(!(numberRegex.test($input.val()))){
								$errorTips.html("密码器密码应为数字");
								return;
							}							
							ICBCPageTools.submitFunction({
								$input:$input,
								$dialog:myTranAuthenDialog,
								formName:tranAuthenInfoData.formName
							});
						});
					}
				}
			}else{
				//不需要验签
				okBtn.click(function(){
					ICBCPageTools.submitFunction({
						$dialog:myTranAuthenDialog,
						formName:tranAuthenInfoData.formName
					});
				});
			}
			myTranAuthenDialog.modal({
				keyboard:false,
				backdrop:'static'
			}).on('hidden.bs.modal', function(){
				jQuery('#tranAuthenDialog').remove();
				jQuery(document).off("touchmove",false);
				jQuery('body').css("overflow","");
				if(ICBCUtilTools.isWindowsPhone()){
					jQuery('body').removeClass("stoptouchmove");
				}				
			}).on('shown.bs.modal',function(){
				var element=document.getElementById('modal-tips');
				var initY=0;
				var lastY=0;
				element.addEventListener("touchstart", function(event){
					try{
						initY=event.touches[0].pageY;
					}catch(e){}
				});
				element.addEventListener("touchmove", function(event){
					try{
						lastY=event.touches[0].pageY;
						event.stopImmediatePropagation();
						event.stopPropagation();
						var downScroll=lastY-initY<0?true:false;
						if(downScroll){
							if(element.scrollTop+element.clientHeight>=element.scrollHeight){
								jQuery('#modal-tips').scrollTop(element.clientHeight+element.scrollHeight);
								event.preventDefault();
								return false;
							}
						}else{
							if(element.scrollTop<=0){
								jQuery('#modal-tips').scrollTop(0);
								event.preventDefault();
								return false;
							}
						}
						return true;
					}catch(e){
						return true;
					}
				});
				jQuery(document).on("touchmove",false);
				jQuery('body').css("overflow","hidden");
				if(ICBCUtilTools.isWindowsPhone()){
					jQuery('body').addClass("stoptouchmove");
				}
			});			
		}catch(e){
			console.log("Error: " + e);
		}
	},
	scrollOn:function(){
		jQuery(document).off("touchmove",false);
		jQuery('body').css("overflow","");
		if(ICBCUtilTools.isWindowsPhone()){
			jQuery('body').removeClass("stoptouchmove");
		}
	},
	scrollOff:function(){
		jQuery(document).on("touchmove",false);
		jQuery('body').css("overflow","hidden");
		if(ICBCUtilTools.isWindowsPhone()){
			jQuery('body').addClass("stoptouchmove");
		}
	}
};
// 工具类
var ICBCUtilTools = {
	sUserAgent : navigator.userAgent.toLowerCase(),
	isTestMode:function(){
		if(window['mode']=='test')
			return true;
		else
			return false;
	},
	decodeWindowUserAgent : function(){
		if(window['user-agent']!=undefined){
			window['user-agent']=decodeURIComponent(window['user-agent']).replace(/\+/g, " ");
		}
	},
	isiPhone : function() {
		if((this.sUserAgent.match(/iphone os/i) == "iphone os")||(this.sUserAgent.match(/ipad/i) == "ipad"))
			return true;
		else
			return false;
	},
	isAndroid : function() {
		return (this.sUserAgent.match(/android/i) == "android");
	},
	isWindowsPhone : function(){
		return (this.sUserAgent.match(/msie/i) == "msie");
	},
	isWindowsPhone7 : function(){
		return (this.sUserAgent.match(/msie 9.0/i) == "msie 9.0");
	},	
	isICBCiPhoneClient : function() {
		return (this.sUserAgent.match(/icbciphonebs/i) == "icbciphonebs");
	},
	isICBCAndroidClient : function() {
		return (this.sUserAgent.match(/icbcandroidbs/i) == "icbcandroidbs");
	},
	isICBCOpenNewClient : function() {
		return (this.sUserAgent.match(/icbcandroidbsnew/i) == "icbcandroidbsnew"||this.sUserAgent.match(/icbciphonebsnew/i) == "icbciphonebsnew");
	},
	isICBCWindowsPhoneClient : function() {
		return (this.sUserAgent.match(/icbcwindowsphonebs/i) == "icbcwindowsphonebs");
	},
	isDirectBankClient : function() {
		if(window['user-agent']!=undefined){
			return (window['user-agent'].toLowerCase().match(/directbank/i) == "directbank");
		}else{
			return (this.sUserAgent.match(/directbank/i) == "directbank");
		}
	},	
	isCollegeClient : function() {
		if(window['user-agent']!=undefined){
			return (window['user-agent'].toLowerCase().match(/college/i) == "college");
		}else{
			return (this.sUserAgent.match(/college/i) == "college");
		}
	},
	isEmallClient : function() {
		return (this.sUserAgent.match(/f-emall/i) == "f-emall");
	},
	isWAPBClient : function() {
		return (this.sUserAgent.match(/f-wapb/i) == "f-wapb");
	},
	getAndroidVersion : function() {
		try {
			var version = this.sUserAgent.match(new RegExp('(?:android[\\s|/])(\\d\.\\d\.\\d)'))[1];
			version = (version == undefined ? "" : version);
			version = parseInt(version.replace(/\./g, ''));
			return version;
		} catch (e) {
			try{
				var version=this.sUserAgent.match(new RegExp('(?:android[\\s|/])(\\d\.\\d)'))[1]+"0";
				version = (version == undefined ? "" : version);
				version = parseInt(version.replace(/\./g, ''));
				return version;
			}catch(e){
				return 100;
			}
		}
	},
	getAndroidClientVersion : function() {
		try {
			if (this.isAndroid()) {
				if(this.isDirectBankClient()){
					var version = this.sUserAgent.match(new RegExp('baseversion:(\\d\.\\d\.\\d\.\\d)'));
					version = (version == undefined ? "" : version);
					version = parseInt(version[1].replace(/\./g, ''));
					version = (version==""?"1000":version);
					return version;
				}else{
					var version = this.sUserAgent.match(new RegExp('\\d\.\\d\.\\d\.\\d'));
					version = (version == undefined ? "" : version);
					version = parseInt(version[0].replace(/\./g, ''));
					version = (version==""?"1000":version);
					return version;
				}
			}
		} catch (e) {
			return "1000";
		}
	},
	getAndroidClientFullVersion : function() {
		try {
			if (this.isAndroid()) {
				var version = this.sUserAgent.match(new RegExp('fullversion:(\\d+)'));
				version = (version == undefined ? "0" : version);
				version = parseInt(version[1].replace(/\./g, ''));
				return version;
			}
		} catch (e) {
		}
	},
	getiPhoneClientFullVersion : function(userAgent) {
		try {
			if (this.isiPhone()) {
				if(this.isDirectBankClient()){
					var version = userAgent.match(new RegExp('basefullversion:(\\d\.\\d\.\\d\.\\d\.\\d)'));
					if(version==undefined){
						version = userAgent.match(new RegExp('basefullversion:(\\d\.\\d\.\\d\.\\d)'));
					}
					version = (version == undefined ? "0" : version);
					version = parseInt(version[1].replace(/\./g, ''));
					version = (version==""?"1000":version);
					return version;
				}else{
					var version = userAgent.match(new RegExp('fullversion:(\\d\.\\d\.\\d\.\\d\.\\d)'));
					if(version==undefined){
						version = userAgent.match(new RegExp('fullversion:(\\d\.\\d\.\\d\.\\d)'));
					}
					version = (version == undefined ? "0" : version);
					version = parseInt(version[1].replace(/\./g, ''));
					version = (version==""?"1000":version);
					return version;
				}
			}
		} catch (e) {
			return "1000";
		}
	},	
	convertUTF8 : function(text) {
		var temp1 = jQuery("<div></div>").html(text);
		var temp2 = temp1.html();
		temp1.empty();
		return temp2;
	},
	checkFormInput : function (formSelect){
		var input=jQuery('form[name='+formSelect+']').find("textarea,input[type=text],input[type=password]");
		input.each(function(){
			var placeholder=(jQuery(this).attr('placeholder')==undefined?"":jQuery(this).attr('placeholder'));
			var value=this.value;
			if(value==placeholder){
				this.value="";
			}
		});
	},
	sleep:function(numberMillis) {
	    var now = new Date();
	    var exitTime = now.getTime() + numberMillis;
	    while (true) {
	        now = new Date();
	        if (now.getTime() > exitTime)
	            return;
	    }
	}

};

// 提交、导航及页面流工具类
var ICBCPageTools = {
	// 提交链接
	submitALink : function(params) {
		var linkId = params.linkId;
		var hrefValue = jQuery('#' + linkId).attr("href");
		if(hrefValue==undefined)
			return false;
		if(ICBCUtilTools.isiPhone()||ICBCUtilTools.isWindowsPhone()){
			if(hrefValue.indexOf("NativeFlag")<0)
				hrefValue+="&NativeFlag=0";
		}
		window.location.href = hrefValue;
		return false;
	},
	// 提交表单
	submitForm : function(params) {
		var formName = params.formName;
		var submitNameTmp = params.submitName;
		var validator = params.validator;
		var validatorResult = true;
		if (validator != undefined && typeof (validator) == 'function') {
			if(ICBCUtilTools.isWindowsPhone()){
				ICBCUtilTools.checkFormInput(formName);
			}
			validatorResult = validator();
		}
		if (validatorResult) {
			var formSelect = "form[name=" + formName + "]";
			var $form = jQuery(formSelect);
			var submitParam = "ICBCSubmit";
			if (submitNameTmp != undefined && submitNameTmp != "") {
				submitParam = submitNameTmp;
			}
			var submit = $form.find('input[name=submit]');
			if (submit.length > 0) {
				submit.val(submitParam);
			} else {
				$form.append('<input style="display:none" type="submit" name="submit" value="' + submitParam + '" />');
			}
			if($form.find("input[name=NativeFlag]").length<=0)
				$form.append('<input type="hidden" name="NativeFlag" value="0" />');
			//判断是否需要加密处理
			if(ICBCEncrypt.isEncrypt($form)){
				//提交加密表单
				ICBCEncrypt.submitEncryptForm($form);
			}else{
				$form.removeAttr("onsubmit");
				$form.find('[name=submit]').click();				
			}
		}
		return false;
	},
	//提交链接到外部网站
	submitALinkToExternal:function(param){
		try {
			var aID = param.aID;//链接ID
			var finishCurrent = param.finishCurrent;//是否结束当前webview标志
			if(finishCurrent==undefined)
				finishCurrent=true;
			var hrefValue = jQuery('#' + aID).attr("href");
			if (ICBCUtilTools.isAndroid()) {
				RequestService.executeToExternal(hrefValue,finishCurrent);
			}else if(ICBCUtilTools.isiPhone()){
				hrefValue=encodeURI(hrefValue);
				ICBCPageTools.iOSExcuteNativeMethod("Native://goToExternal=1&hrefValue="+hrefValue+"&finishCurrent="+finishCurrent);
			}else if(ICBCUtilTools.isWindowsPhone()){
				var result = "{'type':'webexternalrequest','requestObject':'{\"hrefValue\":\"" + hrefValue + "\",\"finishCurrent\":\"" + finishCurrent + "\"}'}";
				window.external.notify(result);				
			}
			return false;
		} catch (e) {
		}
	},
	//进入分行特色页面并传递参数
	submitToConformity:function(param){
		try {
			var data = param.data;
			Native.jumpToConformity(data);
			return false;
		} catch (e) {}		
	},
	// 历史回退
	goBack : function() {
		history.go(-1);
	},
	// 关掉当前客户端的WebView页面，即返回到上级菜单
	nativeBack : function() {
		try {
			Native.returnBack();
		} catch (e) {}
	},
	// 回到主菜单
	nativeMenu : function() {
		try {
			Native.returnMenu();
		} catch (e) {}
	},
	// 回到登录页
	nativeLogin : function() {
		try {
			//回到主菜单并清退session，201308需要修改
			Native.returnLogin();
		} catch (e) {}
	},
	// 安全退出
	nativeSafeExit : function() {
		try {
			//安全退出
			try {
				if (ICBCUtilTools.isAndroid()) {
					Native.safeExit();
				}else if (ICBCUtilTools.isiPhone()) {
					this.iOSExcuteNativeMethod("Native://SafeExit=1");
				}
			} catch (e) {
			}
		} catch (e) {}
	},	
	nativeToTargetMenu:function(param){
		ICBCPageTools.natvieToTargetMenu(param);
	},
	//回到指定的菜单
	natvieToTargetMenu:function(param){
		try {
			var targetMenuID = param.targetMenuID;
			var forceLoginFlag = param.forceLoginFlag;
			var targetParams = param.targetParams;
			if(targetMenuID!=undefined&&forceLoginFlag!=undefined&&targetParams!=undefined){
				Native.returnToTarget(targetMenuID,forceLoginFlag,targetParams);
			}else if(targetMenuID!=undefined&&forceLoginFlag!=undefined){
				Native.returnToTarget(targetMenuID,forceLoginFlag);
			}else if(targetMenuID!=undefined){
				Native.returnToTarget(targetMenuID);
			}else{
				//doNothing
			}
		} catch (e) {}		
	},
	// 结果页面显示iPhoneTabBar
	nativeShowiPhoneTabBar:function(){
		try {
			if (ICBCUtilTools.isiPhone()) {
				//iPhone未实现，需要实现	
				ICBCPageTools.iOSExcuteNativeMethod("Native://showiPhoneTabBar=1");
			}
		} catch (e) {
		}			
	},
	// 结果页面隐藏iPhoneTabBar
	nativeHideiPhoneTabBar:function(){
		try {
			if (ICBCUtilTools.isiPhone()) {
				//iPhone未实现，需要实现	
				ICBCPageTools.iOSExcuteNativeMethod("Native://showiPhoneTabBar=0");
			}
		} catch (e) {
		}			
	},	
	// 显示toast提示信息
	nativeShowToast : function(txt) {
		try {
			if (ICBCUtilTools.isAndroid()) {
				Native.showToast(txt);
			}
		} catch (e) {
		}
	},
	// 显示遮罩
	nativeShowIndicator : function() {
		try {
			if (ICBCUtilTools.isAndroid()) {
				Native.showIndicator();
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod("Native://showIndicator=1");
			}
			if(ICBCUtilTools.isWindowsPhone()){
				var result = "{'type':'nativerequest','requestObject':'{\"type\":\"showIndicator\"}'}";
				window.external.notify(result);
			}
		} catch (e) {
		}
	},
	// 隐藏遮罩
	nativeHideIndicator : function() {
		try {
			if (ICBCUtilTools.isAndroid()) {
				Native.hideIndicator();
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod("Native://hideIndicator=1");
			}
			if(ICBCUtilTools.isWindowsPhone()){
				var result = "{'type':'nativerequest','requestObject':'{\"type\":\"hideIndicator\"}'}";
				window.external.notify(result);
			}
		} catch (e) {
		}
	},	
	// 打开完整版客户端
	nativeOpenFullClient : function() {
		try {
			if (ICBCUtilTools.isAndroid()) {
				Native.openFullClient();
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod("Native://openFullClient=1");
			}
		} catch (e) {
		}
	},	
	
	// 二维码发送请求
	qrCodeSendRequest:function(formSelect) {
		var params = jQuery(formSelect).serialize();
		try {
			if (ICBCUtilTools.isAndroid()) {
				Native.qrCodePostToTradeWebView(params);
			}
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://type=QrCode&"+params);
			}
		
		} catch (e) {
		}
	},
	// 打电话
	nativeCallPhone:function(phoneNumber) {
		try {
			if (ICBCUtilTools.isAndroid()) {
				Native.callPhone(phoneNumber);
			}
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://callPhone=1&phoneNumber="+phoneNumber);
			}
		} catch (e) {
		}
	},
	// 发短信
	nativeSendSMS:function(param) {
		try {
			if (ICBCUtilTools.isAndroid()) {
				Native.sendSms(param.mobile,param.content);
			}
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://sendSms=1&mobile="+param.mobile+"&content="+encodeURI(param.content));
			}
		} catch (e) {
		}
	},
	nativeGetDeviceIdCallBack : undefined,
	nativeGetDeviceId : function(param) {
		try {
			if (param.callBack == undefined || typeof param.callBack != 'function') {
				return;
			}else{
				this.nativeGetDeviceIdCallBack=param.callBack;
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://getDeviceId=1&responseCallBack=ICBCPageTools.setDeviceIdForiPhone');
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.getDeviceId()+"";
				this.nativeGetDeviceIdCallBack({'deviceId':resultString});
			} else if (ICBCUtilTools.isWindowsPhone()){
				window.setDeviceIdForWindowsPhone=function(param) {
					var tempData = eval('(' + param + ')');
					ICBCPageTools.nativeGetDeviceIdCallBack(tempData);
				};
				var result = "{'type':'nativerequest','requestObject':'{\"type\":\"getDeviceId\",\"param\":\"setDeviceIdForWindowsPhone\"}'}";
				window.external.notify(result);		
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	setDeviceIdForiPhone:function(param){
		this.nativeGetDeviceIdCallBack(param);
	},
	//获取客户端本地保存的手机号，仅支持iPhone和Android
	nativeGetSaveMobileCallBack : undefined,
	nativeGetSaveMobile : function(param) {
		try {
			if (param.callBack == undefined || typeof param.callBack != 'function') {
				return;
			}else{
				this.nativeGetSaveMobileCallBack=param.callBack;
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://getSaveMobile=1&responseCallBack=ICBCPageTools.setnGetSaveMobileForiPhone');
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.getSaveMobile()+"";
				this.nativeGetSaveMobileCallBack({'saveMobile':resultString});
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	setnGetSaveMobileForiPhone:function(param){
		this.nativeGetSaveMobileCallBack(param);
	},	
	nativeSavePushConfig : function(param) {
		try {
			if (param.pushSwitch == undefined || param.pushBindMobile == undefined|| param.pushRecordId == undefined) {
				return;
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://savePushConfig=1&param='+JSON.stringify(param));
			} else if (ICBCUtilTools.isAndroid()) {
				Native.savePushConfig(JSON.stringify(param));
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	//理财下载附件
	nativeDownloadFinanceAttachment : function(param){
		try {
			if (param.path == undefined) {
				return;
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://downloadFinanceAttachment=1&param='+JSON.stringify(param));
			} else if (ICBCUtilTools.isAndroid()) {
				Native.downloadFinanceAttachment(JSON.stringify(param));
			} else if(ICBCUtilTools.isWindowsPhone()){
				alert('暂不支持附件下载');
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 告知客户端登录状态
	nativeSetLoginState : function(param){
		try {
			if (param.loginState == undefined) {
				return;
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://setLoginState=1&param='+JSON.stringify(param));
			} else if (ICBCUtilTools.isAndroid()) {
				Native.setLoginState(JSON.stringify(param));
			} else if(ICBCUtilTools.isWindowsPhone()){
				//doNothing
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 进入扫描二维码页面
	nativeScanQRCode : function(param){
		try {
			if (param.callBackFuncName == undefined) {
				return;
			}
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://scanQRCode=1&param='+JSON.stringify(param));
			} else if (ICBCUtilTools.isAndroid()) {
				Native.scanQRCode(JSON.stringify(param));
			} else if(ICBCUtilTools.isWindowsPhone()){
				alert('暂不支持二维码扫描');
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	nativeShareToOtherPlatform:function(param){
		try {
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://ShareToOtherPlatform=1&param='+param);
			} else if (ICBCUtilTools.isAndroid()) {
				Native.shareToOtherPlatform(param);
			} else if(ICBCUtilTools.isWindowsPhone()){
				alert('暂不支持分享功能');
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 客户端存储数据
	nativeSaveConfig : function(param){
		try {
			if (param.key == undefined||param.value == undefined) {
				return;
			}
			param.value=encodeURI(param.value);
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://saveConfig=1&key='+param.key+'&value='+param.value);
			} else if (ICBCUtilTools.isAndroid()) {
				Native.saveConfig(param.key,param.value);
			} else if(ICBCUtilTools.isWindowsPhone()){
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	// 客户端取回数据
	nativeGetConfigCallBack:undefined,
	nativeGetConfig : function(param){
		try {
			if (param.key == undefined||param.callBack == undefined) {
				return;
			}
			this.nativeGetConfigCallBack=param.callBack;
			if (ICBCUtilTools.isiPhone()) {
				if(ICBCPageTools.isiPhoneSupportSaveLoadData()){
					this.iOSExcuteNativeMethod('Native://getConfig=1&key='+param.key+'&callBack=ICBCPageTools.nativeGetConfigCallBack');
				}else{
					this.nativeGetConfigCallBack("");
				}
			} else if (ICBCUtilTools.isAndroid()) {
				try{
					var value=Native.getConfig(param.key);
					this.nativeGetConfigCallBack(value);
				}catch(e){
					this.nativeGetConfigCallBack("");
				}
			} else if(ICBCUtilTools.isWindowsPhone()){
				this.nativeGetConfigCallBack("");
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	isiPhoneSupportSaveLoadData:function(){
		var version=ICBCUtilTools.getiPhoneClientFullVersion(window['user-agent']);
		if(version>1000&&version<10000){
			if(version>1015)
				return true;
			else
				return false;
		}else if(version>10000){
			if(version>10152)
				return true;
			else
				return false;
		}else{
			return false;
		}
	},
	// 客户端启动第三方应用
	nativeLaunchThirdApp : function(param){
		try {
			if (param.appName == undefined||param.appIdentifier == undefined) {
				return;
			}
			var jsonParam=encodeURIComponent(JSON.stringify(param));
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://launchThirdApp=1&param='+jsonParam);
			} else if (ICBCUtilTools.isAndroid()) {
				Native.launchThirdApp(jsonParam);
			} else if(ICBCUtilTools.isWindowsPhone()){
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	// 客户端保存联系人
	nativeSaveContact : function(param){
		try {
			if (param.name == undefined||param.phone == undefined) {
				return;
			}
			var jsonParam=JSON.stringify(param);
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://saveContact=1&param='+jsonParam);
			} else if (ICBCUtilTools.isAndroid()) {
				Native.saveContact(jsonParam);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	//保存图片到相册
	nativeSavePicToAlbum:function(url){
		try{
			if(ICBCUtilTools.isAndroid()){
				//Android版本
				Native.savePicToAlbum(url);
			}else if(ICBCUtilTools.isiPhone()){
				//iPhone版本
				ICBCPageTools.iOSExcuteNativeMethod("Native://savePicToAlbum=1&url="+url);
			}
		}catch(e){}
	},
	//图片上传
	nativePhotoUpload:function(param){
		try{
			if(param.fileName==undefined||param.fileSize==undefined||param.uploadUrl==undefined||param.uploadCallBackFunctionName==undefined){
				return;
			}
			var jsonParam=JSON.stringify(param);
			if(ICBCUtilTools.isAndroid()){
				//Android版本
				Native.photoUpload(jsonParam);
			}else if(ICBCUtilTools.isiPhone()){
				//iPhone版本
				ICBCPageTools.iOSExcuteNativeMethod("Native://photoUpload=1&params="+encodeURI(jsonParam));
			}else if(ICBCUtilTools.isWindowsPhone()){
				var result = "{'type':'nativerequest','requestObject':'{\"type\":\"photoUpload\",\"param\":\""+encodeURI(jsonParam)+"\"}'}";
				window.external.notify(result);	
			}
		}catch(e){}
	},
	iOSExcuteNativeMethod : function(param) {
		var iFrame;
		iFrame = document.createElement("iframe");
		iFrame.setAttribute("src", param);
		iFrame.setAttribute("style", "display:none");
		iFrame.setAttribute("height", "0px");
		iFrame.setAttribute("width", "0px");
		iFrame.setAttribute("frameborder", "0");
		document.body.appendChild(iFrame);
		iFrame.parentNode.removeChild(iFrame);
		iFrame = null;
	},
	showPageList:function(param){
		var jsonData=param.jsonData;
		if(typeof(jsonData)=='string')
			jsonData=eval('('+ICBCUtilTools.convertUTF8(jsonData)+')');		
		var tableId=param.tableId;
		var $table=jQuery('#'+tableId);
		var templateId=param.templateId;
		var noResultFlag=jsonData.noResultFlag;
		if(noResultFlag){
			$table.find("#loadMore,tbody").hide();
			$table.find("#noResult").show();
		}else{
			var array="";
			for(var key in jsonData){
				array=key;
				break;
			}
			var haveMoreFlag=jsonData[array][0].haveMoreFlag;
			$table.find("#noResult").hide();
			$table.find("tbody").show();
			var template=Handlebars.compile(jQuery('#'+templateId).html());
			var html=template(jsonData);
			$table.children("tbody").append(html);
			if(haveMoreFlag!="false"){
				$table.find("#loadMore").show();
			}else{
				$table.find("#loadMore").hide();
			}
		}
		if($table.attr("class")=="datatable"){
			ICBCInitTools.initDataTable();
		}else if($table.attr("class")=="expand_datatable"){
			ICBCInitTools.initExpandDataTable();
		}
	},
	showPageList2:function(param){
		var jsonData=param.jsonData;
		if(typeof(jsonData)=='string')
			jsonData=eval('('+ICBCUtilTools.convertUTF8(jsonData)+')');		
		var tableId=param.tableId;
		var $table=jQuery('#'+tableId);
		var templateId=param.templateId;
		var list=jsonData[param.jsonDataList];
		if(list.length==0){
			$table.find("#loadMore,tbody").hide();
			$table.find("#noResult").show();
		}else{
			$table.find("#noResult").hide();
			if(param.flag=='firstLoad'){
				var jsonDataTmp=jQuery.extend(true,{},jsonData);
				if(list.length>param.onePageCount){
					$table.find("#loadMore").show();
					jsonData.nextStart=param.onePageCount;
					jsonDataTmp[param.jsonDataList]=list.slice(0,param.onePageCount);
				}else{
					$table.find("#loadMore").hide();
					jsonDataTmp[param.jsonDataList]=list.slice(0,list.length);
				}
				var template=Handlebars.compile(jQuery('#'+templateId).html());
				var html=template(jsonDataTmp);
				$table.children("tbody").append(html);
			}else if(param.flag=='loadMore'){
				var jsonDataTmp=jQuery.extend(true,{},jsonData);
				var startIndex=jsonData.nextStart;
				var listTemp=list.slice(startIndex,list.length);
				if(listTemp.length>param.onePageCount){
					$table.find("#loadMore").show();
					jsonData.nextStart=startIndex+param.onePageCount;
					jsonDataTmp[param.jsonDataList]=listTemp.slice(0,param.onePageCount);
				}else{
					$table.find("#loadMore").hide();
					jsonDataTmp[param.jsonDataList]=listTemp;
				}
				var template=Handlebars.compile(jQuery('#'+templateId).html());
				var html=template(jsonDataTmp);
				$table.children("tbody").append(html);
			}
		}
		if($table.attr("class")=="datatable"){
			ICBCInitTools.initDataTable();
		}else if($table.attr("class")=="expand_datatable"){
			ICBCInitTools.initExpandDataTable();
		}
	},	
	shakeToLoadMore:function(){
		try{
			if(jQuery('#loadMore').is(':visible')){
				if(typeof (loadMore) == 'function'){
					loadMore.call();
				}
			}
		}catch(e){
			console.log("Error: " + e);
		}
	},
};
// 异步请求方法
var ICBCAjaxTools = {
	ajaxPost : function(params) {
		var submitType = params.submitType;
		var postData = {};
		var url;
		var callBack = params.callBack;
		var failCallBack = params.failCallBack;
		var validator = params.validator;
		var showIndicator=true;
		if(params.showIndicator!=undefined&&params.showIndicator==false){
			showIndicator=false;
		}
		if (validator != undefined && typeof (validator) == 'function') {
			if (!validator())
				return;
		}
		if (submitType == "link") {
			var linkId = params.linkId;
			url = jQuery('#' + linkId).attr("href");
			postData = "";
		} else if (submitType == "form") {
			var formName = params.formName;
			var formSelect = "form[name=" + formName + "]";
			var $form=jQuery(formSelect);
			url = $form.attr("action");
			//判断是否需要加密处理
			if(ICBCEncrypt.isEncrypt($form)){
				//加密表单数据
				postData = ICBCEncrypt.getEncryptFormData($form);
			}else{
				postData = $form.serializeArray();			
			}
		} else if (submitType == "data") {
			postData = params.data;
			url = params.url;
		} else {
			return;
		}
		jQuery.ajax({
			type : "POST",
			url : url,
			data : postData,
			timeout : 90000,
			cache:false,
			contentType:'application/x-www-form-urlencoded;charset=utf-8',
			beforeSend : function(XMLHttpRequest) {
				XMLHttpRequest.setRequestHeader("X-ICBC-Channel-Client","AsyncRequest");
				XMLHttpRequest.setRequestHeader("cache-control","no-cache");
				if(showIndicator)
					ICBCPageTools.nativeShowIndicator();
			},
			complete : function() {
				if(showIndicator)
					ICBCPageTools.nativeHideIndicator();
			},
			success : function(result) {
				try{
					var tempData = eval('(' + ICBCUtilTools.convertUTF8(result) + ')');
					if (ICBCAjaxTools.processOpData(tempData)) {
						if (callBack != undefined && typeof (callBack) == 'function') {
							callBack(tempData.opdata,tempData.parameter);
						}
					}else{
						if (failCallBack != undefined && typeof (failCallBack) == 'function') {
							failCallBack();
						}
					}
				}catch(e){
					alert('请求处理失败，请稍后再试。');
					console.log(e);
					if (failCallBack != undefined && typeof (failCallBack) == 'function') {
						failCallBack();
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				//alert('网络请求失败、未完成或已超时。');
				if (failCallBack != undefined && typeof (failCallBack) == 'function') {
					failCallBack();
				}
			}
		});
	},
	copyFormElemet : function(element, targetForm) {
		var form = jQuery(targetForm);
		var value = jQuery(element).val();
		var name = jQuery(element).attr('name');
		var placeholder = jQuery(element).attr('placeholder');
		if(placeholder==value){
			value="";
		}
		var element = form.find('input[name=' + name + ']');
		if (element.length > 0) {
			element.val(value);
			return;
		} else {
			form.append('<input type=\"hidden\" name=\"' + name + '\" value=\"' + value + '\">');
		}
	},
	copyFormElemet2 : function(source,target) {
		var sourceValue = source.value;
		var sourcePlaceholder = jQuery(source).attr('placeholder');
		if(sourcePlaceholder==sourceValue){
			sourceValue="";
		}
		var targetValue=target.value;
		if(targetValue!=undefined){
			target.value=sourceValue;
		}
	},
	processOpData : function(data) {
		var opdata = data.opdata;
		if (opdata.tranErrCodeForJson != undefined) {
			if (opdata.tranErrCodeForJson == 'info') {
				alert(opdata.tranErrDispMsgForJson);
			} else {
				var html = '<table class="detail_table"><tr><td class="detail_td_left">信息代码</td><td class="detail_td_right">' + opdata.tranErrCodeForJson + '</td></tr><tr><td class="detail_td_left">提示信息</td><td class="detail_td_right">' + opdata.tranErrDispMsgForJson + '</td></tr></table>';
				alert(html);
				ICBCInitTools.initDataTable();
			}
			return false;
		} else {
			return true;
		}
	}
};
//加密处理
var ICBCEncrypt={
	key:'6a8w0c91kc7',
	//判断是否需要加密处理
	isEncrypt:function($form){
		var encryptField=$form.find("input[name^='_encrypt_']");
		if(encryptField.length>0){
			return true;
		}else{
			return false;
		}
	},
	// 获取加密表单数据
	getEncryptFormData:function($form){
		var _encrypt_random = ICBCEncrypt.getRandom(5);
		var _encrypt_params = _encrypt_random;
		var postData=$form.serializeArray();
		jQuery.each(postData,function(index,element){
			var name=element.name;
			name=(name==undefined?"":name);
			var value=element.value;
			value=(value==undefined?"":value);
			element.value=value;
			if(name.indexOf("_encrypt_")==0){
				name=name.substr(9);
				element.name=name;
				_encrypt_params+="|"+name;
				var key=ICBCEncrypt.key+_encrypt_random;
				element.value=ICBCEncrypt.AES(value,key);
			}
		});
		postData.push({name:'_encrypt_params',value:_encrypt_params});
		var submit=$form.find("input[type=submit]");
		if(submit.length>0){
			postData.push({name:submit.attr('name'),value:submit.val()});
		}
		return postData;
	},
	//提交加密表单
	submitEncryptForm:function($form){
		var formName=$form.attr('name');
		if(!jQuery('form[name='+formName+']').validate().form())
			return;
		var postData=this.getEncryptFormData($form);
		var formMethod=$form.attr('method');
		var formAction=$form.attr('action');
		// 提交表单
		var encryptForm=jQuery("<form style='display:none' name='"+formName+"' method='"+formMethod+"' action='"+formAction+"'></form>");
		jQuery.each(postData,function(index,element){
			if(element.name=="submit"){
				encryptForm.append("<input type='submit' name='"+element.name+"' value='"+element.value+"'/>");
			}else{
				encryptForm.append("<input type='hidden' name='"+element.name+"' value='"+element.value+"'/>");
			}
		});
		if(ICBCUtilTools.isWindowsPhone()){
			jQuery('body').append(encryptForm);
		}
		encryptForm.removeAttr("onsubmit");
		encryptForm.find('[name=submit]').click();
	},
	getRandom:function(n){
		var random=Math.floor(Math.random()*Math.pow(10,n))+"";
		if(random.length<n){
			for(var i=random.length;i<n;i++)
				random+="0";
		}
		return random;
	},
	AES:function(data,keyTmp){
		var key=CryptoJS.enc.Utf8.parse(keyTmp); 
		var iv=CryptoJS.enc.Utf8.parse(keyTmp);
		var dataTmp=encodeURI(data);
		var srcs=CryptoJS.enc.Utf8.parse(dataTmp);
		var encrypted = CryptoJS.AES.encrypt(srcs,key,{iv:iv,mode:CryptoJS.mode.CBC});
		return encrypted.toString();
	},
};
//安全键盘
var ICBCSafeKeyBoard={
	SafeKeyBoardHeight:290,
	AndroidVersion:ICBCUtilTools.getAndroidVersion(),
	WindowHeight:jQuery(window).height(),
	initSafeEdit:function(){
		var $allInput=jQuery('input[data-type=safeKeyBoard]');
		$allInput.each(function(index,element){
			var $current=jQuery(element);
			var dataName=$current.attr('data-name');
			var $currentCopy=$current.clone();
			$currentCopy.removeAttr('data-type').removeAttr('data-name');
			$currentCopy.attr('type','hidden');
			$currentCopy.attr('name',dataName);
			$currentCopy.attr('value','');
			//补充隐藏域
			$current.after($currentCopy);
			$current.after('<input type="hidden" name="'+dataName+'Rule" value=""/>');
			$current.after('<input type="hidden" name="'+dataName+'ChangeRule" value=""/>');
			if(ICBCUtilTools.isWindowsPhone()){
				$current.hide();
				$currentCopy.attr('type','password');
				return;
			}
			//失去焦点
			$current.blur();
			//设置只读
			$current.attr('readonly','readonly');
			//设置id
			$current.attr('id',index+"");
			//绑定点击事件
			$current.bind('click',function(){
				//置空值
				$current.val("");
				$currentCopy.val("");
				if(ICBCUtilTools.isiPhone()){
					var offsetTopTmp=$current.offset().top;
					var windowsHeight=jQuery(window).height();
					var bodyHeight=jQuery('body').height();
					var offsetTop=0;
					if(offsetTopTmp>windowsHeight){
						offsetTop=windowsHeight-(bodyHeight-offsetTopTmp);
					}else{
						offsetTop=offsetTopTmp;
					}
					ICBCPageTools.iOSExcuteNativeMethod("Native://callSoftKeyBoard;"+index+";"+$current.attr('maxlength')+";"+offsetTop);
				}else if(ICBCUtilTools.isAndroid){
					ICBCSafeKeyBoard.moveInputHeight($current);
					prompt("callsoftKeyBoard",index+";"+$current.attr('maxlength'));
				}
			});
		});
	},
	initAmountEdit:function(){
		var $allInput=jQuery('input[data-type=amountKeyBoard]');
		$allInput.each(function(index,element){
			var $current=jQuery(element);
			//区分版本
			if(ICBCUtilTools.isWindowsPhone()){
				//WP无法实现，不处理
				return;
			}else if(ICBCUtilTools.isICBCAndroidClient()){
				//Android 特殊处理
				if(ICBCUtilTools.isCollegeClient()){
					$current.bind('focus',function(){
						//告诉客户端设置为金额键盘
						ICBCUtilTools.sleep(100);
						prompt("callNewAmountKeyBoard",$current.attr('name'));
					}).bind('blur',function(){
						prompt("callCleanAmountKeyBoard",'');
						//延迟100ms
						ICBCUtilTools.sleep(150);
					});
				}else if(ICBCSafeKeyBoard.AndroidVersion<410&&ICBCSafeKeyBoard.AndroidVersion>400){
					return;
				}else{
					if(ICBCUtilTools.getAndroidClientVersion()<1014){
						//旧版本不兼容
						return;
					}
					$current.bind('focus',function(){
						//告诉客户端设置为金额键盘
						ICBCUtilTools.sleep(100);
						if(ICBCUtilTools.getAndroidClientVersion()<1015){
							//旧版本
							prompt("callAmountKeyBoard",'');
						}else{
							prompt("callNewAmountKeyBoard",$current.attr('name'));
						}
					}).bind('blur',function(){
						if(ICBCSafeKeyBoard.AndroidVersion>=500){
							prompt("callCleanAmountKeyBoard",'');
						}
						//延迟100ms
						ICBCUtilTools.sleep(150);
					});
				}
			}else if(ICBCUtilTools.isICBCiPhoneClient()){
				//iPhone 特殊处理
				if(ICBCUtilTools.isCollegeClient()){
					ICBCSafeKeyBoard.modifyInputText($current,index);
				}else{
					var version=ICBCUtilTools.getiPhoneClientFullVersion(window['user-agent']);
					if(version>1000&&version<10000){
						if(version<=1015){
							return;
						}
					}else if(version>10000){
						if(version<10160){
							return;
						}
					}else if(version==1000){
						return;
					}
					ICBCSafeKeyBoard.modifyInputText($current,index);
				}
			}else{
				$current.removeAttr('data-type');
			}
		});
	},
	modifyInputText:function($current,index){
		//重写该输入域的name为临时name
		var dataName=$current.attr('name');
		var defaultValue=$current.val();
		defaultValue=(defaultValue==undefined?"":defaultValue);
		var blurfunc=$current[0].onblur;
		$current.removeAttr('onblur');
		$current[0].blurfunc=blurfunc;
		//设置只读
		$current.attr('readonly','readonly');
		//设置id
		var id="amountKeyBoard_"+index;
		$current.attr('amountKeyBoard_id',id);
		//绑定点击事件
		$current.bind('click',function(){
			var defaultValue=$current.val();
			var maxlength=$current.attr('maxlength');
			maxlength=(maxlength==undefined?"100":maxlength);
			//置空值
			$current.val("");
			var offsetTopTmp=$current.offset().top;
			var offsetTop=offsetTopTmp-window.scrollY;
			var $scope=jQuery(document);
			if(ICBCUtilTools.isiPhone()){
				ICBCPageTools.iOSExcuteNativeMethod("Native://callAmountSoftKeyBoard;"+id+";"+maxlength+";"+offsetTop+";"+defaultValue);
				window.setHeaderNotFix();
			}else if(ICBCUtilTools.isAndroid()){
				try{
				var param={};
				param.id=id;
				param.maxlength=maxlength;
				param.defaultValue=defaultValue;
				prompt("callCustomAmountKeyBoard",JSON.stringify(param));
				ICBCSafeKeyBoard.moveInputHeight($current);
				}catch(e){
					console.log(e);
				}
			}
		});	
	},
	setText:function(param){
		var $input=jQuery('#'+param.id);
		$input.val(param.displayStr);
		var dataName=$input.attr('data-name');
		jQuery('input[name='+dataName+']').val(param.password);
		jQuery('input[name='+dataName+'ChangeRule]').val(param.changeRule);
		jQuery('input[name='+dataName+'Rule]').val(param.rule);
	},
	setAmountSoftKeyBoardText:function(param){
		try{
			var $input=jQuery('input[amountKeyBoard_id='+param.id+']');
			var maxlength=$input.attr('maxlength');
			maxlength=(maxlength==undefined?"100":maxlength);
			if(parseInt(param.displayStr.length)<=parseInt(maxlength)){
				$input.val(param.displayStr).keyup();
			}
		}catch(e){
		}
	},
	callAmountSoftKeyBoardBlur:function(param){
		try{
			var $input=jQuery('input[amountKeyBoard_id='+param.id+']');
			if($input[0].blurfunc!=undefined&&typeof($input[0].blurfunc)=='function'){
				$input[0].blurfunc.call(); 
			}
			window.setHeaderFix();
		}catch(e){
		}
	},	
	changeToSystemKeyBoard:function(id){
		var $input=jQuery('#'+id);
		$input.hide();
		var dataName=$input.attr('data-name');
		jQuery('input[name='+dataName+'Rule],input[name='+dataName+'ChangeRule]').val("");
		var $inputNormal=jQuery('input[name='+dataName+']');
		$inputNormal.attr('type','password').val('').focus();
		ICBCSafeKeyBoard.moveInputHeight($inputNormal);
		//失去焦点时切换到安全键盘
		$inputNormal.blur(function(){
			$input.val($inputNormal.val()+"");
			$input.show();
			$inputNormal.attr('type','hidden');
			if(ICBCUtilTools.isiPhone()){
				ICBCPageTools.iOSExcuteNativeMethod("Native://hideSystemKeyBoard");
			}else if(ICBCUtilTools.isAndroid){
				prompt("hideSystemKeyBoard","");
			}
		});
	},
	moveInputHeight:function($current){
		try{
			window.setHeaderFix();
		}catch(e){}
		setTimeout(function(){
			var windowsHeight=ICBCSafeKeyBoard.WindowHeight;
			var bodyHeight=jQuery('body').height();
			var offsetTopTmp=$current.offset().top;
			var offsetTop=offsetTopTmp-window.scrollY;
			if(windowsHeight-ICBCSafeKeyBoard.SafeKeyBoardHeight<offsetTop){
				var moveHeight=offsetTop-(windowsHeight-ICBCSafeKeyBoard.SafeKeyBoardHeight)+50;
				jQuery('#content').css('top',"-"+moveHeight+"px");
			}
		},300);
	}
};

//兼容客户端版本
function returnButtonClick() {
	var popselectpanel=jQuery('#popselectpanel_container');
	if(popselectpanel.length>0){
		popselectpanel.remove();
		jQuery('header,footer,#content').show();
		return;
	}
	var alertDialog=jQuery('#alert_dialog:visible');
	if(alertDialog.length>0){
		return;
	}
	var popbtnpanel=jQuery('#popbtnpanel_container:visible');
	if(popbtnpanel.length>0){
		return;
	}
	var returnButton = jQuery('#returnButton:visible');
	if (returnButton.length == 1) {
		returnButton.click();
	}
};
// U盾验签成功后提交确认页面表单,iPhone、Android版本回调使用
function UKeyConfirmFormSubmit(arg) {
	try {
		var formName = arg.attachData[0];
		var submitParamValue = arg.attachData[1];
		var UKeyTranDataInfo = arg.attachData[2];
		var formSelect = "form[name=" + formName + "]";
		var $form=jQuery(formSelect);
		$form.append('<input type="hidden" name="UKeyTranDataInfo" value="' + UKeyTranDataInfo + '"/>');
		$form.append('<input type="hidden" name="NativeFlag" value="0"/>');
		var submitParam = "ICBCSubmit";
		if (submitParamValue != undefined && submitParamValue != "") {
			submitParam = submitParamValue;
		}
		var submit = $form.find('input[name=submit]');
		if (submit.length > 0) {
			submit.val(submitParam);
		} else {
			$form.append('<input style="display:none" type="submit" name="submit" value="' + submitParam + '" />');
		}
		$form.removeAttr("onsubmit");
		$form.find('[name=submit]').click();		
	} catch (e) {
		console.log("Error: " + e);
	}
}