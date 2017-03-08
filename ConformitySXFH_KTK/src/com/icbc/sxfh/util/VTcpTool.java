package com.icbc.sxfh.util;
 
import java.io.*;
import java.net.Socket;
import java.util.Vector;

/**
 * Tcp socket通讯基类，原工行提供的有通讯长度限制,所以重新写了一个
 */
public class VTcpTool{
	
	private Socket socket=null; 
	private InputStream input=null;
	private OutputStream output=null;
	private String charEncoding="GBK"; //通讯编码方式,默认GBK
	private final static Log_etc_singleton logger = Log_etc_singleton.getInstance();
	  
	/**
	 * 连接到服务器
	 * @param serverIp 服务器Ip
	 * @param serverPort 端口 
	 */
	public void connect(String serverIp, int serverPort) throws Exception{  		
		if (serverIp == null || serverIp.trim().length()==0 || serverPort <= 0){
			throw new Exception("socketServer or port error");
		}
		try{
			this.socket = new Socket(serverIp.trim(), serverPort);
			this.output = this.socket.getOutputStream();
			this.input = this.socket.getInputStream(); 
			logger.log("serverIp:" + serverIp + "; serverPort:" + serverPort);
		}catch(Exception e){
			this.close();
			throw e;
		}
	} 

	/**
	 * 使用完后关闭
	 */
	public void close(){
		try{
			if (this.input!=null){
				this.input.close(); 
			}			
		}catch(Exception e){ }
		try{ 
			if (this.output!=null){
				this.output.close(); 
			}	 
		}catch(Exception e){ }
		try{ 
			if (this.socket!=null){
				this.socket.close(); 
			}	 
		}catch(Exception e){ } finally{
			this.socket=null;
		}
	} 

	/**
	 * 发送数据
	 * @param type  
	 */
	public void sendData(String xml, String type) throws Exception{
		if (this.socket==null){
			throw new Exception("Socket连接不存在");
		} 
		byte[] bs =xml.getBytes(this.charEncoding);
		this.output.write(bs);
		this.output.flush();
	} 
 
	
	/**
	 * 读取字符串通讯数据
	 * @param type  
	 */
	public String receiveData(String type) throws Exception{
		if (this.socket==null){
			throw new Exception("Socket连接不存在");
		}
		String xml = "";
		try{
			this.socket.setSoTimeout(60000);
			InputStream is = this.socket.getInputStream();
			byte[] bc = _readStream(is);  //读数据
			xml = new String(bc, this.charEncoding); 
			return xml;
		}catch(Exception e){ 
			throw e;
		}  
	} 
	
	
	/**内部函数，从流中读取一次数据，直到无数据可读*/
	private  byte[] _readStream(InputStream in) throws Exception{
		Vector vec = new Vector();
		try{ 		
			//读到数据存储在列表中
			while (true){				
				byte[] readBs = new byte[1024];
				int count = in.read(readBs); 
				if (count<=0){
					break;
				}else{
					byte[] _bs = new byte[count];
					System.arraycopy(readBs, 0, _bs, 0, count);
					vec.add(_bs);
				}
			}
			if (vec.size()==0){
				return new byte[0];
			}else if (vec.size()==1){
				return (byte[])vec.get(0);
			}
			//计算总长，并重新拼装成一个新的字节数组
			int length=0;
			for (int i=0; i< vec.size(); i++){
				byte[] bs = (byte[])vec.get(i);
				length+= bs.length;
			}
			//拼装成一个字节组
			byte[] ret = new byte[length];
			int pos = 0;
			for (int i=0; i< vec.size(); i++){
				byte[] bs = (byte[])vec.get(i);
				System.arraycopy(bs, 0, ret, pos, bs.length);
				pos += bs.length;
			}
			return ret;
		}finally{
			vec.clear();
			vec=null;
		}
	} 
}
