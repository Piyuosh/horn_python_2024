(function($) {
  "use strict";
  
  $(function(){
    var default_title = 'Default title.';
    var default_msg = 'This is a default text.';

    function print(){
      var pre = $('#show-options');
      var container = pre.find('> span');

      container.find('span, br').remove();

      for(var option in toastr.options){

        var key = option; 
        var value = toastr.options[option];

        if(typeof value !== 'boolean'){
          value = '"' + value + '"';
        }

        container.append('<span>'+ '"' +key + '"' + ': ' + value+',</span>' + '<br>');
      }
    }
    print();

    $('#showtoast').on('click', function(){
      var toast_status = $('#toast-status-wrapper input:radio:checked').val();
      var title = ( $('#msg-title').val() ) ? $('#msg-title').val() : default_title;
      var message = ( $('#msg-desc').val() ) ? $('#msg-desc').val() : default_msg;

      var close_btn = $('#close-btn');
      var de_bug = $('#debug');
      var prog_bar = $('#progress-bar');
      var toast_pos = $('#toast-pos-wrapper input:radio:checked');
      var show_time = $('#showDuration');
      var hide_time = $('#hideDuration');
      var time_out = $('#timeOut');
      var ext_timeout = $('#extendedTimeOut');
      var disp_easing = $('#showEasing');
      var hide_easing = $('#hideEasing');
      var show_method = $('#showMethod');
      var hide_method = $('#hideMethod');

      toastr.options = {
        "closeButton": close_btn.prop('checked'),
        "debug": de_bug.prop('checked'),
        "progressBar": prog_bar.prop('checked'),
        "positionClass": toast_pos.val()
      }

      if (show_time.val().length) {
        toastr.options.showDuration = show_time.val();
      }

      if (hide_time.val().length) {
        toastr.options.hideDuration = hide_time.val();
      }

      if (time_out.val().length) {
        toastr.options.timeOut = time_out.val();
      }

      if (ext_timeout.val().length) {
        toastr.options.extendedTimeOut = ext_timeout.val();
      }

      if (disp_easing.val().length) {
        toastr.options.showEasing = disp_easing.val();
      }

      if (hide_easing.val().length) {
        toastr.options.hideEasing = hide_easing.val();
      }

      if (show_method.val().length) {
        toastr.options.showMethod = show_method.val();
      }

      if (hide_method.val().length) {
        toastr.options.hideMethod = hide_method.val();
      }

      
      var init_toastr = toastr[toast_status](title, message);

      function getLastToast(){
        return init_toastr;
      }
      $('#clear_last_toast').click(function () {
          toastr.clear(getLastToast());
      });
      $('#clear_toasts').click(function () {
          toastr.clear();
      });

      print();
    })
  })
})(jQuery);