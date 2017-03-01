package com.icbc.sxfh.util;

import ToolsApi.global.VWorkSpace;
import ToolsApi.zxy.com.util.log.VLoger;

/**
 * <p>ETC日志记录工具
 * <p>单例模式，每天在指定的目下下自动生成一个日志文件
 * @author Jason.Lee on 2017年2月28日
 */
public class Log_etc_singleton extends Logger_init{
	
	//内部类  
    private static class MySingletonHandler{  
        private static Log_etc_singleton instance = new Log_etc_singleton();  
    }   
      
    private Log_etc_singleton() {
    	super(VLoger.Type.DayPath, "SXFH_ETC.log");
    	
    	//设定日志保存路径
    	VWorkSpace.setFullWorkdDir("D\\:/log/");
    }
       
    public static Log_etc_singleton getInstance() {   
        return MySingletonHandler.instance;  
    } 

    

}

/**
 * <p>日志参数设置方式转换
 * <p>ToolsApi.jar 中的日志工具类初始化时必须带参数,避免再增加一个类，
 *    直接在此处转换成无参构造器进行初始化
 */
class Logger_init extends VLoger{

	public Logger_init(Type type, String fileName) {
		super(type, fileName);
	}
	
}