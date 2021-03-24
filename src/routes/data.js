const express = require('express');

const router = express.Router();
const dataController= require('../controllers/data')


router.post('/:data', dataController.createData)
router.get('/:data', dataController.getData)
router.delete('/:data/:id', dataController.deleteData)
router.put('/:data/:id', dataController.editData)



module.exports= router