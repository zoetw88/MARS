Plotly.d3.json('../../json/chart2.json', function(figure){

    var trace1 = {
      x:figure[0].x,
      y:figure[0].y ,
      name: figure[0].name,
      mode: 'lines+markers',
       connectgaps: true
    }
    var trace2 = {
      x:figure[1].x,
      y:figure[1].y,
      name:figure[1].name,
      mode: 'lines+markers',
      connectgaps: true
    }
    var trace3 = {
      x:figure[2].x,
      y:figure[2].y,
      name:figure[2].name,
      mode: 'lines+markers',
      connectgaps: true
    }
    
    var data = [trace1, trace2,trace3];
  
    var layout = {
      width: 800,
      height: 490,
      plot_bgcolor: "transparent",
      paper_bgcolor: "#FFF3",
      showlegend: true,
      legend: {
        bordercolor: "Black",
        borderwidth: 0.5,
        bgcolor: "white",
        x: 1.5,
        xanchor: 'right',
        font: {

          size: 16,
          color: '#000'
        },
        y: 1
      },

      xaxis: {
        tickfont: {

          size: 18,
          color: 'black'
        },
        title: {
          text: '年資',
          font: {

            size: 18,

          }
        },
      },
      yaxis: {
        tickfont: {

          size: 18,
          color: 'black'
        },
        title: {
          text: '年薪($NT)',
          font: {

            size: 18,

          }
        }
      },
    };
    
    Plotly.newPlot('pie', data, layout);
  });


