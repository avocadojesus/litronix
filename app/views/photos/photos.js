var React = require('react');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var ImageViewer = require('../../components/image-viewer');
var RightSidebar = require('../../components/right-sidebar');
var NativeImage = require('../../components/image');
var $ = require('jquery');
var ls = require('local-storage');
require('./photos.css');

module.exports = React.createClass({
  displayName: 'PhotosView',
  pages_loaded: [],
  getInitialState: function() {
    return {
      curr_image_src: null,
      images: [
        {src: "/img/pump-back-cover.png", label: "Art Design by Chris Friend"},
        {src: "/img/pump-the-gas-front-cover-large.png", label: "Original Photo by Dan Busta\nArt Design and Photo Manipulation by Chris Friend"},
        {src: "/img/maggot-cover.png", label: "Art Hand Drawn by Chris Friend"},
        {src: "/img/new-age-cover.png", label: "Art Design by Litronix and Avi Buffalo"}
      ]
    };
  },
  componentDidMount: function() {
    document.title = "Litronix - Photos"
  },
  componentWillUnmount: function() {

  },
  __loadData: function(page) {
    var self = this

  },
  __handleStoreUpdates: function() {

  },
  __imagesArray: function() {
    var arr = []
    for (var i in this.state.images) {
      arr = arr.concat(this.state.images[i])
    }
    return arr;
  },
  __handleImageClick: function(e) {
    var src = $(e.target).closest('.native-image').attr('data-src')
    console.log(src);
    this.setState({
      curr_image_src: src
    })
  },
  __getPrevImage: function(src) {
    var images = this.__imagesArray()
    for (var i in images) {
      var curr_image = images[i]
      if (curr_image.src == src) {
        if ((i * 1) - 1 < 0) return images[images.length - 1]
        return images[ (i * 1) - 1]
      }
    }
  },
  __getNextImage: function(src) {
    var images = this.__imagesArray()
    for (var i in images) {
      var curr_image = images[i]
      if (curr_image.src == src) {
        if ((i * 1) + 1 >= images.length) return images[0];
        return images[ (i * 1) + 1]
      }
    }
  },
  __handleNextImageClick: function() {
    this.setState({
      curr_image_src: this.__getNextImage(this.state.curr_image_src).src
    })
  },
  __handlePrevImageClick: function() {
    this.setState({
      curr_image_src: this.__getPrevImage(this.state.curr_image_src).src
    })
  },
  __handleImageViewerClose: function() {
    this.setState({
      curr_image_src: null
    })
  },
  render: function() {
    var self = this
    return (
      <div className='Photos-View'>
        <RightSidebar />
        <ImageViewer
          img_src={this.state.curr_image_src}
          onNextClick={this.__handleNextImageClick}
          onPrevClick={this.__handlePrevImageClick}
          onClose={this.__handleImageViewerClose}
          visible={this.state.curr_image_src ? true : false} />
        <Header
          visible={true}
          activeLink={"tour"} />
        <div
          className='main-container outer-container'
          data-is-scrolled-past-header={true} >
          <div className='room console'>
            <div className='room-banner'>
              <div className='title'>Photos</div>
            </div>
            <div className='image-container'>
              {this.state.images.map((image, i) => {
                return (
                  <NativeImage key={i} onTouchTap={this.__handleImageClick} src={image.src} />
                )
              })}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
})
