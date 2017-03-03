package com.icbc.sxfh.common;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.icbc.sxfh.util.Log_etc_singleton;

/**
 * Servlet implementation class ConnectMapsServlet
 */
public class ICBCEPayServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Log_etc_singleton logger = Log_etc_singleton.getInstance();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ICBCEPayServlet() {
        super();
        System.out.println("=======ICBCEPayServlet Construct=========");
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("=======ICBCEPayServlet doPost=========");
		// TODO Auto-generated method stub
		String retCode = "";
		String retMsg = "";
		PrintWriter pw = null;
		request.setCharacterEncoding("UTF-8");
		String transCode = request.getParameter("transCode"); 
		String tag = request.getParameter("tag");
		tag = URLDecoder.decode(tag,"UTF-8");
		tag = tag+"-交易代码"+transCode+"---------------";
		logger.log(tag);

		if(transCode.equals("88582")){
			response.setContentType("text/html;charset=utf-8"); 
			String param = request.getParameter("param");  
			String transtime = request.getParameter("transTime");  
			String areaNo = request.getParameter("areaNo");
			logger.log(tag+"交易请求数据param："+param);
			logger.log(tag+"交易时间transtime："+transtime);
			String csessionid = request.getParameter("csessionid");
			logger.log(tag+"csessionid："+csessionid);
			String publiccode = transCode +"|"+ areaNo + "|";
			logger.log(tag+"交易码+地区号publiccode："+publiccode);
			ICBCEPayService st = new ICBCEPayService(param, publiccode, transtime, tag, csessionid);
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 
			try{
				if(st.doTrade()){

					String recvdata = st.getReceiveData();
					logger.log(tag+"recvdata:"+recvdata);
					String zjlx = CommonTrade.getField(recvdata, 1);
					logger.log(tag+"zjlx:"+zjlx);
					String zjhm = CommonTrade.getField(recvdata, 2);
					logger.log(tag+"zjhm:"+zjhm);
					String count = CommonTrade.getField(recvdata, 6);
					logger.log(tag+"count:"+count);
					String agreementtag = CommonTrade.getField(recvdata, 7);
					logger.log(tag+"agreementtag:"+agreementtag);
					String agreement = CommonTrade.getField(recvdata, 8);
					logger.log(tag+"agreement:"+agreement);
					String phone = CommonTrade.getField(recvdata, 9);
					logger.log(tag+"phone:"+phone);
					String singleLimit = CommonTrade.getField(recvdata, 17);
					logger.log(tag+"singleLimit:"+singleLimit);
					String status = CommonTrade.getField(recvdata, 20);
					logger.log(tag+"status:"+status);
					String status1 = CommonTrade.getField(recvdata, 21);
					logger.log(tag+"status1:"+status1);
					json.put("phone", phone);
					if(count.equals("1") && agreementtag.equals("1") && status.equals("0")&& status1.equals("0"))
						retCode = "0";
					else
						retCode = "1";
					
					retMsg = "交易成功";
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
					json.put("phone", phone);
				}else{
					retCode = "-1";
					retMsg = "交易失败";
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				}
			}catch(JSONException e){
				e.printStackTrace();
			}				        
		    pw.print(json.toString());    
		    logger.log(tag+"返回json object :"+json.toString()); 
		    pw.close(); 
		}
		
		if(transCode.equals("88583")){
			response.setContentType("text/html;charset=utf-8"); 
			String param = request.getParameter("param");  
			String transtime = request.getParameter("transTime");  
			String areaNo = request.getParameter("areaNo");
			logger.log(tag+"交易请求数据param："+param);
			logger.log(tag+"交易时间transtime："+transtime);
			String csessionid = request.getParameter("csessionid");
			logger.log(tag+"csessionid："+csessionid);
			String publiccode = transCode +"|"+ areaNo + "|";
			logger.log(tag+"交易码+地区号publiccode："+publiccode);
			ICBCEPayService st = new ICBCEPayService(param, publiccode, transtime, tag, csessionid);
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 
			String operation = CommonTrade.getField(param, 1);
			try{
				if(st.doTrade()){
					String recvdata = st.getReceiveData();
					logger.log(tag+"recvdata:"+recvdata);
					String keyserial = CommonTrade.getField(recvdata, 3);
					logger.log(tag+"keyserial:"+keyserial);
					String ciphertext = CommonTrade.getField(recvdata, 4);
					logger.log(tag+"ciphertext:"+ciphertext);
					String plaintext = CommonTrade.getField(recvdata, 9);
					logger.log(tag+"plaintext:"+plaintext);
					String errorTag = CommonTrade.getField(recvdata, 5);
					logger.log(tag+"errorTag:"+errorTag);
					String lastsix = CommonTrade.getField(recvdata, 8);
					logger.log(tag+"lastsix:"+lastsix);
					json.put("keyserial", keyserial);
					json.put("ciphertext", ciphertext);
					if(operation.equals("1")){
						if(keyserial.isEmpty()||ciphertext.isEmpty()){
							retCode = "-1";				
							retMsg = "动态密码生成为空";
						}else{
							retCode = "0";				
							retMsg = "交易成功";
						}
					}
					if(operation.equals("2")){
						if(errorTag.isEmpty()||!errorTag.equals("0")){
							retCode = "-2";				
							retMsg = "动态密码校验失败";
						}else{
							retCode = "0";				
							retMsg = "交易成功";
						}
					}
					
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				}else{
					retCode = "-3";
					retMsg = st.getStrRespInfo();
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				}
			}catch(JSONException e){
				e.printStackTrace();
			}				        
		    pw.print(json.toString());    
		    logger.log(tag+"返回json object :"+json.toString()); 
		    pw.close(); 
		}
	}
}