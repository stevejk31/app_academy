/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(1);
	var Asteroid = __webpack_require__(2);
	var MovingObject = __webpack_require__(3);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Utils = {};
	Utils.inherits = function(ChildClass, ParentClass) {
	  function Surgate() {}
	  Surgate.prototype = ParentClass.prototype;
	  ChildClass.prototype = new Surgate;

	};

	//TODO cahnge vectors to be negative?
	Utils.randVector = function(length) {
	  var posNeg = (Math.pow(-1, Math.round(Math.random()*10)));
	  do{
	    var x = Math.round(Math.random()*length)*posNeg;
	  } while(x === 0);
	  posNeg = (Math.pow(-1, Math.round(Math.random()*10)));
	  do{
	    var y = Math.round(Math.random()*length)*posNeg;
	  } while(y === 0);
	  return [ x, y ];
	};


	Utils.randPos = function(dimX, dimY) {
	  return [Math.round(Math.random()*dimX), Math.round(Math.random()*dimY)];
	};

	module.exports = Utils;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Utils = __webpack_require__(1);



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


/***/ },
/* 3 */
/***/ function(module, exports) {

	//var Game = require("./Game");

	// ^ this is canvas stuff
	function MovingObject(moArgs) {
	  this.pos = moArgs["pos"];
	  this.vel = moArgs["vel"];
	  this.RADIUS = moArgs["radius"];
	  this.COLOR = moArgs["color"];
	  this.game = moArgs["game"];
	}

	MovingObject.prototype.move = function(pos, vel) {
	  this.pos =[ pos[0]+vel[0],  pos[1]+vel[1]];
	};

	MovingObject.prototype.collideWith = function(otherObject){
	  this.game.remove(this);
	  this.game.remove(otherObject);
	};

	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  var xPos = this.pos[0] - otherObject.pos[0];
	  var yPos = this.pos[1] - otherObject.pos[1];
	  var distance = Math.pow( (Math.pow(xPos, 2) + Math.pow(yPos, 2)), 0.5);
	  if ((distance < (this.RADIUS + otherObject.RADIUS)) && (this !== otherObject)) {
	    this.collideWith(otherObject);
	  }
	};

	MovingObject.prototype.draw = function (ctx) {
	  ctx.strokeStyle = this.COLOR;
	  ctx.beginPath();
	  //maybe check here later?
	  //TODO ctx.fillStyle = gradient
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.RADIUS,
	    0,
	    2 * Math.PI,
	    false);
	  ctx.stroke();
	};

	module.exports = MovingObject;
	// var mo = new MovingObject({ pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"});
	// mo.draw(ctx);


/***/ }
/******/ ]);