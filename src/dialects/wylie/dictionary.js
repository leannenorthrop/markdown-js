if (typeof define !== 'function') { var define = require('amdefine')(module) }
define([], function () {
  var Dictionary = {};
  Dictionary.length = 0;
  Dictionary.items = {};

  Dictionary.addAll = function(obj) {
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        Dictionary.items[p] = obj[p];
        Dictionary.length++;
      }
    }
  };

  Dictionary.setItem = function(key, value) {
      var previous;
      if (Dictionary.hasItem(key)) {
        previous = Dictionary.items[key];
      }
      else {
        Dictionary.length++;
      }
      Dictionary.items[key] = value;
      return previous;
    };

  Dictionary.getItem = function(key) {
    return Dictionary.hasItem(key) ? Dictionary.items[key] : undefined;
  };

  Dictionary.hasItem = function(key) {
    return Dictionary.items.hasOwnProperty(key);
  };
 
  Dictionary.removeItem = function(key) {
    if (Dictionary.hasItem(key)) {
      var previous = Dictionary.items[key];
      Dictionary.length--;
      delete Dictionary.items[key];
      return previous;
    }
    else {
      return undefined;
    }
  };

  Dictionary.keys = function() {
    var keys = [];
    for (var k in Dictionary.items) {
      if (Dictionary.hasItem(k)) {
        keys.push(k);
      }
    }
    return keys;
  };

  Dictionary.values = function() {
      var values = [];
      for (var k in Dictionary.items) {
        if (Dictionary.hasItem(k)) {
          values.push(Dictionary.items[k]);
        }
      }
      return values;
    };

  Dictionary.each = function(fn) {
    for (var k in Dictionary.items) {
      if (Dictionary.hasItem(k)) {
        fn(k, Dictionary.items[k]);
      }
    }
  };

  Dictionary.clear = function() {
    this.items = {};
    this.length = 0;
  };

  return Dictionary;
});