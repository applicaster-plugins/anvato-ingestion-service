const express = require('express');
const app = express();
const routes = require('./routes')();

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use('/', routes);

module.exports = app;
