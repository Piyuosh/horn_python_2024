(function($) {
  "use strict";
  
  /*Line chart settings*/
  var lineChartData = {
    labels : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets : [
      {
        label: "My First dataset",
        backgroundColor : "rgba(142,208,240,0.3)",
        borderColor : "#5ebdec",
        pointBackgroundColor : "#62b4dd",
        pointBorderColor : "#fff",
        pointHoverBackgroundColor : "#fff",
        pointHoverBorderColor : "rgba(220,220,220,1)",
        data : [0, 13, 15, 25, 20, 16, 13, 20, 32, 27, 22, 18],
        lineTension: 0
      },
      {
        label: "My First dataset",
        backgroundColor : "rgba(142,208,240,0.1)",
        borderColor : "#4ec27f",
        pointBackgroundColor : "#4fbc7d",
        pointBorderColor : "#fff",
        pointHoverBackgroundColor : "#fff",
        pointHoverBorderColor : "rgba(220,220,220,1)",
        data : [30, 25, 35, 35, 45, 50, 35, 30, 5, 23, 40, 45]
      }
    ]

  };

  /*Bar chart settings*/
  var barChartData = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
      {
        backgroundColor : "rgba(142,208,240,0.3)",
        borderColor : "#5ebdec",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(142,208,240,0.6)",
        hoverBorderColor: "#5ebdec",
        data : [1,5,2,6,4,5,2]
      },
      {
        backgroundColor : "rgba(78,194,127,0.3)",
        borderColor : "#4ec27f",
        borderWidth: 1,
        hoverBackgroundColor : "rgba(78,194,127,0.6)",
        hoverBorderColor : "#4ec27f",
        data : [2,3,4,5,3,3,1]
      }
    ]

  };

  /*Radar chart settings*/
  var radarChartData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling"],
    datasets: [
      {
        label: "My First dataset",
        fill: true,
        backgroundColor: "rgba(142,208,240,0.3)",
        borderColor: "#5ebdec",
        pointBackgroundColor: "#62b4dd",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
        label: "My Second dataset",
        fill: true,
        backgroundColor: "rgba(78,194,127,0.3)",
        borderColor: "#4ec27f",
        pointBackgroundColor: "#4fbc7d",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 96, 27, 100]
      }
    ]
  };

  /*Polar-area chart settings*/
  var polarAreaData = {
    datasets: [{
      data: [11,16,7,3,14],
      backgroundColor: ["#EE6567", "#4ec27f", "#F9B56A", "#51c2cf", "#5ebdec"]
    }],
    labels: ["Red", "Green", "Orange", "Teal", "Blue"]
  };

  /*Pie, Doughnut chart settings*/
  var pieData = {
    datasets: [{
      data: [11,16,7,3,14],
      backgroundColor: ["#EE6567", "#4ec27f", "#F9B56A", "#51c2cf", "#5ebdec"]
    }],
    labels: ["Red", "Green", "Orange", "Teal", "Blue"]
  };




  /*Line chart*/
  var ctxLine = document.getElementById("lineCanvas");
  var myLine = new Chart(ctxLine, {
    type: 'line',
    data: lineChartData,
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }]
      }
    }
  });

  /*Bar chart*/
  var ctxBar = document.getElementById("barCanvas");
  var myBar = new Chart(ctxBar, {
    type: 'bar',
    data: barChartData,
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }]
      }
    }
  });

  /*Radar chart*/
  var ctxRadar = document.getElementById("radarCanvas");
  var myRadar = new Chart(ctxRadar, {
    type: 'radar',
    data: radarChartData,
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }]
      }
    }
  });

  /*Polar-area chart*/
  var ctxPolarArea = document.getElementById("polarAreaCanvas");
  var myPolarArea = new Chart(ctxPolarArea, {
    type: 'polarArea',
    data: polarAreaData,
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }]
      }
    }
  });

  /*Pie chart*/
  var ctxPie = document.getElementById("pieCanvas");
  var myPie = new Chart(ctxPie, {
    type: 'pie',
    data: pieData,
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }]
      }
    }
  });

  /*Doughnut chart*/
  var ctxDoughnut = document.getElementById("doughnutCanvas");
  var myDoughnut = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: pieData,
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0, 0.06)'
          }
        }]
      }
    }
  });
})(jQuery);