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
      if (str > 2) {
        str = 2;
      }
    }
    return parseInt(str);
  }

  static getDivider(str) {
    let hasDivider = str.match(/\/\/\<.?\>\n/);
    let matches = str.match(/(\/\/\<([^\[\]\(\)\|\/\d])\>\n)?(.*)/);
    if (hasDivider) {
      if (!matches || matches.length === 1 || matches[2] === undefined) {
        throw new Error('Invalid custom divider');
      } else {
        return new Divider(`(?:${matches[2]})`, matches[3]);
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