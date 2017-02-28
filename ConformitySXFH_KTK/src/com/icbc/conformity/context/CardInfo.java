package com.icbc.conformity.context;


/**
 * <p> 客户卡信息基础类
 * <p> 包含属性：卡号、卡种、地区号、币种、网点、注册模式、卡状态
 * @author Jason.Lee on 2017年2月28日
 */
public class CardInfo {
	
	//卡号
	private String cardNum;
	
	//卡种 011，003 --借记卡
	private String acctType;
	
	//地区号
	private String areaCode;
	
	//币种
	private String currType;
	
	//网点
	private String netCode;
	
	//注册模式 0-柜面 1-自助
	private String regMode;
	
	//卡状态
	private String cardState;

	/*带参数构造器*/
	public CardInfo(String cardNum, String acctType, String areaCode,
			String currType, String netCode, String regMode, String cardState) {
		super();
		this.cardNum = cardNum;
		this.acctType = acctType;
		this.areaCode = areaCode;
		this.currType = currType;
		this.netCode = netCode;
		this.regMode = regMode;
		this.cardState = cardState;
	}

	public String getCardNum() {
		return cardNum;
	}

	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}

	public String getAcctType() {
		return acctType;
	}

	public void setAcctType(String acctType) {
		this.acctType = acctType;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getCurrType() {
		return currType;
	}

	public void setCurrType(String currType) {
		this.currType = currType;
	}

	public String getNetCode() {
		return netCode;
	}

	public void setNetCode(String netCode) {
		this.netCode = netCode;
	}

	public String getRegMode() {
		return regMode;
	}

	public void setRegMode(String regMode) {
		this.regMode = regMode;
	}

	public String getCardState() {
		return cardState;
	}

	public void setCardState(String cardState) {
		this.cardState = cardState;
	}

	@Override
	public String toString() {
		return "CardInfo [cardNum=" + cardNum + ", acctType=" + acctType
				+ ", areaCode=" + areaCode + ", currType=" + currType
				+ ", netCode=" + netCode + ", regMode=" + regMode
				+ ", cardState=" + cardState + "]";
	}
	

}
