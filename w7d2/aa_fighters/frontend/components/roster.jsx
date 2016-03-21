var React = require('react');

//components
var FighterForm = require('./fighter_form.jsx'),
    FighterData = require('./fighter_data.jsx');

//store
var FighterStore = require('../stores/fighter_store.js');

var Roster = React.createClass({
  getInitialState: function(){
    return {
      inputVal: "",
      fighters: FighterStore.all()
    }
  },

  componentDidMount: function(){
    FighterStore.addChangeHandler(this.updateFighter);
    FighterStore.fetch();
  },

  componentWillUnmount: function(){
    FighterStore.removeChangeHandler(this.updateFighter);
  },

  updateFighter: function(){
    this.setState({ fighters: FighterStore.all() });
  },

  matches: function(){
    var filtered = this.state.fighters.filter(function(f){
      if(f.name.indexOf(this.state.inputVal) !== -1){
        return true;
      }
    }.bind(this));

    return filtered;
  },

  //Input Handlers
  handleInput: function(e){
    this.setState({ inputVal: e.target.value });
  },

  render: function(){
    var filteredNames = this.matches().map(function(fighter, idx){
        var boldClass = (fighter.name === this.state.inputVal) ? "bold" : "";

        return(<li key={idx} className={boldClass}>{fighter.name}</li>);
      }, this);

    return(
      <div>
        <FighterForm/>

        <hr></hr>

        <h1>Pick a Fighter</h1>
        <input value={this.state.inputVal} onChange={this.handleInput} type="text"/>
        <ul>{filteredNames}</ul>

        <hr></hr>

        <FighterData name={this.state.inputVal} />
      </div>
    )
  }
});

module.exports = Roster;
