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
 * <p>TODO �������
 * <p>��ϸ������
 * <p>��Ʒģ�����ƺͰ汾
 * @author Jason.Lee on 2017��3��1��
 */
public class ICBCEPayService {
	//���ս�������
	private String receiveData = "";
	
	//���ͽ�������
	private String sendData = "";
	
	//������
	private String strAreaCode = "";
	
	//���״��� + ������
	private String strPublicCode = "";
	
	//��Ӧ��
	private String strRespCode = "";
	
	//��Ӧ��Ϣ
	private String strRespInfo = "";
	
	//���׳ɹ���־
	private boolean strTransOk = false;
	
	//����ʱ��
	private String transtime = "";
	
	//��־��־
	private String tag = "";
	
	//sessionId
	private String csessionid = "";
	
	private static Properties properties = null;
	
	private static FileInputStream FStream = null;
	
	//��������ַ
	private static String serverAddr = null;
	
	//�������˿�
	private static String serverPort = null;
	
	//��ȡ��־����
	private final static Log_etc_singleton logger = Log_etc_singleton.getInstance();
	
	static{
		try{
			properties = new Properties();
			FStream = new FileInputStream("");
			properties.load(FStream);
			serverAddr = properties.getProperty("");
			serverPort = properties.getProperty("");
		}catch(Exception e){
			logger.log(">>>>>>��ȡGTCG�����ļ��쳣:",e);
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
	
	/*���״���*/
	public boolean doTrade(){
		logger.log(tag + "====================���׿�ʼ====================");
		logger.log(tag + "server address:" + serverAddr);
		logger.log(tag + "server port   :" + serverPort);
		try{
			byte[] byteSend = null;
			String strRecive ;	
			String strSend = makePkg();
			byteSend = strSend.getBytes();
			logger.log(tag + "���ͱ��ģ�" + strSend);
			String strCode = CommonTrade.getField(strPublicCode, 0);
			CommonTrade commonTrade = new CommonTrade(strCode, byteSend);
			strRecive = commonTrade.TcpCommProxy(serverAddr, serverPort);
			logger.log(tag + "���ձ��ģ� " + strRecive);
			RetPack(strRecive);
			logger.log(tag + "====================���׽���====================");
			if(strTransOk){
				return true;
			}
			return false;
		}catch(Exception e){
			logger.log(tag + ">>>>�����쳣:",e);
			return false;
		}
	}
	
	public String makePkg() throws DocumentException{
		String strTranCode = "";
		StringBuffer strTmp ;
		String s2 = VDate.getCurDate("yyyy-MM-ddHH:mm:ss");
		
		//������
		strTranCode = CommonTrade.getField(strPublicCode, 0);
		
		//������
		strAreaCode = CommonTrade.getField(strPublicCode, 1);
		strAreaCode = CommonTrade.addSpace0(strPublicCode, 5);
		String strBranch = "0298";
		if("04301".equals(strAreaCode)){
			strBranch = "0298";
		}
		//TODO ���Ӷ�Ӧ������
		strBranch = CommonTrade.addSpace0(strBranch, 5);
		
		String str45 = sendData;
		String cardno = CommonTrade.getField(str45, 0);
		
		HttpSession saveSession = MySessionContext.getSession(csessionid);
		String sessionData = (String)saveSession.getAttribute("sessionData");
		logger.log(tag + "sessionData:  " + sessionData);
		SAXReader reader = new SAXReader();
		//1.��ȡsession�е�Xml����
		ByteArrayInputStream stream = new ByteArrayInputStream(sessionData.getBytes());
		//2.ת����document
		Document document = reader.read(stream);
		//3.��ȡroot�ڵ�
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
		
		/*��ѯ*/
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
		
		/*�ɷ�*/
		if("88583".equals(strTranCode)){
			
		}
		return "";
	}
	
	/*Ӧ���Ľ��*/
	public void RetPack(String strPack){
		if(strPack == null || strPack == "" || strPack.length() == 0){
			strRespInfo = "-9999";
			return;
		}
		
		//�ɹ���־
		strRespCode = CommonTrade.getField(strPack, 0);
		logger.log(tag + "�ɹ���־strRespCode: " + strRespCode);
		strRespInfo = CommonTrade.getField(strPack, 1);
		logger.log(tag + "�������strRespInfo: "+ strRespCode);
		
		//TODO ��ɷ�������жϡ�����
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
