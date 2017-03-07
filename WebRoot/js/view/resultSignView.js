define([], function () {
  function _pageturn() {
    window.location.href = 'result-password.html';
  }
  function showPage(){
    setTimeout(function(){
      $('.result-fail').removeClass('active');
      $('.result-suc').addClass('active');
    },3000);
  }
  function _pageback() {
    history.back();
    showPage();
  }

  return {
    pageturn: _pageturn,
    pageback: _pageback
  }
});
