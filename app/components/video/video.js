var React = require('react')
var AppActions = require('../../actions/app-actions')
var PlayIcon = require('material-ui/lib/svg-icons/av/play-arrow')
import './video.css'

module.exports = React.createClass({
  displayName: 'Video',
  propTypes: {
    video_id: React.PropTypes.string,
    platform: React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      video_id: {},
      platform: ""
    }
  },
  getInitialState: function() {
    return {
      poster_url: null
    }
  },
  __setVideoData: function() {
    if (this.props.platform === "vimeo") return this.__setVimeoData()
    return ""
  },
  __setVimeoData: function() {
    AppActions
      .getVimeoPoster(this.props.video_id)
      .then(function(video_data) {
        this.setState({
          poster_url: video_data.thumbnail_medium,
          artist_name: video_data.user_name,
          title: video_data.title
        })
      }.bind(this))
  },
  componentDidMount: function() {
    this.__setVideoData();
  },
  __handleClick: function() {
    AppActions.videoSetSourceFromVimeo(this.props.video_id)
  },
  render: function() {
    var style = {
      backgroundImage: 'url(' + this.state.poster_url + ')'
    }
    return (
      <div
        className={'video ' + (this.props.className || "")}
        onTouchTap={this.__handleClick}
      >
        <div className='poster-image' style={style}></div>
        <div className='overlay'>
          <PlayIcon className='play-icon' color={"white"} style={{width:"48px", height:'48px'}}></PlayIcon>
        </div>
        <div className='txt-container'>
          <div className='video-title hide-when-loading'>{this.state.title}</div>
          <div className='video-artist-name hide-when-loading'>{this.state.artist_name}</div>
        </div>
      </div>
    );
  }
})
