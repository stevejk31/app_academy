var React = require('react');

var Weather = React.createClass({

  getInitialState: function () {
    return {weather: "not set"};
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.getWeather(position.coords.latitude, position.coords.longitude);
    }.bind(this));
  },

  // getLocation: function (callback) {
  //
  // },

  getWeather: function(lat, lon) {
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=645c5d39c7603f17e23fcaffcea1a3c1',
        true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var resp = request.responseText;
        that.setState({weather: resp});
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  },

  render: function () {
    // this.getWeather();
    return (
      <div>{this.state.weather}</div>
    );
  }

});

module.exports = Weather;
