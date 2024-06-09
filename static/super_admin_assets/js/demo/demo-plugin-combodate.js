(function($) {
  "use strict";
  
  $(function(){
	  // Combodate examples
	  // First two examples
	  $("#date, #datetime24").combodate();

	  // Time example
	  $("#time").combodate({
	      firstItem: "name", //show 'hour' and 'minute' string at first item of dropdown
	      minuteStep: 1
	  });  
	});
})(jQuery);