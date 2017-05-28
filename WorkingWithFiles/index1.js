const file = require('./file-promise');

const inputFilename = './data.txt';
const outputFilename = './upper-data.txt';

file
  .read(inputFilename)
  .then(data => data.toUpperCase())
  .then(data => file.write(outputFilename, data))
  .then(filename => console.log(`Создан файл ${outputFilename}`))
  .catch(err => console.error(err));