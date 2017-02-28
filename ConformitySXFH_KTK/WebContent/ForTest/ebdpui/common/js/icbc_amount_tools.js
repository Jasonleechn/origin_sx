var ICBCAmountTools = {
	toMoney : function(txtmoney) {
		var txt_money = "";
		var len = txtmoney.length;
		var intsign = "";
		if (len > 0) {
			var tempsign = txtmoney.slice(0, 1);
			if (tempsign == "-") {
				intsign = tempsign;
				txtmoney = txtmoney.slice(1, len);
				len = len - 1;

			} else {
				intsign = "";
			}
		}
		if (len > 2) {
			txtmoney = txtmoney.slice(0, len - 2) + "." + txtmoney.slice(len - 2, len);
		} else {
			if (len == 1)
				txtmoney = "0.0" + txtmoney;
			else if (len == 2)
				txtmoney = "0." + txtmoney;
		}
		var tonumber = 0;
		var misnumber = 0;
		var re = /,/g;
		tonumber = txtmoney + "";
		var reg = /^[0-9.]+$/;
		if (tonumber == "") {
		} else if ((!reg.test(tonumber)) || (tonumber.indexOf(".") != tonumber.lastIndexOf("."))) {

			return "-1";
		} else {
			var numberlen = tonumber.indexOf(".");
			if (numberlen == -1) {
				misnumber = ".00";
			} else {

				misnumber = tonumber.slice(numberlen);
				if (misnumber.length == 1) {
					misnumber = misnumber + "00";
				} else if (misnumber.length == 2) {
					misnumber = misnumber + "0";
				} else if (misnumber.length >= 4) {

					return "-1";
				}
				tonumber = '' + tonumber.slice(0, numberlen);
			}
			if (tonumber.length == 0) {
				tonumber = "0";
			} else if (tonumber.length != 1) {
				tonumber = this.removeZero(tonumber);
				if (tonumber == "")
					tonumber = "0";
			}
		}
		txt_money = intsign + this.parseComma(tonumber) + misnumber;
		return txt_money;
	},
	parseComma : function(number) {
		number = '' + number;
		if (number.length > 3) {
			var mod = number.length % 3;
			var output = (mod > 0 ? (number.substring(0, mod)) : '');
			var numLen = Math.floor(number.length / 3);
			for (i = 0; i < numLen; i++) {
				if ((mod == 0) && (i == 0))
					output += number.substring(mod + 3 * i, mod + 3 * i + 3);
				else
					output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
			}

			if (output == "")
				return "0";
			else
				return output;
		} else {

			if (number == "")
				return "0";
			else
				return number;
		}
	},
	removeZero : function(number) {
		number = '' + number;
		var sChar = '';
		var pos = 0;
		var len = number.length;
		for ( var k = 0; k < len; k++) {
			sChar = number.charAt(k);
			if (sChar == '0')
				pos++;
			else
				break;
		}
		return (number.slice(pos));
	},
	toStdAmount : function(sAmount) {
		var sComma = /\,/gi;
		var sResult = sAmount.replace(sComma, "");
		var iDotIndex = sResult.indexOf('.');
		var iLength = sResult.length;
		var toMatchNaNum = /\D/;
		if ((iDotIndex != -1 && iLength - iDotIndex > 3) || toMatchNaNum.test(sResult.slice(iDotIndex + 1, iLength)))
			return -1; // 小数点后大于2位数 或 含有非数字字符
		else {
			if (iDotIndex == -1)
				sResult = sResult + '.00';
			else if (iDotIndex == 0) {
				if (iLength - iDotIndex == 1)
					sResult = '0' + sResult + '00';
				if (iLength - iDotIndex == 2)
					sResult = '0' + sResult + '0';
				if (iLength - iDotIndex == 3)
					sResult = '0' + sResult;
			} else {
				if (iLength - iDotIndex == 2)
					sResult = sResult + '0';
				if (iLength - iDotIndex == 1)
					sResult = sResult + '00';
			}
			// 将金额处理为标准的######.##形式 end

			// 处理金额非前面的0 begin
			var sTemp = "";
			sTemp = sResult.slice(0, iDotIndex);

			var iTemp = new Number(sTemp);
			sTemp = iTemp.toString();
			if (sTemp.length > 16)
				return -2;
			iDotIndex = sResult.indexOf('.');
			// 处理金额非前面的0 end

			sResult = sTemp + sResult.slice(iDotIndex); // 返回标准的######.##形式的金额
			return sResult;
		}
	},
	toMoneyForInput : function(txtmoney) {
		var tonumber;
		var misnumber;
		var re = /,/g;
		var txt_money = txtmoney;
		tonumber = txt_money.replace(re, "");
		var reg = /^[0-9.]+$/;
		if (tonumber == "") {
		} else if ((!reg.test(tonumber)) || (tonumber.indexOf(".") != tonumber.lastIndexOf("."))) {
			return "";
		} else {
			var numberlen = tonumber.indexOf(".");
			if (numberlen == -1) {
				misnumber = ".00";
			} else {
				misnumber = tonumber.slice(numberlen);
				if (misnumber.length == 1) {
					misnumber = misnumber + "00";
				} else if (misnumber.length == 2) {
					misnumber = misnumber + "0";
				} else if (misnumber.length >= 4) {
					return "";
				}
				tonumber = '' + tonumber.slice(0, numberlen);
			}
			if (tonumber.length == 0)
				tonumber = "0";
			else if (tonumber.length != 1) {
				tonumber = this.removeZero(tonumber);
				if (tonumber == "")
					tonumber = "0";
			}

			if (tonumber.length > 13) {
				return "";
			}
			var hidNumber = this.removeZero(tonumber + misnumber.slice(1));
			if (hidNumber.length == 0) {
				return "";
			}
			return hidNumber;
		}
	},
	getChineseCurrencyString : function(sAmount) {
		var value = ICBCAmountTools.toStdAmount(sAmount);
		if (value < 0)
			return "";
		var sCN_Num = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
		var unit = new Array('元', '万', '亿', '万');
		var subunit = new Array('拾', '佰', '仟');
		var sCNzero = '零';

		var result = "";

		var iDotIndex = value.indexOf('.');

		var sBeforeDot = value.slice(0, iDotIndex);
		var sAfterDot = value.slice(iDotIndex);

		var len = 0;
		// before dot
		len = sBeforeDot.length;
		var i = 0, j = 0, k = 0; // j is use to subunit,k is use to unit
		var oldC = '3';
		var cc = '0';
		result = unit[0] + result;

		var oldHasN = false;
		var hasN = false;
		var allZero = true;

		for (i = 0; i < len; i++) {
			if (j == 0 && i != 0) {
				if (!hasN) {
					if ((k % 2) == 0)
						result = result.slice(1);
				} else {
					if (oldC == '0')
						result = sCNzero + result;
				}
				result = unit[k] + result;
				// oldC = '3';
				oldHasN = hasN;
				hasN = false;
			}
			cc = sBeforeDot.charAt(len - i - 1);
			if (oldC == '0' && cc != oldC) {
				if (hasN)
					result = sCNzero + result;
			}
			if (cc != '0') {
				if (j != 0)
					result = subunit[j - 1] + result;
				var dig = '0';
				dig = sCN_Num[cc];

				if (dig == '0')
					return false;
				hasN = true;
				allZero = false;
				result = dig + result;
			}
			oldC = cc;
			j++;
			if (j == 4) {
				k++;
				j = 0;
			}
		}
		if (allZero) {
			result = "零元";
		} else {
			var bb = 0;
			if (!hasN) {
				bb++;
				if (!oldHasN) {
					bb++;
				}
			}
			if (bb != 0)
				result = result.slice(bb);
			if (result.charAt(0) == '零')
				result = result.slice(1);
		}

		// after dot
		sAfterDot = sAfterDot.slice(1);
		len = sAfterDot.length;
		var corn = new Array('0', '0');
		var cornunit = new Array('角', '分');
		var n = 0; // j is use to subunit,k is use to unit
		var dig = '0';
		corn[0] = sAfterDot.charAt(0);
		if (len > 1)
			corn[1] = sAfterDot.charAt(1);
		else
			corn[1] = '0';
		if ((corn[0] == '0') && (corn[1] == '0')) {
			if (result.indexOf("undefined") != -1)
				return -1;
			return result += '整';
		} else if (allZero)
			result = "";
		for (i = 0; i < 2; i++) {
			var curchar = corn[i];
			dig = sCN_Num[curchar];

			if (i == 0) {
				if (result != "" || curchar != '0')
					result += dig;
				if (curchar != '0') {
					result += cornunit[0];
				}
			}
			if (i == 1 && curchar != '0')
				result = result + dig + cornunit[1];
		}
		if (result.indexOf("undefined") != -1)
			return -1;
		return result;
	}
};