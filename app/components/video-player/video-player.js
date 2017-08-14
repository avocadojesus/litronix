var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery')
import './video-player.css';
var AppActions = require('../../actions/app-actions')
var AppDispatcher = require('../../dispatchers/app-dispatcher')
var AppActions = require('../../actions/app-actions')
var Vimeo = require('react-vimeo')

module.exports = React.createClass({
  displayName: 'video-player',
  getInitialState: function() {
    return {
      is_visible: false,
      is_playing: false,
      src: null
    }
  },
  propTypes: {

  },
  componentDidMount: function() {
    var self = this
    AppDispatcher.register(function(payload){
      switch (payload.action.actionType) {
        case "VIDEO_PROGRESS_UPDATE":
          if (payload.action.track_id === self.state.soundcloud_track_id && self.state.soundcloud_track_id) {
            if (payload.action.update_duration) {
              self.$audio_node.currentTime = (self.$audio_node.duration * (payload.action.progress / 100)).toFixed(2);
            } else {
              self.setState({progress: payload.action.progress})
            }
          }
          break;
        case "VIDEO_VOLUME_UPDATE":
          self.setState({volume: payload.action.volume})
          break;
        case "VIDEO_SET_SRC_FROM_VIMEO":
          self.setState({
            is_visible: true,
            vimeo_video_id: payload.action.vimeo_video_id,
          })
          setTimeout(() => {AppActions.videoPlay()}, 1)
          break;
        case "VIDEO_PLAY":
          self.setState({ is_playing: true });
          break;
        case "VIDEO_PAUSE":
          self.setState({ is_playing: false });
          break;
        case "VIDEO_MUTE":
          self.setState({ is_muted: payload.action.mute });
          break;
        case "VIDEO_CLOSE":
          self.setState({
            is_visible: false,
            is_playing: false,
            vimeo_video_id: null
          })
          break;
      }
    });
  },
  componentDidUpdate: function(prev_props, prev_state) {

  },
  getDefaultProps: function() {
    return {

    }
  },
  __handleCloseClick: function() {
    AppActions.videoClose()
  },
  render: function() {
    var src = "https://player.vimeo.com/video/" + this.state.vimeo_video_id
    return (
      <div
        className='video-player'
        data-is-visible={this.state.is_visible.toString()}
        data-is-playing={this.state.is_playing}
      >
        <div
          onTouchTap={this.__handleCloseClick}
          className="close-button">
          &times;
        </div>
        {
          this.state.vimeo_video_id &&
          this.state.is_visible &&
          this.state.is_playing &&
          <Vimeo
            videoId={this.state.vimeo_video_id}
            autoplay={true}
            controls={false}
            playerOptions={{
              width: $(window).width() + 'px',
              height: $(window).height() + 'px',
              title: "false",
              byline: "false",
              autoplay: "true"
            }}
            />
        }
      </div>
    )
  }
})
