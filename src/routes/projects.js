const express = require('express');
const db = require('../db');
const {
  checkProjectRequiredFields, checkProjectUnknownFields,
} = require('../validators/check-project-fields');

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

router.post('/',
  checkProjectRequiredFields,
  checkProjectUnknownFields,
  (req, res) => {
    const insertQuery = 'INSERT INTO project SET ?';
    db.query(insertQuery, [req.body], (errInsert, stats) => {
      if (errInsert) {
        return res.status(500).send({ error: errInsert.message });
      }
      const selectQuery = 'SELECT * FROM project WHERE id = ?';
      return db.query(selectQuery, [stats.insertId], (errSelect, projects) => {
        if (errSelect) {
          return res.status(500).send({ error: errSelect.message });
        }
        return res.status(201).json(projects[0]);
      });
    });
  });

module.exports = router;
