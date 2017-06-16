const http = require('http');
const socketio = require('socket.io');
const utils = require('./utils');

const server = http.createServer();
const ioServer = http.createServer();

const io = socketio(ioServer);

let users = [];

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

io.on('connection', (client) => {
    console.log(`new client ${client.id}`);

    client.on('login', (data) => {
        const loggedUser = users.find((item) => item.id === client.id );
        if (loggedUser !== undefined) return;

        console.log(`${client.id} logged in as ${data.name}`);
        users.push({id: client.id, name: data.name});
        client.emit('system', {message: 'Вы присоединились'});
        client.broadcast.emit('system', {message: `Присоединился пользователь ${data.name}`});
        io.emit('system', {message: `Теперь в чате ${users.length} пользователей`});

        client.on('new-message', (data) => {
            console.log('new message');
            console.log(data);
            client.broadcast.emit(data);
        });
        client.on('disconnect', () => {
            console.log(`${client.id} disconnected`);

            const left = users.find((item) => item.id !== client.id );
            const index = users.indexOf(left);
            users.splice(index, 1);
            io.emit('system', {message: `Пользователь ${left.name} вышел из чата`});
            io.emit('system', {message: `Теперь в чате ${users.length} пользователей`});
        });
    });
});

server.listen(3000);
ioServer.listen(1234);