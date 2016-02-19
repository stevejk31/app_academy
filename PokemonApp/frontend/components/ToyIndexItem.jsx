var React = require('react');
var History = require('react-router').History;


var ToyIndexItem = React.createClass({
  mixins: [History],
  showDetail: function() {
    this.history.push("/pokemons/" + this.props.toy.pokemon_id +"/toys/" +
            this.props.toy.id);
  },

  render: function() {
    return (
      <li
        onClick={this.showDetail}
        className="toy-list-item">
          name: {this.props.toy.name} <br/>
          happines: {this.props.toy.happiness} <br/>
          price: {this.props.toy.price} <br/>
      </li>
    );
  }

});

module.exports = ToyIndexItem;
