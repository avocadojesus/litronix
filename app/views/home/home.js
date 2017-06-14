import React from 'react'
import ls from 'local-storage'
import styles from './home.less'
import $ from 'jquery'
import AudioPlayer from '../../components/audio-player'
import Header from '../../components/header'

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
          <Header activeLink="home" visible={true} />
          <div className='backdrop-container'>
            <div className='backdrop-img'></div>
            <div className='pump-the-gas-banner'>
              <div className='album-container'>
                <div className='album-image'></div>
              </div>
              <div className='text-container'>
                <div className='album-title'>Pump The Gas - Out Now!</div>
                <div className='link-container'>
                  <a href='bandcamp-link'>Listen Now at Litronix Bandcamp</a>
                  <a href='porchparty-link'>Listen Now at Porchparty Records</a>
                </div>
                <div className='link-container'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='audio-player-outer-container'>
          <AudioPlayer src="/audio/hole-in-the-wall.mp3" />
        </div>
      </div>
    )
  }

}

HomeView.propTypes = {

}

HomeView.defaultProps = {

}
