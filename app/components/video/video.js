var React = require('react')
var AppActions = require('../../actions/app-actions')
var videos = require('../../config/videos.json')
var Loader = require('../../components/loader/loader')
var PlayIcon = require('material-ui/lib/svg-icons/av/play-arrow')
var $ = require('jquery')
import './video.css'

module.exports = React.createClass({
  displayName: 'Video',
  propTypes: {
    video_id: React.PropTypes.string,
    platform: React.PropTypes.string,
    artist_name: React.PropTypes.string,
    video_title: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      video_id: {},
      platform: "",
      artist_name: "",
      video_title: ""
    }
  },
  getInitialState: function() {
    return {
      poster_url: null,
      is_loading: true
    }
  },
  __setVideoData: function() {
    if (this.props.platform === "vimeo") return this.__setVimeoData()
    if (this.props.platform === "youtube") return this.__setYoutubeData()
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
  __setYoutubeData: function() {
    this.setState({
      poster_url: "https://img.youtube.com/vi/" + this.props.video_id + "/default.jpg",
      artist_name: this.props.artist_name,
      video_title: this.props.video_title
    })
  },
  componentDidMount: function() {
    this.__setVideoData();
  },
  componentDidUpdate: function() {
    if (this.state.is_loading && this.state.poster_url) {
      this.__preloadPosterUrl()
    }
  },
  __handleClick: function() {
    if (this.props.platform === "vimeo") AppActions.videoSetSourceFromVimeo(this.props.video_id)
    if (this.props.platform === "youtube") AppActions.videoSetSourceFromYoutube(this.props.video_id)
  },
  __preloadPosterUrl: function() {
    console.log(this.state.poster_url);
    $("<img/>")
        .attr("src", this.state.poster_url)
        .on('load', function() {
          this.setState({is_loading: false})
        }.bind(this));
  },
  render: function() {
    var style = {
      backgroundImage: 'url(' + this.state.poster_url + ')'
    }

    if (this.state.is_loading) {
      return (
        <div
          className={'video ' + (this.props.className || "")}
        >
          <Loader />
        </div>
      )
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
          <div className='video-title hide-when-loading'>{this.props.video_title}</div>
          <div className='video-artist-name hide-when-loading'>{this.state.artist_name}</div>
        </div>
      </div>
    );
  }
})
