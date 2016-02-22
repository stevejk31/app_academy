var AppDispatcher = require('../dispatcher.js');

var BenchActions = {
  receiveAllBenches: function(benches){
    AppDispatcher.dispatch({
      actionType: "BENCHES_RECEIVED",
      benches: benches
    });
    console.log("actions");
  }

};
module.exports = BenchActions;
