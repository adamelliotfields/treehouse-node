process.env.IP = 'localhost';
process.env.PORT = '8080';
const IP = process.env.IP;
const PORT = process.env.PORT;

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/treehouse');

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('Error:', error);
});

db.once('open', () => {
  console.log('Connected to database...');
});

app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, COntent-Type, Accept');
  if (request.method === 'Options') {
    response.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
    return response.status(200).json({});
  }
  next();
});

app.use('/questions', routes);

// Catch 404 and forward to error handler
app.use((request, response, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers always have 4 parameters
app.use((err, request, response, next) => {
  response.status(err.status || 500);
  response.json({ error: { message: err.message } });
});

app.listen(PORT, IP, () => {
  console.log(`Server listening on http://${IP}:${PORT}`);
});

process.on('SIGINT', () => {
  http.createServer(app)
    .close(() => {
      console.log('\n' + 'Shutting down...');
      process.exit(0);
    });
});
