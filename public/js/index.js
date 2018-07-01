var socket = io();

socket.on('connect',()=>{
    console.log("connected to server");

    socket.emit('createEmail',{
        to:"mehboob@chhipa.com",
        text:"doing just fine",
        createdAt: new Date().getTime().toString()
    });
    socket.on('newMessage',function (newMessage){
        console.log("got message",newMessage);
    });
    socket.emit('createMessage',{
        to:"anon",
        text:"doing just fine",
        createdAt: new Date().getTime().toString()
    });
});




socket.on('newEmail',function(email){
    console.log('New email',email);
})