import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import './audio-player.less'
import { Icon } from 'semantic-ui-react'
import AppDispatcher from '../../dispatchers/app-dispatcher'
import AppActions from '../../actions/app-actions'
import Promise from 'bluebird'

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      is_playing: false,
      is_muted: false,
      curr_stream_url: null,
      curr_artwork_url: null,
      curr_artist_name: null,
      curr_album_name: null,
      curr_track_name: null,
      progress: null,
      volume: 80,
      expanded: true,
      was_interrupted: false,
      play_queue: [],
      prev_play_queue: [],
      curr_track: null
    }
  }
  componentDidMount() {
    var self = this;
    this.$audio_node = ReactDOM.findDOMNode(this.refs.audio);

    this.$audio_node.addEventListener('timeupdate', function(e) {
      var percent = (e.target.currentTime / ReactDOM.findDOMNode(self.refs.audio).duration) * 100
      AppActions.audioProgressUpdate(self.state.curr_track.id, percent)
    });

    this.$audio_node.addEventListener('ended', (e) => {
      AppActions.audioPlayNext()
    });

    AppDispatcher.register((payload) => {
      switch (payload.action.actionType) {
        case "AUDIO_PROGRESS_UPDATE":
          if (payload.action.track_id === this.state.curr_track.id && this.state.curr_track.id) {
            if (payload.action.update_duration) {
              var new_time = (self.$audio_node.duration * (payload.action.progress / 100)).toFixed(2)
              self.$audio_node.currentTime = new_time;
            } else {
              self.setState({progress: payload.action.progress})
            }
          }
          break;
        case "AUDIO_VOLUME_UPDATE":
          self.setState({volume: payload.action.volume})
          break;
        case "AUDIO_RESET_QUEUE":
          this.setState({
            play_queue: [],
            prev_play_queue: []
          })
          break;
        case "QUEUE_TRACKS":
          var play_queue = this.state.play_queue
          var play_queue_length = play_queue.length

          if ($.isArray(payload.action.tracks)) {
            play_queue = play_queue.concat(payload.action.tracks)
          } else {
            play_queue.push(payload.action.tracks)
          }

          self.setState({
            visible: true,
            play_queue: play_queue
          })
          break;
        case "PLAY_TRACK":
          var track = payload.action.track
          this.__set_curr_track(track)
          setTimeout(() => { AppActions.audioPlay() }, 20)
          break;
        case "AUDIO_PLAY":
          if (payload.action.track) this.__set_curr_track(payload.action.track)
          self.setState({ is_playing: true, visible: true });
          break;
        case "AUDIO_PLAY_NEXT":
          this.__play_next_track()
          break;
        case "AUDIO_PLAY_PREVIOUS":
          this.__play_prev_track()
          break;
        case "AUDIO_PAUSE":
          self.setState({ is_playing: false });
          break;
        case "AUDIO_MUTE":
          self.setState({ is_muted: payload.action.mute });
          break;
        case "AUDIO_MINIMIZE":
          self.setState({ expanded: false });
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
    })
  }
  __set_curr_track(track, dont_set_prev_track) {
    var prev_play_queue = this.state.prev_play_queue
    if (this.state.curr_track && !dont_set_prev_track) {
      prev_play_queue.unshift(this.state.curr_track)
    }

    this.setState({
      prev_play_queue: prev_play_queue,
      curr_track: track,
      curr_artist_name: track.artist_name,
      curr_track_name: track.title,
      curr_album_name: track.album_name,
      curr_stream_url: track.stream_url,
      curr_artwork_url: track.artwork_url,
    })
  }
  __play_next_track() {
    if (this.state.play_queue.length > 0) {
      var new_play_queue = this.state.play_queue
      var removed_item = new_play_queue.shift()
      console.log(removed_item, new_play_queue);
      this.__set_curr_track(removed_item)
      this.setState({
        play_queue: new_play_queue
      })
    }
  }
  __play_prev_track() {
    if (this.state.prev_play_queue.length > 0) {
      this.__set_curr_track(this.state.prev_play_queue[0], true)
      var new_prev_play_queue = this.state.prev_play_queue
      new_prev_play_queue.shift()
      this.setState({
        prev_play_queue: new_prev_play_queue
      })
    }
  }
  componentDidUpdate(prev_props, prev_state) {
    var self = this

    // if stream url is updated, force the audio to reload
    if (prev_state.curr_stream_url !== this.state.curr_stream_url) {
      document.querySelector('#audio-src').src = this.state.curr_stream_url;
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
  }
  fadeOut() {
    var self = this
    return new Promise(function(accept, reject) {
      $(this.$audio_node).animate({volume: 0}, 1500, function() {
        return accept()
      })
    }.bind(this))
  }
  fadeIn() {
    var self = this
    return new Promise(function(accept, reject) {
      this.$audio_node.volume = 0
      $(this.$audio_node).animate({volume: (self.state.volume / 100)}, 1500, function() {
        return accept()
      })
    }.bind(this))
  }
  __handlePlayClick() {
    AppActions.audioPlay(this.state.soundcloud_track_id)
  }
  __handlePauseClick() {
    AppActions.audioPause(this.state.soundcloud_track_id)
  }
  __handleSeekerClick(e) {
    var left = e.nativeEvent.pageX - $(e.target).offset().left;
    var percent = (left / $(e.target).closest('.progress-container').width()) * 100;
    AppActions.audioProgressUpdate(this.state.curr_track.id, percent, true)
  }
  __handleVolumeSliderClick(e) {
    var left = e.nativeEvent.pageX - $(e.target).offset().left;
    var percent = (left / $(e.target).closest('.volume-slider').width()) * 100;
    AppActions.audioVolumeUpdate(percent)
  }
  __handleSkipPreviousClick(e) {
    if (this.$audio_node.currentTime < 5) {
      AppActions.audioPlayPrevious()
    } else {
      AppActions.audioProgressUpdate(this.state.curr_track.id, 0, true)
    }
  }
  __handleSkipNextClick(e) {
    AppActions.audioPlayNext()
  }
  __handleMuteClick(e) {
    AppActions.audioMute(!this.state.is_muted)
  }
  __handleRetractClick() {
    this.setState({
      expanded: false
    })
  }
  __handleExpandClick() {
    this.setState({
      expanded: true
    })
  }
  render() {
    var self = this;

    var style = {
      background: 'url('+this.state.artwork_url+')'
    }

    return (
      <div
        className='audio-player animated fadeInUp'
        data-visible={this.state.visible}
        data-is-muted={this.state.is_muted}
        data-is-playing={this.state.is_playing}
        data-expanded={this.state.expanded}
        >
        <audio ref='audio' preload="none">
          {
            this.state.curr_stream_url &&
            <source id='audio-src' src={this.state.curr_stream_url} type='audio/mpeg' codecs='mpeg' />
          }
        </audio>
        <div className='left-container'>
          <div className='album-img-container'>
            <div className='album-img' style={{backgroundImage: 'url(' + this.state.curr_artwork_url + ')'}}></div>
          </div>
          <div className='album-text'>
            <div className='track-name'>{this.state.curr_track_name || ""}</div>
            <div className='artist-name'>{this.state.curr_artist_name || ""}</div>
            <div className='album-name'>{this.state.curr_album_name || ""}</div>
          </div>
        </div>
        <div className='center-container'>
          <div className='controls'>
            <div className='upper-tier'>
              <Icon
                name='step backward'
                onTouchTap={this.__handleSkipPreviousClick.bind(this)}
                className='skip-previous-icon'
                style={{width:"36px", height:'36px'}}>
              </Icon>
              {
                !this.state.is_playing &&
                <Icon
                  name="play"
                  onTouchTap={this.__handlePlayClick.bind(this)}
                  className='play-icon'
                  style={{width:"36px", height:'36px'}}>
                </Icon>
              }
              {
                this.state.is_playing &&
                <Icon
                  name="pause"
                  onTouchTap={this.__handlePauseClick.bind(this)}
                  className='pause-icon'
                  style={{width:"36px", height:'36px'}}>
                </Icon>
              }
              <Icon
                name="step forward"
                onTouchTap={this.__handleSkipNextClick.bind(this)}
                className='skip-next-icon'
                style={{width:"36px", height:'36px'}}>
              </Icon>
            </div>
            <div className='lower-tier'>
              <div className='progress-container' onTouchTap={this.__handleSeekerClick.bind(this)}>
                <div className='progress' style={{width: this.state.progress + '%'}}></div>
                <div className='buffer'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='right-container'>
          <Icon
            name="mute"
            onTouchTap={this.__handleMuteClick.bind(this)}
            className='volume-mute-icon'
            data-is-muted={this.state.is_muted}
            style={{width:"24px", height:'24px'}}>
          </Icon>
          <div className='volume-slider' onTouchTap={this.__handleVolumeSliderClick.bind(this)}>
            <div className='value' style={{width: this.state.volume + '%'}}></div>
          </div>
        </div>
        <div className='arrow-container'>
          {
            this.state.expanded &&
            <Icon
              name='minus'
              onTouchTap={this.__handleRetractClick.bind(this)}
              className='retract-icon'
              style={{width:"24px", height:'24px'}}>
            </Icon>
          }
          {
            !this.state.expanded &&
            <Icon
              name='plus'
              onTouchTap={this.__handleExpandClick.bind(this)}
              className='expand-icon'
              style={{width:"24px", height:'24px'}}>
            </Icon>
          }
        </div>
      </div>
    );
  }
}

AudioPlayer.defaultProps = {
  album: [],
  scrolledDown: false,
  theme: "light"
}
