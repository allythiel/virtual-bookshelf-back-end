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

 ////////////////////////GET COMMENTS BY BOOK ID ////////////////////////
 router.get('/:bookId', async (req, res) => {
    try {
       const comment = await Comment.find({ bookId: req.params.bookId });
       console.log(comment);
       if (!comment)
          return res.status(400).send(`The comment with id "${req.params.bookId}" d
    oes not exist.`);
       return res.send(comment);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });



module.exports = router;