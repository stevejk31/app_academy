var React = require('react');
var BenchStore = require('../stores/benchStore.js');
var ApiUtils = require('../utils/utils.js');

var Map = React.createClass({
  componentDidMount: function(){
    var mapDOMNode = this.refs.map;

    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    ApiUtils.fetchBenches();
    this.BenchStoreListener = BenchStore.addListener(this._onChange);
    this.listenForMove();
    this.props.benches.forEach(this.addBench);
  },
  addBench: function (bench) {
    var pos = new google.maps.LatLng(bench.lat, bench.lon),
    marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });
    marker.addListener('click', function () {
      alert("clicked on: " + bench.description);
    });
  },
  listenForMove: function(){
    var that = this;
    google.maps.event.addListener(this.map, 'idle', function() {
      var bounds = that.map.getBounds();
    });
  },
  _onChange: function() {

  },
  render: function() {
    return (
      <div className="map" ref="map">
      </div>
    );
  }

});

module.exports = Map;
