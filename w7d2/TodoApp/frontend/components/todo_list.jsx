var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var TodoListItem = require('./todo_list_item.jsx');
var TodoForm = require('./todo_form.jsx');


var TodoList = React.createClass({
  getInitialState: function( ){
    // TodoStore.fetch(); //TODO is this how we do this???
    return ({ todos: []});
  },

  componentDidMount: function(){
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },
  todosChanged: function(){
    this.setState({todos: TodoStore.all()});
  },

  componentWillUnmount: function(){
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  titles: function() {
    var titles = this.state.todos.map(function (todo, i) {
      return <TodoListItem todo={todo} key={i}/>;
    });
    return titles;
  },

  render: function() {
    return (
      <div>
        <div>{this.titles()}</div>
        <TodoForm />
      </div>
    );
  }
});

module.exports = TodoList;
