define(["tool/Utils"], function (utils) {
  function _render(param) {
    utils.bindEvents(param.bindings);
  }

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

  //添加错误信息
  function showError(){
    var that = $(this);
    var error_text = [' <div class="error-info"><i class="icon-error"></i><span>','</span></div>']
    if(that.attr('id') === 'idNumber'){
      if(that.val() !== 'lxc'){
        if(that.parent().find('.error-info').length !==0){
          return;
        }else {
          that.parent().append(error_text[0] +  '证件号码格式不正确，请重新输入' + error_text[1])
        }
      }else {
        that.parent().find('.error-info').remove();
      }
    }else if(that.attr('id') === 'eMail') {
      if(that.val() === 'lxc@qq.com'){
        if(that.parent().find('.error-info').length !==0){
          return;
        }else {
          that.parent().append(error_text[0] +  '此邮箱已被绑定' + error_text[1])
        }
      }else {
        that.parent().find('.error-info').remove();
      }
    }else if(that.attr('id') === 'password') {
      if(that.val() === 'lxc@qq.com'){
        if(that.parent().find('.error-info').length !==0){
          return;
        }else {
          that.parent().append(error_text[0] +  '密码格式不正确，请重新输入' + error_text[1])
        }
      }else {
        that.parent().find('.error-info').remove();
      }
    }else if(that.attr('id') === 'passwordOld') {
      if(that.val() !== $('#password').val()){
        if(that.parent().find('.error-info').length !==0){
          return;
        }else {
          that.parent().append(error_text[0] +  '两次输入不一致，请重新输入' + error_text[1])
        }
      }else {
        that.parent().find('.error-info').remove();
      }
    }
  }

  //填写信息以后点击写下一步
  function nextStep(){
    $('.step1').removeClass('active');
    $('.step2').addClass('active');
  }
  return {
    render: _render,
    showError: showError,
    nextStep: nextStep
  }
});
