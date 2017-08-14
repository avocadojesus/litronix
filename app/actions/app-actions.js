var AppDispatcher = require('../dispatchers/app-dispatcher')
var $ = require('jquery')
var Promise = require('bluebird')

exports.audioProgressUpdate = function(track_id, progress, update_duration) {
  AppDispatcher.handleAction({
    actionType: "AUDIO_PROGRESS_UPDATE",
    track_id: track_id,
    progress: progress,
    update_duration: update_duration || false
  });
}

exports.audioVolumeUpdate = function(percent) {
  AppDispatcher.handleAction({
    actionType: "AUDIO_VOLUME_UPDATE",
    volume: percent
  });
}

exports.audioPlay = function(track_id) {
  AppDispatcher.handleAction({
    actionType: "AUDIO_PLAY",
    track_id: track_id
  });
}

exports.audioPause = function(track_id) {
  AppDispatcher.handleAction({
    actionType: "AUDIO_PAUSE",
    track_id: track_id
  });
}

exports.audioMute = function(value) {
  AppDispatcher.handleAction({
    actionType: "AUDIO_MUTE",
    mute: value
  });
}

exports.audioSetTrackFromSoundcloud = function(track_id) {
  AppDispatcher.handleAction({
    actionType: "AUDIO_SET_TRACK_FROM_SOUNDCLOUD",
    track_id: track_id
  });
}

exports.videoSetSourceFromVimeo = function(vimeo_id) {
  AppDispatcher.handleAction({
    actionType: "VIDEO_SET_SRC_FROM_VIMEO",
    vimeo_video_id: vimeo_id
  });
}

exports.videoClose = function() {
  AppDispatcher.handleAction({
    actionType: "VIDEO_CLOSE"
  });
  setTimeout(function() {
    AppDispatcher.handleAction({
      actionType: "RESUME_ALL_MEDIA"
    });
  }, 1)
}

exports.videoPlay = function() {
  AppDispatcher.handleAction({
    actionType: "VIDEO_PLAY"
  });
  setTimeout(function(){
    AppDispatcher.handleAction({
      actionType: "PAUSE_ALL_MEDIA"
    });
  }, 1)
}

exports.getVimeoPoster = function(vimeo_id) {
  return new Promise(function(accept, reject) {
    $.ajax({
      type: 'GET',
      url: 'http://vimeo.com/api/v2/video/' + vimeo_id + '.json',
      success: function(d) {
        return accept(d[0])
      }
    })
  });
}

exports.getVirtualTourImages = function() {
  return new Promise(function(accept, reject) {
    $.ajax({
      type: 'GET',
      url: '/virtual-tour-images',
      success: function(d) {
        return accept(d)
      }
    })
  });
}
