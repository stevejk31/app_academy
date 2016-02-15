var React = require('react');

var Autocomplete = React.createClass({
  getInitialState: function () {
    return {
      names: this.props.names,
      inputValue: ""
    };
  },

  handleChange: function(event) {
    this.setState({inputValue: event.target.value});
  },

  selectComplete: function (name) {
    this.setState({inputValue: name});
  },

  render: function() {

    var acnames = this.state.names;
    acnames = acnames.filter(function(el){
        return el.match(this.state.inputValue);
      }.bind(this));

    return (
      <div>
        <div>autocomplete</div>
        <input
            type="text"
            onChange={this.handleChange}
            value={this.state.inputValue}
            placeholder="type something!!!"
          />
        <ul>
          {
            acnames.map(function (name, index) {
              return (
                <li
                  key={index}
                  onClick={this.selectComplete.bind(this, name)}
                >
                  {name}
                </li>
              );
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});

module.exports = Autocomplete;
