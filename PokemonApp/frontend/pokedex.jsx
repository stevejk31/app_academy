var React = require('react'),
    ReactDOM = require('react-dom'),
    PokemonsIndex = require('./components/pokemonsIndex.jsx');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var App = require('./components/app.jsx');
var PokemonDetail = require('./components/pokemonDetail');


// TODO remember to delete these
var utils = require("./util/apiUtil.js");
var PokemonStore = require("./stores/pokemon.js");
window.utils = utils;
window.PokemonStore = PokemonStore;

var routes = (
  <Route path="/" component={App}>
    <Route path='pokemons/:pokemonId' component={PokemonDetail}>
    </Route>
  </Route>
);

$(function() {
  ReactDOM.render(<Router>{routes}</Router>, root);
});
