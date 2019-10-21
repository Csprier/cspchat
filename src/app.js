// ===============================================================================================
// Require dotenv
require('dotenv').config();

import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// -- Import user router
import userRouter from '../src/routes/queries.routes';
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static
app.use(express.static(path.join(__dirname, '../public')));

// ======================================================
// ERROR HANDLING
app.use((req, res, next) => {
  const err = new Error('Not Found, something broke!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(`ERROR: ${err}`);
  res.status(err.status);
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : err
  });
});
// ======================================================

// ./public/index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

// - Mount router -
// Static
app.use('/', indexRouter);
// API
app.use('/users', userRouter);
// ----

// ======================================================
// POSTGRESQL DATABASE CONNECTION
import pg from 'pg';
const connectionString = 'postgres://wizard:password@localhost:5432/chat';
const client = new pg.Client(connectionString);
client.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  console.log('-- Connecting to database --');
  client.query('SELECT * FROM users', (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log('-- Connection test query results --');
    console.log(result.rows);
    client.end();
  });
});

/*
// const { Pool } = require('pg').Pool;
// const pool = new Pool({
//   user: 'wizard',
//   host: 'localhost',
//   database: 'chat',
//   password: 'password',
//   port: 5432,
// });
*/
export default app;
