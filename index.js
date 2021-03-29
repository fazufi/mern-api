const express = require('express');

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 3006
const dataRouter = require('./src/routes/data')
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', dataRouter);
app.listen(PORT, () => {
  console.log(`Server Express sedang berjalan di http://localhost:${PORT}`)
})
