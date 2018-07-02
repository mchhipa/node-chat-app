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
    
    socket.on('disconnect',()=>{
        console.log('client disconnected');
    });
    
    socket.on("createMessage",function (message){
        console.log("got message",message);
        io.emit('newMessage', {
                from: message.email,
                text: message.text,
                createdAt: new Date().getTime()
            }
        );
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