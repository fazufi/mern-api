const fs = require("fs-extra");
const path = require("path");
let comments = require("../db/db.json");

exports.createComments = (req, res, next) => {
  const data = req.body;
  // const c = comments.length + 1;
  const sorted = comments.sort((a, b) => {
    console.log(a.id, b.id, a.id - b.id)
    return a.id - b.id
  });
  const c = sorted[sorted.length - 1] ? sorted[sorted.length - 1].id + 1 : 1
  comments.push({ ...data, id: c });
  fs.writeJson(path.join(__dirname, "../db/db.json"), comments);
  res.json(comments);
};

exports.getComments = (req, res, next) => {
  res.json(comments);
};

exports.deleteComments = (req, res, next) => {
  const item = comments.findIndex((v) => v.id == req.params.id);
  if (item > -1) {
    comments.splice(item, 1);
    fs.writeJson(path.join(__dirname, "../db/db.json"), comments);
    res.json("successful");
  }
  next();
};

exports.editComments = async (req, res, next) => {
  const data = req.body;
  const index = comments.findIndex((v) => v.id == req.params.id);
  if (index > -1) {
    comments[index] = { ...comments[index], ...data }
    // comments[index] = Object.assign(comments[index], data)
    fs.writeJson(path.join(__dirname, "../db/db.json"), comments)
    res.json("successful");
  }
};
