const express = require('express');
const User = require('../models/user');
const Bill = require('../models/bill');
const isEmpty = require('../helpers/helpers');

const router = express.Router();

/* GET home page. */

router.get('/', (req, res, next) => {
  const session = req.session.currentUser;
  Bill.find({ creatorId: session._id }).sort({ date: -1 }).limit(2)
    .then((bills) => {
      if (isEmpty(bills)) {
        res.render('main-empty');
        return;
      }
      if (bills.length === 1) {
        const dates = [
          new Date(bills[0].createdAt).toDateString(),
        ];
        res.render('main-one-bill', { bills, dates });
      } else {
        const dates = [
          new Date(bills[0].createdAt).toDateString(),
          new Date(bills[1].createdAt).toDateString(),
        ];
        res.render('main', { bills, dates });
      }
    })
    .catch(next);
});

module.exports = router;
