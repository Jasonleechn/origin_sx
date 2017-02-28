package com.icbc.wap.tags.ui;

import com.icbc.ebdp.tags.ui.CircularButtonTag;
import com.icbc.ebdp.tags.ui.UISimpleBaseTag;

public class RoundButtonTag extends UISimpleBaseTag {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1779284146199468338L;
	/**
	 * 对应JS对象类名
	 */
	private static final String JS_CLASS = "RoundButton";
	/**
	 * 按钮click事件回调函数
	 */
	private String eventClick = "";
	
	/**
	 * 事件传入数据对象
	 */
	private String attachData = "";
	/**
	 * 按钮颜色类型
	 */
	private String colorType = "";
	/**
	 * 按钮标志类型
	 */
	private String markType = "";
	/**
	 * 按钮文字
	 */
	private String text = "";
	/**
	 * 构造方法
	 */
	public RoundButtonTag() {
		jsClass = JS_CLASS;
	}
	
	protected void appendTag(StringBuffer arg0) {
		buffer.append("<div class=\"ebdp-android-roundbutton ebdp-android-roundbutton-color-"+getColorType()+"\" id=\"").append(id).append("\">\n");
		buffer.append("<div class=\"ebdp-android-roundbutton-content ebdp-android-roundbutton-content-"+getMarkType()+"\">\n");
		if(!"".equals(text)){
			buffer.append("<div class=\"ebdp-android-roundbutton-mark-text\">");
			buffer.append(text);
			buffer.append("</div>\n");	
		}else{
			buffer.append("<div class=\"ebdp-android-roundbutton-mark ebdp-android-roundbutton-mark-"+getMarkType()+"\">");			
			buffer.append("</div>\n");	
		}
		buffer.append("</div>\n");	
		buffer.append("</div>\n");	
	}
	
    protected void appendUIScriptAttributes(StringBuffer buffer) {
    	super.appendUIScriptAttributes(buffer);
    	appendScriptAttribute(buffer, "colorType", getColorType());
    	appendScriptAttribute(buffer, "markType", getMarkType());
    	appendScriptHandler(buffer, "eventClick", getEventClick());
    	appendScriptAttribute(buffer, "eventData", getAttachData());
    }

	public String getEventClick() {
		return eventClick;
	}

	public void setEventClick(String eventClick) {
		this.eventClick = eventClick;
	}

	public String getAttachData() {
		return attachData;
	}

	public void setAttachData(String attachData) {
		this.attachData = attachData;
	}

	public String getColorType() {
		return colorType;
	}

	public void setColorType(String colorType) {
		this.colorType = colorType;
	}

	public String getMarkType() {
		return markType;
	}

	public void setMarkType(String markType) {
		this.markType = markType;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getText() {
		return text;
	}



}
