var View = function (game, $el) {
  this.game = game;
  this.$el = $el;

  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  this.$el.find(".square").on("mouseover", this.mouseHover.bind(this));
  this.$el.find(".square").on("mouseout", this.mouseOut.bind(this));
  this.$el.find(".square").on("click", this.playMove.bind(this));
};

View.prototype.makeMove = function ($square) {
  this.game.playMove($square.data("pos"));
  var currentPlayer = this.game.currentPlayer;
  $square.addClass(currentPlayer);
  $square.html(currentPlayer);
  if (this.game.isOver()) {
    window.alert("WINNNERRRR");
  }
};

View.prototype.setupBoard = function () {
  // this.$el.append("Tic Tac Toe");
  for( var i = 0; i < 3; i++){
    this.addRow();
  }
};

View.prototype.addRow = function() {
  var $row = $("<ul>").addClass("row").addClass("group");
  var rowIdx = this.$el.find(".row").length;
  for(var colIdx = 0; colIdx < 3; colIdx++) {
    var $square = $("<li>").addClass("square").data("pos", [rowIdx, colIdx]);
    $row.append($square);
  }
  this.$el.append($row);
};


View.prototype.mouseHover = function(e) {
  e.preventDefault();
  var $square = $(e.currentTarget);
  $square.attr("id", "hovered");
  // this.game.promptMove();
};

View.prototype.mouseOut = function(e) {
  e.preventDefault();
  var $square = $(e.currentTarget);
  $square.removeAttr("id");
  // $square.css("background-color", "#d3d3d3");
};

View.prototype.playMove = function(e) {
  e.preventDefault();
  var $square = $(e.currentTarget);
  if (!this.game.board.isEmptyPos($square.data("pos"))) {
    window.alert("bad move");
  } else {
    this.makeMove($square);
  }

};


module.exports = View;
