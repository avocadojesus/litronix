var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
// var Home = require('./controllers/home');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var injectTapEventPlugin = require('react-tap-event-plugin');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './controllers/home';
import Bio from './controllers/bio';
import Photos from './controllers/photos';
import Videos from './controllers/videos';
require('./app.less')
injectTapEventPlugin();

window.onload = function() {
  ReactDOM.render((
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route component={Home} name='home' path='/' ignoreScrollBehavior/>
        <Route component={Photos} name='photos' path='/photos' ignoreScrollBehavior/>
        <Route component={Bio} name='bio' path='/bio' ignoreScrollBehavior/>
        <Route component={Videos} name='videos' path='/videos' ignoreScrollBehavior/>
      </Router>
    </MuiThemeProvider>
  ), document.querySelector('#app-target'));
}
