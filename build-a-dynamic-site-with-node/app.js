const http = require('http');
const router = require('./router.js');

// create a HTTP web server
http.createServer( (request, response) => {
  router.home(request, response);
  router.user(request, response);
}).listen(8000, 'localhost');
