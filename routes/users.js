const express = require('express');
const router = express.Router();
const {User, Comment, validateUser, validateComment } = require('../models/user');

////////////////////////GET ALL COMMENTS ////////////////////////
router.get('/', async (req, res) => {
    try {
       const comments = await Comment.find();
       return res.send(comments);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });


module.exports = router;