var $ = require('jquery')
var Promise = require('bluebird')
var AppDispatcher = require('../dispatchers/app-dispatcher')

exports.login = function(opts) {
  return new Promise(function(accept, reject) {
    $.post('/users/login', opts)
      .done(accept)
      .fail(reject)
  })
}
