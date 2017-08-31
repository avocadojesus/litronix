var $ = require('jquery')
var Promise = require('bluebird')
var AppDispatcher = require('../dispatchers/app-dispatcher')
var ls = require('local-storage')

exports.getRemote = function(opts) {
  return new Promise(function(accept, reject) {
    $.get('/feed', opts)
      .done(accept)
      .fail(reject)
  })
}

exports.create = function(post) {
  AppDispatcher.handleAction({
    actionType: "CREATE_POST",
    data: post
  });
}

exports.createRemote = function(opts) {
  opts = opts || {}
  opts.auth_token = ls.get('auth_token')

  return new Promise(function(accept, reject) {
    $.post('/posts', opts)
      .done(accept)
      .fail(reject)
  })
}

exports.updateRemote = function(id, opts) {
  opts = opts || {}
  opts.auth_token = ls.get('auth_token')

  return new Promise(function(accept, reject) {
    $.ajax({
      url: '/posts/' + id,
      type: 'PUT',
      data: opts,
      success: accept,
      error: reject
    });
  })
}
