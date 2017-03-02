package com.icbc.sxfh.ktcard;

import java.io.FileInputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

import com.icbc.sxfh.common.CommonTrade;


public class STCardService {
	private String receiveData = ""; // ���ս�������
	private String sendData = ""; // ���ͽ�������
	private String strAreaCode = ""; // ������
	private String strPublicCode = ""; // ���״���+������
	private String strRespCode = ""; // ��Ӧ��
	private String strRespInfo = ""; // ��Ӧ��Ϣ
	private boolean strTransOk = false; //���׳ɹ���־
	private String transtime;   //����ʱ��
	private String tag=""; //��־��־

	private static Properties properties = null;
	private static FileInputStream FStream = null;
	private static String serverAddr = null; // ��������ַ
	private static String serverPort = null; // �������˿�
	private static String singleLimit = null;
	private final static Logger log = Logger.getLogger(STCardService.class);
		
	static {
		try {
			properties = new Properties();
			FStream = new FileInputStream("d:/fbec/web/ipconfig.cfg");
			properties.load(FStream);
			serverAddr = properties.getProperty("stk_ip");// 
			serverPort = properties.getProperty("stk_port");// 4444
			singleLimit = properties.getProperty("stk_singleLimit");//�����޶�

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
			res = properties1.getProperty("stk_singleLimit");//�����޶�
		} catch (Exception e) {
			// TODO �Զ����� catch ��
			e.printStackTrace();
		}
		return res;
	}

