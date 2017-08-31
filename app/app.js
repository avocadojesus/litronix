var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
// var Home = require('./controllers/home');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
import $ from 'jquery';
var browserHistory = require('react-router').browserHistory;
var injectTapEventPlugin = require('react-tap-event-plugin');
import AppActions from './actions/app-actions';
import Home from './controllers/home';
import Gear from './controllers/gear';
import Albums from './controllers/albums';
import Album from './controllers/album';
import Videos from './controllers/videos';
import Photos from './controllers/photos';
import Contact from './controllers/contact';
import Bio from './controllers/bio';
import Tour from './controllers/tour';
import AudioPlayer from './components/audio-player';
import VideoPlayer from './components/video-player';

require('./app.less')
injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if ($(window).width() < 800) {
      AppActions.audioMinimize()
    } else {
      AppActions.audioPlay({
        id: 1,
        artist_name: 'Litronix',
        title: 'Hole in the Wall',
        album_name: 'Pump the Gas',
        stream_url: '/audio/hole-in-the-wall.m4a',
        artwork_url: '/img/pump-the-gas-front-cover-small.png',
      })
    }
  }
  render() {
    return (
      <div className='app-outer-container'>
        <AudioPlayer/>
        <VideoPlayer />
        <Router history={browserHistory}>
          <Route component={Home} name='home' path='/' ignoreScrollBehavior/>
          <Route component={Gear} name='gear' path='/gear' ignoreScrollBehavior/>
          <Route component={Albums} name='albums' path='/albums' ignoreScrollBehavior/>
          <Route component={Album} name='album' path='/albums/*' ignoreScrollBehavior/>
          <Route component={Videos} name='videos' path='/videos' ignoreScrollBehavior/>
          <Route component={Tour} name='tour' path='/tour' ignoreScrollBehavior/>
          <Route component={Photos} name='photos' path='/photos' ignoreScrollBehavior/>
          <Route component={Bio} name='bio' path='/bio' ignoreScrollBehavior/>
          <Route component={Contact} name='contact' path='/contact' ignoreScrollBehavior/>
        </Router>
      </div>
    )
  }
}

window.onload = function() {
  ReactDOM.render(<App />, document.querySelector('#app-target'));
}
