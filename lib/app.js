const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/v1', require('./routes/sessions'));
app.use('/api/v1', require('./routes/settings'));
app.use('/api/v1', require('./routes/achievements'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
