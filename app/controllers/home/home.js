var React = require('react');
var Hero = require('../../components/hero');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var albums = require('../../config/albums');
var $ = require('jquery');
var PostActions = require('../../actions/post-actions');
var PostStore = require('../../stores/post-store');
var PostComponent = require('../../components/post');
var RightSidebar = require('../../components/right-sidebar');
var AudioPlayer = require('../../components/audio-player');
var ls = require('local-storage');
require('./home.less');

module.exports = React.createClass({
  displayName: 'HomeController',
  pages_loaded: [],
  getInitialState: function() {
    return {
      scrolledDown: false,
      scrolledPastHeader: false,
      posts: [],
      page: 1,
      loading_data: false,
      reached_end_of_feed: false
    };
  },
  componentDidMount: function() {
    document.title = "Litronix - Home"
    var self = this;
    this.pages_loaded = []
    $(window).unbind('scroll.viewScroll')
    $(window).bind('scroll.viewScroll', function(e) {
      if (!self.isMounted()) return true;
      if (($(window).scrollTop() + $(window).height() >= $(document).height() - 50) && !self.state.loading_data && !self.state.reached_end_of_feed) {
        self.__loadData(self.state.page + 1)
      }

      if ($(e.target).scrollTop() > 0) {
        self.setState({
          scrolledDown: true,
          scroll_top: $(window).scrollTop() + $(window).height()
        })
      } else {
        self.setState({
          scrolledDown: false,
          scroll_top: $(window).scrollTop() + $(window).height()
        })
      }
    })

    if (window.lastScrollTop) {
      // note: this timeout is put in place to correct a strange routing mechanism
      // within react. Probably wont be necessary anymore post-upgrade
      setTimeout(function() {
        $(document.body).scrollTop(window.lastScrollTop)
      })
    }

    this.__loadData()
    PostStore.addChangeListener(this.__handleStoreUpdates)
  },
  componentWillUnmount: function() {
    this.pages_loaded = []
    $(window).unbind('scroll.viewScroll')
    console.log(this.pages_loaded);
  },
  __handleHeroScrollPass: function() {
    this.setState({scrolledPastHeader: true})
  },
  __handleHeroScrollEnter: function() {
    this.setState({scrolledPastHeader: false})
  },
  __loadData: function(page) {
    var self = this
    self.setState({loading_data: true})
    var page = page || this.state.page
    if (self.pages_loaded.indexOf(page) > -1) {
      return false
    }

    PostActions
      .getRemote({
        page: page,
        adaptor_id: ["spaceandtime_instagram"],
        auth_token: ls.get('auth_token')
      })
      .then(function(posts) {
        // if there are no posts,
        // prevent more request from
        // going out
        if (posts.length == 0) {
          return self.setState({
            reached_end_of_feed: true
          })
        }

        self.pages_loaded.push(page)
        self.setState({
          page: page,
          loading_data: false
        })
        PostActions.create(posts)
      })
      .catch(function(e) {
        self.setState({
          loading_data: false
        })
        console.log(e)
      })
  },
  __handleStoreUpdates: function() {
    this.setState({
      posts: PostStore.getByAdaptorID(
        [
          "matt_costa_facebook",
          "matt_costa_twitter",
          "spaceandtime_instagram",
          "matt_costa_youtube",
          "matt_costa_soundcloud",
          "matt_costa_posts"
        ]
      )
    })
  },
  render: function() {
    var self = this
    return (
      <div className='Home-Controller'>

        <Hero
          scrolledDown={this.state.scrolledDown}
          ref='hero'
          onScrollPass={this.__handleHeroScrollPass}
          onScrollEnter={this.__handleHeroScrollEnter}
          theme={'default'}
          activeLink='home' />
        <RightSidebar />
        <Header
          visible={this.state.scrolledPastHeader} />
        <div
          className='main-container outer-container'
          data-is-scrolled-past-header={this.state.scrolledPastHeader} >
          <div className='space-backdrop'></div>
          <div className='post-container'>
            {this.state.posts.map(function(post, i) {
              return (
                <PostComponent
                  curr_scroll_position={self.state.scroll_top}
                  post={post}
                  key={i}
                  />
              )
            })}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
})
