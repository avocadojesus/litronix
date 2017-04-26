var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');
var litronix_conf = require('./litronix-conf.json');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render(__dirname + '/views/index.ejs');
});

app.get('*', function(req, res) {
  res.render(__dirname + '/views/index.ejs');
});

app.listen(3005, function() {
  console.log('Server is up at 3005')
});
