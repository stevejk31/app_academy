var React = require('react');
var BenchIndex = require('../components/benchIndex.jsx');
var Map = require('../components/map.jsx');

var App = React.createClass({

  render: function() {
    return (
      <div>
        hello
        <BenchIndex />
        {this.props.children}
        <Map />
      </div>
    );
  }

});

module.exports = App;
