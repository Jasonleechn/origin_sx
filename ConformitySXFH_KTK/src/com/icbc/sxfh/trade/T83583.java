package com.icbc.sxfh.trade;

/**
 * 快通卡充值确认
 */
public class T83583 extends VSingleQuery{ 
	
	private final String trxcode = "83583";
	
	/**查询条件*/
	private String zoneno="";//地区号
	private String brno=""; //网点号 
	private String dlywDevId =""; //终端号(可空)
	private String etcCardNo=""; //etc卡号     
	private String localBalanceF = "0"; //充值后卡内记录余额 （以分为单位）
	private String qcAmountF ="0"; //充值金额 （以分为单位）
	private int amt_bk = 0; //补扣金额
	private int amt_tk = 0; //退款金额 
	private String retPtLsh = ""; //平台流水号
	private String retLsXLH = ""; //流水序列号   
	private String cardSeq =""; // 联机交易序列号
	private String cardSeq_tj = "0000"; //脱机交易序列号默认值 ‘0000’
	private boolean flag=false; //写卡标志 
	
	public void setZoneno(String zoneno) {this.zoneno = zoneno;}
	public void setBrno(String brno) {this.brno = brno;} 
	//public void setDlywDevId(String dlywDevId) {this.dlywDevId = dlywDevId;} 
	public void setEtcCardNo(String etcCardNo) {this.etcCardNo = etcCardNo;}
	public void setLocalBalanceF(String localBalanceF) {this.localBalanceF = localBalanceF;}
	public void setQcAmountF(String qcAmountF) {this.qcAmountF = qcAmountF;}
	public void setAmt_bk(int amt_bk) {this.amt_bk = amt_bk;}
	public void setAmt_tk(int amt_tk) {this.amt_tk = amt_tk;}
	public void setRetPtLsh(String retPtLsh) {this.retPtLsh = retPtLsh;}
	public void setRetLsXLH(String retLsXLH) {this.retLsXLH = retLsXLH;}
	public void setCardSeq(String cardSeq) {this.cardSeq = cardSeq;}
	public void setCardSeq_tj(String cardSeq_tj) {this.cardSeq_tj = cardSeq_tj;}
	public void setFlag(boolean flag) {this.flag = flag;} 
 
 
	/**获取发送给bice的报文*/
	protected String getToBiceMessage(){ 
		//交易代码 | 地区号 | 网点号 | 终端号 | 
		//快通卡卡号 |充值后卡内余额 | 充值金额 | 
		//补扣金额 | 退款金额 | 平台流水号 | 
		//流水序列号 | 联机交易序列号 | 脱机交易序列号 | 写卡标志 |  
		return  this.trxcode +"|"+this.zoneno+"|" + this.brno +"|" + this.dlywDevId +"|" + 
				this.etcCardNo +"|" + this.localBalanceF +"|" + this.qcAmountF + "|" +
				this.amt_bk +"|"+ this.amt_tk+"|"+this.retPtLsh +"|" + 
				this.retLsXLH +"|" + this.cardSeq +"|" + this.cardSeq_tj +"|" +(this.flag?"0":"1")+"|"; 
	}	

	/**每条明细对应的字段数,分析bice返回数据时使用*/
	protected int getDetailColCount(){
		return 0;
	}
	protected void setDetails(String[] arr) {}
	 
  
	
}
