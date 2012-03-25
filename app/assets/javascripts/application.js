//= require jquery
//= require jquery.effects.core
//= require twitter/bootstrap/bootstrap-modal
//= require twitter/bootstrap/bootstrap-scrollspy

(function($){
  $(document).ready(function(){

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-26587970-1']);
    _gaq.push(['_setDomainName', 'squid-corp.com']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();


    var ua = navigator.userAgent,
        click = (ua.match(/iPad/i)) ? "touchstart" : "click";

    $("#menu a").bind("click tap", function(e){
      e.preventDefault();
      var anchor = $(this).attr("href");
      $('html,body').animate({ scrollTop:  ($(anchor).offset().top - 129) + "px" }, 1500, "easeInOutCubic")
    });

    $("a.brand").on(click, function(e){
      e.preventDefault();
      $('html,body').animate({scrollTop:  0}, 1500, "easeInOutCubic")
    });

    $('body').on('submit','form', function(e){
      e.preventDefault();
      var $this = $(this);
      $.post($this.attr('action'), $this.serialize()).success(function(html){
        $(html).replaceAll($this).find('button.submit').after("<span class='success'>Thank you!</span>");
      }).error(function(xhr){
        $this.replaceWith(xhr.responseText);
      })
    });

    $('#play-button-wrapper').hover(function(e){
      if ( $.browser.msie && $.browser.version < 9 ) {
        $(this).find('i.picto-blue').toggle();
      } else {
        $(this).find('i.picto-blue').fadeToggle(500);
      }
    });

    $("#play-button-wrapper").bind(click, function(e){
      e.preventDefault();
      $("#demo.modal").modal();
    })

    $('.feature, #contact ul li, button.submit ').hover(function(e){
      if ( $.browser.msie && $.browser.version < 9 ) {
        $(this).find('i.picto-blue').toggle();
      } else {
        $(this).find('i.picto-blue').fadeToggle(500);
      }
    })

    $('body').on(click,"div.feature-slider", function(e){
      var $this = $(this);
      e.preventDefault();
      e.stopImmediatePropagation();
      if ($this.hasClass('opened')){
        $this.animate({marginTop: "0"})
        $this.removeClass("opened")
      } else {
        $this.animate({marginTop: "-241px"});
        $this.addClass("opened")
        $("body").one(click, function(e){
          $this.animate({marginTop: "0"})
          $this.removeClass("opened")
        })
      }
    })
    $(".modal").bind('shown', function(){
      $(this).css({top: (( window.innerHeight - $(this).height() ) / 2) + 'px', marginTop: 0 });
    })
  });
})(jQuery);