var React = require('react');
var ReactDOM = require('react-dom');
var FacebookPost = require('./facebook');
var TwitterPost = require('./twitter');
var InstagramPost = require('./instagram');
var SoundcloudPost = require('./soundcloud');
var YoutubePost = require('./youtube');
var BloggerPost = require('./blogger');
var Toggle = require('material-ui/lib/toggle');
var ls = require('local-storage');
var $ = require('jquery');
var PostActions = require('../../actions/post-actions');
import './post.css';
import {} from 'react-router';

module.exports = React.createClass({
  mixins: [],
  displayName: 'Post',
  getInitialState: function() {
    return {
      show: false,
      valid: true
    }
  },
  propTypes: {
    curr_scroll_position: React.PropTypes.number,
    post: React.PropTypes.object.isRequired
  },
  getDefaultProps: function() {
    return {
      curr_scroll_position: 0,
      post: {}
    }
  },
  componentDidMount: function() {
    this.$node = $(ReactDOM.findDOMNode(this))
    if (this.props.post.network === 'facebook') {
      if (!this.refs.network_post.isValid()) {
        this.setState({
          valid: false
        })
      }
    }
  },
  componentWillReceiveProps: function() {
    if (this.__isWithinView() && !this.state.show) {
      this.setState({show: true})
    } else if (!this.__isWithinView() && this.state.show) {
      // this.setState({show: false})
    }
  },
  __isWithinView: function() {
    if (!this.$node) return false
    var top_of_element = this.$node.offset().top;
    var bottom_of_element = top_of_element + this.$node.outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).height();
    return (bottom_of_screen > top_of_element) && (bottom_of_screen < bottom_of_element)
  },
  render: function() {
    var self = this
    var active = this.props.post.__meta ? this.props.post.__meta.active : true

    return (
      <div className='post-component' data-network={this.props.post.network} data-valid={this.state.valid}>
        <div className='left-gutter'>
          <div className='social-media-icon'></div>
          {
            ls.get('auth_token') &&
            <Toggle
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
        </div>
        <div className='content-container'>
          {
            this.props.post.network === "facebook" &&
            <FacebookPost
              ref='network_post'
              show={this.state.show}
              post={this.props.post} />
          }
          {
            this.props.post.network === "twitter" &&
            <TwitterPost
              ref='network_post'
              show={this.state.show}
              post={this.props.post} />
          }
          {
            this.props.post.network === "instagram" &&
            <InstagramPost
              ref='network_post'
              show={this.state.show}
              post={this.props.post} />
          }
          {
            this.props.post.network === "soundcloud" &&
            <SoundcloudPost
              ref='network_post'
              show={this.state.show}
              post={this.props.post} />
          }
          {
            this.props.post.network === "youtube" &&
            <YoutubePost
              ref='network_post'
              show={this.state.show}
              post={this.props.post} />
          }
          {
            this.props.post.network === "blogger" &&
            <BloggerPost
              ref='network_post'
              show={this.state.show}
              post={this.props.post} />
          }
        </div>
      </div>
    )
  }
})
