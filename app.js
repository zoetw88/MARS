require('dotenv').config();
const {
  PORT_TEST,
  PORT,
  NODE_ENV,
  API_VERSION
} = process.env;
const port = NODE_ENV == 'test' ? PORT_TEST : PORT;
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan')
const http = require("http").createServer(app)
const {
  query,
  transaction,
  commit,
  rollback
} = require('./models/mysql');


app.set('trust proxy', 'loopback');
app.set('json spaces', 2);

app.use(express.static('public'));
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use(morgan('dev'));

app.use(cors());
async function test(){
let test = await query("SELECT * FROM wenChang.message WHERE (sender = 'jeff' AND receiver = 'Zoe')OR(sender = 'Zoe' AND receiver = 'Jeff')")
console.log(test)}
test()
app.use('/api/' + API_VERSION,
  [
    require('./routes/user_route'),
    require('./routes/search_route'),
  ]
);

app.post("/get_messages", function (request, result) {
  query("SELECT * FROM message WHERE (sender = '" + request.body.sender + "' AND receiver = '" + request.body.receiver + "') OR (sender = '" + request.body.receiver + "' AND receiver = '" + request.body.sender + "')", function (error, messages) {
    result.end(JSON.stringify(messages));
  });
});
app.use(bodyparser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// Page not found
app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Error handling
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('Internal Server Error');
});


let users = [];
let sender;
const io = require('socket.io')(http)


io.use(function(socket, next){
  console.log("id", socket.handshake.query.id);
  sender = socket.handshake.query.id
  // return the result of next() to accept the connection.
  if (socket.handshake.query.id) {
      return next();
  }
  // call next() with an Error if you need to reject the connection.
  next(new Error('Authentication error'));
});

io.on('connection', (socket) => {
      console.log('socket connected', socket.id)
      users[sender] = socket.id;
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on("send_message", function (data) {
        console.log(data.sender+"say" +data.message+ data.receiver)
        var socketId = users[data.receiver];
        io.to(socketId).emit("new_message", data);
        query("INSERT INTO message (sender, receiver, message) VALUES ('" + data.sender + "', '" + data.receiver + "', '" + data.message + "')", function (error, result) {});
      });
  // socket.join(id)
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
if (NODE_ENV != 'production') {
  http.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}


module.exports = app;
