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

var server = app.listen(5000);
    
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



const io = require('socket.io')(server,{cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true}
})

io.on('connection', (socket) => {
  console.log('socket connected')
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
//   if (NODE_ENV != 'production'){
//    server.listen(5000, () => {console.log(`Listening on port: ${5000}`);});
// }


module.exports = app;
