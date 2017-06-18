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
  client.emit('connection');

  client.on('login', (loginData) => {
    const nameRegex = new RegExp(/^[a-zа-я\d]+$/, 'i');
    const loggedUser = users.find((item) => item.id === client.id || (item.room === loginData.room && item.name === loginData.name))
    if (loggedUser !== undefined || !nameRegex.test(loginData.name)) return;

    console.log(`${client.id} logged in as ${loginData.name}`);
    const newUser = {
      id: client.id,
      name: loginData.name,
      socket: client,
      room: loginData.room
    };
    users.push(newUser);
    findReceivers(users, newUser).forEach((item) => {
      item.socket.emit('system', {message: `Присоединился пользователь ${loginData.name}`});
      item.socket.emit('system', {message: `Теперь в чате ${users.map(item => item.room === loginData.room).length} пользователей`});
    });
    client.emit('logged');
    client.emit('system', {message: `Вы присоединились. Комната: ${loginData.room}`});

    client.on('new-message', (data) => {
      const sender = findUser(client);
      data.username = sender.name;
      findReceivers(users, sender).forEach((item) => {
        item.socket.emit('new-message', data);
      });
    });
    client.on('disconnect', () => {
      console.log(`${client.id} disconnected`);
      const sender = findUser(client);
      if (sender === undefined) return;
      const index = users.indexOf(sender);
      users.splice(index, 1);
      findReceivers(users, sender).forEach((item) => {
        item.socket.emit('system', {message: `Пользователь ${sender.name} вышел из чата`});
        item.socket.emit('system', {message: `Теперь в чате ${users.length} пользователей`});
      });
    });
  });
});

const findUser = (client) => users.find((item) => item.id === client.id);
const findReceivers = (users, sender) => users.filter((item) => item.room === sender.room && item.id !== sender.id);

server.listen(3000);
ioServer.listen(1234);