const express = require('express');
const Checklist = require('../models/checklist');

const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      let checklists = await Checklist.find({});
      res.status(200).render('checklists/index', { checklists: checklists });
    } catch (error) {
      res
        .status(500)
        .render('pages/error', { error: 'Cannot find checklists' });
    }
  })
  .get('/:id', async (req, res) => {
    try {
      let ID = req.params.id;
      let checklist = await Checklist.findById(ID);
      res
        .status(200)
        .render('checklists/show_checklist', { checklist: checklist });
    } catch (error) {
      res.status(422).render('pages/error', { error: 'Cannot find checklist' });
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
