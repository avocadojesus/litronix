var React = require('react');
var sprintf = require('sprintf-js').sprintf;
var Loader = require('../loader/loader');
var SC = require('soundcloud');
import './album.css';
import {} from 'react-router';
var browserHistory = require('react-router').browserHistory;

module.exports = React.createClass({
  mixins: [],
  displayName: 'Album',
  propTypes: {
    album: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      album: {}
    }
  },
  getInitialState: function() {
    return {
      album: {},
      title: '',
      description: '',
      artwork_url: '',
      curr_track_index: 0,
      isLoading: true
    };
  },
  componentDidMount: function() {
    var self = this;

    SC.initialize({
      client_id: this.props.album.scClientId
    });

    SC
      .get("/playlists/" + this.props.album.scPlaylistId)
      .then(function(playlist){
        self.setState({
          album: playlist,
          title: playlist.title,
          description: playlist.description,
          artwork_url: self.__getPlaylistArtworkUrlFromPlaylist(playlist),
          artist_name: playlist.user.username,
          curr_track_index: 0,
          isLoading: false
        });
      });
  },
  __getPlaylistArtworkUrlFromPlaylist: function(playlist) {
    if (typeof playlist.artwork_url === 'string')
      return playlist.artwork_url.replace(/large\.jpg/, 't300x300.jpg')

    if (typeof playlist.user.avatar_url === 'string')
      return playlist.user.avatar_url.replace(/large\.jpg/, 't300x300.jpg')
  },
  __handleClick: function() {
    // console.log(this.props.album.scPlaylistId)
    browserHistory.push('/albums/' + this.props.album.scPlaylistId)
  },
  render: function() {
    // generate album artwork styling
    var style = {
      background: 'url('+this.state.artwork_url+')'
    }

    if (this.state.isLoading) {
      return (
        <div className='album' data-loading={true}>
          <Loader />
        </div>
      )
    }

    return (
      <div className='album' data-loading={false} onClick={this.__handleClick}>
        <div className='album-art-container hide-when-loading' style={style}></div>
        <div className='txt-container'>
          <div className='album-title hide-when-loading'>{this.state.title}</div>
          <div className='album-artist-name hide-when-loading'>{this.state.artist_name}</div>
        </div>
      </div>
    )
  }
})
