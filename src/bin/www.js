#!/usr/bin/env node
// bin/www.js
// ============================================================

// Module dependencies.
import app from '../app';
import debugLib from 'debug';
import http from 'http';
const debug = debugLib('cspChat:server');

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app).listen(port, () => {
  console.log(`listening on *:${port}`);
});
const io = require('socket.io').listen(server);

// Listen on provided port, on all network interfaces.
server.on('error', onError);
server.on('listening', onListening);

/** SOCKETS */
// io listen on the connection event for incoming sockets
io.on('connection', (socket) => {
  // connect
  console.log('a user connected');
  // disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
