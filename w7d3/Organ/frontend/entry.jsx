var ReactDOM = require('react-dom');
var React = require('react');
var OrganGrinder = require('./components/OrganGrinder.jsx');
var KeyListener = require('./utils/KeyListener.js');
var KeyStore = require('./stores/KeyStore.js');


document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  ReactDOM.render(<OrganGrinder />, root);
  KeyListener.onKeyDown();
  KeyListener.onKeyUp();
});
