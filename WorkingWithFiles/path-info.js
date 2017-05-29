const fs = require('fs');

const options = {
  encoding: 'utf8'
};

let showInfo = (path, callback) => {
  fs.stat(path, (error, data) => {
    if (error)
      callback(error, null);
    else {
      callback(null, {
        path: path,
        data: data
      });
    }
  });
};

module.exports = showInfo;