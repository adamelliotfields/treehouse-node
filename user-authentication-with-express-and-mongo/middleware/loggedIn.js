const loggedIn = (request, response, next) => {
  if (request.session && request.session.userId) return response.redirect('/');

  return next();
};

module.exports = loggedIn;
