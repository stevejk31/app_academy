var range = function(start, end){
  var arrayNums = [];
  if (start > end){
    return arrayNums;
  }
  else if (start === end){
    return arrayNums.push(start);
  }
  else {
    return arrayNums.concat(range(start, end-1)).concat([end]);
  }
};

console.log("I HATE RECURRSION and JS");
console.log(range(1,5));

var sum = function(someArray) {
  if (someArray.length === 1) {
    return someArray[0];
  }
  else {
    var temp = someArray.pop();
    return temp + sum(someArray);
  }
};

console.log(sum([1,2,3]));


var exp = function(a, pow) {
  if (pow === 0) {
    return 1;
  }
  else if (pow === 1) {
    return a;
  }
  else {
    return a * exp(a, pow-1);
  }
};

console.log(exp(2,3));


var fib = function(num) {
  var tempArray = [];
  if (num === 1) {
    return [1];
  }
  else if (num === 2) {
    return [1, 1];
  }
  else if (num > 2){
    tempArray = fib(num-1);
    var num1 = tempArray[tempArray.length-1];
    var num2 = tempArray[tempArray.length-2];
    var num3 = num1 + num2;
    tempArray.push(num3);
    return tempArray;
  }
};

console.log(fib(5));


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

var bSearch = function(someArray, target) {
  bubbleSort(someArray);
  var center = someArray.length/2;
  var midNum = someArray[center];
  var arrayMin = someArray.slice(0, center);
  var arrayMax = someArray.slice(center+1, someArray.length);
  if (target === midNum) {
    return center;
  }
  else if( target > midNum){
    var returnNum = center + 1 + bSearch(arrayMax, target);
    return returnNum;
  }
  else if( target < midNum) {
    return bSearch(arrayMin, target);
  }
};

console.log(bSearch([1, 2, 4, 5, 7, 8, 9, 10], 7));


var makeChange = function(money, coinArray) {
  var change = [];
  var bestChange = [];
  bubbleSort(coinArray);
  if (coinArray.length === 1) {
    while (money > 0) {
      money -= coinArray[0];
      change.push(coinArray[0]);
    }
    return change;
  }
  else {
    var currentCoin = coinArray.pop();

    while (money < currentCoin){
      if (coinArray.length === 1 ){
        var currentChange = makeChange(money, coinArray);
        change = change.concat(currentChange);
        break;
      }
      currentCoin = coinArray.pop();
    }

    while (money > currentCoin) {
      money -= currentCoin;
      change.push(currentCoin);
      var bestRemainder = makeChange(money, coinArray);
      change = change.concat(currentChange);
      if (change.length > bestChange.length){
        bestChange = change;
      }
      if (bestChange.length === 0)
      {
        bestChange = change;
      }
    }


    return change;
  }
};

// console.log(makeChange(24, [1, 7, 10]));

console.log("mergesort");
var mergeSort = function(someArray) {
  if (someArray.length <= 1) {
    return someArray;
  }
  else {
    var center = someArray.length/2;
    var arrayMin = someArray.slice(0, center);
    var arrayMax = someArray.slice(center, someArray.length);

    var result = merge(mergeSort(arrayMin), mergeSort(arrayMax));
    return result;
  }
};


var merge = function(left, right) {
  var result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      result.push(right.shift());
    }
    else {
      result.push(left.shift());
    }
  }
  result = result.concat(left).concat(right);
  return result;
};

console.log(mergeSort([3,4,5,12,4,5,2,5,10]));
