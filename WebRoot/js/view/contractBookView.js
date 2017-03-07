define([], function () {
  $(".page-book").find("input.icheck").iCheck({
    checkboxClass: 'icheckbox_minimal-red',
    radioClass: 'iradio_minimal-red',
    increaseArea: '20%' // optional
  });
  $('.page-book input').on('ifClicked', function (event) {
      $('.next-btn').addClass('active');
  });
  function _pageturn() {
    if ($(this).hasClass('active'))
      window.location.href = 'result-contract.html';
  }

  function _pageback() {
    history.back();
  }

  return {
    pageturn: _pageturn,
    pageback: _pageback
  }
});
