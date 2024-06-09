(function($) {
  "use strict";
  
  // Initializing Sortable Lists plugin
  var options = {
    opener: {
      active: true,
      as: 'html',
      close: '<i class="fa fa-minus-circle"></i>',
      open: '<i class="fa fa-plus-circle"></i>',
      openerClass: 'sortable-item-opener'
    },
    placeholderClass: 'sortable-item-placeholder',
    hintClass: 'sortable-item-hint',
    currElClass: 'sortable-item-active'
  };

  $('.sortable-list').sortableLists(options);
})(jQuery);