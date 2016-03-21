var View = require('./ttt-view');
var Game = require('../../ttt-core-solution/game');

$(function () {
  var $ttt = $(".ttt");
  var game = new Game();
  new View(game, $ttt);
});
