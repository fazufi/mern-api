const fs = require("fs-extra");
const path = require("path");
let comments = require("../db/db.json");

exports.createComments = (req, res, next) => {
  const data = req.body;
  const c = comments.length + 1;
  comments.push({ ...data, id: c });
  fs.writeJson(path.join(__dirname, "../db/db.json"), comments);
  res.json(comments);

  next();
};

exports.getComments = (req, res, next) => {
  res.json(comments);
  next();
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
  const c = comments.length + 1;

  const item = comments.findIndex((v) => v.id == req.params.id);
  if (item > -1) {
    // item.updateTo(data)
    await comments.splice(item, 1);
    comments.push({ ...data, id:c  });
    fs.writeJson(path.join(__dirname, "../db/db.json"), comments);
    res.json("successful");
  }
};
