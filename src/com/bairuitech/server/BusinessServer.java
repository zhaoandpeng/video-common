package com.bairuitech.server;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bairuitech.anychat.AnyChatServerEvent;
import com.bairuitech.anychat.AnyChatServerSDK;
import com.bairuitech.anychat.AnyChatVerifyUserOutParam;
import com.cairenhui.action.VideoBusinessAction;
import com.cairenhui.model.FileStoreModel;
import com.cairenhui.model.VideoModel;
import com.cairenhui.service.VideoBusinessService;
import com.cairenhui.service.VideoFileStoreService;
import com.cairenhui.tools.DateUtils;
import com.cairenhui.tools.VideoConstant;

/**
 * ---- Business Server【业务服务】
 */
@Component
public class BusinessServer implements AnyChatServerEvent{
	
	@Autowired
	private static VideoBusinessService videoBusinessService;
	
	@Autowired
	private static VideoFileStoreService videoFileStoreService;
	
	private static  Log log = LogFactory.getLog(BusinessServer.class); 
	
	public static AnyChatServerSDK anychat;//核心对象
	
	public static List<Integer> onlineusers = new ArrayList<Integer>();//正式在线用户【占用授权】
	
	@SuppressWarnings("rawtypes")
	public static Map<Integer, List> roomListUser = new HashMap<Integer, List>(); //房间人数管理
	
	public static int userid = 1;//坐席和客户初始化id
	
	public static int businessVideoType;//视频单双向标识
	
	public static String USERTYPE;
	
	public static String USERFLAG = "U";
	
	public static String EMPUSERFLAG = "E";
	
	public static void main(String[] args) {
		String str = "USER100000";
		str = str.substring(0,str.length()-1);
		System.out.println(str);
		/*List list = new ArrayList();
		System.out.println(list.size());*/
	}
	
	
	/*FIRST*/
	public void initSystem() {
		anychat = new AnyChatServerSDK();//实例化对象
		anychat.SetServerEvent(new BusinessServer());//设置该页面所有事件回调
		anychat.InitSDK(0);
		//anychat.SetTimerEventCallBack(VideoConstant.MINUTES.getValue());//定时任务触发器
		anychat.RegisterVerifyUserClass(new AnyChatVerifyUserOutParam());
		log.info(getCurrentTime()+":CAIRENHUI_COMPANY_COPYRIGHT@WELCOME USE ANYCHAT!"+anychat.GetSDKVersion());
	}
	
