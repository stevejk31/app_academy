var AppDispatcher = require('../dispatcher');

var KeyActions = {
  keyUp: function(e) {
    var key = e.keyCode;
    AppDispatcher.dispatch({
      actionType: "STOP_TONE",
      keyCode: key
    });
  },
  keyDown: function(e) {
    var key = e.keyCode;
    AppDispatcher.dispatch({
      actionType: "PLAY_TONE",
      keyCode: key
    });
  }
};

module.exports = KeyActions;
