package com.icbc.sxfh.common;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Properties;

import javax.servlet.http.HttpSession;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import ToolsApi.zxy.com.util.date.VDate;

import com.icbc.conformity.context.MySessionContext;
import com.icbc.sxfh.util.Log_etc_singleton;

/**
 * <p>TODO 添加描述
 * <p>详细描述。
 * <p>产品模块名称和版本
 * @author Jason.Lee on 2017年3月1日
 */
public class ICBCEPayService {
	//接收交易数据
	private String receiveData = "";
	
	//上送交易数据
	private String sendData = "";
	
	//地区号
	private String strAreaCode = "";
	
	//交易代码 + 地区号
	private String strPublicCode = "";
	
	//响应码
	private String strRespCode = "";
	
	//响应信息
	private String strRespInfo = "";
	
	//交易成功标志
	private boolean strTransOk = false;
	
	//交易时间
	private String transtime = "";
	
	//日志标志
	private String tag = "";
	
	//sessionId
	private String csessionid = "";
	
	private static Properties properties = null;
	
	private static FileInputStream FStream = null;
	
	//服务器地址
	private static String serverAddr = null;
	
	//服务器端口
	private static String serverPort = null;
	
	//获取日志工具
	private final static Log_etc_singleton logger = Log_etc_singleton.getInstance();
	
	static{
		try{
			properties = new Properties();
			FStream = new FileInputStream("");
			properties.load(FStream);
			serverAddr = properties.getProperty("");
			serverPort = properties.getProperty("");
		}catch(Exception e){
			logger.log(">>>>>>读取GTCG配置文件异常:",e);
		}
	}

	public ICBCEPayService(String sendData, String strPublicCode,
			String transtime, String tag, String csessionid) {
		super();
		this.sendData = sendData;
		this.strPublicCode = strPublicCode;
		this.transtime = transtime;
		this.tag = tag;
		this.csessionid = csessionid;
	}
	
	/*交易处理*/
	public boolean doTrade(){
		logger.log(tag + "====================交易开始====================");
		logger.log(tag + "server address:" + serverAddr);
		logger.log(tag + "server port   :" + serverPort);
		try{
			byte[] byteSend = null;
			String strRecive ;	
			String strSend = makePkg();
			byteSend = strSend.getBytes();
			logger.log(tag + "发送报文：" + strSend);
			String strCode = CommonTrade.getField(strPublicCode, 0);
			CommonTrade commonTrade = new CommonTrade(strCode, byteSend);
			strRecive = commonTrade.TcpCommProxy(serverAddr, serverPort);
			logger.log(tag + "接收报文： " + strRecive);
			RetPack(strRecive);
			logger.log(tag + "====================交易结束====================");
			if(strTransOk){
				return true;
			}
			return false;
		}catch(Exception e){
			logger.log(tag + ">>>>交易异常:",e);
			return false;
		}
	}
	
	public String makePkg() throws DocumentException{
		String strTranCode = "";
		StringBuffer strTmp ;
		String s2 = VDate.getCurDate("yyyy-MM-ddHH:mm:ss");
		
		//交易码
		strTranCode = CommonTrade.getField(strPublicCode, 0);
		
		//地区好
		strAreaCode = CommonTrade.getField(strPublicCode, 1);
		strAreaCode = CommonTrade.addSpace0(strPublicCode, 5);
		String strBranch = "0298";
		if("04301".equals(strAreaCode)){
			strBranch = "0298";
		}
		//TODO 增加对应地区号
		strBranch = CommonTrade.addSpace0(strBranch, 5);
		
		String str45 = sendData;
		String cardno = CommonTrade.getField(str45, 0);
		
		HttpSession saveSession = MySessionContext.getSession(csessionid);
		String sessionData = (String)saveSession.getAttribute("sessionData");
		logger.log(tag + "sessionData:  " + sessionData);
		SAXReader reader = new SAXReader();
		//1.读取session中的Xml数据
		ByteArrayInputStream stream = new ByteArrayInputStream(sessionData.getBytes());
		//2.转换成document
		Document document = reader.read(stream);
		//3.获取root节点
		Element root = document.getRootElement();
		String regArea = root.element("mainAreaCode").getText();
		String regBranchString = root.element("regLogicNetCode").getText();
		String regMode = root.element("regType").getText();
		String cis = root.element("mainCIS").getText();
		regMode = ("0".equals(regMode)) ? "1" : "2";
		Element cardset = root.element("RegCardSet");
		Iterator cards = root.elementIterator("RegCardResult");
		ArrayList cardList = new ArrayList();
		String cardArea = "";
		String cardBranch = "";
		while(cards.hasNext()){
			Element card = (Element)cards.next();
			if(card.element("cardNum").getText().equals(cardno)){
				cardArea = card.element("areaCode").getText();
				cardBranch = card.element("netCode").getText();
				break;
			}
		}
		
		/*查询*/
		if("88582".equals(strTranCode)){
			strTmp = new StringBuffer();
			strTmp.append("88582").append("|");
			strTmp.append(strBranch).append("|");
			strTmp.append("00112").append("|");
			strTmp.append(strAreaCode).append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append(s2.substring(0,10)).append("|");
			strTmp.append(s2.substring(10,18)).append("|");
			strTmp.append("999").append("|");
			strTmp.append("0").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append(cardno).append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("1").append("|");
			strTmp.append("7").append("|");
			strTmp.append("1").append("|");
			strTmp.append("4").append("|");
			strTmp.append("").append("|");
			strTmp.append("1").append("|");
			strTmp.append("").append("|");
			strTmp.append("").append("|");
			strTmp.append("0").append("|");
			strTmp.append("0").append("|");
			strTmp.append("").append("|");
			
		}
		
		/*缴费*/
		if("88583".equals(strTranCode)){
			
		}
		return "";
	}
	
	/*应答报文解包*/
	public void RetPack(String strPack){
		if(strPack == null || strPack == "" || strPack.length() == 0){
			strRespInfo = "-9999";
			return;
		}
		
		//成功标志
		strRespCode = CommonTrade.getField(strPack, 0);
		logger.log(tag + "成功标志strRespCode: " + strRespCode);
		strRespInfo = CommonTrade.getField(strPack, 1);
		logger.log(tag + "错误代码strRespInfo: "+ strRespCode);
		
		//TODO 完成返回码的判断。。。
	}

	public String getReceiveData() {
		return receiveData;
	}

	public void setReceiveData(String receiveData) {
		this.receiveData = receiveData;
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

	public String getStrRespInfo() {
		return strRespInfo;
	}

	public void setStrRespInfo(String strRespInfo) {
		this.strRespInfo = strRespInfo;
	}
	
	
	

}
