define(["tool/Utils"], function (utils) {


  function _render(param) {
    var source1   = $("#template1").html();
    var template1 = Handlebars.compile(source1);
    var html1    = template1(param.model);
    $(".tab-content table.list1 tbody").html(html1);
  }
  function videogoPage(){
    window.location.href = '../video/index-video-affiliate.html';
  }
  function showMessage(){
    if($(this).attr('id') === 'showmessage'){
      if($('.table-list').hasClass('active')){
        $('.table-list').removeClass('active');
        $('.no-data').addClass('active');
      }else {
        $('.table-list').addClass('active');
        $('.no-data').removeClass('active');
      }
    }else {
      window.location.href = 'contract-list.html';
    }
  }
  return {
    render:_render,
    videogoPage:videogoPage,
    showMessage:showMessage
  }
});
