const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Bill = require('../models/bill');

/* GET main page */



/* GET new bill */

router.get('/new', (req, res, next) => {
  res.render('bills/new');
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
  const creator = req.session.currentUser._id;
  const names = req.body.name;
  const prices = req.body.price;
  console.log(req.session);
  const billItems = [];
  names.forEach((name, index) => {
    const item = {
      name: names[index],
      price: prices[index],
    }
    billItems.push(item);
  });
  console.log(billItems);
  const bill = {
    creatorId: creator,
    items: billItems,
  }
  Bill.create(bill)
    .then(() => {
      res.render('bills/editBill');
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  console.log(req.body);
})

module.exports = router;
