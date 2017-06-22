const requiresLogin = (request, response, next) => {
  if (request.session && request.session.userId) return next();

  const error = new Error('You must be logged in to view this page.');
  error.status = 401;
  return next(error);
};

module.exports = requiresLogin;
