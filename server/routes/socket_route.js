const {
    getSelectedMessages,
    getMainMessages,
    getSideMessages,
    newMessages
} = require('../models/chat_model');


let users = [];
let sender;

let chatroom = (io) => {
    io.use(function (socket, next) {
        sender = socket.handshake.query.id
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

        socket.on("getMessages", async function (data) {
            let main_messages = await getMainMessages(data.username)
            let side_messages = await getSideMessages(data.username)
            var socketId = users[data.username];

            io.to(socketId).emit("loadMessages", {
                messages: main_messages,
                side_messages: side_messages
            });
        })
        socket.on("selectMessages", async function (data) {

            var socketId = users[data.sender];
            let select_messages = await getSelectedMessages(data.sender, data.chosenName)

            io.to(socketId).emit("reloadMessages", {
                messages: select_messages
            });

        })
        socket.on("ask_to_editor", async function (data) {

            var socketId = users[data.receiver];
            let info = data

            io.to(socketId).emit("reply_editor", {
                info
            });

        })
        socket.on("no_collaborate", async function (data) {

            var socketId = users[data.sender];

            io.to(socketId).emit("reply_no", {
                sender: data.receiver
            });

        })
        socket.on("yes_collaborate", async function (data) {

            var socketId = users[data.sender];

            io.to(socketId).emit("reply_yes", {
                sender: data.receiver,
                room:data.room,
                receiver:data.sender
            });

        })
        socket.on("send_message", async function (data) {
            var socketId = users[data.receiver];
            newMessages(data)
            io.to(socketId).emit("new_message", {
                sender: data.receiver,
                message: data.message
            });
        })
    })
}


module.exports = {
    chatroom
}