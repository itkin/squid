//= require jquery
//= require jquery.effects.core
//= require twitter/bootstrap

(function($){
  $(document).ready(function(){

    var ua = navigator.userAgent,
        click = (ua.match(/iPad/i)) ? "touchstart" : "click";

    $("#menu a").bind(click, function(e){
      e.preventDefault();
      $('html,body').animate({scrollTop:  $($(this).attr("href")).offset()['top'] - 129}, 1500, "easeInOutCubic")
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

    $('#play-button').hover(function(e){
      $(this).find('i.blue').fadeToggle(1000);
    }).click(function(e){
      e.preventDefault();
      var $modal = $("#demo.modal"),
          width = 613,
          height = 322,
          marginLeft =  613 / 2 ;

      $modal.css({overflow: "hidden", width: (width + 32 )+ 'px', height: (height + 32)+ 'px', marginLeft: '-' + marginLeft + 'px' });
      $modal.find('.modal-body').html('<iframe src="http://player.vimeo.com/video/'+$modal.attr('data-target-id') + '?title=0&amp;portrait=0&amp;autoplay=1" width="'+width+'" height="'+ height +'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
      $modal.modal();

    })

    $('.feature, #contact ul li, button.submit ').hover(function(e){
      $(this).find('i.picto-blue').fadeToggle(1000);
    })

    $('body').on(click,"div.feature-slider", function(e){
      var $this = $(this);
      e.preventDefault();
      console.log(this);
      //e.stopImmediatePropagation();
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