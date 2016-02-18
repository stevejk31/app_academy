var KeyActions = require("../actions/KeyActions.js");

var KeyListener = {
  onKeyDown: function() {
    $(document).on("keydown", KeyActions.keyDown);

  },
  onKeyUp: function() {
    $(document).on("keyup", KeyActions.keyUp);

  }
};

module.exports = KeyListener;
