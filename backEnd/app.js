require('dotenv').config();
const {PORT_TEST, PORT, NODE_ENV, API_VERSION} = process.env;
const port = NODE_ENV == 'test' ? PORT_TEST : PORT;
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan=require('morgan')




app.set('trust proxy', 'loopback');
app.set('json spaces', 2);

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(morgan('dev'));
// CORS allow all
app.use(cors());


// API routes
app.use('/api/' + API_VERSION,
    [
        require('./routes/user_route'),
    ]
);


app.use(bodyparser.json());

// Page not found
app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Error handling
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

if (NODE_ENV != 'production'){
    app.listen(port, () => {console.log(`Listening on port: ${port}`);});
}
var http = require('http')
var server = http.createServer(function (req, res) {   // 2 - 建立server
 
    // 在此處理 客戶端向 http server 發送過來的 req。
 
});
const io = require('socket.io')(http)

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)
    socket.on('send-message', ({ recipients, text }) => {
      recipients.forEach(recipient => {
        const newRecipients = recipients.filter(r => r !== recipient)
        newRecipients.push(id)
        socket.broadcast.to(recipient).emit('receive-message', {
          recipients: newRecipients, sender: id, text
        })
      })
    })
  })
  if (NODE_ENV != 'production'){
   server.listen(3001, () => {console.log(`Listening on port: ${3001}`);});
}


module.exports = app;
