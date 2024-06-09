(function($) {
  "use strict";
  
  // Touchspin examples
  // Prefix example
  $("#touchspin-example1").TouchSpin({
      min: -1000000000,
      max: 1000000000,
      stepinterval: 50,
      maxboostedstep: 10000000,
      prefix: '$'
  });

  // Postfix example
  $("#touchspin-example2").TouchSpin({
      min: 0,
      max: 100,
      step: 0.1,
      decimals: 2,
      boostat: 5,
      maxboostedstep: 10,
      postfix: '%'
  });

  // Vertical button alignment example
  $("#touchspin-example3").TouchSpin({
    verticalbuttons: true
  });

  // Vertical buttons with custom icons
  $("#touchspin-example4").TouchSpin({
    verticalbuttons: true,
    verticalupclass: 'fa fa-plus',
    verticaldownclass: 'fa fa-minus'
  });

  // Init with empty value
  $("#touchspin-example5").TouchSpin();

  // #example6 - Value attribute is not set (applying settings.initval)
  $("#touchspin-example6").TouchSpin({
    initval: 40
  });

  // #example7 - Value is set explicitly to 33 (skipping settings.initval)
  $("#touchspin-example7").TouchSpin({
    initval: 40
  });

  // Sizing
  // Button postfix(small) example
  $("#touchspin-example8").TouchSpin({
    postfix: "a button",
    postfix_extraclass: "btn btn-default"
  });

  // Button postfix (large) example
  $("#touchspin-example9").TouchSpin({
    postfix: "a button",
    postfix_extraclass: "btn btn-default"
  });

  // Button group example
  $("#touchspin-example10").TouchSpin({
      prefix: "pre",
      postfix: "post"
  });
})(jQuery);