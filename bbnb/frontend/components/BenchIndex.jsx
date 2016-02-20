var React = require('react');
var BenchStore = require('../stores/benchStore.js');
var ApiUtils = require('../utils/utils.js');
var BenchIndex = React.createClass({
  getInitialState: function() {
    return ({
      benches: BenchStore.all()
    });
  },

  componentDidMount: function() {
    ApiUtils.fetchBenches();
    this.BenchStoreListern = BenchStore.addListener(this._updateBenches);
  },

  _updateBenches: function() {
    this.setState({benches: BenchStore.all()});
  },

  render: function() {
    return (
      <div>Bench Index</div>
    );
  }

});

module.exports = BenchIndex;
