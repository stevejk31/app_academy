var React = require('react');
var PokemonStore = require("../stores/pokemon.js");
var Utils = require("../util/apiUtil.js");
var PokemonIndexItem = require("./pokemonIndexItem.jsx");

var PokemonsIndex = React.createClass({
  getInitialState: function(){
    return {
        pokemons: PokemonStore.all()
      };
  },
  componentDidMount: function(){
    var that = this;
    this.listenerToken = PokemonStore.addListener(that._onChange);
    Utils.fetchAllPokemons();
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  _onChange: function () {
    this.setState({
      pokemons: PokemonStore.all()
    });

  },
  render: function() {
    var output;
    if (this.state.pokemons.length > 0) {
      output = this.state.pokemons.map(function(pokemon, idx){
        return <PokemonIndexItem key={idx} pokemon={pokemon}/>;
      });
    } else {
      output = "loading";
    }
    return (
      <div>
        <h1>PokemonsIndex</h1>
        <ul>
          {output}
        </ul>
      </div>
    );
  }

});

module.exports = PokemonsIndex;
