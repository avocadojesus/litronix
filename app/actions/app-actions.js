var AppDispatcher = require('../dispatchers/app-dispatcher')

exports.audioProgressUpdate = function(track_id, progress) {
  AppDispatcher.handleAction({
    actionType: "AUDIO_PROGRESS_UPDATE",
    track_id: track_id,
    progress: progress
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
