const app = require('express')();
const bodyParser = require('body-parser');

const utils = require('./utils');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  utils.readData()
    .then((data) => utils.readTemplate(data.users.length ? './templates/index.html' : './templates/index_empty.html', data))
    .then((page) => res.send(page));
});
app.get('/users', (req, res) => {
  utils.readData(req.query.limit, req.query.offset, req.query.fields)
    .then((data) => res.json(data.users));
});
app.post('/users', (req, res) => {
  utils.readData()
    .then((data) => utils.appendData(data, req.body))
    .then((data) => utils.writeData(data))
    // .then((data) => utils.encode(data.users[data.users.length - 1])) // для возвращения последнего элемента
    .then((data) => res.json({status: 'ok'}));
});
app.get('/users/:id', (req, res) => {
  utils.readData()
    .then((data) => res.json(data.users.find(item => item.id === parseInt(req.params.id))));
});
app.put('/users/:id', (req, res) => {
  utils.readData()
    .then((data) => utils.updateData(data, req.params.id, req.body.name, req.body.score))
    .then((data) => utils.writeData(data))
    .then((data) => res.json({status: 'ok'}));
});
app.delete('/users', (req, res) => {
  utils.readData()
    .then((data) => utils.clearData())
    .then((data) => res.json({status: 'ok'}));
});
app.delete('/users/:id', (req, res) => {
  utils.readData()
    .then((data) => utils.removeData(data, req.params.id))
    .then((data) => utils.writeData(data))
    .then((data) => res.json({status: 'ok'}));
});

const RPC = {
  'list': (req, res) => {
    utils.readData()
      .then((data) => res.json(data.users));
    },
  'get': (req, res) => {
    utils.readData()
      .then((data) => res.json(data.users.find(item => item.id === parseInt(req.body.id))));
    },
  'add': (req, res) => {
    utils.readData()
      .then((data) => utils.appendData(data, req.body))
      .then((data) => utils.writeData(data))
      .then((data) => res.json({status: 'ok'}));
    },
  'update': (req, res) => {
    utils.readData()
      .then((data) => utils.updateData(data, req.body.id, req.body.name, req.body.score))
      .then((data) => utils.writeData(data))
      .then((data) => res.json({status: 'ok'}));
    },
  'delete': (req, res) => {
    utils.readData()
      .then((data) => utils.removeData(data, req.body.id))
      .then((data) => utils.writeData(data))
      .then((data) => res.json({status: 'ok'}));
    },
};
app.post('/rpc', (req, res) => {
  RPC[req.body.method](req, res);
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).json({status: err.stack});
});

app.listen(3000);