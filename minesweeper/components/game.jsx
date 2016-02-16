var React = require('react');
var Minesweeper = require('./minesweeper.js');
var Board = require('./board.jsx');


var Game = React.createClass({
  getInitialState: function () {
    return {
      board: new Minesweeper.Board(9, 10)
    };
  },

  restartGame: function() {
    this.setState({board: new Minesweeper.Board(9, 10)});
  },

  updateGame: function (tile, altBoolean) {
    console.log(tile);
    if (altBoolean && !tile.explored) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    this.setState({ board: this.state.board });
  },

  render: function() {
    if (this.state.board.lost()) {
      var r = confirm("You lost!");
    } else if (this.state.board.won()) {
      var r = confirm("You won!");
    }
    if (r)
    {
      this.restartGame();
    }
    return (
      <Board board={this.state.board} updateGame={this.updateGame} />

    );
  }

});

module.exports = Game;
