var React = require('react');
var BenchStore = require('../stores/benchStore.js');
var ApiUtils = require('../utils/utils.js');
var Map = require('../components/map.jsx');




var BenchIndex = React.createClass({
  getInitialState: function() {
    return ({
      benches: BenchStore.all()
    });
  },

  componentDidMount: function() {
    ApiUtils.fetchBenches();
    
    this.BenchStoreListener = BenchStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.BenchStoreListener.remove();
  },

  _onChange: function() {
    this.setState({
      benches: BenchStore.all()
    });
  },

  benches: function() {
    var benches = this.state.benches;
    var tempBenches = [];
    if (benches.length !== 0)
    {
      for (var i = 0; i < benches.length; i++) {
        tempBenches.push(benches[i].description);
      }
      tempBenches.push(<Map benches={this.state.benches}/>);
    }
    return tempBenches;
  },

  render: function() {
    return (
      <div>
        words

        {this.benches()}
      </div>
    );
  }

});

module.exports = BenchIndex;
