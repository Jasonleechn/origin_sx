package com.icbc.conformity.context;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.icbc.sxfh.util.Logger_ETC;

/**
 * <p> Session ������
 * <p> TODO ��Ҫ���ƾ���ʵ�ֵĹ���
 * @author Jason.Lee on 2017��2��28��
 */
public class MySessionContext {
	
	//TestΪ����ģʽ��NormalΪ�����л���ģʽ
	public static enum ModeType{Test,Normal};
	
	//��ǰģʽ
	public static ModeType Mode = ModeType.Test;
	
	//��ʼ����־����
	public static Logger_ETC logger = new Logger_ETC();
	
	//�ͻ��˰汾ģʽ�������� 6��iPhone��7��Andriod��8��WindowsPhone
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
		logger.log("��ǰ����session����" + sessionMap.size());
	}
	
	public static synchronized void delSession(HttpSession session){
		if(session != null){
			sessionMap.remove(session.getId());
		}
	}
	
	public static synchronized void addPeopleSession(String id, String name, String cis){
		if(checkCust(cis)){
			logger.log("�û��Ѵ���-" + id + "-" + name);
		}else{
			if(id != null){
				logger.log("���û�����-" + id + "-" + name);
				peopleMap.put(id, name);
			}
		}
	}
	
	public static synchronized void delPeopleSession(String id){
		if(id != null){
			System.out.println("�Ựע��-" + id);
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
	 * ����session��������
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
