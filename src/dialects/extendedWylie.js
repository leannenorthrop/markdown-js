if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['../markdown_helpers',
        './dialect_helpers',
        './extendedGruber',
        '../parser',
        './wylie/wmd2uchen',
        './wylie/dictionary'],

function (MarkdownHelpers, DialectHelpers, ExtendedGruber, Markdown, UChenMap, Dictionary) {

  var ExtendedWylie = DialectHelpers.subclassDialect( ExtendedGruber );
  var inline_until_char = DialectHelpers.inline_until_char;
  var mk_block = MarkdownHelpers.mk_block;
  var uChenMap = UChenMap;

  ExtendedWylie.dictionary = Dictionary;
  
  ExtendedWylie.inline[ "::" ] = function inlineWylie( text ) {
        // Inline wylie block.
        var m = text.match( /(::)((\s|\S|\W|\w)*?)(\1)/ );

        if ( m && m[2] ) {
          var txt = uChenMap.toUnicode(m[2]);
          return [ (m[1].length*2) + m[2].length, [ "uchen", { "class": "uchen", "wylie": m[2]}, txt ] ];
        }
        else {
          // TODO: No matching end code found - warn!
          return [ 2, "::" ];
        }
      };

  ExtendedWylie.block.wylie = function(block, next) {
        var ret = [],
            re = /^(:::\n*)([\s\S\W\w\n\r]*?)(\1)/,
            reStartBlock = /^:::\n*/,
            reEndBlock = /([\s\S\W\w\n\r]*?)(\n*:::)(.*)/;

        if ( !block.match( reStartBlock ) )
          return undefined;

        var wylie = "";
        var groups = block.match( re );
        if ( groups ) {
          wylie = groups[2];
        } else {
          var seen = false;
          var b = block.replace(":::", "");
          while ( next.length && !seen) {
            seen = b.match(reEndBlock);
            wylie += seen ? seen[1] : b;
            b = seen ? "" : next.shift();
          }
        }

        return wylie.length > 0 ? [ [ "uchen_block", { "class": "uchen", "wylie": wylie }, uChenMap.toUnicode(wylie) ] ] : [];
      };

  Markdown.dialects.ExtendedWylie = ExtendedWylie;
  Markdown.buildBlockOrder ( Markdown.dialects.ExtendedWylie.block );
  Markdown.buildInlinePatterns( Markdown.dialects.ExtendedWylie.inline );

  return ExtendedWylie;
});
