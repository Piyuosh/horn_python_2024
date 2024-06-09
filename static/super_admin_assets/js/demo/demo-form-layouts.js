(function($) {
  "use strict";
  
  $(function(){
    //iCheck
    $('input.icheck-minimal-grey').iCheck({
      checkboxClass: 'icheckbox_minimal-grey',
      radioClass: 'iradio_minimal-grey'
    });

    //Select2
    $(".content select").select2({
      theme: "bootstrap"
    });

  })

  $('.content .nav-tabs a[data-toggle="tab"]').on('shown.bs.tab', function () {
    $(".content select").select2({
      theme: "bootstrap"
    });
  })
})(jQuery);