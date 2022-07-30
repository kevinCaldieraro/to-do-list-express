const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello, Express!</h1>');
});

app.get('/json', (req, res) => {
  res.json({ title: 'Task 1', done: true });
});

app.listen(PORT, () => {
  console.log('server running on port: ' + PORT);
});
