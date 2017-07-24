class Calculator
{
  static add(numbers) {
    numbers = numbers || '';

    const divider = Utils.getDivider(numbers) || new Divider('(?:,|\n)', numbers);
    const regexp = new RegExp(`${divider.divider}`);
    const invalidRegexp = new RegExp(`${divider.divider}{2}`);

    if (divider.numbers.match(invalidRegexp))
      throw new Error('Invalid numbers');
    let sum = 0;

    const negativeNumbers = [];
    const parts = divider.numbers.split(regexp).forEach((item) => {
      const number = Utils.handleParam(item);
      if (number < 0) {
        negativeNumbers.push(number);
      }
      sum += Utils.handleParam(item);
    });

    if (negativeNumbers.length > 0) {
      let err = new Error('Отрицательные числа не допустимы.');
      err.numbers = JSON.stringify(negativeNumbers);
      throw err;
    }

    return sum;
  }
}

class Utils {
  static handleParam(str) {
    str = str || '';
    if (str !== undefined) {
      if (str === '') {
        str = '0';
      }
      str = parseInt(str);
      if (str > 1000) {
        str = 0;
      }
    }
    return parseInt(str);
  }

  static getDivider(str) {
    let hasDivider = str.match(/\/\/(<.*?\>)+\n/);
    if (hasDivider) {
      const splitedInput = str.split('\n');
      const numbers = splitedInput[1];

      splitedInput[0] = splitedInput[0].replace(/\//g, '');
      splitedInput[0] = splitedInput[0].replace(/([\[\]\(\)\|\/\?\*\-\+\^\$])/g, '\\$1');
      let matches = splitedInput[0].match(/<(.*)>+/);

      if (matches[1] === '' || matches[1].match(/[\d]/) !== null) {
        throw new Error('Invalid custom divider');
      } else {
        if (matches[1].match('><')) {
          matches = matches[1].replace(/></g, '|');
        } else {
          matches = matches[1];
        }

        return new Divider(`(?:${matches})`, numbers);
      }
    } else {
      return undefined;
    }
  }
}

class Divider {
  constructor(divider, string) {
    this.divider = divider;
    this.numbers = string;
  }
}

module.exports =  {
  calculator: Calculator,
  utils: Utils
};