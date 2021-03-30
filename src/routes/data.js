const express = require("express");

const router = express.Router();
const { checkAuth } = require("../helpers");
const dataController = require("../controllers/data");

const table = ["/:table", "/:table/:id"];

router.post("/:table", checkAuth, dataController.postData);
router.get(table, checkAuth, dataController.getData);
router.put("/:table/:id", checkAuth, dataController.putData);
router.delete("/:table/:id", checkAuth, dataController.deleteData);

module.exports = router;