	// ���״���
	public boolean doTrade() {
		//serverAddr = CommonTrade.getServerAddr();
		//serverPort = CommonTrade.getServerPort();

		log.info(tag+"---------------���׿�ʼ------------------------------");
		log.info(tag+"server address : " + serverAddr);
		log.info(tag+"server port    : " + serverPort);
		try {
			byte byteSend[] = null;
			String strRecive;
			String strSend = makePkg(); // �������ͱ���
			byteSend = strSend.getBytes(); 
			log.info(tag+"���ͱ���:" + strSend);
			String strCode = CommonTrade.getField(strPublicCode, 0); // ȡ������
			CommonTrade commonTrade = new CommonTrade(strCode, byteSend);
			
			strRecive = commonTrade.TcpCommProxy(serverAddr,serverPort); // ͨ��Socket���ͣ������շ��ر���
			
			//strRecive="00206984353|05|04301|05588|00010|99999999|999999999999999|99999999999999999999|20110328|090000|99999999999999999999|00000|��ͨ����ϸ��ѯ�ɹ�!|6222390016150033|32011112220100000003|������             |22|202103|24|9||2011-03-21|6222390016150033|32011112220100000003|84349|0|1000                |0          |06           |00010||2011-03-24|6222390016150033|32011112220100000003|84349|0|1                   |501001              |0                  |02046||2011-03-23|6222390016150033|32011112220100000003|84349|0|1000   |0                   |02                         |00010||2011-03-27|6222390016150033|32011112220100000003|84349|0|1000          |1000                |0                                |02046||2011-03-27|6222390016150033|32011112220100000003|84349|0|500000              |501000              |0                                       |02046||2011-03-21|6222390016150033|32011112220100000003|84349|0|10000               |11000               |0                                              |05659||2011-03-27|6222390016150033|32011112220100000003|84349|0|9999999             |9999999             |0                                                     |05659||2011-03-29|6222390016150033|32011112220100000003|84349|0|100                 |557639              |0                                                            |01304||2011-03-29|6222390016150033|32011112220100000003|84349|0|1                   |557640              |0                                                                   |01304||2011-03-29|6222390016150033|32011112220100000003|84349|0|1                   |557640              |0                                                                   |01304|";
			//strRecive="00010284353|05|04301|00000|00000||               ||20110329|154012||00000||1111111111111111111|22222222222222222222|����|22|201103|48|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|2011-03-28|2011-03-28|1111111111111111111|22222222222222222222|84353|0|100.00|200.00|05|11111|";
			log.info(tag+"���ձ���: " + strRecive);
			RetPack(strRecive); // �������յ��ı���
			log.info(tag+"---------------���׽���------------------------------");
			if(strTransOk){
				return true;
			}else{
				return false;
			}
		} catch (Exception exception) {
			exception.printStackTrace();
			log.info(tag+"�����쳣: " + exception);
			return false;
		}		
	}
	// ���ɹ�������ͷ
	public String strPacketHead(String strCode) {
		/*�м�ҵ��ƽ̨���İ�ͷ(�ֶ�֮���ԡ�|����Ϊ�ָ�)
		  ������		6λ	�ɳ�����䣨������0���뽻����֮��û�зָ��������ֶ�����ͨѶ���м�ҵ��ƽ̨���ʱ�Ѳ����ڴ��ֶΣ����BICE�ϲ���Ҫ����ֶΣ�
		  ������		5λ
		  ������Դ	2λ	01���绰���� 02�������ն� 03������������ 04-ʵʱ���� 05����������  06��POS 07-WEB����
		  ������		5λ��������0��
		  �����		5λ��������0��
		  ��Ա��		5λ��������0��
		  �������	8λ
		  �ն˺�		15λ	(���㲹��)
		  ��Χ��ˮ	20λ
		  ��������	8λ��YYYYMMDD��
		  ����ʱ��	6λ��HHMMSS��
		  ����1		20λ	
		*/

		//SimpleDateFormat simpledateformat = new SimpleDateFormat(
		//		"yyyyMMddHHmmss");
		//Date date = new Date();
		//String s2 = simpledateformat.format(date);
		String s2 = this.transtime;

		strAreaCode = CommonTrade.getField(strPublicCode, 1);// ������
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
			
		String strTradeCode = CommonTrade.getField(strPublicCode, 0);// ������
		
		String strPack = "";
		strPack = strPack + strTradeCode + "|";//������
		strPack = strPack + "05" + "|"; // ������Դ
		strPack = strPack + strAreaCode + "|"; // ������
		//���ݵ�����ѡ������͹�Ա��
		strPack = strPack + strBranch + "|"; // �����
		//strPack = strPack + "0298" + "|"; // �����
		strPack = strPack + "00112" + "|";// ��Ա��
		//strPack = strPack + "00112" + "|";// ��Ա��
		strPack = strPack + "" + "|"; // �������
		strPack = strPack + "               " + "|"; // �ն˺�
		strPack = strPack + "" + "|"; // ��Χ��ˮ
		strPack = strPack + s2.substring(0, 8) + "|"; // ��������
		strPack = strPack + s2.substring(8, 14) + "|"; // ����ʱ��
		strPack = strPack + "" + "|"; // ����1
		log.info(tag+"��������ͷ: " + strPack);
		//System.out.println("��������ͷ: " + strPack);
		return strPack;
	}

