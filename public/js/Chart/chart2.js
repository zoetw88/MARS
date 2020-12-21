company=window.localStorage.getItem('company')
title=window.localStorage.getItem('title')

axios.get(`api/1.0/salary?company=${company}&title=${title}`)
  .then((response) => {
     
if (response.data!='no'){
  response=response.data
          var trace1 = {
            x: response[0].x,
            y: response[0].y,
            name: response[0].name,
            mode: 'lines+markers',
            connectgaps: true
          }


          if (response[1]&&response[2]) {

            var trace2 = {
              x: response[1].x,
              y: response[1].y,
              name: response[1].name,
              mode: 'lines+markers',
              connectgaps: true
            }
            var trace3 = {
              x: response[2].x,
              y: response[2].y,
              name: response[2].name,
              mode: 'lines+markers',
              connectgaps: true
            }

            var data = [trace1, trace2, trace3];
          } else if (response[1]) {

            var trace2 = {
              x: response[1].x,
              y: response[1].y,
              name: response[1].name,
              mode: 'lines+markers',
              connectgaps: true
            }


            var data = [trace1, trace2];
          } else {
            var data = [trace1]
          }
          var layout = {
            annotations: [
              {
                x: 0.5,
                y: -0.15,
                xref: 'paper',
                yref: 'paper',
                text: '年資',
                font:{
                  size: 18
                },
                showarrow: false,
              }
            ],
            width: 520,
            height:495,
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
              y: -0.4
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


