var React = require('react');
var $ = require('jquery');
import './header.css';
import {} from 'react-router';
var jwt = require('jsonwebtoken');
var ls = require('local-storage');
var browserHistory = require('react-router').browserHistory
var StaticHeader = require('../static-header')
var Track = require('../track')

module.exports = React.createClass({
  displayName: 'Header',
  mixins: [],
  getInitialState: function() {
    return {
      username: null
    }
  },
  propTypes: {
    visible: React.PropTypes.bool,
    activeLink: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      visible: false,
      activeLink: ''
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
    browserHistory.push($(e.target).attr('href'));
  },
  render: function() {
    var self = this
    var title = this.state.username || "LITRONIX"
    return (
      <div className='header' data-visible={this.props.visible}>
        <StaticHeader className="outer-container" activeLink={this.props.activeLink} fontColor="#3f3f3e"/>
      </div>
    )
  }
})
