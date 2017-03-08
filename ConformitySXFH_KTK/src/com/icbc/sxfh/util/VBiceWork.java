package com.icbc.sxfh.util;
   
 

/**
 *自助交易处理基类
 */
public abstract class VBiceWork{  	 

	private String retcode="J999"; /**返回码 0000表示成功,其余都为失败*/ 
	private String retmsg="Unknown Error";  /**返回信息描述*/   
	protected final static Log_etc_singleton logger = Log_etc_singleton.getInstance();
	 
	public String getRetcode(){ return this.retcode;}
	public String getRetmsg(){return this.retmsg;}   
	/**交易是否成功*/
	public boolean isSucceed(){ return VFuns.isAllChar0(this.retcode); }
	/**设置错误 */
	protected void setErrMessage(String msg){
		this.retcode = "J999";
		this.retmsg = msg;
	}
	
	/**虚函数, 子类实现, 获取发送给bice的报文 */
	protected abstract String getToBiceMessage() throws Exception;
	
	/**虚函数, 子类实现, bice返回的body数据(除头部字段外)*/
	protected abstract void setFromBiceBody(String[] arr) throws Exception;
	 
	
	/**查询及结果处理 */
	public void query(){
		//与bice通讯获取报文
		String fromBiceString ="";
		try{  
			String req = this.getToBiceMessage(); //虚函数获取发送报文，子类实现  
			//调试输出
			System.out.println("V发送数据:" + req); 
			logger.log("V发送数据:" + req);
			//调用自定义组件发送到bice并接收
			VBiceTrans send = new VBiceTrans(); 
			fromBiceString = send.query(req);
			
			if (fromBiceString==null ||fromBiceString.trim().length()==0){
				throw new Exception("接收报文结果为空");
			}  
			//调试输出
			System.out.println("V接收数据:" + fromBiceString);	
			logger.log("V接收数据:" + fromBiceString);
		}catch(Exception e){ 
			this.setErrMessage(e.getMessage());	//收发报文出错，直接退出
			return;
		}
		 
		//接收报文结构类似于 "0000|交易成功|......"
		String[] allCols = VFuns.split(fromBiceString, "|"); //以|分隔的数据 
		if (allCols.length>=2){
			this.retcode = allCols[0].trim(); 
			this.retmsg = allCols[1].trim();
		}else{ 
			this.setErrMessage("无法读取返回信息包头");
			return;
		}
		if (this.isSucceed()==false){
			return; //通过交易返回码判断交易不成功不向下处理了
		} 
		
		//除交易返回码字段外，其它字段copy一份，传给子类处理
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
