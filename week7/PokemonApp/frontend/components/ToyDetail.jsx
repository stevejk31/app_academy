var React = require('react');
var PokemonStore = require('../stores/pokemon');
var apiUtil = require('../util/apiUtil');

var ToyDetail = React.createClass({
  getInitialState: function() {
    return({toy: this.getStateFromStore()});
  },
  _onChange: function() {
    this.setState({toy: this.getStateFromStore()});
  },
  componentDidMount: function () {
    this.listenerToken = PokemonStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },
  componentWillReceiveProps: function(newProps) {
    var pokId = newProps.params.pokemonId;
    apiUtil.fetchPokemon(pokId);
  },
  getStateFromStore: function() {
    return PokemonStore.find(parseInt(this.props.params.toyId));
  },
  render: function() {
    return (
      <div>
        <img src={this.state.toy.img_url}/>
      </div>
    );
  }
});

module.exports = ToyDetail;
