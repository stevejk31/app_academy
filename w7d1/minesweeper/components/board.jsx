var React = require('react');
var Tile = require('./Tile.jsx');

var Board = React.createClass({
  render: function() {
    var board = this;
    return (
      <div>
        {
          this.props.board.grid.map(function(row, idx1) {
            return (
              <div key={idx1} className="row">
                {
                  row.map(function(tile, idx2) {
                    return (
                      <Tile
                        key={idx2}
                        tile={tile}
                        updateGame={board.props.updateGame}/>
                    );
                  })
                }
              </div>
            );
          })
        }
      </div>
    );
  }

});

module.exports = Board;
