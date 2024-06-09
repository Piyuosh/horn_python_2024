(function($) {
  "use strict";
  
  $(function(){
    // Flot Basic
    var d1 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.25) {
      d1.push([i, Math.sin(i)]);
    }

    var d2 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.25) {
      d2.push([i, Math.cos(i)]);
    }

    var d3 = [];
    for (var i = 0; i < Math.PI * 2; i += 0.1) {
      d3.push([i, Math.tan(i)]);
    }

    $.plot("#flot-basic", [
      { label: "sin(x)", data: d1, color: '#5ebdec', shadowSize: 0 },
      { label: "cos(x)", data: d2, color: '#F9B56A', shadowSize: 0 },
      { label: "tan(x)", data: d3, color: '#EE6567', shadowSize: 0 }
    ],{
      series: {
        lines: {
          show: true
        },
        points: {
          show: true
        },
        shadowSize: 0
      },
      xaxis: {
        ticks: [
          0, [ Math.PI/2, "\u03c0/2" ], [ Math.PI, "\u03c0" ],
          [ Math.PI * 3/2, "3\u03c0/2" ], [ Math.PI * 2, "2\u03c0" ]
        ],
        tickColor: "#E8E8E8"
      },
      yaxis: {
        ticks: 10,
        min: -2,
        max: 2,
        tickDecimals: 3,
        tickColor: "#E8E8E8"
      },
      legend: {
        margin: [5, 10],
        labelBoxBorderColor: "transparent",
        labelFormatter: function(label, series) {
          // series is the series object for the label
          return "<span class='m-left-5'>"+label+"</span>";
        }
      },
      grid: {
        borderWidth: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1
        },
        borderColor: "#E8E8E8"
      }
    });


    // FLot Interactive
    var sin = [],
        cos = [];

    for (var i = 0; i < 14; i += 0.5) {
      sin.push([i, Math.sin(i)]);
      cos.push([i, Math.cos(i)]);
    }

    var plot = $.plot("#flot-interactive", [
      { data: sin, label: "sin(x)", color: '#5ebdec'},
      { data: cos, label: "cos(x)", color: '#F9B56A'}
    ], {
      series: {
        lines: {
          show: true
        },
        points: {
          show: true
        },
        shadowSize: 0
      },
      xaxis: {
        tickColor: "#E8E8E8"
      },
      yaxis: {
        min: -1.2,
        max: 1.2,
        tickColor: "#E8E8E8"
      },
      legend: {
        margin: [5, 10],
        labelBoxBorderColor: "transparent",
        labelFormatter: function(label, series) {
          // series is the series object for the label
          return "<span class='m-left-5'>"+label+"</span>";
        }
      },
      grid: {
        hoverable: true,
        clickable: true,
        borderWidth: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1
        },
        borderColor: "#E8E8E8"
      },
      tooltip: {
        show: true,
        content: "<span class='label' style='color: #fff; background-color: rgba(0,0,0,.7)'>%s %x = %y</span>",
        shifts: {
          x: -45
        },
        defaultTheme: false
      }
    });


    // Flot Simplebar
    var simpleBarD1 = [];
    for (var i = 0; i <= 10; i += 1) {
      simpleBarD1.push([i, parseInt(Math.random() * 30)]);
    }

    $.plot("#flot-simplebar", [
      { data: simpleBarD1, color: '#5ebdec'}
     ], {
      series: {
        bars: {
          show: true,
          barWidth: 0.8
        }
      },
      xaxis: {
        tickColor: "#E8E8E8"
      },
      yaxis: {
        tickColor: "#E8E8E8"
      },
      grid: {
        borderWidth: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1
        },
        borderColor: "#E8E8E8"
      }
    });


    // FLot Bar
    var barD1 = [];
    for (var i = 0; i <= 10; i += 1) {
      barD1.push([i, parseInt(Math.random() * 30)]);
    }

    var barD2 = [];
    for (var i = 0; i <= 10; i += 1) {
      barD2.push([i, parseInt(Math.random() * 30)]);
    }

    var barD3 = [];
    for (var i = 0; i <= 10; i += 1) {
      barD3.push([i, parseInt(Math.random() * 30)]);
    }

    var stack = 0,
      bars = true,
      lines = false,
      steps = false;

    function plotWithOptions() {
      $.plot("#flot-bar", [
        { data: barD1, color: '#5ebdec'},
        { data: barD2, color: '#F9B56A'},
        { data: barD3, color: '#EE6567'},
       ], {
        series: {
          stack: stack,
          lines: {
            show: lines,
            fill: true,
            steps: steps
          },
          bars: {
            show: bars,
            barWidth: 0.6
          }
        },
        xaxis: {
          tickColor: "#E8E8E8"
        },
        yaxis: {
          tickColor: "#E8E8E8"
        },
        grid: {
          borderWidth: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
          },
          borderColor: "#E8E8E8"
        }
      });
    }

    plotWithOptions();

    $("#bar-stackcontrols .btn").click(function (e) {
      e.preventDefault();
      stack = $(this).text() == "With stacking" ? true : null;
      plotWithOptions();
    });

    $("#bar-graphcontrols .btn").click(function (e) {
      e.preventDefault();
      bars = $(this).text().indexOf("Bars") != -1;
      lines = $(this).text().indexOf("Lines") != -1;
      steps = $(this).text().indexOf("steps") != -1;
      plotWithOptions();
    });


    // Flot Threshold
    var thresholdD1 = [];
    for (var i = 0; i <= 60; i += 1) {
      thresholdD1.push([i, parseInt(Math.random() * 30 - 10)]);
    }

    $.plot("#flot-threshold", [{
      data: thresholdD1,
      color: "#4ec27f",
      threshold: {
        below: 0,
        color: "#EE6567"
      },
      lines: {
        steps: true
      }
    }],{
      xaxis: {
        tickColor: "#E8E8E8"
      },
      yaxis: {
        tickColor: "#E8E8E8"
      },
      grid: {
        borderWidth: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1
        },
        borderColor: "#E8E8E8"
      }
    });


    // Pie Charts
    var data = [
      { label : "USA", data: 40, color: "#5ebdec" },
      { label : "UK", data: 25, color: "#4ec27f" },
      { label : "Canada", data: 15, color: "#51c2cf" },
      { label : "France", data: 11, color: "#F9B56A" },
      { label : "Spain", data: 9, color: "#EE6567" },
    ];

    // FLot Pie
    $.plot("#flot-pie", data, {
      series: {
        pie: { 
          show: true
        }
      },
      legend: {
        margin: [5, 10],
        labelBoxBorderColor: "transparent",
        labelFormatter: function(label, series) {
          // series is the series object for the label
          return "<span class='m-left-5'>"+label+"</span>";
        }
      }
    });

    // flot-pie-without-legend
    $.plot("#flot-pie-without-legend", data, {
      series: {
        pie: { 
          show: true
        }
      },
      legend: {
        show: false
      }
    });

    // flot-pie-label-style-1
    $.plot("#flot-pie-label-style-1", data, {
      series: {
        pie: { 
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 1,
            formatter: function(label, series) {
              return "<div style='font-size: 11px; text-align: center; padding: 5px; color: #fff;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>"
            },
            background: {
              opacity: 0.8
            }
          }
        }
      },
      legend: {
        show: false
      }
    });

    // flot-pie-label-style-2
    $.plot("#flot-pie-label-style-2", data, {
      series: {
        pie: { 
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 3/4,
            formatter: function(label, series) {
              return "<div style='font-size: 11px; text-align: center; padding: 5px; color: #fff;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>"
            },
            background: {
              opacity: 0.8,
              color: "#000"
            }
          }
        }
      },
      legend: {
        show: false
      }
    });

    // flot-pie-label-hidden
    $.plot("#flot-pie-label-hidden", data, {
      series: {
        pie: { 
          show: true,
          radius: 1,
          label: {
            show: true,
            radius: 2/3,
            formatter: function(label, series) {
              return "<div style='font-size: 11px; text-align: center; padding: 5px; color: #fff;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>"
            },
            threshold: 0.1
          }
        }
      },
      legend: {
        show: false
      }
    });

    // flot-pie-combined-slice
    $.plot("#flot-pie-combined-slice", data, {
      series: {
        pie: { 
          show: true,
          combine: {
            color: "#999",
            threshold: 0.05
          }
        }
      },
      legend: {
        show: false
      }
    });

    // flot-pie-rectangular
    $.plot("#flot-pie-rectangular", data, {
      series: {
        pie: { 
          show: true,
          radius: 500,
          label: {
            show: true,
            formatter: function(label, series) {
              return "<div style='font-size: 11px; text-align: center; padding: 5px; color: #fff;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>"
            },
            threshold: 0.1
          }
        }
      },
      legend: {
        show: false
      }
    });

    // flot-pie-tilted
    $.plot("#flot-pie-tilted", data, {
      series: {
        pie: { 
          show: true,
          radius: 1,
          tilt: 0.5,
          label: {
            show: true,
            radius: 1,
            formatter: function(label, series) {
              return "<div style='font-size: 11px; text-align: center; padding: 5px; color: #fff;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>"
            },
            background: {
              opacity: 0.8
            }
          },
          combine: {
            color: "#999",
            threshold: 0.1
          }
        }
      },
      legend: {
        show: false
      }
    });

    // flot-pie-donut
    $.plot("#flot-pie-donut", data, {
      series: {
        pie: {
          show: true,
          innerRadius: 0.5,
        }
      },
      legend: {
        margin: [5, 10],
        labelBoxBorderColor: "transparent",
        labelFormatter: function(label, series) {
          // series is the series object for the label
          return "<span class='m-left-5'>"+label+"</span>";
        }
      }
    });

    // flot-pie-interactive
    $.plot("#flot-pie-interactive", data, {
      series: {
        pie: { 
          show: true
        }
      },
      legend: {
        margin: [5, 10],
        labelBoxBorderColor: "transparent",
        labelFormatter: function(label, series) {
          // series is the series object for the label
          return "<span class='m-left-5'>"+label+"</span>";
        }
      },
      grid: {
        hoverable: true
      },
      tooltip: {
        show: true,
        content: "<span class='label' style='color: #fff; background-color: rgba(0,0,0,.7)'>%s</span>",
        shifts: {
          x: -45
        },
        defaultTheme: false
      }
    });


    // Float realtime
    // We use an inline data source in the example, usually data would
    // be fetched from a server

    var data = [],
      totalPoints = 300;

    function getRandomData() {

      if (data.length > 0)
        data = data.slice(1);

      // Do a random walk

      while (data.length < totalPoints) {

        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;

        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }

        data.push(y);
      }

      // Zip the generated y values with the x values

      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }

      return res;
    }

    // Set up the update interval
    var updateInterval = 30;

    var plot = $.plot("#flot-realtime", [ {data: getRandomData(), color: '#5ebdec'} ], {
      series: {
        lines: {
          fill: true
        },
        shadowSize: 0 // Drawing is faster without shadows
      },
      xaxis: {
        show: false,
        tickColor: "#E8E8E8"
      },
      yaxis: {
        min: 0,
        max: 100,
        tickColor: "#E8E8E8"
      },
      grid: {
        borderWidth: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1
        },
        borderColor: "#E8E8E8"
      }
    });

    function update() {

      plot.setData([{data: getRandomData(), color: '#5ebdec'}]);

      // Since the axes don't change, we don't need to call plot.setupGrid()

      plot.draw();
      setTimeout(update, updateInterval);
    }

    update();
  })
})(jQuery);