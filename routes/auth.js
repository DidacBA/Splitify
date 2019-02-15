const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const transporter = require('../config/transporter');
const verifyMessage = require('../config/verifyMail');

const passwordControl = require('../middlewares/passwordControl');

const router = express.Router();

// BCrypt to encrypt passwords
const bcryptSalt = 10;

// GET signup page

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

// POST signup/create new user

router.post('/signup', passwordControl, (req, res, next) => {
  const {
    username,
    password,
    email,
    confirmationCode,
  } = req.body;

  const confirmationURL = `http://splitify.herokuapp.com/confirm/${confirmationCode}`;

  if (username === '' || password === '') {
    req.flash('warning', 'Empty fields');
    res.redirect('/signup');
  } else if (username.length < 4 || username.length > 16) {
    req.flash('warning', 'Username must be between 4 and 16 characters');
    res.redirect('/signup');
  } else {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);
          User.create({
            username,
            password: hashPass,
            email,
            confirmationCode,
          })
            .then(() => {
              console.log('I am in then');
              transporter.sendMail({
                from: '"Splitify Team" <splitifyWebApp@gmail.com>',
                to: email,
                subject: `Welcome to Splitify, ${username}`,
                text: 'Please click on the following url to confirm your account',
                html: verifyMessage(confirmationURL),
              })
                .then(() => {
                  req.flash('success', 'Account created. You will soon receive a confirmation email');
                  res.redirect('/');
                })
                .catch(error => console.log(error));
              
            })
            .catch(() => {
              req.flash('warning', 'Username or email already in use');
              res.redirect('/signup');
            });
        }
      })
      .catch(next);
  }
});

// GET account confirmation

router.get('/confirm/:confirmCode', (req, res, next) => {
  const confirmation = req.params.confirmCode;
  User.findOneAndUpdate({ confirmationCode: confirmation }, { status: true })
    .then(res.render('auth/login'))
    .catch(next);
});

// GET login page

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

// POST insert login data from user

router.post('/login', (req, res, next) => {
  const {
    username,
    password,
  } = req.body;

  if (username === '' || password === '') {
    req.flash('warning', 'Indicate a username and a password to sign up');
    res.redirect('/login');
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        req.flash('error', 'The username doesn\'t exist');
        res.redirect('/login');
        return;
      }
      if (user.status === false) {
        req.flash('error', 'Account is not active. Please check your email');
        res.redirect('/login');
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        req.flash('error', 'Incorrect password or username');
        res.redirect('/login');
      }
    })
    .catch(next);
});

// GET logout from session

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    // cannot access session here
    res.redirect('login');
  });
});

module.exports = router;
