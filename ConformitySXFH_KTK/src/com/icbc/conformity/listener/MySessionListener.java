package com.icbc.conformity.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.icbc.conformity.context.MySessionContext;
/**
 * 
 * <p>后台监听
 * <p>项目启动时会依次执行Created和Destroyed
 * @author Jason.Lee on 2017年3月1日
 */
public class MySessionListener implements HttpSessionListener {
	
	@Override
	public void sessionCreated(HttpSessionEvent arg0) {
		MySessionContext.addSession(arg0.getSession());
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		MySessionContext.delSession(arg0.getSession());
	}

}
