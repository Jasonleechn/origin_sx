package com.icbc.sxfh.util;

import ToolsApi.global.VWorkSpace;
import ToolsApi.zxy.com.util.log.VLoger;

/**
 * <p>ETC��־��¼����
 * <p>ÿ����ָ����Ŀ�����Զ�����һ����־�ļ�
 * @author Jason.Lee on 2017��2��28��
 */
public class Logger_ETC extends Logger_init{

	public Logger_ETC() {
		super(VLoger.Type.DayPath, "SXFH_ETC.log");
		
		//�趨��־����·��
		VWorkSpace.setFullWorkdDir("D\\:/log/");
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