var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
import "./facebook.css"
var facebook_config = require('../../config/facebook')
var m = require('moment')
var ls = require('local-storage')
var PostActions = require('../../actions/post-actions')
var Toggle = require('material-ui/lib/toggle');

module.exports = React.createClass({
  displayName: 'FacebookPost',
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
    this.$node = $(ReactDOM.findDOMNode(this))

    // if there are links present, make sure to wrap them in an href
    if (this.props.post.data.message) {
      var url_match = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g
      var text = this.props.post.data.message.replace(url_match, "<a href='$1'>$1</a>")
      this.setState({text: text})
    }
  },
  isValid: function() {
    if (!this.props.post.data.message) return false
    return true
  },
  render: function() {
    var self = this
    var post_id = this.props.post.data.id.split(/_/)[1]
    var link = "https://www.facebook.com/" + facebook_config.username + "/posts/" + post_id

    return (
      <div className='facebook-post'>
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
          <a className='view-on-link' href={link}>View on Facebook</a>
        </div>
        <div className='body'>
          <div className='facebook-text' dangerouslySetInnerHTML={{__html: this.state.text}}></div>
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
