var React = require('react');
var sprintf = require('sprintf-js').sprintf;
var $ = require('jquery');
import { Icon } from 'semantic-ui-react'
import './footer.css';

module.exports = React.createClass({
  displayName: 'Footer',
  render: function() {
    return (
      <div className='footer outer-container'>
        <div className='copyright'>&copy; 2017 Litronix</div>
        <div className='links'>
          <a href='/'>Home</a>
          <a href='/photos'>Photos</a>
          <a href='/tour'>Shows</a>
          <a href='/videos'>Videos</a>
          <a href='/bio'>Bio</a>
          <a href='mailto:litronixmanagement@gmail.com'>Contact</a>
        </div>
        <div className='social'>
          <a href='https://twitter.com/litronix1?lang=en'><Icon size="large" name="twitter" /></a>
          <a href='https://soundcloud.com/litronix1'><Icon size="large" name="soundcloud" /></a>
          <a href='https://www.instagram.com/litronix/'><Icon size="large" name="instagram" /></a>
          <a href='https://www.youtube.com/channel/UCavSVkdXdA-6BxyaRJGcMmQ'><Icon size="large" name="youtube" /></a>
          <a href='https://open.spotify.com/artist/5ncSmmc9BZEaHddQSbeRjZ'><Icon size="large" name="spotify" /></a>
        </div>
      </div>
    )
  }
})
