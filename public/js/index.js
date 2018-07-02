var socket = io();

socket.on('connect',()=>{

    socket.on('newMessage',function (newMessage){
        console.log("got message",newMessage);
    });
    socket.emit('createMessage',{
        to:"anon",
        text:"doing just fine",
        createdAt: new Date().getTime().toString()
    });
});

