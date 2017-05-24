const https = require('https');
const http = require('http');

// Paste your darksky.net/dev API key here
const api = {
  key: ''
};

const printWeather = (weather) => {
  console.log(`It is currently: ${weather.currently.apparentTemperature} degrees.`);
  console.log(weather.daily.summary);
};

const printError = (error) => {
  console.error(error.message);
};

const get = (query) => {
  try {
    const request = https.get(`https://api.darksky.net/forecast/${api.key}/${query}`, (response) => {
      if (response.statusCode === 200) {
        let body ='';
        response.on('data', (data) => {
          body += data.toString();
        });
        response.on('end', () => {
          try {
            const weather = JSON.parse(body);
            if (weather.latitude && weather.longitude) {
              printWeather(weather);
            } else {
              const queryError = new Error(`The location "${query}" was not found.`);
            }
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const statusCodeError = new Error(`There was an error getting the message for ${query}. (${http.STATUS_CODES[response.statusCode]})`);
        printError(statusCodeError);
      }
    });
  } catch (error) {
    printError(error);
  }
};

const query = process.argv.slice(2);

//Needham, MA 42.304087,-71.229972
get(query);
