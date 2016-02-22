var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');



var _benches = {};
var BenchStore = new Store(AppDispatcher);

BenchStore.all = function () {
  var benches = [];
  Object.keys(_benches).forEach(function(idx){
   benches.push(_benches[idx]);
  });
  console.log("store all function");
  return benches;
};

BenchStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "BENCHES_RECEIVED":
      resetBenches(payload.benches);
      BenchStore.__emitChange();
      break;
  }
};

var resetBenches = function(benches) {
  _benches = {};
  for (var i = 0; i < benches.length; i++) {
    _benches[benches[i].id] = benches[i];
  }
  console.log("benches are being loaded");
  console.log(_benches);
};

module.exports = BenchStore;
