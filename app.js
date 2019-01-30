const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const { handle404, handle400 } = require('./errors');

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use(handle404);
app.use(handle400);

module.exports = app;
