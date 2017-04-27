import React from 'react'
import ls from 'local-storage'
import styles from './home.less'
import $ from 'jquery'
import AudioPlayer from '../components/audio-player'

export default class HomeView extends React.Component {
  constructor(props) {
    super()
    this.state = {

    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div className='Home-View view'>
        <div className='main-container'>
          <div className='logo-container'>
            <div className='logo-img'></div>
          </div>
          <div className='backdrop-container'>
            <div className='links'>
              <div className='left-container'>
                <div className='link-container'>
                  <a href='https://www.instagram.com/litronix/' >instagram</a>
                </div>
                <div className='link-container'>
                  <a href='https://www.facebook.com/litronix1/' >facebook</a>
                </div>
                <div className='link-container'>
                  <a href='http://litronix-blog.tumblr.com/' >blog</a>
                </div>
              </div>
              <div className='right-container'>
                <div className='link-container'>
                  <a href='https://soundcloud.com/litronix1' >soundcloud</a>
                </div>
                <div className='link-container'>
                  <a href='http://www.bandsintown.com/LITRONIX' >tour</a>
                </div>
                <div className='link-container'>
                  <a href='mailto:kevinlitrow@gmail.com' >contact</a>
                </div>
              </div>
            </div>
            <div className='backdrop-img'></div>
          </div>
        </div>
        <div className='audio-player-outer-container'>
          <AudioPlayer src="/audio/maggot.m4a" />
        </div>
      </div>
    )
  }

}

HomeView.propTypes = {

}

HomeView.defaultProps = {

}
