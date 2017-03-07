define(["tool/Utils"], function (utils) {
  //时间控件初始化
  $('.start-time').datepicker({
    dateFormat:'yy-mm-d DD',
    showOn: 'both',//设置可以点击图片显示控件
    buttonImage: "../../img/calendar.png",//设置可以点击的图片
    buttonImageOnly: true//不设置的话样式问题
  });
  var textArray = ['.','..','...'];
  var timeIndex = 0;
  var inter = setInterval(function(){
    timeIndex++;
    $('#coffeeText').text('坐席MM马上就来，请稍等' + textArray[timeIndex%3]);
  },1000);
  return {
  }
});
