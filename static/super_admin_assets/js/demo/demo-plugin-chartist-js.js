(function($) {
  "use strict";
  
  /*======================LINE CHARTS===========================*/

  /*simple line chart*/
  new Chartist.Line('#simpleLine', {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [
      [12, 9, 7, 8, 5],
      [2, 1, 3.5, 7, 3],
      [1, 3, 4, 5, 6]
    ]
  }, {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  });




  /*line chart with holes in data*/
  new Chartist.Line('#holes-in-data', {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    series: [
      [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
      [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
      [null, null, null, null, 3, 4, 1, 3, 4,  6,  7,  9, 5, null, null, null]
    ]
  }, {
    fullWidth: true,
    chartPadding: {
      right: 40
    },
    low: 0
  });



  /*scatter data*/
  var times = function(n) {
    return Array.apply(null, new Array(n));
  };

  var scatterData = times(52).map(Math.random).reduce(function(data, rnd, index) {
    data.labels.push(index + 1);
    data.series.forEach(function(series) {
      series.push(Math.random() * 100)
    });

    return data;
  }, {
    labels: [],
    series: times(4).map(function() { return new Array() })
  });

  var scatterOptions = {
    showLine: false,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 13 === 0 ? 'W' + value : null;
      }
    }
  };

  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 4 === 0 ? 'W' + value : null;
        }
      }
    }]
  ];

  new Chartist.Line('#scatter-data', scatterData, scatterOptions, responsiveOptions);



  /*line chart with tooltips*/
  new Chartist.Line('#line-tooltips', {
    labels: ['1', '2', '3', '4', '5', '6'],
    series: [
      {
        name: 'Fibonacci sequence',
        data: [1, 2, 3, 5, 8, 13]
      },
      {
        name: 'Golden section',
        data: [1, 1.618, 2.618, 4.236, 6.854, 11.09]
      }
    ]
  },{
    fullWidth: true,
  });

  var $lineTooltips = $('#line-tooltips');

  var $toolTip = $lineTooltips
    .append('<div class="tooltip"></div>')
    .find('.tooltip')
    .hide();

  $lineTooltips.on('mouseenter', '.ct-point', function() {
    var $point = $(this),
      value = $point.attr('ct:value'),
      seriesName = $point.parent().attr('ct:series-name');
    $toolTip.html(seriesName + '<br>' + value).show();
  });

  $lineTooltips.on('mouseleave', '.ct-point', function() {
    $toolTip.hide();
  });

  $lineTooltips.on('mousemove', function(event) {
    $toolTip.css({
      left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
      top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
    });
  });



  /*line chart with area*/
  new Chartist.Line('#area-chart', {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [5, 9, 7, 8, 5, 3, 5, 4]
    ]
  }, {
    fullWidth: true,
    low: 0,
    showArea: true
  });



  /*bi-polar area only chart*/
  new Chartist.Line('#bi-polar', {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [1, 2, 3, 1, -2, 0, 1, 0],
      [-2, -1, -2, -1, -2.5, -1, -2, -1],
      [0, 0, 0, 1, 2, 2.5, 2, 1],
      [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
    ]
  }, {
    high: 3,
    low: -3,
    showArea: true,
    showLine: false,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showLabel: false,
      showGrid: false
    }
  });



  /*chart with SMIL animations*/
  var SMILchart = new Chartist.Line('#smil', {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    series: [
      [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
      [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
      [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
      [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
    ]
  }, {
    low: 0
  });

  // Let's put a sequence number aside so we can use it in the event callbacks
  var seq = 0,
    delays = 80,
    durations = 500;

  // Once the chart is fully created we reset the sequence
  SMILchart.on('created', function() {
    seq = 0;
  });

  // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
  SMILchart.on('draw', function(data) {
    seq++;

    if(data.type === 'line') {
      // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
      data.element.animate({
        opacity: {
          // The delay when we like to start the animation
          begin: seq * delays + 1000,
          // Duration of the animation
          dur: durations,
          // The value where the animation should start
          from: 0,
          // The value where it should end
          to: 1
        }
      });
    } else if(data.type === 'label' && data.axis === 'x') {
      data.element.animate({
        y: {
          begin: seq * delays,
          dur: durations,
          from: data.y + 100,
          to: data.y,
          // We can specify an easing function from Chartist.Svg.Easing
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'label' && data.axis === 'y') {
      data.element.animate({
        x: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 100,
          to: data.x,
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'point') {
      data.element.animate({
        x1: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 10,
          to: data.x,
          easing: 'easeOutQuart'
        },
        x2: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 10,
          to: data.x,
          easing: 'easeOutQuart'
        },
        opacity: {
          begin: seq * delays,
          dur: durations,
          from: 0,
          to: 1,
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'grid') {
      // Using data.axis we get x or y which we can use to construct our animation definition objects
      var pos1Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis.units.pos + '1'] - 30,
        to: data[data.axis.units.pos + '1'],
        easing: 'easeOutQuart'
      };

      var pos2Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis.units.pos + '2'] - 100,
        to: data[data.axis.units.pos + '2'],
        easing: 'easeOutQuart'
      };

      var animations = {};
      animations[data.axis.units.pos + '1'] = pos1Animation;
      animations[data.axis.units.pos + '2'] = pos2Animation;
      animations['opacity'] = {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      };

      data.element.animate(animations);
    }
  });

  // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
  SMILchart.on('created', function() {
    if(window.__exampleAnimateTimeout) {
      clearTimeout(window.__exampleAnimateTimeout);
      window.__exampleAnimateTimeout = null;
    }
    window.__exampleAnimateTimeout = setTimeout(SMILchart.update.bind(SMILchart), 12000);
  });



  /*SVG path animated chart*/
  var pathAnimated = new Chartist.Line('#path-animation', {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    series: [
      [1, 5, 2, 5, 4, 3],
      [2, 3, 4, 8, 1, 2],
      [5, 4, 3, 2, 1, 0.5]
    ]
  }, {
    low: 0,
    showArea: true,
    showPoint: false,
    fullWidth: true
  });

  pathAnimated.on('draw', function(data) {
    if(data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    }
  });






  /*======================BAR CHARTS===========================*/
  /*Bi-polar bar chart*/
  var biPolarBarData = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [
      [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
    ]
  };

  var biPolarBarOptions = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  new Chartist.Bar('#bi-polar-bars', biPolarBarData, biPolarBarOptions);



  /*overlapping bars chart*/
  var overlappingBarsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ]
  };

  var overlappingBarsOptions = {
    seriesBarDistance: 10
  };

  var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  new Chartist.Bar('#overlapping-bars', overlappingBarsData, overlappingBarsOptions, responsiveOptions);



  /*with peak circles on top*/
  // Create a simple bi-polar bar chart
  var peakCirclesChart = new Chartist.Bar('#peak-circles', {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [
      [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
    ]
  }, {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  });

  // Listen for draw events on the bar chart
  peakCirclesChart.on('draw', function(data) {
    // If this draw event is of type bar we can use the data to create additional content
    if(data.type === 'bar') {
      // We use the group element of the current series to append a simple circle with the bar peek coordinates and a circle radius that is depending on the value
      data.group.append(new Chartist.Svg('circle', {
        cx: data.x2,
        cy: data.y2,
        r: Math.abs(Chartist.getMultiValue(data.value)) * 2 + 5
      }, 'ct-slice-pie'));
    }
  });



  /*stacked bar chart*/
  new Chartist.Bar('#stacked-bars', {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  }, {
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function(value) {
        return (value / 1000) + 'k';
      }
    }
  }).on('draw', function(data) {
    if(data.type === 'bar') {
      data.element.attr({
        style: 'stroke-width: 30px'
      });
    }
  });




  /*horizontal bar chart*/
  new Chartist.Bar('#horizontal-bars', {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    series: [
      [5, 4, 3, 7, 5, 10, 3],
      [3, 2, 9, 5, 4, 6, 4]
    ]
  }, {
    seriesBarDistance: 10,
    reverseData: true,
    horizontalBars: true,
    axisY: {
      offset: 70
    }
  });



  /*======================PIE CHARTS===========================*/
  /*simple pie chart*/
  var simplePieData = {
    series: [5, 3, 4]
  };

  var sum = function(a, b) { return a + b };

  new Chartist.Pie('#simple-pie', simplePieData, {
    labelInterpolationFnc: function(value) {
      return Math.round(value / simplePieData.series.reduce(sum) * 100) + '%';
    }
  });



  /*pie chart with custom labels*/
  var customLabelsData = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40]
  };

  var customLabelsOptions = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };

  var respOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 80,
      chartPadding: 20
    }]
  ];

  new Chartist.Pie('#custom-labels', customLabelsData, customLabelsOptions, respOptions);



  /*gauge chart*/
  new Chartist.Pie('#gauge-chart', {
    series: [20, 10, 30, 40]
  }, {
    donut: true,
    donutWidth: 60,
    startAngle: 270,
    total: 200,
    showLabel: false
  });



  /*Animating donut*/
  var donutChart = new Chartist.Pie('#donut-animate', {
    series: [10, 20, 50, 20, 5, 50, 15],
    labels: [1, 2, 3, 4, 5, 6, 7]
  }, {
    donut: true,
    showLabel: false
  });

  donutChart.on('draw', function(donutdata) {
    if(donutdata.type === 'slice') {
      // Get the total path length in order to use for dash array animation
      var pathLength = donutdata.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      donutdata.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
      });

      // Create animation definition while also assigning an ID to the animation for later sync usage
      var animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + donutdata.index,
          dur: 1000,
          from: -pathLength + 'px',
          to:  '0px',
          easing: Chartist.Svg.Easing.easeOutQuint,
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze'
        }
      };

      // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
      if(donutdata.index !== 0) {
        animationDefinition['stroke-dashoffset'].begin = 'anim' + (donutdata.index - 1) + '.end';
      }

      // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
      donutdata.element.attr({
        'stroke-dashoffset': -pathLength + 'px'
      });

      // We can't use guided mode as the animations need to rely on setting begin manually
      // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
      donutdata.element.animate(animationDefinition, false);
    }
  });

  // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
  donutChart.on('created', function() {
    if(window.__anim21278907124) {
      clearTimeout(window.__anim21278907124);
      window.__anim21278907124 = null;
    }
    window.__anim21278907124 = setTimeout(donutChart.update.bind(donutChart), 10000);
  });
})(jQuery);