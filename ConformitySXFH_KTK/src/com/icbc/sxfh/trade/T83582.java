package com.icbc.sxfh.trade;

/**
 * ��ͨ����ֵ
 */
public class T83582 extends VSingleQuery{ 
	
	private final String trxcode = "83582";
	
	/**��ѯ����*/
	private String zoneno="";//������
	private String brno=""; //�����
	private String dlywDevId =""; //�ն˺�(�ɿ�)
	private String readCardNo12 =""; //���������(12λ)
	private String bankCardNo = ""; //���п���
	private String etcUserNo = ""; //��ͨ���û���
	private String fixCarType= ""; //���������
	private String fixCarCphm= ""; //�󶨳��ƺ�
	private String etcCardNo=""; //etc����     
	private String localBalanceF =""; //��ֵǰ���ڼ�¼��� ���Է�Ϊ��λ��
	private String qcAmountF =""; //��ֵ��� ���Է�Ϊ��λ��
	private String amt_bk = ""; //���۽��
	private String amt_tk = ""; //�˿���
	private String cardSeq =""; // �����������к�
	private String cardSeq_tj = "0000"; //�ѻ��������к�Ĭ��ֵ ��0000��
	private String icRandom=""; //�����
	private String MAC1=""; // 
	private String writeDate8=""; 
	private String writeTime6="";
	private String login_user = "10"; //����Ա����
	
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

	/**�������*/
	private Detail detail = new Detail();  
	public Detail getDetail(){return this.detail;} 

	/**��ȡ���͸�bice�ı���*/
	public String getToBiceMessage(){ 
		//���״���|������|�����|�ն˺�|
		//��ͨ���û���|���������|�󶨳��ƺ�|
		//��ͨ������|��ֵǰ���ڼ�¼���|
		//��ֵ���|���۽��|�˿���|
		//�����������к�|�ѻ��������к�|�����|MAC1|
		//�������ն˺ű��|д������|д��ʱ�� |
		//����Ա����|���п�����|
		return  this.trxcode +"|"+this.zoneno+"|" + this.brno +"|" + this.dlywDevId +"|" + 
				this.etcUserNo +"|" + this.fixCarType +"|" + this.fixCarCphm + "|" +
				this.etcCardNo +"|" + this.localBalanceF +"|" + 
				this.qcAmountF +"|" + this.amt_bk +"|"+ this.amt_tk+"|"+
				this.cardSeq +"|" + this.cardSeq_tj +"|" + this.icRandom +"|" + this.MAC1 +"|" +
				this.readCardNo12 +"|" + this.writeDate8+"|" +	this.writeTime6+"|" +
				this.login_user+"|" +	this.bankCardNo +"|";
	}	

	/**ÿ����ϸ��Ӧ���ֶ���,����bice��������ʱʹ��*/
	protected int getDetailColCount(){
		return Detail.COL_COUNT;
	}
	
	/**������ϸ*/
	protected void setDetails(String[] arr){ 
		Detail obj = new Detail();	
		int k=0; 
		obj.setLsh(arr[k++].trim());                                                    
		obj.setName(arr[k++].trim());                                                     
		obj.setLsXLH(arr[k++].trim());                                                     
		obj.setMac2(arr[k++].trim());                                                        
		this.detail = obj;
	}
 
	/**��ϸ�ڲ������*/
	public static class Detail { 
		//ƽ̨��ˮ��	| ��ͨ���û��� | ��ˮ���к�	| MAC2 
		protected static final int COL_COUNT = 4; //�ֶ���  
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
