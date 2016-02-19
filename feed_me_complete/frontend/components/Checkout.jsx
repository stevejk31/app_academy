var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Checkout = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function () {
    return {name: '', card: '', address: ''};
  },
  submit: function (e) {
    e.preventDefault();
    //Hit some action creator/webapi util
    console.log(this.state);
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label>Name:</label>
          <input type="text" name="name" valueLink={this.linkState('name')}/>
          <br />
          <label>Card:</label>
          <input type="text" name="card" valueLink={this.linkState('card')}/>
          <br />
          <label>Address:</label>
          <input type="text" name="address" valueLink={this.linkState('address')}/>

          <br />
          <input type="submit" value="Checkout" />
        </form>
      </div>
    );
  }
});

module.exports = Checkout;
