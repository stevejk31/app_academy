var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher');
var TONES = require('../constants/Tones.js');
var _keys = {};
var KeyStore = new Store(AppDispatcher);


KeyStore.all = function() {
   return _keys;
};

KeyStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "PLAY_TONE":
      addTone(payload.keyCode);
      KeyStore.__emitChange();
      break;
    case "STOP_TONE":
      removeTone(payload.keyCode);
      KeyStore.__emitChange();
      break;
  }
};

function addTone(keyCode) {
  _keys[TONES[keyCode].id] = TONES[keyCode].note;
}

function removeTone(keyCode) {
  delete _keys[TONES[keyCode].id];
}

module.exports = KeyStore;
