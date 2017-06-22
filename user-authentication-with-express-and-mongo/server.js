const http = require('http');

const app = require('./app/app.js');

const server = http.createServer(app);

server.listen({ host: '127.0.0.1', port: 8080 }, () => {
  console.log('Server:', { name: 'express', host: server.address().address, port: server.address().port });
});
