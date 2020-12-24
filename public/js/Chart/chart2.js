


    Plotly.d3.json('../../json/salary.json', function(figure){
      if (figure!="no"){

      
        var trace1 = {
          x: figure[0].x,
          y: figure[0].y,
          name: figure[0].name,
          mode: 'lines+markers',
          connectgaps: true
        }


        if (figure[1] && figure[2]) {

          var trace2 = {
            x: figure[1].x,
            y: figure[1].y,
            name: figure[1].name,
            mode: 'lines+markers',
            connectgaps: true
          }
          var trace3 = {
            x: figure[2].x,
            y: figure[2].y,
            name: figure[2].name,
            mode: 'lines+markers',
            connectgaps: true
          }

          var data = [trace1, trace2, trace3];
        } else if (figure[1]) {

          var trace2 = {
            x: figure[1].x,
            y: figure[1].y,
            name: figure[1].name,
            mode: 'lines+markers',
            connectgaps: true
          }


          var data = [trace1, trace2];
        } else {
          var data = [trace1]
        }
        var layout = {
          width: 520,
          height:500,
          plot_bgcolor: "transparent",
          paper_bgcolor: "transparent",
          showlegend: true,
          margin: {
            l:70,
            r:40,
            b: 0,
            t: 50
          },
          legend: {
            legend : {
              orientation: 'h' 
          },
            bordercolor: "Black",
            borderwidth: 0.5,
            bgcolor: "white",
            x: 0.2,
           
            font: {

              size: 16,
              color: '#000'
            },
            y: -0.6
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
      

  
   }
  else{
    let test = document.querySelector("#message-salary")
    test.innerHTML = "(ఠ్ఠ ˓̭ ఠ్ఠ)尚未有人提供相關情報"
  }
  
  });


