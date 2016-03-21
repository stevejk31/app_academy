var ReactDOM = require('react-dom');
var React = require('react');
var TodoList = require('./components/todo_list.jsx');

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<TodoList/>,
    document.getElementById('root'));
});

window.todoStore = require('./stores/todo_store.js');
