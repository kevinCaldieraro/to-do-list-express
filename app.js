const express = require('express');
const checklistRouter = require('./src/routes/checklist');
require('./config/database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/checklists', checklistRouter);

app.listen(PORT, () => {
  console.log('server running on port: ' + PORT);
});
