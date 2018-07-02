var socket = io();

socket.on('connect',()=>{

   socket.on("newMessage", (message)=>{
       console.log(message);
   })
    socket.emit('createMessage',{
        from:"anonymous",
        text:"doing just fine",
        createdAt: new Date().getTime().toString()
    });
});

