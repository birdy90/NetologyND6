angular
  .module('PokemonApp')

  .factory('PokemonsService', function($http) {

      return {
        getPokemons: function() {
          // return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
          return $http.get('https://api.backendless.com/v1/data/pokemon');
        },

        getPokemon: function(pokemonId) {
          // return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
          return $http.get('https://api.backendless.com/v1/data/pokemon/' + pokemonId);
        },

        createPokemon: function(pokemonData) {
          return $http({
            method: 'POST',
            url: 'https://api.backendless.com/v1/data/pokemon',
            data: pokemonData
          });
        },

        editPokemon: function(pokemonData) {
          return $http({
            method: 'PUT',
            url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonData.objectId,
            data: pokemonData
          });
        },

        deletePokemon: function(pokemonId) {
          return $http({
            method: 'DELETE',
            url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
          });
        }

      }

    }

  );
