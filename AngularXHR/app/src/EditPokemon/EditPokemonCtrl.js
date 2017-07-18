'use strict';

pokemonApp

  .controller('EditPokemonCtrl', function($scope, $routeParams, PokemonsService) {

    $scope.newPokemon = {};
    $scope.pokemonLoaded = false;

    PokemonsService.getPokemon($routeParams['pokemonId']).then(function(response) {
      $scope.pokemon = response.data;
      $scope.pokemonLoaded = true;
    });

    $scope.editPokemon = function(myPokemon) {

      $scope.creationSuccess = false;

      PokemonsService.editPokemon(myPokemon).then(function(response) {
        $scope.creationSuccess = true;
      });

    }

  });
