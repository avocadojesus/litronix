var React = require('react')
var Track = require('../track/track')
import "./soundcloud.css"
var m = require('moment')
var ls = require('local-storage')
var PostActions = require('../../actions/post-actions')
var Toggle = require('material-ui/lib/toggle');

module.exports = React.createClass({
  displayName: 'SoundcloudPost',
  propTypes: {
    show: React.PropTypes.bool,
    post: React.PropTypes.object.isRequired
  },
  getDefaultProps: function() {
    return {
      show: false,
      post: {}
    }
  },
  render: function() {
    var self = this
    // <iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/268784227&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
    var url = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + this.props.post.data.id + "&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true"
    return (
      <div className='soundcloud-post'>
        <div className='head'>
          {
            ls.get('auth_token') &&
            <Toggle
              className='post-toggle-switch'
              onToggle={function(e, val) {
                PostActions
                  .updateRemote(self.props.post.id, {active: val})
                  .then(function(o) {
                    console.log(o);
                  })
                  .catch(function(e) {
                    console.log(e);
                  })
              }}
              defaultToggled={this.props.post.__meta.active} />
          }
          <div className='social-media-icon'></div>
          <a className='view-on-link' href={this.props.post.data.permalink_url}>View on Soundcloud</a>
        </div>
        <div className='body' data-show={this.props.show}>
          <Track
            track={this.props.post.data}
            scClientId="83a127bfc14b7a532bf9a3914a82612d"/>
        </div>
        <div className='foot'>
          <div className='likes-container'>
            <div className='num-likes'>{this.props.post.data.favoritings_count}</div>
            <div className='likes-icon'></div>
          </div>
          <div className='created-at'>{m(this.props.post.created_at).fromNow()}</div>
        </div>
      </div>
    )
  }
})
