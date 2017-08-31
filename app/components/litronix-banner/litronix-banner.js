var React = require('react');
var $ = require('jquery');
var StaticHeader = require('../static-header');
var Track = require('../track');
import './litronix-banner.less';
import {browserHistory} from 'react-router';
import { Button } from 'semantic-ui-react'

module.exports = React.createClass({
  displayName: 'LitronixBanner',
  mixins: [],
  propTypes: {
    theme: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      is_scrolled_past: false
    }
  },
  getDefaultProps: function() {
    return {
      theme: 'default'
    }
  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  render: function() {
    return (
      <div className='litronix-banner'
        data-theme={this.props.theme}>
        <div className='background-image'></div>
        <div className='background-overlay'></div>
        <div className='logo-container'>
          <img className='logo-img' src='/img/litronix-logo.png' />
          <div className='description'>
            <h1 className="text">Pump The Gas out now!</h1>
            <a href="https://litronix.bandcamp.com/releases"><Button>LISTEN</Button></a>
            <a href="https://porchpartyrecords.bandcamp.com/album/pump-the-gas"><Button>VINYL</Button></a>
          </div>
        </div>
      </div>
    )
  }
})
