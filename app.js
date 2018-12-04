const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Joi = require('joi');
const routes = require('./api/routers')

app.use('/api/v1', routes)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({extended:true}));
require('./models/prod')(app);



const port = process.env.PORT || 3000;
const server = app.listen(port, () => { console.log(`Listening on port ${port}...`); });

module.exports = server;

