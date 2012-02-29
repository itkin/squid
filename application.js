(function($){
  $(document).ready(function(){
    $("#menu a").click(function(e){
      e.preventDefault();
      var offset = parseInt($('#content').css('marginTop').replace('px',''))
      $("body").animate({scrollTop: $($(this).attr("href")).offset()['top'] - offset},$.fx.speeds.slow, "easeInOutExpo")
    });
    $('.feature-slider').click(function(e){
      var $this = $(this);
      e.stopPropagation();
      if ($(e.target).hasClass('title') && $this.css('marginTop') == "-216px"){
        $this.animate({marginTop: "0"})
        $this.removeClass("opened")
      } else {
        $this.animate({marginTop: "-216px"});
        $this.addClass("opened")
      }


      $("body").one('click', function(e){
        $this.animate({marginTop: "0"})
        $this.removeClass("opened")
      })

//      $(this).closest('.feature-slider').animate({marginTop: "-196px"})
    })
  });
})(jQuery)