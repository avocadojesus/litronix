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

var PostStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  get: function(){
    return _.sortBy(_.values(_store), 'created_at').reverse();
  },
  getByNetwork: function(network) {
    return _.filter(this.get(), function(post) {
      if (_.isArray(network)) {
        return network.indexOf(post.network) > -1
      } else {
        return post.network === network
      }
    })
  },
  getByAdaptorID: function(adaptor_id) {
    return _.filter(this.get(), function(post) {
      if (_.isArray(adaptor_id)) {
        return adaptor_id.indexOf(post.adaptor_id) > -1
      } else {
        return post.adaptor_id === adaptor_id
      }
    })
  },
  getByNetworkAndAdaptor: function(network, adaptor_id) {
    if (!adaptor_id) return this.getByNetwork(network)
    return _.filter(this.get(), function(post) {
      if (_.isArray(network)) {
        return (network.indexOf(post.network) > -1 && post.adaptor_id === adaptor_id)
      } else {
        return post.network === network
      }
    })
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
    case "CREATE_POST":
      addItem(action.data);
      PostStore.emit(CHANGE_EVENT);
      break;
    case "UPDATE_POST":
      updateItem(action.id, action.data);
      PostStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = PostStore;
