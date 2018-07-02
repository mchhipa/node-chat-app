var socket = io();

socket.on('connect',()=>{

   socket.on("newMessage", (message)=>{
       console.log(message);
       var li = jQuery('<li></li>');
       li.text(`${message.from}: ${message.text}`);
       jQuery('#messages').append(li);
   })
    // socket.emit('createMessage',{
    //     from:"anonymous",
    //     text:"doing just fine",
    //     createdAt: new Date().getTime().toString()
    // });

    
});
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from:"Alex",
        text: jQuery('[name=message]').val()
        },  (st) => {
        console.log(st);
        });
});

