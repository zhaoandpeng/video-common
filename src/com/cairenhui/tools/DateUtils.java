package com.cairenhui.tools;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

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
	
	public static Date getNowDate() {
		   Date currentTime = new Date();
		   SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   String dateString = formatter.format(currentTime);
		   Date currentTime_2 = null;
		   try {
			   currentTime_2 = formatter.parse(dateString);
		   } catch (ParseException e) {
			   e.printStackTrace();
		   }
		   return currentTime_2;
	}
}
