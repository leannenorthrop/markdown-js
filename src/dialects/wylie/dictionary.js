if (typeof define !== 'function') { var define = require('amdefine')(module) }
define([], function () {
  var Dictionary = new Map();

  Dictionary.addAll = function(obj) {
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        var syllables = p.split(" ");
        if (syllables.length > 0) {
          var hash = Dictionary;
          for (var i in syllables) {
            var syllable = syllables[i];
            if (!hash.has(syllable)) {
              hash.set(syllable,new Map());
            }
            hash = hash.get(syllable);
          }
          hash.set(p, obj[p]);
        }
      }
    }
  };

  Dictionary.findWord = function(word) {
    if (word !== undefined) {
      if (word[word.length-1] === " ") {
        word = word.substring(0, word.length-1);
      }
      var syllables = word.split(" ");
      var hash = Dictionary;
      for (var i in syllables) {
        var syllable = syllables[i];
        if (!hash.has(syllable)) {
          hash = undefined;
          break;
        }
        hash = hash.get(syllable);
      }
      if (hash === undefined) {
        return undefined;
      } else {
        return hash.has(word) ? hash.get(word) : hash;
      }
    }
  };

  Dictionary.validUntilSyllableIndex = function(word) {
    if (word !== undefined) {
      var syllables = word.split(" ");
      var found = false;
      var syllable = "";
      var count = 0;
      for (var i in syllables) {
        syllable += syllables[i] + " ";
        if (Dictionary.findWord(syllable) !== undefined) {
          found = true;
          count++;
          if (count === syllables.length) {
            break;
          }
        } else {
          break;
        }
      }
      if (found) {
        return count;
      } else {
        return -1;
      }
    }
  };

  return Dictionary;
});