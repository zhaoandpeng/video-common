/*define(["tool/Utils", "view/videoOrderOrderTimeVideoView"], function (utils, view) {
  function bindEvents() {
    var bindings = [
      {
        "element": "#orderSituation",
        "event": "click",
        "target": "ul li",
        "handler": view.liClick
      },
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

  function getData() {
    $.ajax({
      url: '../api/videoOrder.json',
      data: '',
      method: "GET",
      dataType: 'json',
      success: function (data) {
        if (!data.success) return;
        view.senderOrderSituation(data.data);
        utils.footPosition();
      }
    })
  }

  function init() {
    getData();
    view.senderCal();
    bindEvents();
  }

  return {
    init: init
  }
});
*/