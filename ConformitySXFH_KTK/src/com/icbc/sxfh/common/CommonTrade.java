/**********************************/
//�м�ҵ�����嵥
//      �̶��绰С��ͨ��ֵ��ѯ 4831
/**********************************/

package com.icbc.sxfh.common;

import java.util.*;
import java.io.*;
import java.text.SimpleDateFormat;
import java.net.Socket;

import org.apache.log4j.Logger;


// import java.util.logging.*;

public class CommonTrade {

	private String strRespCode = ""; // ��Ӧ��
	private String strRespInfo = ""; // ��Ӧ��Ϣ

	//private static Properties properties = null;
	//private static FileInputStream FStream = null;

	private static String serverAddr = null; // ��������ַ
	private static int serverPort = 0; // �������˿�

	private static String pwdkeySingleLimitMoney = null;
	private static String pwdkeyAddUpLimitMoney = null;

	private String strCode = "";
	private String strRecive = null;
	private byte byteSend[] = null;
	
	private final static Logger log = Logger.getLogger(CommonTrade.class);

//	static {
//		try {
//			properties = new Properties();
//			FStream = new FileInputStream("e:/fbec/web/ipconfig.cfg");
//			properties.load(FStream);
//			serverAddr = properties.getProperty("serverAddr");// "108.0.17.192";
//			serverPort = Integer.parseInt(properties.getProperty("serverPort"));// 7099;
//			//pwdkeySingleLimitMoney = properties.getProperty("pwdkeySingleLimitMoney");// �����޶�
//			//pwdkeyAddUpLimitMoney = properties.getProperty("pwdkeyAddUpLimitMoney");// �ۼ��޶�
//			// serverAddr="108.6.13.127";
//			// serverPort=Integer.parseInt("7021");
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}

	private int maxTimeOut = 65000;
	private Socket workSocket;
	private InputStream sockInStream;
	private OutputStream sockOutStream;


	public CommonTrade() {
	}

	public CommonTrade(String sTransCode, byte abyte0[]) {
		strCode = sTransCode;
		byteSend = abyte0;
	}

	public String TcpCommProxy(String ip, String port) {
		log.info("m byteSend    : " + byteSend);
		try {
			
			workSocket = new Socket(ip, Integer.parseInt(port));
			workSocket.setReceiveBufferSize(10240);
			//workSocket.setReceiveBufferSize(20480);
			
			workSocket.setSoLinger(true, 5);
			workSocket.setSoTimeout(maxTimeOut);
			sockInStream = workSocket.getInputStream();
			sockOutStream = workSocket.getOutputStream();
			byte[] abyte8 = null;
			
			if (strCode.equals("83823") || strCode.equals("83822") || strCode.equals("yy05")) {
				abyte8 = doInteraction1(byteSend);
			} else {
				abyte8 = doInteraction(byteSend);
			}
			
			if (abyte8 == null)
				strRecive = "";
			else
				strRecive = new String(abyte8);
			//System.out.println("strRecive  :" + strRecive);
			log.info("m strRecive  :" + strRecive);
			return strRecive; // ͨ��Socket���ͣ������շ��ر���
		} catch (Exception ex1) {

			ex1.printStackTrace();
			strRecive = null;
			return strRecive;
		} finally {
			try {
				sockInStream.close();
				sockOutStream.close();
				workSocket.close();
				workSocket = null;
				sockInStream = null;
				sockOutStream = null;
			} catch (Exception _ex) {
				System.out.println(_ex.getMessage());
			}
		}
	}

	public byte[] doInteraction(byte abyte0[])

	{
		byte abyte1[] = new byte[40960];
		int i = 0;
		try {
			sockOutStream.write(abyte0);

			i = sockInStream.read(abyte1);
			//log.info("m abyte11 length :" + i);
		} catch (Exception exception1) {
			System.out.println(exception1.getMessage());
		}

		byte[] abyte2 = null;
		if (i > 0) {
			abyte2 = new byte[i];
			System.arraycopy(abyte1, 0, abyte2, 0, i);
		}
		//log.info("m abyte2  :" + new String(abyte2));
		return abyte2;
	}

	public byte[] doInteraction1(byte abyte0[])

	{

		byte abyte5[] = new byte[20480];
		byte trxcode[] = new byte[4];

		byte totalnum[] = new byte[3];
		String strTrxcode = "";
		String strtotalnum = "";
		int i = 1;
		int allLength = 0;
		int k = 0;
		try {

			sockOutStream.write(abyte0);

			while (i > 0) {

				byte abyte1[] = new byte[20480];
				i = sockInStream.read(abyte1);
				//log.info("m abyte1 length :" + i);

				if (i <= 0)
					break;
				System.arraycopy(abyte1, 0, abyte5, k, i);
				k = k + i;

				if (i >= 68) {
					if (allLength == 0) {
						System.arraycopy(abyte5, 57, trxcode, 0, 4);
						strTrxcode = new String(trxcode);
						if (strTrxcode.equals("8251")) {
							System.arraycopy(abyte5, 137, totalnum, 0, 2);
							System.out.println("8251:");
						} else {
							System.arraycopy(abyte5, 65, totalnum, 0, 3);
						}
						strtotalnum = new String(totalnum);
						strtotalnum = strtotalnum.trim();
						if (strtotalnum.equals(""))
							strtotalnum = "0";
						//System.out.println("strtotalnum:" + strtotalnum);
						if (strTrxcode.equals("4904")) {
							allLength = Integer.parseInt(strtotalnum) * 128 + 68;

						} else if (strTrxcode.equals("4905")) {
							allLength = Integer.parseInt(strtotalnum) * 192 + 68;

						} else if (strTrxcode.equals("4623")) {

							allLength = Integer.parseInt(strtotalnum) * 48 + 136;

						} else if (strTrxcode.equals("4624")) {

							allLength = Integer.parseInt(strtotalnum) * 50 + 118;

						} else if (strTrxcode.equals("1279")) {

							allLength = Integer.parseInt(strtotalnum) * 71 + 85;

						} else if (strTrxcode.equals("8251")) {

							allLength = Integer.parseInt(strtotalnum) * 200 + 139;

						}
						//System.out.println("allLength:" + allLength);
					}
					if (k <= allLength)
						continue;
					else
						break;

				}

			}

		} catch (Exception exception1) {
			System.out.println("exception:" + exception1.getMessage());
		}

		byte[] abyte2 = null;
		if (k > 0) {
			abyte2 = new byte[k];
			System.arraycopy(abyte5, 0, abyte2, 0, k);

		}
		//log.info("m abyte2 length :" + k);
		//log.info("m abyte2  :" + new String(abyte2));
		return abyte2;
	}

	// ���ɹ�������ͷ
	public static HashMap strPacketHead(String strPublicCode) {
		// ����,"����""ǰ�û���","������","ǰ�û����̺�","��������","����Ա��","��¼��","�ն˺�","ǰ��ʱ��","��������","�ڲ���ˮ��","�ڲ���","������"};
		// {2, 4, 4, 5, 6, 4, 4, 4, 2, 9, 8, 5, 4, 4};
		// strPublicCode=IP��ַ0+������1+�����2+�ն˺�3+������4+����5

		String strAreaCode = "";

		SimpleDateFormat simpledateformat = new SimpleDateFormat("yyyyMMddhhmmss");
		Date date = new Date();
		String s2 = simpledateformat.format(date);

		strAreaCode = getField(strPublicCode, 1);// ������
		System.out.println("strAreaCode    : " + strAreaCode);
		String strInTradeCode = getField(strPublicCode, 4);// �ڲ����״���
		String strTradeCode = getField(strPublicCode, 4);// ���״���
		String strPack = "";
		strPack = "0001"; // ǰ�û��� 4
		strPack = strPack + addSpace0(strAreaCode, 5); // ������ 5
		strPack = strPack + "000001"; // ǰ�û����̺� 6
		strPack = strPack + getField(strPublicCode, 2); // / ��������4
		strPack = strPack + "0001"; // ����Ա�� 4
		strPack = strPack + "0001"; // ��¼�� 4
		strPack = strPack + getField(strPublicCode, 3); // �ն˺� 2
		strPack = strPack + s2.substring(8, 14) + "   "; // ǰ��ʱ�� 9
		strPack = strPack + s2.substring(0, 8); // �������� 8
		strPack = strPack + "00001"; // �ڲ���ˮ�� 5
		strPack = strPack + strInTradeCode; // �ڲ��� 4
		strPack = strPack + strTradeCode; // ������ 4
		System.out.println("public head    : " + strPack);
		HashMap map = new HashMap();
		map.put("strAreaCode", strAreaCode);
		map.put("strPublicCode", strPublicCode);
		map.put("strPack", strPack);

		return map;
	}

	// ȥ���ո�
	public static String filterString(String str1, String str2) {

		int pos;
		String temp = str1;
		while (temp.indexOf(str2) >= 0) {
			pos = temp.indexOf(str2);
			temp = temp.substring(0, pos) + temp.substring(pos + str2.length());
		}
		return temp;
	}

	// ȡ�õ����޶���ۼ��޶�
	public String getSingleLimmitMoney() {

		return pwdkeySingleLimitMoney;
	}

	// ȡ�õ����޶���ۼ��޶�
	public String getAddUpLimmitMoney() {

		return pwdkeyAddUpLimitMoney;
	}

	public String getTradeCode() {
		return "8900";
	}

	public String getTradeInfo() {
		return "ͨ�ýɷѱ��Ľӿ�";
	}

	public String toString() {
		return "ICBC WEBBANK TradeCode:8900 TradeInfo:ͨ�ýɷѱ��Ľӿ�";
	}

	// ������Ӧ��
	public String getRespCode() {
		return strRespCode;
	}

	// ������Ӧ��Ϣ
	public String getRespInfo() {
		return strRespInfo.trim();
	}

	public static String getServerAddr() {
		return serverAddr;
	}

	public static void setServerAddr(String serverAddr) {
		CommonTrade.serverAddr = serverAddr;
	}

	public static int getServerPort() {
		return serverPort;
	}

	public static void setServerPort(int serverPort) {
		CommonTrade.serverPort = serverPort;
	}

	/* ------------------------------------���¶��Ǹ�������---------------------------- */

	// ����ת��,�ڲ�����תΪ���״���
	public static String ConvertTranCode(String strTranCode) {
		String str = "0000";
		if (strTranCode.equals("0001"))
			str = "4263";
		else if (strTranCode.equals("0051"))
			str = "4264";
		else if (strTranCode.equals("4267"))
			str = "4267";
		else if (strTranCode.equals("4268"))
			str = "4268";
		return str;
	}

	// ����ת��,���״���תΪ�ڲ�����
	public static String reConvertTranCode(String strTranCode) {
		String str = "0000";
		if (strTranCode.equals("4263"))
			str = "0001";
		else if (strTranCode.equals("4264"))
			str = "0051";
		else if (strTranCode.equals("4267"))
			str = "4267";
		else if (strTranCode.equals("4268"))
			str = "4268";
		return str;
	}

	// ȡbyte����Ĳ�������,iStart��ʼλ��(��0��ʼ),iLen����
	public static String byteSub(byte[] abyte, int iStart, int iLen) {
		if (abyte == null || abyte.length == 0)
			return "";
		if (abyte.length <= iStart)
			return "";
		byte abyte2[] = new byte[iLen];
		System.arraycopy(abyte, iStart, abyte2, 0, iLen);
		String s = new String(abyte2);
		return s;
	}

	// �����߷ָ���ַ�������str2�滻str1
	public static String replaceField(String strSource, String str1, String str2) {
		try{
			int index = strSource.indexOf(str1);
			String sub1 = strSource.substring(0, index);
			String sub2 = strSource.substring(index+str1.length());
			return sub1+str2+sub2;
		}catch(Exception e){
			System.out.println(e.getMessage());
			return "";
		}	
	}	
	
	// �����߷ָ���ַ�����ȡ����iIndex����(��0��ʼ)
	public static String getField(String strSource, int iIndex) {
		int iPos;
		for (int i = 0; i < iIndex; i++) {
			iPos = strSource.indexOf('|');
			if (iPos >= 0)
				strSource = strSource.substring(iPos + 1, strSource.length());
			else
				break;
		}
		iPos = strSource.indexOf('|');
		if (iPos >= 0)
			strSource = strSource.substring(0, iPos);
		return strSource;
	}

	// �����߷ָ���ַ�����ȡ����iIndex�����Ժ����е��ַ���(��0��ʼ)
	public static String getFieldLast(String strSource, int iIndex) {
		int iPos;
		for (int i = 0; i < iIndex; i++) {
			iPos = strSource.indexOf('|');
			if (iPos >= 0)
				strSource = strSource.substring(iPos + 1, strSource.length());
			else
				break;
		}
		return strSource;
	}

	// ��^�ָ���ַ�����ȡ����iIndex����(��0��ʼ)
	public static String getField2(String strSource, int iIndex) {
		int iPos;
		for (int i = 0; i < iIndex; i++) {
			iPos = strSource.indexOf('^');
			if (iPos >= 0)
				strSource = strSource.substring(iPos + 1, strSource.length());
			else
				break;
		}
		iPos = strSource.indexOf('^');
		if (iPos >= 0)
			strSource = strSource.substring(0, iPos);
		return strSource;
	}

	// ��^�ָ���ַ�����ȡ����iIndex�����Ժ����е��ַ���(��0��ʼ)
	public static String getFieldLast2(String strSource, int iIndex) {
		int iPos;
		for (int i = 0; i < iIndex; i++) {
			iPos = strSource.indexOf('^');
			if (iPos >= 0)
				strSource = strSource.substring(iPos + 1, strSource.length());
			else
				break;
		}
		return strSource;
	}

	// �ö��ŷָ���ַ�����ȡ����iIndex����(��0��ʼ)
	public static String getField1(String strSource, int iIndex) {
		int iPos;
		for (int i = 0; i < iIndex; i++) {
			iPos = strSource.indexOf(',');
			if (iPos >= 0)
				strSource = strSource.substring(iPos + 1, strSource.length());
			else
				break;
		}
		iPos = strSource.indexOf(',');
		if (iPos >= 0)
			strSource = strSource.substring(0, iPos);
		return strSource;
	}

	/*-------------------------�����ǶԳ��ȵĴ����߷���--------------------------*/
	// ǰ��0,�ܳ���ΪiLen;
	public static String addSpace0(String strSource, int iLen) {
		String strTmp = "";
		for (int i = 0; i < iLen - strSource.length(); i++)
			strTmp = "0" + strTmp;
		strTmp = (strTmp + strSource).substring(0, iLen);
		return strTmp;
	}

	// ��0
	public static String addSpaceh0(String strSource, int iLen) {
		String strTmp = "";
		for (int i = 0; i < iLen - strSource.length(); i++)
			strTmp = strTmp + "0";
		strTmp = (strSource + strTmp).substring(0, iLen);
		return strTmp;
	}

	// ǰ���ո�,�ܳ���ΪiLen;
	public static String addSpaceleft(String strSource, int iLen) {
		String strTmp = "";
		for (int i = 0; i < iLen - strSource.length(); i++)
			strTmp = strTmp + " ";
		return strTmp + strSource;
	}

	// �󲹿ո�,�ܳ���ΪiLen;
	public static String addSpace(String strSource, int iLen) {
		String strTmp = "";
		for (int i = 0; i < iLen - strSource.length(); i++)
			strTmp = strTmp + " ";
		return strSource + strTmp;
	}

	/* ---------------------------�����ǶԽ���Ĺ��߷���------------------------------ */
	// ���û�����Ľ��������(�ܳ���ΪmoneyLenλ),ȥ��С����ǰ��0 50.00-->0000005000 (moneyLen=10)
	public static String money(String moneystr, int moneyLen) {
		if (moneystr.indexOf(".") > 0) {
			int i = moneystr.indexOf(".");
			int len = moneystr.length();
			moneystr = moneystr.substring(0, i) + addSpaceh0(moneystr.substring(i + 1, len), 2);
		}
		moneystr = addSpace0(moneystr, moneyLen);
		return moneystr;
	}

	/* ---------------------------�����ǶԽ���Ĺ��߷���------------------------------ */
	/**
	 * //���û�����Ľ��������(�ܳ���ΪmoneyLenλ),ȥ��С����ǰ���ո� 50.00--> 5000 (moneyLen=10)
	 */
	public static String money1(String moneystr, int moneyLen) {
		if (moneystr.indexOf(".") > 0) {
			int i = moneystr.indexOf(".");
			int len = moneystr.length();
			moneystr = moneystr.substring(0, i) + addSpaceh0(moneystr.substring(i + 1, len), 2);
		}
		moneystr = addSpaceleft(moneystr, moneyLen);
		return moneystr;
	}

	public static String moneySpace(String moneystr, int moneyLen) {
		if (moneystr.indexOf(".") > 0) {
			int i = moneystr.indexOf(".");
			int len = moneystr.length();
			moneystr = moneystr.substring(0, i) + addSpaceh0(moneystr.substring(i + 1, len), 2);
		}
		moneystr = addSpace(moneystr, moneyLen);
		return moneystr;
	}

	// ������С����ǰ���ո��ո�Ľ����ʽתΪ��С�������ʽ,���������ⳤ������ 0000000000012300-->123.00
	public static String formatMoneyStr(String strSource) {
		String strTmp = strSource.trim();
		String zero = "0.00";
		boolean sign = false;

		if (strTmp.equals("")) {
			return zero;
		}

		if (strTmp.substring(0, 1).equals("-")) {
			if (strTmp.length() == 1)
				return zero;
			sign = true;
			strTmp = strTmp.substring(1, strTmp.length());
		}

		byte[] bytTmp = strTmp.getBytes();
		boolean allZero = true;
		for (int i = 0; i < bytTmp.length; i++) {
			if (bytTmp[i] != (byte) '0') {
				allZero = false;
				break;
			}
		}

		if (allZero)
			return zero;

		if (strTmp.indexOf(".") < 0) {
			if (strTmp.length() < 2)
				strTmp = ".0" + strTmp;
			else
				strTmp = strTmp.substring(0, strTmp.length() - 2) + "." + strTmp.substring(strTmp.length() - 2, strTmp.length());
		}

		int iLen = strTmp.length();
		for (int i = 0; i < iLen; i++) {
			if (strTmp.substring(0, 1).equals("0"))
				strTmp = strTmp.substring(1, strTmp.length());
			else
				break;
		}

		if (strTmp.indexOf(".") == 0)
			strTmp = "0" + strTmp;
		if (sign)
			strTmp = "-" + strTmp;

		return strTmp;
	}

	// ��ǰ�����ʽ���������ַ��ʽ��Ϊ������ʽ
	public static String removeZero(String src) {
		if (src == null)
			return "";

		return src.replace('0', ' ').trim();
	}

	public static String removeZeroFront(String srcString) {
		if (srcString == null)
			return "";

		String src = srcString;
		int iLen = src.length();
		for (int i = 0; i < iLen; i++) {
			if (src.substring(0, 1).equals("0"))
				src = src.substring(1, src.length());
			else
				break;
		}
		return src;
	}

	public static String removeZeroBack(String srcString) {
		if (srcString == null)
			return "";

		String src = srcString;
		int iLen = src.length();
		for (int i = 0; i < iLen; i++) {
			int rLen = src.length();
			if (src.substring(rLen - 1, rLen).equals("0"))
				src = src.substring(0, src.length() - 1);
			else
				break;
		}
		return src;
	}

	// ---------------------------------------------------
	// ��ƾ����ӡ�Ŀ��ŵ���2-5λתΪ��****����ʽ 12345678901234567--��123456789012****7
	public static String FormatCardNo(String strCardNo) {
		String strTmp = "";
		if (strCardNo.length() < 5)
			return strCardNo;
		strTmp = strCardNo.substring(0, strCardNo.length() - 5) + "****" + strCardNo.substring(strCardNo.length() - 1, strCardNo.length());
		return strTmp;
	}

	public static String getDevInfo(String strIp) {
		try {
			FileReader fileReader = new FileReader("e:/fbec/web/zzjf/devinfo.txt"); // �����ļ�
			BufferedReader bufferedReader = new BufferedReader(fileReader);
			String tempLine = "";
			String strTemp = "";
			while ((tempLine = bufferedReader.readLine()) != null) {
				strTemp = getField(tempLine, 0);
				if (strTemp.equals(strIp)) {
					String s = tempLine;
					return s;
				}
			}
		} catch (Exception ep) {
			ep.printStackTrace();
		} finally {
		}
		return "";
	}

	/*
	 * �ѷ��ص���Ϣ��ת���ɶ�Ӧ��������Ϣ
	 */
	public static String convertResponseCode(String responsecode, String tcode) {
		try {
			FileReader fileReader = new FileReader("e:/fbec/web/errcode.txt"); // �������Ӧ�ĵ�
			BufferedReader bufferedReader = new BufferedReader(fileReader);
			String tempLine = "";
			String strTemp = "";
			String trancode = tcode.substring(0, 2);

			// //����ǵ�ѽӿڽ��������Ϊ4λ
			int respLen = responsecode.length();
			String resp99 = (trancode.equals("42") && respLen == 5) || trancode.equals("82") ? responsecode.substring(1, respLen) : responsecode;

			System.out.print("=======resp99" + resp99);
			while ((tempLine = bufferedReader.readLine()) != null) {
				strTemp = getField(tempLine, 0);
				// System.out.print("=======strTemp"+strTemp);
				// System.out.print("=======trancode"+trancode);

				if (strTemp.equals(trancode)) {
					strTemp = getField(tempLine, 1);
					if (strTemp.equals(responsecode)) {
						String s = getField(tempLine, 2);
						// System.out.print("=======s"+s);
						return s;
					} else
						continue;
				}
				if (strTemp.equals("99")) {
					strTemp = getField(tempLine, 1);
					if (strTemp.equals(resp99)) {
						String s = getField(tempLine, 2);
						System.out.println("error info     : " + s);
						return s;
					}
				}
			}
		} catch (Exception ep) {
			ep.printStackTrace();
		} finally {
		}
		System.out.println("error info     : ����ʧ��");
		return "�޴˴������:" + responsecode;
	}

	/*
	 * ���ױ��Ķ˿�����֤�˿ڲ�ͬ����Ҫת��
	 */
	public static String getTransPort(String transCode) {
		FileReader _fileReader = null;
		BufferedReader _bufferedReader = null;
		try {
			_fileReader = new FileReader("e:/fbec/web/ipconfig.cfg");
			_bufferedReader = new BufferedReader(_fileReader);
			String tempLine = "";
			String strTemp = "";
			while ((tempLine = _bufferedReader.readLine()) != null) {
				strTemp = getField(tempLine, 0);
				// �������ļ��иý��������
				if (strTemp.equals(transCode.substring(0, 2))) {
					strTemp = getField(tempLine, 1);
					return strTemp;
				}
			}
		} catch (Exception ep) {
			ep.printStackTrace();
		} finally {
			try {
				_bufferedReader.close();
				_fileReader.close();
			} catch (IOException close) {
			}
		}
		return "0";
	}

}
