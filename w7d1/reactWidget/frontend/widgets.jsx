var React = require('react');
var ReactDOM = require('react-dom');
var Tabs = require('./tabs.jsx');
var Clock = require('./clock.jsx');
var Weather = require('./weather.jsx');
var Autocomplete = require('./autocomplete.jsx');

var tabObjects = [
  {title: "Hello", content: "It's Me"},
  {title: "Title2", content: "content2"},
  {title: "Title3", content: "content3"},
  {title: "Title4", content: "content4"},
  {title: "Title5", content: "content5"}
];

var autoCompleteNames = [
  "aab",
  "abc",
  "bba",
  "bcd",
  "cde",
  "cgh",
  "rafael",
  "steve"
];

var Widgets = React.createClass({
  render: function () {
    return (
      <div>
          <div>THIS IS A WIDGET</div>
          <Tabs tabObjects={tabObjects} />
          <Clock />
          <Weather />
          <Autocomplete names={autoCompleteNames} />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Widgets />, document.getElementById("root"));
});
