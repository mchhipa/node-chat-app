const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection',(socket)=>{
    console.log("new user connected");
    socket.emit('newEmail',{
        from:"mehboob chhipa",
        text:"how are you",
        createdAt: new Date().getTime().toString()
    });
    socket.on('disconnect',()=>{
        console.log('client disconnected');
    });
    socket.on("createEmail",function (newEmail){
        console.log("New Email",newEmail);
    });
    socket.emit("newMessage",{
        to:"mehboob",
        text:"how are you",
        createdAt: new Date().getTime().toString()
    });
    socket.on("createMessage",function (newMessage){
        console.log("got message",newMessage);
    });
});


app.use(express.static(publicPath));

server.listen(port,(e)=>{
    if(!e){
        console.log(`starting server on port ${port}`);
    }
});

console.log(__dirname + '/../public');
console.log(publicPath);