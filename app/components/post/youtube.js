var React = require('react')
import "./youtube.css"
var m = require('moment')
var ls = require('local-storage')
var PostActions = require('../../actions/post-actions')
var Toggle = require('material-ui/lib/toggle')

module.exports = React.createClass({
  displayName: 'YoutubePost',
  getInitialState: function() {
    return {
      text: ""
    }
  },
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
  componentDidMount: function() {
    console.log(this.props.post);
  },
  render: function() {
    var self = this
    var active = this.props.post.__meta ? this.props.post.__meta.active : true

    return (
      <div className='youtube-post'>
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
              defaultToggled={active} />
          }
          <div className='social-media-icon'></div>
          <a className='view-on-link' href={"https://www.youtube.com/embed/" + this.props.post.id}>View on Youtube</a>
        </div>
        <div className='body'>
          <iframe
            width="100%"
            height='400px'
            src={"https://www.youtube.com/embed/" + this.props.post.id}
            frameborder="0"
            allowfullscreen>
          </iframe>
        </div>
        <div className='foot'>
          <div className='created-at'>{m(this.props.post.created_at).fromNow()}</div>
        </div>
      </div>
    )
  }
})
