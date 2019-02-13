const express = require('express');
const User = require('../models/user');
const Bill = require('../models/bill');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const session = req.session.currentUser;
  Bill.find({ creatorId: session._id }).sort({ date: -1 }).limit(2)
    .then((bills) => {
      const bill1Date = new Date(bills[0].createdAt).toDateString();
      const bill2Date = new Date(bills[1].createdAt).toDateString();
      res.render('main', { bills, bill1Date, bill2Date });
    })
    .catch(next);
});

module.exports = router;
