var React = require('react');
var PokemonStore = require('../stores/pokemon');
var apiUtil = require('../util/apiUtil');
var ToysIndex = require('./toysIndex');


var PokemonDetail = React.createClass({

  getInitialState: function() {
    return {pokemon: this.getStateFromStore()};
  },

  componentDidMount: function() {
    this.listenerToken = PokemonStore.addListener(this._settingState);
  },

  _settingState: function() {
    this.setState({pokemon: this.getStateFromStore()});
  },

  getStateFromStore: function() {
    return PokemonStore.find(parseInt(this.props.params.pokemonId));
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
    if (this.listenerTokenSingle) {
      this.listenerTokenSingle.remove();
    }
  },
  componentWillReceiveProps: function(newProps) {
    var pokemonId = newProps.params.pokemonId;
    apiUtil.fetchPokemon(pokemonId);
    this.listenerTokenSingle = PokemonStore.addListener(
      this.settingSingleState.bind(this, pokemonId)
    );
  },
  settingSingleState: function(pokemonId) {
    this.setState({pokemon: PokemonStore.find(parseInt(pokemonId))});
  },
  render: function() {
    var pokeDetail = "select a pokemon";
    var toysIndex = '';

    if (this.state.pokemon !== undefined){
      if (this.state.pokemon.toys !== undefined) {
        toysIndex = <ToysIndex toys={this.state.pokemon.toys}/>;
      }
      pokeDetail= (
      <div className="detail">
        <img src={this.state.pokemon.image_url}></img>
        attack: {this.state.pokemon.attack} <br/>
        defense: {this.state.pokemon.defense} <br/>
        Moves: <br/>
        1: {this.state.pokemon.moves[0]}<br/>
        2: {this.state.pokemon.moves[1]}<br/>
        3: {this.state.pokemon.moves[2]}<br/>
        4: {this.state.pokemon.moves[3]}<br/>
        <br/>
        {toysIndex}
      </div>);
    }
    return (
      <div >
        <div className="pokemon-detail-pane">
          {pokeDetail}
        </div>
        {this.props.children}
      </div>
    );
  }

});

module.exports = PokemonDetail;
