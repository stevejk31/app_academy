var React = require('react');
var PropTypes = React.PropTypes;
var PokemonStore = require('../stores/pokemon');

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
  },

  render: function() {
    var pokeDetail = "select a pokemon";
    if (this.state.pokemon !== undefined){
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
      </div>);
    }
    return (
      <div >
        <div className="pokemon-detail-pane">
          {pokeDetail}
        </div>
      </div>
    );
  }

});

module.exports = PokemonDetail;
