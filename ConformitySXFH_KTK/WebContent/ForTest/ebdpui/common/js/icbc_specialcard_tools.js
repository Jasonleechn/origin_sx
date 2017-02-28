var ICBCSpecialCardTools = {
	SDType:"SD",
	NFCType:"NFC",
	DOVILAType:"DOVILA",
	// 判断是否安装了卡片
	checkInstallCardCallBack : undefined,
	checkInstallCard : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.checkInstallCardCallBack = param.callBack;
			} else {
				return;
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://checkInstallCard=1&type=checkInstallCard&responseCallBack=ICBCSpecialCardTools.callBack');
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.checkInstallCard();
				this.callBack("checkInstallCard", resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 判断是否安装了外接设备
	checkInstallDeviceCallBack : undefined,
	checkInstallDevice : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.checkInstallDeviceCallBack = param.callBack;
			} else {
				return;
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://checkInstallDevice=1&type=checkInstallDevice&responseCallBack=ICBCSpecialCardTools.callBack');
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.checkInstallDevice();
				this.callBack("checkInstallDevice", resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 查询卡片信息
	queryCardInfoCallBack : undefined,
	queryCardInfoWithoutErrorForCustomType:function(param){
		param._type=param.deviceType;
		param._withoutError=true;
		this.queryCardInfo(param);
	},
	queryCardInfoForCustomType:function(param){
		param._type=param.deviceType;
		this.queryCardInfo(param);
	},	
	queryCardInfoWithoutErrorForNFC:function(param){
		param._type=this.NFCType;
		param._withoutError=true;
		this.queryCardInfo(param);
	},
	queryCardInfoForNFC:function(param){
		param._type=this.NFCType;
		this.queryCardInfo(param);
	},
	queryCardInfoWithoutError:function(param){
		param._withoutError=true;
		this.queryCardInfo(param);
	},
	queryCardInfo : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.queryCardInfoCallBack = param.callBack;
			} else {
				return;
			}
			if(param._type==undefined){
				param._type=this.SDType;
			}
			var type="queryCardInfo";
			if(param._withoutError!=undefined&&param._withoutError){
				type="queryCardInfoWithoutError";
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://queryCardInfo=1&type='+type+'&deviceType='+param._type+'&responseCallBack=ICBCSpecialCardTools.callBack');
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.queryCardInfo(param._type);
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 查询交易明细
	queryCardTradeDetailCallBack : undefined,
	queryCardTradeDetailWithoutErrorForCustomType:function(param){
		param._type=param.deviceType;
		param._withoutError=true;
		this.queryCardTradeDetail(param);
	},
	queryCardTradeDetailForCustomType:function(param){
		param._type=param.deviceType;
		this.queryCardTradeDetail(param);
	},		
	queryCardTradeDetailWithoutErrorForNFC:function(param){
		param._type=this.NFCType;
		param._withoutError=true;
		this.queryCardTradeDetail(param);
	},
	queryCardTradeDetailForNFC:function(param){
		param._type=this.NFCType;
		this.queryCardTradeDetail(param);
	},
	queryCardTradeDetailWithoutError:function(param){
		param._withoutError=true;
		this.queryCardTradeDetail(param);
	},
	queryCardTradeDetail : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.queryCardTradeDetailCallBack = param.callBack;
			} else {
				return;
			}
			if (param.startDate == undefined || param.endDate == undefined) {
				return;
			}
			if(param._type==undefined){
				param._type=this.SDType;
			}
			var type="queryCardTradeDetail";
			if(param._withoutError!=undefined&&param._withoutError){
				type="queryCardTradeDetailWithoutError";
			}			
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://queryCardTradeDetail=1&type='+type+'&deviceType='+param._type+'&responseCallBack=ICBCSpecialCardTools.callBack&params={"startDate":"'+param.startDate+'","endDate":"'+param.endDate+'"}');
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.queryCardTradeDetail(param._type,'{"startDate":"'+param.startDate+'","endDate":"'+param.endDate+'"}');
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 服务器应用查询
	serverAppQueryCallBack : undefined,
	serverAppQuery : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.serverAppQueryCallBack = param.callBack;
			} else {
				return;
			}
			if (param.areaCode == undefined || param.netCode == undefined || param.terllerCode == undefined) {
				return;
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				alert('暂不支持iPhone版本');
			} else if (ICBCUtilTools.isAndroid()) {
				var params={};
				params.areaCode=param.areaCode;
				params.netCode=param.netCode;
				params.terllerCode=param.terllerCode;
				var resultString = Native.serverAppQuery(JSON.stringify(params));
				this.callBack("serverAppQuery", resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 卡片应用查询
	cardAppQueryCallBack : undefined,
	cardAppQuery : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.cardAppQueryCallBack = param.callBack;
			} else {
				return;
			}
			if (param.areaCode == undefined || param.netCode == undefined || param.terllerCode == undefined) {
				return;
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				alert('暂不支持iPhone版本');
			} else if (ICBCUtilTools.isAndroid()) {
				var params={};
				params.areaCode=param.areaCode;
				params.netCode=param.netCode;
				params.terllerCode=param.terllerCode;
				var resultString = Native.cardAppQuery(JSON.stringify(params));
				this.callBack("cardAppQuery", resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 卡片应用下载
	cardAppDownloadCallBack : undefined,
	cardAppDownload : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.cardAppDownloadCallBack = param.callBack;
			} else {
				return;
			}
			if (param.areaCode == undefined || param.netCode == undefined || param.terllerCode == undefined || param.apppletId==undefined) {
				return;
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				alert('暂不支持iPhone版本');
			} else if (ICBCUtilTools.isAndroid()) {
				var params={};
				params.areaCode=param.areaCode;
				params.netCode=param.netCode;
				params.terllerCode=param.terllerCode;
				params.apppletId=param.apppletId;
				var resultString = Native.cardAppDownload(JSON.stringify(params));
				this.callBack("cardAppDownload", resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},			
	// 圈存
	cardStorageCallBack:undefined,
	cardStorageWithoutErrorForCustomType:function(param){
		param._type=param.deviceType;
		param._withoutError=true;
		this.cardStorage(param);
	},
	cardStorageForCustomType:function(param){
		param._type=param.deviceType;
		this.cardStorage(param);
	},	
	cardStorageWithoutErrorForNFC:function(param){
		param._type=this.NFCType;
		param._withoutError=true;
		this.cardStorage(param);
	},	
	cardStorageForNFC:function(param){
		param._type=this.NFCType;
		this.cardStorage(param);
	},
	cardStorageWithoutError:function(param){
		param._withoutError=true;
		this.cardStorage(param);
	},
	cardStorage:function(param){
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.cardStorageCallBack = param.callBack;
			} else {
				return;
			}
			if(param.step==undefined||(param.step!="first"&&param.step!="second")){
				return;
			}
			if(param._type==undefined){
				param._type=this.SDType;
			}
			var type="cardStorage";
			if(param._withoutError!=undefined&&param._withoutError){
				type="cardStorageWithoutError";
			}
			var params={};
			if(param.step=="first"){
				if(param.authAmt==undefined){
					return;
				}
				params.step="first";
				params.authAmt=param.authAmt;
			}else if(param.step=="second"){
				if(param.authAmt==undefined||param.arpc==undefined||param.arpcrc==undefined||param.issuerScript==undefined||param.availableAmt==undefined||param.infoSHA1==undefined){
					return;
				}
				params.step="second";
				params.authAmt=param.authAmt;
				params.availableAmt=param.availableAmt;
				params.infoSHA1=param.infoSHA1;
				params.arpc=param.arpc;
				params.arpcrc=param.arpcrc;
				params.issuerScript=param.issuerScript;
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://cardStorage=1&type='+type+'&deviceType='+param._type+'&responseCallBack=ICBCSpecialCardTools.callBack&params='+JSON.stringify(params));
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.cardStorage(param._type,JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 圈提
	cardFetchCallBack:undefined,
	cardFetchWithoutErrorForCustomType:function(param){
		param._type=param.deviceType;
		param._withoutError=true;
		this.cardFetch(param);
	},
	cardFetchForCustomType:function(param){
		param._type=param.deviceType;
		this.cardFetch(param);
	},	
	cardFetchWithoutErrorForNFC:function(param){
		param._type=this.NFCType;
		param._withoutError=true;
		this.cardFetch(param);
	},
	cardFetchForNFC:function(param){
		param._type=this.NFCType;
		this.cardFetch(param);
	},
	cardFetchWithoutError:function(param){
		param._withoutError=true;
		this.cardFetch(param);
	},
	cardFetch:function(param){
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.cardFetchCallBack = param.callBack;
			} else {
				return;
			}
			if(param.step==undefined||(param.step!="first"&&param.step!="second")){
				return;
			}
			if(param._type==undefined){
				param._type=this.SDType;
			}
			var type="cardFetch";
			if(param._withoutError!=undefined&&param._withoutError){
				type="cardFetchWithoutError";
			}
			var params={};
			if(param.step=="first"){
				if(param.authAmt==undefined){
					return;
				}
				params.step="first";
				params.authAmt=param.authAmt;
			}else if(param.step=="second"){
				if(param.authAmt==undefined||param.arpc==undefined||param.arpcrc==undefined||param.issuerScript==undefined||param.infoSHA1==undefined){
					return;
				}
				params.step="second";
				params.authAmt=param.authAmt;
				params.infoSHA1=param.infoSHA1;
				params.arpc=param.arpc;
				params.arpcrc=param.arpcrc;
				params.issuerScript=param.issuerScript;
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://cardFetch=1&type='+type+'&deviceType='+param._type+'&responseCallBack=ICBCSpecialCardTools.callBack&params='+JSON.stringify(params));
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.cardFetch(param._type,JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	// 卡片信息维护
	cardInfoModifyCallBack:undefined,
	cardInfoModifyWithoutErrorForCustomType:function(param){
		param._type=param.deviceType;
		param._withoutError=true;
		this.cardInfoModify(param);
	},
	cardInfoModifyForCustomType:function(param){
		param._type=param.deviceType;
		this.cardInfoModify(param);
	},		
	cardInfoModifyWithoutErrorForNFC:function(param){
		param._type=this.NFCType;
		param._withoutError=true;
		this.cardInfoModify(param);
	},
	cardInfoModifyForNFC:function(param){
		param._type=this.NFCType;
		this.cardInfoModify(param);
	},
	cardInfoModifyWithoutError:function(param){
		param._withoutError=true;
		this.cardInfoModify(param);
	},
	cardInfoModify:function(param){
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.cardInfoModifyCallBack = param.callBack;
			} else {
				return;
			}
			if(param.step==undefined||(param.step!="first"&&param.step!="second")){
				return;
			}
			if(param._type==undefined){
				param._type=this.SDType;
			}
			var type="cardInfoModify";
			if(param._withoutError!=undefined&&param._withoutError){
				type="cardInfoModifyWithoutError";
			}
			var params={};
			if(param.step=="first"){
				params.step="first";
			}else if(param.step=="second"){
				if(param.arpc==undefined||param.arpcrc==undefined||param.issuerScript==undefined){
					return;
				}
				params.step="second";
				params.arpc=param.arpc;
				params.arpcrc=param.arpcrc;
				params.issuerScript=param.issuerScript;
			}
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://cardInfoModify=1&type='+type+'&deviceType='+param._type+'&responseCallBack=ICBCSpecialCardTools.callBack&params='+JSON.stringify(params));
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.cardInfoModify(param._type,JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 卡片激活
	cardActiveCallBack:undefined,
	cardActiveWithoutErrorForCustomType:function(param){
		param._type=param.deviceType;
		param._withoutError=true;
		this.cardActive(param);
	},
	cardActiveForCustomType:function(param){
		param._type=param.deviceType;
		this.cardActive(param);
	},		
	cardActiveWithoutErrorForNFC:function(param){
		param._type=this.NFCType;
		param._withoutError=true;
		this.cardActive(param);
	},
	cardActiveForNFC:function(param){
		param._type=this.NFCType;
		this.cardActive(param);
	},
	cardActiveWithoutError:function(param){
		param._withoutError=true;
		this.cardActive(param);
	},	
	cardActive:function(param){
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.cardActiveCallBack = param.callBack;
			} else {
				return;
			}
			if(param._type==undefined){
				param._type=this.SDType;
			}
			var type="cardActive";
			if(param._withoutError!=undefined&&param._withoutError){
				type="cardActiveWithoutError";
			}
			if(param.CardType != undefined && param.CardType == '1'){
				type="cardActivePcbCard";
			}
			var params={};
			if(param.areaCode==undefined||param.netCode==undefined||param.terllerCode==undefined||param.CardNo==undefined||param.Brand==undefined||param.CardKind==undefined||param.CardData==undefined||param.Action==undefined||param.ChipType==undefined||param.GuomiFlag==undefined||param.PersoChanel==undefined||param.ExtAppFlag==undefined||param.CardType==undefined||param.PAMID==undefined||param.INSTAID==undefined){
				return;
			}
			params.areaCode=param.areaCode;
			params.netCode=param.netCode;
			params.terllerCode=param.terllerCode;
			params.CardNo=param.CardNo;
			params.Brand=param.Brand;
			params.CardKind=param.CardKind;
			params.CardData=param.CardData;
			params.Action=param.Action;
			params.ChipType=param.ChipType;
			params.GuomiFlag=param.GuomiFlag;
			params.PersoChanel=param.PersoChanel;
			params.ExtAppFlag=param.ExtAppFlag;
			params.CardType=param.CardType;
			params.PAMID=param.PAMID;
			params.INSTAID=param.INSTAID;
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://cardActive=1&type='+type+'&deviceType='+param._type+'&responseCallBack=ICBCSpecialCardTools.callBack&params='+JSON.stringify(params));
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.cardActive(param._type,JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	// 卡片应用指令处理
	cardAppCommandHandleCallBack:undefined,
	cardAppCommandHandleWithoutErrorForCustomType:function(param){
		param._type=param.deviceType;
		param._withoutError=true;
		this.cardAppCommandHandle(param);
	},
	cardAppCommandHandleForCustomType:function(param){
		param._type=param.deviceType;
		this.cardAppCommandHandle(param);
	},		
	cardAppCommandHandle:function(param){
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.cardAppCommandHandleCallBack = param.callBack;
			} else {
				return;
			}
			if(param._type==undefined){
				param._type=this.SDType;
			}
			var type="cardAppCommandHandle";
			if(param._withoutError!=undefined&&param._withoutError){
				type="cardAppCommandHandleWithoutError";
			}
			var params={};
			if(param.apduListJson==undefined){
				return;
			}
			params=param;
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://cardAppCommandHandle=1&type='+type+'&deviceType='+param._type+'&responseCallBack=ICBCSpecialCardTools.callBack&params='+JSON.stringify(params));
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.cardAppCommandHandle(param._type,JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},		
	// 人行SD用户认证
	PBCSDCardUserAuthCallBack : undefined,
	PBCSDCardUserAuthWithoutError:function(param){
		param._withoutError=true;
		this.PBCSDCardUserAuth(param);
	},
	PBCSDCardUserAuth : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.PBCSDCardUserAuthCallBack = param.callBack;
			} else {
				return;
			}
			param._type=this.SDType;
			var type="PBCSDCardUserAuth";
			if(param._withoutError!=undefined&&param._withoutError){
				type="PBCSDCardUserAuthWithoutError";
			}
			var params={};
			if(param.orgCode==undefined||param.msgID==undefined||param.signInfo==undefined){
				return;
			}
			params.orgCode=param.orgCode;
			params.msgID=param.msgID;
			params.signInfo=param.signInfo;			
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				//不支持
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.PBCSDCardUserAuth(JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 人行SD创建安全域
	PBCSDCardCreateSDCallBack : undefined,
	PBCSDCardCreateSDWithoutError:function(param){
		param._withoutError=true;
		this.PBCSDCardCreateSD(param);
	},
	PBCSDCardCreateSD : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.PBCSDCardCreateSDCallBack = param.callBack;
			} else {
				return;
			}
			param._type=this.SDType;
			var type="PBCSDCardCreateSD";
			if(param._withoutError!=undefined&&param._withoutError){
				type="PBCSDCardCreateSDWithoutError";
			}
			var params={};
			if(param.orgCode==undefined||param.msgID==undefined||param.signInfo==undefined){
				return;
			}
			params.orgCode=param.orgCode;
			params.msgID=param.msgID;
			params.signInfo=param.signInfo;			
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				//不支持
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.PBCSDCardCreateSD(JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 人行SD安装实例
	PBCSDCardInstallAppCallBack : undefined,
	PBCSDCardInstallAppWithoutError:function(param){
		param._withoutError=true;
		this.PBCSDCardInstallApp(param);
	},
	PBCSDCardInstallApp : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.PBCSDCardInstallAppCallBack = param.callBack;
			} else {
				return;
			}
			param._type=this.SDType;
			var type="PBCSDCardInstallApp";
			if(param._withoutError!=undefined&&param._withoutError){
				type="PBCSDCardInstallAppWithoutError";
			}
			var params={};
			if(param.orgCode==undefined||param.aID==undefined||param.msgID==undefined||param.signInfo==undefined){
				return;
			}
			params.orgCode=param.orgCode;
			params.aID=param.aID;
			params.msgID=param.msgID;
			params.signInfo=param.signInfo;		
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				//不支持
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.PBCSDCardInstallApp(JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	// 人行SD删除实例
	PBCSDCardDeleteAppCallBack : undefined,
	PBCSDCardDeleteAppWithoutError:function(param){
		param._withoutError=true;
		this.PBCSDCardDeleteApp(param);
	},
	PBCSDCardDeleteApp : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.PBCSDCardDeleteAppCallBack = param.callBack;
			} else {
				return;
			}
			param._type=this.SDType;
			var type="PBCSDCardDeleteApp";
			if(param._withoutError!=undefined&&param._withoutError){
				type="PBCSDCardDeleteAppWithoutError";
			}
			var params={};
			if(param.orgCode==undefined||param.aID==undefined||param.msgID==undefined||param.signInfo==undefined){
				return;
			}
			params.orgCode=param.orgCode;
			params.aID=param.aID;
			params.msgID=param.msgID;
			params.signInfo=param.signInfo;			
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				//不支持
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.PBCSDCardDeleteApp(JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	// 人行SD用户认证
	PBCSDCardUserAuthCallBack : undefined,
	PBCSDCardUserAuthWithoutError:function(param){
		param._withoutError=true;
		this.PBCSDCardUserAuth(param);
	},
	PBCSDCardUserAuth : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.PBCSDCardUserAuthCallBack = param.callBack;
			} else {
				return;
			}
			param._type=this.SDType;
			var type="PBCSDCardUserAuth";
			if(param._withoutError!=undefined&&param._withoutError){
				type="PBCSDCardUserAuthWithoutError";
			}
			var params={};
			if(param.orgCode==undefined||param.msgID==undefined||param.signInfo==undefined){
				return;
			}
			params.orgCode=param.orgCode;
			params.msgID=param.msgID;
			params.signInfo=param.signInfo;			
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				//不支持
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.PBCSDCardUserAuth(JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 人行SD创建安全域
	PBCSDCardCreateSDCallBack : undefined,
	PBCSDCardCreateSDWithoutError:function(param){
		param._withoutError=true;
		this.PBCSDCardCreateSD(param);
	},
	PBCSDCardCreateSD : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.PBCSDCardCreateSDCallBack = param.callBack;
			} else {
				return;
			}
			param._type=this.SDType;
			var type="PBCSDCardCreateSD";
			if(param._withoutError!=undefined&&param._withoutError){
				type="PBCSDCardCreateSDWithoutError";
			}
			var params={};
			if(param.orgCode==undefined||param.msgID==undefined||param.signInfo==undefined){
				return;
			}
			params.orgCode=param.orgCode;
			params.msgID=param.msgID;
			params.signInfo=param.signInfo;			
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				//不支持
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.PBCSDCardCreateSD(JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	// 人行SD安装实例
	PBCSDCardInstallAppCallBack : undefined,
	PBCSDCardInstallAppWithoutError:function(param){
		param._withoutError=true;
		this.PBCSDCardInstallApp(param);
	},
	PBCSDCardInstallApp : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.PBCSDCardInstallAppCallBack = param.callBack;
			} else {
				return;
			}
			param._type=this.SDType;
			var type="PBCSDCardInstallApp";
			if(param._withoutError!=undefined&&param._withoutError){
				type="PBCSDCardInstallAppWithoutError";
			}
			var params={};
			if(param.orgCode==undefined||param.aID==undefined||param.msgID==undefined||param.signInfo==undefined){
				return;
			}
			params.orgCode=param.orgCode;
			params.aID=param.aID;
			params.msgID=param.msgID;
			params.signInfo=param.signInfo;		
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				//不支持
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.PBCSDCardInstallApp(JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},	
	// 人行SD删除实例
	PBCSDCardDeleteAppCallBack : undefined,
	PBCSDCardDeleteAppWithoutError:function(param){
		param._withoutError=true;
		this.PBCSDCardDeleteApp(param);
	},
	PBCSDCardDeleteApp : function(param) {
		try {
			if (param.callBack != undefined && typeof param.callBack == 'function') {
				this.PBCSDCardDeleteAppCallBack = param.callBack;
			} else {
				return;
			}
			param._type=this.SDType;
			var type="PBCSDCardDeleteApp";
			if(param._withoutError!=undefined&&param._withoutError){
				type="PBCSDCardDeleteAppWithoutError";
			}
			var params={};
			if(param.orgCode==undefined||param.aID==undefined||param.msgID==undefined||param.signInfo==undefined){
				return;
			}
			params.orgCode=param.orgCode;
			params.aID=param.aID;
			params.msgID=param.msgID;
			params.signInfo=param.signInfo;			
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				//不支持
			} else if (ICBCUtilTools.isAndroid()) {
				var resultString = Native.PBCSDCardDeleteApp(JSON.stringify(params));
				this.callBack(type, resultString);
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},		
	//关闭交易
	endTransService:function(){
		try {
			ICBCPageTools.nativeShowIndicator();
			if (ICBCUtilTools.isiPhone()) {
				this.iOSExcuteNativeMethod('Native://endTransService=1');
			} else if (ICBCUtilTools.isAndroid()) {
				Native.endSpecailCardTransService();
			}
		} catch (e) {
			console.log("Error: " + e);
		}
	},
	callBack : function(type, resultString) {
		try {
			ICBCPageTools.nativeHideIndicator();
			console.log(resultString);
			var result = eval("(" + resultString + ")");
			if (type == "cardActive"||type == "cardActiveWithoutError") {
				if (result.cardErrorCode != undefined) {
					confirm('对不起，金融应用下载失败，是否重新下载？','','确定','取消'
					,function(){
						setTimeout(function(){
							cardActiveSubmit();							
						},1000);
					},''
					,function(){
						ICBCPageTools.nativeBack();
					},'');
					return;
				}
			}
			if (type == "cardActivePcbCard") {
				if (result.cardErrorCode != undefined) {
					confirm('对不起，金融应用下载失败，是否重新下载？','','确定','取消'
					,function(){
						setTimeout(function(){
							cardActiveSubmit();							
						},1000);
					},''
					,function(){
						if(PcbCard=='1'){
							setTimeout(function(){
								delPBCSDCard();
							},1000);
						}
						else{
							ICBCPageTools.nativeBack();
						}
					},'');
					return;
				}
			}
			if(type=="queryCardInfoWithoutError"){
				this.queryCardInfoCallBack(result);
				return;
			}
			if(type=="queryCardTradeDetailWithoutError"){
				this.queryCardTradeDetailCallBack(result);
				return;
			}
			if(type=="cardStorageWithoutError"){
				this.cardStorageCallBack(result);
				return;
			}
			if(type=="cardFetchWithoutError"){
				this.cardFetchCallBack(result);
				return;
			}
			if(type=="cardInfoModifyWithoutError"){
				this.cardInfoModifyCallBack(result);
				return;
			}
			if(type=="cardActiveWithoutError"){
				this.cardActiveCallBack(result);
				return;
			}
			if (type == "cardAppCommandHandleWithoutError") {
				this.cardAppCommandHandleCallBack(result);
			}
			if (type == "PBCSDCardUserAuthWithoutError") {
				this.PBCSDCardUserAuthCallBack(result);
			}
			if (type == "PBCSDCardCreateSDWithoutError") {
				this.PBCSDCardCreateSDCallBack(result);
			}
			if (type == "PBCSDCardInstallAppWithoutError") {
				this.PBCSDCardInstallAppCallBack(result);
			}
			if (type == "PBCSDCardDeleteAppWithoutError") {
				this.PBCSDCardDeleteAppCallBack(result);
			}
			if (result.cardErrorCode != undefined) {
				alert(result.cardErrorMsg);
				return;
			}
			if (type == "queryCardInfo") {
				this.queryCardInfoCallBack(result);
			}
			if (type == "checkInstallCard") {
				this.checkInstallCardCallBack(result);
			}
			if (type == "checkInstallDevice") {
				this.checkInstallDeviceCallBack(result);
			}
			if (type == "queryCardTradeDetail") {
				this.queryCardTradeDetailCallBack(result);
			}
			if (type == "cardStorage") {
				this.cardStorageCallBack(result);
			}
			if (type == "cardFetch") {
				this.cardFetchCallBack(result);
			}
			if (type == "cardInfoModify") {
				this.cardInfoModifyCallBack(result);
			}			
			if (type == "cardActive") {
				this.cardActiveCallBack(result);
			}
			if (type == "serverAppQuery") {
				this.serverAppQueryCallBack(result);
			}
			if (type == "cardAppQuery") {
				this.cardAppQueryCallBack(result);
			}
			if (type == "cardAppCommandHandle") {
				this.cardAppCommandHandleCallBack(result);
			}
			if (type == "cardAppDownload") {
				this.cardAppDownloadCallBack(result);
			}
			if (type == "PBCSDCardUserAuth") {
				this.PBCSDCardUserAuthCallBack(result);
			}
			if (type == "PBCSDCardCreateSD") {
				this.PBCSDCardCreateSDCallBack(result);
			}
			if (type == "PBCSDCardInstallApp") {
				this.PBCSDCardInstallAppCallBack(result);
			}
			if (type == "PBCSDCardDeleteApp") {
				this.PBCSDCardDeleteAppCallBack(result);
			}			
			if(type=="cardActivePcbCard"){
				this.cardActiveCallBack(result);
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