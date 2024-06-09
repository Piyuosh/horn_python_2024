(function($) {
  "use strict";
  
  $(function(){
    // Initializing Select2
    $("select").select2({
      theme: "bootstrap",
      allowClear: true,
      placeholder: ""
    });

    // Bootstrap wizard default settings
    $.fn.bootstrapWizard.defaults.tabClass = "";
    $.fn.bootstrapWizard.defaults.previousSelector = ".btn-prev";
    $.fn.bootstrapWizard.defaults.nextSelector = ".btn-next";
    $.fn.bootstrapWizard.defaults.lastSelector = ".btn-finish";

    // Arrow step example
    $("#wizard-arrow").bootstrapWizard();

    // Circle step example
    $("#wizard-circle").bootstrapWizard();

    // Line step example
    $("#wizard-line").bootstrapWizard();
  })
})(jQuery);