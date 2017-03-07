package com.cairenhui.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bairuitech.server.BusinessServer;
import com.cairenhui.model.VideoModel;
import com.cairenhui.service.VideoBusinessService;
import com.cairenhui.tools.VideoConstant;

@Controller
@Component
@RequestMapping(value = "/videoBusiness")
public class VideoBusinessAction extends BaseVideoAction{
	
	private static  Log log = LogFactory.getLog(VideoBusinessAction.class); 
	
	public static List<String> waittingusers = new ArrayList<String>();//在线等待用户【未占用授权】
	
	@Autowired
	BusinessServer businessServer;
	
	@Autowired
	VideoBusinessService videoBusinessService;
	
	@RequestMapping(value="/queryOnlineUser")
	@ResponseBody
	public Map<String,Object> result(HttpServletRequest request){
		String flowControlBizId = request.getParameter("flowControlBizId");//业务主键
		resultMap = new HashMap<String, Object>();
		int onlineUser = businessServer.onlineusers.size();//正式登录视频之后的队列
		if(onlineUser<10){
			resultMap.put("IsLogin", true);//返回标识告诉前端用户可以登录
		}else{
			int index = waittingusers.indexOf(flowControlBizId)+1;
			resultMap.put("IsLogin", false);//返回标识告诉前端用户不可以登录并且返回当前用户排在对列之前的人数
			resultMap.put("OnlineUser", index);
		}
		return resultMap;
	}
	
	@RequestMapping(value="/view")
	public String view(Model model,HttpServletRequest request){
		String bizType = request.getParameter("bizType");//业务类型
		log.info("业务类型为>>>>>>>>>>>>>>>>>>>>>:"+bizType);
		String videoValidCount = request.getParameter("videoValidCount");//有效授权数量
		log.info("有效授权数量>>>>>>>>>>>>>>>>>>>>>:"+videoValidCount);
		String flowControlBizId = request.getParameter("flowControlBizId");//业务主键
		log.info("业务主键为>>>>>>>>>>>>>>>>>>>>>:"+flowControlBizId);
//		String singleOrdouble = request.getParameter("singleOrdouble");//获取单双向标识
		int singleOrdouble = VideoConstant.VIDEO_TYPE_TWOWAY.getValue();
		int onlineUser = BusinessServer.onlineusers.size();//正式登录视频之后的队列
		log.info("当前在线用户人数为>>>>>>>>>>>>>>>>>>>>>:"+onlineUser);
		if(onlineUser==Integer.valueOf(videoValidCount)){//读取授权配置的数量   当授权数量使用完毕将后续用户加入等待队列中
			if(waittingusers.contains(flowControlBizId)){//判断对列中是否存在该用户 存在则先移除  不存在add
				Iterator <String> it = waittingusers.iterator();  
				while(it.hasNext()){  
					if(it.next().equals(flowControlBizId)){  
						it.remove();  
					}  
				} 
			}
			waittingusers.add(flowControlBizId);//将客户加入等待队列中
		}
		model.addAttribute("singleOrdouble", singleOrdouble);//单双向标识根据请求该页面所传过来的参数进行判断【默认双向】
		model.addAttribute("flowControlBizId", flowControlBizId);//业务主键
		model.addAttribute("bizType", bizType);//业务类型
		return "videoFrontView";
	}

	@RequestMapping(value="/videoBackView")
	public String videoBackView(Model model,HttpServletRequest request){
		return "videoBackView";
	}
	
	@RequestMapping(value="/videoFrontSingle")
	public String videoFrontSingle(Model model,HttpServletRequest request){
		String bizType = request.getParameter("bizType");//业务类型
		String flowControlBizId = request.getParameter("flowControlBizId");//业务主键
		int singleOrdouble = VideoConstant.VIDEO_TYPE_SINGLE.getValue();
		model.addAttribute("singleOrdouble", singleOrdouble);//单双向标识根据请求该页面所传过来的参数进行判断【默认双向】
		model.addAttribute("flowControlBizId", flowControlBizId);//业务主键
		model.addAttribute("bizType", bizType);//业务类型
		return "videoFrontSingle";
	}
	
	
	
	public static void main(String[] args) {
		List<String> b = new ArrayList<String>();
		b.add("1");b.add("2");b.add("3");b.add("4");b.add("5");
		String index = "U10000";
		
//		int index = b.indexOf("1")+1; 
		System.out.println(index.substring(1));
	}
}
