const fs = require("fs-extra");
const path = require("path");
let db = require("../db/db.json");

exports.createData = (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  const config = req.body;
  const sorted = data.sort((a, b) => {
    console.log(a.id, b.id, a.id - b.id);
    return a.id - b.id;
  });
  const c = sorted[sorted.length - 1] ? sorted[sorted.length - 1].id + 1 : 1;
  data.push({ ...config, id: c });
  fs.writeJson(path.join(__dirname, "../db/db.json"), db);
  res.json(data);
};

exports.getData = (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  res.send(data);
};

exports.deleteData = (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  const index = data.findIndex((v) => v.id == req.params.id);
  if (index > -1) {
    data.splice(index, 1);
    fs.writeJson(path.join(__dirname, "../db/db.json"), db);
    res.json("successful");
  }
};

exports.editData = async (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  const config = req.body;
  const index = data.findIndex((v) => v.id == req.params.id);
  if (index > -1) {
    data[index] = { ...data[index], ...config };
    // Data[index] = Object.assign(Data[index], data)
    fs.writeJson(path.join(__dirname, "../db/db.json"), db);
    res.json("successful");
  }
};
