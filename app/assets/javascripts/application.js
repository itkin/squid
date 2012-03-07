// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap


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