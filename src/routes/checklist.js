const express = require('express');
const checklist = require('../models/checklist');
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
  .get('/new', async (req, res) => {
    try {
      let checklist = new Checklist();
      res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Cannot load form' });
    }
  })
  .post('/', async (req, res) => {
    try {
      let { title } = req.body.checklist;
      let checklist = new Checklist({ title });
      checklist.save();
      res.redirect('/checklists');
    } catch (error) {
      res
        .status(422)
        .render('checklists/new', { checklist: { ...checklist, error } });
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
      res.status(500).render('pages/error', { error: 'Cannot find checklist' });
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
