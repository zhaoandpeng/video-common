Handlebars.registerHelper('btnshow', function(items, options) {
    var word,btnclass;
    if(items =="soon"){
        word = "马上面签";
        btnclass="";
    }else{
        word = "继续面签";
        btnclass = "redB"
    }
   var btn = '<div class="btn-group">'+
                    '<button type="button" class="btn btn-default btn-1 '+btnclass+'">'+word+'</button>'+
                    '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'+
                    '<span class="caret"></span>'+
                    '<span class="sr-only">切换下拉菜单</span>'+
                    '</button>'+
                '<ul class="dropdown-menu" role="menu">'+
                    '<li class="drop-write"><a href="javascript:void(0);">编辑</a></li>'+
                    '<li class="drop-del"><a href="javascript:void(0);">删除</a></li>'+
                '</ul>'+
            '</div>';
    return btn;
});
