let fs = require('fs');

const options = {
  encoding: 'utf8'
};

let read = file => {
  return new Promise((done, fail) => {
    fs.readFile(file, options, (error, content) => {
      if (error)
        fail(error);
      else
        done(content);
    });
  });
};

let write = (file, data) => {
  return new Promise((done, fail) => {
    fs.writeFile(file, data, options, error => {
      if (error)
        fail(error);
      else
        done();
    });
  });
};

module.exports = {
  read: read,
  write: write
};