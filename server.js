const express = require('express')

const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')))

app.listen(5000, () => {
  console.log('Magic happens now at port 5000')
})
