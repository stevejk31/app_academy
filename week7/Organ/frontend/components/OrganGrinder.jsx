var React = require('react');
var AppDispatcher = require('../dispatcher.js');
var Note = require('../utils/Note.js');
var TONES = require('../constants/Tones.js');
var KeyStore = require('../stores/KeyStore.js');
var KeyActions = require('../actions/KeyActions.js');
var Key = require('./Key.jsx');


var OrganGrinder = React.createClass({

  getInitialState: function () {
    return { notes: KeyStore.all() };
  },

  _keyChanged: function(){
    this.setState({notes:  KeyStore.all() });
  },

  componentDidMount: function() {
    KeyStore.addListener(this._keyChanged);
  },

  generateKeys: function() {
    return Object.keys(this.state.notes).map(function(el ,i) {
      return (<Key key={i} noteKey={el} note={this.state.notes[el]} />);
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.generateKeys()}

        key note <br/>
        a g3 <br/>
        s   gs3 <br/>
        d   a3 <br/>
        f   as3 <br/>
        g   b3 <br/>
        h   c4 <br/>
        j   cs4 <br/>
        k   d4 <br/>
        l   ds4 <br/>
      </div>
    );
  }

});

window.TONES = TONES;
window.Note = Note;
module.exports = OrganGrinder;
