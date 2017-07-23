angular
  .module('PokemonApp')

  .component('menuBlock', {
    controller: function($scope, $element, $attrs) {
      this.activeMenu = '';
      this.menus = [
        {url: '', title: 'Главная'},
        {url: 'pokemons', title: 'Покемоны'},
        {url: 'create', title: 'Добавить нового'},
        {url: 'myaccount', title: 'Аккаунт'},
      ];
      this.click = (e) => {
        this.activeMenu = e.target.href.split('#!/')[1];
      }
    },
    controllerAs: '$ctrl',
    templateUrl: './src/Menu/Menu.html',
    bindings: {
    }
  });