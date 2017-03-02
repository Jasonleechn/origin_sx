package com.icbc.sxfh.ktcard;

import java.io.FileInputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

import com.icbc.sxfh.common.CommonTrade;


public class STCardService {
	private String receiveData = ""; // 接收交易数据
	private String sendData = ""; // 上送交易数据
	private String strAreaCode = ""; // 地区号
	private String strPublicCode = ""; // 交易代码+地区号
	private String strRespCode = ""; // 响应码
	private String strRespInfo = ""; // 响应信息
	private boolean strTransOk = false; //交易成功标志
	private String transtime;   //交易时间
	private String tag=""; //日志标志

	private static Properties properties = null;
	private static FileInputStream FStream = null;
	private static String serverAddr = null; // 服务器地址
	private static String serverPort = null; // 服务器端口
	private static String singleLimit = null;
	private final static Logger log = Logger.getLogger(STCardService.class);
		
	static {
		try {
			properties = new Properties();
			FStream = new FileInputStream("d:/fbec/web/ipconfig.cfg");
			properties.load(FStream);
			serverAddr = properties.getProperty("stk_ip");// 
			serverPort = properties.getProperty("stk_port");// 4444
			singleLimit = properties.getProperty("stk_singleLimit");//单笔限额

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public STCardService() {
		System.out.println("==========STCardService no params Construct========");
	}

	public STCardService(String inputarea, String publiccode, String transtime, String tag) {
		System.out.println("==========STCardService Construct========");
		sendData = inputarea;
		strPublicCode = publiccode;
		this.transtime = transtime;
		this.tag = tag;
	}
	
	public static String getLimit(){
		String res = "2000";
		try {
			Properties properties1 = new Properties();
			FileInputStream FStream1= new FileInputStream("d:/fbec/web/ipconfig.cfg");
			properties1.load(FStream1);
			res = properties1.getProperty("stk_singleLimit");//单笔限额
		} catch (Exception e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return res;
	}

	// 交易处理
	public boolean doTrade() {
		//serverAddr = CommonTrade.getServerAddr();
		//serverPort = CommonTrade.getServerPort();

		log.info(tag+"---------------交易开始------------------------------");
		log.info(tag+"server address : " + serverAddr);
		log.info(tag+"server port    : " + serverPort);
		try {
			byte byteSend[] = null;
			String strRecive;
			String strSend = makePkg(); // 创建发送报文
			byteSend = strSend.getBytes(); 
			log.info(tag+"发送报文:" + strSend);
			String strCode = CommonTrade.getField(strPublicCode, 0); // 取交易码
			CommonTrade commonTrade = new CommonTrade(strCode, byteSend);
			
			strRecive = commonTrade.TcpCommProxy(serverAddr,serverPort); // 通过Socket发送，并接收返回报文
			
			//strRecive="00206984353|05|04301|05588|00010|99999999|999999999999999|99999999999999999999|20110328|090000|99999999999999999999|00000|苏通卡明细查询成功!|6222390016150033|32011112220100000003|宋明州             |22|202103|24|9||2011-03-21|6222390016150033|32011112220100000003|84349|0|1000                |0          |06           |00010||2011-03-24|6222390016150033|32011112220100000003|84349|0|1                   |501001              |0                  |02046||2011-03-23|6222390016150033|32011112220100000003|84349|0|1000   |0                   |02                         |00010||2011-03-27|6222390016150033|32011112220100000003|84349|0|1000          |1000                |0                                |02046||2011-03-27|6222390016150033|32011112220100000003|84349|0|500000              |501000              |0                                       |02046||2011-03-21|6222390016150033|32011112220100000003|84349|0|10000               |11000               |0                                              |05659||2011-03-27|6222390016150033|32011112220100000003|84349|0|9999999             |9999999             |0                                                     |05659||2011-03-29|6222390016150033|32011112220100000003|84349|0|100                 |557639              |0                                                            |01304||2011-03-29|6222390016150033|32011112220100000003|84349|0|1                   |557640              |0                                                                   |01304||2011-03-29|6222390016150033|32011112220100000003|84349|0|1                   |557640              |0                                                                   |01304|";
			//strRecive="00010284353|05|04301|00000|00000||               ||20110329|154012||00000||1111111111111111111|22222222222222222222|测试|22|201103|48|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|";
			log.info(tag+"接收报文: " + strRecive);
			RetPack(strRecive); // 解析接收到的报文
			log.info(tag+"---------------交易结束------------------------------");
			if(strTransOk){
				return true;
			}else{
				return false;
			}
		} catch (Exception exception) {
			exception.printStackTrace();
			log.info(tag+"交易异常: " + exception);
			return false;
		}		
	}
	// 生成公共报文头
	public String strPacketHead(String strCode) {
		/*中间业务平台报文包头(字段之间以“|”作为分隔)
		  包长度		6位	由程序填充（不足左补0，与交易码之间没有分隔符，此字段用于通讯，中间业务平台拆包时已不存在此字段，因此BICE上不需要拆此字段）
		  交易码		5位
		  数据来源	2位	01－电话银行 02－自助终端 03－第三方发起 04-实时代扣 05－网上银行  06—POS 07-WEB接入
		  地区号		5位（不足左补0）
		  网点号		5位（不足左补0）
		  柜员号		5位（不足左补0）
		  交易序号	8位
		  终端号		15位	(不足补空)
		  外围流水	20位
		  工作日期	8位（YYYYMMDD）
		  工作时间	6位（HHMMSS）
		  备用1		20位	
		*/

		//SimpleDateFormat simpledateformat = new SimpleDateFormat(
		//		"yyyyMMddHHmmss");
		//Date date = new Date();
		//String s2 = simpledateformat.format(date);
		String s2 = this.transtime;

		strAreaCode = CommonTrade.getField(strPublicCode, 1);// 地区号
		strAreaCode = CommonTrade.addSpace0(strAreaCode, 5);
		String strBranch = "00298";
		//String strTeller = "";
		if(strAreaCode.equals("04301"))
			strBranch = "00298";
		if(strAreaCode.equals("01102"))
			strBranch = "00209";
		if(strAreaCode.equals("01103"))
			strBranch = "00245";
		if(strAreaCode.equals("01104"))
			strBranch = "00110";
		if(strAreaCode.equals("01105"))
			strBranch = "00217";
		if(strAreaCode.equals("01106"))
			strBranch = "00200";
		if(strAreaCode.equals("01107"))
			strBranch = "00550";
		if(strAreaCode.equals("01108"))
			strBranch = "00800";
		if(strAreaCode.equals("01109"))
			strBranch = "06690";
		if(strAreaCode.equals("01110"))
			strBranch = "00500";
		if(strAreaCode.equals("01111"))
			strBranch = "08200";
		if(strAreaCode.equals("01115"))
			strBranch = "00211";
		if(strAreaCode.equals("01116"))
			strBranch = "00100";
			
		String strTradeCode = CommonTrade.getField(strPublicCode, 0);// 交易码
		
		String strPack = "";
		strPack = strPack + strTradeCode + "|";//交易码
		strPack = strPack + "05" + "|"; // 数据来源
		strPack = strPack + strAreaCode + "|"; // 地区号
		//根据地区号选择网点和柜员号
		strPack = strPack + strBranch + "|"; // 网点号
		//strPack = strPack + "0298" + "|"; // 网点号
		strPack = strPack + "00112" + "|";// 柜员号
		//strPack = strPack + "00112" + "|";// 柜员号
		strPack = strPack + "" + "|"; // 交易序号
		strPack = strPack + "               " + "|"; // 终端号
		strPack = strPack + "" + "|"; // 外围流水
		strPack = strPack + s2.substring(0, 8) + "|"; // 工作日期
		strPack = strPack + s2.substring(8, 14) + "|"; // 工作时间
		strPack = strPack + "" + "|"; // 备用1
		log.info(tag+"公共报文头: " + strPack);
		//System.out.println("公共报文头: " + strPack);
		return strPack;
	}

	// 上送交易报文组包
	public String makePkg() {

		String strTranCode = "";
		String strLen = "";
		String strTmp = "";
		strTranCode = CommonTrade.getField(strPublicCode, 0);// 交易代码

		String str45 =sendData;
		
		 // 苏通卡充值
		if (strTranCode.equals("84358")) {                         
			strTmp = CommonTrade.getField(str45, 0) + "|";          // 借方账号
			strTmp = strTmp + CommonTrade.getField(str45, 1) + "|"; // 苏通卡卡号
			strTmp = strTmp + CommonTrade.getField(str45, 2) + "|"; // 充值金额
			strTmp = strTmp + CommonTrade.getField(str45, 3) + "|"; // 充值金额HEX
			strTmp = strTmp + CommonTrade.getField(str45, 4) + "|"; // 卡面余额
			strTmp = strTmp + CommonTrade.getField(str45, 5) + "|"; // 卡内交易序号
			strTmp = strTmp + CommonTrade.getField(str45, 6) + "|"; // 终端编码
			strTmp = strTmp + CommonTrade.getField(str45, 7) + "|"; // 随机数
			strTmp = strTmp + CommonTrade.getField(str45, 8) + "|"; // 客户姓名
			strTmp = strTmp + CommonTrade.getField(str45, 9) + "|"; // MAC
		}
		
		// 写卡成功后更新平台状态
		if(strTranCode.equals("82148")){
			strTmp = CommonTrade.getField(str45, 0) + "|";          // 苏通卡卡号
			strTmp = strTmp + CommonTrade.getField(str45, 1) + "|"; // 流水号
			strTmp = strTmp + CommonTrade.getField(str45, 2) + "|"; // MAC
		}

		// 充值失败后，银行主机冲正并告诉第三方失败
		if(strTranCode.equals("84420")){
			strTmp = CommonTrade.getField(str45, 0) + "|";          // 借方账号
			strTmp = strTmp + CommonTrade.getField(str45, 1) + "|"; // 苏通卡卡号
			strTmp = strTmp + CommonTrade.getField(str45, 2) + "|"; // 充值金额
			strTmp = strTmp + CommonTrade.getField(str45, 3) + "|"; // 原交易流水号
		}
			
		
		byte[] temp1 = strTmp.getBytes();
		int packagbodyLen = temp1.length;//报体长度
		String packageHead = strPacketHead(strTranCode);//生成公共报头
		
		byte[] temp2 = packageHead.getBytes();
		int packageHeadLen = temp2.length;//报头长度
		
		int packageLen = packageHeadLen + packagbodyLen;//报长度(不包括长度字段)
		strLen = Integer.toString(packageLen);
		strTmp = CommonTrade.addSpace0(strLen, 6) + packageHead + strTmp;
		//strTmp = packageHead + strTmp;

		log.info(tag+"上送交易报文: " + strTmp);
		return strTmp;
	}

	
	// 应答报文解包
	public void RetPack(String strPack) {
		String strTranCode = ""; //交易码
		
		if (strPack == null || strPack == "" || strPack.length() == 0) {
			strRespInfo = "通讯超时，请稍后再试！";
			return;
		}
		
		String LenAndCode = CommonTrade.getField(strPack, 0);//报文长度+交易代码
		log.info(tag+"报文长度+交易代码: " + LenAndCode);
		strTranCode = LenAndCode.substring(6, LenAndCode.length());//交易码
		//log.info("返回数据中的交易码："+strTranCode);
		strPack = CommonTrade.getFieldLast(strPack, 11);//去除报文头后的数据
		//System.out.println("去除报文头后的数据："+strPack);
		log.info(tag+"去除报文头后的数据："+strPack);
			
		strRespCode = CommonTrade.getField(strPack, 0);//返回码
		log.info(tag+"响应码strRespCode: " + strRespCode);
		
		if (strRespCode.equals("00000") || strRespCode.equals("0000") || Integer.parseInt(strRespCode) == 0) {
			strTransOk = true;
		} else{
			strTransOk = false;
		}
		log.info(tag+"交易成功标志: " + strTransOk);
		if (strTransOk) {
			if (strTranCode.equals("84358")) {
				strRespInfo = CommonTrade.getField(strPack, 1);
				receiveData = CommonTrade.getFieldLast(strPack, 2);
				log.info(tag+"响应信息strRespInfo:" + strRespInfo);
				log.info(tag+"返回交易数据receiveData:" + receiveData);
			}
			if (strTranCode.equals("82148")) {
				strRespInfo = CommonTrade.getField(strPack, 1);				
				log.info(tag+"响应信息strRespInfo:" + strRespInfo);
			}
			if (strTranCode.equals("84420")) {
				strRespInfo = CommonTrade.getField(strPack, 1);				
				log.info(tag+"响应信息strRespInfo:" + strRespInfo);
			}
		}else {
			strRespInfo = CommonTrade.getField(strPack, 1);
			log.info(tag+"响应信息strRespInfo:" + strRespInfo);
		}		
	}
	

	// 返回响应码
	public String getRespCode() {
		return strRespCode;
	}

	// 返回响应信息
	public String getRespInfo() {
		return strRespInfo.trim();
	}

	// 返回响应数据
	public String getReceiveData() {
		return receiveData;
	}
	
	public static String getSingleLimit(){
		return singleLimit;
	}

	public String getSendData() {
		return sendData;
	}

	public void setSendData(String sendData) {
		this.sendData = sendData;
	}

	public String getStrPublicCode() {
		return strPublicCode;
	}

	public void setStrPublicCode(String strPublicCode) {
		this.strPublicCode = strPublicCode;
	}
}
