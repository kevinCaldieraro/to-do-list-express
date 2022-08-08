const express = require('express');
const Checklist = require('../models/checklist');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const checklists = await Checklist.find({});
      res.status(200).render('checklists/index', { checklists: checklists });
    } catch (error) {
      res
        .status(500)
        .render('pages/error', { error: 'Cannot find checklists' });
    }
  })
  .get('/new', async (req, res) => {
    try {
      const checklist = new Checklist();
      res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Cannot load form' });
    }
  })
  .get('/:id/edit', async (req, res) => {
    try {
      const ID = req.params.id;
      const checklist = await Checklist.findById(ID);
      res.status(200).render('checklists/edit', { checklist: checklist });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Edit page not found' });
    }
  })
  .post('/', async (req, res) => {
    const { title } = req.body.checklist;
    const checklist = new Checklist({ title });
    try {
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
      const ID = req.params.id;
      const checklist = await Checklist.findById(ID);
      res
        .status(200)
        .render('checklists/show_checklist', { checklist: checklist });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Cannot find checklist' });
    }
  })
  .patch('/:id', async (req, res) => {
    const ID = req.params.id;
    const { title } = req.body.checklist;
    const checklist = await Checklist.findById(ID);
    try {
      await checklist.updateOne({ title });
      res.redirect('/checklists');
    } catch (error) {
      const errors = error.errors;
      res
        .status(422)
        .render('checklists/edit', { checklist: { ...checklist, errors } });
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const ID = req.params.id;
      await Checklist.findByIdAndRemove(ID);
      res.redirect('/checklists');
    } catch (error) {
      res
        .status(422)
        .render('pages/error', { error: 'Cannot possible remove checklist' });
    }
  });

module.exports = router;
