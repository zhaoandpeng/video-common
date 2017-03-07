define(["tool/Utils"], function (utils) {


  function _render(param) {
    var source1   = $("#template1").html();
    var template1 = Handlebars.compile(source1);
    var html1    = template1(param.model);
    $(".tab-content table.list1 tbody").html(html1);

    var source2   = $("#template2").html();
    var template2 = Handlebars.compile(source2);
    var html2    = template2(param.model);
    $(".tab-content table.list2 tbody").html(html2);

    setpagination();

  }

  //设置分页
  function setpagination(){
    $("#pagination1").pagination(10, {
      num_edge_entries: 2,
      num_display_entries: 4,
      callback: $.noop,
      items_per_page:1
    });
    $("#pagination2").pagination(10, {
      num_edge_entries: 2,
      num_display_entries: 4,
      callback: $.noop,
      items_per_page:1
    });
  }

  return {
    render:_render
  }
});
