define(["tool/Utils"], function (utils) {
  //时间控件初始化
  $('.start-time').datepicker({
    dateFormat:'yy-mm-d DD',
    showOn: 'both',//设置可以点击图片显示控件
    buttonImage: "../../img/calendar.png",//设置可以点击的图片
    buttonImageOnly: true//不设置的话样式问题
  });
  function initSelectOption(){
    var child_html = '';
    for(var i = 0;i < 24;i++) {
      child_html = child_html +  '<li><a href="javascript:void(0);">' + i + '</a></li>';
    }
    $('#select_hour_before').html(child_html);
    $('#select_hour_after').html(child_html);
  }
  function initSelectOptionMinute(){
    var child_html = '';
    for(var i = 0;i < 61;i++) {
      child_html = child_html +  '<li><a href="javascript:void(0);">' + i + '</a></li>';
    }
    $('#select_minute_before').html(child_html);
    $('#select_minute_after').html(child_html);
  }
  initSelectOption();
  initSelectOptionMinute();
  return {
  }
});
