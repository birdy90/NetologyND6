const app = require('express')();
const bodyParser = require('body-parser');

const utils = require('./utils');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  utils.readData()
    .then((data) => utils.readTemplate(getTemplateName(data), data))
    .then((page) => res.send(page));
});

app.get('/users', (req, res) => {
  utils.readData()
    .then((data) => utils.encode(data.users))
    .then((data) => res.json(data));
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
    .then((data) => utils.encode(data.users.find(item => item.id === parseInt(req.params.id))))
    .then((data) => res.json(data));
});

app.put('/users/:id', (req, res) => {
  utils.readData()
    .then((data) => utils.updateData(data, req.params.id, req.body.name))
    .then((data) => utils.writeData(data))
    .then((data) => res.json({status: 'ok'}));
});

app.delete('/users/:id', (req, res) => {
  utils.readData()
    .then((data) => utils.removeData(data, req.params.id))
    .then((data) => utils.writeData(data))
    .then((data) => res.json({status: 'ok'}));
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(200).json({status: req});
});

const getTemplateName = (data) => data.users.length ? './templates/index.html' : './templates/index_empty.html';

app.listen(3000);