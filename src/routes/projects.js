const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM project';
  db.query(selectQuery, (err, projects) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    return res.json(projects);
  });
});

module.exports = router;
