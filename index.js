const express = require('express')

const app = express()

const port = process.env.PORT || 8000
app.listen(port, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Server listening on ${port}`)
  }
})