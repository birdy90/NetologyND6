'use strict';

pokemonApp.component('pokemonDetail', {
  controller: function PokemonDetailCtrl($routeParams, $location, PokemonsService) {

    const that = this;
    this.pokemonLoaded = false;

    this.pokemon = PokemonsService.get({
      pokemonId: $routeParams['pokemonId']
    }, function (successResult) {
      // Окей!
      that.notfoundError = false;
      that.pokemonLoaded = true;

      that.activeTab = 1;
      that.disableControlTab = true;
    }, function (errorResult) {
      // Не окей..
      that.notfoundError = true;
      that.pokemonLoaded = true;
    });

    this.pokemon.$promise.then(function (result) {
      //that.pokemonLoaded = true;
    });

    this.deletePokemon = function (pokemonId) {
      if (!confirm('Точно удалить?')) return;

      that.pokemon.$delete({
        pokemonId: pokemonId
      }, function (successResult) {
        // Окей!
        that.deletionSuccess = true;
        $location.path('/pokemons');
      }, function (errorResult) {
        // Не окей..
        that.deletionError = true;
      });

    }
  },

  templateUrl: './src/PokemonDetail/PokemonDetail.html',

  binding: {
    'pokemon': '=',
    'pokemonLoaded': '='
  }
});
