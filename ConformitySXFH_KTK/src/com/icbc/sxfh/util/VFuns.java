package com.icbc.sxfh.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar; 

public class VFuns {

	/**
	 * 读一个文本文件的所有行内容
	 * @param filename 文件路径 
	 */
	public static String[] readLinesFormFile(String filename) throws Exception{  
		ArrayList ret = new ArrayList();
		if (filename==null){
			throw new Exception("file name is Null");
		}
		File file = new File(filename);
		if (file.exists()==false||file.isFile()==false){
			throw new Exception(filename+" file not exist");
		}
		BufferedReader br = null; 
		try{
			br = new BufferedReader(new FileReader(file));
			String aline;
			while ((aline = br.readLine()) != null){
				ret.add(aline); 
			}
		}finally{
			try{
				if (br != null) br.close();
			}catch (IOException e){}
		}
		return (String[])ret.toArray(new String[0]);
	}
	
	//是否全零字符串，会自动截断左右的空格
	public static boolean isAllChar0(String s){
		if (s==null||s.trim().length()==0){
			return false;
		}
		String code = s.trim();
		for (int i=0; i< code.length(); i++){
			if (code.charAt(i)!='0'){
				return false;
			}
		}
		return true;
	}
	
	public static String[] split(String source, String splitStr){
		if (source==null||source.length()==0){
			return new String[0];
		} 
		ArrayList list = new ArrayList(); 
		String ls_str;
		int begin=0;
		int pos = source.indexOf(splitStr);
		while (pos>=0){
			ls_str = source.substring(begin, pos);
			list.add(ls_str);
			begin = pos + splitStr.length();
			pos = source.indexOf(splitStr, begin);
		}
		list.add(source.substring(begin));
		return (String[])list.toArray(new String[0]);
	}
	
	/**按指定格式获取当前时间yyyyMMdd HHmmss*/
	public static String getCurDate(String format){
		Calendar ca = Calendar.getInstance();
		SimpleDateFormat df = new SimpleDateFormat(format);
		return df.format(ca.getTime());
	}
	
	
	public static void main(String[] args){
		System.out.println(getCurDate("HHmm"));
	}
}
