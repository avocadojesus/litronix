var React = require('react');
var ReactDOM = require('react-dom');
var Loader = require('../loader/loader');
var SC = require('soundcloud');
var $ = require('jquery')
import './audio-player.css';
var PlayIcon = require('material-ui/lib/svg-icons/av/play-circle-outline')
var PauseIcon = require('material-ui/lib/svg-icons/av/pause-circle-outline')
var SkipNext = require('material-ui/lib/svg-icons/av/skip-next')
var SkipPrevious = require('material-ui/lib/svg-icons/av/skip-previous')
var VolumeMute = require('material-ui/lib/svg-icons/av/volume-mute')
var ArrowDown = require('material-ui/lib/svg-icons/hardware/keyboard-arrow-down')
var ArrowUp = require('material-ui/lib/svg-icons/hardware/keyboard-arrow-up')
var AppDispatcher = require('../../dispatchers/app-dispatcher')
var app_config = require('../../config/app')
var AppActions = require('../../actions/app-actions')
var Promise = require('bluebird')

module.exports = React.createClass({
  displayName: 'audio-player',
  getInitialState: function() {
    return {
      visible: false,
      is_playing: false,
      is_muted: false,
      platform: 'soundcloud',
      soundcloud_track_id: null,
      stream_url: null,
      artwork_url: null,
      artist_name: null,
      album_name: null,
      track_name: null,
      progress: null,
      volume: 80,
      expanded: true,
      was_interrupted: false
    }
  },
  propTypes: {
    scClientId: React.PropTypes.string
  },
  componentDidMount: function() {
    var self = this;
    this.$audio_node = ReactDOM.findDOMNode(this.refs.audio);
    SC.initialize({
      client_id: app_config.soundcloud_client_id
    });

    this.$audio_node.addEventListener('timeupdate', function(e) {
      var percent = (e.target.currentTime / ReactDOM.findDOMNode(self.refs.audio).duration) * 100
      AppActions.audioProgressUpdate(self.state.soundcloud_track_id, percent)
    });

    AppDispatcher.register(function(payload){
      switch (payload.action.actionType) {
        case "AUDIO_PROGRESS_UPDATE":
          if (payload.action.track_id === self.state.soundcloud_track_id && self.state.soundcloud_track_id) {
            if (payload.action.update_duration) {
              self.$audio_node.currentTime = (self.$audio_node.duration * (payload.action.progress / 100)).toFixed(2);
            } else {
              self.setState({progress: payload.action.progress})
            }
          }
          break;
        case "AUDIO_VOLUME_UPDATE":
          self.setState({volume: payload.action.volume})
          break;
        case "AUDIO_SET_TRACK_FROM_SOUNDCLOUD":
          self.setState({visible: true})
          self.__setSoundcloudTrack(payload.action.track_id);
          break;
        case "AUDIO_PLAY":
          self.setState({ is_playing: true });
          break;
        case "AUDIO_PAUSE":
          self.setState({ is_playing: false });
          break;
        case "AUDIO_MUTE":
          self.setState({ is_muted: payload.action.mute });
          break;
        case "PAUSE_ALL_MEDIA":
          if (self.state.is_playing) {
            self
              .fadeOut()
              .then(() => {
                self.setState({
                  was_interrupted: true,
                  is_playing: false
                });
              })
          }
          break;
        case "RESUME_ALL_MEDIA":
          if (self.state.was_interrupted) {
            self.setState({
              is_playing: true,
              was_interrupted: false
            });
            self.fadeIn()
          }
          break;
      }
    });
  },
  componentDidUpdate: function(prev_props, prev_state) {
    var self = this

    // if stream url is updated, force the audio to reload
    if (prev_state.stream_url !== this.state.stream_url) {
      document.querySelector('#audio-src').src = this.state.stream_url;
      this.$audio_node.load()
    }

    // if volume is updated, adjust the volume of the audio node
    if (this.state.volume !== prev_state.volume) {
      this.$audio_node.volume = (this.state.volume / 100);
    }

    // if mute is updated, adjust the mute property of the audio node
    if (this.state.is_muted !== prev_state.is_muted) {
      if (this.state.is_muted) {
        this
          .fadeOut()
          .then(function() {
            self.$audio_node.muted = true
          })
      } else {
        self.$audio_node.muted = false
        this.fadeIn()
      }
    }

    if (this.state.is_playing) {
      this.$audio_node.play()
    }

    if (!this.state.is_playing) {
      this.$audio_node.pause()
    }
  },
  fadeOut: function() {
    var self = this
    return new Promise(function(accept, reject) {
      $(this.$audio_node).animate({volume: 0}, 1500, function() {
        return accept()
      })
    }.bind(this))
  },
  fadeIn: function() {
    var self = this
    return new Promise(function(accept, reject) {
      this.$audio_node.volume = 0
      $(this.$audio_node).animate({volume: (self.state.volume / 100)}, 1500, function() {
        return accept()
      })
    }.bind(this))
  },
  __setSoundcloudPlaylist: function() {
    SC
      .get("/playlists/" + this.props.scPlaylistId)
      .then(function(playlist){
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
  __setSoundcloudTrack: function(track_id) {
    var self = this
    SC
      .get("/tracks/" + track_id)
      .then(function(track){
        self.setState({
          platform: 'soundcloud',
          soundcloud_track_id: track_id,
          stream_url: track.stream_url + '?client_id=' + app_config.soundcloud_client_id,
          artwork_url: track.artwork_url,
          artist_name: track.user.username,
          album_name: null,
          track_name: track.title,
          is_playing: true
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
  __handlePlayClick: function() {
    AppActions.audioPlay(this.state.soundcloud_track_id)
  },
  __handlePauseClick: function() {
    AppActions.audioPause(this.state.soundcloud_track_id)
  },
  __handleSeekerClick: function(e) {
    var left = e.nativeEvent.pageX - $(e.target).offset().left;
    var percent = (left / $(e.target).closest('.progress-container').width()) * 100;
    AppActions.audioProgressUpdate(this.state.soundcloud_track_id, percent, true)
  },
  __handleVolumeSliderClick: function(e) {
    var left = e.nativeEvent.pageX - $(e.target).offset().left;
    var percent = (left / $(e.target).closest('.volume-slider').width()) * 100;
    AppActions.audioVolumeUpdate(percent)
  },
  __handleSkipPreviousClick: function(e) {
    AppActions.audioProgressUpdate(this.state.soundcloud_track_id, 0, true)
  },
  __handleSkipNextClick: function(e) {
    AppActions.audioProgressUpdate(this.state.soundcloud_track_id, 100, true)
  },
  __handleMuteClick: function(e) {
    AppActions.audioMute(!this.state.is_muted)
  },
  __handleRetractClick: function() {
    this.setState({
      expanded: false
    })
  },
  __handleExpandClick: function() {
    this.setState({
      expanded: true
    })
  },
  render: function() {
    var self = this;

    var style = {
      background: 'url('+this.state.artwork_url+')'
    }

    return (
      <div
        className='audio-player'
        data-visible={this.state.visible}
        data-is-muted={this.state.is_muted}
        data-is-playing={this.state.is_playing}
        data-expanded={this.state.expanded}
        >
        <audio ref='audio' preload="none">
          {
            (this.state.stream_url) &&
            <source id='audio-src' src={this.state.stream_url} type='audio/mpeg' codecs='mpeg' />
          }
        </audio>
        <div className='left-container'>
          <div className='album-img-container'>
            <div className='album-img' style={{backgroundImage: 'url(' + this.state.artwork_url + ')'}}></div>
          </div>
          <div className='album-text'>
            <div className='track-name'>{this.state.track_name || ""}</div>
            <div className='artist-name'>{this.state.artist_name || ""}</div>
            <div className='album-name'>{this.state.album_name || ""}</div>
          </div>
        </div>
        <div className='center-container'>
          <div className='controls'>
            <div className='upper-tier'>
              <SkipPrevious
                onTouchTap={this.__handleSkipPreviousClick}
                className='skip-previous-icon'
                color={"#505050"}
                style={{width:"36px", height:'36px'}}>
              </SkipPrevious>
              {
                !this.state.is_playing &&
                <PlayIcon
                  onTouchTap={this.__handlePlayClick}
                  className='play-icon'
                  color={"#505050"}
                  style={{width:"36px", height:'36px'}}>
                </PlayIcon>
              }
              {
                this.state.is_playing &&
                <PauseIcon
                  onTouchTap={this.__handlePauseClick}
                  className='pause-icon'
                  color={"#505050"}
                  style={{width:"36px", height:'36px'}}>
                </PauseIcon>
              }
              <SkipNext
                onTouchTap={this.__handleSkipNextClick}
                className='skip-next-icon'
                color={"#505050"}
                style={{width:"36px", height:'36px'}}>
              </SkipNext>
            </div>
            <div className='lower-tier'>
              <div className='progress-container' onTouchTap={this.__handleSeekerClick}>
                <div className='progress' style={{width: this.state.progress + '%'}}></div>
                <div className='buffer'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='right-container'>
          <VolumeMute
            onTouchTap={this.__handleMuteClick}
            className='volume-mute-icon'
            data-is-muted={this.state.is_muted}
            color={ this.state.is_muted ? "whitesmoke" : "#505050"}
            style={{width:"24px", height:'24px'}}>
          </VolumeMute>
          <div className='volume-slider' onTouchTap={this.__handleVolumeSliderClick}>
            <div className='value' style={{width: this.state.volume + '%'}}></div>
          </div>
        </div>
        <div className='arrow-container'>
          {
            this.state.expanded &&
            <ArrowDown
              onTouchTap={this.__handleRetractClick}
              className='retract-icon'
              color={"#505050"}
              style={{width:"24px", height:'24px'}}>
            </ArrowDown>
          }
          {
            !this.state.expanded &&
            <ArrowUp
              onTouchTap={this.__handleExpandClick}
              className='expand-icon'
              color={"#505050"}
              style={{width:"24px", height:'24px'}}>
            </ArrowUp>
          }
        </div>
      </div>
    );
  }
})
