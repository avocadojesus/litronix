var React = require('react')
import "./instagram.css"
var m = require('moment')
var ls = require('local-storage')
var PostActions = require('../../actions/post-actions')
var Toggle = require('material-ui/lib/toggle');
var $ = require('jquery')
var Loader = require('../loader')

module.exports = React.createClass({
  displayName: 'InstagramPost',
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
  getInitialState: function() {
    return {
      img_loaded: false
    }
  },
  __loadImage: function() {
    var self = this
    if (
      !this.props.post ||
      !this.props.post.data ||
      !this.props.post.data.images ||
      ! this.props.post.data.images.standard_resolution
    ) return false;

    $("<img/>")
        .attr("src", this.props.post.data.images.standard_resolution.url)
        .on('load', function() {
          self.setState({img_loaded: true})
        });
  },
  componentDidUpdate: function() {
    if (!this.state.img_loaded) this.__loadImage()
  },
  componentDidMount: function() {
    this.__loadImage()
  },
  render: function() {
    var self = this

    if (!this.state.img_loaded) {
      return (
        <div className='instagram-post' style={{background: 'black'}}>
          <Loader />
        </div>
      )
    }

    return (
      <div className='instagram-post'>
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
          <a className='view-on-link' href={this.props.post.data.link}>View on Instagram</a>
        </div>
        <div className='body'>
          {
            this.props.show &&
            <div className='instagram-img-container'>
              <div className='instagram-img' style={{backgroundImage: "url("+this.props.post.data.images.standard_resolution.url+")"}}></div>
            </div>
          }
        </div>
        <div className='foot'>
          <div className='likes-container'>
            <div className='num-likes'>{this.props.post.data.likes.count}</div>
            <div className='likes-icon'></div>
          </div>
          <div className='created-at'>{m(this.props.post.created_at).fromNow()}</div>
        </div>
      </div>
    )
  }
})
