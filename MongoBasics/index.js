const mongo = require('mongodb');
const dbClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017/test';

dbClient.connect(url, (err, db) => {
  if (err) {
    console.log(err);
  }

  console.log('Соединение успешно!');

  const names = db.collection('names');

  names.insertMany([
      {name: 'Григорий'},
      {name: 'Василий'},
      {name: 'Павел'},
      {name: 'Вероника'},
      {name: 'Маргарита'},
    ])
    .then(() => names.find().toArray())
    .then((data) => printList(data, 'Изначальные данные'))
    .then(() => names.updateMany({name: {$in: ['Павел', 'Вероника', 'Маргарита']}}, {$set: {name: 'Александра'}}))
    .then(() => names.find().toArray())
    .then((data) => printList(data, 'Изменённые данные'))
    .then(() => names.removeMany({name: 'Александра'}))
    .then(() => names.find().toArray())
    .then((data) => printList(data, 'Данные после удаления'))
    .then(() => names.removeMany()) // очищаю базу чтобы данные не накапливались при перезапусках
    .then(() => db.close());
});

const printList = (data, message) => new Promise((done, fail) => {
  if (message !== undefined)
    console.log(message);
  console.log(data.map(item => item.name));
  done();
});