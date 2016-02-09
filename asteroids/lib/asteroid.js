var MovingObject = require("./MovingObject");
var Utils = require("./utils");



function Asteroid(posArg){
  MovingObject.call(this, posArg);
  this.COLOR = "#FFFFFF";
  this.RADIUS = 10;
  //TODO what is length? assuming somethign about canvas
  this.vel = Utils.randVector(2);
  //Utils.randVector(length);
}
Utils.inherits(Asteroid, MovingObject);


module.exports = Asteroid;
