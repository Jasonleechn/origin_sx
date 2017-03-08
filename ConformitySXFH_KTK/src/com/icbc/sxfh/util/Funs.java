package com.icbc.sxfh.util;

import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern; 



public class Funs {  
	
	//交易渠道名称
	public  static final String Channel_name="3";//1为工行网银 	2为工行手机银行	3为工行自助终端
	//查询方式定义
	public static final String QUERY_TYPE="3"; // 1表示网页操作，2表示手机操作，3表示自助终端) 
	public static final String getChannelName(String jkfs){
		if (jkfs.equals("1")){
			return "网银";
		}else if (jkfs.equals("2")){
			return "手机银行";
		}else if (jkfs.equals("3")){
			return "自助终端";
		}
		return jkfs;
	}
	
	/**是否为浮点数*/
	public static boolean isFloat(String s){
		  if (s==null){
			  return false;
		  }
		  if (s.indexOf('.')>=0){
		  String regex = "^\\-?([1-9]\\d*|0)\\.\\d+$";
		  Pattern pattern = Pattern.compile(regex);
		  Matcher matcher = pattern.matcher(s);
		  return matcher.matches(); 	  
	}else{
		  //整数
		  String regex = "^\\-?([1-9]\\d*|0)$"; 
			  Pattern pattern = Pattern.compile(regex);
			  Matcher matcher = pattern.matcher(s);
			  return matcher.matches(); 		  
		  } 
	} 
	
	public static String toChinese(String s) throws UnsupportedEncodingException{
		return VPageParameter.toChinese(s);
	}
 
	/**格式化金额*/
	public static String formatNumber(double i_amount, String format){
		DecimalFormat nf = new DecimalFormat();
		nf.setDecimalSeparatorAlwaysShown(true);
		nf.applyLocalizedPattern(format);
		return nf.format(i_amount);		
	}
	
	/**按指定格式获取当前时间yyyyMMdd HHmmss*/
	public static String getCurDate(String format){
		return VFuns.getCurDate(format);
	}
}
