(function($) {
  "use strict";
  
  // Stateful buttons
	$('.btn[data-complete-text]').on('click', function(){
	  $(this).button('complete');
	})
})(jQuery);