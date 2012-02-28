(function($){
  $(document).ready(function(){
    $("#menu a").click(function(e){
      e.preventDefault();
      $("body").animate({scrollTop: $($(this).attr("href")).offset()['top'] - 130},$.fx.speeds.slow, "easeInOutExpo")
    })
  });
})(jQuery)