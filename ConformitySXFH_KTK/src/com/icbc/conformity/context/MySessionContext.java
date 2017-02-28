package com.icbc.conformity.context;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.icbc.sxfh.util.Logger_ETC;

/**
 * <p> Session 管理类
 * <p> TODO 需要完善具体实现的功能
 * @author Jason.Lee on 2017年2月28日
 */
public class MySessionContext {
	
	//Test为本地模式，Normal为连总行环境模式
	public static enum ModeType{Test,Normal};
	
	//当前模式
	public static ModeType Mode = ModeType.Test;
	
	//初始化日志工具
	public static Logger_ETC logger = new Logger_ETC();
	
	//客户端版本模式，测试用 6：iPhone、7：Andriod、8：WindowsPhone
	public static String bankType = "7";
	
	private static HashMap<String,HttpSession> sessionMap = new HashMap<String,HttpSession>();
	
	private static HashMap<String,String> peopleMap = new HashMap<String,String>();
	
	public static int getPeopleCount(){
		return peopleMap.size();
	}
	
	public static int getTotalCount(){
		return sessionMap.size();
	}
	
	public static ArrayList<String> getPeoples(){
		ArrayList<String> list = new ArrayList<String>();
		Iterator<Map.Entry<String, String>> iter = peopleMap.entrySet().iterator();
		while(iter.hasNext()){
			Map.Entry<String, String> entry = (Map.Entry<String, String>)iter.next();
			list.add(entry.getValue());
		}
		return list;
	}
	
	private static boolean checkCust(String cis){
		Iterator<Map.Entry<String, String>> iter1 = peopleMap.entrySet().iterator();
		while(iter1.hasNext()){
			Map.Entry<String, String> entry = (Map.Entry<String, String>)iter1.next();
			String value = entry.getValue();
			if(value.indexOf(cis) != -1){
				return true;
			}
		}
		return false;
	}
	
	public static synchronized void addSession(HttpSession session){
		if(session != null){
			sessionMap.put(session.getId(), session);
		}
		logger.log("当前管理session数：" + sessionMap.size());
	}
	
	public static synchronized void delSession(HttpSession session){
		if(session != null){
			sessionMap.remove(session.getId());
		}
	}
	
	public static synchronized void addPeopleSession(String id, String name, String cis){
		if(checkCust(cis)){
			logger.log("用户已存在-" + id + "-" + name);
		}else{
			if(id != null){
				logger.log("新用户访问-" + id + "-" + name);
				peopleMap.put(id, name);
			}
		}
	}
	
	public static synchronized void delPeopleSession(String id){
		if(id != null){
			System.out.println("会话注销-" + id);
			peopleMap.remove(id);
		}
	}
	
	public static synchronized HttpSession getSession(String sessionId){
		if(sessionId != null){
			return sessionMap.get(sessionId);
		}
		return null;
	}
	
	/**
	 * 更新session属性数据
	 * */
	public static synchronized void updateSession(String sessionId, String key, Object value){
		if(sessionId != null){
			if(sessionMap.containsKey(sessionId)){
				HttpSession hs = sessionMap.get(sessionId);
				hs.removeAttribute(key);
				hs.setAttribute(key, value);
				
				sessionMap.remove(sessionId);
				sessionMap.put(sessionId, hs);
			}
		}
	}

}
