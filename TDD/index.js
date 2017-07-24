class Calculator
{
  static add(numbers) {
    numbers = numbers || '';

    const parts = numbers.split(',');
    parts[0] = Utils.handleParam(parts[0]);
    parts[1] = Utils.handleParam(parts[1]);

    return parts[0] + parts[1];
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