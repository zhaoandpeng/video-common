define([], function () {
    var linkUrl = 'api/home.json';
    var _param = {
        "data":{},
        "url" :linkUrl,
        "success" : function(){
        },
        "error":function(){

        },
        "dataType":"json",
        "timeout" : 3000
    };
    function setUrl(name){
        switch (name){
          //录制模块
          case 'recording':
            //风测提交
          case 'riskSub':
            //签名
          case 'signSub':
            linkUrl = '../api/video.json';
            break;

          default : linkUrl ="";
            break;
        }
        _param.url = linkUrl;
    }



    function _load(obj,param){
        var name = typeof obj == "string" ? obj : obj.name;
        setUrl(name);
        if(arguments.length!=2 && typeof param !="object") return;
        for(var pop in param){
            _param[pop] = param[pop];
        }
        $.ajax(_param);
    }
    return {
        load: _load
    };
});
