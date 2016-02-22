var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var App = require('./components/app.jsx');
// <Route path="benches/" component={BenchDetail}/>


var routes = (
  <Route path="/" component={App}>
  </Route>
);

$(function() {
  ReactDOM.render(<Router>{routes}</Router>, root);
});


// comment
