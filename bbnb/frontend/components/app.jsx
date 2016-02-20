var React = require('react');

var App = React.createClass({

  render: function() {
    return (
      <div>
        hello
        {this.props.children}
      </div>
    );
  }

});

module.exports = App;
