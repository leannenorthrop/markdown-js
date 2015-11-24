if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['../markdown_helpers',
        './dialect_helpers',
        './gruber',
        '../parser',
        './wylie/wmd2uchen'],

function (MarkdownHelpers, DialectHelpers, Gruber, Markdown, UChenMap) {

  var ExtendedWylie = DialectHelpers.subclassDialect( Gruber );
  var inline_until_char = DialectHelpers.inline_until_char;
  var mk_block = MarkdownHelpers.mk_block;
  var uChenMap = UChenMap;

  ExtendedWylie.inline[ "~" ] = function inlineWylie( text ) {
        // Inline wylie block.
        var m = text.match( /(~+)(([\s\S\W\w]*?)\1)/ );

        if ( m && m[2] ) {
          var txt = uChenMap.toUnicode(m[3]);
          return [ m[1].length + m[2].length, [ "uchen", { style: "font-size:72pt;font-family:Uchen_05"}, txt ] ];
        }
        else {
          // TODO: No matching end code found - warn!
          return [ 1, "~" ];
        }
      };

  ExtendedWylie.block.wylie = function(block, next) {
        var ret = [],
            re = /^(~~)\s*(.*?)\s*~*\s*(?:\n|$)/;

        var m = block.match( re );

        if ( !m )
          return undefined;

        block_search:
        do {
          // Now pull out the rest of the lines
          var b = this.loop_re_over_block(
                    re, block.valueOf(), function( m ) { ret.push( uChenMap.toUnicode(m[2]) ); } );

          if ( b.length ) {
            // push it back on as a new block
            next.unshift( mk_block(b, block.trailing) );
            break block_search;
          }
          else if ( next.length ) {
            // Check the next block - it might be code too
            if ( !next[0].match( re ) )
              break block_search;

            // Pull how how many blanks lines follow - minus two to account for .join
            ret.push ( block.trailing.replace(/[^\n]/g, "").substring(2) );

            block = next.shift();
          }
          else {
            break block_search;
          }
        } while ( true );

        return [ [ "uchen_block", { style: "font-size:72pt;font-family:Uchen_05"}, ret.join("\n") ] ];
      };

  Markdown.dialects.ExtendedWylie = ExtendedWylie;
  Markdown.buildBlockOrder ( Markdown.dialects.ExtendedWylie.block );
  Markdown.buildInlinePatterns( Markdown.dialects.ExtendedWylie.inline );

  return ExtendedWylie;
});
