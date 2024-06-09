(function($) {
  "use strict";
  
  $(function(){
	  // For performance reasons, the Tooltip and Popover data-apis are opt-in, meaning you must initialize them yourself.
	  $('[data-toggle="popover"]').popover();
	  $('[data-toggle="tooltip"]').tooltip();
	});
})(jQuery);