var React = require('react');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var RightSidebar = require('../../components/right-sidebar');
var $ = require('jquery');
var ls = require('local-storage');
require('./contact.css');

module.exports = React.createClass({
  displayName: 'ContactController',
  pages_loaded: [],
  getInitialState: function() {
    return {
      email: null,
      first_name: null,
      last_name: null,
      message: null,
    };
  },
  componentDidMount: function() {
    document.title = "Litronix - Contact"
  },
  componentWillUnmount: function() {

  },
  __loadData: function(page) {
    var self = this

  },
  __handleStoreUpdates: function() {

  },
  render: function() {
    var self = this
    return (
      <div className='Contact-Controller'>
        <RightSidebar />
        <Header
          visible={true}
          activeLink={"contact"} />
        <div
          className='main-container outer-container'
          data-is-scrolled-past-header={true} >
            <div className='page-title'>Contact</div>
            <div className='page-subtitle'>Have and questions or want to book as session? let us know.</div>
            <div className='sectional-label'>Call</div>
            <div className='sectional-description'>Contact us by phone! If we don't immediately answer, we will get back to you within 24 hours.</div>
            <div className='phone-number-container'>
              <div className='label'>Phone</div>
              <div className='phone-number'><a href='tel:6572100255'>(657) 210-0255</a></div>
            </div>
            <div className='sectional-label'>Email</div>
            <div className='sectional-description'>Shy? Fill out the form below with any questions you have! Make sure to leave your email address, so we can respond to your inquiry!</div>
            <div className='email-list-container'>
              <div className='label'>Email</div>
              <div className='email'><a href='mailto:spaceandtimerecording@gmail.com'>spaceanttimerecording@gmail.com</a></div>
            </div>
            <div className='form-container'>
              <div className='form-inner-container'>
                <div className='email-container input-container'>
                  <div className='input-label'>Email</div>
                  <input
                    value={this.state.email}
                    onChange={(e, v) => {
                      this.setState({email: e.target.value});
                    }}
                    placeholder='Your Email Address'
                    className='email-input' />
                </div>
                <div className='name-container input-container'>
                  <div className='input-label'>First and last name</div>
                  <input
                    value={this.state.first_name}
                    onChange={(e, v) => {
                      this.setState({first_name: e.target.value});
                    }}
                    placeholder='First Name'
                    className='first-name-input' />
                  <input
                    value={this.state.last_name}
                    onChange={(e, v) => {
                      this.setState({last_name: e.target.value});
                    }}
                    placeholder='Last Name'
                    className='last-name-input' />
                </div>
                <div className='message-container input-container'>
                  <div className='input-label'>Message</div>
                  <textarea
                    value={this.state.message}
                    onChange={(e, v) => {
                      this.setState({message: e.target.value});
                    }}
                    placeholder='Message'
                    className='message-input'>
                  </textarea>
                </div>
                <button className='submit-btn'>Submit</button>
              </div>
            </div>
          <Footer />
        </div>
      </div>
    )
  }
})
