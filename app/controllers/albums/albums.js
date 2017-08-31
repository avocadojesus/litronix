var React = require('react');
var AlbumViewer = require('../../components/album-viewer/album-viewer');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var albums = require('../../config/albums');
var RightSidebar = require('../../components/right-sidebar');
var $ = require('jquery');
var browserHistory = require('react-router').browserHistory;
var StaticHeader = require('../../components/static-header')
import "./albums.css"

module.exports = React.createClass({
  displayName: 'AlbumsController',
  pages_loaded: [],
  getInitialState: function() {
    return {
      scrolledDown: false,
      scrolledPastHeader: true,
    };
  },
  componentDidMount: function() {
    document.title = "Litronix - Albums"
    var self = this;
  },
  componentDidUpdate: function() {

  },
  componentWillUnmount: function() {

  },
  render: function() {
    var self = this

    return (
      <div className='Albums-Controller'>
        <RightSidebar />
        <Header
          visible={true}
          activeLink={"albums"} />
        <div
          className='albums-main-container'
          data-is-scrolled-past-header={this.state.scrolledPastHeader}>
          <StaticHeader className="outer-container" activeLink='albums'/>
          <AlbumViewer
            className="outer-container"
            scrolledDown={this.state.scrolledDown}
            albums={albums}
            theme={'default'} />
          <Footer />
        </div>
      </div>
    )
  }
})
