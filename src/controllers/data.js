const createError = require("http-errors");
const fs = require("fs-extra");
const path = require("path");

const db = require("../db/db.json");
const filePath = path.join(__dirname, "../db/db.json");

exports.postData =  (req, res) => {
  let body = db[req.params.table];
  if (body) {
    body.push(req.body);
  } else {
    body = [req.body];
  }
  console.log("body", body);
  const data = Object.assign(db, { [req.params.table]: body });
  fs.writeJson(filePath, db);
  res.json(data);
};




//   const endpoint = req.params.table;
//   const data = db[endpoint];
//   const config = req.body;
//   const sorted = data.sort((a, b) => {
//     console.log(a.id, b.id, a.id - b.id);
//     return a.id - b.id;
//   });
//   const c = sorted[sorted.length - 1] ? sorted[sorted.length - 1].id + 1 : 1;
//   data.push({ ...config, id: c });
//   await fs.writeJson(filePath, db);
//   res.json(data);
// };


exports.getData = (req, res) => {
  const rpId = req.params.id
  const rpTable = req.params.table
  let table = db[rpTable];
  const index = table && table.findIndex((v) => v.id == rpId);

  table == undefined
    ? res.status(500).send(rpTable + " NOT FOUND!!!")
    : rpId
    ? table[index] == undefined
      ? res.status(500).send("id " + rpId + " NOT FOUND!!!")
      : null
    : null;
  res.json(req.params.id ? table[index] : table);
};

exports.updateData = async (req, res, next) => {
  const endpoint = req.params.data;
  const data = db.data[endpoint];
  const config = req.body;
  req.query;
  const index = data.findIndex((v) => v.id == req.params.id);
  console.log("index", index);
  if (index > -1) {
    data[index] = { ...data[index], ...config };
    // Data[index] = Object.assign(Data[index], data)
    await fs.writeJson(filePath, db);
    res.json("successful");
  } else {
    const err = createError(410, "Data tidak ditemukan!");
    res.status(err.status).json(err.message);
  }
};

exports.deleteData = async (req, res, next) => {
  const payload = db[req.params.table];
  const index = payload.findIndex((v) => v.id == req.params.id);
  if (index > -1) {
    payload.splice(index, 1);
    const data = Object.assign(db, { [req.params.table]: payload });
    fs.writeJson(filePath, db);
    res.json(data);
  }
};




//   const endpoint = req.params.data;
//   const data = db.data[endpoint];
//   const index = data.findIndex((v) => v.id == req.params.id);
//   if (index > -1) {
//     data.splice(index, 1);
//     await fs.writeJson(filePath, db);
//     res.json("successful");
//   } else {
//     const err = createError(410, "Data tidak ditemukan!");
//     res.status(err.status).json(err.message);
//   }
// };
