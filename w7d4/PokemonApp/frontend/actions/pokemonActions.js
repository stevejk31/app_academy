var AppDispatcher = require('../dispatcher/dispatcher.js');


var PokemonActions = {

  receiveAllPokemons: function(pokemons) {
    AppDispatcher.dispatch({
      actionType: "POKEMONS_RECEIVED",
      pokemons: pokemons
    });
  },

  receiveSinglePokemon: function(pokemon) {
    AppDispatcher.dispatch({
      actionType: "POKEMON_RECEIVED",
      pokemon: pokemon
    });
  },



};



module.exports = PokemonActions;
