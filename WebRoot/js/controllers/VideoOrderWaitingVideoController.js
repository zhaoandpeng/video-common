/*define(["tool/Utils", "view/videoOrderWaitingVideoView"], function (utils, view) {
  function bindEvents() {
    var bindings = [{
      "element": ".btn-start-video",
      "event": "click",
      "handler": goRecording
    }
    ];
    utils.bindEvents(bindings);
  }

  function showPage(){
    //初始显示视频倒计时设备不正常页面
    //3秒钟后显示视频倒计时设备正常页面
    setTimeout(function(){
      $('.in-time-bad').removeClass('active');
      $('.in-time-complete').addClass('active');
    },3000);
    //4秒钟后显示已过期视频页面
    setTimeout(function(){
      $('.in-time-complete').removeClass('active');
      $('.no-problem').addClass('active');
    },6000);
    //9秒钟后显示可开始视频页面
    setTimeout(function(){
      $('.out-time').removeClass('active');
      $('.no-problem').addClass('active');
    },9000);
  }

  function goRecording(){
    window.location.href = "videoOrder-waitingMM.html";
  }
  function init() {
    bindEvents();
    showPage();
  }

  return {
    init: init
  }
});
*/