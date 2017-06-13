var React = require('react');
var $ = require('jquery');
import './static-header.css';
import {} from 'react-router';
var jwt = require('jsonwebtoken');
var ls = require('local-storage');
var browserHistory = require('react-router').browserHistory
var RightSidebarActivator = require('../right-sidebar-activator')

module.exports = React.createClass({
  displayName: 'StaticHeader',
  mixins: [],
  getInitialState: function() {
    return {
      username: null
    }
  },
  propTypes: {
    visible: React.PropTypes.bool,
    activeLink: React.PropTypes.string,
    allCaps: React.PropTypes.bool,
    fontColor: React.PropTypes.string,
    className: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      visible: false,
      activeLink: '',
      allCaps: true,
      fontColor: 'black',
      className: ""
    }
  },
  componentDidMount: function() {
    var self = this;
    var auth_token = ls.get('auth_token')
    if (auth_token) {
      var user = jwt.decode(auth_token)
      if (user) this.setState({username: user.username})
    }
  },
  __handleLinkClick: function(e) {
    e.preventDefault()
    var link = $(e.target).attr('href')
    // if (link === "/tour") return window.location.href = "http://www.canyontickets.com/mattcosta"
    browserHistory.push(link);
  },
  render: function() {
    var self = this
    var title = this.state.username || "Space + Time"
    if (!this.props.allCaps && !this.state.username) title = "Space + Time"

    return (
      <div className={'static-header ' + (this.props.className || "")} data-visible={this.props.visible}>
        <div className='title'>
          <div className='logo-img'></div>
        </div>
        <div className='links'>
          {
            this.state.username &&
            <a href='/dash'
              data-theme='1'
              data-active={this.props.activeLink === 'dash'}
              onClick={this.__handleLinkClick}>
              DASH
            </a>
          }
          <a href='/'
            data-theme='1'
            data-active={this.props.activeLink === 'home'}
            onClick={this.__handleLinkClick}>
            HOME
          </a>
          <a href='/photos'
            data-theme='2'
            data-active={this.props.activeLink === 'photos'}
            onClick={this.__handleLinkClick}>
            PHOTOS
          </a>
          <a href='/videos'
            data-theme='1'
            data-active={this.props.activeLink === 'videos'}
            onClick={this.__handleLinkClick}>
            VIDEOS
          </a>
          <a href='/bio'
            data-theme='1'
            data-active={this.props.activeLink === 'bio'}
            onClick={this.__handleLinkClick}>
            BIO
          </a>
          <a href='/contact'
            data-theme='1'
            data-active={this.props.activeLink === 'contact'}
            onClick={this.__handleLinkClick}>
            CONTACT
          </a>
          <RightSidebarActivator color={this.props.fontColor} />
        </div>
      </div>
    )
  }
})
