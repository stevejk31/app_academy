var React = require('react');
var BenchIndex = require('../components/benchIndex.jsx');

var App = React.createClass({

  render: function() {
    return (
      <div>
        hello
        <BenchIndex />
        {this.props.children}
      </div>
    );
  }

});

module.exports = App;
