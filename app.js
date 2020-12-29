require('dotenv').config();
const {
  PORT_TEST,
  PORT,
  NODE_ENV,
  API_VERSION,
} = process.env;
const port = NODE_ENV == 'test' ? PORT_TEST : PORT;
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const http = require('http').createServer(app);
const {chatroom} = require('./server/controllers/socket_controller');

app.set('trust proxy', 'loopback');
app.set('json spaces', 2);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/' + API_VERSION,
    [
      require('./server/routes/user_route'),
      require('./server/routes/search_route'),
      require('./server/routes/chat_route'),

    ],
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
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


const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});
chatroom(io);


if (NODE_ENV != 'production') {
  http.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

module.exports = app;
