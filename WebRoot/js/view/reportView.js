define(["tool/Utils"], function (utils) {

  function _render(param) {
    var source1   = $("#template1").html();
    var template1 = Handlebars.compile(source1);
    var html1    = template1(param.model);
    $(".tab-content table tbody").html(html1);

    setpagination();

  }

  //设置分页
  function setpagination(){
    $("#pagination1").pagination(10, {
      num_edge_entries: 2,
      num_display_entries: 4,
      callback: $.noop,
      items_per_page:1
    });
  }

  function backStep(){
    window.location.href = 'contract.html';
  }
  function nextStep(){
    window.location.href = 'report-detail.html';
  }
  return {
    render:_render,
    backStep: backStep,
    nextStep: nextStep
  }
});
