(function($) {
  "use strict";
  
  $(function(){
    // Minimal skin
    $('input.icheck-minimal-grey').iCheck({
      checkboxClass: 'icheckbox_minimal-grey',
      radioClass: 'iradio_minimal-grey'
    });

    $('input.icheck-minimal-blue').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue'
    });

    $('input.icheck-minimal-green').iCheck({
      checkboxClass: 'icheckbox_minimal-green',
      radioClass: 'iradio_minimal-green'
    });

    $('input.icheck-minimal-aero').iCheck({
      checkboxClass: 'icheckbox_minimal-aero',
      radioClass: 'iradio_minimal-aero'
    });

    $('input.icheck-minimal-orange').iCheck({
      checkboxClass: 'icheckbox_minimal-orange',
      radioClass: 'iradio_minimal-orange'
    });

    $('input.icheck-minimal-red').iCheck({
      checkboxClass: 'icheckbox_minimal-red',
      radioClass: 'iradio_minimal-red'
    });

    // Square skin
    $('input.icheck-square-grey').iCheck({
      checkboxClass: 'icheckbox_square-grey',
      radioClass: 'iradio_square-grey'
    });

    $('input.icheck-square-blue').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue'
    });

    $('input.icheck-square-green').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
    });

    $('input.icheck-square-aero').iCheck({
      checkboxClass: 'icheckbox_square-aero',
      radioClass: 'iradio_square-aero'
    });

    $('input.icheck-square-orange').iCheck({
      checkboxClass: 'icheckbox_square-orange',
      radioClass: 'iradio_square-orange'
    });

    $('input.icheck-square-red').iCheck({
      checkboxClass: 'icheckbox_square-red',
      radioClass: 'iradio_square-red'
    });

    // Flat skin
    $('input.icheck-flat-grey').iCheck({
      checkboxClass: 'icheckbox_flat-grey',
      radioClass: 'iradio_flat-grey'
    });

    $('input.icheck-flat-blue').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat-blue'
    });

    $('input.icheck-flat-green').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass: 'iradio_flat-green'
    });

    $('input.icheck-flat-aero').iCheck({
      checkboxClass: 'icheckbox_flat-aero',
      radioClass: 'iradio_flat-aero'
    });

    $('input.icheck-flat-orange').iCheck({
      checkboxClass: 'icheckbox_flat-orange',
      radioClass: 'iradio_flat-orange'
    });

    $('input.icheck-flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-red',
      radioClass: 'iradio_flat-red'
    });

    // Line skin
    $('.icheck-line-grey').each(function(){
      var self = $(this),
        // Following the Bootstrap markup structure and being already located in the <label> we use a <small> that acts as a <label>.
        small = self.next(),
        small_text = small.text();

      small.remove();
      self.iCheck({
        checkboxClass: 'icheckbox_line-grey',
        radioClass: 'iradio_line-grey',
        insert: '<div class="icheck_line-icon"></div>' + small_text
      });
    });

    $('.icheck-line-blue').each(function(){
      var self = $(this),
        // Following the Bootstrap markup structure and being already located in the <label> we use a <small> that acts as a <label>.
        small = self.next(),
        small_text = small.text();

      small.remove();
      self.iCheck({
        checkboxClass: 'icheckbox_line-blue',
        radioClass: 'iradio_line-blue',
        insert: '<div class="icheck_line-icon"></div>' + small_text
      });
    });

    $('.icheck-line-green').each(function(){
      var self = $(this),
        // Following the Bootstrap markup structure and being already located in the <label> we use a <small> that acts as a <label>.
        small = self.next(),
        small_text = small.text();

      small.remove();
      self.iCheck({
        checkboxClass: 'icheckbox_line-green',
        radioClass: 'iradio_line-green',
        insert: '<div class="icheck_line-icon"></div>' + small_text
      });
    });

    $('.icheck-line-aero').each(function(){
      var self = $(this),
        // Following the Bootstrap markup structure and being already located in the <label> we use a <small> that acts as a <label>.
        small = self.next(),
        small_text = small.text();

      small.remove();
      self.iCheck({
        checkboxClass: 'icheckbox_line-aero',
        radioClass: 'iradio_line-aero',
        insert: '<div class="icheck_line-icon"></div>' + small_text
      });
    });

    $('.icheck-line-orange').each(function(){
      var self = $(this),
        // Following the Bootstrap markup structure and being already located in the <label> we use a <small> that acts as a <label>.
        small = self.next(),
        small_text = small.text();

      small.remove();
      self.iCheck({
        checkboxClass: 'icheckbox_line-orange',
        radioClass: 'iradio_line-orange',
        insert: '<div class="icheck_line-icon"></div>' + small_text
      });
    });

    $('.icheck-line-red').each(function(){
      var self = $(this),
        // Following the Bootstrap markup structure and being already located in the <label> we use a <small> that acts as a <label>.
        small = self.next(),
        small_text = small.text();

      small.remove();
      self.iCheck({
        checkboxClass: 'icheckbox_line-red',
        radioClass: 'iradio_line-red',
        insert: '<div class="icheck_line-icon"></div>' + small_text
      });
    });
  });
})(jQuery);