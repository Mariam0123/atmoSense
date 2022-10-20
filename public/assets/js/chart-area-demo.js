const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'AQI - Muharraq Governerate',
            data: [100, 89, 98, 79, 115, 70, 15],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            fill: false
        },
        {
            label: 'AQI - Southern Governerate',
            data: [30.7, 30.6, 30.6, 30.5, 24.8, 30.6, 31],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false
        },
        {
            label: 'AQI - Northern Governerate',
            data: [61, 70, 68, 66, 66, 75, 73],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
            fill: false
        },
        {
            label: 'AQI - Capital Governerate',
            data: [55, 43, 66, 78, 89, 100, 115],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            fill: false,
            animation: (context) => {
                var delay = 0;
                var index = context.dataIndex;
                var chart = context.chart;
                if (!started[index]) {
                  delay = index * delayBetweenPoints;
                  started[index] = true;
                }
                var { x, y } =
                  index > 0
                    ? chart
                        .getDatasetMeta(0)
                        .data[index - 1].getProps(["x", "y"], true)
                    : { x: 0, y: chart.scales.y.getPixelForValue(100) };

                return {
                  x: {
                    easing: "linear",
                    duration: delayBetweenPoints,
                    from: x,
                    delay
                  },
                  y: {
                    easing: "linear",
                    duration: delayBetweenPoints * 500,
                    from: y,
                    delay
                  },
                  skip: {
                    type: "boolean",
                    duration: delayBetweenPoints,
                    from: true,
                    to: false,
                    delay: delay
                  }
                };
              }
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: "linear"
            }
          }
        },
        plugins: [
          {
            id: "force_line_update",
            beforeDatasetDraw(chart, ctx) {
              ctx.meta.dataset.points = ctx.meta.data;
            }
          }
        ]
      });

