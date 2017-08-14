var React = require('react');
var VideoViewer = require('../../components/video-viewer');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var videos = require('../../config/videos');
var playlists = require('../../config/playlists');
var RightSidebar = require('../../components/right-sidebar');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;
var StaticHeader = require('../../components/static-header')
import "./videos.css"

module.exports = React.createClass({
  displayName: 'VideosController',
  pages_loaded: [],
  getInitialState: function() {
    return {
      scrolledDown: false,
      scrolledPastHeader: true,
    };
  },
  componentDidMount: function() {
    document.title = "Space + Time - Videos"
    var self = this;
  },
  componentDidUpdate: function() {

  },
  componentWillUnmount: function() {

  },
  render: function() {
    var self = this

    return (
      <div className='Videos-Controller'>
        <RightSidebar />
        <Header
          visible={true}
          activeLink={"videos"} />
        <div
          className='videos-main-container'
          data-is-scrolled-past-header={this.state.scrolledPastHeader}>
          <StaticHeader className="outer-container" activeLink='videos'/>
          <VideoViewer
            className="outer-container"
            scrolledDown={this.state.scrolledDown}
            videos={videos}
            theme={'default'} />
          <Footer />
        </div>
      </div>
    )
  }
})
