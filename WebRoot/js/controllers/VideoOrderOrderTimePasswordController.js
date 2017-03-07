/*define(["tool/Utils", "view/videoOrderOrderTimePasswordView"], function (utils, view) {
  function bindEvents() {
    var bindings = [
      {
        "element":".next-btn",
        "event": "click",
        "handler": modalShow
      },
      {
        "element":".submit",
        "event": "click",
        "handler": goWaiting
      }
    ];
    utils.bindEvents(bindings);
  }


  function modalShow() {
    $("#orderModal").modal();
    //$("#orderOutModal").modal();
  }


  function goWaiting() {
    location.href = 'videoOrder-waiting.html';
  }

  function init() {
    bindEvents();
  }

  return {
    init: init
  }
});
*/