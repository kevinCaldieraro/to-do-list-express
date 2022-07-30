const express = require('express');

const router = express.Router();

router
  .get('/', (req, res) => {
    console.log('Hello');
    res.send();
  })
  .post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body);
  })
  .get('/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`ID: ${req.params.id}`);
  });

module.exports = router;
