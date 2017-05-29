const fs = require('fs');

const options = {
  encoding: 'utf8'
};

let showInfo = (path, callback) => {
  let info = { path: path };
  fs.stat(path, (error, data) => {
    if (error)
      callback(error, null);
    else {
      if (data.isFile()) {
        info.type = 'file';
        fs.readFile(path, options, (error, data) => {
          if (error)
            callback(error, null);
          else {
            info.content = data;
            callback(null, info);
          }
        });
      }
      if (data.isDirectory()) {
        info.type = 'directory';
        fs.readdir(path, options, (error, files) => {
          if (error)
            callback(error, null);
          else {
            info.childs = files;
            callback(null, info);
          }
        });
      }
    }
  });
};

module.exports = showInfo;