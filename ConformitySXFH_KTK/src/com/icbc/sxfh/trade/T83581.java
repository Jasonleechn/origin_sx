package com.icbc.sxfh.trade;

/**
 * 快通卡信息查询
 */
public class T83581 extends VSingleQuery{ 
	
	private final String trxcode = "83581";
	
	/**查询条件*/
	private String zoneno="";//地区号
	private String brno=""; //网点号 
	private String dlywDevId =""; //终端号(可空)
	private String etcCardNo=""; //etc卡号    
	
	public void setZoneno(String zoneno){ this.zoneno = zoneno;}	
	public void setBrno(String brno) {this.brno = brno;} 
	//public void setDlywDevId(String dlywDevId) {this.dlywDevId = dlywDevId;} 
	public void setEtcCardNo(String etcCardNo){this.etcCardNo = etcCardNo;}	 	
	
	

	/**结果数据*/
	private Detail detail = new Detail();  
	public Detail getDetail(){return this.detail;} 

	/**获取发送给bice的报文*/
	protected String getToBiceMessage(){ 
		//交易代码|地区号|网点号|终端号|快通卡卡号|
		return  this.trxcode +"|"+this.zoneno+"|" + this.brno +"|" 
			 +this.dlywDevId +"|" + this.etcCardNo +"|";
	}	

	/**每条明细对应的字段数,分析bice返回数据时使用*/
	protected int getDetailColCount(){
		return Detail.COL_COUNT;
	}
	
	/**设置明细*/
	protected void setDetails(String[] arr){
		Detail obj = new Detail();
		int k=0; 
		obj.setEtcUserNo(arr[k++].trim());                                                    
		obj.setUserType(arr[k++].trim());                                                     
		obj.setUserName(arr[k++].trim());                                                     
		obj.setIdCardType(arr[k++].trim());                                                   
		obj.setIdCardNo(arr[k++].trim());                                                     
		obj.setContactMan(arr[k++].trim());                                                   
		obj.setTelephone(arr[k++].trim());                                                    
		obj.setMobile(arr[k++].trim());                                                       
		obj.setOutTime(arr[k++].trim());                                                      
		obj.setFixCarType(arr[k++].trim());                                                   
		obj.setFixCarCphm(arr[k++].trim());                                                     
		obj.setFixCarColor(arr[k++].trim());                                                  
		obj.setFixCarSize(arr[k++].trim());                                                   
		obj.setFixCarSitCount(arr[k++].trim()); 
		
		String s = arr[k++].trim(); 
		if (s.length()>0){  
			obj.setBalance(Integer.parseInt(s));  
		}       
		
		obj.setCanUseAmt(arr[k++].trim());
		
		 s =arr[k++].trim(); 
		if (s.length()>0){
			obj.setAmt_bk(Integer.parseInt(s));  
		} 
		
		s =arr[k++].trim();
		if (s.length()>0){
			obj.setAmt_tk(Integer.parseInt(s));  
		}                                                      
		this.detail = obj;
	}
 
	/**明细内部类对象*/
	public static class Detail { 
		//快通卡用户号|用户类型|快通卡用户名|证件类型|证件号码|联系人姓名|固定电话|
		//移动电话|快通卡失效时间|车卡绑定类别|绑定车牌号|车牌颜色|车型|车辆座位数量|
		//充值前系统记录余额|可用于圈存充值的金额|补扣金额|退款金额|
		protected static final int COL_COUNT = 18; //字段数 
		
		private String etcUserNo = ""; //快通卡用户号
		private String userType= ""; //用户类型
		private String userName = ""; //快通卡用户名
		private String idCardType= ""; //证件类型
		private String idCardNo = ""; //证件号码
		private String contactMan = ""; //联系人姓名
		private String telephone = ""; //固定电话
		private String mobile = ""; //移动电话
		private String outTime = ""; //快通卡失效时间
		private String fixCarType= ""; //车卡绑定类别
		private String fixCarCphm= ""; //绑定车牌号
		private String fixCarColor = ""; //车牌颜色
		private String fixCarSize = ""; //车型
		private String fixCarSitCount = ""; //车辆座位数量
		private int balance= 0; //充值前系统记录余额
		private String canUseAmt = ""; //可用于圈存充值的金额
		private int amt_bk = 0; //补扣金额
		private int amt_tk = 0; //退款金额
		

		public void setEtcUserNo(String etcUserNo) {this.etcUserNo = etcUserNo;}
		public void setUserType(String userType) {this.userType = userType;}
		public void setUserName(String userName) {this.userName = userName;}
		public void setIdCardType(String idCardType) {this.idCardType = idCardType;}
		public void setIdCardNo(String idCardNo) {this.idCardNo = idCardNo;}
		public void setContactMan(String contactMan) {this.contactMan = contactMan;}
		public void setTelephone(String telephone) {this.telephone = telephone;}
		public void setMobile(String mobile) {this.mobile = mobile;}
		public void setOutTime(String outTime) {this.outTime = outTime;}
		public void setFixCarType(String fixCarType) {this.fixCarType = fixCarType;}
		public void setFixCarCphm(String fixCarNo) {this.fixCarCphm = fixCarNo;}
		public void setFixCarColor(String fixCarColor) {this.fixCarColor = fixCarColor;}
		public void setFixCarSize(String fixCarSize) {this.fixCarSize = fixCarSize;}
		public void setFixCarSitCount(String fixCarSitCount) {this.fixCarSitCount = fixCarSitCount;}
		public void setBalance(int balance) {this.balance = balance;}
		public void setCanUseAmt(String canUseAmt) {this.canUseAmt = canUseAmt;}
		public void setAmt_bk(int amt_bk) {this.amt_bk = amt_bk;}
		public void setAmt_tk(int amt_tk) {this.amt_tk = amt_tk;}
		public String getEtcUserNo() {return this.etcUserNo;}
		public String getUserType() {return this.userType;}
		public String getUserName() {return this.userName;}
		public String getIdCardType() {return this.idCardType;}
		public String getIdCardNo() {return this.idCardNo;}
		public String getContactMan() {return this.contactMan;}
		public String getTelephone() {return this.telephone;}
		public String getMobile() {return this.mobile;}
		public String getOutTime() {return this.outTime;}
		public String getFixCarType() {return this.fixCarType;}
		public String getFixCarCphm() {return this.fixCarCphm;}
		public String getFixCarColor() {return this.fixCarColor;}
		public String getFixCarSize() {return this.fixCarSize;}
		public String getFixCarSitCount() {return this.fixCarSitCount;}
		public int getBalance() {return this.balance;}
		public String getCanUseAmt() {return this.canUseAmt;}
		public int getAmt_bk() {return this.amt_bk;}
		public int getAmt_tk() {return this.amt_tk;}  
	} 
	
	
}
