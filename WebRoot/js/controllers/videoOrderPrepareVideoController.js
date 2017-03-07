define(["tool/Utils", "view/videoOrderPrepareVideoView"], function (utils, view) {
  function bindEvents() {
    var bindings = [{
    				  "element":".reTest",
			          "event": "click",
			          "handler": reTest
    				}
    ];
    utils.bindEvents(bindings);
  }

  function init() {
	dataInit();
    checkPlugin()
    checkEquipment(getDevices());
    bindEvents();
  }

  
  /*******************************************初始化视频服务器参数*********************************/
  function dataInit(){
	  $(".video-coffee").hide();
	  $(".recording").hide();
	  flowControlBizId = $(".flowControlBizId").val();
	  singleOrdouble = $(".singleOrdouble").val();
	  //设置业务类型
	  bizType = $(".bizType").val();
	  if(bizType=="OPEN_ACCOUNT"){
		  bizType = 1;//开户
	  }else if(bizType=="PURCHASE_PRODUCT"){
		  bizType = 2;//购买CP
	  }else{
		  bizType = 3;//密码ZH
	  }
  }
  
  function checkPlugin(){
	    var NEED_ANYCHAT_APILEVEL = '0';
		var ERRORCODE = BRAC_InitSDK(NEED_ANYCHAT_APILEVEL);
		if (ERRORCODE == GV_ERR_PLUGINNOINSTALL) {
			window.open("../plugin/AnyChatWebSetup.exe");
		} else {
			return;
		}
  }
  
  function getDevices() {
		if (!anychat) {
			return null;
		}
		var arr1 = BRAC_EnumDevices(1);
		var arr2 = BRAC_EnumDevices(2);
		var arr3 = BRAC_EnumDevices(3);
		return {
			cam : arr1.length,
			mic : arr2.length,
			speaker : arr3.length
		};
  }

  function checkEquipment(devices){
	  	if (devices == null) {
			return;
		}
		if (devices.cam == 0) {
			$("#cam").removeClass("equipmentOk").addClass("equipmentBad");
		}

		if (devices.speaker == 0) {
			$("#speaker").removeClass("equipmentOk").addClass("equipmentBad");
		}

		if (devices.mic == 0) {
			$("#mic").removeClass("equipmentOk").addClass("equipmentBad");
		}
		if(devices.cam == 0||devices.speaker == 0||devices.mic == 0){
			$("#equipmentModal").modal('show');
			
		} 
  }
  
  function reTest(){
	  location.reload(true);
  }
  
  function serverInit(){
	    BRAC_SetSDKOption(BRAC_SO_NETWORK_AUTORECONNECT, 0);//网络掉线自动重连
	  	BRAC_SetSDKOption(BRAC_SO_AUDIO_VADCTRL, 0);// 静音检测
		BRAC_SetSDKOption(BRAC_SO_NETWORK_P2PPOLITIC, 1);
		BRAC_SetSDKOption(BRAC_SO_AUDIO_ECHOCTRL, 1);// 回音消除
		BRAC_SetSDKOption(BRAC_SO_AUDIO_NSCTRL, 1);// 噪音抑制
		BRAC_SetSDKOption(BRAC_SO_AUDIO_AGCCTRL, 1);// 自动增益
		BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_WIDTHCTRL, 640);
	    BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_HEIGHTCTRL, 480);
	    BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_FPSCTRL, 15);
	    BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_GOPCTRL, 30);
	    BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_BITRATECTRL, 300000);
	    BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_CODECID, 1);
	    BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_QUALITYCTRL, 3);
	    BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_PRESETCTRL, 3);
	    BRAC_SetSDKOption(BRAC_SO_SNAPSHOT_TMPDIR, "E:\\store");
	    BRAC_SetSDKOption(BRAC_SO_LOCALVIDEO_APPLYPARAM, 1);//参数设置生效
  }
  
  var timer = setInterval(function(){
	  $.ajax({
			url: "/videoBusiness/queryOnlineUser.do",
			type: "POST",
			data:{"flowControlBizId":flowControlBizId},
			dataType:"json",
			success:function(data){
				if(data.IsLogin==true){  //可以登录
					BRAC_Connect(videoServerIp, videoServerPort);
					//TODO 跳转视频等待接通界面
					$(".theme-white").hide()
					$(".recording").show()
					clearInterval(timer);
				}else{	
					$(".waiting-num").text(data.OnlineUser);//更新排队人数
				}
			}
	  });
  },2000);
  
  return {
    init: init
  }
});
