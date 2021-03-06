const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
require('dotenv').config();

const protectedView = require('./middlewares/protectedView');
const notifications = require('./middlewares/flash');

// Set up mongoose and Mongo connection

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then()
  .catch();

// Connect routers

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const billsRouter = require('./routes/bills');

const app = express();

// Set up user session

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(flash());

app.use(notifications);

// Set up current user middleware. Makes the currentUser available in every page

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express layouts setup
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Routes setup

app.use('/', authRouter);
app.use('/', protectedView, indexRouter);
app.use('/profile', protectedView, profileRouter);
app.use('/bills', protectedView, billsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Heroku comment

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
