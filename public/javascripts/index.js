$(() => {
  const socket = io();
  $('form').submit((e) => {
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat-message', (msg) =>{
    console.log('Hello from index.js');
    $('#messages').append($('<li>').text(msg));
  })
});