var React = require('react');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var TourDate = require('../../components/tour-date');
var RightSidebar = require('../../components/right-sidebar');
var StaticHeader = require('../../components/static-header')
import "./tour.css"
var $ = require('jquery');

module.exports = React.createClass({
  displayName: 'TourController',
  pages_loaded: [],
  getInitialState: function() {
    return {
      scrolledDown: false,
      scrolledPastHeader: false,
      tour_dates: [],
      has_loaded: false
    };
  },
  componentDidMount: function() {
    var self = this;
    // $(window).unbind('scroll.viewScroll')
    // $(window).bind('scroll.viewScroll', function(e) {
    //   if (!self.isMounted()) return true;
    //
    //   if ($(e.target).scrollTop() > 0) {
    //     self.setState({
    //       scrolledDown: true,
    //       scroll_top: $(window).scrollTop() + $(window).height()
    //     })
    //   } else {
    //     self.setState({
    //       scrolledDown: false,
    //       scroll_top: $(window).scrollTop() + $(window).height()
    //     })
    //   }
    // })
    document.title = "Litronix - Shows"
    //
    // if (window.lastScrollTop) {
    //   // note: this timeout is put in place to correct a strange routing mechanism
    //   // within react. Probably wont be necessary anymore post-upgrade
    //   setTimeout(function() {
    //     $(document.body).scrollTop(window.lastScrollTop)
    //   })
    // }

    this.__loadData()
  },
  componentWillUnmount: function() {
    $(window).unbind('scroll.viewScroll')
  },
  __handleHeroScrollPass: function() {
    this.setState({scrolledPastHeader: true})
  },
  __handleHeroScrollEnter: function() {
    this.setState({scrolledPastHeader: false})
  },
  __loadData: function() {
    var self = this
    $.getJSON('http://api.bandsintown.com/artists/Litronix/events.json?api_version=2.0&app_id=MattCostaWebPortal&callback=?', function(events) {
      self.setState({
        tour_dates: events,
        has_loaded: true
      })
    })
  },
  render: function() {
    var self = this
    return (
      <div className='Tour-Controller'>
        <RightSidebar />
        <Header
          visible={true} activeLink='tour' />
        <div
          className='tour-main-container'
          data-is-scrolled-past-header={this.state.scrolledPastHeader} >
          <div className="outer-container">
            <div className='tour-banner'></div>
          </div>
          <div className='tour-dates-container outer-container'>
            {
              this.state.tour_dates.length === 0 &&
              this.state.has_loaded &&
              <div className='empty-message'>Kevin has no tour dates coming up</div>
            }
            {this.state.tour_dates.map(function(tour_date, i) {
              return (
                <TourDate
                  tour_date={tour_date}
                  key={i}
                  />
              )
            })}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
})
