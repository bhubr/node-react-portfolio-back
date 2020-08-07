require('dotenv').config();
const express = require('express');
const debug = require('debug');

const app = express();
const log = debug('express');

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if (err) {
    log(err);
  } else {
    log(`Server listening on ${port}`);
  }
});
