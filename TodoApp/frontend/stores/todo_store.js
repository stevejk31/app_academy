// holds todo.ids as keys
var _todos = {};

// holds callback functions to run on store updates
var _callbacks = [];

var TodoStore = {
  changed: function(){
    for (var i = 0; i < _callbacks.length; i++) {
      _callbacks[i]();
    }
  },

  addChangedHandler: function(handler){
    _callbacks.push(handler);
  },

  removeChangedHandler: function (handler) {
    _callbacks = _callbacks.filter (function (el) {
      return el !== handler;
    });
  },

  all: function () {
    var todoClone = [];
    Object.keys(_todos).forEach(function(key){
      todoClone.push(_todos[key]);
    });
    return todoClone;
  },

  fetch: function () {
    $.get('/api/todos', {}, function(response){
      for (var i = 0; i < response.length; i++) {
        _todos[response[i].id] = response[i];
      }
      TodoStore.changed();
    });
  },

  create: function (todo) {
    $.post('/api/todos', todo, function(response){
      _todos[response.id] = response;
      TodoStore.changed();
    });
  },

  destroy: function (id) {
    var responseFc = function(response) {
      delete _todos[id];
      TodoStore.changed();
    };
    if (_todos[id]){
      $.ajax({
        url: '/api/todos/'+id,
        type: 'DELETE',
        success: responseFc
      });
    }
  },

  toggleDone: function (id) {
    var doneVar = true;
    if (_todos[id]["done"]) {
       doneVar = false;
    }
    var updatedData = {todo: {done: doneVar}};
    var responseFc = function(response) {
      _todos[id]["done"] = doneVar;
      TodoStore.changed();
    };
    if (_todos[id]){
      $.ajax({
        url: '/api/todos/'+id,
        data: updatedData,
        type: 'PUT',
        success: responseFc
      });
    }
  }
};

module.exports = TodoStore;
