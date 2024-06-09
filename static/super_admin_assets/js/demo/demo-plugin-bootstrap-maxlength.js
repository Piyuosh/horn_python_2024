(function($) {
  "use strict";
  
  // Maxlength examples
  $('#maxlength-example1').maxlength({
    threshold: 20
  });

  $('#maxlength-example2').maxlength({
    alwaysShow: true,
    threshold: 10,
    warningClass: "label label-success",
    limitReachedClass: "label label-danger"
  });

  $('#maxlength-example3').maxlength({
    alwaysShow: true,
    threshold: 10,
    warningClass: "label label-success",
    limitReachedClass: "label label-danger",
    separator: ' of ',
    preText: 'You have ',
    postText: ' chars remaining.',
    validate: true
  });

  $('#maxlength-example4').maxlength({
    alwaysShow: true
  });
})(jQuery);