console.log("Javascript DO WHAT WE WANT!!!!");
var readLine = require('readline');
var reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});


function ticTacToe() {
  this.grid = [[null,null,null],[null,null,null],[null,null,null]];
}
ticTacToe.prototype.promptMove = function(callback){
  console.log(this.grid);
  var hg = this;
  if (this.winCondition()) {
    callback();
  } else {
    reader.question("Which row do you want put your mark?(0, 1, 2) : ", function(rowIdx) {
      var userRowIdx = parseInt(rowIdx);
      reader.question("Which column do you want put your mark?(0, 1, 2) : ", function(colIdx) {
        var userColIdx = parseInt(colIdx);
        if (hg.isValidMove(userRowIdx, userColIdx)) {
          // mark the board
        }
        hg.promptMove(callback);
      });
    });
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

ticTacToe.prototype.winCondition = function(){
  
};

ticTacToe.prototype.run = function(){
  this.promptMove(completionCallback);
};

var completionCallback = function() {
  console.log("You win!");
  reader.close();
};


var hg = new ticTacToe();
hg.run();
