package com.icbc.sxfh.util;

import java.io.UnsupportedEncodingException;

/**
 * ���Ĳ���ת�������
 *
 */
public class VPageParameter {
	
	/**�Ƿ��������ת��*/
	private static Boolean isParameterToCH = null;
	private static String fromCharSet = "";
	private static String toCharSet ="";
 
	
	/**
	 * ����ϵͳ���ֲ���ת�뷽ʽ
	 * @param b �Ƿ�ת�룬falseʱ�����������Ч
	 * @param from ��Դ����
	 * @param to �������
	 */
	public static void setParameterToCH(boolean b, String from, String to) {
		if (isParameterToCH!=null){
			return; //����ֵ��
		}
		isParameterToCH = new Boolean(b);
		fromCharSet = from==null?"":from.trim();
		toCharSet = to==null?"":to.trim();
	}
	
	/**
	 * �����ַ�������ת��
	 * @param s
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String toChinese(String s) throws UnsupportedEncodingException{
		if (s==null){
			return "";
		}
		if (isParameterToCH==null){
			return s;
		}
		if (isParameterToCH.booleanValue()==true 
				&& fromCharSet.length()>0 
				&& toCharSet.length()>0){
			//new String(s.getBytes("ISO-8859-1"), "GBK");
			return new String(s.getBytes(fromCharSet), toCharSet);
		}else{
			return s;
		}
	}
}
