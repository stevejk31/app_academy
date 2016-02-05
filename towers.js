
console.log("Let's go to the magic treehouse");
var readLine = require('readline');
var reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame() {
  this.towers = [[3,2,1],[],[]];
}

HanoiGame.prototype.promptMove = function(callback){
  console.log(this.towers);
  var hg = this;
  if (this.towers[0].length === 0 && this.towers[1].length === 0) {
    callback();
  } else {
    reader.question("Which stack do you want to remove from?(0, 1, 2) : ", function(startTowerIdx) {
      var userStartIdx = parseInt(startTowerIdx);
      reader.question("Which stack do you want to add to?(0, 1, 2) : ", function(endTowerIdx) {
        var userEndIdx = parseInt(endTowerIdx);
        if (hg.isValidMove(userStartIdx, userEndIdx)) {
          hg.towers[userEndIdx].push(hg.towers[userStartIdx].pop());
        }
        hg.promptMove(callback);
      });
    });
  }
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  if (!this.towers[startTowerIdx] || !this.towers[endTowerIdx]) {
    return false;
  }
  if (this.towers[startTowerIdx].length === 0) {
    return false;
  }
  if (this.towers[endTowerIdx].length === 0 || this.towers[startTowerIdx][this.towers[startTowerIdx].length - 1] < this.towers[endTowerIdx][this.towers[endTowerIdx].length - 1]) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.run = function(){
  this.promptMove(completionCallback);
};

var completionCallback = function() {
  console.log("You win!");
  reader.close();
};


var hg = new HanoiGame();
hg.run();
