console.log("I'm afraid I'm going to stab my jar.");

var readLine = require('readline');
var reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      madeAnySwaps = false;
      innerBubbleSortLoop(arr, 0, madeAnySwaps, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}

function askIfGreaterThan(el1, el2, callback) {
  reader.question("Is " + el1 + " greater than " + el2 + "?", function (answer) {
    switch (answer) {
      case "yes":
        callback(true);
        break;
      case "no":
        callback(false);
        break;
      default:
        console.log("You're a stupid function!");
        askIfGreaterThan(el1, el2, callback);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop){
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
      if (isGreaterThan) {
        var hold = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = hold;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

function completion(arr){
  console.log(arr);
}

absurdBubbleSort([234,234,7,2,9,234,5,8976,24], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
