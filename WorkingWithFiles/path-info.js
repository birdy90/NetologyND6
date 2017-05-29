const fs = require('fs');

let options = {
  encoding: 'utf8'
};

let showInfo = (path, callback) => {
  fs.stat(path, (error, data) => {
    if (error)
      callback(error, null);
    else {
      if (data.isFile()) {
        readFile(path, callback);
      }
      if (data.isDirectory()) {
        readDir(path, callback);
      }
    }
  });
};

function readFile(path, callback) {
  fs.readFile(path, options, (error, data) => {
    if (error)
      callback(error, null);
    else {
      let info = {
        path: path,
        type: 'file',
        content: data
      };
      callback(null, info);
    }
  });
}

function readDir(path, callback) {
  fs.readdir(path, options, (error, files) => {
    if (error)
      callback(error, null);
    else {
      let info = {
        path: path,
        type: 'directory',
        childs: files
      };
      callback(null, info);
    }
  });
}

module.exports = showInfo;