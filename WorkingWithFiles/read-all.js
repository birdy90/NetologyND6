const fs = require('fs');

const options = {
  encoding: 'utf8'
};

let read = file => {
  return new Promise((done, fail) => {
    fs.readFile(file, options, (error, content) => {
      if (error)
        fail(error);
      else
        done({
          name: file,
          content: content
        });
    });
  });
};

let readAll = (path) => {
  return new Promise((done, fail) => {
    fs.readdir(path, {}, (error, files) => {
      if (error)
        fail(error);
      else
        done(readFilesContents(files.map(file => `${path}/${file}`)));
    });
  });
};

let readFilesContents = (files) => {
  return Promise.all(files.map(item => read(item)));
};

module.exports = readAll;