

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
    if (data.length<6&&data.length>3) {
      y_legend=-0.8;
      chart_height=545;
    } else if (data.length>6&&data.length<11) {
      y_legend=-1.3;
      chart_height=670; } 
      else if (data.length>10&&data.length<13) {
      y_legend=-1.3;
      chart_height=700; } 
      else if (data.length>13&& data.length<15) {
        y_legend=-1.7;
        chart_height=900;
    }  else if (data.length=15) {
      y_legend=-1.7;
      chart_height=780;
  } else if (data.length>=16) {
      y_legend=-1.9;
      chart_height=800;
    }else{
      y_legend=-0.8;
      chart_height=530;
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




