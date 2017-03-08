<%-- <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <title>单向视频界面</title>
  <%@include file="/js/anychat/common.video.single.js"%>
  <link rel="stylesheet" href="/css/videosingle.css">
  <link rel="stylesheet" href="/css/videosinglemain.css">
</head>
<body>
			<!-- ----------------------视频区域----------------------- -->
			<div class="videoBox">
			      <div id="AnyChatLocalVideoDiv" class="video"></div>
			      <div class="cus-video-box">
			       	<div class="btn-start active">开始录制</div>
			        <div class="btn-end">结束录制</div>
			       	<div class="video-result">
			            <div class="video-num">
			              <i class="btn-video"></i><span id="time">00:00:00</span>
			            </div>
			            <div class="word-btn" >话术</div>
			        </div>
			      </div>
		    </div>
		    
		    <!-- ----------------------拍照区域----------------------- -->
		    <div class="photoBox">
		      	<div class="photo-ul">
				        <div class="photo-nav">
					          <ul>
					            <li class="barehead" id="barehead"><span>免冠照片</span></li>
					            <li class="front" id="front"><span>证件正面</span></li>
					            <li class="back" id="back"><span>证件反面</span></li>
						        <li class="license" id="license"><span>营业执照</span></li>
					          </ul>
				        </div>
				        
				        <div class="photo-content barehead_photo">
				          <img class="default-img" src="/images/photo-btn.png">
				          <h5>请点击拍照</h5>
				          <div class="btn-photo">重拍</div>
				        </div>
				        
				        <div class="photo-content front_photo"  style="display:none;">
				          <img class="default-img" src="/images/photo-btn.png">
				          <h5>请点击拍照</h5>
				          <div class="btn-photo">重拍</div>
				        </div>
				        
				        <div class="photo-content back_photo"  style="display:none;">
				          <img class="default-img" src="/images/photo-btn.png">
				          <h5>请点击拍照</h5>
				          <div class="btn-photo">重拍</div>
				        </div>
			        
				        <div class="photo-content license_photo"  style="display:none;">
				          <img class="default-img" src="/images/photo-btn.png">
				          <h5>请点击拍照</h5>
				          <div class="btn-photo">重拍</div>
				        </div>
		      	</div>
		      	<div class="RZ-box">
				        <div class="photo-box">
				          <img src="/images/face.png">
				        </div>
				        <div class="RZ-msg active">
				          <p>未验证</p>
				          <div class="btn-rz">身份证验证</div>
				        </div>
				        <div class="RZ-success">
				          <img id="policeurl" src="/images/icon-complete.png" />
				          <p class="text">验证通过</p>
				        </div>
		      	</div>
		     </div>
</body>
<script type="text/javascript">
window.addEventListener('message', function(e){
	videoServerIp = e.data.videoServerIp;
	videoServerPort = e.data.videoServerPort;
}, false);
</script>
</html> --%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>公共核心视频区域</title>
<%@include file="/js/anychat/common.video.single.js"%>
<link href="/css/main.css" rel="stylesheet">
</head>
<body class="page-video">
	<!-- -----------------------------公共核心区域开始------------------------------- -->
	<div class="video-top">
		<div class="video-left">
			<div class="ui-video-area">
				<div id="AnyChatLocalVideoDiv" class="photo-inner"
					style="width: 360px; height: 270px; background-color: rgb(237, 237, 237)">
				</div>
			</div>

			<div class="ui-video-opration">
				<div class="opration-inner">
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
	
	<!-- 隐藏信息区域开始 -->
        <input type="hidden" value="${flowControlBizId}" class="flowControlBizId">
        <input type="hidden" value="${singleOrdouble}" class="singleOrdouble">
        <input type="hidden" value="${bizType}" class="bizType">
    <!-- 隐藏信息区域结束 -->
</body>
<script type="text/javascript">
window.addEventListener('message', function(e){
	videoServerIp = e.data.videoServerIp;
	videoServerPort = e.data.videoServerPort;
	flowControlBizId = $(".flowControlBizId").val();
	singleOrdouble = $(".singleOrdouble").val();
	BRAC_Connect(videoServerIp, videoServerPort);
}, false);
</script>
</html>