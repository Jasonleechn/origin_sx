package com.icbc.sxfh.debug;



/**
 * �ڲ�����
 */
public class VDebug{
	
	/**�Ƿ���bice��־��true���ͣ�falseʱ�ñ��ز������� */
	public static boolean isToBiceFlag = true;  
	
	//�ڲ�����д����bice���ر��� 
	public static String TestMessage(String pSendMsg){ 
		if (pSendMsg.startsWith("83581")){
			return "0000|���׳ɹ�|etcUserNo11|01|������|01|140105198203190858|��ϵ������|�̶��绰|�ƶ��绰|��ͨ��ʧЧʱ��|bangdingtype|��A98789|������ɫ|����|������λ����|10000|20000|-100|200|";
		}else if (pSendMsg.startsWith("83582")){
			return "0000|������Ϣ|ptserno11|��ͨ���û���|maps_serno|MAC2_3232323|";
		}else if (pSendMsg.startsWith("83583")){
			return "0000|������Ϣ|";
		} 
		
		return "9999|û��׼���ڲ����Ա���";
	}
}
