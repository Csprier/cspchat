// routes/queries.routes.js
import express from 'express';
const router = express.Router();

// Create query Pool
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'wizard',
  host: 'localhost',
  database: 'chat',
  password: 'password',
  port: 5432,
});

// GET
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (err, result) => {
    if (err) {
      throw new Error(`There was an error getting users: ${err}`);
    }
    res.status(200).json(result.rows);
  });
};

// GET/:id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (err) {
      throw new Error(`There was an error getting user by ID:, ${err}`);
    }
    res.status(200).json(result.rows);
  });
};

// POST
const createUser = (req, res) => {
  const { username, email } = req.body;
  pool.query(`
      INSERT INTO users 
      (username, email), 
      VALUES
      $1, $2
    `, 
    [ username, email ],
    (err, result) => {
      if (err) {
        throw new Error(`There was an error creating a new user: ${err}`);
      }
      res.status(200).json(result.rows);
    }
  );
};

// PUT
const editUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email } = req.body;
  pool.query(`
    UPDATE users 
    SET 
    username = $1, email = $2
    WHERE id = $3 
  `, 
    [ id, username, email ],
    (err, result) => {
      if (err) {
        throw new Error(`There was an error editing user information: ${err}`);
      }
      res.status(200).json(result.rows);
    }
  );
};

// DELETE
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(`
    DELETE FROM users
    WHERE ID = $1
  `,
    [ id ],
    (err, result) => {
      if (err) {
        throw new Error(`There was an error deleting the user: ${err}`);
      }
      res.status(200).send(`User delete with ID: ${id}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser
};