var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/App');
var Order = require('./components/Order');
var Restaurant = require('./components/Restaurant');
var Checkout = require('./components/Checkout');

var routes = (
  <Route component={App} path="/">
    <IndexRoute component={Checkout} />
    <Route component={Restaurant} path="restaurants/:id">
      <Route component={Order} path="order" />
    </Route>
    <Route component={Checkout} path="checkout" />
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  var content = document.querySelector('#content');
  ReactDOM.render(<Router>{routes}</Router>, content);
});
//
// window.addEventListener("hashchange", function () {
//   if (location.hash.slice(1).indexOf("restaurants") === 1) {
//     var id = parseInt(location.hash.slice(1)[13]);
//     ReactDOM.render(<App><Restaurant params={{id: id}}/></App>, content);
//   }
// });

