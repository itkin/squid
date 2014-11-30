//= require jquery
//= require jquery.effects.core
//= require cycle
//= require twitter/bootstrap/bootstrap-modal
//= require twitter/bootstrap/bootstrap-scrollspy


$(document).ready(function(){

  var ua = navigator.userAgent,
      click = (ua.match(/iPad/i)) ? "touchend" : "click";

//    $("body").on("tap", function(){
//      console.log('taped')
//      console.log(this)
//    })
//    $("body").on("touch", function(){
//      console.log('touched')
//      console.log(this)
//    })

  $('#diapos').cycle('fade')

  $("#menu a").bind(click, function(e){
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
      $(html).replaceAll($this).find('button.submit').after("<span class='success'>Merci !</span>");
      setTimeout(function(){
        $('.success').fadeOut();
      }, 5000)
    }).error(function(xhr){
      $this.replaceWith(xhr.responseText);
    })
  });

  $('#play-button-wrapper').hover(function(e){
    if ( $.browser.msie && $.browser.version < 9 ) {
      $(this).find('i.blue').toggle();
    } else {
      $(this).find('i.blue').fadeToggle(500);
    }
  });

//    $("#play-button-wrapper").bind(click, function(e){
//      e.preventDefault();
//      $("#demo.modal").modal();
//    })

  $('#about .span4, .feature, #contact ul li, button.submit ').hover(function(e){
    if ( $.browser.msie && $.browser.version < 9 ) {
      $(this).find('i.picto-blue').toggle();
    } else {
      $(this).find('i.picto-blue').fadeToggle(500);
    }
  });

  if (ua.match(/iPad/i)){
    $('#contact li a').on('click touchend', function(e) {
        var el = $(this);
        var link = el.attr('href');
        window.location = link;
    });
  }

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
