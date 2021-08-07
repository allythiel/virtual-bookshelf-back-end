const express = require('express');
const router = express.Router();
const {User, Comment, validateUser, validateComment } = require('../models/user');

 ////////////////////////GET ALL USERS ////////////////////////
 router.get('/', async (req, res) => {
    try {
       const users = await User.find();
       return res.send(users);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });

 ////////////////////////GET USERS BY ID ////////////////////////
 router.get('/:id', async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
       if (!user)
          return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
       return res.send(user);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });


  //////////////////////// POST NEW USER ////////////////////////
 router.post('/', async (req, res) => {
    try {
       // VALIDATION REQUIRED
    //    const { error } = validateUser(req.body);
    //    if (error)
    //       return res.status(400).send(error);
 
       let user = await User.findOne({ email: req.body.email });
       if (user) return res.status(400).send('User already registered.');
 
       user = new User({
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
       });
       await user.save();
       return res.send(user);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });

  //////////////////////// VALIDATE USER LOGIN ////////////////////////
  router.post('/login', async (req, res) => {
    try {
        // const { error } = validateUser(req.body);
        // if (error)
        //    return res.status(400).send(error);
 
       let user = await User.findOne({ email: req.body.email });
       if (!user) return res.status(400).send('User does not exist.');
 
       return res.send(user);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });



////////////////////////GET ALL COMMENTS ////////////////////////
router.get('/:userId/:comments', async (req, res) => {
    try {
       const comments = await Comment.find();
       return res.send(comments);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });


 ////////////////////////GET COMMENTS BY BOOK ID ////////////////////////
 router.get('/:userId/:comments/:bookId', async (req, res) => {
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


 ////////////////////////POST NEW COMMENT ////////////////////////
 router.post('/:userId/:comments', async (req, res) => {
    try {
       // VALIDATION REQUIRED
       const { error } = validateComment(req.body);
       if (error)
          return res.status(400).send(error);
 
       const comment = new Comment({
          text: req.body.text,
          author: req.body.author,
          bookId: req.body.bookId,
       });
       await comment.save();
       return res.send(comment);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });


module.exports = router;