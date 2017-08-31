var React = require('react')
import "./blogger.css"
var m = require('moment')
var ls = require('local-storage')
var PostActions = require('../../actions/post-actions')
var Toggle = require('material-ui/lib/toggle');

module.exports = React.createClass({
  displayName: 'BloggerPost',
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
    return (
      <div className='blogger-post'>
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
          <a className='view-on-link' href={this.props.post.data.url}>View on Blogger</a>
        </div>
        <div className='body'>
          <div className='blogger-title'>{this.props.post.data.title}</div>
          <div className='blogger-content' dangerouslySetInnerHTML={{__html: this.props.post.data.content}}></div>
          <div className='read-more-link'><a href={this.props.post.data.selfLink}>Read More</a></div>
        </div>
        <div className='foot'>
          <div className='likes-container'>
            <div className='num-likes'></div>
            <div className='likes-icon'></div>
          </div>
          <div className='created-at'>{m(this.props.post.created_at).fromNow()}</div>
        </div>
      </div>
    )
  }
})
