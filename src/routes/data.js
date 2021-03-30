const express = require("express");

const router = express.Router();
// const { checkAuth } = require("../helpers");
const dataController = require("../controllers/data");


router.post("/:table",  dataController.postData);
router.get(["/", "/:table", "/:table/:id"],  dataController.getData);
router.put("/:table/:id",  dataController.putData);
router.delete("/:table/:id",  dataController.deleteData);

module.exports = router;
