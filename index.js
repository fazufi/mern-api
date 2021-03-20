const express = require('express');

const app = express()
const commentsRouter = require('./src/routes/comments')

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
})


app.use('/', commentsRouter);
app.listen(4000);
