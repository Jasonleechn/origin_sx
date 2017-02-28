package com.icbc.wap.tags.ui;

import com.icbc.ebdp.tags.ui.UISimpleBaseTag;

public class PopPanelTag extends UISimpleBaseTag {


	/**
	 * 
	 */
	private static final long serialVersionUID = 7548285248172714050L;
	private static final int MAXBUTTONNUM = 5;
	/**
	 * 对应JS对象类名
	 */
	private static final String JS_CLASS = "PopPanel";
	
	private String closeButtonText = "";
	private String buttonText = "";
	private String eventClick = "";
	private String clickAttachData = "";
	
	
	/**
	 * 构造方法
	 */
	public PopPanelTag() {
		jsClass = JS_CLASS;
	}
	
	protected void appendTag(StringBuffer arg0) {
		buffer.append("<div class=\"ebdp-android-poppanel-content\" id=\"").append(id).append("\">\n");
		buffer.append("<div class=\"ebdp-android-poppanel-content-inside\">\n");
		for(int i=0;i<MAXBUTTONNUM;i++){
			buffer.append("<div class=\"ebdp-android-poppanel-buttoncontent\" id=\"").append(id).append("-buttoncontent"+i+"\">\n");
			buffer.append("<div class=\"ebdp-android-poppanel-normalbutton\" id=\"").append(id).append("-button"+i+"\">\n");
			buffer.append("</div>\n");
			buffer.append("</div>\n");
		}
		buffer.append("<div class=\"ebdp-android-poppanel-closebuttoncontent\">\n");
		buffer.append("<div class=\"ebdp-android-poppanel-closebutton\" id=\"").append(id).append("-closebutton\">\n");
		buffer.append(getCloseButtonText());	
		buffer.append("</div>\n");	
		buffer.append("</div>\n");	
		buffer.append("</div>\n");	
		buffer.append("</div>\n");	
	}
	
    protected void appendUIScriptAttributes(StringBuffer buffer) {
    	super.appendUIScriptAttributes(buffer);
    	appendScriptAttribute(buffer, "buttonText", getButtonText());
    	if(getEventClick()!=null&&!getEventClick().equals("")&&getClickAttachData()!=null&&!getClickAttachData().equals("")){
    		appendScriptHandler(buffer, "eventClick", getEventClick()+","+getClickAttachData());
    	}else if(getEventClick()!=null&&!getEventClick().equals("")){
    		appendScriptHandler(buffer, "eventClick", getEventClick());
    	}else{
    		appendScriptHandler(buffer, "eventClick", "");
    	}
    }

	public String getCloseButtonText() {
		if(closeButtonText.equals("")){
			return "&#x5173;&#x95ED;";
		}else{
			return closeButtonText;	
		}
	}

	public void setCloseButtonText(String closeButtonText) {
		this.closeButtonText = closeButtonText;
	}



	public String getClickAttachData() {
		return clickAttachData;
	}

	public void setClickAttachData(String clickAttachData) {
		this.clickAttachData = clickAttachData;
	}

	public String getButtonText() {
		return buttonText;
	}

	public void setButtonText(String buttonText) {
		this.buttonText = buttonText;
	}

	public String getEventClick() {
		return eventClick;
	}

	public void setEventClick(String eventClick) {
		this.eventClick = eventClick;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public static String getJsClass() {
		return JS_CLASS;
	}
}
