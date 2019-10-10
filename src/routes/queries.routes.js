// routes/queries.routes.js
import express from 'express';
const router = express.Router();

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

export default router;
