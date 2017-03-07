package com.cairenhui.tools;


public enum VideoConstant {

	MINUTES(10000),//VALUE10000=10秒
	
	PIC_FRONT(100),//证件正面
	
	PIC_BACK(101), //证件反面
	
	PIC_BANK(102), //银行卡正面
	
	PIC_FACE(103), //客户正面
	
	VIDEO_TYPE_SINGLE(1000), //单向视频
	
	VIDEO_TYPE_TWOWAY(1001), //双向视频
	
	ACCESS_SOURCE_ANDROID(1005), //接入来源【安卓】
	
	ACCESS_SOURCE_IOS(1006), //接入来源【苹果】
	
	ACCESS_SOURCE_WEB(1007), //接入来源【web】
	
	BUSINESS_OPEN_ACCOUNT(1), //业务类型【开户】
	
	BUSINESS_FORGOT_PASSWORD(3), //业务类型【找回密码】
	
	BUSINESS_PURCHASE_PRODUCT(2),//业务类型【购买产品】
	
	/**********************错误参数定义***********************/
	
	AC_ERROR_ROOM_FULLUSER(302);
	
	
	private  int  code;
	
	private VideoConstant(int code) {
         
		this.code = code;
	}
	
	public int getValue() {  
        
		return this.code;  
    } 
}
