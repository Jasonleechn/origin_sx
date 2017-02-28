package com.icbc.conformity.context;


/**
 * <p> �ͻ�����Ϣ������
 * <p> �������ԣ����š����֡������š����֡����㡢ע��ģʽ����״̬
 * @author Jason.Lee on 2017��2��28��
 */
public class CardInfo {
	
	//����
	private String cardNum;
	
	//���� 011��003 --��ǿ�
	private String acctType;
	
	//������
	private String areaCode;
	
	//����
	private String currType;
	
	//����
	private String netCode;
	
	//ע��ģʽ 0-���� 1-����
	private String regMode;
	
	//��״̬
	private String cardState;

	/*������������*/
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
