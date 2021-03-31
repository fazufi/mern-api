const fs = require("fs-extra");
const path = require("path");

const db = require("../db/db.json");
// const html = require("./homePage.html"  )
// const home = require("./homePage")
const filePath = path.join(__dirname, "../db/db.json");

// let home;
// let home = '<p>MERN SERVER</p><li><a href="/:table">req</a>'

exports.postData = (req, res) => {
  let body = db[req.params.table];
  const sorted =
    body &&
    body.sort((a, b) => {
      console.log(a.id, b.id, a.id - b.id);
      return a.id - b.id;
    });
  const c = sorted
    ? sorted[sorted.length - 1]
      ? sorted[sorted.length - 1].id + 1
      : null
    : 1;

  if (body) {
    body.push({ ...req.body, id: c });
  } else {
    body = [{ ...req.body, id: c }];
  }
  console.log("body", body);
  const data = Object.assign(db, { [req.params.table]: body });
  fs.writeJson(filePath, db);
  res.json(data);
};

exports.getData = (req, res) => {
  const rpId = req.params.id;
  const rpTable = req.params.table;
  let vTable = db[rpTable];
  const index = vTable && vTable.findIndex((v) => v.id == rpId);
  // console.log("vtable", db.keys);
  //   for (const [key] of Object.entries(db)) {
  //   home='<p>MERN SERVER</p><li><a href=' + key  +'>'+ key+'</a></li>';
  // console.log("key", key);}

  //   Object.keys(db).forEach((value, index, array)=>{
  //      txt= `<p>MERN SERVER</p><li><a href='${value}'>${value}</a></li>`;
  //      console.log("key", txt);
  //   }
  // )

  const x = Object.keys(db).map((item, i) => {
    return `<li><a href='${item}'>${item}</a></li>`;
  });

  rpTable
    ? vTable == undefined
      ? res.status(500).send(rpTable + " NOT FOUND!!!")
      : rpId
      ? vTable[index] == undefined
        ? res.status(500).send("id " + rpId + " NOT FOUND!!!")
        : res.json(vTable[index])
      : res.json(vTable)
    : x > 1
    ? res.status(500).send("DATA is EMPTY!!!")
    : res.send(x.toString());
};

exports.putData = async (req, res, next) => {
  const rpTable = req.params.table;
  const rpId = req.params.id;
  const vTable = db[rpTable];
  const config = req.body;
  const index = vTable && vTable.findIndex((v) => v.id == rpId);
  console.log("index", index);
  if (index > -1) {
    // vTable[index] = { ...vTable[index], ...config };
    vTable[index] = Object.assign(vTable[index], config);
    await fs.writeJson(filePath, db);
    res.json(vTable);
  } else {
    vTable == undefined
      ? res.status(500).send(rpTable + " NOT FOUND!!!")
      : res.status(500).send("id " + rpId + " NOT FOUND!!!");
  }
};

exports.deleteData = async (req, res, next) => {
  const rpTable = req.params.table;
  let vTable = db[rpTable];
  const index = vTable && vTable.findIndex((v) => v.id == req.params.id);
  if (index > -1) {
    vTable.splice(index, 1);
    const data = Object.assign(db, { [rpTable]: vTable });
    fs.writeJson(filePath, db);
    res.json(data);
  } else {
    vTable == undefined
      ? res.status(500).send(rpTable + " NOT FOUND!!!")
      : res.status(500).send("id " + req.params.id + " NOT FOUND!!!");
  }
};
