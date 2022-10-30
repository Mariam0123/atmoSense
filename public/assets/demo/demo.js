type = ['primary', 'info', 'success', 'warning', 'danger'];

demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDocChart: function() {
    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

  },

  initDashboardPageCharts: function() {

    gradientChartOptionsConfigurationWithTooltipBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipPurple = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        enabled: true
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      },
      
    };

    gradientChartOptionsConfigurationWithTooltipOrange = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    var chart_labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var muharraq_aqi = [100, 89, 98, 79, 115, 70, 15];
    var muharraq_pm10 = [30.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31];
    var muharraq_pm25 = [61, 70, 68, 66, 66, 75, 73];
    var muharraq_co = [55, 43, 66, 78, 89, 100, 115];

    var capital_aqi = [150, 89, 98, 79, 115, 70, 15];
    var capital_pm10 = [60.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31];
    var capital_pm25 = [61, 70, 68, 66, 66, 75, 73];
    var capital_co = [55, 43, 66, 78, 89, 100, 115];

    var northern_aqi = [300, 89, 98, 79, 115, 70, 15];
    var northern_pm10 = [90.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31];
    var northern_pm25 = [61, 70, 68, 66, 66, 75, 73];
    var northern_co = [55, 43, 66, 78, 89, 100, 115];

    var southern_aqi = [400, 89, 98, 79, 115, 70, 15];
    var southern_pm10 = [120.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31];
    var southern_pm25 = [61, 70, 68, 66, 66, 75, 73];
    var southern_co = [55, 43, 66, 78, 89, 100, 115];


    var ctx = document.getElementById("aqi_chart").getContext('2d');
    function restartAnims(chart) {
      chart.stop();
      const meta0 = chart.getDatasetMeta(0);
      const meta1 = chart.getDatasetMeta(1);
      for (let i = 0; i < data.length; i++) {
        const ctx0 = meta0.controller.getContext(i);
        const ctx1 = meta1.controller.getContext(i);
        ctx0.xStarted = ctx0.yStarted = false;
        ctx1.xStarted = ctx1.yStarted = false;
      }
      chart.update();
    }
    
  


    var purpleStroke = ctx.createLinearGradient(0, 230, 0, 50);
    purpleStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    purpleStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    purpleStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors

    var orangeStroke = ctx.createLinearGradient(0, 230, 0, 50);
    orangeStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    orangeStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    orangeStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors

    var greenStroke = ctx.createLinearGradient(0, 230, 0, 50);
    greenStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    greenStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)');
    greenStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    var pinkStroke = ctx.createLinearGradient(0, 230, 0, 50);
    pinkStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    pinkStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    pinkStroke.addColorStop(0, 'rgba(29,140,248,0)'); //pink colors


    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: 'AQI',
          fill: true,
          backgroundColor: purpleStroke,
          borderColor: '#d346b1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#d346b1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#d346b1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: muharraq_aqi,
         
        },
        {
          label: 'PM10',
          fill: false, //fix
          backgroundColor: pinkStroke, 
          borderColor: '#f3a4b5',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#f3a4b5',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#f3a4b5',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: muharraq_pm10,
          
        },
        {
          label: 'PM2.5',
          fill: false,
          backgroundColor: greenStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: muharraq_pm25,
          
        },
        {
          label: 'CO',
          fill: false, //fix
          backgroundColor: orangeStroke,
          borderColor: '#ff8d72',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ff8d72',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ff8d72',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: muharraq_co,
          
        },
      ]
      },
      options: gradientChartOptionsConfigurationWithTooltipPurple
    };
    var myChartData = new Chart(ctx, config);
    $("#0").click(function() {
      var data = myChartData.config.data;
      data.datasets[0].data = muharraq_aqi;
      data.datasets[1].data = muharraq_pm10;
      data.datasets[2].data = muharraq_pm25;
      data.datasets[3].data = muharraq_co;
      data.labels = chart_labels;
      myChartData.update();
    });
    $("#1").click(function() {
      var chart_data = capital_aqi;
      var data = myChartData.config.data;
      data.datasets[0].data = capital_aqi;
      data.datasets[1].data = capital_pm10;
      data.datasets[2].data = capital_pm25;
      data.datasets[3].data = capital_co;
      data.labels = chart_labels;
      myChartData.update();
    });

    $("#2").click(function() {
      var chart_data = northern_aqi;
      var data = myChartData.config.data;
      data.datasets[0].data = northern_aqi;
      data.datasets[1].data = northern_pm10;
      data.datasets[2].data = northern_pm25;
      data.datasets[3].data = northern_co;
      data.labels = chart_labels;
      myChartData.update();
    });
    $("#3").click(function() {
      var chart_data = southern_aqi;
      var data = myChartData.config.data;
      data.datasets[0].data = southern_aqi;
      data.datasets[1].data = southern_pm10;
      data.datasets[2].data = southern_pm25;
      data.datasets[3].data = southern_co;
      data.labels = chart_labels;
      myChartData.update();
    });

  },

  

};


