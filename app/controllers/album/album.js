var React = require('react');
var TrackViewer = require('../../components/track-viewer/track-viewer');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var albums = require('../../config/albums');
var StaticHeader = require('../../components/static-header')
var RightSidebar = require('../../components/right-sidebar');
var AudioPlayer = require('../../components/audio-player');
var $ = require('jquery');
require('./album.css');

module.exports = React.createClass({
  displayName: 'AlbumController',
  getInitialState: function() {
    var album_id = this.props.params.splat
    var album = albums.filter(function(album) {
      if (album.scPlaylistId === album_id) return true;
      return false;
    })[0];

    return {
      scrolledDown: false,
      album: album,
      scrolledPastHeader: false
    };
  },
  componentDidMount: function() {
    document.title = "Litronix - Listen"
    var self = this;
    $(window).unbind('scroll.viewScroll')
    $(window).bind('scroll', function(e) {
      if (!self.isMounted()) return true;
      if ($(e.target).scrollTop() > 0) {
        self.setState({scrolledDown: true})
      } else {
        self.setState({scrolledDown: false})
      }
    })

    if (window.lastScrollTop) {
      // note: this timeout is put in place to correct a strange routing mechanism
      // within react. Probably wont be necessary anymore post-upgrade
      setTimeout(function() {
        $(document.body).scrollTop(window.lastScrollTop)
      })
    }
  },
  componentWillUnmount: function() {
    $(window).unbind('scroll.viewScroll')
  },
  __handleHeroScrollPass: function() {
    this.setState({scrolledPastHeader: true})
  },
  __handleHeroScrollEnter: function() {
    this.setState({scrolledPastHeader: false})
  },
  render: function() {
    var self = this;
    return (
      <div className='Album-Controller'>
        <RightSidebar />
        <div
          className='album-main-container'
          data-is-scrolled-past-header={this.state.scrolledPastHeader} >
          <Header
            visible={true}
            activeLink='albums' />
          <div className='matt-costa-album-banner'></div>
          <TrackViewer
            theme={"dark"}
            scrolledDown={this.state.scrolledDown}
            album={this.state.album} />
          <Footer />
        </div>
      </div>
    )
  }
})
