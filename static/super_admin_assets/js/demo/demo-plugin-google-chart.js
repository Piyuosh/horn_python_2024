(function($) {
  "use strict";
  
  /*=============annotation chart============*/

  google.charts.load('current', {'packages':['annotationchart']});
  google.charts.setOnLoadCallback(drawAnnotChart);

  function drawAnnotChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Kepler-22b mission');
    data.addColumn('string', 'Kepler title');
    data.addColumn('string', 'Kepler text');
    data.addColumn('number', 'Gliese 163 mission');
    data.addColumn('string', 'Gliese title');
    data.addColumn('string', 'Gliese text');
    data.addRows([
      [new Date(2314, 2, 15), 12400, undefined, undefined,
                              10645, undefined, undefined],
      [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter',
                              12374, undefined, undefined],
      [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall',
                              15766, 'Gallantors', 'First Encounter'],
      [new Date(2314, 2, 18), 12284, 'Lalibertines', 'Attack on our crew!',
                              34334, 'Gallantors', 'Statement of shared principles'],
      [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties',
                              66467, 'Gallantors', 'Mysteries revealed'],
      [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost',
                              79463, 'Gallantors', 'Omniscience achieved']
    ]);

    var chart = new google.visualization.AnnotationChart(document.getElementById('annotation-chart'));

    var options = {
      displayAnnotations: true,
      height: 300,
      colors: ['#5ebdec', '#F9B56A']
    };

    chart.draw(data, options);
    $('#annotation-chart').removeClass('container');
  }


  /*=============area chart============*/

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawAreaChart);

  function drawAreaChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2013',  1000,      400],
      ['2014',  1170,      460],
      ['2015',  660,       1120],
      ['2016',  1030,      540]
    ]);

    var options = {
      title: 'Company Performance',
      hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0},
      height: 400,
      series:{
        0: {color: '#5ebdec'},
        1: {color: '#F9B56A'}
      }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('area-chart'));
    chart.draw(data, options);
  }

  /*===================area dashed=================*/
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawAreaDashed);

  function drawAreaDashed() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2013',  1000,      400],
      ['2014',  1170,      460],
      ['2015',  660,       1120],
      ['2016',  1030,      540]
    ]);

    var options = {
      title: 'Company Performance',
      hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0},
      height: 400,
      series:{
        0: {color: '#5ebdec', lineDashStyle: [2, 2]},
        1: {color: '#F9B56A', lineDashStyle: [5, 1, 3]}
      }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('area-dashed'));
    chart.draw(data, options);
  }


  /*===================bar chart=================*/
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawBarChart);

  function drawBarChart() {
    var data = google.visualization.arrayToDataTable([
      ['City', '2010 Population', '2000 Population'],
      ['New York City, NY', 8175000, 8008000],
      ['Los Angeles, CA', 3792000, 3694000],
      ['Chicago, IL', 2695000, 2896000],
      ['Houston, TX', 2099000, 1953000],
      ['Philadelphia, PA', 1526000, 1517000]
    ]);

    var options = {
      chart: {
        title: 'Population of Largest U.S. Cities',
        subtitle: 'Based on most recent and previous census data'
      },
      hAxis: {
        title: 'Total Population',
        minValue: 0,
      },
      vAxis: {
        title: 'City'
      },
      bars: 'horizontal',
      height: 400,
      colors: ['#F9B56A', '#5ebdec']
    };
    var barChart = new google.visualization.BarChart(document.getElementById('bar-chart'));
    barChart.draw(data, options);
  }


  /*===================bubble chart=================*/
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawBubbleChart);

  function drawBubbleChart() {

    var data = google.visualization.arrayToDataTable([
      ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
      ['CAN',    80.66,              1.67,      'North America',  33739900],
      ['DEU',    79.84,              1.36,      'Europe',         81902307],
      ['DNK',    78.6,               1.84,      'Europe',         5523095],
      ['EGY',    72.73,              2.78,      'Middle East',    79716203],
      ['GBR',    80.05,              2,         'Europe',         61801570],
      ['IRN',    72.49,              1.7,       'Middle East',    73137148],
      ['IRQ',    68.09,              4.77,      'Middle East',    31090763],
      ['ISR',    81.55,              2.96,      'Middle East',    7485600],
      ['RUS',    68.6,               1.54,      'Europe',         141850000],
      ['USA',    78.09,              2.05,      'North America',  307007000]
    ]);

    var options = {
      title: 'Correlation between life expectancy, fertility rate and population of some world countries (2010)',
      hAxis: {title: 'Life Expectancy'},
      vAxis: {title: 'Fertility Rate'},
      bubble: {textStyle: {fontSize: 11}},
      colors:['F9B56A','#5ebdec', '#4ec27f'],
      height: 400
    };

    var chart = new google.visualization.BubbleChart(document.getElementById('bubble-chart'));
    chart.draw(data, options);
  }


  /*===================candlestick chart=================*/
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawCandlestickChart);

  function drawCandlestickChart() {
    var data = google.visualization.arrayToDataTable([
      ['Mon', 20, 28, 38, 45],
      ['Tue', 31, 38, 55, 66],
      ['Wed', 50, 55, 77, 80],
      ['Thu', 77, 77, 66, 50],
      ['Fri', 68, 66, 22, 15]
      // Treat first row as data as well.
    ], true);

    var options = {
      legend:'none',
      height: 400,
      colors:['#F9B56A'],
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: '#F9B56A' }, // red
        risingColor: { strokeWidth: 0, fill: '#5ebdec' }   // blue
      }
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('candlestick-chart'));

    chart.draw(data, options);
  }

  /*===================column chart=====================*/
  google.charts.load("current", {packages:['corechart']});
  google.charts.setOnLoadCallback(drawColumnChart);

  function drawColumnChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time of Day');
    data.addColumn('number', 'Motivation Level');
    data.addColumn('number', 'Energy Level');

    data.addRows([
      [{v: [8, 0, 0], f: '8 am'}, 1, .25],
      [{v: [9, 0, 0], f: '9 am'}, 2, .5],
      [{v: [10, 0, 0], f:'10 am'}, 3, 1],
      [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
      [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
      [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
      [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
      [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
      [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
      [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
    ]);

    var options = {
      title: 'Motivation and Energy Level Throughout the Day',
      hAxis: {
        title: 'Time of Day',
        format: 'h:mm a',
        viewWindow: {
          min: [7, 30, 0],
          max: [17, 30, 0]
        }
      },
      vAxis: {
        title: 'Rating (scale of 1-10)'
      },
      height: 400,
      colors: ['#F9B56A', '#5ebdec']
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('column-chart'));

    chart.draw(data, options);
  }


  /*===================column chart stacked=====================*/
  google.charts.load("current", {packages:['corechart']});
  google.charts.setOnLoadCallback(drawStacked);

  function drawStacked() {
    var data = new google.visualization.DataTable();
    data.addColumn('timeofday', 'Time of Day');
    data.addColumn('number', 'Motivation Level');
    data.addColumn('number', 'Energy Level');

    data.addRows([
      [{v: [8, 0, 0], f: '8 am'}, 1, .25],
      [{v: [9, 0, 0], f: '9 am'}, 2, .5],
      [{v: [10, 0, 0], f:'10 am'}, 3, 1],
      [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
      [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
      [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
      [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
      [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
      [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
      [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
    ]);

    var options = {
      title: 'Motivation and Energy Level Throughout the Day',
      isStacked: true,
      hAxis: {
        title: 'Time of Day',
        format: 'h:mm a',
        viewWindow: {
          min: [7, 30, 0],
          max: [17, 30, 0]
        }
      },
      vAxis: {
        title: 'Rating (scale of 1-10)'
      },
      height: 400,
      colors: ['#F9B56A', '#5ebdec']
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('column-stacked'));
    chart.draw(data, options);
  }


  /*===============combo chart=================*/
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawCombo);

  function drawCombo() {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
      ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
      ['2004/05',  165,      938,         522,             998,           450,      614.6],
      ['2005/06',  135,      1120,        599,             1268,          288,      682],
      ['2006/07',  157,      1167,        587,             807,           397,      623],
      ['2007/08',  139,      1110,        615,             968,           215,      609.4],
      ['2008/09',  136,      691,         629,             1026,          366,      569.6]
    ]);

    var options = {
      title : 'Monthly Coffee Production by Country',
      vAxis: {title: 'Cups'},
      hAxis: {title: 'Month'},
      seriesType: 'bars',
      series: {5: {type: 'line'}},
      height: 400,
      colors: ['#EE6567', '#5ebdec', '#4ec27f', '#F9B56A', '#51c2cf']
    };

    var chart = new google.visualization.ComboChart(document.getElementById('combo-chart'));
    chart.draw(data, options);
  }


  /*===============diff chart=================*/
  google.charts.load('current', {packages:['corechart']});
  google.charts.setOnLoadCallback(drawDiffChart); 

  function drawDiffChart() {
    var oldData = google.visualization.arrayToDataTable([
      ['Major', 'Degrees'],
      ['Business', 256070], ['Education', 108034],
      ['Social Sciences & History', 127101], ['Health', 81863],
      ['Psychology', 74194]]);

    var newData = google.visualization.arrayToDataTable([
      ['Major', 'Degrees'],
      ['Business', 358293], ['Education', 101265],
      ['Social Sciences & History', 172780], ['Health', 129634],
      ['Psychology', 97216]]);

    var options = {
      pieSliceText: 'none',
      colors: ['#EE6567', '#5ebdec', '#4ec27f', '#F9B56A', '#51c2cf']
    };

    var chartBefore = new google.visualization.PieChart(document.getElementById('piechart_before'));
    var chartAfter = new google.visualization.PieChart(document.getElementById('piechart_after'));
    var chartDiff = new google.visualization.PieChart(document.getElementById('piechart_diff'));

    chartBefore.draw(oldData, options);
    chartAfter.draw(newData, options);

    var diffData = chartDiff.computeDiff(oldData, newData);
    chartDiff.draw(diffData, options);
  }


  /*===============donut chart=================*/
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawDonutChart);

  function drawDonutChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);

    var options = {
      title: 'My Daily Activities',
      pieHole: 0.4,
      height: 600,
      colors: ['#EE6567', '#5ebdec', '#4ec27f', '#F9B56A', '#51c2cf']
    };

    var chart = new google.visualization.PieChart(document.getElementById('donut-chart'));
    chart.draw(data, options);
  }


  /*===============pie chart=================*/
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawPieChart);

  function drawPieChart() {

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);

    var options = {
      title: 'My Daily Activities',
      height: 400,
      colors: ['#EE6567', '#5ebdec', '#4ec27f', '#F9B56A', '#51c2cf']
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));

    chart.draw(data, options);
  }


  /*===============3d pie chart=================*/
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(draw3dPieChart);

  function draw3dPieChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);

    var options = {
      title: 'My Daily Activities',
      is3D: true,
      height: 400,
      colors: ['#EE6567', '#5ebdec', '#4ec27f', '#F9B56A', '#51c2cf']
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie-3d-chart'));
    chart.draw(data, options);
  }


  /*==============exploding slices=================*/
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawSlicesChart);

  function drawSlicesChart() {
    var data = google.visualization.arrayToDataTable([
      ['Language', 'Speakers (in millions)'],
      ['Assamese', 13], ['Bengali', 83], ['Bodo', 1.4],
      ['Dogri', 2.3], ['Gujarati', 46], ['Hindi', 300],
      ['Kannada', 38], ['Kashmiri', 5.5], ['Konkani', 5],
      ['Maithili', 20], ['Malayalam', 33], ['Manipuri', 1.5],
      ['Marathi', 72], ['Nepali', 2.9], ['Oriya', 33],
      ['Punjabi', 29], ['Sanskrit', 0.01], ['Santhali', 6.5],
      ['Sindhi', 2.5], ['Tamil', 61], ['Telugu', 74], ['Urdu', 52]
    ]);

    var options = {
      title: 'Indian Language Use',
      legend: 'none',
      pieSliceText: 'label',
      slices: {  
        1: {color: '#F9B56A', offset: 0.2},
        4: {color: '#5ebdec', offset: 0.2},
        12: {color: '#4ec27f', offset: 0.3},
        14: {color: '#EE6567', offset: 0.4},
        15: {color: '#51c2cf', offset: 0.5},
        19: {color: '#474F60', offset: 0.5},
      },
      height: 400
    };

    var chart = new google.visualization.PieChart(document.getElementById('slices-chart'));
    chart.draw(data, options);
  }


  /*===============geo chart=================*/
  google.charts.load('upcoming', {'packages':['geochart']});
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {

    var data = google.visualization.arrayToDataTable([
      ['Country', 'Popularity'],
      ['Germany', 200],
      ['United States', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
      ['RU', 700]
    ]);

    var options = {
      height: 400,
      defaultColor: '#4ec27f'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('geo-chart'));

    chart.draw(data, options);
  }


  /*===============intervals chart=================*/
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawIntervalsChart);

  function drawIntervalsChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'values');
    data.addColumn({id:'i0', type:'number', role:'interval'});
    data.addColumn({id:'i1', type:'number', role:'interval'});
    data.addColumn({id:'i2', type:'number', role:'interval'});
    data.addColumn({id:'i0', type:'number', role:'interval'});
    data.addColumn({id:'i2', type:'number', role:'interval'});
    data.addColumn({id:'i3', type:'number', role:'interval'});

    data.addRows([
        [1, 100, 90, 110, 85, 96, 104, 120],
        [2, 120, 95, 130, 90, 113, 124, 140],
        [3, 130, 105, 140, 100, 117, 133, 139],
        [4, 90, 85, 95, 85, 88, 92, 95],
        [5, 70, 74, 63, 67, 69, 70, 72],
        [6, 30, 39, 22, 21, 28, 34, 40]
    ]);

    // The intervals data as narrow lines (useful for showing raw source data)
    var options_lines = {
        title: 'Line intervals, tailored',
        lineWidth: 4,
        curveType:'function',
        interval: {
          'i0': { 'style':'line', 'color':'#5ebdec', 'lineWidth': 0.5 },
          'i1': { 'style':'line', 'color':'#4ec27f', 'lineWidth': 1 },
          'i2': { 'style':'line', 'color':'#51c2cf', 'lineWidth': 2 },
          'i3': { 'style':'line', 'color':'#F9B56A', 'lineWidth': 1 }
        },
        legend: 'none',
        height: 400,
    };

    var chart_lines = new google.visualization.LineChart(document.getElementById('intervals-chart'));
    chart_lines.draw(data, options_lines);
  }


  /*===============line chart=================*/
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawLineColors);

  function drawLineColors() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Dogs');
    data.addColumn('number', 'Cats');

    data.addRows([
      [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
      [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
      [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
      [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
      [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
      [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
      [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
      [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
      [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
      [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
      [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
      [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
    ]);

    var options = {
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'Popularity'
      },
      colors: ['#F9B56A', '#5ebdec'],
      height: 400,
    };

    var chart = new google.visualization.LineChart(document.getElementById('line-chart'));
    chart.draw(data, options);
  }


  /*===============stepped area=================*/

  google.charts.load('current', {packages:["orgchart"]});
  google.charts.setOnLoadCallback(drawSteppedChart);

  function drawSteppedChart() {
    var data = google.visualization.arrayToDataTable([
      ['Director (Year)',  'Rotten Tomatoes', 'IMDB'],
      ['Alfred Hitchcock (1935)', 8.4,         7.9],
      ['Ralph Thomas (1959)',     6.9,         6.5],
      ['Don Sharp (1978)',        6.5,         6.4],
      ['James Hawes (2008)',      4.4,         6.2]
    ]);

    var options = {
      title: 'The decline of \'The 39 Steps\'',
      vAxis: {title: 'Accumulated Rating'},
      isStacked: true,
      height: 400,
      colors: ['#5ebdec', '#F9B56A']
    };

    var chart = new google.visualization.SteppedAreaChart(document.getElementById('stepped-area-chart'));

    chart.draw(data, options);
  }

  //redraw charts when resizing browser window
  $(window).resize(function(){
    drawAnnotChart();
    drawAreaChart();
    drawAreaDashed();
    drawBarChart();
    drawBubbleChart();
    drawCandlestickChart();
    drawColumnChart();
    drawStacked();
    drawCombo();
    drawDiffChart();
    drawDonutChart();
    drawPieChart();
    draw3dPieChart();
    drawSlicesChart();
    drawRegionsMap();
    drawIntervalsChart();
    drawLineColors();
    drawSteppedChart();
  })
})(jQuery);