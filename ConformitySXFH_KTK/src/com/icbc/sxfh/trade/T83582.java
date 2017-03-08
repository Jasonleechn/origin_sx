package com.icbc.sxfh.trade;

/**
 * 快通卡充值
 */
public class T83582 extends VSingleQuery{ 
	
	private final String trxcode = "83582";
	
	/**查询条件*/
	private String zoneno="";//地区号
	private String brno=""; //网点号
	private String dlywDevId =""; //终端号(可空)
	private String readCardNo12 =""; //读卡器编号(12位)
	private String bankCardNo = ""; //银行卡号
	private String etcUserNo = ""; //快通卡用户号
	private String fixCarType= ""; //车卡绑定类别
	private String fixCarCphm= ""; //绑定车牌号
	private String etcCardNo=""; //etc卡号     
	private String localBalanceF =""; //充值前卡内记录余额 （以分为单位）
	private String qcAmountF =""; //充值金额 （以分为单位）
	private String amt_bk = ""; //补扣金额
	private String amt_tk = ""; //退款金额
	private String cardSeq =""; // 联机交易序列号
	private String cardSeq_tj = "0000"; //脱机交易序列号默认值 ‘0000’
	private String icRandom=""; //随机数
	private String MAC1=""; // 
	private String writeDate8=""; 
	private String writeTime6="";
	private String login_user = "10"; //操作员工号
	
	public void setZoneno(String zoneno) {this.zoneno = zoneno;}
	public void setBrno(String brno) {this.brno = brno;} 
	//public void setDlywDevId(String dlywDevId) {this.dlywDevId = dlywDevId;}
	public void setReadCardNo12(String readCardNo12) {this.readCardNo12 = readCardNo12;	}
	public void setBankCardNo(String bankCardNo) {this.bankCardNo = bankCardNo;}
	public void setEtcUserNo(String etcUserNo) {this.etcUserNo = etcUserNo;}
	public void setFixCarType(String fixCarType) {this.fixCarType = fixCarType;}
	public void setFixCarCphm(String fixCarCphm) {this.fixCarCphm = fixCarCphm;}
	public void setEtcCardNo(String etcCardNo) {this.etcCardNo = etcCardNo;}
	public void setLocalBalanceF(String localBalanceF) {this.localBalanceF = localBalanceF;}
	public void setQcAmountF(String qcAmountF) {this.qcAmountF = qcAmountF;}
	public void setAmt_bk(String amt_bk) {this.amt_bk = amt_bk;}
	public void setAmt_tk(String amt_tk) {this.amt_tk = amt_tk;}
	public void setCardSeq(String cardSeq) {this.cardSeq = cardSeq;}
	public void setIcRandom(String icRandom) {this.icRandom = icRandom;}
	public void setMAC1(String mAC1) {this.MAC1 = mAC1;} 
	public void setWriteDate8(String writeDate8) {this.writeDate8 = writeDate8;}
	public void setWriteTime6(String writeTime6) {this.writeTime6 = writeTime6;} 
	public void setDetail(Detail detail) {
		this.detail = detail;
	}

	/**结果数据*/
	private Detail detail = new Detail();  
	public Detail getDetail(){return this.detail;} 

	/**获取发送给bice的报文*/
	public String getToBiceMessage(){ 
		//交易代码|地区号|网点号|终端号|
		//快通卡用户号|车卡绑定类别|绑定车牌号|
		//快通卡卡号|充值前卡内记录余额|
		//充值金额|补扣金额|退款金额|
		//联机交易序列号|脱机交易序列号|随机数|MAC1|
		//读卡器终端号编号|写卡日期|写卡时间 |
		//操作员工号|银行卡卡号|
		return  this.trxcode +"|"+this.zoneno+"|" + this.brno +"|" + this.dlywDevId +"|" + 
				this.etcUserNo +"|" + this.fixCarType +"|" + this.fixCarCphm + "|" +
				this.etcCardNo +"|" + this.localBalanceF +"|" + 
				this.qcAmountF +"|" + this.amt_bk +"|"+ this.amt_tk+"|"+
				this.cardSeq +"|" + this.cardSeq_tj +"|" + this.icRandom +"|" + this.MAC1 +"|" +
				this.readCardNo12 +"|" + this.writeDate8+"|" +	this.writeTime6+"|" +
				this.login_user+"|" +	this.bankCardNo +"|";
	}	

	/**每条明细对应的字段数,分析bice返回数据时使用*/
	protected int getDetailColCount(){
		return Detail.COL_COUNT;
	}
	
	/**设置明细*/
	protected void setDetails(String[] arr){ 
		Detail obj = new Detail();	
		int k=0; 
		obj.setLsh(arr[k++].trim());                                                    
		obj.setName(arr[k++].trim());                                                     
		obj.setLsXLH(arr[k++].trim());                                                     
		obj.setMac2(arr[k++].trim());                                                        
		this.detail = obj;
	}
 
	/**明细内部类对象*/
	public static class Detail { 
		//平台流水号	| 快通卡用户名 | 流水序列号	| MAC2 
		protected static final int COL_COUNT = 4; //字段数  
		private String lsh = "";  
		private String name= "";  
		private String lsXLH = "";  
		private String Mac2= "";
		
		public String getLsh() {return this.lsh;}
		public void setLsh(String lsh) {this.lsh = lsh;}
		public String getName() {return this.name;}
		public void setName(String name) {this.name = name;}
		public String getLsXLH() {return this.lsXLH;}
		public void setLsXLH(String lsXLH) {this.lsXLH = lsXLH;}
		public String getMac2() {return this.Mac2;}
		public void setMac2(String mac2) {this.Mac2 = mac2;}  
		
		
	} 
	
	
}
