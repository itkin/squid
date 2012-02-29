(function($){
  $(document).ready(function(){
    $("#menu a").click(function(e){
      e.preventDefault();
      var offset = parseInt($('#content').css('marginTop').replace('px',''))
      $("body").animate({scrollTop: $($(this).attr("href")).offset()['top'] - offset},$.fx.speeds.slow, "easeInOutExpo")
    })
  });
})(jQuery)