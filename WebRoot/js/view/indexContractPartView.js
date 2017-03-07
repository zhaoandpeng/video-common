define(["tool/Utils"], function (utils) {

  //时间控件初始化
  $('.start-time').datepicker({
    onClose: function (selectedDate) {
      $('.end-time').datepicker('option', 'minDate', selectedDate);
    }
  });
  $('.end-time').datepicker({
    onClose: function (selectedDate) {
      $('.start-time').datepicker('option', 'maxDate', selectedDate);
    }
  });

  function closeError(){
    $(this).parent().remove();
  }
  //添加错误信息
  function showError(id,checkFunc,error_info){
    var that =$('#' + id);
    var error_text = [' <div class="error-info"><i class="icon-error"></i><span>','</span></div>'];
    if(checkFunc()) {
      if(that.parent().find('.error-info').length !==0){
        return;
      }else {
        that.parent().append(error_text[0] + error_info + error_text[1])
      }
    }else {
      that.parent().find('.error-info').remove();
    }
  }

  //添加错误信息
  function addError(){
    var that = $(this);
    if(that.attr('id') === 'idNumber'){
      showError('idNumber',function(){ return that.val() !== 'lxc'},'证件号码格式不正确，请重新输入');
    }else if(that.attr('id') === 'eMail') {
      showError('eMail',function(){ return that.val() === 'lxc@qq.com'},'此邮箱已被绑定');
    }
  }
  function showInfo(){
    if($(this).parents('.item-part').hasClass('active')) {
      $(this).parents('.item-part').removeClass('active');
      $(this).find('.add-text').text('展开');
      $(this).find('.icon-add').text('+');
    }else {
      $(this).parents('.item-part').addClass('active');
      $(this).find('.add-text').text('收起');
      $(this).find('.icon-add').text('-');
    }
  }

  function pageTurn(){
    window.location.href = 'contract-book.html';
  }

  return {
    addError:addError,
    closeError: closeError,
    showInfo:showInfo,
    pageTurn: pageTurn
  }
});
