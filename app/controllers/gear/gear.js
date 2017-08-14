var React = require('react');
var Header = require('../../components/header/header');
var Footer = require('../../components/footer/footer');
var RightSidebar = require('../../components/right-sidebar');
var $ = require('jquery');
var ls = require('local-storage');
import { Parallax } from 'react-parallax';
require('./gear.css');

module.exports = React.createClass({
  displayName: 'GearController',
  pages_loaded: [],
  getInitialState: function() {
    return {

    };
  },
  componentDidMount: function() {
    document.title = "Space And Time Studio - Gear"
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
      <div className='Gear-Controller'>
        <RightSidebar />
        <Header
          visible={true}
          activeLink={"gear"} />
        <div
          className='main-container outer-container'
          data-is-scrolled-past-header={true} >
          <div className='gear-collection template'>
            <div className='collection-banner'></div>
            <div className='gear-spec-list'>
              <div className='spec'>
                <div className='name'></div>
                <div className='value'></div>
              </div>
            </div>
            <div className='gear-item'>
              <img className='img'/>
              <div className='quantity'></div>
              <div className='name'></div>
            </div>
          </div>
          <div className='gear-collection console'>
            <div className='collection-banner'>
              <div className='title'>Toft ATB</div>
            </div>
            <div className='gear-spec-list'>
              <div className='description'>
                Over the years, the Trident Series 80 console has heard its praises time and time again for its familiar topology, pristine accuracy, and most of all, its premium vintage equalizer. This powerful combination produced an enormous amount of hit records and is still revered as one of the best analog recording consoles made to date. With so much history behind the Trident name, Toft Audio Designs is proud that the Series ATB® Console packages much of the same design, topology and sound as the classic Trident desks.
              </div>
              <div className='spec-container'>
                <div className='spec'>
                  <div className='name'><span>Name</span></div>
                  <div className='value'>Toft Series ATB 16-8-2</div>
                </div>
                <div className='spec'>
                  <div className='name'><span>Year</span></div>
                  <div className='value'>2012</div>
                </div>
                <div className='spec'>
                  <div className='name'><span>Channels</span></div>
                  <div className='value'>16</div>
                </div>
                <div className='spec'>
                  <div className='name'><span>Mic Preamps</span></div>
                  <div className='value'>16</div>
                </div>
                <div className='spec'>
                  <div className='name'><span>Aux Sends</span></div>
                  <div className='value'>6</div>
                </div>
                <div className='spec'>
                  <div className='name'><span>Aux Returns</span></div>
                  <div className='value'>8</div>
                </div>
              </div>
              <div className='image-container'><img src='/img/gear/toft-atb2.jpg' /></div>
            </div>
          </div>
          <div className='gear-collection eq'>
            <div className='collection-banner'>
              <div className='title'>EQ</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/toft-eq.jpeg'/>
              </div>
              <div className='quantity'>16</div>
              <div className='name'>Toft audio sweepable band EQ</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/White-model-4400.gif'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>White model 4400 28 band parametric EQ</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/JBL-Urei 555.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Vintage JBL-Urei 555 Bandpass Filter</div>
            </div>
          </div>
          <div className='gear-collection monitors'>
            <div className='collection-banner'>
              <div className='title'>Monitors</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/ssvc-4.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Niles Audio SCV 4 speaker selector</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/hs50m.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Yamaha Hs 50 active</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/hs50m.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Yamaha HS 30 active</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/hs8subwoofer.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Yamaha HS 8 active subwoofer</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/DT990.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>byer dynamic DT 990 Pro</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/Sony-MDR-V6.jpg'/>
              </div>
              <div className='quantity'>7</div>
              <div className='name'>Sony MDR V6</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/AKG-K141.jpg'/>
              </div>
              <div className='quantity'>5</div>
              <div className='name'>AKG K141</div>
            </div>
          </div>
          <div className='gear-collection mics'>
            <div className='collection-banner'>
              <Parallax bgImage='/img/gear/mics.jpeg'>
                <div className='img-overlay'></div>
                <div className='title'>Microphones</div>
              </Parallax>
            </div>
            <div className='section'><div className='title'>Dynamic</div></div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/sm7.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>SM 7 cardioid</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/sm-57.jpeg'/>
              </div>
              <div className='quantity'>5</div>
              <div className='name'>SM 57 cardioid</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/sm-58.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>SM 58 omnidirectional</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/model-51.jpeg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>model 51</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/RE-55.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Electro-Voice RE-55 omnidirectional</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/EV-664.jpg'/>
              </div>
              <div className='quantity'>3</div>
              <div className='name'>EV 664 Cardioid</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/EV-Slimair-636.png'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>EV Slimair 636 omnidirectional</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/EV-635-A.png'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>EV 635 A omnidirectional</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/EV-630.jpeg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>EV 630 omnidirectional </div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/EV-DS35.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>EV DS 35 cardioid</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/AKG-D190E.jpg'/>
              </div>
              <div className='quantity'>3</div>
              <div className='name'>AKG D190E</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/D112MKII.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>AKG D112</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/Audio-Technica-ATM-25.jpg'/>
              </div>
              <div className='quantity'>3</div>
              <div className='name'>Audio Technica ATM 25 cardioid</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/Sennheiser-MD-408.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Sennheiser MD 408 gooseneck</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/Turner-model-99.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Turner model 99</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/monarch-tm16.JPG'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Monarch Tm - 16</div>
            </div>
            <div className='section'><div className='title'>Condensor</div></div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/neumann-TLM-103.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>neumann TLM 103</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/se-electronics-se-H-3500.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>se electronics se H 3500</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/se-electronics-se-2200-A.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>se electronics se 2200-A</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/AKG-120.jpeg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>AKG 120</div>
            </div>
            <div className='section'><div className='title'>Ribbon</div></div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/Vintage-Altec-Western-Electric-639-A-birdcage.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Vintage Altec-Western Electric 639 A birdcage</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/NOS-active-ribbon-R38AF.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>NOS active ribbon R38AF</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/NOS-RWB.webp'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>NOS RWB</div>
            </div>
            <div className='section'><div className='title'>Crystal</div></div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/Astatic-333-3.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Astatic 333-3</div>
            </div>
          </div>
          <div className='gear-collection compression-and-dynamic-processing'>
            <div className='collection-banner'>
              <Parallax bgImage='/img/gear/amps.jpeg'>
                <div className='img-overlay'></div>
                <div className='title'>Compression and Dynamic Processing</div>
              </Parallax>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/dbx160.jpeg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>DBX 160X</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/dbx166.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>DBX 166 stereo</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/dbx163.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>DBX 163X</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/dbx-118.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>DBX 118 stereo range enhancer</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/art-pro-1-channel.jpeg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Revive Audio Modified Art Pro VLA II Dual Channel Tube Compressor</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/art-pro-2-channel.jpeg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Revive Audio Modified Art Pro VLA IV</div>
            </div>
          </div>
          <div className='gear-collection outboard-gear'>
            <div className='collection-banner'>
              <Parallax bgImage='/img/gear/amps.jpeg'>
                <div className='img-overlay'></div>
                <div className='title'>Outboard Gear</div>
              </Parallax>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/Fuhrman-RV-1.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Fuhrman RV 1</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/effectron1.jpeg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Effectron 1</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/effectron.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Effectron 2</div>
            </div>
          </div>
          <div className='gear-collection amps'>
            <div className='collection-banner'>
              <Parallax bgImage='/img/gear/amps.jpeg'>
                <div className='img-overlay'></div>
                <div className='title'>Amps</div>
              </Parallax>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/yamahara100.jpeg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Yamaha RA 100</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/gemini1.jpeg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Gemini 1</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/reverbrocket.jpeg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Ampeg Reverb Rocket</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/musicmaster.jpg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Fender Musicmaster Bass</div>
            </div>
          </div>
          <div className='gear-collection amps'>
            <div className='collection-banner'>
              <Parallax bgImage='/img/gear/keys.jpeg'>
                <div className='img-overlay'></div>
                <div className='title'>Keys</div>
              </Parallax>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/140b.jpeg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>1964 Wurlitzer 140b</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/markiii.jpeg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>1979 Fender Rhodes Mark I</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/electro3hp.jpeg'/>
              </div>
              <div className='quantity'>2</div>
              <div className='name'>Nord Electro 3 HP</div>
            </div>
          </div>
          <div className='gear-collection guitars'>
            <div className='collection-banner'>
              <Parallax bgImage='/img/gear/guitars.jpg'>
                <div className='img-overlay'></div>
                <div className='title'>Guitars</div>
              </Parallax>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/telecaster.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Fender Telecaster</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/stratocaster.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Fender Stratocaster</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/j45.jpeg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Gibson J45</div>
            </div>
            <div className='gear-item'>
              <div className='img-container'>
                <img className='img' src='/img/gear/martin.jpg'/>
              </div>
              <div className='quantity'>1</div>
              <div className='name'>Martin</div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
})
