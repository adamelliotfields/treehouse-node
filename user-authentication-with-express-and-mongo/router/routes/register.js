const express = require('express');

const User = require('../../models/user.js');
const loggedIn = require('../../middleware/loggedIn.js');

const router = express.Router();

// GET /register
router.get('/', loggedIn, (request, response, next) => {
  const props = {
    title: 'Bookworm | Sign Up',
    currentUser: null
  };
  return response.render('register', props);
});

// POST /register
router.post('/', (request, response, next) => {
  // Check that the password confirmation matches the password
  request.checkBody({
    'confirmPassword': {
      matches: {
        options: [request.body.password]
      },
      errorMessage: 'Passwords do not match'
    }
  });

  (async function () {
    // Get the validation results
    const result = await request.getValidationResult();
    // If no results, create the document object
    if (result.isEmpty()) {
      const userData = {
        name: request.body.name,
        email: request.body.email,
        favoriteBook: request.body.favoriteBook,
        password: request.body.password
      };

      try {
        // Create the document
        const user = await User.create(userData);
        // Set the session userId and redirect to the profile page
        request.session.userId = user._id;
        return response.redirect('/profile');
      } catch (error) {
        // Send database error to middleware
        return next(error);
      }
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
