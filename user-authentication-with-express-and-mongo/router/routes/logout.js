const express = require('express');

const router = express.Router();

// GET /logout
router.get('/', (request, response, next) => {
  if (request.session) {
    request.session.destroy((error) => {
      if (error) return next(error);

      return response.redirect('/');
    });
  }
});

module.exports = router;
