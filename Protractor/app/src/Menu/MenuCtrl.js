angular
  .module('PokemonApp')

  .component('menuBlock', {
    controller: function($scope, $element, $attrs) {
      this.activeMenu = '';

      this.menus = [
        {url: '', title: 'Главная'},
        {url: 'pokemons', title: 'Покемоны'},
        {url: 'create', title: 'Добавить нового'},
      ]
    },
    templateUrl: './src/Menu/Menu.html',
    bindings: {
      activeMenu: '=',
      menus: '='
    }
  });