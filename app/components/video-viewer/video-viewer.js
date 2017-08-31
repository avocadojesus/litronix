var React = require('react');
var Video = require('../video');
import './video-viewer.css';

module.exports = React.createClass({
  displayName: 'Video-Viewer',
  propTypes: {
    videos: React.PropTypes.array,
    scrolledDown: React.PropTypes.bool,
    theme: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      albums: [],
      scrolledDown: false,
      theme: 'default'
    }
  },
  render: function() {
    return (
      <div
        className={'video-viewer item-viewer ' + (this.props.className || "")}
        data-scrolled-down={this.props.scrolledDown}
        data-theme={this.props.theme} >
        <div className='video-viewer-overlay'></div>
        {this.props.videos.map(function(video, i) {
          return (
            <Video
              title={video.title}
              artist_name={video.artist_name}
              video_title={video.video_title}
              video_id={video.id}
              platform={video.platform}
              key={i}
            />
          );
        })}
      </div>
    );
  }
})
