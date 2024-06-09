(function($) {
  "use strict";
  
  // Bootstrap Slider examples
  // Basic example
  $('#bs-basic').slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });

  // Range example
  $("#bs-range").slider();

  // RGB example
  var RGBChange = function() {
    $('#bs-rgb').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
  };

  var r = $('#bs-r').slider()
      .on('slide', RGBChange)
      .data('slider');
  var g = $('#bs-g').slider()
      .on('slide', RGBChange)
      .data('slider');
  var b = $('#bs-b').slider()
      .on('slide', RGBChange)
      .data('slider');

  // Vertical example
  $("#bs-vertical").slider({
    reversed : true
  });

  // Ticks, labels example
  $("#bs-ticks-labels").slider({
    ticks: [0, 100, 200, 300, 400],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    ticks_snap_bounds: 30
  });

  // Snap to point example
  $("#bs-snap-point").slider();
})(jQuery);