if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['../markdown_helpers',
        './dialect_helpers',
        './gruber',
        '../parser',
        './wylie/wmd2uchen'],

function (MarkdownHelpers, DialectHelpers, Gruber, Markdown, UChenMap) {

  var ExtendedWylie = DialectHelpers.subclassDialect( Gruber );
  var inline_until_char = DialectHelpers.inline_until_char;
  var uChenMap = UChenMap;
  ExtendedWylie.inline[ "@" ] = function inlineWylie( text ) {
        function parseSyllable(syllable) {
          var result = "";
          for (var i = 0; i < syllable.length; i++) {
            var c = syllable.charAt(i);
            result += uChenMap[c] ? (uChenMap[c])  : c;
          }
          return result;
        }

        function parse(text) {
          var result = "";

          var syllables = text.split(" ");
          for (var i = 0; i < syllables.length; i++) {
            result += parseSyllable(syllables[i]) + uChenMap[" "];
          }

          return result;
        }

        // Inline code block. as many backticks as you like to start it
        // Always skip over the opening ticks.
        var m = text.match( /(@+)(([\s\S\W\w]*?)\1)/ );

        if ( m && m[2] ) {
          var txt = parse(m[3]);
          return [ m[1].length + m[2].length, [ "wylie", { style: "font-size:72pt;"}, txt ] ];
        }
        else {
          // TODO: No matching end code found - warn!
          return [ 1, "@" ];
        }
      };

  Markdown.dialects.ExtendedWylie = ExtendedWylie;
  Markdown.buildInlinePatterns( Markdown.dialects.ExtendedWylie.inline );

  return ExtendedWylie;
});
