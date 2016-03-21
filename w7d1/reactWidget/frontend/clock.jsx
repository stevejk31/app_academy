var React = require('react');

var Clock = React.createClass({
  getInitialState: function() {
    return {now: new Date()};
  },

  tick: function() {
    this.setState({now: new Date()});
  },

  componentDidMount: function() {
    this.handle = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.handle);
  },

  render: function () {
    return (
      <div>
        <span>{this.state.now.getHours()}</span>
        <span>:</span>
        <span>{this.state.now.getMinutes()}</span>
        <span>:</span>
        <span>{this.state.now.getSeconds()}</span>
      </div>
    );
  }


});


module.exports = Clock;
