var AppDispatcher = require('../dispatchers/app-dispatcher')

exports.toggle = function(opts) {
  AppDispatcher.handleAction({
    actionType: "TOGGLE_RIGHT_SIDEBAR"
  });
}
