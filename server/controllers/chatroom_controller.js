require('dotenv').config();
const {sendQuestion} = require('../models/chat_model');
const {getKeyByValue} = require('../utils/utils');
const {ACCESS_TOKEN_SECRET} = process.env;
const path = require('path');
const jwt = require('jsonwebtoken');
const {
  getSelectedMessages,
  getMainMessages,
  getSideMessages,
  addNewMessages,
} = require('../models/chat_model');

const chatroom = (io) => {
  const users = [];
  let sender;
  const onlineuser = [];

  io.use(function(socket, next) {
    sender = socket.handshake.query.id;
    if (socket.handshake.query.id) {
      return next();
    }
    next(new Error('Authentication error'));
  });

  io.on('connection', (socket) => {
    users[sender] = socket.id;
    onlineuser.includes(sender) || (onlineuser.push(sender));
    userdata = JSON.stringify(onlineuser);

    io.emit('online', {
      onlineuser: onlineuser,
    });

    socket.on('disconnect', () => {
      const offlineUser = getKeyByValue(users, socket.id);
      const removeUserIndex = onlineuser.indexOf(offlineUser);
      removeUserIndex > -1 && (onlineuser.splice(removeUserIndex, 1));

      io.emit('offline', {
        onlineuser: onlineuser,
      });
    });

    socket.on('getMessages', async function(data) {
      const mainMessages = await getMainMessages(data.username);
      const sideMessages = await getSideMessages(data.username);
      const socketId = users[data.username];
      switch (true) {
        case (mainMessages.length>0):
          io.to(socketId).emit('loadMessages', {
            messages: mainMessages,
            side_messages: sideMessages,
            onlineuser: onlineuser,
          });
          break;
        case (mainMessages.length==0):
          io.to(socketId).emit('research');
          break;
      }
    });

    socket.on('selectMessages', async function(data) {
      socketId = users[data.sender];
      selectMessages = await getSelectedMessages(data.sender, data.chosenName);
      io.to(socketId).emit('reloadMessages', {
        messages: selectMessages,
      });
    });

    socket.on('ask_to_editor', async function(data) {
      switch (onlineuser.indexOf(data.receiver)) {
        case 0:
          socketId = users[data.receiver];
          info = data;
          io.to(socketId).emit('reply_editor', {
            info,
          });
          break;

        default:
          socketId = users[data.sender];
          info = data;
          io.to(socketId).emit('editor_alone', {
            info,
          });
          break;
      }
    });

    socket.on('no_collaborate', async function(data) {
      socketId = users[data.sender];

      io.to(socketId).emit('reply_no', {
        sender: data.receiver,
        room: data.room,
      });
    });

    socket.on('yes_collaborate', async function(data) {
      socketId = users[data.sender];

      io.to(socketId).emit('reply_yes', {
        sender: data.receiver,
        room: data.room,
        receiver: data.sender,
      });
    });

    socket.on('send_message', async function(data) {
      socketId = users[data.receiver];
      addNewMessages(data);

      io.to(socketId).emit('new_message', {
        sender: data.receiver,
        message: data.message,
        sender_picture: data.sender_picture,
      });
    });
  });
};

const askQuestion = async (req, res) => {
  try {
    const {nickname, company, question} = req.body;
    const result = await sendQuestion(company, question, nickname);
    res.status(200).send(result);
  } catch (error) {
    return {
      error,
    };
  }
};


const editor = async (req, res) => {
  try {
    const {room, id} = req.query;
    res.sendFile(path.join(__dirname, '../../public/api/1.0/editor.html'));
  } catch (error) {
    return {
      error,
    };
  }
};


const verifyIdentity = async (req, res) => {
  try {
    const bearerHeader = req.header('authorization');
    if (typeof bearerHeader == 'undefined') {
      res.sendStatus(403);
    };
    const bearerToken = bearerHeader.split(' ')[1];
    const userInfo = jwt.verify(bearerToken, ACCESS_TOKEN_SECRET);
    res.status(200).send(userInfo);
  } catch (error) {
    return {
      error,
    };
  }
};
module.exports = {
  chatroom,
  editor,
  askQuestion,
  verifyIdentity,
};
