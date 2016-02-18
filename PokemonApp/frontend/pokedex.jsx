var React = require('react'),
    ReactDOM = require('react-dom'),
    PokemonsIndex = require('./components/pokemonsIndex.jsx');


// TODO remember to delete these
var utils = require("./util/apiUtil.js");
var PokemonStore = require("./stores/pokemon.js");
window.utils = utils;
window.PokemonStore = PokemonStore;

$(function() {
  ReactDOM.render(<PokemonsIndex/>, root);
});
