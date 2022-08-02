const path = require('path');
const express = require('express');
const rootRouter = require('./src/routes/index');
const checklistRouter = require('./src/routes/checklist');
require('./config/database');

const PORT = 3000;
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checklistRouter);

app.listen(PORT, () => {
  console.log('server running on port: ' + PORT);
});
