var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
// var Home = require('./controllers/home');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var injectTapEventPlugin = require('react-tap-event-plugin');
import Home from './controllers/home';
import Gear from './controllers/gear';
import Albums from './controllers/albums';
import Album from './controllers/album';
import Videos from './controllers/videos';
import Contact from './controllers/contact';
import VirtualTour from './controllers/virtual-tour';
import AudioPlayer from './components/audio-player';
import VideoPlayer from './components/video-player';

require('./app.less')
injectTapEventPlugin();

window.onload = function() {
  ReactDOM.render((
    <div className='app-outer-container'>
      <AudioPlayer />
      <VideoPlayer />
      <Router history={browserHistory}>
        <Route component={Home} name='home' path='/' ignoreScrollBehavior/>
        <Route component={Gear} name='gear' path='/gear' ignoreScrollBehavior/>
        <Route component={Albums} name='albums' path='/albums' ignoreScrollBehavior/>
        <Route component={Album} name='album' path='/albums/*' ignoreScrollBehavior/>
        <Route component={Videos} name='videos' path='/videos' ignoreScrollBehavior/>
        <Route component={VirtualTour} name='virtual-tour' path='/tour' ignoreScrollBehavior/>
        <Route component={Contact} name='contact' path='/contact' ignoreScrollBehavior/>
      </Router>
    </div>
  ), document.querySelector('#app-target'));
}
