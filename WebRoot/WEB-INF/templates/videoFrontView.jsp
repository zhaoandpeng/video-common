<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <title>信托签约系统</title>
  <%@include file="/js/anychat/common.video.js"%>
  <link href="/css/app.css" rel="stylesheet">
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/bootstrap-theme.min.css">
  <link rel="stylesheet" href="/css/app.css" >
  <link rel="stylesheet" href="/css/red.css">
</head>
<body>

		<!------------------------------------- 排队区域开始------------------------------------- -->
		<div class="views theme-white">
			  <div class="pages">
			    <div class="page page-videoOrder-prepare" data-page="videoOrderPrepareVideo">
			      <div class="inner">
			        <div class="item-content video-start">
			          <div class="item-header">
			            <span>视频见证</span>
			          </div>
			          <div class="item-body video-prepare">
			            <div class="prepare-content">
			              <img src="../img/video-wating.png">
			
			              <h2>前方还有<span class="waiting-num">5</span>人在排队，请稍候...</h2>
			            </div>
			            <!-- <div class="waiting-message">
			              <span>目前排队人数较多？您还可以选择</span>
			              <div class="btn btn-2 btn-order">预约视频</div>
			            </div> -->
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
		</div>
		
		<div class="modal fade" id="equipmentModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        	提示
			        <button type="button" class="close"data-dismiss="modal" aria-hidden="true">
			          &times;
			        </button>
			      </div>
			      <div class="modal-body">
			        <h4 class="modal-title">
			          	请确保以下设备正常
			        </h4>
			        <ul class="equipment-modal-content">
			          <li>
		                    <span class="img-warp equipmentOK" id="cam">
		                      <img src="../img/video-video-gray.png"/>
		                      <p>高清摄像头</p>
		                    </span>
			          </li>
			          <li>
		                    <span class="img-warp equipmentOK" id="speaker">
		                      <img src="../img/video-mkf-gray.png"/>
		                       <p>麦克风</p>
		                    </span>
			          </li>
			          <li>
		                    <span class="img-warp equipmentOK" id="mic">
		                      <img src="../img/video-yx-gray.png"/>
		                       <p>音响或耳机</p>
		                    </span>
			          </li>
			        </ul>
			      </div>
			      <div class="modal-footer al-center">
			        <a class="btn btn-2 reTest" data-dismiss="modal" aria-hidden="true">重新检测</a>
			      </div>
			    </div>
			  </div>
		</div>
		<!------------------------------------- 排队区域结束------------------------------------- -->
		
		
		<!------------------------------------- 等待区域开始------------------------------------- -->
		<div class="item-content video-coffee" >
          <img src="/img/coffee.png">

          <p id="coffeeText">坐席MM马上就来，请稍等...</p>
        </div>
		<!------------------------------------- 等待区域结束------------------------------------- -->        
        
        
        <!------------------------------------- 视频区域开始------------------------------------- -->
        <div class="page page-videoOrder-recording" data-page="videoOrderRecording">
		      <div class="inner">
		        <div class="item-content recording">
		          <div class="record-title">
		            <img src="/img/record.png">
		          </div>
		          <div class="record-content">
		            <div class="record-left" id="AnyChatLocalVideoDiv"></div>
		            <div class="record-right" >
		              <div class="record-worker" id="AnyChatRemoteVideoDiv"></div>
		              <div class="worker-name">
		                <span class="title">工作人员姓名：</span>
		                <span class="text">完颜静静</span>
		              </div>
		              <div class="worker-account">
		                <span>工作人员工号：</span>
		                <span>003798</span>
		              </div>
		            </div>
		          </div>
		          <div class="record-text"></div>
		        </div>
		      </div>
    	</div>
        <!------------------------------------- 视频区域结束------------------------------------- -->
        
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
    // 回发数据
    /* e.source.postMessage('hello world', '*'); */
}, false);
</script>
</html>







        
       
