var React = require('react')
import "./twitter.css"
var m = require('moment')
var ls = require('local-storage')
var PostActions = require('../../actions/post-actions')
var Toggle = require('material-ui/lib/toggle');

module.exports = React.createClass({
  displayName: 'TwitterPost',
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
    var url_match = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g
    var text = this.props.post.data.text.replace(url_match, "<a href='$1'>$1</a>")
    this.setState({text: text})
  },
  render: function() {
    var self = this
    return (
      <div className='twitter-post'>
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
          <a className='view-on-link' href={'https://twitter.com/status/' + this.props.post.data.id_str}>View on Twitter</a>
        </div>
        <div className='body'>
          <div className='twitter-text' dangerouslySetInnerHTML={{__html: this.state.text}}></div>
        </div>
        <div className='foot'>
          <div className='likes-container'>
            <div className='num-likes'>{this.props.post.favorite_count}</div>
            <div className='likes-icon'></div>
          </div>
          <div className='created-at'>{m(this.props.post.created_at).fromNow()}</div>
        </div>
      </div>
    )
  }
})
