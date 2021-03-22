const express = require('express');

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const commentsRouter = require('./src/routes/comments')
app.use(cors())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', commentsRouter);
app.listen(4000);
