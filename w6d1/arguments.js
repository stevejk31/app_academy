var sum = function(){
  var total = 0;
  for(var i = 0; i < arguments.length; i++){
    total += arguments[i];
  }
  return total;
};

Function.prototype.myBind = function(context){
  var fn = this;
  var bindargs = Array.prototype.slice.call(arguments, 1);
  return function(){
    var callTimeArgs = Array.prototype.slice.call(arguments);
    bindargs = bindargs.concat(callTimeArgs);
    console.log(bindargs);
    return fn.apply(context, bindargs);
  };
};

// markov.says.myBind(breakfast)("meow", "a tree");
//
// var boundMarkov = markov.says.myBind(breakfast);
// // do something
// boundMarkov("meow", "a tree");

var curriedSum = function(numArgs) {
  var numbers = [];
  var _curriedSum = function(singNum) {
    numbers.push(singNum);
    if (numbers.length === numArgs) {
      var newSum = 0;
      for(var j = 0; j < numArgs; j++){
        newSum += numbers[j];
      }
      return newSum;
    }
    else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};
