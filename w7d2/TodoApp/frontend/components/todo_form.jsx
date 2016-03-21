var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoForm = React.createClass({

  getInitialState: function () {
    return (
      {title:"", body:""}
    );
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var title = this.state.title;
    var body = this.state.body;
    var todoListItem = {todo: { title: title, body: body } };
    TodoStore.create(todoListItem);
    this.setState({title:"", body:""});
  },

  updateTitle: function (e) {
    this.setState({title: e.target.value});
  },

  updateBody: function (e) {
    this.setState({body: e.target.value});
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="input-group">
        Title: <input type="text"
                      value={this.state.title}
                      placeholder="title"
                      onChange={this.updateTitle}/>
        <br/>
        Body: <input type="text"
                      value={this.state.body}
                      placeholder="body"
                      onChange={this.updateBody}/>
        <br/>
        <input type="submit" value="New Todo"/>
      </form>
    );
  }

});

module.exports = TodoForm;
