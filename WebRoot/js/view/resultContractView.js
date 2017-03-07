define([], function () {
  function _pageturn() {
    window.location.href = 'index-contract.html';
  }
  function _pageback() {
    history.back();
  }

  return {
    pageturn: _pageturn,
    pageback: _pageback
  }
});
