const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const utils = require('./utils');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

app.get('/favicon.ico', (req, res) => res.send(''));

app.get('/', (req, res) => {
  let parameters = {};
  if (req.query !== undefined && req.query.search !== '')
    parameters = req.query;
  utils.read(parameters)
    .then((data) => {
      data.search = req.query.search !== undefined ? req.query.search : '';
      return utils.render('./templates/index.html', data)
    })
    .then((page) => res.send(page));
});

app.get('/user/:id', (req, res) => {
  utils.get(req.params.id)
    .then((data) => utils.render(data.length < 1 ? './templates/404.html' : './templates/person.html', data[0]))
    .then((page) => res.send(page));
});


app.get('/api/users', (req, res) => {
  utils.read()
    .then((data) => res.json(data));
});

app.post('/api/users', (req, res) => {
  utils.add(req.body)
    .then((data) => res.json({ok: 'Сохранено'}));
});

app.get('/api/users/:id', (req, res) => {
  utils.get(req.params.id)
    .then((data) => res.json(data));
});

app.put('/api/users/:id', (req, res) => {
  utils.update(req.params.id, req.body)
    .then((data) => res.json({ok: 'Изменено'}));
});

app.delete('/api/users/:id', (req, res) => {
  utils.remove(req.params.id)
    .then((data) => res.json({ok: 'Удалено'}));
});


app.use((err, req, res) => {
  console.log(`Не удалось выполнить запрос`);
  res.send(err);
});

app.listen(3000);