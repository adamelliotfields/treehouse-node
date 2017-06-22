const express = require('express');

const router = express.Router();

// GET /contact
router.get('/', (request, response, next) => {
  const props = {
    title: 'Bookworm | Contact',
    currentUser: response.locals.currentUser
  };
  return response.render('contact', props);
});

module.exports = router;
