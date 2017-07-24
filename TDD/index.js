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

    const parts = divider.numbers.split(regexp).forEach((item) => {
      sum += Utils.handleParam(item);
    });

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
      if (str < 0) {
        str = 0;
      } else if (str > 2) {
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