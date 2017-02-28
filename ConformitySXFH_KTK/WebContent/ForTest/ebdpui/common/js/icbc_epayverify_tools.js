var ICBCEpayVerifyTools = {
	debug:false,
	// ��ȡ���豸id�ӿ�
	getEpayDeviceIdCallBack:undefined,
	getEpayDeviceId : function(params) {
		try {
			var paramSend={};
			//����У��
			//�ص�����
			if (params.callBack == undefined || typeof params.callBack != 'function') {
				this.log('getEpayDeviceId-callBack��������ȷ');
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
	// ��ȡ�ͻ��˰󶨹�ϵ�ӿ�
	getEpayClientBindInfoCallBack:undefined,
	getEpayClientBindInfo : function(params) {
		try {
			var paramSend={};
			//����У��
			//�ص�����
			if (params.callBack == undefined || typeof params.callBack != 'function') {
				this.log('getEpayClientBindInfo-callBack��������ȷ');
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
	// ɾ���ͻ��˰󶨹�ϵ�ӿ�
	delEpayClientBindInfoCallBack:undefined,
	delEpayClientBindInfo : function(params) {
		try {
			var paramSend={};
			//����У��
			//�ͻ���Ϣ��
			if (params.cisnum==undefined){
				this.log('delEpayClientBindInfo-cisnum��������ȷ');
				return;
			}
			paramSend.cisnum=params.cisnum;
			//�Ǳ���У��
			//�ص�����
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
	// ������޸Ŀͻ��˰󶨹�ϵ�ӿ�
	handleEpayClientBindInfoCallBack:undefined,
	handleEpayClientBindInfo : function(params) {
		try {
			var paramSend={};
			//����У��
			//�ͻ���Ϣ��
			if (params.cisnum==undefined){
				this.log('handleEpayClientBindInfo-cisnum��������ȷ');
				return;
			}
			paramSend.cisnum=params.cisnum;
			//�ֻ���
			if (params.epaymobile==undefined){
				this.log('handleEpayClientBindInfo-epaymobile��������ȷ');
				return;
			}
			paramSend.epaymobile=params.epaymobile;			
			//�Ǳ���У��
			//�ص�����
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
	// ����֧������ӿ�
	setEpayPasswordSuccessCallBack:undefined,
	setEpayPasswordCancelCallBack:undefined,
	setEpayPassword : function(params) {
		try {
			var paramSend={};
			//����У��
			//�ͻ���Ϣ��
			if (params.cisnum==undefined){
				this.log('setEpayPassword-cisnum��������ȷ');
				return;
			}
			paramSend.cisnum=params.cisnum;
			//�ֻ���
			if (params.epaymobile==undefined){
				this.log('setEpayPassword-epaymobile��������ȷ');
				return;
			}
			paramSend.epaymobile=params.epaymobile;
			//����֧�����������ַ������
			if (params.requestUrlAndParams==undefined){
				this.log('setEpayPassword-requestUrlAndParams��������ȷ');
				return;
			}
			paramSend.requestUrlAndParams=encodeURI(params.requestUrlAndParams);			
			//�ɹ��ص�����
			if (params.successCallBack == undefined || typeof params.successCallBack != 'function') {
				this.log('setEpayPassword-successCallBack��������ȷ');
				return;
			}
			paramSend.successCallBack="ICBCEpayVerifyTools.setEpayPasswordSuccessCallBack";
			this.setEpayPasswordSuccessCallBack = params.successCallBack;
			//�Ǳ���У��
			//ȡ���ص�����
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
	// �޸�֧������ӿ�
	modifyEpayPasswordSuccessCallBack:undefined,
	modifyEpayPasswordFailCallBack:undefined,
	modifyEpayPasswordCancelCallBack:undefined,
	modifyEpayPassword : function(params) {
		try {
			var paramSend={};
			//����У��
			//�޸�֧�����������ַ������
			if (params.requestUrlAndParams==undefined){
				this.log('modifyEpayPassword-requestUrlAndParams��������ȷ');
				return;
			}
			paramSend.requestUrlAndParams=encodeURI(params.requestUrlAndParams);			
			//�ɹ��ص�����
			if (params.successCallBack == undefined || typeof params.successCallBack != 'function') {
				this.log('modifyEpayPassword-successCallBack��������ȷ');
				return;
			}
			paramSend.successCallBack="ICBCEpayVerifyTools.modifyEpayPasswordSuccessCallBack";
			this.modifyEpayPasswordSuccessCallBack = params.successCallBack;
			//ʧ�ܻص�����
			if (params.failCallBack == undefined || typeof params.failCallBack != 'function') {
				this.log('modifyEpayPassword-failCallBack��������ȷ');
				return;
			}
			paramSend.failCallBack="ICBCEpayVerifyTools.modifyEpayPasswordFailCallBack";
			this.modifyEpayPasswordFailCallBack = params.failCallBack;			
			//�Ǳ���У��
			//ȡ���ص�����
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
	//��֤֧������ӿ�
	verifyEpayPasswordSuccessCallBack:undefined,
	verifyEpayPasswordFailCallBack:undefined,
	verifyEpayPasswordCancelCallBack:undefined,
	verifyEpayPasswordLeftLinkCallBack:undefined,
	verifyEpayPasswordRightLinkCallBack:undefined,
	verifyEpayPassword : function(params) {
		try {
			var paramSend={};
			//����У��
			//��֤֧�����������ַ������
			if (params.requestUrlAndParams==undefined){
				this.log('verifyEpayPassword-requestUrlAndParams��������ȷ');
				return;
			}
			paramSend.requestUrlAndParams=encodeURI(params.requestUrlAndParams);			
			//�ɹ��ص�����
			if (params.successCallBack == undefined || typeof params.successCallBack != 'function') {
				this.log('verifyEpayPassword-successCallBack��������ȷ');
				return;
			}
			paramSend.successCallBack="ICBCEpayVerifyTools.verifyEpayPasswordSuccessCallBack";
			this.verifyEpayPasswordSuccessCallBack = params.successCallBack;
			//ʧ�ܻص�����
			if (params.failCallBack == undefined || typeof params.failCallBack != 'function') {
				this.log('verifyEpayPassword-failCallBack��������ȷ');
				return;
			}
			paramSend.failCallBack="ICBCEpayVerifyTools.verifyEpayPasswordFailCallBack";
			this.verifyEpayPasswordFailCallBack = params.failCallBack;
			//��ʾ��Ϣ
			if (params.tipsArray==undefined){
				this.log('verifyEpayPassword-tipsArray��������ȷ');
				return;
			}
			var tipsArrayString=JSON.stringify(params.tipsArray);
			tipsArrayString=tipsArrayString.replace(/"/g,"'");
			paramSend.tipsArray=encodeURI(tipsArrayString);			
			//�Ǳ���У��
			//ȡ���ص�����
			if (params.cancelCallBack != undefined && typeof params.cancelCallBack == 'function') {
				this.verifyEpayPasswordCancelCallBack = params.cancelCallBack;
				paramSend.cancelCallBack="ICBCEpayVerifyTools.verifyEpayPasswordCancelCallBack";
			}else{
				paramSend.cancelCallBack="";
			}
			//���б�
			if (params.cardList != undefined) {
				var cardListString=JSON.stringify(params.cardList);
				cardListString=cardListString.replace(/"/g,"'");
				paramSend.cardList=encodeURI(cardListString);
			}else{
				paramSend.cardList="";
			}
			//��������
			if (params.leftLink != undefined&&params.leftLinkCallBack!=undefined&&typeof params.leftLinkCallBack == 'function') {
				paramSend.leftLink=encodeURI(params.leftLink);
				this.verifyEpayPasswordLeftLinkCallBack = params.leftLinkCallBack;
				paramSend.leftLinkCallBack="ICBCEpayVerifyTools.verifyEpayPasswordLeftLinkCallBack";
			}else{
				paramSend.leftLink="";
				paramSend.leftLinkCallBack="";
			}
			//��������
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