const express = require('express');

const router = express.Router();
const commentsController= require('../controllers/comments')


router.post('/comments', commentsController.createComments)
router.get('/comments', commentsController.getComments)

module.exports= router