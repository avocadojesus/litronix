var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var StaticHeader = require('../static-header');
var Track = require('../track');
var LitronixBanner = require('../litronix-banner');
import './hero.css';
import {browserHistory} from 'react-router';

module.exports = React.createClass({
  displayName: 'Hero',
  mixins: [],
  propTypes: {
    scrolledDown: React.PropTypes.bool,
    onScrollPass: React.PropTypes.func,
    onScrollEnter: React.PropTypes.func,
    activeLink: React.PropTypes.string,
    theme: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      is_scrolled_past: false
    }
  },
  getDefaultProps: function() {
    return {
      scrolledDown: false,
      onScrollPass: function annonScroll() {},
      onScrollEnter: function annonScroll() {},
      activeLink: '',
      theme: 'default'
    }
  },
  componentDidMount: function() {
    var self = this;
    var node = ReactDOM.findDOMNode(this);
    $(window).unbind('scroll.windowScrollDetect');
    $(window).bind('scroll.windowScrollDetect', function(e) {
      if (!self.isMounted()) return true;
      if ($(e.target).scrollTop() >= $(node).height()) {
        if (!self.state.is_scrolled_past) {
          self.props.onScrollPass();
          self.setState({is_scrolled_past: true})
        }
      } else {
        if (self.state.is_scrolled_past) {
          self.setState({is_scrolled_past: false})
          self.props.onScrollEnter();
        }
      }
    });
  },
  componentWillUnmount: function() {
    $(window).unbind('scroll.windowScrollDetect');
  },
  __handleLinkClick: function(e) {
    e.preventDefault()
    window.lastScrollTop = $(document.body).scrollTop();
    // this.transitionTo($(e.target).attr('href'));
    browserHistory.push($(e.target).attr('href'))
  },
  render: function() {
    return (
      <div className='hero'
        data-theme={this.props.theme}
        data-scrolled-down={this.props.scrolledDown}
        data-is-scrolled-past={this.state.is_scrolled_past}>
        <div className='header-outer-container'>
          <div className='litronix-header-container'>
            <div className='litronix-header'></div>
          </div>
          <StaticHeader className="outer-container" activeLink={this.props.activeLink} allCaps={false} fontColor='white'/>
        </div>
        <LitronixBanner />
      </div>
    )
  }
})
