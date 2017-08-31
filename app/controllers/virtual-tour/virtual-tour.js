var React = require('react');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var ImageViewer = require('../../components/image-viewer');
var RightSidebar = require('../../components/right-sidebar');
var NativeImage = require('../../components/image');
var AppActions = require('../../actions/app-actions');
var $ = require('jquery');
var ls = require('local-storage');
import { Parallax } from 'react-parallax';
require('./virtual-tour.css');

module.exports = React.createClass({
  displayName: 'VirtualTourController',
  pages_loaded: [],
  getInitialState: function() {
    return {
      curr_image_src: null,
      images: {
        console: [],
        main: [],
        vocal_booth: [],
        loft: [],
        bathroom: [],
        people: [],
        misc: []
      }
    };
  },
  componentDidMount: function() {
    document.title = "Litronix - Virtual Tour"
    AppActions.getVirtualTourImages()
      .then(function(o) {
        this.setState({images: o})
      }.bind(this))
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
      <div className='Virtual-Tour-Controller'>
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
          <div className='room template'>
            <div className='room-banner'></div>
            <div className='room-spec-list'>
              <div className='spec'>
                <div className='name'></div>
                <div className='value'></div>
              </div>
            </div>
            <div className='room-item'>
              <img className='img'/>
              <div className='quantity'></div>
              <div className='name'></div>
            </div>
          </div>
          <div className='room console'>
            <div className='room-banner'>
              <div className='title'>Console Room</div>
            </div>
            <div className='image-container'>
              {this.state.images.console.map((image, i) => {
                return (
                  <NativeImage key={i} onTouchTap={this.__handleImageClick} src={image.thumb} full_src={image.src} />
                )
              })}
            </div>
          </div>
          <div className='room main-room'>
            <div className='room-banner'>
              <div className='title'>Main Room</div>
            </div>
            <div className='image-container'>
              {this.state.images.main.map((image, i) => {
                return (
                  <NativeImage key={i} onTouchTap={this.__handleImageClick} src={image.thumb} full_src={image.src} />
                )
              })}
            </div>
          </div>
          <div className='room iso-booth'>
            <div className='room-banner'>
              <div className='title'>Vocal Isolation Booth</div>
            </div>
            <div className='image-container'>
              {this.state.images.vocal_booth.map((image, i) => {
                return (
                  <NativeImage key={i} onTouchTap={this.__handleImageClick} src={image.thumb} full_src={image.src} />
                )
              })}
            </div>
          </div>
          <div className='room loft'>
            <div className='room-banner'>
              <div className='title'>Loft</div>
            </div>
            <div className='image-container'>
              {this.state.images.loft.map((image, i) => {
                return (
                  <NativeImage key={i} onTouchTap={this.__handleImageClick} src={image.thumb} full_src={image.src} />
                )
              })}
            </div>
          </div>
          <div className='room people'>
            <div className='room-banner'>
              <div className='title'>Misc</div>
            </div>
            <div className='image-container'>
              {this.state.images.misc.map((image, i) => {
                return (
                  <NativeImage key={i} onTouchTap={this.__handleImageClick} src={image.thumb} full_src={image.src} />
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
