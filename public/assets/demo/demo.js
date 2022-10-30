var type = ['primary', 'info', 'success', 'warning', 'danger'];
var muharraq_aqi_var, southern_aqi_var, northern_aqi_var, capital_aqi_var;
var demo = {
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
  var chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    var gradientChartOptionsConfiguration = {
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

    

    var gradientChartOptionsConfigurationWithTooltipPurple = {
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

    var chart_labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    


    



  },

  

};
function update_data(muharraq_aqi_in, capital_aqi_in, northern_aqi_in, southern_aqi_in){
  var muharraq_aqi = muharraq_aqi_in;
  var muharraq_pm10 = [30.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31];
  var muharraq_pm25 = [61, 70, 68, 66, 66, 75, 73];
  var muharraq_co = [55, 43, 66, 78, 89, 100, 115];

  var capital_aqi = capital_aqi_in;
  var capital_pm10 = [60.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31];
  var capital_pm25 = [61, 70, 68, 66, 66, 75, 73];
  var capital_co = [55, 43, 66, 78, 89, 100, 115];

  var northern_aqi = northern_aqi_in;
  var northern_pm10 = [90.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31];
  var northern_pm25 = [61, 70, 68, 66, 66, 75, 73];
  var northern_co = [55, 43, 66, 78, 89, 100, 115];

  var southern_aqi = southern_aqi_in;
  var southern_pm10 = [120.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31];
  var southern_pm25 = [61, 70, 68, 66, 66, 75, 73];
  var southern_co = [55, 43, 66, 78, 89, 100, 115];

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
        data: muharraq_aqi_var,
       
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
    
    var data = myChartData.config.data;
    data.datasets[0].data = capital_aqi;
    data.datasets[1].data = capital_pm10;
    data.datasets[2].data = capital_pm25;
    data.datasets[3].data = capital_co;
    data.labels = chart_labels;
    myChartData.update();
  });

  $("#2").click(function() {
    
    var data = myChartData.config.data;
    data.datasets[0].data = northern_aqi;
    data.datasets[1].data = northern_pm10;
    data.datasets[2].data = northern_pm25;
    data.datasets[3].data = northern_co;
    data.labels = chart_labels;
    myChartData.update();
  });
  $("#3").click(function() {
    
    var data = myChartData.config.data;
    data.datasets[0].data = southern_aqi;
    data.datasets[1].data = southern_pm10;
    data.datasets[2].data = southern_pm25;
    data.datasets[3].data = southern_co;
    data.labels = chart_labels;
    myChartData.update();
  });

}


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, onValue, ref, limitToLast, query, orderByKey, set } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyDxFLdPFwjwUiI0EHwZvC0cRcEVmR0CiYs",
    authDomain: "atmosense-1645e.firebaseapp.com",
    databaseURL: "https://atmosense-1645e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "atmosense-1645e",
    storageBucket: "atmosense-1645e.appspot.com",
    messagingSenderId: "565173512011",
    appId: "1:565173512011:web:8Animationsa7a5947fb2470f8912ace",
    measurementId: "G-FZ55WKWLZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const new_ref = query(ref(db, 'air_parameters/values'), orderByKey(), limitToLast(1));

onValue(new_ref, (data) => {
    var jsonData = data.toJSON();
    var time_var = Object.keys(jsonData).toString();

    var d = new Date(0);
    d.setUTCSeconds(time_var);
    var epoch_date = d.toLocaleDateString("en-gb");
    var epoch_string = epoch_date.replace(/\//g, '-');

    const aqi_query_ref = ref(db, 'air_parameters/aqis');
    onValue(aqi_query_ref, (data) => { //to retrive values
        
      var jsonAQIData = data.toJSON();
      muharraq_aqi_var = jsonAQIData['muharraq'][epoch_string]['aqi'];
      capital_aqi_var = jsonAQIData['capital'][epoch_string]['aqi'];
      northern_aqi_var = jsonAQIData['northern'][epoch_string]['aqi'];
      southern_aqi_var = jsonAQIData['southern'][epoch_string]['aqi'];
      update_data(muharraq_aqi_var, capital_aqi_var, northern_aqi_var, southern_aqi_var);
    });
});

export {demo};