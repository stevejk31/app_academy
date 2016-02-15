var React = require('react');

var Tabs = React.createClass({
  getInitialState: function(){
    return {tabIndex: 0};
  },

  tabClicked: function (index){
    this.setState({tabIndex: index});
    console.log(this.tabIndex);
  },
  render: function(){
    var displayContent = this.props.tabObjects[this.state.tabIndex]['content'];

    return (
      <div>
        <ul>
          {
            this.props.tabObjects.map(function(tab, index) {
              return (
                <Header
                  key={index}
                  index={index}
                  tabObject={tab}
                  clickCallback={this.tabClicked.bind(this, index)}
                  selectedIndex={this.state.tabIndex}
                />
              );
            }.bind(this))
          }
        </ul>
        <article>
          {displayContent}
        </article>
      </div>
    );
  }
});

var Header = React.createClass({

  render: function() {
    var title = this.props.tabObject.title;

    var className = "";
    if (this.props.selectedIndex === this.props.index) {
      className = "selected";
    }

    return(
        <li
          className={className}
          onClick={this.props.clickCallback}
          >
          {title}
        </li>
    );
  }

});


module.exports = Tabs;
