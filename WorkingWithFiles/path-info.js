const fs = require('fs');

const options = {
  encoding: 'utf8'
};

let showInfo = (path, callback) => {
  let info = {path: path};
  fs.readdir(path, {}, (error, files) => {
    if (error) {
      fs.readFile(path, options, (error, contents) => {
        if (error)
          callback(error, info);
        else {
          info.type = 'file';
          info.content = contents;
          callback(null, info);
        }
      });
    } else {
      info.type = 'directory';
      info.childs = files;
      callback(null, info);
    }
  });
};

module.exports = showInfo;