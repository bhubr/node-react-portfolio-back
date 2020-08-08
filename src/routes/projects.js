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

const checkProjectRequiredFields = (req, res, next) => {
  if (!req.body) {
    return res.status(422).json({ error: 'Missing body' });
  }
  const requiredFields = ['name', 'description', 'picture_url', 'github_url'];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(422).json({ error: `Missing fields: ${missingFields}` });
  }
  return next();
};

const checkProjectUnknownFields = (req, res, next) => {
  const validFields = [
    'name', 'description', 'picture_url', 'github_url', 'deploy_url', 'techno',
  ];
  const bodyFields = Object.keys(req.body);
  const invalidFields = bodyFields.filter((field) => !validFields.includes(field));
  if (invalidFields.length > 0) {
    return res.status(422).json({ error: `Unknown fields: ${invalidFields}` });
  }
  return next();
};

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
  }
);

module.exports = router;
