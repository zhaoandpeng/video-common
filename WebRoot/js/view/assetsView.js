define(["tool/Utils"], function (utils) {


  //时间控件初始化
  $('.setup-time').datepicker({
    onClose: function (selectedDate) {
      $('.end-time').datepicker('option', 'minDate', selectedDate);
    }
  });
  $('.end-time').datepicker({
    onClose: function (selectedDate) {
      $('.start-time').datepicker('option', 'maxDate', selectedDate);
    }
  });

  function _render(param) {
    var source1   = $("#template1").html();
    var template1 = Handlebars.compile(source1);
    var html1    = template1(param.model);
    $(".tab-content table.list1 tbody").html(html1);

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

  //填写信息以后点击写下一步
  function nextStep(){
    window.location.href = 'videoOrder-password.html';
  }
  return {
    render:_render,
    nextStep: nextStep
  }
});
