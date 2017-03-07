package com.cairenhui.tools;

import cn.org.rapid_framework.util.DateConvertUtils;


public class DateUtils {

	/*private static ApplicationContext applicationContext;  
    
    implements ApplicationContextAware
    
    @Override  
    public void setApplicationContext(ApplicationContext context)  
        throws BeansException {  
        DateUtils.applicationContext = context;  
    }  
    public static Object getBean(String name){  
        return applicationContext.getBean(name);  
    }*/  
	
	public static String date2String(java.util.Date date,String dateFormat) {
		return DateConvertUtils.format(date,dateFormat);
	}
	
	public static <T extends java.util.Date> T string2Date(String dateString,String dateFormat,Class<T> targetResultType) {
		return DateConvertUtils.parse(dateString,dateFormat,targetResultType);
	}
}
