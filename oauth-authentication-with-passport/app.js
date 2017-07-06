require('dotenv').config();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var User = require('./models/user');
var routes = require('./routes/index');
var auth = require('./routes/auth');

// Configure GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/github/return'
}, function (accessToken, refreshToken, profile, done) {
  if (profile.emails[0]) {
    User.findOneAndUpdate({
      email: profile.emails[0].value
    },
    {
      name: profile.displayName || profile.username,
      email: profile.emails[0].value,
      photo: profile.photos[0].value
    },
    {
      upsert: true
    },
    done);
  } else {
    var noEmailError = new Error('Your email privacy settings are preventing you from signing in.');
    done(noEmailError, null);
  }
}));

/*!
  In order for Passport to handle sessions, you need to invoke the
  serializeUser and deserializeUser methods.
*/

// Serialize a session for storage
passport.serializeUser(function (user, done) {
  // done takes two arguments - error, and what you want to store in the session
  done(null, user._id);
});

// Deserialize stored session
passport.deserializeUser(function (userId, done) {
  User.findById(userId, function (error, user) {
    // done's parameters are the same as Mongo's - error, and the document returned
    done(error, user);
  });
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// mongodb connection
mongoose.connect('mongodb://localhost:27017/bookworm-oauth');
var db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// Session config for Passport and MongoDB
var sessionOptions = {
  secret: 'may the force be with you',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
};

app.use(session(sessionOptions));

// Initialize Passport
app.use(passport.initialize());

// Restore session if user was previously signed in
app.use(passport.session());

app.use('/', routes);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
