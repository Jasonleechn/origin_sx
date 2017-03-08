package com.icbc.sxfh.util;

import java.io.UnsupportedEncodingException;

/**
 * 中文参数转码控制类
 *
 */
public class VPageParameter {
	
	/**是否参数汉字转换*/
	private static Boolean isParameterToCH = null;
	private static String fromCharSet = "";
	private static String toCharSet ="";
 
	
	/**
	 * 设置系统汉字参数转码方式
	 * @param b 是否转码，false时后二个参数无效
	 * @param from 来源编码
	 * @param to 结果编码
	 */
	public static void setParameterToCH(boolean b, String from, String to) {
		if (isParameterToCH!=null){
			return; //赋过值了
		}
		isParameterToCH = new Boolean(b);
		fromCharSet = from==null?"":from.trim();
		toCharSet = to==null?"":to.trim();
	}
	
	/**
	 * 参数字符串编码转换
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
