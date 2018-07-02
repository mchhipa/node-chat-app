const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const { generateMessage,generateLocationMessage } = require('./utils/message')

io.on('connection',(socket)=>{
    console.log("new user connected");
    
    socket.on('disconnect',()=>{
        console.log('client disconnected');
    });
    socket.emit('newMessage',generateMessage("Admin","Welcome to chat app"));
    socket.broadcast.emit("newMessage",generateMessage("Admin","new user joined"));
    socket.on("createMessage",(message,cb) => {
        console.log("got message",message);
        io.emit('newMessage', generateMessage(message.from,message.text));
        if(typeof cb !== 'undefined'){
            console.log(typeof cb)
            cb("this is string from server");
        }
    });
    socket.on("createLocationMessage",(message) =>{
        console.log(message)
        io.emit("newLocationMessage", generateLocationMessage('admin', message.lat ,message.lng));
    })
});


app.use(express.static(publicPath));

server.listen(port,(e)=>{
    if(!e){
        console.log(`starting server on port ${port}`);
    }
});

console.log(__dirname + '/../public');
console.log(publicPath);