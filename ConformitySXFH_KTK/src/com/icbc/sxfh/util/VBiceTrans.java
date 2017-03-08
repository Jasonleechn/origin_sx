package com.icbc.sxfh.util;

import com.icbc.sxfh.debug.VDebug;

/**
 * �������״���֮Bice����ͨѶ
 */
public  class VBiceTrans{   
	
	/**
	 * ��Bice��һ�α��Ľ��������ؽ������
	 * @param pSendMsg Ҫ���͵ı���
	 * @throws Exception 
	 */
	public String query(String pSendMsg) throws Exception{
		if (pSendMsg==null||pSendMsg.trim().length()==0){
			throw new Exception("���ͱ���Ϊ��");
		} 
		
		//��biceͨѶ��ȡ�������
		_GtgcServer config = this.getGtgcConfig(); 
		if (config.ip.length()==0 || config.port.length()==0){ 
			throw new Exception("bice������Ч"); 
		} 	
		
		if (VDebug.isToBiceFlag==false){ //�ڲ�����
			return VDebug.TestMessage(pSendMsg); 
		}
		
		VTcpTool tcp = new VTcpTool();		
		try{ 	
			//���Ͳ�����
			tcp.connect(config.ip, Integer.parseInt(config.port)); 
			tcp.sendData(pSendMsg, "bice");
			String ret = tcp.receiveData("bice"); //bice���صı���
			return ret; 
		}finally{
			tcp.close();
		}     
	}  
	
	//�ڲ���
	protected class _GtgcServer{
		String ip="";
		String port="";
	}
	
	//�������ļ��ж�ȡbice������Ϣ
	private _GtgcServer getGtgcConfig() throws Exception{
		String filename = VWorkSpace.getWORKDIR() + VWorkSpace.BICE_config_file;		 
		String[] lines= VFuns.readLinesFormFile(filename);
		
		_GtgcServer obj = new _GtgcServer();
		for (int i=0; i< lines.length; i++){
			String aline = lines[i].trim();
			if (aline.length()==0||aline.startsWith("#")||aline.indexOf('=')<=0){
				continue;
			}
			String[] arr = aline.split("=");
			if (arr.length<2){
				continue;
			}
			if (arr[0].trim().toUpperCase().equals("BICE_SERVER_IP")){
				obj.ip = arr[1].trim();
			}
			if (arr[0].trim().toUpperCase().equals("BICE_SERVER_PORT")){
				obj.port = arr[1].trim();
			}
		}
		return obj;
	}
}
