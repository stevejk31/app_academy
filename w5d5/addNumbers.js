
console.log("Let's go to the magic treehouse");
var readLine = require('readline');
var reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback){
  if (numsLeft > 0) {
    reader.question("Number?", function(answer) {
      answer = parseInt(answer);
      sum += answer;
      if (numsLeft !== 1) {
        console.log("Partial sum: " + sum);
      }
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    reader.close();
    completionCallback(sum);
  }
};


addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
