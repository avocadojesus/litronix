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
              <a href='/instagram' >instagram</a>
              <a href='/facebook' >facebook</a>
              <a href='/blog' >blog</a>
              <a href='/soundcloud' >soundcloud</a>
              <a href='/tour' >tour</a>
              <a href='/contact' >contact</a>
            </div>
            <div className='backdrop-img'></div>
          </div>
        </div>
        <div className='audio-player-outer-container'>
          <AudioPlayer src="/audio/default.mp3" />
        </div>
      </div>
    )
  }

}

HomeView.propTypes = {

}

HomeView.defaultProps = {

}