	// ���ͽ��ױ������
	public String makePkg() {

		String strTranCode = "";
		String strLen = "";
		String strTmp = "";
		strTranCode = CommonTrade.getField(strPublicCode, 0);// ���״���

		String str45 =sendData;
		
		 // ��ͨ����ֵ
		if (strTranCode.equals("84358")) {                         
			strTmp = CommonTrade.getField(str45, 0) + "|";          // �跽�˺�
			strTmp = strTmp + CommonTrade.getField(str45, 1) + "|"; // ��ͨ������
			strTmp = strTmp + CommonTrade.getField(str45, 2) + "|"; // ��ֵ���
			strTmp = strTmp + CommonTrade.getField(str45, 3) + "|"; // ��ֵ���HEX
			strTmp = strTmp + CommonTrade.getField(str45, 4) + "|"; // �������
			strTmp = strTmp + CommonTrade.getField(str45, 5) + "|"; // ���ڽ������
			strTmp = strTmp + CommonTrade.getField(str45, 6) + "|"; // �ն˱���
			strTmp = strTmp + CommonTrade.getField(str45, 7) + "|"; // �����
			strTmp = strTmp + CommonTrade.getField(str45, 8) + "|"; // �ͻ�����
			strTmp = strTmp + CommonTrade.getField(str45, 9) + "|"; // MAC
		}
		
		// д���ɹ������ƽ̨״̬
		if(strTranCode.equals("82148")){
			strTmp = CommonTrade.getField(str45, 0) + "|";          // ��ͨ������
			strTmp = strTmp + CommonTrade.getField(str45, 1) + "|"; // ��ˮ��
			strTmp = strTmp + CommonTrade.getField(str45, 2) + "|"; // MAC
		}

		// ��ֵʧ�ܺ������������������ߵ�����ʧ��
		if(strTranCode.equals("84420")){
			strTmp = CommonTrade.getField(str45, 0) + "|";          // �跽�˺�
			strTmp = strTmp + CommonTrade.getField(str45, 1) + "|"; // ��ͨ������
			strTmp = strTmp + CommonTrade.getField(str45, 2) + "|"; // ��ֵ���
			strTmp = strTmp + CommonTrade.getField(str45, 3) + "|"; // ԭ������ˮ��
		}
			
		
		byte[] temp1 = strTmp.getBytes();
		int packagbodyLen = temp1.length;//���峤��
		String packageHead = strPacketHead(strTranCode);//���ɹ�����ͷ
		
		byte[] temp2 = packageHead.getBytes();
		int packageHeadLen = temp2.length;//��ͷ����
		
		int packageLen = packageHeadLen + packagbodyLen;//������(�����������ֶ�)
		strLen = Integer.toString(packageLen);
		strTmp = CommonTrade.addSpace0(strLen, 6) + packageHead + strTmp;
		//strTmp = packageHead + strTmp;

		log.info(tag+"���ͽ��ױ���: " + strTmp);
		return strTmp;
	}

	
	// Ӧ���Ľ��
	public void RetPack(String strPack) {
		String strTranCode = ""; //������
		
		if (strPack == null || strPack == "" || strPack.length() == 0) {
			strRespInfo = "ͨѶ��ʱ�����Ժ����ԣ�";
			return;
		}
		
		String LenAndCode = CommonTrade.getField(strPack, 0);//���ĳ���+���״���
		log.info(tag+"���ĳ���+���״���: " + LenAndCode);
		strTranCode = LenAndCode.substring(6, LenAndCode.length());//������
		//log.info("���������еĽ����룺"+strTranCode);
		strPack = CommonTrade.getFieldLast(strPack, 11);//ȥ������ͷ�������
		//System.out.println("ȥ������ͷ������ݣ�"+strPack);
		log.info(tag+"ȥ������ͷ������ݣ�"+strPack);
			
		strRespCode = CommonTrade.getField(strPack, 0);//������
		log.info(tag+"��Ӧ��strRespCode: " + strRespCode);
		
		if (strRespCode.equals("00000") || strRespCode.equals("0000") || Integer.parseInt(strRespCode) == 0) {
			strTransOk = true;
		} else{
			strTransOk = false;
		}
		log.info(tag+"���׳ɹ���־: " + strTransOk);
		if (strTransOk) {
			if (strTranCode.equals("84358")) {
				strRespInfo = CommonTrade.getField(strPack, 1);
				receiveData = CommonTrade.getFieldLast(strPack, 2);
				log.info(tag+"��Ӧ��ϢstrRespInfo:" + strRespInfo);
				log.info(tag+"���ؽ�������receiveData:" + receiveData);
			}
			if (strTranCode.equals("82148")) {
				strRespInfo = CommonTrade.getField(strPack, 1);				
				log.info(tag+"��Ӧ��ϢstrRespInfo:" + strRespInfo);
			}
			if (strTranCode.equals("84420")) {
				strRespInfo = CommonTrade.getField(strPack, 1);				
				log.info(tag+"��Ӧ��ϢstrRespInfo:" + strRespInfo);
			}
		}else {
			strRespInfo = CommonTrade.getField(strPack, 1);
			log.info(tag+"��Ӧ��ϢstrRespInfo:" + strRespInfo);
		}		
	}
	

	// ������Ӧ��
	public String getRespCode() {
		return strRespCode;
	}

	// ������Ӧ��Ϣ
	public String getRespInfo() {
		return strRespInfo.trim();
	}

	// ������Ӧ����
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
