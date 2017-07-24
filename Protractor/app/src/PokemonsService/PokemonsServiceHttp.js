angular
  .module('PokemonApp')
  .factory('PokemonsService', function($http) {
      return {

        getPokemons: function() {
          return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
        },

        getPokemon: function(pokemonId) {
          return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
        },

        createPokemon: function(pokemonData) {
          return $http({
            method: 'POST',
            url: 'https://api.backendless.com/v1/data/pokemon',
            headers: {
              "application-id": "AFBEDD0A-B8CC-BA4A-FF20-03B2FD774100",
              "secret-key": "2EB20B73-7B69-99E8-FF2B-35AF0B85AB00"
            },
            data: pokemonData
          });
        },

        deletePokemon: function(pokemonId) {
          return $http({
            method: 'DELETE',
            url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
            headers: {
              "application-id": "AFBEDD0A-B8CC-BA4A-FF20-03B2FD774100",
              "secret-key": "2EB20B73-7B69-99E8-FF2B-35AF0B85AB00"
            }
          });
        }

      }

    }

  );
