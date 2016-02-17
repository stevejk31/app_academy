var ReactDOM = require('react-dom');
var React = require('react');
var OrganGrinder = require('./components/OrganGrinder.jsx');

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  ReactDOM.render(<OrganGrinder />, root);
});
