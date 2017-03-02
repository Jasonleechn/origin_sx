package com.icbc.sxfh.ktcard;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;

import com.icbc.sxfh.common.CommonTrade;



/**
 * Servlet implementation class ConnectMapsServlet
 */
public class ConnectMapsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Logger log = Logger.getLogger(ConnectMapsServlet.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ConnectMapsServlet() {
        super();
        System.out.println("=======ConnectMapsServlet Construct=========");
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
		System.out.println("=======ConnectMapsServlet doPost=========");
		// TODO Auto-generated method stub
		String retCode = "";
		String retMsg = "";
		String result = "";
		PrintWriter pw = null;
		request.setCharacterEncoding("UTF-8");
		String transCode = request.getParameter("transCode"); 
		String tag = request.getParameter("tag");
		tag = URLDecoder.decode(tag,"UTF-8");
		tag = tag+"-交易代码"+transCode+"---------------";
		log.info(tag);
		//String areaNo = "4301";

		//苏通卡充值
		if(transCode.equals("84358")){
			response.setContentType("text/html;charset=utf-8"); 
			String param = request.getParameter("param"); 
			String transtime = request.getParameter("transTime");  
			log.info(tag+"交易请求数据param:"+param);
			log.info(tag+"交易时间transtime:"+transtime);
			String name = URLDecoder.decode(CommonTrade.getField(param, 8),"UTF-8");
			//log.info("name------------"+CommonTrade.getField(param, 8));
			//log.info("decode name------------"+name);
			String param1 = CommonTrade.replaceField(param, CommonTrade.getField(param, 8), name);
			if(param1 == "")
				param1 = param; 
			//param = URLDecoder.decode(param,"UTF-8");
			log.info(tag+"中文解码后数据param1:"+param1);
			String areaNo = CommonTrade.getField(param1, 6).substring(1,6);
			String publiccode = transCode +"|"+ areaNo + "|";
			log.info(tag+"交易码+地区号publiccode:"+publiccode);
			STCardService st = new STCardService(param1, publiccode, transtime, tag);
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 
			try{
				if(st.doTrade()){
					retCode = "0";
					retMsg = st.getRespInfo();	
					result = st.getReceiveData();
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
					String mac_key = CommonTrade.getField(result, 4);
					String serialNo = CommonTrade.getField(result, 3);
					log.info(tag+"中间业务平台返回结果MAC KEY:"+mac_key);
					log.info(tag+"中间业务平台返回结果serialNo:"+serialNo);
					json.put("mackey", mac_key);
					json.put("serno", serialNo);
				}else{
					retCode = "-1";
					retMsg = st.getRespInfo();
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				}
			}catch(JSONException e){
				e.printStackTrace();
			}				        
		    pw.print(json.toString());    
		    log.info(tag+"返回json object:"+json.toString()); 
		    pw.close(); 
		}
		
		//写卡成功后更新中间业务平台状态
		if(transCode.equals("82148")){
			response.setContentType("text/html;charset=utf-8"); 
			String param = request.getParameter("param");  
			String transtime = request.getParameter("transTime");  
			String areaNo = request.getParameter("areaNo");
			log.info(tag+"交易请求数据param："+param);
			log.info(tag+"交易时间transtime："+transtime);
			String publiccode = transCode +"|"+ areaNo + "|";
			log.info(tag+"交易码+地区号publiccode："+publiccode);
			STCardService st = new STCardService(param, publiccode, transtime, tag);
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 
			try{
				if(st.doTrade()){
					retCode = "0";
					retMsg = st.getRespInfo();	
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				}else{
					retCode = "-1";
					retMsg = st.getRespInfo();
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				}
			}catch(JSONException e){
				e.printStackTrace();
			}				        
		    pw.print(json.toString());    
		    log.info(tag+"返回json object :"+json.toString()); 
		    pw.close(); 
		}
		
		//充值失败后冲正
		if(transCode.equals("84420")){
			response.setContentType("text/html;charset=utf-8"); 
			String param = request.getParameter("param");  
			String transtime = request.getParameter("transTime");  
			String areaNo = request.getParameter("areaNo");
			log.info(tag+"交易请求数据param："+param);
			log.info(tag+"交易时间transtime："+transtime);
			String publiccode = transCode +"|"+ areaNo + "|";
			log.info(tag+"交易码+地区号publiccode："+publiccode);
			STCardService st = new STCardService(param, publiccode, transtime, tag);
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 
			try{
				//发起3次自动冲正交易，成功则推出循环
				for(int i=0; i<3; i++){  
					if(st.doTrade()){
						retCode = "0";
						retMsg = st.getRespInfo();	
						json.put("retCode", retCode);
						json.put("retMsg", retMsg);
						break;
					}else{
						retCode = "-1";
						retMsg = st.getRespInfo();
						json.put("retCode", retCode);
						json.put("retMsg", retMsg);
					}
				}			
			}catch(JSONException e){
				e.printStackTrace();
			}				        
		    pw.print(json.toString());    
		    log.info(tag+"返回json object:"+json.toString()); 
		    pw.close(); 
		}
		
		
	}
}
