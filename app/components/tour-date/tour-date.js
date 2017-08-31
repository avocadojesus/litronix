var React = require('react');
var $ = require('jquery');
var m = require('moment');
import './tour-date.css';
import {browserHistory} from 'react-router';

module.exports = React.createClass({
  displayName: 'TourDate',
  propTypes: {
    tour_date: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {

    }
  },
  getDefaultProps: function() {
    return {
      tour_date: {}
    }
  },
  componentDidMount: function() {
    console.log(this.props.tour_date);
  },
  componentWillUnmount: function() {

  },
  render: function() {
    var self = this
    return (
      <div className='tour-date'>
        <div className='section date-container'>{m(this.props.tour_date.datetime).format("MMMM Do YYYY")}</div>
        <div className='section venue-container'>{this.props.tour_date.venue.name}</div>
        <div className='section location-container'>{this.props.tour_date.venue.city}, {this.props.tour_date.venue.country}</div>
        <div className='section buy-tickets-container'>
          {
            this.props.tour_date.ticket_url &&
            <button
              onClick={function() {
                window.location.href = self.props.tour_date.ticket_url
              }}>
              Buy Now
            </button>
          }
          {
            !this.props.tour_date.ticket_url &&
            this.props.tour_date.facebook_rsvp_url &&
            <button
              onClick={function() {
                window.location.href = self.props.tour_date.facebook_rsvp_url
              }}>
              View Event
            </button>
          }
        </div>
      </div>
    )
  }
})
