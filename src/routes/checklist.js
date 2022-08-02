const express = require('express');
const Checklist = require('../models/checklist');

const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      let checklists = await Checklist.find({});
      res.status(200).json(checklists);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post('/', async (req, res) => {
    try {
      let { title } = req.body;
      let checklist = await Checklist.create({ title });
      res.status(200).json(checklist);
    } catch (error) {
      res.status(422).json(error);
    }
  })
  .get('/:id', async (req, res) => {
    try {
      let ID = req.params.id;
      let checklist = await Checklist.findById(ID);
      res.status(200).json(checklist);
    } catch (error) {
      res.status(422).json(error);
    }
  })
  .patch('/:id', async (req, res) => {
    try {
      let ID = req.params.id;
      let { title } = req.body;
      let checklist = await Checklist.findByIdAndUpdate(
        ID,
        { title },
        { new: true }
      );
      res.status(200).json(checklist);
    } catch (error) {
      res.status(422).json(error);
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      let ID = req.params.id;
      let checklist = await Checklist.findByIdAndRemove(ID);
      res.status(200).json({ message: `${checklist.title} deleted` });
    } catch (error) {
      res.status(422).json(error);
    }
  });

module.exports = router;
