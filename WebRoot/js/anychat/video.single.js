$(function(){
	CheckPlugin();
	ServerInit();
	
	/*-----------录制视频事件开始-----------*/
	/*$(".btn-content").on('click','#begin_record',function(){
		var type;
		if(businessType==1){
			type = "OPEN_ACCOUNT";//开户
		}else if(businessType==2){
			type = "PURCHASE_PRODUCT";//购买CP
		}else{ 
			type = "RESET_PASSWORD";//密码ZH
		}
		$("#begin_record").attr({"disabled":"disabled"});
	    $("#end_record").removeAttr("disabled");
	    TimeStart();
	    var DateTime = new Date().format("yyyyMMdd-hhmmss-");
	    var FileName = DateTime+requestUserId+type;
	    BRAC_StreamRecordCtrlEx(-1,1,SERVERFLAG,requestUserId,'{"filename":"'+FileName+'"}' );
	})
	
	$(".btn-content").on('click','#end_record',function(){
		$("#end_record").attr({"disabled":"disabled"});
	    $("#begin_record").removeAttr("disabled");
	    TimeStop()
	    BRAC_StreamRecordCtrlEx(-1,0,SERVERFLAG,requestUserId,'' );
	})*/
	/*-----------录制视频事件结束-----------*/
	
	/*-----------视频拍照事件开始-----------*/
	/*$('.ui-video-photo').on('click', '.tab a', function(event) {
	      //免冠照片、身份证正面、身份证反面切换交互
	      $('.ui-video-photo .tab').find('a').removeClass('current');
	      $(this).addClass('current');
	      if($(this).hasClass('barehead')) {
	        //免冠照片显示
	        $('.photo-content').hide();
	        $('.photo-barehead').show();
	      } else if($(this).hasClass('front')) {
	        //身份证正面显示
	        $('.photo-content').hide();
	        $('.photo-front').show();
	      } else if($(this).hasClass('back')) {
	        //身份证反面显示
	        $('.photo-content').hide();
	        $('.photo-back').show();
	      } else if($(this).hasClass('license')){
	          $('.photo-content').hide();
	          $('.photo-license').show();
	      }
	});*/
	
	//免冠照片
	/*$(".photo-barehead").on('click',function(){
		var type;
		if(businessType==1){
			type = "OPEN_ACCOUNT";//开户
		}else if(businessType==2){
			type = "PURCHASE_PRODUCT";//购买CP
		}else{ 
			type = "RESET_PASSWORD";//密码ZH
		}
	    var DateTime = new Date().format("yyyyMMdd-hhmmss-");
	    var FileName = DateTime+"Barehead-"+requestUserId+"-"+type;
		BRAC_StreamRecordCtrlEx(requestUserId, 1, BRAC_RECORD_FLAGS_LOCALCB+BRAC_RECORD_FLAGS_SNAPSHOT+BRAC_RECORD_FLAGS_USERFILENAME+BRAC_RECORD_FLAGS_MULTISTREAM+BRAC_RECORD_FLAGS_SERVER, 0, '{"filename":"'+FileName+'"}');
	})
	//证件正面
	$(".photo-front").on('click',function(){
		var type;
		if(businessType==1){
			type = "OPEN_ACCOUNT";//开户
		}else if(businessType==2){
			type = "PURCHASE_PRODUCT";//购买CP
		}else{ 
			type = "RESET_PASSWORD";//密码ZH
		}
	    var DateTime = new Date().format("yyyyMMdd-hhmmss-");
	    var FileName = DateTime+"Front-"+requestUserId+"-"+type;
	    BRAC_StreamRecordCtrlEx(requestUserId, 1, BRAC_RECORD_FLAGS_LOCALCB+BRAC_RECORD_FLAGS_SNAPSHOT+BRAC_RECORD_FLAGS_USERFILENAME+BRAC_RECORD_FLAGS_MULTISTREAM+BRAC_RECORD_FLAGS_SERVER, 0, '{"filename":"'+FileName+'"}');
	})
	//证件反面
	$(".photo-back").on('click',function(){
		var type;
		if(businessType==1){
			type = "OPEN_ACCOUNT";//开户
		}else if(businessType==2){
			type = "PURCHASE_PRODUCT";//购买CP
		}else{ 
			type = "RESET_PASSWORD";//密码ZH
		}
	    var DateTime = new Date().format("yyyyMMdd-hhmmss-");
	    var FileName = DateTime+"Back-"+requestUserId+"-"+type;
	    BRAC_StreamRecordCtrlEx(requestUserId, 1, BRAC_RECORD_FLAGS_LOCALCB+BRAC_RECORD_FLAGS_SNAPSHOT+BRAC_RECORD_FLAGS_USERFILENAME+BRAC_RECORD_FLAGS_MULTISTREAM+BRAC_RECORD_FLAGS_SERVER, 0, '{"filename":"'+FileName+'"}');
	})
	//机构证件照
	$(".photo-license").on('click',function(){
		var type;
		if(businessType==1){
			type = "OPEN_ACCOUNT";//开户
		}else if(businessType==2){
			type = "PURCHASE_PRODUCT";//购买CP
		}else{ 
			type = "RESET_PASSWORD";//密码ZH
		}
	    var DateTime = new Date().format("yyyyMMdd-hhmmss-");
	    var FileName = DateTime+"License-"+requestUserId+"-"+type;
	    BRAC_StreamRecordCtrlEx(requestUserId, 1, BRAC_RECORD_FLAGS_LOCALCB+BRAC_RECORD_FLAGS_SNAPSHOT+BRAC_RECORD_FLAGS_USERFILENAME+BRAC_RECORD_FLAGS_MULTISTREAM+BRAC_RECORD_FLAGS_SERVER, 0, '{"filename":"'+FileName+'"}');
	})*/
	/*-----------视频拍照事件结束-----------*/
	
	/*$('.ui-video-info').on('click', '.sent-btn', function(event) {
	      var textmessage = $('.message').val();
	      if( textmessage != "") {
	        BRAC_SendTextMessage(-1,0,textmessage);
	      }
	});*/
})

function CheckPlugin(){
	    var NEED_ANYCHAT_APILEVEL = '0';
		var ERRORCODE = BRAC_InitSDK(NEED_ANYCHAT_APILEVEL);
		if (ERRORCODE == GV_ERR_PLUGINNOINSTALL) {
			window.open("../plugin/AnyChatWebSetup.exe");
		} else {
			return;
		}
}

function ServerInit(){
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