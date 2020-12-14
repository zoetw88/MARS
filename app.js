require('dotenv').config();
const {PORT_TEST, PORT, NODE_ENV, API_VERSION} = process.env;
const port = NODE_ENV == 'test' ? PORT_TEST : PORT;
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan=require('morgan')
const http=require("http").createServer(app)
const {query, transaction, commit, rollback} = require('./models/mysql');


app.set('trust proxy', 'loopback');
app.set('json spaces', 2);

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(morgan('dev'));

app.use(cors());

    
// API routes
app.use('/api/' + API_VERSION,
    [
        require('./routes/user_route'),
        require('./routes/search_route'),
    ]
);

app.post("/get_messages", function (request, result) {
  // get all messages from database
  query("SELECT * FROM message WHERE (sender = '" + request.body.sender + "' AND receiver = '" + request.body.receiver + "') OR (sender = '" + request.body.receiver + "' AND receiver = '" + request.body.sender + "')", function (error, messages) {
     console.log(error)
     console.log('ok')
      result.end(JSON.stringify(messages));
  });
});
app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// Page not found
app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Error handling
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});


var users = [];
 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('socket connected')
  // socket.on("new_message",function (data){
  //   console.log("Client says",data)
  // })
  socket.on("user_connected", function (username) {
    users[username] = socket.id;
    console.log(users)
    socket.emit("user_connected", username);
});


socket.on("send_message", function (data) {
  // send event to receiver
  var socketId = users[data.receiver];

  socket.to(socketId).emit("new_message", data);
  query("INSERT INTO message (sender, receiver, message) VALUES ('" + data.sender + "', '" + data.receiver + "', '" + data.message + "')", function (error, result) {
    console.log(error)
});
});
    //  const id = socket.handshake.query.id
    // // socket.join(id)
    // socket.on('new_message', ({ recipients, text }) => {
    //   recipients.forEach(recipient => {
    //     const newRecipients = recipients.filter(r => r !== recipient)
    //     newRecipients.push(id)
    //     socket.broadcast.to(recipient).emit('receive-message', {
    //       recipients: newRecipients, sender: id, text
    //     })
    //   })
    // })
  })
  if (NODE_ENV != 'production'){
   http.listen(port, () => {console.log(`Listening on port: ${port}`);});
}


module.exports = app;
