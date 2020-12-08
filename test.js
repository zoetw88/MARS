const fs = require('fs')
data=[
    {
        "label": "dd",
        "x": 1000,
        "y": 50
    },
    {
        "label": "setosa",
        "x": -2.7153906156,
        "y": 0.1695568476
    },
    {
        "label": "dd",
        "x": -2.8898195396,
        "y": 0.1373456096
    }
]
       
fs.writeFile('C:\Users\zoetw\Documents\GitHub\WenChang\public\json\]chart2.json',data,function(err, result) {
    if(err) console.log('error', err);
    console.log('complete');
  });
