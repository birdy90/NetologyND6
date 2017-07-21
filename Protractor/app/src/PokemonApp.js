var pokemonApp = angular.module('PokemonApp', ['ngRoute']);

angular
  .module('PokemonApp')

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common = {
      // 'application-id': 'DCF96EF1-D889-2CAB-FFE1-CC582DD18100',
      // 'secret-key': '2B5DFFEA-471B-9573-FF14-B6B891EAC500',
      "application-id": "4B730C92-F81E-236B-FFF0-6651FE882800",
      "secret-key": "CB6DE86C-6069-86C4-FF1C-9049D5AC9400"
    };
  }])

  .config(['$routeProvider',
    function config($routeProvider) {

      $routeProvider.
      when('/pokemons', {
        templateUrl: 'src/PokemonList/PokemonList.html',
        controller: 'PokemonListCtrl'
      }).
      when('/pokemons/:pokemonId', {
        templateUrl: 'src/PokemonDetail/PokemonDetail.html',
        controller: 'PokemonDetailCtrl'
      }).
      when('/create', {
        templateUrl: 'src/CreatePokemon/CreatePokemon.html',
        controller: 'CreatePokemonCtrl'
      }).
      when('/edit/:pokemonId', {
        templateUrl: 'src/EditPokemon/EditPokemon.html',
        controller: 'EditPokemonCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    }
  ]);