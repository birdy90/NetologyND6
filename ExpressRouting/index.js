const app = require('express')();

app.get('/', (req, res) => {
  res.send('Hello, Express.js');
});

app.get('/hello', (req, res) => {
  res.send('Hello, stranger!');
});

app.get('/hello/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

app.all('/sub/*', (req, res) => {
  res.send(`You requested URI: ${req.url}`);
});

app.use((req, res, next) => {
  if (!req.headers['key']) {
    res.status(401).send('Header Key not found');
    return;
  }
  next();
});

app.post('/post', (req, res) => {
  if (req.body)
    res.json(req.body);
  else
    res.status(404).send('Body not found');
});

app.use((err, req, res, next) => {
  res.status(500).send('Some error occured');
});

app.listen(3000);