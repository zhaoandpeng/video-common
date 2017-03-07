/**以下是对视频见证相关事件的处理**/

//--------------------------------------现场面签部分----------------------------------
//获取视频设备并选择对应设备进行图像显示
$(function(){
	CheckPlugin();
	ServerInit();
	/*-----------录制视频事件开始-----------*/
	$(".btn-content").on('click','#begin_record',function(){
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
	})
	/*-----------录制视频事件结束-----------*/
	
	/*-----------视频拍照事件开始-----------*/
	$('.ui-video-photo').on('click', '.tab a', function(event) {
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
	});
	
	//免冠照片
	$(".photo-barehead").on('click',function(){
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
	})
	/*-----------视频拍照事件结束-----------*/
	
	$('.ui-video-info').on('click', '.sent-btn', function(event) {
	      var textmessage = $('.message').val();
	      if( textmessage != "") {
	        BRAC_SendTextMessage(-1,0,textmessage);
	      }
	});
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

function TimeStart() {
	var HH = 0;var mm = 0;var ss = 0;var str = "";
	timer = setInterval(function(){
		str = "";
		if(++ss==60){
			if(++mm==60){
				HH++;
				mm=0;
			}
			ss=0;
		}
		str+=HH<10?"0"+HH:HH;
		str+=":";
		str+=mm<10?"0"+mm:mm;
		str+=":";
		str+=ss<10?"0"+ss:ss;
		document.getElementById("time").innerHTML = str;
	},1000);
}

function TimeStop() {
    clearInterval(timer);
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
    $("#end_record").attr({"disabled":"disabled"});
}

























function getVideoDevice(){
	CAMERA_COUNT = BRAC_EnumDevices(1);
	for(i=0;i<CAMERA_COUNT.length;i++){
		$("#selectone").append('<li role="presentation"><a role="menuitem" tabindex="-1">'+CAMERA_COUNT[i]+'</a>');
		$("#selecttwo").append('<li role="presentation"><a role="menuitem" tabindex="-1">'+CAMERA_COUNT[i]+'</a>');
		if(i==0){
			$("#selectOneValue").text(CAMERA_COUNT[0]);
			BRAC_SetUserStreamInfo(mSelfUserId, i, BRAC_SO_LOCALVIDEO_DEVICENAME,CAMERA_COUNT[i]);
			BRAC_SetVideoPosEx(mSelfUserId, GetID("customer"), "AnyChatLocalVideoDiv"+i,i);// 
			BRAC_UserCameraControlEx(mSelfUserId,1,i,0, "");
			BRAC_UserSpeakControl(mSelfUserId, 1);
			$(".selectOne").attr("value",CAMERA_COUNT[0]);
		}else if(i==1){
			$("#selectTwoValue").text(CAMERA_COUNT[1]);
			BRAC_SetUserStreamInfo(mSelfUserId, i, BRAC_SO_LOCALVIDEO_DEVICENAME,CAMERA_COUNT[i]);
			BRAC_SetVideoPosEx(mSelfUserId, GetID("service"), "AnyChatLocalVideoDiv"+i,i);// 
			BRAC_UserCameraControlEx(mSelfUserId,1,i,0, "");
			BRAC_UserSpeakControl(mSelfUserId, 1);
			$(".selectTwo").attr("value",CAMERA_COUNT[1]);
		}
	}
	var dataJson = JSON.stringify(CAMERA_COUNT);
	$.ajax({  
        url : "/myInfo/saveUserCamera.do",  
        async : false, // 注意此处需要同步
        type : "POST",  
        data: {"dataJson":dataJson},  
    });
}

function freshCameraIndex(deviceCustomerNowText,deviceServiceNowText,CAMERA_COUNT,id){
	var NewCamera;
	if(CAMERA_COUNT.length==2&&deviceCustomerNowText==deviceServiceNowText){
		if(id==1){
			CAMERA_COUNT.splice($.inArray(deviceCustomerNowText,CAMERA_COUNT),1);
			NewCamera = [deviceCustomerNowText];
			$(CAMERA_COUNT).each(function(index){
				NewCamera.push(this);
			});
		}else{
			CAMERA_COUNT.splice($.inArray(deviceServiceNowText,CAMERA_COUNT),1);
			NewCamera = [];
			$(CAMERA_COUNT).each(function(index){
				NewCamera.push(this);
			});
			NewCamera.push(deviceServiceNowText);
		}
	}else{
		CAMERA_COUNT.splice($.inArray(deviceCustomerNowText,CAMERA_COUNT),1);
		CAMERA_COUNT.splice($.inArray(deviceServiceNowText,CAMERA_COUNT),1);
		NewCamera = [deviceCustomerNowText,deviceServiceNowText];
		$(CAMERA_COUNT).each(function(index){
			NewCamera.push(this);
		});
	}
	var dataJson = JSON.stringify(NewCamera);
	$.ajax({  
		url : "/myInfo/saveUserCamera.do",  
		async : false, // 注意此处需要同步
		type : "POST",  
		data: {"dataJson":dataJson},  
	});
}

function startDevice(){
	CAMERA_COUNT=BRAC_EnumDevices(1);
	InsertCamera(CAMERA_COUNT);
	BRAC_SetVideoPosEx(mSelfUserId, GetID("AnyChatLocalVideoDiv"), "AnyChatLocalVideoDiv"+CAMERA_COUNT[0],0);// 
	BRAC_UserCameraControlEx(mSelfUserId,1,0,0, "");
	BRAC_UserSpeakControl(mSelfUserId, 1);
	var ref = window.setInterval("search()", 5000);
}

function InsertCamera(CAMERA_COUNT){
	  for(i=0;i<CAMERA_COUNT.length;i++){
		   $(".dropdown-menu").append('<li role="presentation"><a role="menuitem" tabindex="-1">'+CAMERA_COUNT[i]+'</a></li>');
		   if(i==0){
			   $("#selectCanmera").text(CAMERA_COUNT[0]);
		   }
	  }
}

function search(ref){
	var useridlist = BRAC_GetOnlineUser();
	if(useridlist.length==1){
		RequestOtherUserVideo(useridlist[0]);
		clearInterval(ref);
	}
}


function savaImage(csImage,filename,orderId,empName,empId){
	jQuery.post("/showVideo/videoImage.do",{"videoImage":csImage,"filename":filename,"orderId":orderId,"empId":empId,"empName":empName},function(result){
		if(result==0){
			filename = filename.replace(pictureUrl,"");
			var photoUrl = filename= storeMapping+filename;
		 	insertHtml(photoUrl);
		}else{
			alert("拍照失败")
		}
	});
}

function insertHtml(photoUrl){
	photo_index++;
    if (photo_index > phone_num) {
      photo_index = 1;
      photo_page++;
      now_page++;
      $('#pz .pz-content .pz-warp').css('left', -photo_page * width_remove);
    }
    if(photo_page > 0){
      $(this).parents('.tab-pane').find('.pz-content').addClass('active');
    }
    $('#pz .pz-content .pz-warp li').eq(phone_num * photo_page + photo_index - 1).find('.photo-box').addClass('has-photo');
    setTimeout(function(){$('#pz .pz-content .pz-warp li').eq(phone_num * photo_page + photo_index - 1).find('.photo-box').append('<img src="'+photoUrl+'">');}, 1000);
    var child_li = '<li class="pzList"><div class="photo-box"></div></li>';
    $('#pz .pz-content .pz-warp').append(child_li);
}

Date.prototype.format =function(format){
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	(this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
	return format; 
}

function watchStart() {
	var HH = 0;var mm = 0;var ss = 0;var str = "";
	timer = setInterval(function(){
		str = "";
		if(++ss==60){
			if(++mm==60){
				HH++;
				mm=0;
			}
			ss=0;
		}
		str+=HH<10?"0"+HH:HH;
		str+=":";
		str+=mm<10?"0"+mm:mm;
		str+=":";
		str+=ss<10?"0"+ss:ss;
		document.getElementById("time").innerHTML = str;
	},1000);
}

function watchStop() {
    clearInterval(timer);
}

function GetID(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	} else if (window[id]) {
		return window[id];
	}
	return null;
}