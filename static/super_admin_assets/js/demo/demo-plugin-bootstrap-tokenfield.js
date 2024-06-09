(function($) {
  "use strict";
  
  // Tokenfield examples
	var colorArr = ['red', 'blue', 'green' , 'yellow', 'violet', 'brown', 'purple', 'black', 'white'];

	// Jquery UI autocomplete example
	$('#tokenfield-jquery-ui').tokenfield({
	  autocomplete: {
	    source: colorArr,
	    delay: 100
	  },
	  showAutocompleteOnFocus: true
	});

	// Typeahead example
	var engine = new Bloodhound({
	  local: colorArr,
	  datumTokenizer: Bloodhound.tokenizers.whitespace,
	  queryTokenizer: Bloodhound.tokenizers.whitespace
	});

	$('#tokenfield-typeahead').tokenfield({
	  typeahead: [null, { source: engine.ttAdapter() }]
	});

	// Copy, paste example
	$('#tokenfield-copy-paste').tokenfield();

	// Validation states example
	$('#tokenfield-success, #tokenfield-warning, #tokenfield-error').tokenfield();

	// Input group examples
	$('#tokenfield-addon-left, #tokenfield-addon-right, #tokenfield-addon-checkbox, #tokenfield-addon-radio, #tokenfield-lg, #tokenfield-default, #tokenfield-sm').tokenfield();

	// Disabled
	$('#tokenfield-disabled').tokenfield();

	// Horizontal form
	$('#tokenfield-h-form-tags').tokenfield();
})(jQuery);