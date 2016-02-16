var React = require('react');


var Tile = React.createClass({

  handleClick: function (e) {
    this.props.updateGame(this.props.tile, e.altKey);
  },

  render: function() {
    var tile = this.props.tile;
    var text = "";
    var className = "unexplored";
    if (tile.explored) {
      if (tile.adjacentBombCount() > 0) {
        text = tile.adjacentBombCount();
      }
      className = "explored";
    } else {
      if (tile.flagged) {
        text = "⚑";
        className = "flagged";
      }
    }

    if (tile.explored && tile.bombed) {
      text = "💣";
      className = "bombed";
    }

    return (
      <span onClick={this.handleClick}
        className={"tile" + " " + className}>{text}
      </span>
    );
  }

});

module.exports = Tile;
