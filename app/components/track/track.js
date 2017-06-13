var React = require('react');
var ReactDOM = require('react-dom');
var sprintf = require('sprintf-js').sprintf;
var AppDispatcher = require('../../dispatchers/app-dispatcher')
var AppActions = require('../../actions/app-actions')
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
var $ = require('jquery');
import './track.css';

module.exports = React.createClass({
  displayName: 'track',
  propTypes: {
    trackId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    mode: React.PropTypes.string,
    track: React.PropTypes.object,
    src: React.PropTypes.string,
    title: React.PropTypes.string,
    scClientId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      trackId: null,
      track: null,
      src: null,
      scClientId: null,
      title: '',
      mode: 'standard' // header
    }
  },
  getInitialState: function() {
    return {
      isPlaying: false,
      currentProgress: 0,
      track: null
    }
  },
  componentDidMount: function() {
    var self = this;
    this.$audio_node = ReactDOM.findDOMNode(self.refs.audio)
    this.setState({track: this.props.track})

    this.$audio_node.addEventListener('timeupdate', function(e) {
      var percent = (e.target.currentTime / ReactDOM.findDOMNode(self.refs.audio).duration) * 100
      self.setState({
        currentProgress: percent
      });
      AppActions.audioProgressUpdate(self.props.trackId, percent)
    });

    AppDispatcher.register(function(payload){
      switch (payload.action.actionType) {
        case "AUDIO_PROGRESS_UPDATE":
          if (payload.action.track_id === self.props.trackId && self.props.trackId) {
            console.log("LLLLLLmm");
            self.setState({currentProgress: payload.action.progress})
          }
          break;
        case "AUDIO_PLAY":
          console.log("playing");
          if (payload.action.track_id === self.props.trackId && self.props.trackId) {
            self.setState({ isPlaying: true });
          }
          break;
        case "AUDIO_PAUSE":
          if (payload.action.track_id === self.props.trackId && self.props.trackId) {
            if (self.state.isPlaying) self.$audio_node.pause();
            self.setState({isPlaying: false})
          }
          break;
      }
    });

    if (this.props.src) this.__initializeFromSrc()
    if(this.props.trackId && !this.state.track) this.__initializeFromTrackId()

    if (!this.props.trackId || !this.props.scClientId || !this.props.artistId || this.state.track) return false
    SC.initialize({
      client_id: this.props.scClientId
    });

    SC
      .get("/users/" + this.props.artistId + '/tracks/' + this.props.trackId)
      .then(function(track){
        self.setState({track: track})
      });
  },
  __initializeFromSrc: function() {},
  __initializeFromTrackId() {},
  __handlePlayClick: function() {
    AppActions.audioSetTrackFromSoundcloud(this.props.trackId || this.props.track.id)
  },
  __handlePauseClick: function() {
    this.setState({
      isPlaying: false
    });

    AppActions.audioPause(this.props.trackId)
    this.$audio_node.pause();
  },
  __handleWaveformClick: function(e) {
    var left = e.pageX - $(e.target).offset().left;
    var percent = (left / $(e.target).width()) * 100;

    this.setState({
      currentProgress: percent
    });

    AppActions.audioProgressUpdate(this.props.trackId, percent)
    this.$audio_node.currentTime = this.$audio_node.duration * (percent / 100)
  },
  render: function() {
    var progressStyle = {
      width: this.state.currentProgress + '%'
    };

    var stream_url = ''
    if (this.state.track) {
      stream_url = this.state.track.stream_url + '?client_id=' + this.props.scClientId;
    }
    if (this.props.src) stream_url = this.props.src

    return (
      <div className={'track ' + (this.props.className || "")} data-loading={false} data-mode={this.props.mode}>
        <div className='title-container' onTouchTap={this.__handlePlayClick}>
          <PlayIcon className='play-icon' color={"#232323"} style={{width:"24px", height:'24px'}}></PlayIcon>
          <audio ref='audio' preload="none">
            {
              (this.state.track || stream_url) &&
              <source src={stream_url} type='audio/mpeg' codecs='mpeg' />
            }
          </audio>
          <div className='track-title hide-when-loading'>{this.state.track ? this.state.track.title : this.props.title}</div>
        </div>
      </div>
    )
  }
})
