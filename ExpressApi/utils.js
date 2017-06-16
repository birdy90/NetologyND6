const fs = require('fs');

const dataFile = './data.json';
const dataOptions = {encoding: 'utf8'};
const initialData = {
  'lastIndex': 0,
  'users': []
};

const encode = (data) => {
  return new Promise((done, fail) => done(JSON.stringify(data)));
};

const decode = (data) => {
  return new Promise((done, fail) => done(JSON.parse(data)));
};

const read = (path) => {
  return new Promise((done, fail) => {
    fs.readFile(path, dataOptions, (err, data) => {
      if (err) {
        fail(err);
      } else {
        done(data);
      }
    });
  });
};

const readData = (limit, offset, fields) => {
  return ensureDataFileExist(dataFile)
    .then(() => read(dataFile))
    .then((data) => decode(data))
    .then((data) => truncateData(data, limit, offset, fields));
};

const truncateData = (data, limit, offset, fields) => {
  return new Promise((done, fail) => {
    if (!offset) offset = 0;
    offset = Math.min(offset, data.users.length);
    offset = Math.max(offset, 0);

    if (!limit) limit = data.users.length - offset;
    limit = Math.min(limit, data.users.length - offset);
    limit = Math.max(limit, 0);

    if (!fields) fields = 'id,name,score';
    fields = fields.split(',');

    const users = [];
    for (let i = offset; i < offset + limit; i++)
      users.push(data.users[i]);

    data.users = users.map((item) => {
      const res = {};
      fields.forEach((key) => {
        res[key] = item[key];
      });
      return res;
    });

    done(data);
  });
};

const readTemplate = (path, ctx) => {
  return read(path)
    .then((template) => handleContext(template, ctx));
};

const writeData = (data) => {
  return ensureDataFileExist(dataFile)
    .then(() => new Promise((done, fail) => {
      fs.writeFile(dataFile, JSON.stringify(data), (err) => {
        if (err) {
          fail(err);
        } else {
          done(data);
        }
      });
    }));
};

const appendData = (data, newData) => {
  return new Promise((done, fail) => {
    data.lastIndex++;
    newData.id = data.lastIndex;
    data.users.push(newData);
    done(data);
  })
};

const updateData = (data, id, name, score) => {
  return new Promise((done, fail) => {
    const item = data.users.find(item => item.id == id)
    data.users[data.users.indexOf(item)].name = name;
    data.users[data.users.indexOf(item)].score = score;
    done(data);
  })
};

const removeData = (data, id) => {
  return new Promise((done, fail) => {
    const item = data.users.find(item => item.id == id)
    data.users.splice(data.users.indexOf(item), 1);
    done(data);
  })
};

const clearData = (data, id) => {
  return new Promise((done, fail) => {
    fs.writeFile(dataFile, JSON.stringify(initialData), done);
    done(data);
  })
};

const ensureDataFileExist = (path) => {
  return new Promise((done, fail) => {
    fs.exists(path, (result) => {
      if (!result)
        fs.writeFile(dataFile, JSON.stringify(initialData), done);
      done();
    });
  });
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
        re = new RegExp(`{{@\s*${key}.*?\s*}}(.*?){{@}}`, 'm');
        matches = template.match(re);
        let part = '';
        if (matches && matches.length > 1) {
          part = ctx[key].reduce((prev, current) => prev + handleContext(matches[1], current), '');
        }
        template = template.replace(re, part);
      } while (matches);
      // template = template.replace(re, ctx[key]);
    }
  }
  return template;
};

module.exports = {
  readData,
  truncateData,
  readTemplate,
  writeData,
  appendData,
  updateData,
  removeData,
  clearData,
  encode,
  decode
};