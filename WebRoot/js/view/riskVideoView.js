define([], function () {
  Handlebars.registerHelper("math", function(v1, operator, v2){
    if(operator == "+"){	return v1+v2;}
    if(operator == "-"){	return v1-v2;}
    if(operator == "*"){	return v1*v2;}
    if(operator == "/"){	return v1/v2;}
    if(operator == "%"){	return v1%v2;}
  });
  function _render() {
    $("#question-list").mCustomScrollbar();
    $("#question-list").find("input.icheck").iCheck({
      checkboxClass: 'icheckbox_minimal-red',
      radioClass: 'iradio_minimal-red',
      increaseArea: '20%' // optional
    });
    $('.page-risk input').on('ifClicked', function(event){
      var that = $(this).parents('.question-card');
      var height_total = that.next().offset().top;
      var next_height = that.next().outerHeight(true);
      if(next_height > height_total) {
        $('.mCustomScrollBox').animate({
          scrollTop: height_total
        },{duration:500,easing:'swing'});
      }else {
        $('.mCustomScrollBox').animate({
          scrollTop: next_height
        },{duration:500,easing:'swing'});
      }
    });
  }
  function _orderTimeShow(data){
    if(data && data !== ""){
      $(".order-time").find(".time").text(data);
      $(".order-time").show();
      $(".time-over").hide();
    }else {
      $(".order-time").hide();
      $(".time-over").show();
    }
  }
  function _senderQuestion(obj){
    if(!obj || obj.questionList.length == 0) return;
    var source   = $("#questionTemp").html();
    var template = Handlebars.compile(source);
    var html = template(obj);
    $("#question-list").html(html);
    _render();
  }
  function _pageturn(){
      window.location.href = 'book-video.html';
  }

  function _pageback(){
      history.back();
  }

  return {
    orderTimeShow:_orderTimeShow,
    senderQuestion:_senderQuestion,
    pageturn:_pageturn,
    pageback:_pageback
  }
});
