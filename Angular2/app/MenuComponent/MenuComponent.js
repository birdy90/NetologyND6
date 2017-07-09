'use strict';

angular
  .module('myApp')
  .factory('menuComponentService', function() {
    const state = {
      activeName: ''
    };

    return {
      getActiveMenu() {
        return state.activeName;
      }
    }
  })
  .component('menuComponent', {
    templateUrl: 'MenuComponent/MenuComponent.html',
    controller: function(menuComponentService) {
      this.items = [
        {
          'title': 'Список',
          'sref': 'list'
        },
        {
          'title': 'Добавить нового',
          'sref': 'createNewPokemon'
        },
        {
          'title': 'Личный кабинет',
          'sref': 'personalRoom'
        }
      ];
      this.activeName = menuComponentService.getActiveMenu();
    },
    bindings: {
      'activeName': '='
    }
  });