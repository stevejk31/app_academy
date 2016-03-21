var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var DoneButton = React.createClass({

  handleDone: function () {
    TodoStore.toggleDone(this.props.todo.id);
  },

  render: function() {
    var done = "Done!";
    if (this.props.todo.done){
      done = "No Done?";
    }
    return (
      <button onClick={this.handleDone}>{done}</button>
    );
  }

});

module.exports = DoneButton;
