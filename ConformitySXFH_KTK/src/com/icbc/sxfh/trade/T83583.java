package com.icbc.sxfh.trade;

/**
 * ��ͨ����ֵȷ��
 */
public class T83583 extends VSingleQuery{ 
	
	private final String trxcode = "83583";
	
	/**��ѯ����*/
	private String zoneno="";//������
	private String brno=""; //����� 
	private String dlywDevId =""; //�ն˺�(�ɿ�)
	private String etcCardNo=""; //etc����     
	private String localBalanceF = "0"; //��ֵ���ڼ�¼��� ���Է�Ϊ��λ��
	private String qcAmountF ="0"; //��ֵ��� ���Է�Ϊ��λ��
	private int amt_bk = 0; //���۽��
	private int amt_tk = 0; //�˿��� 
	private String retPtLsh = ""; //ƽ̨��ˮ��
	private String retLsXLH = ""; //��ˮ���к�   
	private String cardSeq =""; // �����������к�
	private String cardSeq_tj = "0000"; //�ѻ��������к�Ĭ��ֵ ��0000��
	private boolean flag=false; //д����־ 
	
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
 
 
	/**��ȡ���͸�bice�ı���*/
	protected String getToBiceMessage(){ 
		//���״��� | ������ | ����� | �ն˺� | 
		//��ͨ������ |��ֵ������� | ��ֵ��� | 
		//���۽�� | �˿��� | ƽ̨��ˮ�� | 
		//��ˮ���к� | �����������к� | �ѻ��������к� | д����־ |  
		return  this.trxcode +"|"+this.zoneno+"|" + this.brno +"|" + this.dlywDevId +"|" + 
				this.etcCardNo +"|" + this.localBalanceF +"|" + this.qcAmountF + "|" +
				this.amt_bk +"|"+ this.amt_tk+"|"+this.retPtLsh +"|" + 
				this.retLsXLH +"|" + this.cardSeq +"|" + this.cardSeq_tj +"|" +(this.flag?"0":"1")+"|"; 
	}	

	/**ÿ����ϸ��Ӧ���ֶ���,����bice��������ʱʹ��*/
	protected int getDetailColCount(){
		return 0;
	}
	protected void setDetails(String[] arr) {}
	 
  
	
}
