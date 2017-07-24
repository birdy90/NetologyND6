const expect = require('chai').expect;

const calc = require('../index.js').calculator;
const utils = require('../index.js').utils;

describe('calculator', () => {
  describe('parameters', () => {
    describe('utils', () => {
      it('checkEmpty empty', () => {
        expect(utils.handleParam()).eql(0);
      });
      it('checkEmpty empty', () => {
        expect(utils.handleParam('')).eql(0);
      });
      it('checkEmpty smaller', () => {
        expect(utils.handleParam('-2')).eql(0);
      });
      it('checkEmpty bigger', () => {
        expect(utils.handleParam('5')).eql(2);
      });
      it('checkEmpty common', () => {
        expect(utils.handleParam('1')).eql(1);
      });
    });

    describe('main', () => {
      it('empty parameters', () => {
        expect(calc.add()).to.be.eql(0);
      });
      it('single blank parameter', () => {
        expect(calc.add('')).to.be.eql(0);
      });
      it('single common parameter', () => {
        expect(calc.add('1')).to.be.eql(1);
      });
      it('double parameters, first blank', () => {
        expect(calc.add(',1')).to.be.eql(1);
      });
      it('double parameters, second blank', () => {
        expect(calc.add('2,')).to.be.eql(2);
      });
      it('double parameters', () => {
        expect(calc.add('2,2')).to.be.eql(4);
      });
      it('bigger parameters', () => {
        expect(calc.add('3,1')).to.be.eql(3);
      });
      it('more parameters', () => {
        expect(calc.add('1,2,1')).to.be.eql(3);
      });
    });
  });
});
