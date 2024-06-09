(function($) {
  "use strict";
  
  // Ion.RangeSlider examples
  $("#range-example1").ionRangeSlider();
  $("#range-example2").ionRangeSlider({
    min: 100,
    max: 1000,
    from: 550
  });
  $("#range-example3").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 1000,
    from: 200,
    to: 800,
    prefix: "$"
  });
  $("#range-example4").ionRangeSlider({
    type: "double",
    grid: true,
    min: -1000,
    max: 1000,
    from: -500,
    to: 500
  });
  $("#range-example5").ionRangeSlider({
    type: "double",
    grid: true,
    min: -1000,
    max: 1000,
    from: -500,
    to: 500,
    step: 250
  });
  $("#range-example6").ionRangeSlider({
    type: "double",
    grid: true,
    min: -12.8,
    max: 12.8,
    from: -3.2,
    to: 3.2,
    step: 0.1
  });
  $("#range-example7").ionRangeSlider({
    type: "double",
    grid: true,
    from: 1,
    to: 5,
    values: [0, 10, 100, 1000, 10000, 100000, 1000000]
  });
  $("#range-example8").ionRangeSlider({
    grid: true,
    from: 5,
    values: [
        "zero", "one",
        "two", "three",
        "four", "five",
        "six", "seven",
        "eight", "nine",
        "ten"
    ]
  });
  $("#range-example9").ionRangeSlider({
    grid: true,
    from: 3,
    values: [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ]
  });
})(jQuery);