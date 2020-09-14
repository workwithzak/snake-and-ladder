$(document).ready(function () {

  $("#createGame").on("click", function() {
    $("#gameUrl").attr("disabled", true);    
  });

  $("#joinGame").on("click", function() {
    $("#gameUrl").attr("disabled", false);
  });

  $('.static-box:odd').addClass('lb-sb-odd');
  $('.static-box:even').addClass('lb-sb-even');

  $('.user:odd').addClass('lb-sb-u-odd');
  $('.user:even').addClass('lb-sb-u-even');

});



