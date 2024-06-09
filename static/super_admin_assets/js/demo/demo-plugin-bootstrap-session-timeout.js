
(function($) {
  "use strict";
  
  $(function(){
      $.sessionTimeout({
        keepAliveUrl: false,
        logoutUrl: 'page-login1.html',
        redirUrl: 'plugin-bootstrap-session-timeout.html',
        warnAfter: 3000,
        redirAfter: 8000,
        countdownMessage: 'Redirecting in {timer} seconds.',
        countdownBar: true,
        ignoreUserActivity: true
      });
  })
})(jQuery);