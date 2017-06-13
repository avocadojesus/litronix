var React = require('react');
import './right-sidebar-activator.css';
var RightSidebarActions = require('../../actions/right-sidebar-actions')
import AppsIcon from 'material-ui/svg-icons/navigation/apps'

module.exports = React.createClass({
  displayName: 'RightSidebarActivator',
  getInitialState: function() {
    return {

    }
  },
  propTypes: {
    color: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      color: 'white'
    }
  },
  componentDidMount: function() {

  },
  render: function() {
    var self = this

    return (
      <AppsIcon
        className='right-sidebar-activator'
        color={this.props.color}
        fill={this.props.color}
        style={{fill: this.props.color}}
        onTouchTap={function(){
          RightSidebarActions.toggle()
        }}
        />
    )
  }
})
