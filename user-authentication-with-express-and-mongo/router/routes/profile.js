const express = require('express');

const User = require('../../models/user.js');
const requiresLogin = require('../../middleware/requiresLogin.js');

const router = express.Router();

// GET /profile
router.get('/', requiresLogin, (request, response, next) => {
  User
    .findById(request.session.userId)
    .exec((error, user) => {
      const props = {
        title: 'Bookworm | Profile',
        name: user.name,
        favoriteBook: user.favoriteBook,
        currentUser: response.locals.currentUser
      };

      if (error) return next(error);

      return response.render('profile', props);
    });
});

module.exports = router;
