const express = require("express");

const router = express.Router();
const { checkAuth } = require("../helpers");
const dataController = require("../controllers/data");

table = ["/:table", "/:table/:id"];

router.post('/:table', checkAuth, dataController.postData)

router.get(table, checkAuth, dataController.getData);




// router.put('/:data/:id/:a', checkAuth, dataController.updateData)
router.delete('/:data/:id', checkAuth, dataController.deleteData)

module.exports = router;
