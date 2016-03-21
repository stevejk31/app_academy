var React = require('react');
var ReactDOM = require('react-dom');
var Game = require('./components/game.jsx');
// var Minesweeper = require('./components/minesweeper.js')

var MinesweeperEntry = React.createClass({
  render: function () {
    return (
      <div>
        Minesweeper!!!
        <Game />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MinesweeperEntry />, document.getElementById('root'));
});
