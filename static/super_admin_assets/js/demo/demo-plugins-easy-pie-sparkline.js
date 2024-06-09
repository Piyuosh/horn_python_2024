(function($) {
  "use strict";
  
  /*========Sparkline Charts=========*/ 
    //Line chart

    $("#line-chart").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
    type: 'line',
    width: '300',
    height: '70',
    lineColor: '#5ebdec',
    lineWidth: 1.5,
    fillColor: '#ace1f9',
    spotColor: '#EE6567',
    minSpotColor: '#EE6567',
    maxSpotColor: '#EE6567',
    highlightSpotColor: '#EE6567',
    highlightLineColor: '#5ebdec',
    spotRadius: 2
    });

    //Bar chart

    $("#bar-chart").sparkline([2,3,4,5,6,7,5,4,3,2,4,2,4,5,2,7,5,1,2,3,6,5,2,4,7,6,5,4,3,2], {
    type: 'bar',
    height: '70',
    barWidth: 9,
    barColor: '#51c2cf',
    negBarColor: '#51c2cf',
    zeroColor: '#e5e5e5'
    });

    //Tristate chart

    $("#tristate-chart").sparkline([1,1,0,1,-1,-1,1,-1,0,0,1,1,-1,-2,1,2,3,3,0,-1,1,2,1,2,1,0,-1,1,2,1], {
    type: 'tristate',
    height: '40 ',
    posBarColor: '#5ebdec',
    negBarColor: '#5ebdec',
    zeroBarColor: '#EE6567',
    barWidth: 9
    });

    //Discrete chart

    $("#discrete-chart").sparkline([4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,6,7,7,4,3,2,1,4,4 ], {
    type: 'discrete',
    width: '300 ',
    height: '70',
    lineColor: '#5ebdec',
    thresholdColor: '#'
    });

    //Bullet chart

    $("#bullet-chart").sparkline([100,120,120,90,70 ], {
    type: 'bullet',
    width: '300 ',
    height: '40',
    targetWidth: 6,
    targetColor: '#ee6567',
    performanceColor: '#5ebdec',
    rangeColors: ['#b9e3f7','#9ed5ef','#82cef2 ']
    });

    //Pie chart

    $("#pie-chart").sparkline([1,1,2], {
    type: 'pie',
    width: '100',
    height: '100',
    sliceColors: ['#4ec27f','#F9B56A','#EE6567','#109618','#66aa00','#dd4477','#0099c6','#990099 ']
    });

    //Box
    $("#box-chart").sparkline([4,27,34,52,54,59,61,68,78,82,85,87,91,93,100], {
    type: 'box',
    width: '300',
    height: '40',
    showOutliers: false,
    boxLineColor: '#225ae8',
    boxFillColor: '#f7f7f7',
    whiskerColor: '#225ae8',
    outlierLineColor: '#5ebdec',
    outlierFillColor: '#5ebdec',
    medianColor: '#ee6567',
    targetColor: '#5ebdec'
    });


    /*========Easy Pie Charts=========*/ 

    //Easy Pie chart basic
    $('#easy-pie-basic').easyPieChart({
        animate: 2000,
        barColor: '#EE6567',
        trackColor: '#EAEAEA',
        scaleColor: '#EE6567',
        lineCap: 'square',
        lineWidth: 3,
        size: 120,
        onStep: function(from, to, percent){
          $(this.el).find('.percent').text(Math.round(percent))
        }
    });


    //Easy Pie chart with avatar
    $('#easy-pie-avatar-inside').easyPieChart({
        animate: 2000,
        barColor: '#F9B56A',
        trackColor: '#EAEAEA',
        scaleColor: 'transparent',
        lineCap: 'square',
        lineWidth: 3,
        size: 120,
    });

    //Easy Pie chart with icon inside
    $('#easy-pie-icon-inside').easyPieChart({
        animate: 2000,
        barColor: '#5ebdec',
        trackColor: '#EAEAEA',
        scaleColor: 'transparent',
        lineCap: 'square',
        lineWidth: 3,
        size: 120,
    });

    //Easy Pie chart with data update button inside
    $('#easy-pie-button-inside').easyPieChart({
        animate: 2000,
        barColor: '#4ec27f',
        trackColor: '#EAEAEA',
        scaleColor: '#4ec27f',
        lineCap: 'square',
        lineWidth: 3,
        size: 120,
        onStep: function(from, to, percent){
          $(this.el).find('.percent').text(Math.round(percent))
        }
    });
    var chartData = window.easyPieLoad = $('#easy-pie-button-inside').data('easyPieChart');
    $('.easy-pie-btn').on('click', function() {
      chartData.update(Math.random()*100);
    });
})(jQuery);
    