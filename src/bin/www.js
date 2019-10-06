#!/usr/bin/env node
// bin/www.js
// ============================================================

// Module dependencies.
import app from '../app';
import { serverUtils } from '../lib/server.utils';
import debugLib from 'debug';
import http from 'http';
const debug = debugLib('cspChat:server');

// Get port from environment and store in Express.
const port = serverUtils.normalizePort(process.env.PORT || '8080');
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app).listen(port, () => {
  console.log(`listening on *:${port}`);
});
const io = require('socket.io').listen(server);

// Listen on provided port, on all network interfaces.
server.on('error', (err) => serverUtils.onError(err));
// server.on('listening', onListening());

/** SOCKETS */
// io listen on the connection event for incoming sockets
io.on('connection', (socket) => {
  // connect
  console.log('a user connected');
  // disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

// ====================================================================================================
// function onListening() { // Event listener for HTTP server "listening" event.
//   const addr = server.address();
//   const bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }