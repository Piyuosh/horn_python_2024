(function($) {
  "use strict";
  
  // Tabdrop
	$.fn.tabdrop.defaults.text = "<i class='fa fa-angle-down'></i>";
	$(".nav-pills, .nav-tabs").tabdrop();

	// Removing caret
	$(".tabdrop .caret").remove();
})(jQuery);