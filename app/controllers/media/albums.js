var React = require('react');
var AlbumViewer = require('../../components/album-viewer/album-viewer');
var VideoViewer = require('../../components/video-viewer');
var TrackViewer = require('../../components/track-viewer');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var albums = require('../../config/albums');
var videos = require('../../config/videos');
var playlists = require('../../config/playlists');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;
var StaticHeader = require('../../components/static-header')
import "./media.css"

module.exports = React.createClass({
  displayName: 'MediaController',
  pages_loaded: [],
  getInitialState: function() {
    return {
      scrolledDown: false,
      scrolledPastHeader: true,
    };
  },
  componentDidMount: function() {
    document.title = "Space + Time - Media"
    var self = this;
  },
  componentDidUpdate: function() {

  },
  componentWillUnmount: function() {

  },
  render: function() {
    var self = this

    return (
      <div className='Media-Controller'>
        <Header
          visible={true} />
        <div
          className='media-main-container'
          data-is-scrolled-past-header={this.state.scrolledPastHeader}>
          <StaticHeader className="outer-container" activeLink='media'/>
          <AlbumViewer
            className="outer-container"
            scrolledDown={this.state.scrolledDown}
            albums={albums}
            theme={'default'} />
          <VideoViewer
            className="outer-container"
            scrolledDown={this.state.scrolledDown}
            videos={videos}
            theme={'default'} />
          {playlists.map(function(playlist, i) {
            return (
              <TrackViewer album={playlist} key={i} />
            )
          })}
          <Footer />
        </div>
      </div>
    )
  }
})
