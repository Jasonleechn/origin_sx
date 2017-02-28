var ICBCMapTools = {
	openGPS : function() {
		if (ICBCUtilTools.isiPhone()) {
			ICBCPageTools.iOSExcuteNativeMethod("Native://openGPS=1");
		}else if (ICBCUtilTools.isAndroid()) {
			NativeMap.openGPS(false);
		}
	},
	closeGPS : function() {
		if (ICBCUtilTools.isiPhone()) {
			ICBCPageTools.iOSExcuteNativeMethod("Native://closeGPS=1");
		}else if (ICBCUtilTools.isAndroid()) {
			NativeMap.closeGPS();
		}
	},	
	getMyLocationCallBack:undefined,
	getMyLocation : function(param){
		if (param.callBack==undefined||typeof param.callBack != 'function') {
			return;
		}
		ICBCMapTools.getMyLocationCallBack=param.callBack;
		if (ICBCUtilTools.isiPhone()) {
			ICBCPageTools.iOSExcuteNativeMethod("Native://getMyLocation=1&callBack=ICBCMapTools.getMyLocationCallBack");
		}else if (ICBCUtilTools.isAndroid()) {
			try{
				var jsonDataString=NativeMap.getJsonLocation();
				var jsonData=eval('('+jsonDataString+')');
				ICBCMapTools.getMyLocationCallBack(jsonData);
			}catch(e){
				console.log(e);
			}
		}
	}
};