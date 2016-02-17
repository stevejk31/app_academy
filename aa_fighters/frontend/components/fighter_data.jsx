var React = require('react'),
    FighterStore = require('../stores/fighter_store.js');

var FighterData = React.createClass({
  render: function(){
    var fighter = FighterStore.find(this.props.name);

    if(!fighter){
      return <div>~~~No Fighter Selected~~~</div>;
    }

    var powerStyle = {
      width:100,
      height:100,
      backgroundColor: fighter.power,
      color: "#FFFFFF",
      textShadow: "1px 1px 3px #000000",
      padding: "5px"
    };

    return(
      <div>
        <h1>{fighter.name}</h1>
        <div style={powerStyle}>
          Power
        </div>
        <div>{fighter.history}</div>
      </div>
    )
  }
});

module.exports = FighterData;
