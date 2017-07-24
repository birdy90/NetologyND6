class Calculator
{
  static add(numbers) {
    numbers = numbers || '';

    let sum = 0;
    const parts = numbers.split(',').forEach((item) => {
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
    return str;
  }
}

module.exports =  {
  calculator: Calculator,
  utils: Utils
};