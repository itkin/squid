//= require jquery
//= require jquery.effects.core
//= require twitter/bootstrap

(function($){
  $(document).ready(function(){

//    $("#menu a").click(function(e){
//      e.preventDefault();
//      var offset = 0 //parseInt($('#home').css('marginTop').replace('px',''))
//      $("body").animate({scrollTop: $($(this).attr("href")).offset()['top'] - offset}, 2000, "easeInOutExpo")
//    });

    $('body').on('submit','form', function(e){
      e.preventDefault();
      var $this = $(this);
      $.post($this.attr('action'), $this.serialize()).success(function(html){
        $(html).replaceAll($this).find('button.submit').after("<span class='success'>Thank you!</span>");
      }).error(function(xhr){
        $this.replaceWith(xhr.responseText);
      })
    });

    $('.round').hover(function(e){
      $(this).find('i.picto-blue').fadeToggle();
    })

    $('#contact ul li').hover(function(e){
      $(this).find('i.picto-blue').fadeToggle();
    })

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
})(jQuery);