var ICBCSpecialCardTools = {
	sUserAgent : navigator.userAgent.toLowerCase(),
	isiPhone : function() {
		return (this.sUserAgent.match(/iphone os/i) == "iphone os");
	},
	isAndroid : function() {
		return (this.sUserAgent.match(/android/i) == "android");
	},
	isWindowsPhone : function() {
		return (this.sUserAgent.match(/msie/i) == "msie");
	},
	isICBCiPhoneClient : function() {
		return (this.sUserAgent.match(/icbciphonebs/i) == "icbciphonebs");
	},
	isICBCAndroidClient : function() {
		return (this.sUserAgent.match(/icbcandroidbs/i) == "icbcandroidbs");
	},
	isICBCWindowsPhoneClient : function() {
		return (this.sUserAgent.match(/icbcwindowsphonebs/i) == "icbcwindowsphonebs");
	},
	// 显示遮罩
	nativeShowIndicator : function() {
		try {
			if (this.isAndroid()) {
				Native.showIndicator();
			}
			if (this.isiPhone()) {
				this.iOSExcuteNativeMethod("Native://showIndicator=1");
			}
		} catch (e) {
		}
	},
	// 隐藏遮罩
	nativeHideIndicator : function() {
		try {
			if (this.isAndroid()) {
				Native.hideIndicator();
			}
			if (this.isiPhone()) {
				this.iOSExcuteNativeMethod("Native://hideIndicator=1");
			}
		} catch (e) {
		}
	},
	// 判断是否安装了卡片
	checkInstallCallBack : undefined,
	checkInstall : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.checkInstallCallBack = param.callBack;
			} else {
				return;
			}
			this.nativeShowIndicator();
			if (this.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://checkInstallForConformity=1&type=checkInstallForConformity&responseCallBack=ICBCSpecialCardTools.callBack');
			} else if (this.isAndroid()) {
				var resultString = Native.checkInstallForConformity();
				this.callBack("checkInstall", resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 启动服务
	startConformityTransmitCallBack : undefined,
	startConformityTransmit : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.startConformityTransmitCallBack = param.callBack;
			} else {
				return;
			}
			var params={};
			if (param.deviceType == undefined) {
				return;
			} else {
				params.deviceType = param.deviceType;
			}
			if (this.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://startConformityTransmit=1&type=startConformityTransmit&responseCallBack=ICBCSpecialCardTools.callBack&params='+JSON.stringify(params));
			} else if (this.isAndroid()) {
				Native.startConformityTransmit(JSON.stringify(params));
				this.callBack("startConformityTransmit", "{}");
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 结束服务
	endConformityTransmit : function() {
		try {
			if (this.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://endConformityTransmit=1');
			} else if (this.isAndroid()) {
				Native.endConformityTransmit();
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 执行指令
	executeConformityTransmitCallBack : undefined,
	executeConformityTransmitStep : undefined,
	executeConformityTransmit : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.executeConformityTransmitCallBack = param.callBack;
			} else {
				return;
			}
			if (param.msgFlag == undefined || param.msgBuf == undefined || param.step == undefined) {
				return;
			}
			var params = {};
			this.executeConformityTransmitStep=param.step;
			params.msgFlag = param.msgFlag;
			params.msgBuf = param.msgBuf;
			this.nativeShowIndicator();
			if (this.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://executeConformityTransmit=1&type=executeConformityTransmit&responseCallBack=ICBCSpecialCardTools.callBack&params=' + JSON.stringify(params));
			} else if (this.isAndroid()) {
				var resultString = Native.executeConformityTransmit(JSON.stringify(params));
				this.callBack("executeConformityTransmit", resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	//开启蓝牙扫描
	startBlueToothDiscoveryForConformity : function() {
		try {
			if (this.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://startBlueToothDiscoveryForConformity=1');
			} else if (this.isAndroid()) {
				var resultString = Native.startBlueToothDiscoveryForConformity();
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	//关闭蓝牙扫描
	cancelBlueToothDiscoveryForConformity : function() {
		try {
			if (this.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://cancelBlueToothDiscoveryForConformity=1');
			} else if (this.isAndroid()) {
				var resultString = Native.cancelBlueToothDiscoveryForConformity();
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	callBack : function(type, resultString) {
		try {
			this.nativeHideIndicator();
			var result = eval("(" + resultString + ")");
			if (type == "checkInstall") {
				this.checkInstallCallBack(result);
			}
			if (type == "startConformityTransmit") {
				this.startConformityTransmitCallBack();
			}
			if (type == "executeConformityTransmit") {
				result.step=this.executeConformityTransmitStep;
				this.executeConformityTransmitCallBack(result);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
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
};