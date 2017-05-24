const https = require('https');
const http = require('http');

const printError = (error) => {
  console.error(error.message);
};

const printMessage = (username, badgeCount, points) => {
  const message = `${username} has ${badgeCount} total badges and ${points} points in JavaScript`;
  console.log(message);
};

const get = (username) => {
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
      if (response.statusCode === 200) {
        let body = '';
        response.on('data', (data) => {
          body += data.toString();
        });
        response.on('end', () => {
          try {
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error (message);
        printError(statusCodeError);
      }
    });
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
};

const users = process.argv.slice(2);

users.forEach(get);
