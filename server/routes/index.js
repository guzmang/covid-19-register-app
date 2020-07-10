const express = require('express');

const app = express();

app.use(require('./person'));

module.exports = app;