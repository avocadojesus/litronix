var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');
var SocialNetworkCache = require('./lib/social-network-cache');
var gmailSend = require('gmail-send');
var config = require('./config.json');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static('public'));

var cache = new SocialNetworkCache({
  onInit: function() {
    cache
      .ingest()
      .then(function(summary) {
        console.log(summary)
      })
  }
});

/*
** GET /feed
** ---------
** requst which pulls all post data from social networks.
** accepts the following params:
**
** @page (int): the page number you are requesting to view
** @network (string/array): the network/s you want to filter by
** @adaptor_id (string): the adaptor_id you want to filter by
*/
app.get('/feed', function(req, res) {
  var opts = {
    page: req.query.page || 1,
    fetch_inactive: false
  }
  if (req.query.network) opts.network = req.query.network
  if (req.query.adaptor_id) opts.adaptor_id = req.query.adaptor_id
  if (req.query.auth_token) opts.fetch_inactive = true

  cache
    .get(opts)
    .then(function(posts) {
      res.json(posts)
    })
    .catch(function(error) {
      console.log(error);
      res.status(422)
      res.json(error)
    })
})

app.get('/virtual-tour-images', function(req, res) {
  var dir = './public/img/rooms'
  var folders = fs.readdirSync(dir)
  var obj = {}
  for (var i in folders) {
    var file = folders[i]
    var stat = fs.statSync(dir + '/' + file)
    if (stat && stat.isDirectory()) {
      obj[file] = []
      var files = fs.readdirSync('./public/img/rooms/' + file)
      for (var i in files) {
        if (files[i] !== ".DS_Store") obj[file].push({
          src: '/img/rooms/' + file + '/' + files[i],
          thumb: '/img/rooms_thumbs/' + file + '/' + files[i],
        })
      }
    }
  }
  console.log(obj);
  res.send(obj);
})

app.get('/', function(req, res) {
  res.render(__dirname + '/views/index.ejs');
});

app.post('/contact-email', function(req, res) {
  var send = require('gmail-send')({
    user: config.gmail_username,
    pass: config.gmail_password,
    to:   config.gmail_username,
    subject: 'Contact Form',
    text:    'test text'
    // html:    '<b>html text text</b>'
  });
});

app.get('*', function(req, res) {
  res.render(__dirname + '/views/index.ejs');
});

app.listen(3005, function() {
  console.log('Server is up at 3005')
});
