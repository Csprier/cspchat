// routes/queries.routes.js
import express from 'express';
const router = express.Router();

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (err, result) => {
    if (err) {
      throw new Error(`There was an error getting users: ${err}`);
    }
    res.status(200).json(result.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (err) {
      throw new Error(`There was an error getting user by ID:, ${err}`);
    }
    res.status(200).json(result.rows);
  });
};

export default router;
