var Utils = require("./utils");
var Asteroid = require("./asteroid");
var MovingObject = require("./MovingObject");

//TODO snake case constants?
function Game(DIM_X, DIM_Y, NUM_ASTEROIDS) {
  this.DIM_X = DIM_X;
  this.DIM_Y = DIM_Y;
  this.NUM_ASTEROIDS = NUM_ASTEROIDS;
  this.asteroids = [];
  this.addAsteroids();
  this.start(ctx);
}

Game.prototype.addAsteroids = function() {
  for(var i = 0; i < this.NUM_ASTEROIDS; i ++) {
    // TODO do not generate asteroids on top of ships
    this.asteroids.push(new Asteroid({ pos: Utils.randPos(this.DIM_X, this.DIM_Y), game: this}));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X,this.DIM_Y);
  ctx.fillStyle="black";
  ctx.fillRect(0,0,this.DIM_X,this.DIM_Y);
  for (var i = 0; i <this.asteroids.length; i++) {
    this.asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function(){
  for (var i = 0; i <this.asteroids.length; i++) {
    this.asteroids[i].move(this.asteroids[i].pos, this.asteroids[i].vel);
    this.asteroids[i].pos = this.wrap(this.asteroids[i].pos);
  }
};

Game.prototype.step = function(){
  this.moveObjects();
  for (var i = 0; i <this.asteroids.length; i++) {
    for (var j = 0; j <this.asteroids.length; j++) {
      this.asteroids[i].isCollidedWith(this.asteroids[j]);
    }
  }
};

Game.prototype.start = function (ctx) {
  var animateCallback = function(){
      this.step();
      this.draw(ctx);
      //this will call our animateCallback again, but only when the browser
      //is ready, usually every 1/60th of a second
      requestAnimationFrame(animateCallback);

      //if we didn't know about requestAnimationFrame, we could use setTimeout
      //setTimeout(animateCallback, 1000/60);
    }.bind(this);

    //this will cause the first render and start the endless triggering of
    //the function using requestAnimationFrame
    animateCallback();
};

Game.prototype.remove = function(asteroid){
  for (var i = 0; i <this.asteroids.length; i++){
    if (this.asteroids[i] === asteroid) var delInd = i;
  }
  this.asteroids.splice(delInd,1);
};

Game.prototype.wrap = function(pos){
  if (pos[0] > this.DIM_X || pos[0] < this.DIM_X){
    if(pos[0] > this.DIM_X) pos[0] = 0;
    if(pos[0] < 0) pos[0] = this.DIM_X;
  }
  if (pos[1] > this.DIM_Y || pos[1] < this.DIM_Y){
    if(pos[1] > this.DIM_Y) pos[1] = 0;
    if(pos[1] < 0) pos[1] = this.DIM_Y;
  }
  return pos;
};

var game = new Game(900, 900, 20);
