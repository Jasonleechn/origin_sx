package com.icbc.sxfh.util;

import com.icbc.sxfh.debug.VDebug;

/**
 * 自助交易处理之Bice报文通讯
 */
public  class VBiceTrans{   
	
	/**
	 * 与Bice做一次报文交互，返回结果报文
	 * @param pSendMsg 要发送的报文
	 * @throws Exception 
	 */
	public String query(String pSendMsg) throws Exception{
		if (pSendMsg==null||pSendMsg.trim().length()==0){
			throw new Exception("发送报文为空");
		} 
		
		//与bice通讯获取结果报文
		_GtgcServer config = this.getGtgcConfig(); 
		if (config.ip.length()==0 || config.port.length()==0){ 
			throw new Exception("bice配置无效"); 
		} 	
		
		if (VDebug.isToBiceFlag==false){ //内部测试
			return VDebug.TestMessage(pSendMsg); 
		}
		
		VTcpTool tcp = new VTcpTool();		
		try{ 	
			//发送并接收
			tcp.connect(config.ip, Integer.parseInt(config.port)); 
			tcp.sendData(pSendMsg, "bice");
			String ret = tcp.receiveData("bice"); //bice返回的报文
			return ret; 
		}finally{
			tcp.close();
		}     
	}  
	
	//内部类
	protected class _GtgcServer{
		String ip="";
		String port="";
	}
	
	//从配置文件中读取bice连接信息
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
