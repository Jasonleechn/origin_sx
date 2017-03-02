<%@page import="com.icbc.conformity.context.MySessionContext"%>
<%@page import="java.util.ArrayList"%>
<%@page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<%
String current_session = session.getId();
request.setAttribute("c_sessionId",current_session);
ArrayList<String> list = MySessionContext.getPeoples();
String people = MySessionContext.getPeopleCount()+"";
String count = MySessionContext.getTotalCount()+"";
%>