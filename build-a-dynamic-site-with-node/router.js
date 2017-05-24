const Profile = require('./profile.js');
const render = require('./render.js');
const querystring = require('querystring');
const header = {'Content-Type': 'text/html'};

// handle HTTP GET and POST routes
const home = (request, response) => {
  if (request.url === '/') {
    // if GET
    if (request.method.toLowerCase() === 'get') {
      response.writeHead(200, header);
      render.view('header', {}, response);
      render.view('search', {}, response);
      render.view('footer', {}, response);
      response.end();
    } else {
      // if POST
      request.on('data', (post) => {
        const query = querystring.parse(post.toString());
        response.writeHead(303, {'Location': `/${query.username}`});
        response.end();
      });
    }
  }
};

// handle HTTP GET routes
const user = (request, response) => {
  const username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, header);
    render.view('header', {}, response);
    // get JSON from Treehouse
    let student = new Profile(username);
    // show profile
    student.on('end', (json) => {
      // store values in an object
      let values = {
        avatar: json.gravatar_url,
        username: json.profile_name,
        badges: json.badges.length,
        javascript: json.points.JavaScript
      };
      // write response
      render.view('profile', values, response);
      render.view('footer', {}, response);
      response.end();
    });
    // write error message
    student.on('error', (error) => {
      render.view('error', {errorMessage: error.message}, response);
      render.view('search', {}, response);
      render.view('footer', {}, response);
      response.end();
    });
  }
};

module.exports.home = home;
module.exports.user = user;
