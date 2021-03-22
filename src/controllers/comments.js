const fs =  require('fs-extra')
const path = require('path')
let comments = require('../db/db.json')

exports.createComments = (req, res, next)=>{  
  console.log(req.body)
    comments.push(req.body)
    fs.writeJson(path.join(__dirname, '../db/db.json'), comments)
    res.json(comments)
  
  next();
};

exports.getComments = (req, res, next)=>{  
 
  res.json(comments)
  next()
}