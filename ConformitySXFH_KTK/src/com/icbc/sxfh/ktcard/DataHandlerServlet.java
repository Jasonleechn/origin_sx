package com.icbc.sxfh.ktcard;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.icbc.sxfh.common.CommonMethods;
import com.icbc.sxfh.util.Log_etc_singleton;


/**
 * Servlet implementation class DataHandler
 */
public class DataHandlerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static Log_etc_singleton logger = Log_etc_singleton.getInstance();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DataHandlerServlet() {
        super();
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
		// TODO Auto-generated method stub
		String retCode = "";
		String retMsg = "";
		PrintWriter pw = null;
		String type = request.getParameter("type"); 
		String tag = request.getParameter("tag");
		tag = URLDecoder.decode(tag,"UTF-8");
		//tag = URLDecoder.decode(tag);
		tag = "���ݴ���DataHandlerServlet---------------"+tag+"-"+type+"--";
		
		if(type.equals("getSTKName")){
			response.setContentType("text/html;charset=utf-8"); 
			String param = request.getParameter("param");  
			//param = URLDecoder.decode(param,"UTF-8");
			//System.out.println("����������--------------------"+param); 
			logger.log(tag+"���������ݣ�" + param);
			byte[] byOrg = CommonMethods.hexStringToBytes(param);
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 
			if(byOrg == null || byOrg.length != 57){
				retCode = "-1";
		        retMsg = "����תΪbyte����󳤶Ȳ�Ϊ57λ��";
		        try {
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				} catch (JSONException e) {
					logger.log(this.getClass().getName()+"-getSTKNameʱ�쳣��",e);
				}	        
		    	pw.print(json.toString());    
		    	//System.out.println("��ȡ��ͨ����������json object :"+json.toString());  
		    	logger.log(tag+"����:"+json.toString());
		    	pw.close(); 
		    } else {
		    	retCode = "0";
		    	byte tmp[] = new byte[20];
		        System.arraycopy(byOrg, 2, tmp, 0, 20);
		        retMsg = "����ɹ���";
		        String retInfo = (new String(tmp)).trim(); 
		        try {
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
					json.put("retInfo", retInfo);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
		    	pw.print(json.toString());    
		    	//System.out.println("��ȡ��ͨ����������json object :"+json.toString());  
		    	logger.log(tag+"����:"+json.toString());
		    	pw.close(); 
		    }	
		}
		
		if(type.equals("getXYKInfo")){
			response.setContentType("text/html;charset=utf-8"); 
			String param = request.getParameter("param");  
			logger.log(tag+"���������ݣ�"+param);
			byte byOrg[] = CommonMethods.hexStringToBytes(param);
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 
			if(byOrg == null){
				retCode = "-1";
		        retMsg = "����תΪbyte�������";
		        try {
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	        
		    	pw.print(json.toString());    
		    	logger.log(tag+"����:"+json.toString());
		    	pw.close(); 
		    } else {
		    	retCode = "0";
		    	byte tmp[] = new byte[20];
		        System.arraycopy(byOrg, 2, tmp, 0, 20);		
		        String name = (new String(tmp)).trim(); 
		        byte tmp1[] = new byte[18];
		        System.arraycopy(byOrg, 22, tmp1, 0, 18);	        
		        String id = (new String(tmp1)).trim(); 
		        byte tmp2[] = new byte[20];
		        System.arraycopy(byOrg, 132, tmp2, 0, 20);	        
		        String num = (new String(tmp2)).trim();
		        retMsg = "����ɹ���";
		        try {
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
					json.put("name", name);
					json.put("id", id);
					json.put("num", num);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
		    	pw.print(json.toString());    
		    	logger.log(tag+"����:"+json.toString());
		    	pw.close(); 
		    }	
		}
		
		if(type.equals("sendErrMsg")){
			response.setContentType("text/html;charset=utf-8"); 
			String param = request.getParameter("param");  
			param = URLDecoder.decode(param,"UTF-8");
			//System.out.println("����������--------------------"+param); 
			logger.log(tag+"�쳣������־:"+param);
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 

			retCode = "0";

		    try {
		    	json.put("retCode", retCode);
				//json.put("retMsg", retMsg);
			} catch (JSONException e) {
					// TODO Auto-generated catch block
				e.printStackTrace();
			}	        
		    pw.print(json.toString());    
		    //System.out.println("��ȡ��ͨ����������json object :"+json.toString());  
		    //log.info("�ϴ��쳣��־��Ϣ����json object :"+json.toString());
		    pw.close(); 	   
		}
		
		if(type.equals("getSingleLimit")){
			response.setContentType("text/html;charset=utf-8"); 
			
			JSONObject json = new JSONObject(); 
			pw = response.getWriter(); 
			String retInfo = KTCardService.getLimit();
			if(retInfo == null || retInfo == ""){
				retCode = "-1";
				retMsg = "��ȡ���ʳ�ֵ�޶�ʧ�ܣ�";
				try {
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}else{
		    	retCode = "0";
		    	retMsg = "��ȡ���ʳ�ֵ�޶�ɹ���";
		    	try {
					json.put("retCode", retCode);
					json.put("retMsg", retMsg);
					json.put("retInfo", retInfo);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}		   
		    pw.print(json.toString());    
		    //System.out.println("��ȡ��ͨ����������json object :"+json.toString());  
		    logger.log(tag+"����:"+json.toString());
		    pw.close(); 
		}
		
	
	}
}
