var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

app.get('/', function (req, res) {
  res.json([{
    "id": 1,
    "name": 'one'
  },{
    "id": 2,
    "name": 'two'
  }]);
});



app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});