const mongodb = require('mongodb');
const express = require('express');
const User = require('../models/user');
const Bill = require('../models/bill');

const router = express.Router();

/* GET name bill */

router.get('/name', (req, res, next) => {
  res.render('bills/billName');
});

router.post('/name', (req, res, next) => {
  const billName = req.body;
  req.session.billName = billName;
  res.render('bills/items');
});

/* POST items bill */

router.post('/', (req, res, next) => {
  const creator = req.session.currentUser._id;
  const names = req.body.name;
  const prices = req.body.price;
  const billName = Object.values(req.session.billName);
  const billItems = [];

  names.forEach((name, index) => {
    const item = {
      name: names[index],
      price: prices[index],
    };
    billItems.push(item);
  });

  const bill = {
    name: billName,
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

/* POST Set bill participants */

router.post('/participants', (req, res, next) => {
  const participants = Object.keys(req.body);
  participants.unshift(req.session.currentUser.username);
  const billId = req.session.newBill._id;
  Bill.findByIdAndUpdate(billId, { participants })
    .then((bill) => {
      const { items } = bill;
      res.render('bills/setBill', { participants, items });
    })
    .catch(next);
});

/* POST Create final bill */

router.post('/setBill', (req, res, next) => {
  const itemPayers = Object.values(req.body);

  const UpdatedItems = [];
  const billItems = req.session.newBill.items;

  billItems.forEach((item, index) => {
    item.username = itemPayers[index];
    UpdatedItems.push(item);
  });

  const billId = req.session.newBill._id;
  Bill.findByIdAndUpdate(billId, { items: UpdatedItems })
    .then(() => {
      res.redirect('/bills/list');
      req.flash('success', 'You have created a new bill');
    })
    .catch(next);
});

/* GET list of bills */

router.get('/list', (req, res, next) => {
  const userName = req.session.currentUser.username;
  Bill.find({ participants: userName })
    .then((bills) => {
      res.render('bills/list', { bills });
    })
    .catch(next);
});

/* GET bill details */

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const userName = req.session.currentUser.username;
  if (mongodb.ObjectId.isValid(id)) {
    Bill.findById(id)
      .then((bill) => {
        res.render('bills/details', { bill, userName });
      }).catch(next);
  } else {
    req.flash('error', 'Bill doesn\'t exist');
    res.redirect('/bills');
  }
});

/* POST settle bill */

router.post('/:id/settle', (req, res, next) => {
  const billId = Object.values(req.params);
  Bill.findByIdAndUpdate(billId, { active: false })
    .then(() => {
      req.flash('success', 'You have succesfully settled the bill');
      res.redirect('/bills/list');
    })
    .catch(next);
});

module.exports = router;
