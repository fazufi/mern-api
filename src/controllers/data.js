const createError = require('http-errors');
const fs = require("fs-extra");
const path = require("path");

let db = require("../db/db.json");

exports.createData = async (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  const config = req.body;
  const sorted = data.sort((a, b) => {
    console.log(a.id, b.id, a.id - b.id);
    return a.id - b.id;
  });
  const c = sorted[sorted.length - 1] ? sorted[sorted.length - 1].id + 1 : 1;
  data.push({ ...config, id: c });
  await fs.writeJson(path.join(__dirname, "../db/db.json"), db);
  res.json(data);
};

exports.readData = (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  res.send(data);
};


exports.updateData = async (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  const config = req.body;
  const index = data.findIndex((v) => v.id == req.params.id);
  console.log("index", index);
  if (index > -1) {
    data[index] = { ...data[index], ...config };
    // Data[index] = Object.assign(Data[index], data)
   await fs.writeJson(path.join(__dirname, "../db/db.json"), db);
    res.json("successful");
  }
  else {
    const err = createError(410, "Data tidak ditemukan!");
    res.status(err.status).json(err.message);
  }
};

exports.deleteData = async (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  const index = data.findIndex((v) => v.id == req.params.id);
  if (index > -1) {
    data.splice(index, 1);
  await  fs.writeJson(path.join(__dirname, "../db/db.json"), db);
    res.json("successful");
  }
  else {
    const err = createError(410, "Data tidak ditemukan!");
    res.status(err.status).json(err.message);
  }
};


