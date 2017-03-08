package com.icbc.sxfh.trade;

import com.icbc.sxfh.util.VBiceWork;

/**
 * 单明细记录查询或直接处理型交易 
 */
public abstract class VSingleQuery extends VBiceWork{
	 
	/**虚函数，子类实现， 取明细数据的字段数*/
	protected abstract int getDetailColCount();
	
	/**虚函数，子类实现，设置明细*/
	protected abstract void setDetails(String[] arr);
	
	
	/**
	 * 父类虚函数处理，主要做基本判断，再将数据传给业务类
	 */
	protected void setFromBiceBody(String[] arr){ 
		int i_count = this.getDetailColCount();//取明细的字段数,子类实现 
		if (arr==null || arr.length<i_count){ 
	 		super.setErrMessage("明细字段数不足"); //明细字段数不足
	 		return;
		}
		this.setDetails(arr);
	} 
}
