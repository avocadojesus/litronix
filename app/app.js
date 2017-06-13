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
import Photos from './controllers/photos';
require('./app.less')
injectTapEventPlugin();

window.onload = function() {
  ReactDOM.render((
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route component={Home} name='home' path='/' ignoreScrollBehavior/>
        <Route component={Photos} name='photos' path='/photos' ignoreScrollBehavior/>
      </Router>
    </MuiThemeProvider>
  ), document.querySelector('#app-target'));
}
