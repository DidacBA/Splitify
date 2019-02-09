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
  User.find({"username" : searchField})
    .then((user) => {
      res.render('search', { user });
    })
    .catch(next);
});

/* POST Add friend to friend list */

router.post('/profile', (req, res, next) => {
  const friendId = req.body.id;
  const userId = req.session.currentUser._id;

  User.findById(userId)
    .then((user) => {
      const updatedFriends = user.myFriends;
      updatedFriends.push(friendId);

      User.findByIdAndUpdate(userId, { 'myfriends': updatedFriends })
        .then((user) => {
          console.log(user)
          res.redirect('profile');
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
