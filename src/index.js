require('dotenv').config();
const express = require('express');
const debug = require('debug');
const api = require('./routes');

const log = debug('express');

const app = express();
app.use(express.json());
app.use('/api', api);

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if (err) {
    log(err);
  } else {
    log(`Server listening on ${port}`);
  }
});
