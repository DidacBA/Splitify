const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Bill = require('../models/bill');

/* GET main page */


/* GET new bill */

router.get('/new', (req, res, next) => {
  res.render('/bills/newBill');
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
  const bill = {
    creatorId: req.session.currentUser,
    participants: req.body.participants,
    items: req.body.items,
  };
  Bill.create(bill)
    .then(() => {
      res.render('bills/details', { bill });
    }).catch(next);
});

module.exports = router;
