var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/login/github', passport.authenticate('github'));

router.get('/github/return', passport.authenticate('github', { failureRedirect: '/' }), function (request, response) {
  // Redirect to profile page on success
  response.redirect('/profile');
});

router.get('/logout', function (request, response) {
  request.logout();
  response.redirect('/');
});

module.exports = router;
