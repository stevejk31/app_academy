console.log("Javascript DO WHAT WE WANT!!!!");
var readLine = require('readline');
var reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});


function ticTacToe() {
  this.grid = [[null,null,null],[null,null,null],[null,null,null]];
}

ticTacToe.prototype.promptMove = function(sym, callback){
  console.log(this.grid[0]);
  console.log(this.grid[1]);
  console.log(this.grid[2]);
  var ttt = this;
  if (this.winCondition(ttt.otherPlayer(sym)) || this.winCondition(sym)) {
    callback();
  } else {
    console.log("Current mark: " + sym);
    reader.question("Which row do you want put your mark?(0, 1, 2) : ", function(rowIdx) {
      var userRowIdx = parseInt(rowIdx);
      reader.question("Which column do you want put your mark?(0, 1, 2) : ", function(colIdx) {
        var userColIdx = parseInt(colIdx);
        if (ttt.isValidMove(userRowIdx, userColIdx)) {
          ttt.grid[userRowIdx][userColIdx] = sym;
          sym = ttt.otherPlayer(sym);
          ttt.promptMove(sym, callback);
        } else {
          ttt.promptMove(sym, callback);
        }
      });
    });
  }
};

ticTacToe.prototype.otherPlayer = function(sym) {
  if (sym === this.p1m) {
    return this.p2m;
  } else {
    return this.p1m;
  }
};

ticTacToe.prototype.isValidMove = function(rowIdx, colIdx) {
  if (rowIdx === 1 || rowIdx === 0 || rowIdx === 2) {
    if (colIdx === 1 || colIdx === 0 || colIdx === 2) {
      if (!this.grid[rowIdx][colIdx]) {
        return true;
      }
    }
  }
  return false;
};

ticTacToe.prototype.winCondition = function(sym){
  var idx;
  var idx2;
  var vert;
  // horizontal case
  for (idx = 0; idx < 3; idx++){
    if (this.grid[idx] === [sym,sym,sym]){
      return true;
    }
  }
  // vertical case
  for (idx = 0; idx < 3; idx++){
    vert = 0;
    for (idx2 = 0; idx2 < 3; idx2++){
      if (this.grid[idx2][idx] === sym){
        vert ++;
        if (vert === 3) {
          return true;
        }
      }
    }
  }
  //diagonal 1
  vert = 0;
  for (idx = 0; idx < 3; idx++){
    if (this.grid[idx][idx] === sym){
      vert ++;
      if (vert === 3) {
        return true;
      }
    }
  }
  //diagonal 2
  vert = 0;
  for (idx = 0; idx < 3; idx++){
    if (this.grid[2-idx][idx] === sym){
      vert ++;
      if (vert === 3) {
        return true;
      }
    }
  }
  return false;
};

ticTacToe.prototype.run = function(){
  var ttt = this;
  reader.question("Player one mark: ", function(p1m) {
    ttt.p1m = p1m;
    reader.question("Player two mark: ", function(p2m) {
      ttt.p2m = p2m;
      ttt.promptMove(ttt.p1m, completionCallback);
    });
  });
};

var completionCallback = function() {
  console.log("You win!");
  reader.close();
};


var potato = new ticTacToe();
potato.run();
