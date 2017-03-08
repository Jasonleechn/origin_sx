package com.icbc.sxfh.trade;

/**
 * ��ͨ����Ϣ��ѯ
 */
public class T83581 extends VSingleQuery{ 
	
	private final String trxcode = "83581";
	
	/**��ѯ����*/
	private String zoneno="";//������
	private String brno=""; //����� 
	private String dlywDevId =""; //�ն˺�(�ɿ�)
	private String etcCardNo=""; //etc����    
	
	public void setZoneno(String zoneno){ this.zoneno = zoneno;}	
	public void setBrno(String brno) {this.brno = brno;} 
	//public void setDlywDevId(String dlywDevId) {this.dlywDevId = dlywDevId;} 
	public void setEtcCardNo(String etcCardNo){this.etcCardNo = etcCardNo;}	 	
	
	

	/**�������*/
	private Detail detail = new Detail();  
	public Detail getDetail(){return this.detail;} 

	/**��ȡ���͸�bice�ı���*/
	protected String getToBiceMessage(){ 
		//���״���|������|�����|�ն˺�|��ͨ������|
		return  this.trxcode +"|"+this.zoneno+"|" + this.brno +"|" 
			 +this.dlywDevId +"|" + this.etcCardNo +"|";
	}	

	/**ÿ����ϸ��Ӧ���ֶ���,����bice��������ʱʹ��*/
	protected int getDetailColCount(){
		return Detail.COL_COUNT;
	}
	
	/**������ϸ*/
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
 
	/**��ϸ�ڲ������*/
	public static class Detail { 
		//��ͨ���û���|�û�����|��ͨ���û���|֤������|֤������|��ϵ������|�̶��绰|
		//�ƶ��绰|��ͨ��ʧЧʱ��|���������|�󶨳��ƺ�|������ɫ|����|������λ����|
		//��ֵǰϵͳ��¼���|������Ȧ���ֵ�Ľ��|���۽��|�˿���|
		protected static final int COL_COUNT = 18; //�ֶ��� 
		
		private String etcUserNo = ""; //��ͨ���û���
		private String userType= ""; //�û�����
		private String userName = ""; //��ͨ���û���
		private String idCardType= ""; //֤������
		private String idCardNo = ""; //֤������
		private String contactMan = ""; //��ϵ������
		private String telephone = ""; //�̶��绰
		private String mobile = ""; //�ƶ��绰
		private String outTime = ""; //��ͨ��ʧЧʱ��
		private String fixCarType= ""; //���������
		private String fixCarCphm= ""; //�󶨳��ƺ�
		private String fixCarColor = ""; //������ɫ
		private String fixCarSize = ""; //����
		private String fixCarSitCount = ""; //������λ����
		private int balance= 0; //��ֵǰϵͳ��¼���
		private String canUseAmt = ""; //������Ȧ���ֵ�Ľ��
		private int amt_bk = 0; //���۽��
		private int amt_tk = 0; //�˿���
		

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
