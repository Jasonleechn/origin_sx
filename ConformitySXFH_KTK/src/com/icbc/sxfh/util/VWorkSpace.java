package com.icbc.sxfh.util;
 

/**
 * 全局函数及工作空间信息
 */
public class VWorkSpace{ 
	
	/**Bice通讯配置文件*/	
	public static final String BICE_config_file= "xkxx/BICE_config.txt";
	
	//工作目录信息
	private static String WORKDIR=null;  
	public static String getWORKDIR(){ return WORKDIR;} 
	//初始化目录信息
	public static void initWorkDir(String p_path){
		if (WORKDIR!=null){
			return; //赋过值了
		}
		if (p_path==null||p_path.trim().length()==0){
			return;
		}		
		/**转换目录为'/'或'\'分隔的字符串,并以'系统分隔符'结束*/
		char FileSeparator=System.getProperty("file.separator").charAt(0);
		String path;
		if (FileSeparator=='/'){
			path = p_path.replace('\\', '/'); 
		}else{
			path = p_path.replace('/', '\\'); 
		}    
		if (path.charAt(path.length()-1)!= FileSeparator){
			path= path +FileSeparator;
		}  
		WORKDIR = path;				 
	}  
	
}
