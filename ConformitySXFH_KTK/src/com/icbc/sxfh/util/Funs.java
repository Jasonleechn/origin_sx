package com.icbc.sxfh.util;

import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern; 



public class Funs {  
	
	//������������
	public  static final String Channel_name="3";//1Ϊ�������� 	2Ϊ�����ֻ�����	3Ϊ���������ն�
	//��ѯ��ʽ����
	public static final String QUERY_TYPE="3"; // 1��ʾ��ҳ������2��ʾ�ֻ�������3��ʾ�����ն�) 
	public static final String getChannelName(String jkfs){
		if (jkfs.equals("1")){
			return "����";
		}else if (jkfs.equals("2")){
			return "�ֻ�����";
		}else if (jkfs.equals("3")){
			return "�����ն�";
		}
		return jkfs;
	}
	
	/**�Ƿ�Ϊ������*/
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
		  //����
		  String regex = "^\\-?([1-9]\\d*|0)$"; 
			  Pattern pattern = Pattern.compile(regex);
			  Matcher matcher = pattern.matcher(s);
			  return matcher.matches(); 		  
		  } 
	} 
	
	public static String toChinese(String s) throws UnsupportedEncodingException{
		return VPageParameter.toChinese(s);
	}
 
	/**��ʽ�����*/
	public static String formatNumber(double i_amount, String format){
		DecimalFormat nf = new DecimalFormat();
		nf.setDecimalSeparatorAlwaysShown(true);
		nf.applyLocalizedPattern(format);
		return nf.format(i_amount);		
	}
	
	/**��ָ����ʽ��ȡ��ǰʱ��yyyyMMdd HHmmss*/
	public static String getCurDate(String format){
		return VFuns.getCurDate(format);
	}
}
