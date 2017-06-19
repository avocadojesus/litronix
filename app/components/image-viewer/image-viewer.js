var React = require('react');
var ReactDOM = require('react-dom');
import './image-viewer.css';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
var $ = require('jquery')

module.exports = React.createClass({
  displayName: 'Image-Viewer',
  getInitialState: function() {
    return {
      true_img_height: 400,
      true_img_width: 900,
    }
  },
  componentDidMount: function() {
    this.$img_node = ReactDOM.findDOMNode(this.refs.img)
  },
  propTypes: {
    img_src: React.PropTypes.string,
    photo_credits: React.PropTypes.string,
    visible: React.PropTypes.bool,
    onNextClick: React.PropTypes.func,
    onPrevClick: React.PropTypes.func,
    onClose: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      img_src: null,
      visible: false,
      onNextClick: function() {},
      onPrevClick: function() {},
      onClose: function() {},
    }
  },
  __handleImageLoad: function(e) {
    var self = this
    console.log("image loaded");
    self.setState({
      true_img_width: e.target.width,
      true_img_height: e.target.height,
    })
  },
  __setImgDimensions: function() {
    var self = this
    var pic_real_width, pic_real_height;
    $("<img/>") // Make in memory copy of image to avoid css issues
        .attr("src", this.props.img_src)
        .load(function() {
          console.log("LOADED", this.height);

        });
  },
  __handleClick: function(e) {
    if (
      !$(e.target).closest('.arrow-left').length &&
      !$(e.target).closest('.arrow-right').length &&
      !$(e.target).closest('.image').length
    ) {
      console.log("closing");
      this.props.onClose();
    }
  },
  render: function() {
    return (
      <div data-true-img-height={this.state.true_img_height} data-visible={this.props.visible.toString()} className={'image-viewer ' + (this.props.className || "")} >
        <div className='image-viewer-overlay'></div>
        <div className='content' onTouchTap={this.__handleClick}>
          <ArrowLeft
            onTouchTap={this.props.onPrevClick}
            className='arrow-left'
            color="white"
            style={{width: '48px', height: '48px'}}>
          </ArrowLeft>
          <div className='image-container'>
            <img
              ref='img'
              onLoad={this.__handleImageLoad}
              src={this.props.img_src}
              className='image'/>
            <div className='photo-credits'>{this.props.photo_credits}</div>
          </div>
          <ArrowRight
            onTouchTap={this.props.onNextClick}
            className='arrow-right'
            color="white"
            style={{width: '48px', height: '48px'}}>
          </ArrowRight>
        </div>
      </div>
    );
  }
})
