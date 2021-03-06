var socket = io();

socket.on('connect',()=>{

   socket.on("newMessage", (message)=>{
       console.log(message);
       var li = jQuery('<li></li>');
       li.text(`${message.from}: ${message.text}`);
       jQuery('#messages').append(li);
   })
   socket.on("newLocationMessage", (message)=>{
    console.log(message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
  //  li.text(`${message.from}: ${message.text}`);
    li.append(a)
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
var locationButton = jQuery('#send-location');
locationButton.on('click',function(e){
    if(!navigator.geolocation){
       return alert("Your browser doesn't suppport geolocation");
    }
    else
    {
        navigator.geolocation.getCurrentPosition(function(position){
            socket.emit("createLocationMessage", {
                lat:position.coords.latitude,
                lng:position.coords.longitude
            
            })

        });
    }
    
})

