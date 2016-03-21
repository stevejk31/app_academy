var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var DoneButton = require('./done_button.jsx');

var TodoDetailView = React.createClass({

  render: function() {
    return (
      <div>
        <div className="todo-item-body">{this.props.todo.body}</div>
        <button onClick={this.props.buttonHandler}>Delete Note</button>
      </div>
    );
  }

});

module.exports = TodoDetailView;
