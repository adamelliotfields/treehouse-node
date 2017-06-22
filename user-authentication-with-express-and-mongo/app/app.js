const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const parser = require('body-parser');
const validator = require('express-validator');
const session = require('express-session');
const ReactViews = require('express-react-views');
const MongoStore = require('connect-mongo')(session);

const router = require('../router/index.js');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/treehouse');

const db = mongoose.connection;

// Standard Mongoose connection error
db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
  console.log('Database:', { name: db.name, host: db.host, port: db.port });
});

// Create view engine
app.engine('jsx', ReactViews.createEngine());

// Set view engine and views path
app.set('view engine', 'jsx');
app.set('views', path.resolve(__dirname, '..', 'views'));

// Logger
app.use(morgan('dev'));

// Store session data in MongoDB sessions collection
app.use(session({
  secret: 'may the force be with you',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Make session userId available on all responses
app.use((request, response, next) => {
  response.locals.currentUser = request.session.userId;
  next();
});

// Parse request bodies (set extended to true if you need to parse nested data structures)
app.use(parser.urlencoded({ extended: false }));

// Adds the checkBody method to request bodies
app.use(validator());

// Router
app.use('/', router);

// Static assets
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// Error handling
app.use((request, response, next) => {
  const error = new Error('File not found.');
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.render('error', { message: error.message });
});

module.exports = app;
