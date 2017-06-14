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
          <a href='/home'>Home</a>
          <a href='/tour'>Photos</a>
          <a href='/gear'>Videos</a>
          <a href='/albums'>Bio</a>
          <a href='/mailto:litronixmanagement@gmail.com'>Contact</a>
        </div>
        <div className='social'>
          <a href='https://twitter.com/spacentimemusic'><img src='/img/twitter.png' /></a>
          <a href='https://soundcloud.com/spaceandtimerecording'><img src='/img/soundcloud.png' /></a>
          <a href='https://www.instagram.com/spaceandtimerecording/?hl=en'><img src='/img/instagram.png' /></a>
          <a href='https://www.vimeo.com/spaceandtimerecording'><img src='/img/youtube.png' /></a>
        </div>
      </div>
    )
  }
})
