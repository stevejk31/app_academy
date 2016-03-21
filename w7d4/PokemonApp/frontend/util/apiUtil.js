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
  },
  fetchPokemon: function(id) {
    $.ajax({
      url: "api/pokemon/"+id,
      type: "GET",
      success: function(pokemon) {
        PokemonActions.receiveSinglePokemon(pokemon);
      }
    });
  }
};



module.exports = Utils;
