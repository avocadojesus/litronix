var React	= require('react');
var $ = require('jquery');
import Icon from 'react-icons-kit';
import { play } from 'react-icons-kit/fa/play'
import { pause } from 'react-icons-kit/fa/pause'
import styles from './audio-player.less';

function __getTracks(playlist) {
  return playlist.tracks ? playlist.tracks : [];
}

var __component = React.createClass({
  getInitialState: function() {
    return {
      playing: false
    }
  },
  propTypes: {
    onLoad: React.PropTypes.func,
    playlistId: React.PropTypes.string,
    debug: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      onLoad: function() {},
      playlistId: "99665544",
      debug: false
    };
  },

  getInitialState: function() {
    var self = this;

    return {
      playlist: {tracks: []},
      curr_track_index: null
    };
  },

  seek: function(percent) {
    var audio = this.refs.audio_player;
    audio.currentTime = (percent / 100) * audio.duration;
  },

  pause: function() {
    var audio = this.refs.audio_player;
    audio.pause();
  },
  play: function() {
    var audio = this.refs.audio_player;
    audio.play();
  },
  __handleSeekerClick: function(e) {
    var x = e.pageX - $(this.refs.seeker).offset().left;
    var percent = (x / $(this.refs.seeker).width()) * 100;
    this.seek(percent);
  },
  componentDidMount: function() {
    var self = this;

    if (this.refs.audio_player) {
      var audio = self.refs.audio_player;
      audio.onloadeddata = function() {
        audio.play();
        self.props.onLoad(audio);
      }
      audio.onpause = function() {
        self.setState({playing: false});
      }
      audio.onplay = function() {
        self.setState({playing: true});
      }

      audio.onended = function() {
        var next_track = self.state.curr_track_index + 1;
        if (next_track > self.state.playlist.tracks.length) next_track = 0;
        self.setState({curr_track_index: next_track});
        audio.load();
      }

      audio.ontimeupdate = function(e) {
        var value = 0;
        var audio = self.refs.audio_player;

        if (audio.currentTime > 0) {
          value = Math.round((100 / audio.duration) * audio.currentTime);
        }

        var bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        var duration =  audio.duration;
        var buffered_percent = (bufferedEnd / duration) * 100;
        if (duration > 0) {
            self.refs.buffer.style.width = buffered_percent + '%';
        //   $(self.refs.buffer).animate({width: ((bufferedEnd / duration)*100) + "%"});
        }

        self.refs.progress.style.width = value + '%';
        // $(self.refs.progress).finish().animate({width: value + "%"}, 2000);
        // self.refs.progress.style.width = value + "%";
      }
    }
  },

  render: function() {
    return (
      <div className='audio-player-container'>
        <audio ref='audio_player' className='audio-player'>
          <source src={this.props.src} />
        </audio>
        <div className='audio-controls'>
          <div className='left-buttons-container'>
            {
              !this.state.playing &&
              <div className='play-btn' onClick={this.play}>
                <Icon size={28} style={{color: '#f4fb3c', marginTop: '10px'}} icon={play} />
              </div>
            }
            {
              this.state.playing &&
              <div className='pause-btn' onClick={this.pause}>
                <Icon size={28} style={{color: '#f4fb3c', marginTop: '10px'}} icon={pause} />
              </div>
            }
          </div>
          <div ref='seeker' className='seeker' onClick={this.__handleSeekerClick}>
            <div ref='progress' className='progress'></div>
            <div ref='buffer' className='buffer'></div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = __component;
