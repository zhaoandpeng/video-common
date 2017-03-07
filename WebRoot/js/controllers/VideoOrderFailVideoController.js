/*define(["tool/Utils", "view/videoOrderFailVideoView"], function (utils, view) {
  function bindEvents() {
    var bindings = [{
      "element": ".edit-btn",
      "event":"click",
      "handler":goEditInfo
    }
    ];
    utils.bindEvents(bindings);
  }

  //返回编辑信息页面
  function goEditInfo(){
    window.location.href = 'index-video.html';
  }

  function showPage(){
    //3秒钟去成功页面页面
    setTimeout(function(){
      window.location.href = 'result-video.html';
    },3000);
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