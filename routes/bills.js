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

router.post('/', (req, res, next) => {
  console.log(req.body);
  // const bill = {
  //   creatorId: req.session.currentUser,
  //   participants: req.body.participants,
  //   items: req.body.items,
  // };
  // Bill.create(bill)
  //   .then(() => {
  //     res.render('bills/details', { bill });
  //   }).catch(next);
});

module.exports = router;
