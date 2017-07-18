class Pokemon {
  constructor(name, level) {
    this.name = name || '';
    this.level = level || 0;
  }

  show() {
    return `${this.name}'s level: ${this.level}`;
  }
}

class PokemonList extends Array {
  add(name, level) {
    const pokemon = new Pokemon(name, level);
    this.push(pokemon);
  }

  show() {
    let printedLine = '';
    this.forEach(item => {
      printedLine += `${item.show()} | `;
    });
    printedLine += `overall: ${this.length}`;
    return printedLine;
  }

  max() {
    let maxLevel = -Infinity;
    this.forEach((item) => {
      maxLevel = item.level > maxLevel ? item.level : maxLevel;
    });
    return maxLevel === -Infinity ? 0 : maxLevel;
  }
}

module.exports = {Pokemon, PokemonList};