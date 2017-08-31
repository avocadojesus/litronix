var React = require('react');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var ImageViewer = require('../../components/image-viewer');
var RightSidebar = require('../../components/right-sidebar');
var NativeImage = require('../../components/image');
var $ = require('jquery');
var ls = require('local-storage');
require('./bio.less');

module.exports = React.createClass({
  displayName: 'BioController',
  pages_loaded: [],
  getInitialState: function() {
    return {

    };
  },
  componentDidMount: function() {
    document.title = "Litronix - Bio"
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
      <div className='Bio-Controller'>
        <RightSidebar />
        <Header
          visible={true}
          activeLink={"bio"} />
        <div
          className='main-container outer-container'
          data-is-scrolled-past-header={true} >
          <div className='bio-image'></div>
          <div className='bio'>
            <div className='section about'>
              <div className='title'>ABOUT LITRONIX</div>
              <div className='body'>
                "The Gas Station is a movie that never ends.  People of all kinds come to the gas station to fill up and roll out.  Always coming and going.  Some people are local, most are not. Some are travelers, some are hookers, some are drug dealers, drinkers, homeless, supermodels, actors, tweakers, surfers, professionals, and some are survivors.  The gas station is always moving.  Except for me.  I stay still.  I live here.  I watch the never-ending movie and take notes. And this album is what I came up with."
              </div>
            </div>
            <div className='section about'>
              <div className='title'>BIOGRAPHY</div>
              <div className='body'>
                LA native Kevin Litrow's "LITRONIX" is a one-man music machine.
                Technologically based off the roots of repetition through high-tech loop pedals, Kevin creates pop structures coloring the songs with dynamic layers of warm analog synthesizers, micro tonally open tuned guitar, bass heavy polyrhythmic electronic beats and soulful vocal melodies on top. The beats are created from either beat boxing, drum machines, or just experimenting with what toys or instruments are around at the time. The vocals are what drive the soul of the sound and command the listener to either think deep or dance hard. Each song has it's own character and is it's own painting with it's own subject. Every subject has a deep meaning or a story to tell.
              </div>
            </div>
            <div className='section about'>
              <div className='title'>HISTORY</div>
              <div className='body'>
                Past History :<br/>
                60 Watt Kid 2004- 2010<br/>
                Dance Disaster Movement 2001-2005<br/>
                Radar 1998-2001
              </div>
            </div>
            <div className='section about'>
              <div className='title'>PRESS</div>
              <div className='body'>
                <a href="http://www.flaunt.com/content/ilexb4x3e4bw1xv56i4apqv77fya05">FLAUNT MAGAZINE VIDEO PREMIER AND INTERVIEW</a><br/>
                <a href="http://buzzbands.la/2017/05/03/premiere-litronix-hole-wall/">Premiere: Litronix, ‘Hole in the Wall’</a><br/>
                <a href="http://www.presstelegram.com/arts-and-entertainment/20160712/long-beachs-litronix-finds-inspiration-at-the-gas-pump">Long Beach Press Telegram Interview</a><br/>
                <a href="http://ghettoblastermagazine.com/tag/litronix/">Ghettoblaster Magazine Premier</a><br/>
                <a href="http://buzzbands.la/2017/05/03/premiere-litronix-hole-wall/">Premiere: Litronix, ‘Hole in the Wall’</a><br/><br/>
                <b>Pump the Gas</b><br/><br/>
                <div className='quote'>
                  “An Album Four Years in the Making Which Fuses Infectious Loops, With Dreamy Synth, Guitars and Vocals to Create Unforgettable Pop Music "pulses with the energy of its surroundings and the subversive tendencies of its experimental pop creator."
                </div>
                <i>- Buzzbands</i><br/><br/>
                <b>Premier at Buzzbands</b><br/><br/>
                <div className='quote'>
                  “Litronix is Kevin Litrow, the longtime synthesizer visionary…the purest and clearest incarnation of his aesthetic yet. He’s got an upcoming album on Long Beach’s Porch Party Records (produced by Avi of Avi Buffalo) that matches Silver Apples’ synthscapes, Suicide’s pulsebeat and Broadcast’s electro-psychedelia to his own fearlessly expressive confessionals. Think of these as soul songs from an alternate universe—ballads by J.G. Ballard or Alfred Bester, with one man and his machines alone against the void.”<br/>
                </div>
                <i>-LA Record</i><br/><br/><br/>

                <b>Are You New Age?</b><br/>
                7” Single Review<br/><br/>
                <div className='quote'>
                  “Litronix, electro-cosmic visionary Kevin Litrow (Dance Disaster Movement, 60 Watt Kid  and his co-pilot and producer Avi Buffalo. The gloriously rebuilt “Are You New Age?”, one of Litrow’s signature songs, is like Suicide’s Martin Rev and Talking Heads’ David Byrne on a last-ditch succeed-at-all-costs mission to save humanity from itself, with therapeutic synthesizers and lyrics that sound like one of those AI philosophers Philip K. Dick used to have people carry around in suitcases.”<br/>
                </div>
                <i>-L.A. Record</i>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
})
