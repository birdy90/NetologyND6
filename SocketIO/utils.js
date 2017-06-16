const fs = require('fs');

const dataOptions = {encoding: 'utf8'};

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

const readTemplate = (path, ctx) => {
  return read(path)
    .then((template) => handleContext(template, ctx));
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
  readTemplate,
};