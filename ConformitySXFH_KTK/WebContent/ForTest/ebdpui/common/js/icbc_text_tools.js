var ICBCTextTools = {
	splitCard : function(cardNum) {
		try {
			cardNum = cardNum.replace(/(^\s*)|(\s*$)/g, "");
			if (cardNum.length == 13) {
				cardNum = cardNum.substr(0, 4) + " " + cardNum.substr(4, 5)
						+ " " + cardNum.substr(9, 4);
			} else if (cardNum.length == 14) {
				cardNum = cardNum.substr(0, 4) + " " + cardNum.substr(4, 6)
						+ " " + cardNum.substr(10, 4);
			} else if (cardNum.length == 15) {
				cardNum = cardNum.substr(0, 4) + " " + cardNum.substr(4, 7)
						+ " " + cardNum.substr(11, 4);
			} else if (cardNum.length == 16) {
				cardNum = cardNum.substr(0, 4) + " " + cardNum.substr(4, 4)
						+ " " + cardNum.substr(8, 4) + " "
						+ cardNum.substr(12, 4);
			} else if (cardNum.length == 17) {
				cardNum = cardNum.substr(0, 6) + " " + cardNum.substr(6, 7)
						+ " " + cardNum.substr(13, 4);
			} else if (cardNum.length == 18) {
				cardNum = cardNum.substr(0, 6) + " " + cardNum.substr(6, 12);
			} else if (cardNum.length == 19) {
				cardNum = cardNum.substr(0, 6) + " " + cardNum.substr(6, 13);
			} else {
				return cardNum;
			}
			return cardNum;
		} catch (e) {
			return cardNum;
		}
	},
	shieldCard : function(cardNum) {
		try {
			cardNum = cardNum.replace(/(^\s*)|(\s*$)/g, "");
			var shieldStr = "*";
			if ((cardNum!=undefined||cardNum!=""||cardNum!=null)&&cardNum.length>8) {
				var n = cardNum.length-8;
				for(var i=1;i<n;i++){
					shieldStr = shieldStr +"*";
				}
				cardNum = cardNum.substring(0,4)+shieldStr+cardNum.substring(cardNum.length-4,cardNum.length);
			}else {
				return cardNum;
			}
			return cardNum;
		} catch (e) {
			return cardNum;
		}
	}
};