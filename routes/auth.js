const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// BCrypt to encrypt passwords
const bcryptSalt = 10;

// GET signup page

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

// POST signup/create new user

router.post('/signup', (req, res, next) => {
  const {
    username,
    password,
    email,
  } = req.body;

  if (username === '' || password === '') {
    req.flash('warning', 'Empty fields');
    res.redirect('/signup');
  }
  if (username.length < 6 || username.length > 16) {
    req.flash('warning', 'Username must be between 6 and 16 characters');
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
          })
            .then(() => {
              res.redirect('/');
            })
            .catch(next);
        } else {
          req.flash('warning', 'Username or email already in use');
          res.redirect('/signup');
        }
      })
      .catch(next);
  }
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
