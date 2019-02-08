const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Bill = require('../models/bill');

/* GET main page */



/* GET new bill */

router.get('/new', (req, res, next) => {
  const userId = req.session.currentUser._id
  User.findById(userId)
    .populate('myFriends')
    .then((friends) => {
      const friendsNames = friends.myFriends;
      res.render('bills/new', { friendsNames });
    }).catch(next);
});

/* GET main bill */

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Bill.findById(id)
    .then((bill) => {
      res.render('bills/details', { bill });
    }).catch(next);
});

/* POST new bill */

router.post('/edit', (req, res, next) => {
  const billName = req.body.name;
  const creator = req.session.currentUser.username;
  const keys = Object.keys(req.body).slice(1);
  keys.unshift(creator);
  console.log(keys);
  console.log(creator);
  res.render('bills/editBill', { billName, keys, creator });
});

module.exports = router;
