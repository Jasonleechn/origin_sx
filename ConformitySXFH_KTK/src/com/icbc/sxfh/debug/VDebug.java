package com.icbc.sxfh.debug;



/**
 * 内部测试
 */
public class VDebug{
	
	/**是否发送bice标志，true发送，false时用本地测试数据 */
	public static boolean isToBiceFlag = true;  
	
	//内部测试写死的bice返回报文 
	public static String TestMessage(String pSendMsg){ 
		if (pSendMsg.startsWith("83581")){
			return "0000|交易成功|etcUserNo11|01|测试人|01|140105198203190858|联系人姓名|固定电话|移动电话|快通卡失效时间|bangdingtype|晋A98789|车牌颜色|车型|车辆座位数量|10000|20000|-100|200|";
		}else if (pSendMsg.startsWith("83582")){
			return "0000|交易信息|ptserno11|快通卡用户名|maps_serno|MAC2_3232323|";
		}else if (pSendMsg.startsWith("83583")){
			return "0000|交易信息|";
		} 
		
		return "9999|没有准备内部测试报文";
	}
}
