/*define(["tool/Utils", "view/videoOrderFailPasswordView"], function (utils, view) {
  function bindEvents() {
    var bindings = [{
      "element": ".edit-btn",
      "event":"click",
      "handler":goEditInfo
    },{
      "element":".btn-go-edit-password",
      "event": "click",
      "handler":goEditPassword
    }
    ];
    utils.bindEvents(bindings);
  }

  //去修改密码的页面
  function goEditPassword(){
    window.location.href = 'edit-password.html';
  }

  //返回编辑信息页面
  function goEditInfo(){
    window.location.href = 'editInfo-password.html';
  }

  function showPage(){
    //3秒钟显示成功页面页面
    setTimeout(function(){
      $('.record-fail').removeClass('active');
      $('.record-suc').addClass('active');
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