define([], function () {
  function _pageturn() {
  }

  function _pageback() {
    history.back();
  }

  return {
    pageturn: _pageturn,
    pageback: _pageback
  }
});
