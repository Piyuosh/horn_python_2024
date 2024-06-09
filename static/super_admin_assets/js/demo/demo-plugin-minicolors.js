(function($) {
  "use strict";
  
  $(function(){
    // Minicolors plugin defaults
    $.minicolors.defaults = $.extend($.minicolors.defaults, {
      theme: 'bootstrap'
    });

    // Initializing minicolors plugin
    $('#minicolors-hue, #minicolors-brightness, #minicolors-saturation, #minicolors-wheel, #minicolors-text, #minicolors-hidden').minicolors();

    $('#minicolors-inline').minicolors({
      inline: true
    });

    $('#minicolors-rgb').minicolors({
      format: 'rgb'
    });

    $('#minicolors-rgba').minicolors({
      format: 'rgb',
      opacity: .5
    });

    // Positions
    $('#minicolors-bl').minicolors();
    
    $('#minicolors-br').minicolors({
      position: 'bottom right'
    });

    $('#minicolors-tl').minicolors({
      position: 'top left'
    });

    $('#minicolors-tr').minicolors({
      position: 'top right'
    });
  })
})(jQuery);