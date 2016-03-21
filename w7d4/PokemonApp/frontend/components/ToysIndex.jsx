var React = require('react');
var ToysIndexItem = require('./ToyIndexItem.jsx');

var ToysIndex = React.createClass({

  render: function() {
    var output;
    if (this.props.toys !== undefined) {
      output = this.props.toys.map(function(toy, idx){
        return <ToysIndexItem key={idx} toy={toy}/>;
      });
    } else {
      output = "loading";
    }
    return (
      <div>
        <h3>ToyIndex</h3>
        <ul>
          {output}
        </ul>
      </div>
    );
  }
});

module.exports = ToysIndex;
