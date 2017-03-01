package com.icbc.sxfh.util;

import ToolsApi.global.VWorkSpace;
import ToolsApi.zxy.com.util.log.VLoger;

/**
 * <p>ETC��־��¼����
 * <p>����ģʽ��ÿ����ָ����Ŀ�����Զ�����һ����־�ļ�
 * @author Jason.Lee on 2017��2��28��
 */
public class Log_etc_singleton extends Logger_init{
	
	//�ڲ���  
    private static class MySingletonHandler{  
        private static Log_etc_singleton instance = new Log_etc_singleton();  
    }   
      
    private Log_etc_singleton() {
    	super(VLoger.Type.DayPath, "SXFH_ETC.log");
    	
    	//�趨��־����·��
    	VWorkSpace.setFullWorkdDir("D\\:/log/");
    }
       
    public static Log_etc_singleton getInstance() {   
        return MySingletonHandler.instance;  
    } 

    

}

/**
 * <p>��־�������÷�ʽת��
 * <p>ToolsApi.jar �е���־�������ʼ��ʱ���������,����������һ���࣬
 *    ֱ���ڴ˴�ת�����޲ι��������г�ʼ��
 */
class Logger_init extends VLoger{

	public Logger_init(Type type, String fileName) {
		super(type, fileName);
	}
	
}