// Database
import db from '../db/index';
// Express & Router
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const getAllUsersQuery = 'SELECT * FROM users';
  db.query(getAllUsersQuery, (err, res) => {
    if (err) {
      return next(err);
    }
    console.log(res.rows);
    // res.json(res.rows);
  });
});

router.get('/:id', (req, res, next) => {
  const getUserByIDQuery = 'SELECT * FROM users WHERE id = $1';
  const id = parseInt(req.params.id);
  console.log('GET /:id', id);
  db.query(getUserByIDQuery, [id], (err, res) => {
    if (err) {
      return next(err);
    }
    console.log(res.rows[0]);
    // res.status(200).json(result.rows);
  });
})

module.exports = router;
