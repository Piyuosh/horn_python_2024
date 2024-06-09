(function($) {
  "use strict";
  
  $(function(){
    // Blockui default settings
    $.blockUI.defaults.timeout = 2000;
    $.blockUI.defaults.overlayCSS.zIndex = 1060;
    $.blockUI.defaults.overlayCSS.backgroundColor = 'transparent';
    $.blockUI.defaults.css.width = 'auto';
    $.blockUI.defaults.css.left = 0;
    $.blockUI.defaults.css.right = 0;
    $.blockUI.defaults.css.margin = 'auto';
    $.blockUI.defaults.css.border = 'none';
    
    // Blockui examples
    // Example1
    $('#blockui-example1').click(function(){ 
      $.blockUI({
        message: '<h3 class="m-0">Please wait...</h3>',
        css: {
          'width': '30%',
          'border': 'none',
          'padding': '15px', 
          'background-color': '#000', 
          'opacity': .5, 
          'color': '#fff' 
        },
        // Change default timeout
        //timeout: 2000
      });
    });

    // Example2
    $('#blockui-example2').click(function(){ 
      $(this).closest('.panel').block({ 
        message: '<i class="fa fa-spinner fa-pulse" style="font-size: 30px"></i>',
        overlayCSS: {
          'background-color': 'rgba(0,0,0,.2)'
        },
        css: { 
          'border': 'none',
          'padding': '15px', 
          'background-color': '',
        }
      });
    });

    // Example3
    $('#blockui-example3').click(function(){ 
      $(this).closest('.table').block({ 
        message: '<i class="fa fa-spinner fa-spin" style="font-size: 30px"></i>',
        overlayCSS: {
          'background-color': '#ddd'
        },
        css: { 
          'border': 'none',
          'padding': '15px', 
          'background-color': '',
        }
      });
    });

    // Example4
    $('#blockui-example4').click(function(){ 
      $.blockUI({ 
        message: '<div class="alert alert-success border-success border-left-bold alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span>&times;</span></button><strong>Well done!</strong> You successfully read this important alert message.</div>', 
        fadeIn: 700, 
        fadeOut: 700, 
        timeout: 2000, 
        showOverlay: false, 
        centerY: false,
        timeout: 3000, 
        css: {
          'width': '30%',
          'top': '60px',
          'left': 'auto',
          'right': '10px' 
        }
      }); 
    });

    // Example5
    $('#blockui-example5').click(function(){ 
      $(this).closest('.table').block({ 
        message: '<button type="text" class="btn btn-inverse btn-lg"><i class="fa fa-circle-o-notch fa-spin"></i> Please wait...</button>'
      });
    });
  });
})(jQuery);