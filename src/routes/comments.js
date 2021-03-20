const express = require('express');

const router = express.Router();
const commentsController= require('../controllers/comments')


router.post('/comment', commentsController.createComments)
router.use('/comments', commentsController.getComments)

module.exports= router