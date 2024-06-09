(function($) {
  "use strict";
  
  $(function(){
    $('input.icheck-minimal-grey').iCheck({
      checkboxClass: 'icheckbox_minimal-grey',
      radioClass: 'iradio_minimal-grey'
    });

    $(".content select").select2({
      theme: "bootstrap"
    });

    // Select2 sizing
    $('select.input-lg').next('.select2').addClass('input-lg');
    // Select2 sizing
    $('select.input-sm').next('.select2').addClass('input-sm');
  })

  $('.content .nav-tabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
    $(".content select").select2({
      theme: "bootstrap"
    });
  })
})(jQuery);