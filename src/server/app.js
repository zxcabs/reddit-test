const express = require('express');
const apiRoute = require('./api.route');
const app = express();

app.use(express.static('./build'));

app.use('/api', apiRoute);

module.exports = app;
