define(["tool/Utils"], function (utils) {

  //填写密码以后点击写下一步
  function nextStep() {
    window.location.href = 'result-password.html';
  }
  //添加错误信息
  function showError(){
      var that = $(this);
    var error_text = [' <div class="error-info"><i class="icon-error"></i><span>','</span></div>']
      if(that.attr('id') === 'password') {
        if(that.val() !== 'aaa'){
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

  return {
    showError: showError,
    nextStep: nextStep
  }
});
