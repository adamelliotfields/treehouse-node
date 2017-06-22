const express = require('express');

const router = express.Router();

// GET /about
router.get('/', (request, response, next) => {
  const props = {
    title: 'Bookworm | About',
    currentUser: response.locals.currentUser
  };
  return response.render('about', props);
});

module.exports = router;
