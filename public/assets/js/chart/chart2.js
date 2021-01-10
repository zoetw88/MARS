

Plotly.d3.json('../../json/salary.json', function(figure) {
  if (figure!='no') {
    const data=[];
    for (i=0; i<figure.length; i++) {
      const trace = {
        x: figure[i].x,
        y: figure[i].y,
        name: figure[i].name,
        mode: 'lines+markers',
        connectgaps: true,
      };
      data.push(trace);
    }
    let y_legend;
    if (data.length>3) {
      y_legend=-1;
      chart_height=620;
    } else {
      y_legend=-0.6;
      chart_height=520;
    }
    const layout = {
      width: 520,
      height: chart_height,
      plot_bgcolor: 'transparent',
      paper_bgcolor: 'transparent',
      showlegend: true,
      margin: {
        l: 70,
        r: 40,
        b: 0,
        t: 50,
      },
      legend: {
        legend: {
          orientation: 'h',
        },
        bordercolor: 'Black',
        borderwidth: 0.5,
        bgcolor: 'white',
        x: 0.2,

        font: {

          size: 16,
          color: '#000',
        },
        y: y_legend,
      },

      xaxis: {
        tickfont: {

          size: 18,
          color: 'black',
        },
        title: {
          text: '年資',
          font: {

            size: 18,

          },
        },
      },
      yaxis: {
        tickfont: {

          size: 18,
          color: 'black',
        },
        title: {
          text: '年薪($NT)',
          font: {

            size: 18,

          },
        },
      },
    };

    Plotly.newPlot('pie', data, layout);
  } else {
    $('<h4 id="message-salary"> (ఠ్ఠ ˓̭ ఠ్ఠ)尚未有人提供相關情報</h4>').appendTo($('.chart-label-2 '));
  }
});


