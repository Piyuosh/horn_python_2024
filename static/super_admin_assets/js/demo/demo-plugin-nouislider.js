(function($) {
  "use strict";
  
  // NoUiSlider examples
  var handlesSlider = document.getElementById('slider-handles');
  noUiSlider.create(handlesSlider, {
    start: [ 4000, 8000 ],
    connect: true,
    range: {
      'min': [  2000 ],
      'max': [ 10000 ]
    }
  });

  var rangeSlider = document.getElementById('slider-range');
  noUiSlider.create(rangeSlider, {
    start: [ 6000 ],
    range: {
      'min': [  2000 ],
      'max': [ 10000 ]
    }
  });

  var stepSlider = document.getElementById('slider-step');
  noUiSlider.create(stepSlider, {
    start: [ 4000 ],
    step: 1000,
    range: {
      'min': [  2000 ],
      'max': [ 10000 ]
    }
  });
  var stepSliderValueElement = document.getElementById('slider-step-value');
  stepSlider.noUiSlider.on('update', function( values, handle ) {
    stepSliderValueElement.innerHTML = values[handle];
  });

  var nonLinearSlider = document.getElementById('slider-non-linear');
  noUiSlider.create(nonLinearSlider, {
    start: [ 4000 ],
    range: {
      'min': [  2000 ],
      '30%': [  4000 ],
      '70%': [  8000 ],
      'max': [ 10000 ]
    }
  });
  var nonLinearSliderValueElement = document.getElementById('slider-non-linear-value');
  // Show the value for the *last* moved handle.
  nonLinearSlider.noUiSlider.on('update', function( values, handle ) {
    nonLinearSliderValueElement.innerHTML = values[handle];
  });

  var nonLinearStepSlider = document.getElementById('slider-non-linear-step');
  noUiSlider.create(nonLinearStepSlider, {
    start: [ 500, 4000 ],
    connect: true,
    range: {
      'min': [     0 ],
      '10%': [   500,  500 ],
      '50%': [  4000, 1000 ],
      'max': [ 10000 ]
    }
  });
  var nonLinearStepSliderValueElement = document.getElementById('slider-non-linear-step-value');
  nonLinearStepSlider.noUiSlider.on('update', function( values, handle ) {
    nonLinearStepSliderValueElement.innerHTML = values[handle];
  });

  var snapSlider = document.getElementById('slider-snap');
  noUiSlider.create(snapSlider, {
    start: [ 100, 1000 ],
    snap: true,
    connect: true,
    range: {
      'min': 0,
      '10%': 50,
      '20%': 100,
      '30%': 150,
      '40%': 500,
      '50%': 800,
      '60%': 1000,
      'max': 1200
    }
  });
  var snapValues = [
    document.getElementById('slider-snap-value-lower'),
    document.getElementById('slider-snap-value-upper')
  ];

  snapSlider.noUiSlider.on('update', function( values, handle ) {
    snapValues[handle].innerHTML = values[handle];
  });
})(jQuery);