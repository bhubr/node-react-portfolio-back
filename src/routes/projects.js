const express = require('express');
const db = require('../db');
const {
  checkProjectRequiredFields,
  checkProjectUnknownFields,
  removeRecordId,
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

router.put('/:projectId',
  checkProjectRequiredFields,
  removeRecordId,
  checkProjectUnknownFields,
  (req, res) => {
    const updateQuery = 'UPDATE project SET ? WHERE id = ?';
    const { projectId } = req.params;
    db.query(updateQuery, [req.body, projectId], (errUpdate, stats) => {
      if (errUpdate) {
        return res.status(500).send({ error: errUpdate.message });
      }
      if (stats.affectedRows === 0) {
        return res.status(404).send({ error: 'Project not found' });
      }
      const selectQuery = 'SELECT * FROM project WHERE id = ?';
      return db.query(selectQuery, [projectId], (errSelect, projects) => {
        if (errSelect) {
          return res.status(500).send({ error: errSelect.message });
        }
        return res.status(200).json(projects[0]);
      });
    });
  });

module.exports = router;
