function View(game, $el) {
  this.game = game;
  this.$el = $el;

  this.setupBoard();
  this.bindEvents();
}

View.prototype.setupBoard = function(){
  for(var i = 0; i < 3; i ++){
    this.addTower();
  }
  this.populateFirstTower();
};

View.prototype.addTower = function() {
  var $tower = $("<ul>");
  this.$el.append($tower);
};

View.prototype.populateFirstTower = function () {
  var $firstTower = this.$el.find("ul").eq(0);
  for (var stack = 0; stack < 3; stack ++) {
    var $disk = $("<li>").addClass("disk-" + (stack + 1));
    $firstTower.append($disk);
  }
};

View.prototype.bindEvents = function(){

};

module.exports = View;
