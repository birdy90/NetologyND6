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
      expect(utils.handleParam('-2')).equal(-2); // изменено в связи с "появлением" отрицательных чисел
    });
    it('checkEmpty bigger', () => {
      expect(utils.handleParam('5')).equal(5); // убрал ограничение на большие числа для шестого задания
    });
    it('checkEmpty bigger', () => {
      expect(utils.handleParam('1003')).equal(0); // но ограничение - 1000
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
      expect(utils.getDivider('//<]>\n1!2').divider).to.be.equal('(?:\\])');
    });
    it('check divider correct', () => {
      expect(utils.getDivider('//<!>\n1!2').divider).to.be.equal('(?:!)');
    });
    it('check divider second part', () => {
      expect(utils.getDivider('//<!>\n1!2').numbers).to.be.equal('1!2');
    });
    it('check divider long', () => {
      expect(utils.getDivider('//<***>\n1***2').divider).to.be.equal('(?:\\*\\*\\*)');
    });
    it('check divider several long', () => {
      expect(utils.getDivider('//<***><&&&>\n1!2').divider).to.be.equal('(?:\\*\\*\\*|&&&)');
    });
    it('check divider angles random packs', () => {
      expect(utils.getDivider('//<;%::?*><"№;><@#$%^&*(>\n1!2').divider).to.be.equal('(?:;%::\\?\\*|"№;|@#\\$%\\^&\\*\\()');
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
      expect(calc.add('3,1')).to.be.equal(4); // обновлено для шестого
    });
  });

  describe('main 2', () => {
    it('three parameters', () => {
      expect(() => calc.add('1,\n')).to.throw();
    });
    it('five parameters', () => {
      expect(calc.add('1,2,3,4,')).to.be.equal(10);
    });
  });

  describe('main 3', () => {
    it('two dividers allowed', () => {
      expect(calc.add('1\n2,3')).to.be.equal(6); // обновлено
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

  describe('main 5', () => {
    it('has negative', () => {
      expect(() => calc.add('2,-1,3,3'))
        .to.throw('Отрицательные числа не допустимы.')
        .with.property('numbers', JSON.stringify([-1]));
    });
    it('has many negatives', () => {
      expect(() => calc.add('-2,-1,3,-3'))
        .to.throw('Отрицательные числа не допустимы.')
        .with.property('numbers', JSON.stringify([-2, -1, -3]));
    });
  });

  describe('main 6', () => {
    it('too big parameters', () => {
      expect(calc.add('2,1001')).to.be.equal(2);
    });
    it('check long divider', () => {
      expect(calc.add('//<***>\n1***2***3')).to.be.equal(6);
    });
    it('check different dividers', () => {
      expect(calc.add('//<*><%>\n1*2%3')).to.be.equal(6);
    });
    it('check different dividers', () => {
      expect(calc.add('//<********><*#!>\n1*#!2********3')).to.be.equal(6);
    });
    it('check divider with number', () => {
      expect(() => calc.add('//<|*%%3*><*#!>\n1|*%%3*2*#!3')).to.throw();
    });
  });
});
