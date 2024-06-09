(function($) {
  "use strict";
  
  // Bootpage examples
  // Basic example
  $('#bootpag-pagination-basic').bootpag({
    total: 10
  }).on("page", function(event, /* page number here */ num){
    $(this).prev().html("Page " + num); // some ajax content loading...
  });

  // Pro example
  $('#bootpag-pagination-pro').bootpag({
     total: 9,
     page: 5,
     maxVisible: 6,
     href: "#pro-page-{{number}}",
     leaps: false,
     next: 'next',
     prev: null
  }).on('page', function(event, num){
      $(this).prev().html("Page " + num); // or some ajax content loading...
  });

  // Full example
  $('#bootpag-pagination-full').bootpag({
    total: 50,
    page: 2,
    maxVisible: 5,
    leaps: true,
    firstLastUse: true,
    first: '←',
    last: '→',
    wrapClass: 'pagination',
    activeClass: 'active',
    disabledClass: 'disabled',
    nextClass: 'next',
    prevClass: 'prev',
    lastClass: 'last',
    firstClass: 'first'
  }).on("page", function(event, num){
    $(this).prev().html("Page " + num); // or some ajax content loading...
  });
})(jQuery);