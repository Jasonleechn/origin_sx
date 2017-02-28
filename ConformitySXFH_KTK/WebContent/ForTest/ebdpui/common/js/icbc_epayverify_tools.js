var ICBCEpayVerifyTools = {
	debug:false,
	// 获取绑定设备id接口
	getEpayDeviceIdCallBack:undefined,
	getEpayDeviceId : function(params) {
		try {
			var paramSend={};
			//必输校验
			//回调函数
			if (params.callBack == undefined || typeof params.callBack != 'function') {
				this.log('getEpayDeviceId-callBack参数不正确');
				return;
			}
			paramSend.callBack="ICBCEpayVerifyTools.getEpayDeviceIdCallBack";
			this.getEpayDeviceIdCallBack = params.callBack;
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://EpayVerify=getEpayDeviceId&params="+JSON.stringify(paramSend));
			}else if (ICBCUtilTools.isAndroid()) {
				var resultString=Native.getEpayDeviceId();
				var result = JSON.parse(resultString);
				this.getEpayDeviceIdCallBack(result);
			}
		} catch (e) {
			this.log(e);
		}
	},	
	// 获取客户端绑定关系接口
	getEpayClientBindInfoCallBack:undefined,
	getEpayClientBindInfo : function(params) {
		try {
			var paramSend={};
			//必输校验
			//回调函数
			if (params.callBack == undefined || typeof params.callBack != 'function') {
				this.log('getEpayClientBindInfo-callBack参数不正确');
				return;
			}
			paramSend.callBack="ICBCEpayVerifyTools.getEpayClientBindInfoCallBack";
			this.getEpayClientBindInfoCallBack = params.callBack;
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://EpayVerify=getEpayClientBindInfo&params="+JSON.stringify(paramSend));
			}else if (ICBCUtilTools.isAndroid()) {
				var resultString=Native.getEpayClientBindInfo();
				if(resultString==undefined||resultString==null){
					resultString="{'iClientDeviceList':[]}";
				}
				var result = JSON.parse(resultString);
				this.getEpayClientBindInfoCallBack(result);
			}
		} catch (e) {
			this.log(e);
		}
	},
	// 删除客户端绑定关系接口
	delEpayClientBindInfoCallBack:undefined,
	delEpayClientBindInfo : function(params) {
		try {
			var paramSend={};
			//必输校验
			//客户信息号
			if (params.cisnum==undefined){
				this.log('delEpayClientBindInfo-cisnum参数不正确');
				return;
			}
			paramSend.cisnum=params.cisnum;
			//非必输校验
			//回调函数
			if (params.callBack != undefined && typeof params.callBack == 'function') {
				this.getEpayClientBindInfoCallBack = params.callBack;
				paramSend.callBack="ICBCEpayVerifyTools.delEpayClientBindInfoCallBack";
			}else{
				paramSend.callBack="";
			}
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://EpayVerify=delEpayClientBindInfo&params="+JSON.stringify(paramSend));
			}else if (ICBCUtilTools.isAndroid()) {
				var result=Native.delEpayClientBindInfo(JSON.stringify(paramSend));
				if(this.delEpayClientBindInfoCallBack!=undefined)
					this.delEpayClientBindInfoCallBack(result);
			}
		} catch (e) {
			this.log(e);
		}
	},
	// 插入或修改客户端绑定关系接口
	handleEpayClientBindInfoCallBack:undefined,
	handleEpayClientBindInfo : function(params) {
		try {
			var paramSend={};
			//必输校验
			//客户信息号
			if (params.cisnum==undefined){
				this.log('handleEpayClientBindInfo-cisnum参数不正确');
				return;
			}
			paramSend.cisnum=params.cisnum;
			//手机号
			if (params.epaymobile==undefined){
				this.log('handleEpayClientBindInfo-epaymobile参数不正确');
				return;
			}
			paramSend.epaymobile=params.epaymobile;			
			//非必输校验
			//回调函数
			if (params.callBack != undefined && typeof params.callBack == 'function') {
				this.handleEpayClientBindInfoCallBack = params.callBack;
				paramSend.callBack="ICBCEpayVerifyTools.handleEpayClientBindInfoCallBack";
			}else{
				paramSend.callBack="";
			}
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://EpayVerify=handleEpayClientBindInfo&params="+JSON.stringify(paramSend));
			}else if (ICBCUtilTools.isAndroid()) {
				var result=Native.handleEpayClientBindInfo(JSON.stringify(paramSend));
				if(this.handleEpayClientBindInfoCallBack!=undefined)
					this.handleEpayClientBindInfoCallBack(result);
			}
		} catch (e) {
			this.log(e);
		}
	},
	// 设置支付密码接口
	setEpayPasswordSuccessCallBack:undefined,
	setEpayPasswordCancelCallBack:undefined,
	setEpayPassword : function(params) {
		try {
			var paramSend={};
			//必输校验
			//客户信息号
			if (params.cisnum==undefined){
				this.log('setEpayPassword-cisnum参数不正确');
				return;
			}
			paramSend.cisnum=params.cisnum;
			//手机号
			if (params.epaymobile==undefined){
				this.log('setEpayPassword-epaymobile参数不正确');
				return;
			}
			paramSend.epaymobile=params.epaymobile;
			//设置支付密码请求地址及参数
			if (params.requestUrlAndParams==undefined){
				this.log('setEpayPassword-requestUrlAndParams参数不正确');
				return;
			}
			paramSend.requestUrlAndParams=encodeURI(params.requestUrlAndParams);			
			//成功回调函数
			if (params.successCallBack == undefined || typeof params.successCallBack != 'function') {
				this.log('setEpayPassword-successCallBack参数不正确');
				return;
			}
			paramSend.successCallBack="ICBCEpayVerifyTools.setEpayPasswordSuccessCallBack";
			this.setEpayPasswordSuccessCallBack = params.successCallBack;
			//非必输校验
			//取消回调函数
			if (params.cancelCallBack != undefined && typeof params.cancelCallBack == 'function') {
				this.setEpayPasswordCancelCallBack = params.cancelCallBack;
				paramSend.cancelCallBack="ICBCEpayVerifyTools.setEpayPasswordCancelCallBack";
			}else{
				paramSend.cancelCallBack="";
			}
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://EpayVerify=setEpayPassword&params="+JSON.stringify(paramSend));
			}else if (ICBCUtilTools.isAndroid()) {
				Native.setEpayPassword(JSON.stringify(paramSend));
			}
		} catch (e) {
			this.log(e);
		}
	},
	// 修改支付密码接口
	modifyEpayPasswordSuccessCallBack:undefined,
	modifyEpayPasswordFailCallBack:undefined,
	modifyEpayPasswordCancelCallBack:undefined,
	modifyEpayPassword : function(params) {
		try {
			var paramSend={};
			//必输校验
			//修改支付密码请求地址及参数
			if (params.requestUrlAndParams==undefined){
				this.log('modifyEpayPassword-requestUrlAndParams参数不正确');
				return;
			}
			paramSend.requestUrlAndParams=encodeURI(params.requestUrlAndParams);			
			//成功回调函数
			if (params.successCallBack == undefined || typeof params.successCallBack != 'function') {
				this.log('modifyEpayPassword-successCallBack参数不正确');
				return;
			}
			paramSend.successCallBack="ICBCEpayVerifyTools.modifyEpayPasswordSuccessCallBack";
			this.modifyEpayPasswordSuccessCallBack = params.successCallBack;
			//失败回调函数
			if (params.failCallBack == undefined || typeof params.failCallBack != 'function') {
				this.log('modifyEpayPassword-failCallBack参数不正确');
				return;
			}
			paramSend.failCallBack="ICBCEpayVerifyTools.modifyEpayPasswordFailCallBack";
			this.modifyEpayPasswordFailCallBack = params.failCallBack;			
			//非必输校验
			//取消回调函数
			if (params.cancelCallBack != undefined && typeof params.cancelCallBack == 'function') {
				this.modifyEpayPasswordCancelCallBack = params.cancelCallBack;
				paramSend.cancelCallBack="ICBCEpayVerifyTools.modifyEpayPasswordCancelCallBack";
			}else{
				paramSend.cancelCallBack="";
			}
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://EpayVerify=modifyEpayPassword&params="+JSON.stringify(paramSend));
			}else if (ICBCUtilTools.isAndroid()) {
				Native.modifyEpayPassword(JSON.stringify(paramSend));
			}
		} catch (e) {
			this.log(e);
		}
	},
	//验证支付密码接口
	verifyEpayPasswordSuccessCallBack:undefined,
	verifyEpayPasswordFailCallBack:undefined,
	verifyEpayPasswordCancelCallBack:undefined,
	verifyEpayPasswordLeftLinkCallBack:undefined,
	verifyEpayPasswordRightLinkCallBack:undefined,
	verifyEpayPassword : function(params) {
		try {
			var paramSend={};
			//必输校验
			//验证支付密码请求地址及参数
			if (params.requestUrlAndParams==undefined){
				this.log('verifyEpayPassword-requestUrlAndParams参数不正确');
				return;
			}
			paramSend.requestUrlAndParams=encodeURI(params.requestUrlAndParams);			
			//成功回调函数
			if (params.successCallBack == undefined || typeof params.successCallBack != 'function') {
				this.log('verifyEpayPassword-successCallBack参数不正确');
				return;
			}
			paramSend.successCallBack="ICBCEpayVerifyTools.verifyEpayPasswordSuccessCallBack";
			this.verifyEpayPasswordSuccessCallBack = params.successCallBack;
			//失败回调函数
			if (params.failCallBack == undefined || typeof params.failCallBack != 'function') {
				this.log('verifyEpayPassword-failCallBack参数不正确');
				return;
			}
			paramSend.failCallBack="ICBCEpayVerifyTools.verifyEpayPasswordFailCallBack";
			this.verifyEpayPasswordFailCallBack = params.failCallBack;
			//提示信息
			if (params.tipsArray==undefined){
				this.log('verifyEpayPassword-tipsArray参数不正确');
				return;
			}
			var tipsArrayString=JSON.stringify(params.tipsArray);
			tipsArrayString=tipsArrayString.replace(/"/g,"'");
			paramSend.tipsArray=encodeURI(tipsArrayString);			
			//非必输校验
			//取消回调函数
			if (params.cancelCallBack != undefined && typeof params.cancelCallBack == 'function') {
				this.verifyEpayPasswordCancelCallBack = params.cancelCallBack;
				paramSend.cancelCallBack="ICBCEpayVerifyTools.verifyEpayPasswordCancelCallBack";
			}else{
				paramSend.cancelCallBack="";
			}
			//卡列表
			if (params.cardList != undefined) {
				var cardListString=JSON.stringify(params.cardList);
				cardListString=cardListString.replace(/"/g,"'");
				paramSend.cardList=encodeURI(cardListString);
			}else{
				paramSend.cardList="";
			}
			//左下链接
			if (params.leftLink != undefined&&params.leftLinkCallBack!=undefined&&typeof params.leftLinkCallBack == 'function') {
				paramSend.leftLink=encodeURI(params.leftLink);
				this.verifyEpayPasswordLeftLinkCallBack = params.leftLinkCallBack;
				paramSend.leftLinkCallBack="ICBCEpayVerifyTools.verifyEpayPasswordLeftLinkCallBack";
			}else{
				paramSend.leftLink="";
				paramSend.leftLinkCallBack="";
			}
			//右下链接
			if (params.rightLink != undefined&&params.rightLinkCallBack!=undefined&&typeof params.rightLinkCallBack == 'function') {
				paramSend.rightLink=encodeURI(params.rightLink);
				this.verifyEpayPasswordRightLinkCallBack = params.rightLinkCallBack;
				paramSend.rightLinkCallBack="ICBCEpayVerifyTools.verifyEpayPasswordRightLinkCallBack";
			}else{
				paramSend.rightLink="";
				paramSend.rightLinkCallBack="";
			}
			if (ICBCUtilTools.isiPhone()) {
				ICBCPageTools.iOSExcuteNativeMethod("Native://EpayVerify=verifyEpayPassword&params="+JSON.stringify(paramSend));
			}else if (ICBCUtilTools.isAndroid()) {
				Native.verifyEpayPassword(JSON.stringify(paramSend));
			}
		} catch (e) {
			this.log(e);
		}
	},	
	log:function(error){
		console.log("Error: " + error);
		if(this.debug){
			alert1("Error: " + error);
		}
	}
};