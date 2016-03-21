var emptyArray = [];
console.log(emptyArray);

var someSequence = [4, 9, 16];
console.log(someSequence);

var someFruits = ["pear", "apple", "banana"];
console.log(someFruits[0,1]);
console.log(someFruits.slice(0));
console.log(someFruits.slice(0, -1));

for (var i = 0; i < someFruits.length; i++) {
  console.log(someFruits[i]);
}

someFruits[3] = "tomato";

console.log(someFruits);

someFruits.push("pinapple");

console.log(someFruits);

var someStuff = someFruits.concat(someSequence);

console.log(someStuff);
console.log([].length === 0);
var poppedStuff = someFruits.pop();
console.log(poppedStuff);
console.log(someFruits);
console.log(someFruits.join(""));
console.log(someFruits.includes("tomato"));
console.log(someFruits.indexOf("tomato"));
console.log(someFruits.indexOf("apple", 3)); //-1 means nil(false) in ruby
console.log(someFruits.sort());
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
console.log(someFruits[0]);
console.log(someFruits[someFruits.length-1]);
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(someFruits[getRandomInt(0, someFruits.length-1)]);

console.log(shuffle(someFruits));


// build unique
var myUniq = function(someArray) {
  someArray.sort();
  var newArray = [];
  for (var j = 0; j < someArray.length; j++) {
    if (!newArray.includes(someArray[j])){
      newArray.push(someArray[j]);
    }
  }
  return newArray;
};
var duplicateArray = [1,1,2,3,3,4,5,5,5,6,6];
var printArray = myUniq(duplicateArray);
console.log(printArray);


var twoSum = function(someArray) {
  var newArray = [];
  for (var j = 0; j < someArray.length; j++) {
    for (var k = j+1; k < someArray.length; k++) {
      if ((someArray[j] + someArray[k]) === 0){
        newArray.push([j,k]);
      }
    }
  }
  return newArray;
};

var twoSumArray = [1,1,-1,3,0,4,0,5,5,-3,6];
var printTwoSumArray = twoSum(twoSumArray);
console.log(printTwoSumArray);


var myTranspose = function(someArray) {
  var result = [];
  for (var col=0; col<someArray.length; col++) {
    var newrow = [];
    for (var row=0; row<someArray[0].length; row++) {
      newrow.push(someArray[row][col]);
    }
    result.push(newrow);
  }
  return result;
};

var transposeArray = [[1,2,3],[4,5,6],[7,8,9]];
var printMyTranspose = myTranspose(transposeArray);
console.log(printMyTranspose);

var myEach = function(someArray, somefunction) {
  for (var j=0; j<someArray.length; j++) {
    somefunction(someArray[j]);
  }
  return someArray;
};
var func = function(x) {
  console.log(x);
};
myEach(someFruits, func);


var myMap = function(someArray, somefunction) {
  var result = [];
  var func1 = function(y) {
    result.push(somefunction(y));
  };
  myEach(someArray, func1);
  return result;
};
var func2 = function(x) {
  console.log(x);
};

var myMapArray = myMap(someFruits, func2);
console.log(myMapArray);


var myInject = function(someArray, accumulator, someFunction) {
  var result = accumulator;
  var func1 = function(y) {
    result = someFunction(result, y);
  };
  myEach(someArray, func1);
  return result;
};
var numArray = [1,2,3,4,5];
var acc = 2;
var func3 = function(x, y) {
  return y * x;
};
console.log(myInject(numArray, acc, func3));
console.log(myInject([1,2,3], 2, function (x, y) { return y * x; }));

var bubbleSort = function(someArray) {
  var sorted = false;
  while(!sorted){
    sorted = true;
    for(var l = 0; l < someArray.length-1; l++){
      if (someArray[l] > someArray[l+1]){
        var tempNum = someArray[l];
        someArray[l] = someArray[l+1];
        someArray[l+1] =tempNum;
        sorted = false;
      }
    }
  }
  return someArray;
};
console.log(bubbleSort([5,4,2,1,8,9]));

var substrings = function(someString){
  var returnSubs = [];
  for(var q = 0; q < someString.length; q++){
    for(var w = q+1; w <= someString.length; w++){
      returnSubs.push(someString.substring(q, w));
    }
  }
  return returnSubs;
};

console.log(substrings("asdf"));
