var React = require('react');
var Loader = require('../loader/loader');
var Track = require('../track/track');
var SC = require('soundcloud');
import './track-viewer.css';

module.exports = React.createClass({
  displayName: 'track-Viewer',
  getInitialState: function() {
    return {
      isLoading: true
    }
  },
  propTypes: {
    track: React.PropTypes.object,
    scrolledDown: React.PropTypes.bool,
    theme: React.PropTypes.string
  },
  componentDidMount: function() {
    var self = this;

    SC.initialize({
      client_id: this.props.album.scClientId
    });

    SC
      .get("/playlists/" + this.props.album.scPlaylistId)
      .then(function(playlist){
        console.log(playlist);
        self.setState({
          album: playlist,
          title: playlist.title,
          tracks: playlist.tracks,
          description: playlist.description,
          artwork_url: self.__getPlaylistArtworkUrlFromPlaylist(playlist),
          artist_name: playlist.user.username,
          curr_track_index: 0,
          isLoading: false
        });
      });
  },
  getDefaultProps: function() {
    return {
      album: [],
      scrolledDown: false,
      theme: "light"
    }
  },
  __getPlaylistArtworkUrlFromPlaylist: function(playlist) {
    if (typeof playlist.artwork_url === 'string')
      return playlist.artwork_url.replace(/large\.jpg/, 't300x300.jpg')

    if (typeof playlist.tracks[0].artwork_url === 'string')
      return playlist.tracks[0].artwork_url.replace(/large\.jpg/, 't300x300.jpg')

    if (typeof playlist.user.avatar_url === 'string')
      return playlist.user.avatar_url.replace(/large\.jpg/, 't300x300.jpg')
  },
  render: function() {
    var self = this;

    if (this.state.isLoading) {
      return (
        <div className='track-viewer' data-theme='dark' data-loading={true}>
          <Loader />
        </div>
      )
    }

    var style = {
      background: 'url('+this.state.artwork_url+')'
    }

    return (
      <div className='track-viewer item-viewer' data-scrolled-down={this.props.scrolledDown} data-theme={this.props.theme}>
        <div className='track-viewer-overlay'></div>
        <div className='head'>
          <div className='left-container'>
            <div className='track-album-art-container hide-when-loading' style={style}></div>
          </div>
          <div className='right-container'>
            <div className='album-title hide-when-loading'>{this.state.title}</div>
          </div>
        </div>
        {this.state.tracks.map(function(track, i) {
          return (
            <Track
              key={i}
              track={track}
              scClientId={self.props.album.scClientId}/>
          )
        })}
      </div>
    );
  }
})
