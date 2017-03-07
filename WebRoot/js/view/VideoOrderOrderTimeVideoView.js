define(["tool/Utils"], function (utils) {
  function _senderOrderSituation(data){
    var source   = $("#orderTemp").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#orderSituation").html(html);
    var len = $("#orderSituation").find("ul li").length;
    for(var i=0;i<parseInt(len/4);i++){
      $("#orderSituation").find("ul li").eq((i+1)*4-1).css("margin-right","0");
    }
  }
  //创建万年历
  function _senderCal(){
    utils.calendar("#calendarBox");
  }
  function _liClick(){
    if($(this).hasClass("free-0")) return;
    $("#orderSituation").find(".active").removeClass("active");
    $(this).addClass("active");
  }
  //时间控件初始化
  $('.start-time').datepicker({
    dateFormat:'yy-mm-d DD',
    showOn: 'both',//设置可以点击图片显示控件
    buttonImage: "../../img/calendar.png",//设置可以点击的图片
    buttonImageOnly: true//不设置的话样式问题
  });
  return {
    senderCal:_senderCal,
    senderOrderSituation:_senderOrderSituation,
    liClick:_liClick
  }
});
