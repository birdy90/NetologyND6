let http = require('http');
let router = require('./router');

let serverPort = process.env.PORT || 3000;

let server = http.createServer();
server.on('request', router);
server.listen(serverPort);