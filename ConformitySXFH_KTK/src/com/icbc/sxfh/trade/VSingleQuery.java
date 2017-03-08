package com.icbc.sxfh.trade;

import com.icbc.sxfh.util.VBiceWork;

/**
 * ����ϸ��¼��ѯ��ֱ�Ӵ����ͽ��� 
 */
public abstract class VSingleQuery extends VBiceWork{
	 
	/**�麯��������ʵ�֣� ȡ��ϸ���ݵ��ֶ���*/
	protected abstract int getDetailColCount();
	
	/**�麯��������ʵ�֣�������ϸ*/
	protected abstract void setDetails(String[] arr);
	
	
	/**
	 * �����麯��������Ҫ�������жϣ��ٽ����ݴ���ҵ����
	 */
	protected void setFromBiceBody(String[] arr){ 
		int i_count = this.getDetailColCount();//ȡ��ϸ���ֶ���,����ʵ�� 
		if (arr==null || arr.length<i_count){ 
	 		super.setErrMessage("��ϸ�ֶ�������"); //��ϸ�ֶ�������
	 		return;
		}
		this.setDetails(arr);
	} 
}
