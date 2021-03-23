const express = require('express');

const router = express.Router();
const commentsController= require('../controllers/comments')


router.post('/comments', commentsController.createComments)
router.get('/comments', commentsController.getComments)
router.delete('/comments/:id', commentsController.deleteComments)
router.put('/comments/:id', commentsController.editComments)



module.exports= router