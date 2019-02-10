const express = require('express');
const User = require('../models/user');

const router = express.Router();

/* GET Profile page */

router.get('/profile', (req, res, next) => {
  const session = req.session.currentUser;

  User.findById(session._id)
    .populate('myFriends')
    .then((friends) => {
      const friendsNames = friends.myFriends;
      res.render('profile', { session, friendsNames });
    })
    .catch(next);
});

/* POST Add friend page */

router.post('/profile/search', (req, res, next) => {
  const searchField = req.body.search;
  User.find({ "username" : searchField })
    .then((user) => {
      res.render('search', { user });
    })
    .catch(next);
});

/* POST Add friend to friend list */

router.post('/profile', (req, res, next) => {
  const friendId = req.body.id;
  const userName = req.session.currentUser.username;
  User.findOneAndUpdate({ 'username': userName }, { '$push': { 'myFriends': friendId } })
    .populate('myFriends')
    .then((user) => {
      console.log(user);
      res.redirect('profile');
    })
    .catch(next);
});

module.exports = router;
