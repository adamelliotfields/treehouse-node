const EventEmitter = require('events');
const https = require('https');
const http = require('http');
const util = require('util');

util.inherits(Profile, EventEmitter);

function Profile(username) {
  // connect to the Treehouse API
  const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
    let body = '';
    if (response.statusCode !== 200) {
      request.abort();
      // throw Status Code error
      this.emit('error', new Error(`There was an error getting the profile for ${username}. (${http.STATUS_CODES[response.statusCode]})`));
    }
    // read the data
    response.on('data', (chunk) => {
      body += chunk;
      this.emit('data', chunk);
    });
    response.on('end', () => {
      if (response.statusCode === 200) {
        try {
          // parse the data
          const profile = JSON.parse(body);
          this.emit('end', profile);
        } catch (error) {
          this.emit('error', error);
        }
      }
    }).on('error', (error) => {
      this.emit('error', error);
    });
  });
}

module.exports = Profile;
