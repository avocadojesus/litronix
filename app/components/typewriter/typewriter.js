import React from 'react'
import ReactDOM from 'react-dom'
import ls from 'local-storage'
import styles from './typewriter.less'
import $ from 'jquery'
import typewriter from 'typewriter'
var async = require('async')
const LOCATIONS = ["top-left", "top-middle", "top-right", "center-left", "center-middle", "center-right", "bottom-left", "bottom-middle", "bottom-right"]
const COLORS = [
  "white",
  "#63c6d8", // blue
  "#f977ff", // magenta
  "#77ff90", // lightlimegreen
  "#e8ff77", // tartyellow
  "#ff4c4c", // bloodred
  "#ad4cff" // purple
]
const OPACITIES = [".7", ".8", ".9", "1"]

export default class Typewriter extends React.Component {
  constructor(props) {
    super()
    this.state = {
      location: null,
      color: null,
      opacity: null,
      content: null
    }
  }
  componentDidMount() {
    this.__initializeTypewriter()
    this.__genRandomStyle()
    this.__writeContent()
  }
  componentDidUpdate(prev_props) {
    if (this.state.content !== this.props.content) {
      this.__genRandomStyle()
      this.__writeContent()
    }
  }
  render() {
    return (
      <div
        className='typewriter'
        data-location={this.state.location}
        data-color={this.state.color}
        data-opacity={this.state.opacity}
      >
        <div className='spacer'></div>
        <div ref='content' className='content' style={this.__contentStyle()}></div>
      </div>
    )
  }
  __contentStyle() {
    return {
      opacity: this.state.opacity,
      color: this.state.color
    }
  }
  __genRandomStyle() {
    this.__setRandomOpacity()
    this.__setRandomColor()
    this.__setRandomLocation()
  }
  __initializeTypewriter() {
    this.tw = typewriter(ReactDOM.findDOMNode(this.refs.content))
                .withAccuracy(99)
                .withMinimumSpeed(3)
                .withMaximumSpeed(6)
                .build()
  }
  __prepContent(content) {
    // split string on new line breaks
    var stripped_paras_content = (content || "").replace(/<\/p>/g, '\n')
    stripped_paras_content = stripped_paras_content.replace(/<p>/g, '')
    stripped_paras_content = stripped_paras_content.replace(/<br\/>/g, '\n')
    stripped_paras_content = stripped_paras_content.replace(/<br>/g, '\n')

    // remove all other html chars
    var tmp = $("<div>").attr("style","display:none");
    var html_stripped_text = stripped_paras_content.split(/[\n]/g).map(function(str) {
      return tmp.html(str).text();
    })
    tmp.remove();
    return html_stripped_text
  }
  __setRandomOpacity() {
    this.setState({
      opacity: OPACITIES[Math.floor(Math.random() * OPACITIES.length)]
    })
  }
  __setRandomColor() {
    this.setState({
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    })
  }
  __setRandomLocation() {
    this.setState({
      location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
    })
  }
  __writeContent(content) {
    this.setState({content: content || this.props.content || ""})
    content = this.__prepContent(content || this.props.content || "")
    this.tw
      .clear()
      .waitRange(1000, 2000)

    var i = 0
    async.each(content || "",
      function(str, cb) {
        this.tw
          .type(str)
          .waitRange(1000, 5000)
          .put('<br/>', function() {
            cb()
          }.bind(this))
      }.bind(this),
      function() {
        this.setState({content: null})
        return this.props.onTypeEnd()
      }.bind(this)
    )
  }
}

Typewriter.propTypes = {
  content: React.PropTypes.string,
  onTypeEnd: React.PropTypes.func
}

Typewriter.defaultProps = {
  content: "",
  onTypeEnd: function(){}
}
