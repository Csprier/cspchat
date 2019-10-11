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
const server = http.createServer(app)
        .listen(port, () => {
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
    console.log('Message: ' + msg);
  })
});

// // Database
// // const queries = require('../routes/queries.routes');
// import { getUsers, getUserById, createUser, editUser, deleteUser } from '../routes/queries.routes';
// const db = { getUsers, getUserById, createUser, editUser, deleteUser };
// app.use('/users', db.getUsers);
// app.use('/users/:id', db.getUserById);
// app.use('/users', db.createUser);
// app.use('/users/:id', db.editUser);
// app.use('/users/:id', db.deleteUser);

// function dbConnect(req, res, next) {
//   pool.connect(PSQL_URI, (err, Client, done) => {
//     if (err) { 
//       console.log("Not able to get connection " + err);
//       res.status(400).send(err);
//     } 
//     Client.query('SELECT * FROM users', (err, result) => {
//       done(); // closing the connection;
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//       console.log(result.rows);
//     });
//   });
// };

