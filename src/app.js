// ===============================================================================================
// Require dotenv
require('dotenv').config();

import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// -- Import routers
import userRouter from './routes/queries.routes';
// const userRouter = require('../src/routes/queries.routes');
import indexRouter from './routes/index';
// import { PORT, PSQL_URI } from './config';

// Instance
const app = express();

// ===============================================================================================
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.options('*', cors());

// Add middlewares: logger, parser, etc
app.use(logger('dev'));
app.use(express.json()); // Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static
app.use(express.static(path.join(__dirname, '../public')));

// - Mount router -
// Static
app.use('/', indexRouter);
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});
// ----

// Database Users API ExpressJS Router
app.use('/users', userRouter);
// ----

// ======================================================
// ERROR HANDLING
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
// ======================================================

// ======================================================
// POSTGRESQL DATABASE CONNECTION
import pg from 'pg';
const connectionString = 'postgres://wizard:password@localhost:5432/chat';
const client = new pg.Client(connectionString);
import db from './db/index';
client.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  console.log('-- Connecting to database from entry point --');
  console.log('');
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log('-- Connection test query results --');
    console.log(result.rows);
    // client.end();
    console.log('-- End Test Query --');
  });
});

export default app;

/**
const pool = new Pool({
  user: 'wizard',
  host: 'localhost',
  database: 'chat',
  password: 'password',
  port: 5432,
});
*/