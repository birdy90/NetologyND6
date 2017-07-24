const expect = require('chai').expect;

const calc = require('../index.js').calculator;
const utils = require('../index.js').utils;

describe('calculator', () => {
  describe('utils', () => {
    it('checkEmpty empty', () => {
      expect(utils.handleParam()).equal(0);
    });
    it('checkEmpty empty', () => {
      expect(utils.handleParam('')).equal(0);
    });
    it('checkEmpty smaller', () => {
      expect(utils.handleParam('-2')).equal(0);
    });
    it('checkEmpty bigger', () => {
      expect(utils.handleParam('5')).equal(2);
    });
    it('checkEmpty common', () => {
      expect(utils.handleParam('1')).equal(1);
    });

    it('check divider no divider', () => {
      expect(() => utils.getDivider('//<>\n1').divider).to.throw();
    });
    it('check divider with number', () => {
      expect(() => utils.getDivider('//<3>\n1').divider).to.throw();
    });
    it('check divider ]', () => {
      expect(() => utils.getDivider('//<]>\n1!2').divider).to.throw();
    });
    it('check divider incorrect', () => {
      expect(utils.getDivider('//<;>\n1!2').divider).to.be.equal('(?:;)');
    });
    it('check divider correct;', () => {
      expect(utils.getDivider('//<!>\n1!2').divider).to.be.equal('(?:!)');
    });
    it('check divider second part;', () => {
      expect(utils.getDivider('//<!>\n1!2').numbers).to.be.equal('1!2');
    });
  });

  describe('main 1', () => {
    it('empty parameters', () => {
      expect(calc.add()).to.be.equal(0);
    });
    it('single blank parameter', () => {
      expect(calc.add('')).to.be.equal(0);
    });
    it('single common parameter', () => {
      expect(calc.add('1')).to.be.equal(1);
    });
    it('double parameters, first blank', () => {
      expect(calc.add(',1')).to.be.equal(1);
    });
    it('double parameters, second blank', () => {
      expect(calc.add('2,')).to.be.equal(2);
    });
    it('double parameters', () => {
      expect(calc.add('2,2')).to.be.equal(4);
    });
    it('bigger parameters', () => {
      expect(calc.add('3,1')).to.be.equal(3);
    });
  });

  describe('main 2', () => {
    it('three parameters', () => {
      expect(() => calc.add('1,\n')).to.throw();
    });
    it('five parameters', () => {
      expect(calc.add('1,2,3,4,')).to.be.equal(7);
    });
  });

  describe('main 3', () => {
    it('two dividers allowed', () => {
      expect(calc.add('1\n2,3')).to.be.equal(5); // у нас же разрешены только 0, 1 и 2
    });
    it('two dividers disallowed', () => {
      // expect(calc.add('1,\n')).to.be.equal(1); // вообще, должно быть разрешено, ведь пустой символ интерпретируется как 0
      expect(() => calc.add('1,\n')).to.throw('Invalid numbers');
    });
  });

  describe('main 4', () => {
    it('check divider no divider', () => {
      expect(() => calc.add('//<>\n1')).to.throw();
    });
    it('check divider invalid format', () => {
      expect(calc.add('/>\n1')).to.be.NaN;
    });
    it('check divider with number', () => {
      expect(() => calc.add('//<3>\n3')).to.throw();
    });
    it('check divider incorrect', () => {
      expect(calc.add('//<;>\n1!2')).to.be.equal(1);
    });
    it('check divider correct;', () => {
      expect(calc.add('//<!>\n1!2')).to.be.equal(3);
    });
  });
});
