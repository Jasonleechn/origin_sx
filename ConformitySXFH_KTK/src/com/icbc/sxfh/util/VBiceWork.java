package com.icbc.sxfh.util;
   
 

/**
 *�������״������
 */
public abstract class VBiceWork{  	 

	private String retcode="J999"; /**������ 0000��ʾ�ɹ�,���඼Ϊʧ��*/ 
	private String retmsg="Unknown Error";  /**������Ϣ����*/   
	protected final static Log_etc_singleton logger = Log_etc_singleton.getInstance();
	 
	public String getRetcode(){ return this.retcode;}
	public String getRetmsg(){return this.retmsg;}   
	/**�����Ƿ�ɹ�*/
	public boolean isSucceed(){ return VFuns.isAllChar0(this.retcode); }
	/**���ô��� */
	protected void setErrMessage(String msg){
		this.retcode = "J999";
		this.retmsg = msg;
	}
	
	/**�麯��, ����ʵ��, ��ȡ���͸�bice�ı��� */
	protected abstract String getToBiceMessage() throws Exception;
	
	/**�麯��, ����ʵ��, bice���ص�body����(��ͷ���ֶ���)*/
	protected abstract void setFromBiceBody(String[] arr) throws Exception;
	 
	
	/**��ѯ��������� */
	public void query(){
		//��biceͨѶ��ȡ����
		String fromBiceString ="";
		try{  
			String req = this.getToBiceMessage(); //�麯����ȡ���ͱ��ģ�����ʵ��  
			//�������
			System.out.println("V��������:" + req); 
			logger.log("V��������:" + req);
			//�����Զ���������͵�bice������
			VBiceTrans send = new VBiceTrans(); 
			fromBiceString = send.query(req);
			
			if (fromBiceString==null ||fromBiceString.trim().length()==0){
				throw new Exception("���ձ��Ľ��Ϊ��");
			}  
			//�������
			System.out.println("V��������:" + fromBiceString);	
			logger.log("V��������:" + fromBiceString);
		}catch(Exception e){ 
			this.setErrMessage(e.getMessage());	//�շ����ĳ���ֱ���˳�
			return;
		}
		 
		//���ձ��Ľṹ������ "0000|���׳ɹ�|......"
		String[] allCols = VFuns.split(fromBiceString, "|"); //��|�ָ������� 
		if (allCols.length>=2){
			this.retcode = allCols[0].trim(); 
			this.retmsg = allCols[1].trim();
		}else{ 
			this.setErrMessage("�޷���ȡ������Ϣ��ͷ");
			return;
		}
		if (this.isSucceed()==false){
			return; //ͨ�����׷������жϽ��ײ��ɹ������´�����
		} 
		
		//�����׷������ֶ��⣬�����ֶ�copyһ�ݣ��������ദ��
		String[] bodyCols = new String[allCols.length -2];
		System.arraycopy(allCols, 2, bodyCols, 0, bodyCols.length);
		try{  
			 this.setFromBiceBody(bodyCols);
		}catch(Exception e){ 
			this.setErrMessage(e.getMessage()); 
			return;
		}
	}  
}
