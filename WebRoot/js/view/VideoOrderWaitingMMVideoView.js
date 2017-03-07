define(["tool/Utils"], function (utils) {
  var textArray = ['.','..','...'];
  var timeIndex = 0;
  var inter = setInterval(function(){
    timeIndex++;
    $('#coffeeText').text('坐席MM马上就来，请稍等' + textArray[timeIndex%3]);
  },1000);
  return {
  }
});