	/*获取当前时间*/
	public static String getCurrentTime() {
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat tm = new SimpleDateFormat("MM-dd HH:mm:ss:SSS");
		String strTime = "";
		try {
			strTime = tm.format(date) + "\t";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return strTime;
	}
	
	@Override
	public void OnAnyChatServerAppMessageExCallBack(int dwNotifyMessage,int wParam, int lParam) {
		if(AnyChatServerSDK.BRAS_MESSAGE_CORESERVERCONN==dwNotifyMessage){
			if(wParam==0){
				log.info(getCurrentTime() + ":SUCCESS CONNECTED WITH ANYCHATCORESERVER...");
			}else{
				log.info(getCurrentTime() + ":DISCONNECTED FROM THE ANYCHATCORESERVER, ERRORCODE:" + wParam + "\r\n");
			}
			onlineusers.clear();
		}else if(AnyChatServerSDK.BRAS_MESSAGE_RECORDSERVERCONN==dwNotifyMessage){
			if(wParam==0){
				log.info(getCurrentTime() + ":SUCCESS CONNECTED WITH ANYCHATRECORDSERVER(ID:" + lParam + ")...");
				log.info(getCurrentTime() + ":>>>>>>>>>>>>>>>>>>>业务服务已启动<<<<<<<<<<<<<<<<<<<<");
			}else{
				log.info(getCurrentTime() + ":DISCONNECTED FROM THE ANYCHATRECORDSERVER, ERRORCODE:" + wParam + "\r\n");
			}
		}else{
			log.info(getCurrentTime() + ":DISCONNECTED FROM THE ANYCHATRECORDSERVER AND ANYCHATCORESERVER, ERRORCODE:" + wParam + "\r\n");
		}
		
	}

	@Override
	public int OnAnyChatVerifyUserCallBack(String szUserName,String szPassword, AnyChatVerifyUserOutParam outParam) {
		if(VideoConstant.VIDEO_TYPE_SINGLE.equals(szPassword)){
			//单项视频
			businessVideoType = 1;
			log.info(getCurrentTime() + ":>>>>>>>>>>>>>>视频类型="+szPassword+"】<<<<<<<<<<<<<");
		}else{
			//双向视频
			businessVideoType = 2;
			log.info(getCurrentTime() + ":>>>>>>>>>>>>>>视频类型="+szPassword+"】<<<<<<<<<<<<<");
		}
		if (szUserName.indexOf(USERFLAG)>-1) {//用户
			USERTYPE = "CUSTOMER";
			userid = Integer.valueOf(szUserName.substring(1));
			outParam.SetUserId(userid);
			outParam.SetUserLevel(0);
			outParam.SetNickName(szUserName);
			System.out.print(getCurrentTime() + "OnVerifyUserCallBack: userid:" + userid + " username: " + szUserName + "\r\n");
			return 0;
		}else if (szUserName.indexOf(EMPUSERFLAG)>-1) {//客服
			USERTYPE = "EMPLOYEE";
			userid = Integer.valueOf(szUserName.substring(1));
			outParam.SetUserId(userid);
			outParam.SetUserLevel(1);
			outParam.SetNickName(szUserName);
			System.out.print(getCurrentTime() + "OnVerifyUserCallBack: userid:" + userid + " username: " + szUserName + "\r\n");
			return 0;
		}else {
			log.info("SZUSERNAME ERROR : NO 'USER' OR 'EMPUSER' IN SZUSERNAME.SZUSERNAME = "+szUserName);
			return 1;
		}
	}
	
	
	@Override
	public void OnAnyChatUserLoginActionCallBack(int dwUserId,String szUserName, int dwLevel, String szIpAddr) {
		log.info(getCurrentTime() + ":>>>>>>>>>>>>>>用户信息【ID="+dwUserId+"NAME="+szUserName+"IP地址="+szIpAddr+"】<<<<<<<<<<<<<");
		if (szUserName.indexOf(USERFLAG)>-1) {//用户
			onlineusers.add(dwUserId);//在线客户统计
			//移除等待对列中用户的信息
			List<String> waittingusers = VideoBusinessAction.waittingusers;
			String userId = dwUserId+"";
			userId = userId.substring(1);
			if(waittingusers.contains(userId)){//判断对列中是否存在该用户 存在则先移除  不存在add
				Iterator <String> it = waittingusers.iterator();  
				while(it.hasNext()){  
					if(it.next().equals(userId)){  
						it.remove();  
					}  
				} 
			}
		}
	}
	
	@Override
	public void OnAnyChatTimerEventCallBack() {
		System.out.println("---------------------"+getCurrentTime());
	}



	@Override
	public void OnAnyChatUserLogoutActionExCallBack(int dwUserId,int dwErrorCode) {
		log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>返回码:"+dwErrorCode);
		Iterator <Integer> it = onlineusers.iterator();  //强制用户下线
		while(it.hasNext())  
		{  
		    if(it.next() == dwUserId)  
		    {  
		        it.remove();  
		    }  
		} 
		log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>在线用户数:"+onlineusers.size());
	}

	@Override
	@SuppressWarnings("unchecked")
	public int OnAnyChatPrepareEnterRoomCallBack(int dwUserId, int dwRoomId,String szRoomName, String szPassword) {
		if(!roomListUser.isEmpty()&&roomListUser.containsKey(dwRoomId)){
			if(roomListUser.get(dwRoomId).size()>=2){
				return VideoConstant.AC_ERROR_ROOM_FULLUSER.getValue();
			}else{
				roomListUser.get(dwRoomId).add(dwUserId);
			}
		}else{
			List<Integer> list = new ArrayList<Integer>();
			list.add(dwUserId);
			roomListUser.put(dwRoomId, list);
		}
		return 0;
	}
	
	@Override
	public void OnAnyChatUserEnterRoomActionCallBack(int dwUserId, int dwRoomId) {
		
		System.out.println("------"+dwUserId+"+++++++++"+dwRoomId);
		String bizType = dwRoomId+"";//业务类型标识【KH = 1,CP = 2,ZH = 3】
		bizType = bizType.substring(bizType.length()-1,bizType.length());
		int index = Integer.parseInt(bizType);
		switch (index) {
		case 1:
			bizType = "OPEN_ACCOUNT";
			break;
		case 2:
			bizType = "PURCHASE_PRODUCT";
			break;
		case 3:
			bizType = "RESET_PASSWORD";
			break;
		
		default:bizType = "OPEN_ACCOUNT";
			break;
		}
		if(USERTYPE.equals("CUSTOMER")){
			VideoModel videoModel = videoBusinessService.getObjectByBizId(dwUserId+"", bizType);
			if(null==videoModel){
				//创建数据库中视频订单记录
				videoModel = new VideoModel();
				videoModel.setBusinessId(dwUserId+"");
				videoModel.setBusinessType(bizType);
				videoModel.setBusinessVideoType(businessVideoType);//视频类型【单双向】
				videoModel.setVideoStatus("VALID");//视频可接通状态
				videoModel.setCreateTime(DateUtils.getNowDate());
				int nextId = videoBusinessService.insert(videoModel);
				System.out.println(">>>>>>>>>>>>>f返回主键为:"+nextId);
			}else{
				videoModel.setVideoStatus("VALID");//视频可接通状态
				videoModel.setCreateTime(DateUtils.getNowDate());
				videoBusinessService.update(videoModel);
			}
			log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+videoModel.toString());
		}else{
			log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>坐席进入房间");
			//坐席进入房间先更新视频的订单归属
			String businessId = dwRoomId+"";//业务类型标识【KH = 1,CP = 2,ZH = 3】
			businessId = businessId.substring(0,businessId.length()-1);
			VideoModel videoModel = videoBusinessService.getObjectByBizId(businessId, bizType);
			if(null!=videoModel){
				videoModel.setOpId(dwUserId+"");
				videoBusinessService.update(videoModel);
				log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>更新视频订单接听人员ID值");
			}
		}
		log.info(getCurrentTime() + "OnUserEnterRoomActionCallBack: userid:" + dwUserId + " roomid: " + dwRoomId);
	}

