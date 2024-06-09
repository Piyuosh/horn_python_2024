(function($) {
  "use strict";
  
  //Line chart
    var lineChart = c3.generate({
        bindto: '#line-chart',
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ],
          colors:{
            data1: '#5ebdec',
            data2: '#F9B56A'
          }
        }
    });

    //alternative way to load data from .json file

    /*var chartJson = c3.generate({
          bindto: '#line-chart',
          data: {
              url: 'path to JSON file',
              mimeType: 'json'
          }
      });
    */

    //Dashed line chart
    var dashedChart = c3.generate({
        bindto: '#dashed-chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ],
            regions: {
                'data1': [{'start':1, 'end':2, 'style':'dashed'},{'start':3}], // currently 'dashed' style only
                'data2': [{'end':3}]
            },
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            }
        }
    });
    //Timeseries Chart
    var lineChart1 = c3.generate({
        bindto: '#timeseries',
        data: {
            x: 'x',
            columns: [
                ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 340, 200, 500, 250, 350]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            }
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        }
    });

    //Spline Chart
    var lineChart2 = c3.generate({
        bindto: '#spline-chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            type: 'spline'
        }
    });

    //Step Chart
    var stepChart = c3.generate({
        bindto: '#step-chart',
        data: {
            columns: [
                ['data1', 300, 350, 300, 0, 0, 100],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            types: {
                data1: 'step',
                data2: 'area-step'
            }
        }
    });

    //Area Chart
    var areaChart = c3.generate({
        bindto: '#area-chart',
        data: {
            columns: [
                ['data1', 300, 350, 300, 0, 0, 0],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            types: {
                data1: 'area',
                data2: 'area-spline'
            }
        }
    });

    //Stacked Area Chart
    var stackedAreaChart = c3.generate({
        bindto: '#stacked-area-chart',
        data: {
            columns: [
                ['data1', 300, 350, 300, 0, 0, 120],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            types: {
                data1: 'area-spline',
                data2: 'area-spline'
                // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
            },
            groups: [['data1', 'data2']]
        }
    });

    //Scatter area Chart
    var scatterChart = c3.generate({
        bindto: '#scatter-chart',
        data: {
            xs: {
                setosa: 'setosa_x',
                versicolor: 'versicolor_x',
            },
            // iris data from R
            columns: [
                ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
                ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
                ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
            ],
            colors:{
              setosa: '#51c2cf',
              versicolor: '#EE6567'
            },
            type: 'scatter'
        },
        axis: {
            x: {
                label: 'Sepal.Width',
                tick: {
                    fit: false
                }
            },
            y: {
                label: 'Petal.Width'
            }
        }
    });

    //Bar Chart
    var barChart = c3.generate({
        bindto: '#bar-chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        }
    });

    setTimeout(function () {
        barChart.load({
            columns: [
                ['data3', 130, -150, 200, 300, -200, 100]
            ],
            colors:{
              data3: '#51c2cf'
            }
        });
    }, 4000);

    //Stacked Bar Chart
    var stackedBarChart = c3.generate({
        bindto: '#stacked-bar-chart',
        data: {
            columns: [
                ['data1', -30, 200, 200, 400, -150, 250],
                ['data2', 130, 100, -100, 200, -150, 50],
                ['data3', -230, 200, 200, -300, 250, 250]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A',
              data3: '#51c2cf'
            },
            type: 'bar',
            groups: [
                ['data1', 'data2']
            ]
        },
        grid: {
            y: {
                lines: [{value:0}]
            }
        }
    });
    setTimeout(function () {
        stackedBarChart.groups([['data1', 'data2', 'data3']])
    }, 3000);

    setTimeout(function () {
        stackedBarChart.load({
            columns: [['data4', 100, -50, 150, 200, -300, -100]]
        });
    }, 4000);

    setTimeout(function () {
        stackedBarChart.groups([['data1', 'data2', 'data3', 'data4']])
    }, 5000);

    //Pie Chart
    var pieChart = c3.generate({
        bindto: '#pie-chart',
        data: {
            columns: [
                ['data1', 30],
                ['data2', 120],
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            type : 'pie',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
    });

    setTimeout(function () {
        pieChart.load({
            columns: [
                ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
            ],
            colors:{
              setosa: '#4ec27f',
              versicolor: '#EE6567',
              virginica: '#474F60'
            }
        });
    }, 5500);

    setTimeout(function () {
        pieChart.unload({
            ids: 'data1'
        });
        pieChart.unload({
            ids: 'data2'
        });
    }, 7000);

    //Donut Chart
    var donutChart = c3.generate({
        bindto: '#donut-chart',
        data: {
            columns: [
              ['data1', 30],
              ['data2', 120],
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            title: "Iris Petal Width"
        }
    });

    setTimeout(function () {
        donutChart.load({
            columns: [
                ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
            ],
            colors:{
              setosa: '#4ec27f',
              versicolor: '#EE6567',
              virginica: '#474F60'
            }
        });
    }, 5500);

    setTimeout(function () {
        donutChart.unload({
            ids: 'data1'
        });
        donutChart.unload({
            ids: 'data2'
        });
    }, 7500);

    //Gauge Chart
    var gaugeChart = c3.generate({
        bindto: '#gauge-chart',
        data: {
            columns: [
                ['data', 91.4]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
    //        label: {
    //            format: function(value, ratio) {
    //                return value;
    //            },
    //            show: false // to turn off the min/max labels.
    //        },
    //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    //    max: 100, // 100 is default
    //    units: ' %',
    //    width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#51c2cf', '#5ebdec', '#4ec27f', '#EE6567'], // the three color levels for the percentage values.
            threshold: {
    //            unit: 'value', // percentage is default
    //            max: 200, // 100 is default
                values: [30, 60, 90, 100]
            }
        },
        size: {
            height: 180
        }
    });

    setTimeout(function () {
        gaugeChart.load({
            columns: [['data', 10]]
        });
    }, 6000);

    setTimeout(function () {
        gaugeChart.load({
            columns: [['data', 50]]
        });
    }, 7000);

    setTimeout(function () {
        gaugeChart.load({
            columns: [['data', 70]]
        });
    }, 8000);

    setTimeout(function () {
        gaugeChart.load({
            columns: [['data', 0]]
        });
    }, 9000);

    setTimeout(function () {
        gaugeChart.load({
            columns: [['data', 100]]
        });
    }, 10000);

    //Combined Chart
    var combinedChart = c3.generate({
        bindto: '#combined-chart',
        data: {
            columns: [
                ['data1', 30, 20, 50, 40, 60, 50],
                ['data2', 200, 130, 90, 240, 130, 220],
                ['data3', 300, 200, 160, 400, 250, 250],
                ['data4', 200, 130, 90, 240, 130, 220],
                ['data5', 130, 120, 150, 140, 160, 150],
                ['data6', 90, 70, 20, 50, 60, 120],
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A',
              data3: '#51c2cf',
              data4: '#EE6567',
              data5: '#4ec27f',
              data6: '#474F60'
            },
            type: 'bar',
            types: {
                data3: 'spline',
                data4: 'line',
                data6: 'area',
            },
            groups: [
                ['data1','data2']
            ]
        }
    });

    //Rotated axis
    var rotatedAxis = c3.generate({
        bindto: '#rotated-axis',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            types: {
                data1: 'bar',
            }
        },
        axis: {
            rotated: true
        }
    });

    //Additional axis
    var additionalAxis = c3.generate({
        bindto: '#additional-axis',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            axes: {
                data1: 'y',
                data2: 'y2'
            }
        },
        axis: {
            y2: {
                show: true
            }
        }
    });

    //Rotated tick text
    var rotatedTickText = c3.generate({
        bindto: '#rotated-tick-text',
        data: {
            x : 'x',
            columns: [
                ['x', 'www.google.com', 'www.yahoo.com', 'www.youtube.com', 'www.facebook.com', 'www.apple.com', 'www.microsoft.com', 'www.vk.com', 'www.spotify.com', 'www.rdio.com', 'www.sourcio.com', 'www.iguides.com', 'www.sony.com'],
                ['pv', 90, 100, 140, 200, 100, 400, 90, 100, 140, 200, 100, 400],
            ],
            colors:{
              pv: '#5ebdec'
            },
            type: 'bar'
        },
        axis: {
            x: {
                type: 'category',
                tick: {
                    rotate: 75,
                    multiline: false
                },
                height: 130
            }
        }
    });

    //Labeled data
    var labeledData = c3.generate({
        bindto: '#labeled-data',
        data: {
            columns: [
                ['data1', 30, -200, -100, 400, 150, 250],
                ['data2', -50, 150, -150, 150, -50, -150],
                ['data3', -100, 100, -40, 100, -150, -50]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A',
              data3: '#51c2cf',
            },
            groups: [
                ['data1', 'data2']
            ],
            type: 'bar',
            labels: true
        },
        grid: {
            y: {
                lines: [{value: 0}]
            }
        }
    });

    //Grid lines
    var gridLines = c3.generate({
        bindto: '#grid-lines',
        data: {
            columns: [
                ['sample', 30, 200, 100, 400, 150, 250, 120, 200]
            ],
            colors:{
              sample: '#5ebdec'
            }
        },
        grid: {
            x: {
                show: true
            },
            y: {
                show: true
            }
        }
    });

    //Regional chart
    var regionalChart = c3.generate({
        bindto: '#regional-chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250, 400],
                ['data2', 830, 1200, 1100, 1400, 1150, 1250, 1500],
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A'
            },
            axes: {
                data2: 'y2'
            }
        },
        axis: {
            y2: {
                show: true
            }
        },
        regions: [
            {axis: 'x', end: 1, class: 'regionX'},
            {axis: 'x', start: 2, end: 4, class: 'regionX'},
            {axis: 'x', start: 5, class: 'regionX'},
            {axis: 'y', end: 50, class: 'regionY'},
            {axis: 'y', start: 80, end: 140, class: 'regionY'},
            {axis: 'y', start: 400, class: 'regionY'},
            {axis: 'y2', end: 900, class: 'regionY2'},
            {axis: 'y2', start: 1150, end: 1250, class: 'regionY2'},
            {axis: 'y2', start: 1300, class: 'regionY2'},
        ]
    });

    //Regions with timeseries
    var regionsTimeseries = c3.generate({
        bindto: '#regions-timeseries',
        data: {
            x: 'date',
            columns: [
                ['date', '2014-01-01', '2014-01-10', '2014-01-20', '2014-01-30', '2014-02-01'],
                ['sample', 30, 200, 100, 400, 150, 250]
            ],
            colors:{
              sample: '#F9B56A'
            }
        },
        axis: {
            x: {
                type: 'timeseries'
            }
        },
        regions: [
            {start: '2014-01-05', end: '2014-01-10'},
            {start: new Date('2014/01/15'), end: new Date('20 Jan 2014')},
            {start: 1390575600000, end: 1391007600000} // start => 2014-01-25 00:00:00, end => 2014-01-30 00:00:00
        ]
    });

    //Sub chart
    var subChart = c3.generate({
        bindto: '#subchart',
        data: {
            columns: [
                ['sample', 30, 200, 100, 400, 150, 250]
            ],
            colors:{
              sample: '#5ebdec'
            }
        },
        subchart: {
            show: true
        }
    });

    //Zoom chart
    var zoomChart = c3.generate({
        bindto: '#zoom-chart',
        data: {
            columns: [
                ['sample', 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 350, 220, 250, 300, 270, 140, 150, 90, 150, 50, 120, 70, 40]
            ],
            colors:{
              sample: '#5ebdec'
            }
        },
        zoom: {
            enabled: true
        }
    });

    //Custom Legend
    var customLegend = c3.generate({
        bindto: '#custom-legend',
        data: {
            columns: [
                ['data1', 100],
                ['data2', 300],
                ['data3', 200]
            ],
            colors:{
              data1: '#5ebdec',
              data2: '#F9B56A',
              data3: '#51c2cf',
            },
            type: 'pie'
        },
        legend: {
            show: false
        }
    });

    function toggle(id) {
        customLegend.toggle(id);
    }
    d3.select('#custom-legend').insert('div', '#custom-legend svg').attr('class', 'legend').selectAll('span')
        .data(['data1', 'data2', 'data3'])
      .enter().append('span')
        .attr('data-id', function (id) { return id; })
        .html(function (id) { return id; })
        .each(function (id) {
            d3.select(this).style('background-color', customLegend.color(id));
        })
        .on('mouseover', function (id) {
            customLegend.focus(id);
        })
        .on('mouseout', function (id) {
            customLegend.revert();
        })
        .on('click', function (id) {
            customLegend.toggle(id);
        });
})(jQuery);