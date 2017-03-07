// AnyChat for Web SDK

/********************************************
 *				事件回调部分				*
 *******************************************/
 // 异步消息通知，包括连接服务器、登录系统、进入房间等消息
function OnAnyChatNotifyMessage(dwNotifyMsg, wParam, lParam) {
	switch(dwNotifyMsg) {
		case WM_GV_CONNECT:			OnAnyChatConnect(wParam, lParam);			break;
		case WM_GV_LOGINSYSTEM:		OnAnyChatLoginSystem(wParam, lParam);		break;
		case WM_GV_ENTERROOM:		OnAnyChatEnterRoom(wParam, lParam);			break;
		case WM_GV_ONLINEUSER:		OnAnyChatRoomOnlineUser(wParam, lParam);	break;
		case WM_GV_USERATROOM:		OnAnyChatUserAtRoom(wParam, lParam);		break;
		case WM_GV_LINKCLOSE:		OnAnyChatLinkClose(wParam, lParam);			break;
		case WM_GV_MICSTATECHANGE:	OnAnyChatMicStateChange(wParam, lParam);	break;
		case WM_GV_CAMERASTATE:		OnAnyChatCameraStateChange(wParam, lParam);	break;
		case WM_GV_P2PCONNECTSTATE:	OnAnyChatP2PConnectState(wParam, lParam);	break;
		case WM_GV_PRIVATEREQUEST:	OnAnyChatPrivateRequest(wParam, lParam);	break;
		case WM_GV_PRIVATEECHO:		OnAnyChatPrivateEcho(wParam, lParam);		break;
		case WM_GV_PRIVATEEXIT:		OnAnyChatPrivateExit(wParam, lParam);		break;
		case WM_GV_USERINFOUPDATE:	OnAnyChatUserInfoUpdate(wParam, lParam);	break;
		case WM_GV_FRIENDSTATUS:	OnAnyChatFriendStatus(wParam, lParam);		break;
		case WM_GV_VIDEOSIZECHG:	OnAnyChatVideoSizeChange(wParam, lParam);	break;
		default:
			break;
	}
}

// 收到文字消息
function OnAnyChatTextMessage(dwFromUserId, dwToUserId, bSecret, lpMsgBuf, dwLen) {
	
}

// 收到透明通道传输数据
function OnAnyChatTransBuffer(dwUserId, lpBuf, dwLen) {

}

// 收到透明通道（扩展）传输数据
function OnAnyChatTransBufferEx(dwUserId, lpBuf, dwLen, wParam, lParam, dwTaskId) {

}

// 文件传输完成通知
function OnAnyChatTransFile(dwUserId, lpFileName, lpTempFilePath, dwFileLength, wParam, lParam, dwTaskId) {

}

// 系统音量改变通知
function OnAnyChatVolumeChange(device, dwCurrentVolume) {

}

// 收到服务器发送的SDK Filter数据
function OnAnyChatSDKFilterData(lpBuf, dwLen) {
	
}

// 收到录像或拍照完成事件 (bRecordType:0代表拍照  1代表录制视频  lpFileName表示返回的文件名)
function OnAnyChatRecordSnapShot(dwUserId, lpFileName, dwParam, bRecordType) {
	
}

// 收到录像或拍照完成事件（扩展）
function OnAnyChatRecordSnapShotEx(dwUserId, lpFileName, dwElapse, dwFlags, dwParam, lpUserStr) {
	if(lpFileName.indexOf("Barehead")>-1){
		//免冠照片
		$(".photo.barehead").attr("src",serverIpAndPort+"/store/"+lpFileName);
	}else if(lpFileName.indexOf("Front")>-1){
		//证件正面
		$(".photo.front").attr("src",serverIpAndPort+"/store/"+lpFileName);
	}else if(lpFileName.indexOf("Back")>-1){
		//证件反面
		$(".photo.back").attr("src",serverIpAndPort+"/store/"+lpFileName);
	}else if(lpFileName.indexOf("License")>-1){
		//机构证件照
		$(".photo.license").attr("src",serverIpAndPort+"/store/"+lpFileName);
	}
}


/********************************************
 *		AnyChat SDK核心业务流程				*
 *******************************************/
 
// 客户端连接服务器，bSuccess表示是否连接成功，errorcode表示出错代码
function OnAnyChatConnect(bSuccess, errorcode) {
	if (errorcode == 0) {
		BRAC_Login("E"+EmpNo, 1001, 0);
    }else {
		alert("连接服务器失败,请稍后连接!");
		BRAC_Logout();
    }
}

// 客户端登录系统，dwUserId表示自己的用户ID号，errorcode表示登录结果：0 成功，否则为出错代码，参考出错代码定义
function OnAnyChatLoginSystem(dwUserId, errorcode) {
	if(errorcode == 0){
		 mSelfUserId = dwUserId;
		 if(businessType=="OPEN_ACCOUNT"){
			 businessType = 1;//开户
		 }else if(businessType=="PURCHASE_PRODUCT"){
			 businessType = 2;//购买CP
		 }else{
			 businessType = 3;//密码ZH
		 }
		 BRAC_EnterRoom(bizId+businessType, "", "employee");
	}
  
}

// 客户端进入房间，dwRoomId表示所进入房间的ID号，errorcode表示是否进入房间：0成功进入，否则为出错代码
function OnAnyChatEnterRoom(dwRoomId,errorcode) {
//	queryNetStatus()
	setInterval(function(){queryNetStatus()},5000);
}

