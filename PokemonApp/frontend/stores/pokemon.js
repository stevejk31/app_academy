var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');




var _pokemons= {};

var PokemonStore = new Store(AppDispatcher);

PokemonStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "POKEMONS_RECEIVED":
      resetPokemons(payload.pokemons);
      PokemonStore.__emitChange();
      break;
    case "POKEMON_RECEIVED":
      resetPokemon(payload.pokemon);
      PokemonStore.__emitChange();
      break;
  }
};

PokemonStore.all = function() {
  var storedPokemons = [];
  var pokemonIds = Object.keys(_pokemons);

  pokemonIds.forEach(function(i) {
    storedPokemons.push(_pokemons[i]);
  });
  return storedPokemons;
};

PokemonStore.find = function(id) {
  return _pokemons[id];
};

var resetPokemons = function (pokemons) {
  _pokemons = {};
  // TODO check on resetiing _pokemons object
  pokemons.forEach(function(pokemon) {
    _pokemons[pokemon.id] = pokemon;
  });
};

var resetPokemon = function(pokemon) {
  _pokemons[pokemon.id] = pokemon;
};

module.exports = PokemonStore;
