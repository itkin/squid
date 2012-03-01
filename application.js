(function($){
  $(document).ready(function(){
    $("#menu a").click(function(e){
      e.preventDefault();
      var offset = parseInt($('#home').css('marginTop').replace('px',''))
      $("body").animate({scrollTop: $($(this).attr("href")).offset()['top'] - offset}, 2000, "easeInOutExpo")
    });

    $('.feature-slider').click(function(e){
      var $this = $(this);
      e.stopImmediatePropagation();
      e.preventDefault();
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