function queryNetStatus(){
	var userNetVideo =  parseInt(BRAC_QueryUserStateInt(requestUserId, BRAC_USERSTATE_VIDEOBITRATE)/128);
	var userNetVoice = parseInt(BRAC_QueryUserStateInt(requestUserId, BRAC_USERSTATE_AUDIOBITRATE)/128);
	var empNetVideo = parseInt(BRAC_QueryUserStateInt(mSelfUserId, BRAC_USERSTATE_VIDEOBITRATE)/128);
	var empNetVoice = parseInt(BRAC_QueryUserStateInt(mSelfUserId, BRAC_USERSTATE_AUDIOBITRATE)/128);
	$("#user-net-video").text(userNetVideo+"kb/s(视)");
	$("#user-net-voice").text(userNetVoice+"kb/s(音)");
	$("#emp-net-video").text(empNetVideo+"kb/s(视)");
	$("#emp-net-voice").text(empNetVoice+"kb/s(音)");
}

// 收到当前房间的在线用户信息，进入房间后触发一次，dwUserCount表示在线用户数（包含自己），dwRoomId表示房间ID
function OnAnyChatRoomOnlineUser(dwUserCount, dwRoomId) {
	if(dwUserCount == 1){
		RequestOtherMySelfVideo();
	}else if(dwUserCount > 1){
		var userList = BRAC_GetOnlineUser();
		for (var k=0; k<userList.length; k++) {
			requestUserId = userList[k];
			RequestOtherUserVideo(userList[k]);
			RequestOtherMySelfVideo();
			break;
		}
	}
}

// 打开指定用户的音视频
function RequestOtherUserVideo(userid) {
    BRAC_UserCameraControl(userid, 1);      // 请求对方视频
    BRAC_UserSpeakControl(userid, 1);       // 请求对方语音
    BRAC_SetVideoPos(userid, GetID("AnyChatRemoteVideoDiv"), "ANYCHAT_VIDEO_REMOTE");
}

// 打开用户自身的视频窗口
function RequestOtherMySelfVideo(){
	BRAC_UserCameraControl(mSelfUserId, 1); 	// 打开本地视频
    BRAC_UserSpeakControl(mSelfUserId, 1); 		// 打开本地语音
    BRAC_SetVideoPos(mSelfUserId, GetID("AnyChatLocalVideoDiv"), "ANYCHAT_VIDEO_LOCAL");
}

// 用户进入（离开）房间，dwUserId表示用户ID号，bEnterRoom表示该用户是进入（1）或离开（0）房间
function OnAnyChatUserAtRoom(dwUserId, bEnterRoom) {
	if(dwUserId!=mSelfUserId){
		if(bEnterRoom){
			mTargetUserId = dwUserId;
			RequestOtherUserVideo(dwUserId);
		}else{
			LoginOut()
		}
	}
}

function LoginOut(){
	//离开房间
	BRAC_LeaveRoom(mSelfUserId);
	//退出系统
	BRAC_Logout();
	//通知上层应用进行视频待接通列表页面的跳转
	LoadingVideoListView();
}

function LoadingVideoListView(){
	// 向目标源发送数据
	window.parent.postMessage({"url":"/video/videoWitnessList/"},'*');
}

function PostMessage(){
	if("Pass"==MessageIndexBack){
		BRAC_SendTextMessage(requestUserId,0,MessageIndexBack);
	}else if("NoPass"==MessageIndexBack){
		BRAC_SendTextMessage(requestUserId,0,MessageIndexBack);
	}
}

// 网络连接已关闭，该消息只有在客户端连接服务器成功之后，网络异常中断之时触发，reason表示连接断开的原因
function OnAnyChatLinkClose(reason, errorcode) {
	
}

// 用户的音频设备状态变化消息，dwUserId表示用户ID号，State表示该用户是否已打开音频采集设备（0：关闭，1：打开）
function OnAnyChatMicStateChange(dwUserId, State) {

}

// 用户摄像头状态发生变化，dwUserId表示用户ID号，State表示摄像头的当前状态（0：没有摄像头，1：有摄像头但没有打开，2：打开）
function OnAnyChatCameraStateChange(dwUserId, State) {
	
}

// 本地用户与其它用户的P2P网络连接状态发生变化，dwUserId表示其它用户ID号，State表示本地用户与其它用户的当前P2P网络连接状态（0：没有连接，1：仅TCP连接，2：仅UDP连接，3：TCP与UDP连接）
function OnAnyChatP2PConnectState(dwUserId, State) {

}

// 用户发起私聊请求，dwUserId表示发起者的用户ID号，dwRequestId表示私聊请求编号，标识该请求
function OnAnyChatPrivateRequest(dwUserId, dwRequestId) {

}

// 用户回复私聊请求，dwUserId表示回复者的用户ID号，errorcode为出错代码
function OnAnyChatPrivateEcho(dwUserId, errorcode) {

}

// 用户退出私聊，dwUserId表示退出者的用户ID号，errorcode为出错代码
function OnAnyChatPrivateExit(dwUserId, errorcode) {

}

// 视频通话消息通知回调函数
function OnAnyChatVideoCallEvent(dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr) {
	
}

// 用户信息更新通知，dwUserId表示用户ID号，dwType表示更新类别
function OnAnyChatUserInfoUpdate(dwUserId, dwType) {
}

// 好友在线状态变化，dwUserId表示好友用户ID号，dwStatus表示用户的当前活动状态：0 离线， 1 上线
function OnAnyChatFriendStatus(dwUserId, dwStatus) {
	
}

// 用户视频分辩率发生变化，dwUserId（INT）表示用户ID号，dwResolution（INT）表示用户的视频分辨率组合值（低16位表示宽度，高16位表示高度）
function OnAnyChatVideoSizeChange(dwUserId,dwResolution){

}

function GetID(str){
	return document.getElementById(str);
}

