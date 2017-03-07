define(["tool/Utils", "view/videoListView"], function (utils, view) {
  function loadAjax() {
    var url = "../api/videoList.json";
    var param = arguments[0] || {};
    $.ajax({
      url: url,
      data: param,
      method: "GET",
      dataType: "json",
      success: function (data) {
        view.render({
          bindings: [],
          model: data
        });
      }
    })
  }

  function events() {
    var bindings = [{
      "element": ".btn-add-video",
      "event": "click",
      "handler": view.videogoPage
    },{
      "element": ".search-btn",
      "event":"click",
      "handler":view.showMessage
    },{
      "element": '.page',
      "target": '.open-contract',
      "event": 'click',
      "handler": openVideo
    }];
    utils.bindEvents(bindings);
  }
  function openVideo(){
    window.location.href = "../video/index-video.html";
  }
  function init(page) {
    loadAjax();
    events();
  }

  return {
    init: init
  }
});
