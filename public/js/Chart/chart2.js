company = '鴻海精密工業股份有限公司'
title = '軟體工程師'


axios.get(`/api/1.0/salary?company=${company}&title=${title}`)
  .then((response) => {
    console.log('salary ok')
    barChart()
  })
  .catch((error) => {
    console.log(error)
  })
  function barChart(){
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
      title: 'Connect the Gaps Between Data',
      showlegend: false
    };
    
    Plotly.newPlot('pie', data, layout);
  });

  }
