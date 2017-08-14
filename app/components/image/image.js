var React = require('react')
var AppActions = require('../../actions/app-actions')
var Loader = require('../loader')
var $ = require('jquery')
import './image.css'

module.exports = React.createClass({
  displayName: 'Image',
  propTypes: {
    src: React.PropTypes.string,
    full_src: React.PropTypes.string,
    onTouchTap: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      src: {},
      onTouchTap: function() {}
    }
  },
  getInitialState: function() {
    return {
      img_loaded: null
    }
  },
  componentDidMount: function() {
    this.__loadImage();
  },
  __loadImage: function() {
    var self = this
    if (!this.props.src) return false;

    $("<img/>")
        .attr("src", this.props.src)
        .on('load', function() {
          self.setState({img_loaded: true})
          console.log("loaded");
        });
  },
  render: function() {
    return (
      <div
        className='native-image'
        data-is-loading={!this.state.img_loaded}
        onTouchTap={this.props.onTouchTap}
        data-src={this.props.full_src}>
        {
          !this.state.img_loaded &&
          <Loader />
        }
        {
          this.state.img_loaded &&
          <div
            className='img'
            style={{backgroundImage: 'url(' + this.props.src + ')'}}>
          </div>
        }
      </div>
    )
  }
})
