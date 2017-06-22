const express = require('express');

const router = express.Router();

// GET /
router.get('/', (request, response, next) => {
  const props = {
    title: 'Bookworm | Home',
    currentUser: response.locals.currentUser
  };
  return response.render('index', props);
});

module.exports = router;
