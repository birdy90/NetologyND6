const mongo = require('mongodb');
const objectId = require('mongodb').ObjectId;
const fs = require('fs');
const dbClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017/bederdinov_mongo_2';

const connect = () => new Promise((done, fail) => {
  dbClient.connect(url, (err, db) => {
    if (err) {
      fail(err);
    }
    const users = db.collection('users');
    done(users);
  });
});

const read = (conditions) => {
  return connect()
    .then((table) => {
      let data = {};
      if (conditions === undefined || conditions.search === undefined) {
        data = table.find();
      } else {
        const re = new RegExp(`^.*${conditions.search}.*$`, 'i');
        conditions = {
          $or: [
            {first_name: re},
            {last_name: re},
            {phone: re},
          ]
        };
        data = table.find(conditions);
      }
      return data.toArray();
    })
    .then((data) => new Promise((done, fail) => {
      done({users: data});
    }));
};

const get = (id) => {
  return connect()
    .then((table) => table.find({_id: objectId(id)}).toArray())
    .then((data) => new Promise((done, fail) => {
      if (data.length === 0)
        done({error: 'not found'});
      else
        done(data[0]);
    }));
};

const readFile = (path) => {
  return new Promise((done, fail) => {
    fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        fail(err);
      } else {
        done(data);
      }
    });
  });
};

const statics = (template, ctx) => readFile(`./${template.split('?')[0]}`);

const render = (template, ctx) => readFile(template).then((data) => handleContext(data, ctx));

const add = (data) => {
  return connect()
    .then((table) => table.insert(data));
};

const update = (id, data) => {
  return connect()
    .then((table) => table.updateOne({_id: objectId(id)}, {$set: data}));
};

const remove = (id) => {
  return connect()
    .then((table) => table.deleteOne({_id: objectId(id)}));
};

const handleContext = (template, ctx) => {
  template = template.replace(/[\r\n]/g, '');

  for (let key in ctx) {
    if (ctx.hasOwnProperty(key)) {
      // проверка на переменные
      let re = new RegExp(`{{\s*${key}\s*}}`,'g');
      template = template.replace(re, ctx[key]);

      // проверка на циклы
      let matches;
      do {
        re = new RegExp(`{{@\s*${key}.*?\s*}}(.*?)({{!}}.*?)?{{@}}`, 'm');
        matches = template.match(re);
        let part = '';
        if (matches) {
          if (matches[1])
            part = ctx[key].reduce((prev, current) => prev + handleContext(matches[1], current), '');
          if (ctx[key].length === 0 && matches[2])
            part = matches[2].replace('{{!}}', '');
        }
        template = template.replace(re, part);
      } while (matches);
    }
  }
  return template;
};

module.exports = {
  read,
  get,
  add,
  update,
  remove,

  statics,
  render
};