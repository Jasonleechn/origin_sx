<%@page import="com.icbc.conformity.context.MySessionContext"%>
<%@page import="com.icbc.conformity.context.CardInfo"%>
<%@page import="java.io.ByteArrayInputStream"%>
<%@page import="org.dom4j.*"%>
<%@page import="org.dom4j.io.*"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.ArrayList"%>
<%@page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<%
if(MySessionContext.Mode==MySessionContext.ModeType.Normal){
	String current_session = session.getId();
	request.setAttribute("c_sessionId",current_session);
	String sessionData=request.getParameter("ic2f_Name");
	//System.out.println(sessionData);
	//sessionData=new String(sessionData.getBytes("ISO-8859-1"),"GBK");
	SAXReader reader = new SAXReader();
	ByteArrayInputStream stream=new ByteArrayInputStream(sessionData.getBytes());
	Document document = reader.read(stream);
	Element root = document.getRootElement();
	HttpSession saveSession=MySessionContext.getSession(current_session);
	Element cardset = root.element("RegCardSet");
	Iterator cards = cardset.elementIterator("RegCardResult");
	ArrayList cardList = new ArrayList();
	ArrayList cardListAll = new ArrayList();
	ArrayList<CardInfo> mycards = new  ArrayList<CardInfo>();
	while(cards.hasNext()){
		Element card = (Element)cards.next();
		
		String cardNum = card.element("cardNum").getText();
		String acctType = card.element("acctType").getText();
		String areaCode = card.element("areaCode").getText();
		String currType = card.element("currType").getText();
		String netCode = card.element("netCode").getText();
		String regMode = card.element("regMode").getText();
		String cardState = card.element("cardState").getText();
		CardInfo c = new CardInfo(cardNum,acctType,areaCode,currType,netCode,regMode,cardState);
		mycards.add(c);
		cardListAll.add(cardNum);
		if("0".equals(regMode))
			cardList.add(cardNum);
	}
	saveSession.setAttribute("CRegCards",cardList);
	saveSession.setAttribute("CRegCardsAll",cardListAll);
	saveSession.setAttribute("CMyCards",mycards);
	saveSession.setAttribute("sessionData",sessionData);
	saveSession.setAttribute("CNcustName",root.element("CNcustName").getText());
	saveSession.setAttribute("loginId",root.element("loginId").getText());
	saveSession.setAttribute("custAuthenType",root.element("custAuthenType").getText());
	saveSession.setAttribute("mainAreaCode",root.element("mainAreaCode").getText());
	saveSession.setAttribute("mainCIS",root.element("mainCIS").getText());
	saveSession.setAttribute("regLogicNetCode", root.element("regLogicNetCode").getText());
}else{
	System.out.println("=====save_session.jsp=======");
	String current_session = session.getId();
	System.out.println("=====current_session=======");
	System.out.println(current_session);
	request.setAttribute("c_sessionId",current_session);
	String sessionData=request.getParameter("ic2f_Name");
	sessionData="<?xml  version=\"1.0\" encoding=\"GBK\" standalone=\"no\" ?><ICBCData><loginId>18012943698</loginId><CNcustName>滕篷鑫</CNcustName><ENcustName></ENcustName><RegCardSet><RegCardResult><cardNum>6222084301003479768</cardNum><acctType>011</acctType><areaCode>4301</areaCode><currType></currType><netCode>00165</netCode><cardState>0</cardState><cardAlias>KOUZI</cardAlias><regMode>0</regMode></RegCardResult><RegCardResult><cardNum>6222300412229182</cardNum><acctType>011</acctType><areaCode>1111</areaCode><currType></currType><netCode>00165</netCode><cardState>0</cardState><cardAlias>KOUZI</cardAlias><regMode>0</regMode></RegCardResult></RegCardSet><custAuthenType>2</custAuthenType><custLevel>1</custLevel><mainAreaCode>4301</mainAreaCode><regLogicNetCode>00165</regLogicNetCode><regType>0</regType><mainCIS>430100035799919</mainCIS><contractID>430100035799919</contractID><custAuthenNum>1000000990102277127</custAuthenNum><allSourceMountLimit>99999999999999999</allSourceMountLimit><WAPOptions.isBindMobile>3</WAPOptions.isBindMobile><quotaFlag>0</quotaFlag><singlequota>100000</singlequota><todayquota>500000</todayquota></ICBCData>";
	//sessionData="<?xml  version=\"1.0\" encoding=\"GBK\" standalone=\"no\" ?><ICBCData><loginId>18012943698</loginId><CNcustName>互奥</CNcustName><ENcustName></ENcustName><RegCardSet><RegCardResult><cardNum>6222081109001860209</cardNum><acctType>011</acctType><areaCode>1109</areaCode><currType></currType><netCode>6612</netCode><cardState>0</cardState><cardAlias>KOUZI</cardAlias><regMode>0</regMode></RegCardResult><RegCardResult><cardNum>6222300412229182</cardNum><acctType>011</acctType><areaCode>4301</areaCode><currType></currType><netCode>00165</netCode><cardState>0</cardState><cardAlias>KOUZI</cardAlias><regMode>0</regMode></RegCardResult></RegCardSet><custAuthenType>2</custAuthenType><custLevel>1</custLevel><mainAreaCode>1109</mainAreaCode><regLogicNetCode>00165</regLogicNetCode><regType>0</regType><mainCIS>110900005056074</mainCIS><contractID>430100035799919</contractID><custAuthenNum>1000000990102277127</custAuthenNum><allSourceMountLimit>99999999999999999</allSourceMountLimit><WAPOptions.isBindMobile>3</WAPOptions.isBindMobile><quotaFlag>0</quotaFlag><singlequota>100000</singlequota><todayquota>500000</todayquota></ICBCData>";
	System.out.println(sessionData);
	SAXReader reader = new SAXReader();
	ByteArrayInputStream stream=new ByteArrayInputStream(sessionData.getBytes());
	Document document = reader.read(stream);
	Element root = document.getRootElement();
	HttpSession saveSession=MySessionContext.getSession(current_session);
	//HttpSession saveSession = request.getSession();
	System.out.println("========saveSession ID============");
	System.out.println(saveSession.getId());
	Element cardset = root.element("RegCardSet");
	Iterator cards = cardset.elementIterator("RegCardResult");
	ArrayList cardList = new ArrayList();
	ArrayList cardListAll = new ArrayList();
	ArrayList<CardInfo> mycards = new  ArrayList<CardInfo>();
	while(cards.hasNext()){
		System.out.println("=====读取XML========");
		Element card = (Element)cards.next();
		
		String cardNum = card.element("cardNum").getText();
		System.out.println(cardNum);
		String acctType = card.element("acctType").getText();
		String areaCode = card.element("areaCode").getText();
		String currType = card.element("currType").getText();
		String netCode = card.element("netCode").getText();
		String regMode = card.element("regMode").getText();
		String cardState = card.element("cardState").getText();
		CardInfo c = new CardInfo(cardNum,acctType,areaCode,currType,netCode,regMode,cardState);
		mycards.add(c);
		cardListAll.add(cardNum);
		if("0".equals(regMode))
			cardList.add(cardNum);
	}
	saveSession.setAttribute("CRegCards",cardList);
	saveSession.setAttribute("CRegCardsAll",cardListAll);
	saveSession.setAttribute("CMyCards",mycards);
	saveSession.setAttribute("sessionData",sessionData);
	saveSession.setAttribute("CNcustName",root.element("CNcustName").getText());
	saveSession.setAttribute("loginId",root.element("loginId").getText());
	saveSession.setAttribute("custAuthenType",root.element("custAuthenType").getText());
	saveSession.setAttribute("mainAreaCode",root.element("mainAreaCode").getText());
	saveSession.setAttribute("mainCIS",root.element("mainCIS").getText());
	saveSession.setAttribute("regLogicNetCode", root.element("regLogicNetCode").getText());
}
%>