	@Override
	public void OnAnyChatUserLeaveRoomActionCallBack(int dwUserId, int dwRoomId) {
		//客户进入房间【由于数据原因,目前默认业务类型统一为开户】 注:roomId 一般不应该重复
		String bizType = dwRoomId+"";//业务类型标识【KH = 1,CP = 2,ZH = 3】
		bizType = bizType.substring(bizType.length()-1,bizType.length());
		int index = Integer.parseInt(bizType);
		switch (index) {
		
		case 1:
			bizType = "OPEN_ACCOUNT";
			break;
		case 2:
			bizType = "PURCHASE_PRODUCT";
			break;
		case 3:
			bizType = "RESET_PASSWORD";
			break;
		
		default:bizType = "OPEN_ACCOUNT";
			break;
		}
		roomListUser.remove(dwRoomId);//房间清场
		//TODO 更新相应的实体类
		String businessId = dwRoomId+"";//业务类型标识【KH = 1,CP = 2,ZH = 3】
		businessId = businessId.substring(0,businessId.length()-1);
		VideoModel videoModel = videoBusinessService.getObjectByBizId(businessId, bizType);
		if(null!=videoModel){
			videoModel.setVideoStatus("INVALID");//视频可接通状态
			videoModel.setEndTime(DateUtils.getNowDate());
			videoBusinessService.update(videoModel);//修改视频可接通状态
			log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>房间数:"+roomListUser.size());
		}
	}

