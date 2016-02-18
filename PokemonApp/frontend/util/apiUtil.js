var PokemonActions = require('../actions/pokemonActions.js');


var Utils = {
  fetchAllPokemons: function () {
    $.ajax({
      url: "api/pokemon",
      type: "GET",
      success: function(pokemons) {
        PokemonActions.receiveAllPokemons(pokemons);
      }
    });
  }


};



module.exports = Utils;
