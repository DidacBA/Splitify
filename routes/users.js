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

module.exports = router;
