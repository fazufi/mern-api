const fs =  require('fs-extra')
const path = require('path')
let comments = require('../db/db.json')

exports.createComments = (req, res, next)=>{  
  console.log("iki", req.body.id)
  const {id}= req.params
    comments.push(req.body, id)
    fs.writeJson(path.join(__dirname, '../db/db.json'), comments)
    res.json(comments)
  
  next();
};

exports.getComments = (req, res, next)=>{  
 
  res.json(comments)
  next()
}

exports.deleteComments =  (req, res, next) => {
  const index = comments.findIndex(v => v.id == req.params.id)
  if (index > -1) {
    comments.splice(index, 1)
    fs.writeJson(path.join(__dirname, '../db/db.json'), comments)
    res.json("successful")
  
}}