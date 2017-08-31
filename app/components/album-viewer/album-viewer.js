var React = require('react');
var Album = require('../album/album');
import './album-viewer.css';

module.exports = React.createClass({
  displayName: 'Album-Viewer',
  propTypes: {
    albums: React.PropTypes.array,
    scrolledDown: React.PropTypes.bool,
    theme: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      albums: [],
      scrolledDown: false,
      theme: 'default'
    }
  },
  render: function() {
    return (
      <div
        className={'album-viewer item-viewer ' + (this.props.className || "")}
        data-scrolled-down={this.props.scrolledDown}
        data-theme={this.props.theme} >
        <div className='album-viewer-overlay'></div>
        {this.props.albums.map(function(album, i) {
          return (
            <Album album={album} key={i} />
          );
        })}
      </div>
    );
  }
})
