const express = require('express');
const Checklist = require('../models/checklist');
const Task = require('../models/task');
const checklistDependentRoute = express.Router();

checklistDependentRoute
  .get('/:id/tasks/new', async (req, res) => {
    try {
      const task = new Task();
      const checklistID = req.params.id;
      res
        .status(200)
        .render('tasks/new', { checklistID: checklistID, task: task });
    } catch (error) {
      res.status(422).render('pages/error', { error: 'Cannot load the form' });
    }
  })
  .post('/', async (req, res) => {
    const { title } = req.body.task;
  });

module.exports = { checklistDependent: checklistDependentRoute };
