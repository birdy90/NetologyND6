const pathInfo = require('./path-info');

function showInfo(err, info) {
  if (err) {
    console.log(`Возникла ошибка при получении информации: ${err}`);
    console.log('-'.repeat(10));
    return;
  }

  console.log(`Информация по пути ${info.path}:`);
  console.log(info.data);
  console.log('-'.repeat(10));
}

pathInfo(__dirname, showInfo);
pathInfo(__filename, showInfo);
pathInfo('some-strange-path', showInfo);