var AppDispatcher = require('../dispatcher/dispatcher.js');


var PokemonActions = {
  receiveAllPokemons: function(pokemons) {
    AppDispatcher.dispatch({
      actionType: "POKEMONS_RECEIVED",
      pokemons: pokemons
    });

  }


};



module.exports = PokemonActions;
