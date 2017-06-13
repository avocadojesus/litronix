var React = require('react');
var ReactDOM = require('react-dom');
import './loader.css';

module.exports = React.createClass({
  displayName: 'Loader',
  buildWave: function(w, h, path, m) {

    var a = h / 4;
    var y = h / 2;

    var pathData = [
      'M', w * 0, y + a / 2,
      'c',
        a * m, 0,
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,

      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a
    ].join(' ');

    path.setAttribute('d', pathData);
  },
  componentDidMount: function() {
    var path = ReactDOM.findDOMNode(this.refs.path);
    var m = 0.512286623256592433;

    this.buildWave(90, 60, path, m);
  },
  render: function() {
    return (
      <div className='loader'>
        <svg xmlns="http://www.w3.org/2000/svg"
           width="80px" height="60px"
           viewBox="5 0 80 60">
          <path className="wave"
              fill="none"
              stroke="gray"
              strokeWidth="4"
              strokeLinecap="round"
              ref='path'>
          </path>
        </svg>
      </div>
    )
  }
})
