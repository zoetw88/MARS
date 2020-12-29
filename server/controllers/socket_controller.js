
const {
  getSelectedMessages,
  getMainMessages,
  getSideMessages,
  addNewMessages,
} = require('../models/chat_model');

const {getKeyByValue}=require('../utils/utils');
const users = [];
let sender;
const onlineuser = [];

const chatroom = (io) => {
  io.use(function(socket, next) {
    sender = socket.handshake.query.id;
    if (socket.handshake.query.id) {
      return next();
    }
    next(new Error('Authentication error'));
  });

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
    users[sender] = socket.id;
    if (!onlineuser.includes(sender)) {
      onlineuser.push(sender);
    }

    userdata = JSON.stringify(onlineuser);

    io.emit('online', {
      onlineuser: onlineuser,
    });
    socket.on('disconnect', () => {
      const offlineUser = getKeyByValue(users, socket.id);

      const index = onlineuser.indexOf(offlineUser);
      if (index > -1) {
        onlineuser.splice(index, 1);
      }
      io.emit('offline', {
        onlineuser: onlineuser,
      });
      console.log('user disconnected');
    });

    socket.on('getMessages', async function(data) {
      const mainMessages = await getMainMessages(data.username);
      const sideMessages = await getSideMessages(data.username);

      const socketId = users[data.username];

      io.to(socketId).emit('loadMessages', {
        messages: mainMessages,
        side_messages: sideMessages,
        onlineuser: onlineuser,
      });
    });
    socket.on('selectMessages', async function(data) {
      const socketId = users[data.sender];
      const selectMessages = await getSelectedMessages(data.sender, data.chosenName);
      io.to(socketId).emit('reloadMessages', {
        messages: selectMessages,
      });
    });
    socket.on('ask_to_editor', async function(data) {
      const socketId = users[data.receiver];
      const info = data;

      io.to(socketId).emit('reply_editor', {
        info,
      });
    });
    socket.on('no_collaborate', async function(data) {
      const socketId = users[data.sender];

      io.to(socketId).emit('reply_no', {
        sender: data.receiver,
      });
    });
    socket.on('yes_collaborate', async function(data) {
      const socketId = users[data.sender];

      io.to(socketId).emit('reply_yes', {
        sender: data.receiver,
        room: data.room,
        receiver: data.sender,
      });
    });
    socket.on('send_message', async function(data) {
      const socketId = users[data.receiver];
      addNewMessages(data);
      io.to(socketId).emit('new_message', {
        sender: data.receiver,
        message: data.message,
        sender_picture: data.sender_picture,
      });
    });
  });
};


module.exports = {
  chatroom,
};
