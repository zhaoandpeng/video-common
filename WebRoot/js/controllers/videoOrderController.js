/*define(["tool/Utils", "view/videoOrderView"], function (utils, view) {
  function bindEvents() {
    var bindings = [
      {
        "element": ".page-videoOrder .next-btn",
        "event": "click",
        "handler": modalShow
      },
      {
        "element": "#orderModal",
        "event": "click",
        "target": ".submit",
        "handler": pageturn
      },
      {
        "element": "#orderOutModal",
        "event": "click",
        "target": ".submit",
        "handler": pageturn
      },{
        "element": ".btn-order",
        "event":"click",
        "handler":showVideo
      },{
        "element": ".edit-btn",
        "event":"click",
        "handler":goEdit
      }
    ];
    utils.bindEvents(bindings);
  }

  function modalShow() {
    $("#orderModal").modal();
    //$("#orderOutModal").modal();
  }

  function pageturn() {
    $('.video-order').removeClass('active');
    $('.video-start').addClass('active');
    $('.video-start .video-prepare').removeClass('active');
    $('.video-start .video-waiting').addClass('active');
    $('.video-start .video-waiting .out-time').addClass('active');
  }

  //检测设备
  function checkEquipment(){
    $("#equipmentModal").modal('show');
  }
  function showVideo(){
    $('.video-start').removeClass('active');
    $('.video-order').addClass('active');
  }
  function goEdit(){
    location.href = 'openAccount.html';
  }

  function showPage(){
    //初始页面是视频等待页面，3秒钟以后显示预约时间页面
    setTimeout(function(){
      $('.video-start').removeClass('active');
      $('.video-order').addClass('active');
    },3000);
    //6秒钟后显示视频倒计时设备不正常页面
    setTimeout(function(){
      $('.video-order').removeClass('active');
      $('.video-prepare').removeClass('active');
      $('.video-start').addClass('active');
      $('.video-waiting').addClass('active');
      $('.in-time-bad').addClass('active');
    },6000);
    //9秒钟后显示视频倒计时设备正常页面
    setTimeout(function(){
      $('.in-time-bad').removeClass('active');
      $('.in-time-complete').addClass('active');
    },9000);
    //12秒钟后显示可开始视频页面
    setTimeout(function(){
      $('.in-time-complete').removeClass('active');
      $('.no-problem').addClass('active');
    },12000);
    //15秒钟后显示可开始视频页面
    setTimeout(function(){
      $('.no-problem').removeClass('active');
      $('.out-time').addClass('active');
    },15000);
    //18秒钟后显示等待页面
    setTimeout(function(){
      $('.video-start').removeClass('active');
      $('.video-coffee').addClass('active');
    },18000);
  }

  function init() {
    checkEquipment();
    bindEvents();
    showPage();
  }

  return {
    init: init
  }
});
*/