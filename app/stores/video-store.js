var AppDispatcher = require('../dispatchers/app-dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash')
var CHANGE_EVENT = 'change';
var _store = {}

var addItem = function(item){
  if (_.isArray(item)) {
    item.map(function(i) {
      addItem(i)
    })
  } else {
    _store[item.id] = item;
  }
};

var updateItem = function(id, item){
  _store[id] = item;
};

var removeItem = function(index){
  var new_store = {}
  for(var i in _store) {
    var item = _store[i]
    if (_store[item.id] !== index) new_store[i] = _store[i]
  }
  _store = new_store
}

var VideoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  get: function(){
    return _.sortBy(_.values(_store), 'created_at').reverse();
  },
  getWhere: function(opts){
    return _.filter(this.get(), opts)
  },
  clear: function(){
    _store = []
    return _store;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case "CREATE_VIDEO":
      addItem(action.data);
      VideoStore.emit(CHANGE_EVENT);
      break;
    case "UPDATE_VIDEO":
      updateItem(action.id, action.data);
      VideoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = VideoStore;
