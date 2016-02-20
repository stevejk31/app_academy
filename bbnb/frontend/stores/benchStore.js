var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');



var _benches = [];
_benches = [
  {lat: 37.775785, lon: -122.445979, description: "NOOOPPPPAAAAA bench" },
{lat: 37.772045, lon: -122.437015, description: "Castro's Best Bench" },
{lat: 37.781899, lon: -122.410426, description: "Prime Market Bench" }];
var BenchStore = new Store(AppDispatcher);

BenchStore.all = function () {
  return _benches.slice(0);
};


module.exports = BenchStore;
