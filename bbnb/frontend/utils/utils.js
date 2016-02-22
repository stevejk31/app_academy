var BenchActions = require('../actions/benchActions.js');


var ApiUtils = {
  fetchBenches: function () {
    $.ajax({
      url: "api/benches",
      type: "GET",
      success: function(benches) {
        BenchActions.receiveAllBenches(benches);
      }
    });
    console.log("utils");
  },
};

module.exports = ApiUtils;
