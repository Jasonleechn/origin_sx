package com.icbc.sxfh.common;

public class CommonMethods {
	
	public static void initArray(byte ary[], byte ch, int p_begin, int p_end) {
			for (int i = p_begin; i <= p_end; i++)
				ary[i] = ch;
	}
	
	public static byte[] intToByte(int pInt) {
			byte bi[] = new byte[] { 0x00, 0x00, 0x00, 0x00 };
			bi[0] = (byte) ((pInt & 0xFF000000) >>> 24);
			bi[1] = (byte) ((pInt & 0x00FF0000) >>> 16);
			bi[2] = (byte) ((pInt & 0x0000FF00) >>> 8);
			bi[3] = (byte) ((pInt & 0x000000FF));
			return bi;
	}
	
	public static void copyArray(byte objary[], byte souary[], int o_begin, int s_begin, int len) {
		for (int i = 0; i < len; i++)
			objary[o_begin + i] = souary[s_begin + i];
	}
	
	public static String byte2hex(byte[] b) //二进制转字符串   
	 {                                                         
	  String hs="";                                            
	  String stmp="";                                          
	  for (int n=0;n<b.length;n++)                             
	   {                                                       
		stmp=(java.lang.Integer.toHexString(b[n] & 0XFF)); 
		if (stmp.length()==1) hs=hs+"0"+stmp;              
		else hs=hs+stmp;                                   
		if (n<b.length-1)   hs=hs+":";                     
	   }                                                       
	  return hs.toUpperCase();                                 
	 }
	
	public static String byteTohex(byte[] b) //二进制转字符串   
	 {                                                         
	  String hs="";                                            
	  String stmp="";                                          
	  for (int n=0;n<b.length;n++)                             
	   {                                                       
		stmp=(java.lang.Integer.toHexString(b[n] & 0XFF)); 
		if (stmp.length()==1) hs=hs+"0"+stmp;              
		else hs=hs+stmp;                                             
	   }                                                       
	  return hs.toUpperCase();                                 
	 }	 
	 
	/**		
	* -------------------------------------------------------------------------------------------*
	*  函数功能:字符串转BCD字节串["31323334"-->0x310x320x330x34]                                       
	* -------------------------------------------------------------------------------------------*
	*/  
	public static byte[] str2Bcd(String asc) {
		int len = asc.length();
		int mod = len % 2;

		if (mod != 0) {
			asc = "0" + asc;
			len = asc.length();
		}

		byte abt[] = new byte[len];
		if (len >= 2) {
			len = len / 2;
		}

		byte bbt[] = new byte[len];
		abt = asc.getBytes();
		int j, k;

		for (int p = 0; p < asc.length() / 2; p++) {
			if ((abt[2 * p] >= '0') && (abt[2 * p] <= '9')) {
				j = abt[2 * p] - '0';
			} else if ((abt[2 * p] >= 'a') && (abt[2 * p] <= 'z')) {
				j = abt[2 * p] - 'a' + 0x0a;
			} else {
				j = abt[2 * p] - 'A' + 0x0a;
			}

			if ((abt[2 * p + 1] >= '0') && (abt[2 * p + 1] <= '9')) {
				k = abt[2 * p + 1] - '0';
			} else if ((abt[2 * p + 1] >= 'a') && (abt[2 * p + 1] <= 'z')) {
				k = abt[2 * p + 1] - 'a' + 0x0a;
			} else {
				k = abt[2 * p + 1] - 'A' + 0x0a;
			}

			int a = (j << 4) + k;
			byte b = (byte) a;
			bbt[p] = b;
		}
		return bbt;
	}	 

	/**	字节数组转换成字符串
	 *@param data,待转换的byte数组
	 *@param separator,分隔符
	 * */
	public static String convertArraytoString(byte[] data, String separator) {
		int len = data.length;
		//modified by lianbx@2012-12-25 for  CPU占用高问题 begin
//		String str = "";
//		str = str.concat(byteHexString((int) data[0]));
//		for (int i = 1; i < len; i++) {
//			str = str.concat(separator);
//			str = str.concat(byteHexString((int) data[i]));
//		}
//		return str;
		
		StringBuilder sb = new StringBuilder();
		sb = sb.append(byteHexString((int) data[0]));
		for (int i = 1; i < len; i++) {
			sb = sb.append(separator);
			sb = sb.append(byteHexString((int) data[i]));
		}
		return sb.toString();		
		//modified by lianbx@2012-12-25 for  CPU占用高问题  end
	}

	/**	单个字节转换成字符串	
	 *@param val,待转换的byte
	 * */
	public static String byteHexString(int val) {
		StringBuffer sb = new StringBuffer();
		if ((val & 0xff) < 0x10)
			sb.append("0");
		sb.append(Integer.toHexString(val & 0xff).toUpperCase());
		return sb.toString();
	}
	
	public static int byteToInt(byte[] pByte, int pbegin, int pend) {
		int ret = 0;
		for (int i = pbegin; i <= pend; i++) {
			ret = ((ret << 8) & 0xFFFFFF00) | ((int) (pByte[i] & 0x000000FF));
		}
		return ret;
	}

	public static short byteToShort(byte[] pByte, int pbegin, int pend) {
		short ret = 0;
		if (pbegin < 0
			|| pbegin > pByte.length - 1
			|| pend < 0
			|| pend > pByte.length - 1)
			System.err.println("Out of Array ");
		for (int i = pbegin; i <= pend; i++)
			ret =
				(short) (((short) ((ret << 8)) & 0xFF00)
					| ((short) (pByte[i] & 0x00FF)));
		return ret;
	}

	public static byte[] shortToByte(short pShort) {
		byte bb[] = new byte[] { 0x00, 0x00 };
		bb[0] = (byte) ((pShort & 0xff00) >>> 8);
		bb[1] = (byte) (pShort & 0x00ff);
		return bb;
	}	
		/**	左补0	
		 * 
		 *  
		*/
		public static String leftFillZero(String str, int len) {
			if (str == null) {
				return null;
			}

			if (len <= str.length()) {
				return str;
			}

			while (str.length() < len) {
				str = "0".concat(str);
			}
			return str;
		}

	/**byte数组异或，
	 * @param bytes1,字节数组1
	 * @param byte2,字节数组2
	 * @param return，异或后的字节数组，如果bytes1或者bytes2为空，则返回null
	 * */
	public static byte[] XorBytes(byte[] bytes1, byte[] bytes2) {
		byte[] byteResult = null;

		if (bytes1 == null || bytes2 == null) {
			return null;
		}

		if (bytes1.length <= bytes2.length) {
			byteResult = new byte[bytes1.length];
		} else {
			byteResult = new byte[bytes2.length];
		}

		for (int i = 0; i < bytes1.length && i < bytes2.length; i++) {
			byteResult[i] = (byte) ((bytes1[i] ^ bytes2[i]) & 0x000000FF);
		}
		return byteResult;
	}
	
	public static byte[] hexStringToBytes(String hex){
		if(hex == null || hex.equals("")){
			return null;
		}
		hex = hex.toUpperCase();
		int length = hex.length()/2;
		char hexChars[] = hex.toCharArray();
		byte[] d = new byte[length];
		for(int i = 0; i<length; i++){
			int pos = i*2;
			d[i] = (byte)(charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos+1]));
		}
		return d;
	}
	
	public static byte charToByte(char c){
		return (byte)"0123456789ABCDEF".indexOf(c);
	}
	
	public static void main(String args[]){
		try {
			String s = new String(hexStringToBytes("D0BEC6ACBFA8"));
		System.out.println(s);
	}
	 catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}}
}
