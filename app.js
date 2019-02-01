const express = require('express');

const app = express();
const config = require('config');

require('./server/routes/routes')(app);
require('./server/models/prod')(app);

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

if (!config.get('dbPrivateKey')) {
  console.error('FATAL ERROR: dbPrivateKey is not defined');
  process.exit(1);
}

const port = process.env.PORT || 3000;
const server = app.listen(port, () => { console.log(`Listening on port ${port}...`); });

module.exports = server;
