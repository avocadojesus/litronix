var React = require('react');
var $ = require('jquery');
import './right-sidebar.css';
var browserHistory = require('react-router').browserHistory
var RightSidebarActions = require('../../actions/right-sidebar-actions')
var AppDispatcher = require('../../dispatchers/app-dispatcher')
var ContactIcon = require('material-ui/lib/svg-icons/communication/message')
var TourIcon = require('material-ui/lib/svg-icons/maps/flight')
var MediaIcon = require('material-ui/lib/svg-icons/image/photo-camera')
var HomeIcon = require('material-ui/lib/svg-icons/action/home')
var MerchIcon = require('material-ui/lib/svg-icons/action/shop')
var BioIcon = require('material-ui/lib/svg-icons/maps/person-pin')

module.exports = React.createClass({
  displayName: 'RightSidebar',
  getInitialState: function() {
    return {
      show: false
    }
  },
  propTypes: {
    activeLink: React.PropTypes.string,
    allCaps: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      activeLink: '',
      allCaps: true
    }
  },
  componentDidMount: function() {
    var self = this;
    this.__registerWithDispatcher()
  },
  __registerWithDispatcher: function() {
    var self = this
    AppDispatcher.register(function(payload){
      var action = payload.action;
      switch(action.actionType){
        case "TOGGLE_RIGHT_SIDEBAR":
          return self.setState({show: !self.state.show})
        default:
          return true;
      }
    });
  },
  __handleLinkClick: function(e) {
    e.preventDefault()
    var link = $(e.target).closest('a').attr('href')
    browserHistory.push(link);
  },
  render: function() {
    var self = this

    return (
      <div
        className='right-sidebar'
        data-show={this.state.show}
        onTouchTap={function(e) {
          if (!$(e.target).closest('a').length) self.setState({show: false})
        }}
        >
        <div className='overlay animated fadeIn'></div>
        <div className='inner-container animated slideInRight'>
          <div className='background animated fadeIn'></div>
          <div className='links'>
            <a href='/'
              data-theme='1'
              data-active={this.props.activeLink === 'home'}
              onClick={this.__handleLinkClick}>
              <div className='right-sidebar-icon animated' data-link='home'>
                <div className='text'>Home</div>
              </div>
            </a>
            <a href='/photos'
              data-theme='2'
              data-active={this.props.activeLink === 'photos'}
              onClick={this.__handleLinkClick}>
              <div className='right-sidebar-icon animated' data-link='photos'>
                <div className='text'>Photos</div>
              </div>
            </a>
            <a href='/tour'
              data-theme='1'
              data-active={this.props.activeLink === 'tour'}
              onClick={this.__handleLinkClick}>
              <div className='right-sidebar-icon animated' data-link='tour'>
                <div className='text'>Shows</div>
              </div>
            </a>
            <a href='/videos'
              data-theme='3'
              data-active={this.props.activeLink === 'videos'}
              onClick={this.__handleLinkClick}>
              <div className='right-sidebar-icon animated' data-link='videos'>
                <div className='text'>Videos</div>
              </div>
            </a>
            <a href='bio'
              data-theme='3'
              data-active={this.props.activeLink === 'bio'}
              onClick={this.__handleLinkClick}>
              <div className='right-sidebar-icon animated' data-link='bio'>
                <div className='text'>Bio</div>
              </div>
            </a>
            <a href='mailto:litronixmanagement@gmail.com'
              data-theme='1'
              data-active={this.props.activeLink === 'contact'}
            >
              <div className='right-sidebar-icon animated' data-link='contact'>
                <div className='text'>Contact</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
})
