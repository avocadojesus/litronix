var React = require('react');
var sprintf = require('sprintf-js').sprintf;
var $ = require('jquery');
import './footer.css';

module.exports = React.createClass({
  displayName: 'Footer',
  render: function() {
    return (
      <div className='footer outer-container'>
        <div className='copyright'>&copy; 2017 Space + Time</div>
        <div className='links'>
          <a href='/home'>Home</a>
          <a href='/tour'>Virtual Tour</a>
          <a href='/gear'>Gear</a>
          <a href='/albums'>Albums</a>
          <a href='/videos'>Videos</a>
          <a href='/contact'>Contact</a>
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
