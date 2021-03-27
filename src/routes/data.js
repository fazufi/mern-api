const express = require('express');

const router = express.Router();
const { checkAuth } = require('../helpers')
const dataController= require('../controllers/data')



router.post('/:data', checkAuth, dataController.createData)
router.get('/:data', checkAuth, dataController.readData)
router.put('/:data/:id', checkAuth, dataController.updateData)
router.delete('/:data/:id', checkAuth, dataController.deleteData)



module.exports= router