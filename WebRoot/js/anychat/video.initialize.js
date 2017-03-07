//服务器参数
var SERVERFLAG = BRAC_RECORD_FLAGS_LOCALCB + BRAC_RECORD_FLAGS_VIDEO + BRAC_RECORD_FLAGS_AUDIO + BRAC_RECORD_FLAGS_SERVER + 
			
			  	 BRAC_RECORD_FLAGS_MIXAUDIO + BRAC_RECORD_FLAGS_MIXVIDEO + BRAC_RECORD_FLAGS_ABREAST + BRAC_RECORD_FLAGS_STEREO+
					
			  	 BRAC_RECORD_FLAGS_STREAM + BRAC_RECORD_FLAGS_USERFILENAME;

var mSelfUserId = -1;

var bizType;

var flowControlBizId;

var singleOrdouble;

var videoServerIp;

var videoServerPort;

var MessageIndexFront;

var IsNorMalLeave;

/**********************后台参数设置初始化开始************************/
var timer; //计时器

var requestUserId; //请求用户的ID

var EmpNo; //测试期间该数值设置为常量

var bizId;

var businessType;

var MessageIndexBack;

var serverIpAndPort;

/*var videoRecordFlag = '${videoRecordFlag}';

var videoPhotoFlag = '${videoPhotoFlag}';

var videoCaFlag = '${videoCaFlag}';

var videoCustomerInfoFlag = '${videoCustomerInfoFlag}';

var videoMessageFlag = '${videoMessageFlag}';

var videoWordsFlag = '${videoWordsFlag}';

var identityName = '${customer.identityName}'
	*/
/**********************后台参数设置初始化结束************************/