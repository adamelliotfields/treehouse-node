const express = require('express');

const User = require('../../models/user.js');
const loggedIn = require('../../middleware/loggedIn.js');

const router = express.Router();

// GET /login
router.get('/', loggedIn, (request, response, next) => {
  const props = {
    title: 'Bookworm | Log In',
    currentUser: response.locals.currentUser
  };
  return response.render('login', props);
});

// POST /login
router.post('/', (request, response, next) => {
  // Check that both fields have been filled out
  request.checkBody({
    'email': {
      notEmpty: true,
      errorMessage: 'Please enter your email address.'
    },
    'password': {
      notEmpty: true,
      errorMessage: 'Please enter your password.'
    }
  });

  (async function () {
    // Get the validation results
    const result = await request.getValidationResult();
    // If no results, authenticate the email and password
    if (result.isEmpty()) {
      User.authenticate(request.body.email, request.body.password, (error, user) => {
        // If authentication error or the user doesn't exist, send to middleware
        if (error || !user) {
          const error = new Error('Incorrect email or password.');
          error.status = 401;
          return next(error);
          // Set the session ID to the user's ID and redirect to the user's profile page
        } else {
          request.session.userId = user._id;
          return response.redirect('/profile');
        }
      });
    } else {
      // Convert errors to an array
      const messages = result.array();
      // Get the first error message and set status code to 400
      const error = new Error(messages[0].msg);
      error.status = 400;
      // Send error message to middleware
      return next(error);
    }
  }());
});

module.exports = router;
