//= require jquery
//= require jquery.effects.core
//= require twitter/bootstrap

(function($){
  $(document).ready(function(){

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-26587970-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    var ua = navigator.userAgent,
        click = (ua.match(/iPad/i)) ? "touchstart" : "click";

    $("#menu a").bind(click, function(e){
      e.preventDefault();
      $('html,body').animate({scrollTop:  $($(this).attr("href")).offset()['top'] - 129}, 1500, "easeInOutCubic")
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
      $(this).find('i.blue').fadeToggle(1000);
    });

    $("#play-button-wrapper").bind(click, function(e){
      e.preventDefault();
      var $modal = $("#demo.modal"),
          width = 613,
          height = 322,
          marginLeft =  613 / 2 ;

      $modal.css({overflow: "hidden", width: (width + 4 )+ 'px', height: (height + 4)+ 'px', marginLeft: '-' + marginLeft + 'px' });
      $modal.find('.modal-body').html('<iframe src="http://player.vimeo.com/video/'+$modal.attr('data-target-id') + '?title=0&amp;portrait=0&amp;autoplay=1" width="'+width+'" height="'+ height +'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
      $modal.modal();
    })

    $('.feature, #contact ul li, button.submit ').hover(function(e){
      $(this).find('i.picto-blue').fadeToggle(500);
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


//      $(this).closest('.feature-slider').animate({marginTop: "-196px"})
    })
  });
})(jQuery);