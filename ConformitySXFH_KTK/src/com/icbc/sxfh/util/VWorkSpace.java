package com.icbc.sxfh.util;
 

/**
 * ȫ�ֺ����������ռ���Ϣ
 */
public class VWorkSpace{ 
	
	/**BiceͨѶ�����ļ�*/	
	public static final String BICE_config_file= "xkxx/BICE_config.txt";
	
	//����Ŀ¼��Ϣ
	private static String WORKDIR=null;  
	public static String getWORKDIR(){ return WORKDIR;} 
	//��ʼ��Ŀ¼��Ϣ
	public static void initWorkDir(String p_path){
		if (WORKDIR!=null){
			return; //����ֵ��
		}
		if (p_path==null||p_path.trim().length()==0){
			return;
		}		
		/**ת��Ŀ¼Ϊ'/'��'\'�ָ����ַ���,����'ϵͳ�ָ���'����*/
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
