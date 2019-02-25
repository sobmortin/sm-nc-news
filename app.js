const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const {
  handle404, handle400, handle500,
} = require('./errors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use(handle404);
app.use(handle400);
app.use(handle500);

module.exports = app;
