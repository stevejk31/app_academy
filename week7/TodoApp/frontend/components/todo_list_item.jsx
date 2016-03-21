var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var DoneButton = require('./done_button.jsx');
var TodoDetailView = require('./todo_detail_view.jsx');

var TodoListItem = React.createClass({
  getInitialState: function () {
    return (
      { collapsed: true }
    );
  },

  handleDestroy: function () {
    TodoStore.destroy(this.props.todo.id);
  },

  handleClick: function(){
    var collapsed = true;
    if (this.state.collapsed){
      collapsed = false;
    }
    this.setState(
      { collapsed: collapsed }
    );
  },

  detailView: function(){
    var view =  <TodoDetailView todo={this.props.todo}
                                buttonHandler={this.handleDestroy} />;
    if (this.state.collapsed){
      view = null;
    }
    return view;
  },

  render: function() {
    return (
      <div key={this.props.key} className="todo-item">
        <div className="todo-item-title"
             onClick={this.handleClick}>
          {this.props.todo.title}
        </div>
        {this.detailView()}
        <DoneButton todo={this.props.todo}/>
      </div>
    );
  }

});

module.exports = TodoListItem;
