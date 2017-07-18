const main = require('../');
const expect = require('chai').expect;

describe('es2015 tests', () => {
  const testName = 'Pikachu';
  const testLevel = 2;

  describe('pokemon', () => {
    let pokemon;

    beforeEach(() => {
      pokemon = new main.Pokemon(testName, testLevel);
    });

    it('show', () => {
      const result = pokemon.show();
      expect(result).to.be.equal(`${testName}'s level: ${testLevel}`);
    });

    it('show empty', () => {
      pokemon = new main.Pokemon();
      const result = pokemon.show();
      expect(result).to.be.equal(`'s level: 0`);
    });
  });

  describe('pokemon list', () => {
    let list;

    beforeEach(() => {
      list = new main.PokemonList();
    });

    const fillList = (iterations) => {
      for (let i = 0; i < iterations; i++) {
        list.add(testName, testLevel);
      }
    };

    it('add', () => {
      const oldLength = list.length;
      list.add(testName, testLevel);
      const newLength = list.length;
      expect(newLength).to.be.equal(oldLength + 1);
    });

    it('add multiple', () => {
      const oldLength = list.length;
      const iterations = 4;
      fillList(iterations);
      const newLength = list.length;
      expect(newLength).to.be.equal(oldLength + iterations);
    });

    it('show', () => {
      const iterations = 2;
      fillList(iterations);
      const result = list.show();
      expect(result).to.be.equal(`${testName}'s level: ${testLevel} | ${testName}'s level: ${testLevel} | overall: 2`);
    });

    it('show empty', () => {
      const result = list.show();
      expect(result).to.be.equal(`overall: 0`);
    });

    it('max with different', () => {
      const iterations = 2;
      fillList(iterations);
      const newMaxLevel = 10;
      list[0].level = newMaxLevel;
      expect(list.max()).to.be.eql(newMaxLevel);
    });

    it('max with equal', () => {
      const iterations = 4;
      fillList(iterations);
      expect(list.max()).to.be.eql(testLevel);
    });

    it('max on empty', () => {
      expect(list.max()).to.be.eql(0);
    });
  });
});