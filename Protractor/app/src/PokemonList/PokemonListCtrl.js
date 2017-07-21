'use strict';

pokemonApp.controller('PokemonListCtrl', function($q, $scope, PokemonsService, BerriesService) {

  // PokemonsService.getPokemons().then(function(response) {
  //     $scope.pokemons = response.data.results;
  // });
  //
  // BerriesService.getBerries().then(function(response) {
  //     $scope.berries = response.data.results;
  // });

  $q.all([
    PokemonsService.getPokemons(),
    BerriesService.getBerries()
  ]).then(function (response) {
    $scope.pokemons = response[0].data.data;
    $scope.berries = response[1].data.data;
  });
});
