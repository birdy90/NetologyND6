const http = require('http');
const utils = require('./utils');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    utils.readTemplate('./templates/chat.html')
      .then((data) => {
        res.write(data);
        res.end();
      });
  } else {
    res.statusCode  = 404;
    res.write('not found');
    res.end();
  }
});

server.listen(3000);