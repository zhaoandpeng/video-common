define([], function () {
  function _pageturn() {
    window.location.href = 'result-password.html';
  }
  function _pageback() {
    history.back();
  }

  return {
    pageturn: _pageturn,
    pageback: _pageback
  }
});
