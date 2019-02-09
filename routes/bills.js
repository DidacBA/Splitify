const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Bill = require('../models/bill');

/* GET main page */

/* GET items bill */

router.get('/items', (req, res, next) => {
  res.render('bills/items');
});

/* POST items bill */

router.post('/', (req, res, next) => {
  const creator = req.session.currentUser._id;
  const names = req.body.name;
  const prices = req.body.price;
  const billItems = [];

  names.forEach((name, index) => {
    const item = {
      name: names[index],
      price: prices[index],
    };
    billItems.push(item);
  });

  const bill = {
    creatorId: creator,
    items: billItems,
  };

  User.findById(creator)
    .populate('myFriends')
    .then((friends) => {
      const friendsNames = friends.myFriends;

      Bill.create(bill)
        .then((bill) => {
          req.session.newBill = bill;
          res.render('bills/participants', { friendsNames });
        })
        .catch(next);
    })
    .catch(next);
});

router.post('/participants', (req,res,next) => {
  const participants = Object.keys(req.body);
  const billId = req.session.newBill._id;
  participants.forEach((participant) => {
    User.findOne({ username: participant })
      .then((participant) => {
        console.log(participant);
      })
      .catch(next);
  });
});

/* GET main bill */

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Bill.findById(id)
    .then((bill) => {
      res.render('bills/details', { bill });
    }).catch(next);
});


module.exports = router;
