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
} = require('./server/models/mysql');
const { keyword } = require('./server/models/show_keyword_model');

app.set('trust proxy', 'loopback');
app.set('json spaces', 2);
app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/' + API_VERSION,
  [
    require('./server/routes/user_route'),
    require('./server/routes/search_route'),
    require('./server/routes/chat_route'),
   
  ]
);


app.post("/get_main_messages", async function (req, res) {
  let {
    username
  } = req.body;
  
  let final_speaker;
  let final_speaker_result = await query(`SELECT MAX(id),sender,receiver FROM wenChang.message where(sender ='${username}')or (receiver='${username}') group by sender ,receiver order by max(id) desc limit 1`)
  if(final_speaker_result.length>0){
  if (final_speaker_result[0].sender != username) {
    final_speaker = final_speaker_result[0].sender
  } else {
    final_speaker = final_speaker_result[0].receiver
  }
}else{
  res.status(404).send('no chat info')
}
  let main_message = await query("SELECT * FROM message WHERE (sender = '" + username + "' AND receiver = '" + final_speaker + "') OR (sender = '" + final_speaker + "' AND receiver = '" + username + "')")
  if(main_message.length>0){
    res.end(JSON.stringify(main_message));
  }else{
    res.status(404).send('no chat info')
  }
});

app.post("/get_select_messages", async function (req, res) {
  let {
    chosenName,
    username
  } = req.body;
   let result= await query("SELECT * FROM message WHERE (sender = '" + chosenName + "' AND receiver = '" + username+ "') OR (sender = '" + username + "' AND receiver = '" + chosenName + "')")
  if(result.length>0){
    res.end(JSON.stringify(result));
  }else{
    res.status(404).send('no chat info')
  }
});

app.post("/get_side_messages", async function (req, res) {
  let {
    username
  } = req.body;
  let result=await query(`SELECT MAX(id),sender,receiver,message FROM wenChang.message where(sender ='${username}')or (receiver='${username}') group by sender ,receiver order by max(id) desc`)
  if(result.length>0){
    res.end(JSON.stringify(result));
  }else{
    res.status(404).send('no chat info')
  }
});

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

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
})

io.use(function (socket, next) {
  sender = socket.handshake.query.id
  console.log(sender)
  if (socket.handshake.query.id) {
    return next();
  }
  next(new Error('Authentication error'));
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)
  users[sender] = socket.id;
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("send_message", function (data) {
    console.log(data.sender + "say" + data.message + data.receiver)
    var socketId = users[data.receiver];
    io.to(socketId).emit("new_message", data);
    query("INSERT INTO message (sender, receiver, message) VALUES ('" + data.sender + "', '" + data.receiver + "', '" + data.message + "')", function (error, result) {});
  });

})
if (NODE_ENV != 'production') {
  http.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

module.exports = app;
