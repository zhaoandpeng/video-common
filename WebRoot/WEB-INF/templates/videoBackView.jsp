<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>公共核心视频区域</title>
<%@include file="/js/anychat/common.video.back.js"%>
<link href="/css/main.css" rel="stylesheet">
</head>
<body class="page-video">
	<!-- -----------------------------公共核心区域开始------------------------------- -->
	<div class="video-top">
		<div class="video-left">
			<div class="ui-video-area">
				<div id="AnyChatRemoteVideoDiv" class="photo-inner"
					style="width: 360px; height: 270px; background-color: rgb(237, 237, 237)">
				</div>
				<p class="speed-content">
					<span style="display: block">用户:<span id="user-net-video">0kb/s(视)</span><span
						style="margin-right: 10px;" id="user-net-voice">0kb/s(音)</span></span> <span>客服:<span
						id="emp-net-video">0kb/s(视)</span><span id="emp-net-voice">0kb/s(音)</span></span>
				</p>
			</div>

			<div class="ui-video-opration">
				<div class="opration-inner">
					<div id="AnyChatLocalVideoDiv" class="video-photo"
						style="width: 155px; height: 116px; background-color: rgb(237, 237, 237)">
					</div>
					<div class="video-btn-all">
						<div class="audio-content">
							<a href="javascript:void(0)" class="audio-play" id="playBtn"
								title="播放"> <i class="icon icon-play"></i>
							</a> <span id="time">00:00:00</span>
						</div>
						<div class="opration-btn">
							<a href="javascript:void(0)" title="设置" style="display: none"><i
								class="icon icon-set"></i></a> <a href="javascript:void(0)"
								title="旋转"><i id="turnleft" class="icon icon-rotate"></i></a> <a
								href="javascript:void(0)" title="翻转"><i id="turnback"
								class="icon icon-turn"></i></a>
						</div>
						<div class="btn-content">
							<a href="#" class="btn-normal btn-hollow" style="display: none">上传</a>
							<a href="#" class="btn-normal btn-fill" id="begin_record">开始录制</a>
							<a href="#" class="btn-normal btn-fill" id="end_record">结束录制</a>
						</div>
					</div>

				</div>
			</div>

		</div>
		<div class="video-center">
			<div class="ui-video-photo">
				<div class="tab">
					<a class="current barehead pict" href="javascript:void(0)">免冠照片</a> 
					<a class="front pict" href="javascript:void(0)">证件正面</a> 
					<a class="back pict" href="javascript:void(0)">证件反面</a> 
					<a class="license pict" href="javascript:void(0)">机构证件照</a>
				</div>
				<div class="photo-content photo-barehead">
					<img class="photo barehead" src="/img/temp5.png" width="284" height="214"> <a class="take-photo" href="javascript:void(0)"></a>
				</div>
				<div class="photo-content photo-front" style="display: none;">
					<img class="photo front" src="/img/temp2.png" width="284" height="214"> <a class="take-photo" href="javascript:void(0)"></a>
				</div>
				<div class="photo-content photo-back" style="display: none;">
					<img class="photo back" src="/img/temp3.png" width="284" height="214"> <a class="take-photo" href="javascript:void(0)"></a>
				</div>
				<div class="photo-content photo-license" style="display: none;">
					<img class="photo license" src="/img/license.png" width="284" height="214"> <a class="take-photo" href="javascript:void(0)"></a>
				</div>
			</div>
			<div class="ui-video-verify">
				<div class="show-result">
					<div class="result-inner">
						<p class="error">未进行公安验证</p>
						<a id="policeVerify" href="javascript:void(0)"
							class="btn btn-fill">公安认证</a>
					</div>
					<img id="policePhoto" src="/img/temp6.png" width="121"
						height="137">
				</div>
			</div>

		</div>
	</div>
	<div class="ui-video-info">
		<div class="info-content" style="display: none;"></div>
		<div class="send-message">
			<div class="message-content">
					<input class="message" type="text"> 
					<a class="sent-btn" href="javascript:void(0)">发送</a> 
					<a class="open-words" href="javascript:void(0)">打开话术</a>
			</div>
			<div class="more-message">
					<a class="more-main" href="javascript:void(0)"> <i class="more"></i>
						<ol class="common-info" style="display: none;">
						</ol>
					</a>
			</div>
		</div>
	</div>
	<!-- -----------------------------公共核心区域结束------------------------------- -->
</body>
<script type="text/javascript">
window.addEventListener('message', function(e){
	EmpNo = e.data.EmpNo;
	bizId = e.data.bizId;
	businessType = e.data.businessType;
	serverIpAndPort = e.data.serverIpAndPort;
	if(typeof e.data.videoServerIp!='undefined'){
		videoServerIp = e.data.videoServerIp;
		videoServerPort = e.data.videoServerPort;
		BRAC_Connect(videoServerIp, videoServerPort);
	}
	if(e.data.Message!=null){
		if(e.data.Message=="Pass"){
			MessageIndexBack = "Pass";
		}else{
			MessageIndexBack = "NoPass";
		}
		PostMessage();
	}
}, false);
</script>
</html>