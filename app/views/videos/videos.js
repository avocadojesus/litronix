var React = require('react');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var ImageViewer = require('../../components/image-viewer');
var RightSidebar = require('../../components/right-sidebar');
var NativeImage = require('../../components/image');
var $ = require('jquery');
var ls = require('local-storage');
require('./videos.less');

module.exports = React.createClass({
  displayName: 'VideosView',
  pages_loaded: [],
  getInitialState: function() {
    return {

    };
  },
  componentDidMount: function() {
    document.title = "Litronix - Videos"
  },
  componentWillUnmount: function() {

  },
  __loadData: function(page) {
    var self = this

  },
  __handleStoreUpdates: function() {

  },
  render: function() {
    var self = this
    return (
      <div className='Videos-View'>
        <RightSidebar />
        <Header
          visible={true}
          activeLink={"videos"} />
        <div
          className='main-container outer-container'
          data-is-scrolled-past-header={true} >
          <div className='coming-soon-message'>Videos Coming Soon...</div>
        </div>
        <Footer />
      </div>
    )
  }
})
