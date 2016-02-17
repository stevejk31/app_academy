var React = require('react');
var AppDispatcher = require('../dispatcher.js');
var Note = require('../utils/Note.js');
var TONES = require('../constants/Tones.js');

var OrganGrinder = React.createClass({

  render: function() {
    return (
      <div>
        stuff
      </div>
    );
  }

});

window.TONES= TONES;
window.Note = Note;
module.exports = OrganGrinder;
