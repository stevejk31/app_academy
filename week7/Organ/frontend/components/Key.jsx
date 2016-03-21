var React = require('react');

var Key = React.createClass({

  componentDidMount: function() {
    this.props.note.start();
  },

  componentWillUnmount: function() {
    this.props.note.stop();
  },

  render: function() {
    return (
      <div>
        {this.props.noteKey}
      </div>
    );
  }

});

module.exports = Key;
