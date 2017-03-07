/**
 * Created by dell on 2016/12/12.
 */
var pageName = $(".page").data('page');
require(['controllers/' + pageName + 'Controller'],function(controller){
  controller.init();
  if($('input,textarea').length !== 0)
  $('input,textarea').placeholder();
})
