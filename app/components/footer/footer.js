var React = require('react');
var sprintf = require('sprintf-js').sprintf;
var $ = require('jquery');
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
          <a href='/videos'>Videos</a>
          <a href='/bio'>Bio</a>
          <a href='/mailto:litronixmanagement@gmail.com'>Contact</a>
        </div>
        <div className='social'>
          <a href='https://twitter.com/litronix1?lang=en'><img src='/img/twitter.png' /></a>
          <a href='https://soundcloud.com/litronix1'><img src='/img/soundcloud.png' /></a>
          <a href='https://www.instagram.com/litronix/'><img src='/img/instagram.png' /></a>
          <a href='https://www.youtube.com/channel/UCavSVkdXdA-6BxyaRJGcMmQ'><img src='/img/youtube.png' /></a>
        </div>
      </div>
    )
  }
})