	@Override
	public void OnAnyChatServerRecordExCallBack(int dwUserId,String szRecordFileName, int dwElapse, int dwFlags, int dwParam,String lpUserStr, int dwRecordServerId) {
		System.out.println(dwUserId+"||"+szRecordFileName+"||"+dwElapse+"||"+dwFlags+"||"+dwParam+"||"+lpUserStr+"||"+dwRecordServerId);
		FileStoreModel model = new FileStoreModel();
		String[] split = szRecordFileName.replaceAll("\\\\","/").split("/"); 
		if (split.length > 1&&szRecordFileName.indexOf(".mp4")!=-1) { 
			model.setBusinessId(dwParam+"");
			model.setCreateTime(DateUtils.getNowDate());
			model.setFileType("INTERVIEW_VIDEO");
			model.setFileUrl("/"+split[split.length - 2]+"/"+split[split.length - 1]);
		}else if(split.length > 1&&szRecordFileName.indexOf(".jpg")!=-1){
			String[] tempBizId = split[split.length - 1].split("-");
			model.setBusinessId(tempBizId[tempBizId.length - 2]);
			model.setCreateTime(DateUtils.getNowDate());
			model.setFileType("INTERVIEW_PHOTO");
			model.setFileUrl("/"+split[split.length - 2]+"/"+split[split.length - 1]);
		}
		if(szRecordFileName.indexOf("OPEN_ACCOUNT")!=-1){
			model.setBusinessType("OPEN_ACCOUNT");
		}else if(szRecordFileName.indexOf("PURCHASE_PRODUCT")!=-1){
			model.setBusinessType("PURCHASE_PRODUCT");
		}else if(szRecordFileName.indexOf("RESET_PASSWORD")!=-1){
			model.setBusinessType("RESET_PASSWORD");
		}
		int index = videoFileStoreService.insert(model);
		log.info("==================视频文件名:"+szRecordFileName);
	}
	
	@Override
	public void OnAnyChatTransFile(int dwUserId, String szFileName,String szTempFilePath, int dwFileLength, int wParam, int lParam,int dwTaskId) {
		
	}

	@Override
	public void OnAnyChatTransBuffer(int dwUserId, byte[] lpBuf, int dwLen) {
		
	}

	@Override
	public void OnAnyChatTransBufferEx(int dwUserId, byte[] lpBuf, int dwLen,
			int wParam, int lParam, int dwTaskId) {
		
	}

	@Override
	public void OnAnyChatSDKFilterData(int dwUserId, byte[] lpBuf, int dwLen) {
		
	}

	@Override
	public void OnAnyChatRecvUserTextMsgCallBack(int dwRoomId, int dwSrcUserId,
			int dwTarUserId, int bSecret, String szTextMessage, int dwLen) {
		
	}

	@Override
	public int OnAnyChatVideoCallEventCallBack(int dwEventType,
			int dwSrcUserId, int dwTarUserId, int dwErrorCode, int dwFlags,
			int dwParam, String lpUserStr) {
		return 0;
	}

	@Override
	public int OnAnyChatUserInfoCtrlCallBack(int dwSendUserId, int dwUserId,
			int dwCtrlCode, int wParam, int lParam, String lpStrValue) {
		return 0;
	}

	@Override
	public int OnAnyChatObjectEventCallBack(int dwObjectType, int dwObjectId,
			int dwEventType, int dwParam1, int dwParam2, int dwParam3,
			int dwParam4, String lpStrParam) {
		return 0;
	}
	
	@Resource
    public void setDataService(VideoBusinessService videoBusinessService) {
		BusinessServer.videoBusinessService = videoBusinessService;
    }
	
	public static VideoBusinessService getVideoBusinessService() {
        return videoBusinessService;
    }
	
	@Resource
    public void setDataService(VideoFileStoreService videoFileStoreService) {
		BusinessServer.videoFileStoreService = videoFileStoreService;
    }
	
	public static VideoFileStoreService getVideoFileStoreService() {
        return videoFileStoreService;
    }
}
