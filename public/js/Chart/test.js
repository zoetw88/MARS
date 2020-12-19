// Create the chart
Highcharts.chart('container', {
  chart: {
    backgroundColor:"#ffffff00",
  
    type: 'column'
  },
  title: {
    text: '本月搜尋次數'
  },
  subtitle: {
    text: ''
  },
  accessibility: {
    announceNewData: {
      enabled: true
    }
  },
  xAxis: {
    title: {
      text: '公司名稱'
    },
    type: 'category'
  },
  yAxis: {
    title: {
      text: '搜尋次數'
    }

  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y:f}'
      }
    }
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
  },

  series: [
    {
      name: "Browsers",
      colorByPoint: true,
      data: [
        {
          name: "Chrome",
          y: 1,
          drilldown: "Chrome"
        },
        {
          name: "Firefox",
          y: 10.57,
          drilldown: "Firefox"
        },
        {
          name: "Internet Explorer",
          y: 7.23,
          drilldown: "Internet Explorer"
        },
        {
          name: "Safari",
          y: 5.58,
          drilldown: "Safari"
        },
        {
          name: "Edge",
          y: 4.02,
          drilldown: "Edge"
        },
        {
          name: "Opera",
          y: 1.92,
          drilldown: "Opera"
        },
        {
          name: "Other",
          y: 7.62,
          drilldown: null
        }
      ]
    }
  ],
  drilldown: {
    series: [
      {
        name: "Chrome",
        id: "Chrome",
        data: [
          [
            "v65.0",
            0.1
          ],
         
        ]
      },
      {
        name: "Firefox",
        id: "Firefox",
        data: [
          [
            "v58.0",
            1.02
          ],
          [
            "v57.0",
            7.36
          ],
          [
            "v56.0",
            0.35
          ],
          [
            "v55.0",
            0.11
          ],
          [
            "v54.0",
            0.1
          ],
          [
            "v52.0",
            0.95
          ],
          [
            "v51.0",
            0.15
          ],
          [
            "v50.0",
            0.1
          ],
          [
            "v48.0",
            0.31
          ],
          [
            "v47.0",
            0.12
          ]
        ]
      },
      {
        name: "Internet Explorer",
        id: "Internet Explorer",
        data: [
          [
            "v11.0",
            6.2
          ],
          [
            "v10.0",
            0.29
          ],
          [
            "v9.0",
            0.27
          ],
          [
            "v8.0",
            0.47
          ]
        ]
      },
      {
        name: "Safari",
        id: "Safari",
        data: [
          [
            "v11.0",
            3.39
          ],
          [
            "v10.1",
            0.96
          ],
          [
            "v10.0",
            0.36
          ],
          [
            "v9.1",
            0.54
          ],
          [
            "v9.0",
            0.13
          ],
          [
            "v5.1",
            0.2
          ]
        ]
      },
      {
        name: "Edge",
        id: "Edge",
        data: [
          [
            "v16",
            2.6
          ],
          [
            "v15",
            0.92
          ],
          [
            "v14",
            0.4
          ],
          [
            "v13",
            0.1
          ]
        ]
      },
      {
        name: "Opera",
        id: "Opera",
        data: [
          [
            "v50.0",
            0.96
          ],
          [
            "v49.0",
            0.82
          ],
          [
            "v12.1",
            0.14
          ]
        ]
      }
    ]
  }
});