define(["tool/Utils"], function (utils) {
  function _render(param) {
    utils.bindEvents(param.bindings);
  }

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
      }else if(that.hasClass('input-code')) {
        if(that.val() !== 'advses'){
          if(that.parent().find('.error-info').length !==0){
            return;
          }else {
            that.parent().append(error_text[0] +  '验证码有误，请重新输入' + error_text[1])
          }
        }else {
          that.parent().find('.error-info').remove();
        }
      }
  }

  //填写信息以后点击写下一步
  function nextStep(){
    window.location.href = 'videoOrder-prepare.html';
  }
  return {
    render: _render,
    showError: showError,
    nextStep: nextStep
  }
});
